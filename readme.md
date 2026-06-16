# lukemonaghan.github.io

Source for [lukemonaghan.com](https://lukemonaghan.com) — a personal portfolio site built with React, TypeScript, and Vite.

## Development

```bash
npm install
npm run dev
```

Starts the Vite dev server with hot module reload.

## Building

```bash
npm run build
```

Type-checks with `tsc` then bundles the production build into `dist/`.

```bash
npm run preview
```

Serves the contents of `dist/` locally to sanity-check a production build.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml), which installs dependencies, runs `npm run build`, and publishes `dist/` to GitHub Pages. The custom domain is configured via [`CNAME`](CNAME).
