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
        skills: data.stack ?? [],
        images: (data.images ?? []).map(copyAsset).filter(Boolean),
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

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(sortedCompanies, null, 2));

console.log(`Generated experience data for ${sortedCompanies.length} company/companies -> ${path.relative(ROOT, OUT_FILE)}`);
