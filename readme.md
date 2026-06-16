# lukemonaghan.github.io

Source for [lukemonaghan.com](https://lukemonaghan.com) — a personal portfolio site built with React, TypeScript, and Vite.

## Development

```bash
git submodule update --init
npm install
npm run dev
```

The submodule init pulls in [`work-brain`](https://github.com/lukemonaghan/work-brain), a private Obsidian vault containing the full work history. You'll need read access to that repo — `dev`/`build` both fail closed (zero companies rendered) if the submodule isn't checked out.

Starts the Vite dev server with hot module reload.

## Building

```bash
npm run build
```

Runs `npm run generate:experience`, type-checks with `tsc`, then bundles the production build into `dist/`.

```bash
npm run preview
```

Serves the contents of `dist/` locally to sanity-check a production build.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml), which checks out the repo (including the `work-brain` submodule, via the `WORK_BRAIN_PAT` secret), installs dependencies, runs `npm run build`, and publishes `dist/` to GitHub Pages. The custom domain is configured via [`CNAME`](CNAME).

`WORK_BRAIN_PAT` is a fine-grained GitHub PAT scoped to read-only `Contents` access on the `work-brain` repo, stored as a repository secret. Without it, CI can't clone the private submodule and the build will produce an empty experience section.
