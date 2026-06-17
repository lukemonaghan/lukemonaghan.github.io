# lukemonaghan.github.io

Personal portfolio site for Luke Monaghan — a multi-disciplinary creative technologist based in Canberra, Australia.

## Tech stack

- **React 18** + **TypeScript** via **Vite**
- **MUI v6** (Material UI) for layout and components — dark mode, primary `#1b5e20` (green), secondary `#ec407a` (pink)
- **Framer Motion** for scroll-triggered animations and entrance effects
- **Three.js / @react-three/fiber** (dependency present, not currently used)
- **CSS Modules** for component-scoped styles
- **GitHub Pages** for hosting — pushes to `main` auto-deploy via `.github/workflows/deploy.yaml`

## Project structure

```
src/
  main.tsx              # Entry point — MUI ThemeProvider, dark theme config
  App.tsx               # Root layout: Nav → Banner → AboutMe → Portfolio → Contact
  motion.ts             # Shared framer-motion variants (fadeInUp, staggerContainer, viewportOnce) and easeOut curve
  main.css              # Global CSS (fonts, resets)

  # Sections
  Banner.tsx/.module.css        # Full-screen hero with profile image, name, social links
  Nav.tsx/.module.css           # Sticky nav, fades in after scrolling past the banner
  AboutMe.tsx/.module.css       # "Who am I" panel — photo + bio text, responsive row→column layout
  Portfolio.tsx/.module.css     # Work experience — company cards with roles, projects, carousel
  Contact.tsx/.module.css       # Contact CTA with email/GitHub/LinkedIn buttons
  SectionHeader.tsx/.module.css # Shared section heading component
  Spacer.tsx                    # MUI Box spacer, accepts a `size` prop (MUI spacing units)

  # Shared styles (imported by multiple components)
  glassStyle.module.css   # .glassPanel (blurred dark glass), .innerPanel (solid dark, for nested cards)
  hoverStyle.module.css   # .liftHover (translateY on hover), .borderStyle (pink border glow on hover)

  # Data
  data/experience.generated.json  # Auto-generated — DO NOT EDIT directly (see work-brain below)

  # Carousel
  ImageCarousel.tsx/.module.css   # Horizontal scroll-snap carousel with dot nav and drag support
```

## The work-brain submodule

Experience data comes from a **private** git submodule at `./work-brain` (repo: `lukemonaghan/work-brain`). It contains markdown files describing roles and projects with YAML frontmatter.

The generation script `scripts/generate-experience.mjs` reads those markdown files, filters to those with `public: true` in frontmatter, and outputs:
- `src/data/experience.generated.json` — structured company/role/project data
- `public/work-brain/` — copies of referenced image assets

**Never edit `experience.generated.json` directly.** Edit the markdown in `work-brain/` and re-run generation.

### work-brain frontmatter shape

Roles (`work-brain/history/roles/*.md`):
```yaml
public: true
company: "Acorn"
title: "Lead Developer"
type: "Full-time"
location: "Canberra, Australia"
period: "Jan 2022 - Present"
logo: "assets/companies/acorn/logo.png"
siteUrl: "https://acorn.io"
```

Projects (`work-brain/history/projects/*.md`):
```yaml
public: true
company: "Acorn"
stack: ["React", "TypeScript", "PHP"]
images:
  - "assets/projects/acorn/screenshot.png"
```

The markdown body's `## Overview` section becomes the project description; `## About` or `## Overview` under a role becomes the company description.

## Dev commands

```bash
npm run dev          # generate experience data then start Vite dev server
npm run build        # generate experience data, type-check, then Vite build → dist/
npm run lint         # ESLint
npm run preview      # serve the dist/ build locally
```

## Design system notes

- **Pink (`#ec407a`)** is the accent colour — used for active states, hover glows, CTA buttons, dividers
- **Green (`#1b5e20`)** is the primary — used sparingly
- Glass panels: `.glassPanel` for top-level cards (backdrop blur), `.innerPanel` for nested cards inside animated parents (solid, to avoid browser rendering bugs with stacked backdrop-filter + opacity animation)
- All section entrances use `fadeInUp` + `viewportOnce` from `motion.ts`
- `Spacer` uses MUI spacing units (1 unit ≈ 8px); prefer `size={3}` or `size={4}` between major sections

## Portfolio animation pattern

The `Experience` component in `Portfolio.tsx` intentionally combines `animate={{ opacity: 1 }}` (fires on mount) with `whileInView="visible"` (propagates variant name to children for stagger). Do not collapse these into a single mechanism — the mount-time fade on the container and the scroll-triggered stagger on child cards are separate concerns.

## ImageCarousel rules

The carousel has been carefully tuned — respect these constraints:

- **Items must have a fixed, consistent width** (currently percentage/px breakpoints). Variable-width items (e.g. `width: auto` driven by natural image size) break scroll-snap centering when images have different aspect ratios.
- **`object-fit: contain`** is used so the full image is always visible — portrait images letterbox against a dark background.
- **Padding must be ≥ `(clientWidth − itemWidth) / 2`** on the scroller so the first item's snap position is reachable at a non-negative `scrollLeft`. Currently 25% padding with items at ~50% width.
- **`scrollToIndex`** disables `scroll-snap-type` during programmatic smooth scrolls (mandatory snap hijacks animations mid-flight) and restores it on `scrollend`.
- **Mouse drag** uses pointer events with axis-locking: if the first significant movement is more vertical than horizontal, the drag is cancelled so vertical page scroll works normally.
- **Touch** uses native browser scroll (`touch-action: pan-x pan-y`) — the JS drag handler skips touch pointer types entirely.

## Responsive breakpoints

Follows MUI defaults:
- `xs` / base: < 600px (mobile)
- `sm`: ≥ 600px (tablet)
- `md`: ≥ 900px (small desktop)
- `lg`: ≥ 1200px (large desktop)

`AboutMe` uses MUI Stack's responsive `direction` prop (`{ xs: 'column', sm: 'row' }`) to stack on mobile. The image box uses CSS breakpoints for width.

## Deployment

- Push to `main` → GitHub Actions runs `npm ci && npm run build` (with submodule checkout using `WORK_BRAIN_PAT` secret) → deploys `dist/` to GitHub Pages
- The `CNAME` file sets the custom domain
- The submodule PAT (`WORK_BRAIN_PAT`) is a GitHub secret required for CI to access the private work-brain repo
