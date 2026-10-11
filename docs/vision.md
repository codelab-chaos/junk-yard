# Junk Yard Vision

Junk Yard is a simple GitHub Pages site that hosts a collection of one-off SPA apps and single `index.html` pages. When I have a random want, need some data, or do a quick bit of research, the result gets built as a small app and dropped into the yard.

## The flow

1. **Create** the app (an SPA or a plain `index.html`).
2. **Catalog** it: add an entry to the root catalog.
3. **Tag** it with a few relevant search terms.
4. **Index** it for deeper, full-text search (content, data, notes), not just tags.
5. **Build and host** it on GitHub Pages, shipping the built bundle.

## Project layout

```
./index.html                  catalog and search (the front door)
./junkyard/{app}/index.html   each app, one folder per app
./junkyard/{app}/app.json     the app's catalog record (title, description, tags, created, keywords)
./public/assets/              shared static assets (one copy only)
./src/lib/                    shared TS libraries (search, DOM, clipboard, storage, hash codec)
./build/junkyard-plugin.ts    discovers apps, generates catalog.json and search-index.json
```

- The root `index.html` is the catalog: lists every app, filters by tag, and searches the index.
- Each app lives at `./junkyard/{app}/index.html` and is reachable at `/junkyard/{app}/` on Pages.

## Catalog and search

- The catalog is data driven: a single manifest (one record per app) holds the name, path, description, tags, and created date. The UI renders from that data, nothing is hand-coded per app.
- A build step generates the search index from the manifest plus each app's content, so deeper search stays in sync without manual upkeep.
- Adding an app means adding a folder with `index.html` and `app.json`. No config edits: the build discovers it, adds it as an entry, and adds it to the catalog and index.

## Assets

- **Never keep two copies of an asset.** Static files, large or small, live once in `./assets` (or `./public/assets`).
- Vite serves `./public` as the public dir, so `./public/assets/x` is `/assets/x` everywhere and the bundle references it directly. Hashed bundle output goes to `/bundle` so it never mixes with `/assets`.
- Apps share assets by referencing the common path rather than vendoring their own.

## Code

- **TypeScript is preferred** for anything with shared logic, so libraries (catalog loading, search, UI helpers, data utilities) can be shared across apps.
- **Plain `index.html` has its place** for small enough one-offs where a build adds nothing.
- Keep concerns separate and each module single-purpose; favor data-driven apps over hard-coded ones.

## Hosting

- GitHub Pages, deployed by a GitHub Actions workflow on push to `main` (build, then GitHub's own `deploy-pages`).
- Built output is never committed, which keeps exactly one copy of every asset in git.
- Ship the bundle for the most part; small static `index.html` apps go through the same build untouched.
