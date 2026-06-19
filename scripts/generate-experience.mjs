// Reads opted-in (frontmatter `public: true`) markdown files from the work-brain
// submodule and emits src/data/experience.generated.json for the site to consume.
// Also copies any referenced images out of the (private) submodule into public/work-brain/
// so the built site can actually serve them.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve(import.meta.dirname, "..");
const WORK_BRAIN_DIR = path.join(ROOT, "work-brain");
const ROLES_DIR = path.join(WORK_BRAIN_DIR, "history", "roles");
const PROJECTS_DIR = path.join(WORK_BRAIN_DIR, "history", "projects");
const AGENTS_FILE = path.join(WORK_BRAIN_DIR, "AGENTS.md");
const OUT_FILE = path.join(ROOT, "src", "data", "experience.generated.json");
const ASSET_OUT_DIR = path.join(ROOT, "public", "work-brain");

const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

function readMarkdownDir(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".md") && !f.startsWith("["))
        .map((f) => {
            const raw = fs.readFileSync(path.join(dir, f), "utf-8");
            try {
                const { data, content } = matter(raw);
                return { data, content, file: f };
            } catch (err) {
                console.warn(`Skipping ${path.join(dir, f)}: invalid frontmatter (${err.message.split("\n")[0]})`);
                return { data: {}, content: "", file: f };
            }
        });
}

function extractTitle(content, fallback) {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : fallback;
}

// Parse the | **Category** | [[Item1]], [[Item2]] | table, skipping Capabilities rows.
function parseSkillTable(content) {
    const groups = [];
    for (const line of content.split("\n")) {
        // Only match rows where the second cell contains [[wiki-link]] syntax (skill entries).
        const m = line.match(/^\|\s*\*\*([^*]+)\*\*\s*\|\s*(\[\[.+?)\s*\|?\s*$/);
        if (!m) continue;
        const category = m[1].trim();
        if (/^capabilities$/i.test(category)) continue;
        const items = m[2]
            .split(",")
            .map((s) => s.replace(/\[\[([^\]]+)\]\]/g, "$1").trim())
            .filter(Boolean);
        if (items.length) groups.push({ category, items });
    }
    return groups;
}

function extractSection(content, heading) {
    const lines = content.split("\n");
    const start = lines.findIndex((l) => l.trim().toLowerCase().startsWith(`## ${heading}`.toLowerCase()));
    if (start === -1) return "";
    const rest = lines.slice(start + 1);
    const end = rest.findIndex((l) => l.trim().startsWith("## "));
    return rest
        .slice(0, end === -1 ? undefined : end)
        .join("\n")
        .trim();
}

// Sortable month-index key, e.g. "Feb 2018" -> 24216, "2018" -> 24216 (Jan assumed).
function dateKey(str) {
    const m = str?.trim().match(/([A-Za-z]+)?\s*(\d{4})/);
    if (!m) return 0;
    const year = parseInt(m[2], 10);
    const month = m[1] ? MONTHS[m[1].slice(0, 3).toLowerCase()] ?? 0 : 0;
    return year * 12 + month;
}

function parsePeriod(period) {
    const [startStr = "", endStr = ""] = (period ?? "").split(/[–-]/).map((s) => s.trim());
    const isPresent = /present/i.test(endStr);
    return {
        startStr,
        endStr: isPresent ? "Present" : endStr,
        startKey: dateKey(startStr),
        endKey: isPresent ? Infinity : dateKey(endStr),
    };
}

// Strip Obsidian wiki-links to their display text or last path segment.
function stripWikiLink(text) {
    return text
        .replace(/\[\[([^\]]*)\|([^\]]*)\]\]/g, (_, _path, display) => display.trim())
        .replace(/\[\[([^\]]+)\]\]/g, (_, p) => p.split("/").pop().trim())
        .trim();
}

// Extract the href from a markdown link, returning the plain text if no link found.
function extractMarkdownUrl(text) {
    const m = text.match(/\[([^\]]+)\]\(([^)]+)\)/);
    return m ? m[2] : text.trim();
}

function parseAgentsTable(raw, keys) {
    const rows = [];
    let pastHeader = false;
    for (const line of raw.split("\n")) {
        if (!line.trim().startsWith("|")) continue;
        // Replace \| inside wiki-links so it doesn't split the column
        const escaped = line.replace(/\\\|/g, "\x00");
        const cols = escaped
            .split("|")
            .map((c) => c.replace(/\x00/g, "|").trim())
            .filter((_, i, a) => i > 0 && i < a.length - 1);
        if (cols.length < 2) continue;
        if (/^-+$/.test(cols[0].trim())) { pastHeader = true; continue; }
        if (!pastHeader) continue;
        const row = {};
        row[keys[0]] = stripWikiLink(cols[0]);
        row[keys[1]] = stripWikiLink(cols[1]);
        rows.push(row);
    }
    return rows;
}

function parseAgentsMd(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");

    // Split into sections keyed by ## heading (skip --- dividers)
    const sections = {};
    let currentSection = null;
    let currentLines = [];
    for (const line of raw.split("\n")) {
        if (line.startsWith("## ")) {
            if (currentSection) sections[currentSection] = currentLines.join("\n").trim();
            currentSection = line.slice(3).trim().toLowerCase();
            currentLines = [];
        } else if (currentSection && line.trim() !== "---") {
            currentLines.push(line);
        }
    }
    if (currentSection) sections[currentSection] = currentLines.join("\n").trim();

    const summary = sections["summary"] ?? "";

    const achievements = (sections["key achievements"] ?? "")
        .split("\n")
        .filter((l) => l.trim().startsWith("- "))
        .map((l) => l.replace(/^-\s*/, "").replace(/\*\*/g, "").trim());

    const skills = parseAgentsTable(sections["skills"] ?? "", ["area", "detail"]);
    const capabilities = parseAgentsTable(sections["capabilities"] ?? "", ["name", "summary"]);

    const contactRows = parseAgentsTable(sections["contact details"] ?? "", ["label", "value"]);
    const contactKeywords = { website: "website", email: "email", linkedin: "linkedin", github: "github" };
    const contact = {};
    for (const { label, value } of contactRows) {
        const lower = label.toLowerCase();
        const key = Object.keys(contactKeywords).find((k) => lower.includes(k));
        if (key) contact[key] = extractMarkdownUrl(value);
    }

    return { summary, achievements, skills, capabilities, contact };
}

function copyAsset(relPath) {
    if (!relPath) return "";
    const src = path.join(WORK_BRAIN_DIR, relPath);
    if (!fs.existsSync(src)) {
        console.warn(`Referenced asset not found, skipping: ${relPath}`);
        return "";
    }
    const dest = path.join(ASSET_OUT_DIR, relPath);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    return `/work-brain/${relPath.split(path.sep).join("/")}`;
}

fs.rmSync(ASSET_OUT_DIR, { recursive: true, force: true });

const roleDocs = readMarkdownDir(ROLES_DIR).filter((d) => d.data.public === true);
const projectDocs = readMarkdownDir(PROJECTS_DIR).filter((d) => d.data.public === true);

const companies = {};

for (const { data, content } of roleDocs) {
    const key = data.company;
    if (!key) continue;
    if (!companies[key]) {
        companies[key] = {
            title: key,
            logo: "",
            siteUrl: "",
            kind: "",
            location: "",
            description: "",
            roles: [],
            projects: [],
        };
    }
    const entry = companies[key];
    const period = parsePeriod(data.period);
    entry.kind ||= data.type ?? "";
    entry.location ||= data.location ?? "";
    entry.logo ||= copyAsset(data.logo);
    entry.siteUrl ||= data.siteUrl ?? "";
    entry.roles.push({ position: data.title ?? "", ...period });
    if (!entry.description) {
        entry.description = extractSection(content, "About") || extractSection(content, "Overview");
    }
}

for (const { data, content, file } of projectDocs) {
    const key = data.company;
    if (!key || !companies[key]) continue;
    companies[key].projects.push({
        title: extractTitle(content, path.basename(file, ".md")),
        description: extractSection(content, "Overview"),
        skillGroups: parseSkillTable(content),
        images: (data.images ?? []).map(copyAsset).filter(Boolean),
        focused: data.focused === true,
    });
}

const ranked = [];

for (const entry of Object.values(companies)) {
    entry.roles.sort((a, b) => a.startKey - b.startKey);
    const first = entry.roles[0];
    const last = entry.roles[entry.roles.length - 1];
    entry.date = first && last ? `${first.startStr} - ${last.endStr}` : "";
    ranked.push({ entry, isCurrent: last?.endKey === Infinity, latestStart: last?.startKey ?? 0 });
    entry.roles = entry.roles.map(({ position }) => ({ position }));
}

// Current roles (still "Present") sort to the top; within each group, most recently started first.
ranked.sort((a, b) => (a.isCurrent !== b.isCurrent ? Number(b.isCurrent) - Number(a.isCurrent) : b.latestStart - a.latestStart));
const sortedCompanies = ranked.map((r) => r.entry);

const profile = parseAgentsMd(AGENTS_FILE);

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify({ profile, companies: sortedCompanies }, null, 2));

const profileNote = profile ? " (+ profile from AGENTS.md)" : "";
console.log(`Generated experience data for ${sortedCompanies.length} company/companies${profileNote} -> ${path.relative(ROOT, OUT_FILE)}`);
