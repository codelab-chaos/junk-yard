# Icon Cabinet

A searchable specimen cabinet for open icon libraries. Built 2026-10-16.

## Concept and decisions

- A quiet green drafting surface, shared grid rules, and a drawing-board inspector keep attention on the symbols. Space Grotesk provides identity; DM Sans handles controls and labels.
- Search 72,913 icon names from 12 libraries, including Lucide and Phosphor. Interleave families when browsing; rank exact names before prefixes and partial matches when searching. A small synonym map covers common vocabulary differences.
- Keep the searchable names locally in `public/assets/icon-cabinet/index.json`. Bundle compressed SVG data from Iconify locally and load each library on demand. Search avoids a remote round trip and exposes the full result set with explicit pagination; previews and exports use the same host as the app.
- Save favorites in browser storage. Search and filters live in the URL hash. Export applies color and dimensions and includes the library’s full license notice in a comment, with source and license links alongside the controls.
- On phones the inspector becomes a closable bottom sheet with keyboard focus containment and Escape dismissal. Desktop keeps the results visible beside the inspector.
- Build discovers the app through `app.json`; no catalog wiring required.

## Maintenance and verification

Run `node scripts/refresh-icon-cabinet.mjs` from the repository root to refresh names and metadata. The script fetches all libraries and licenses before writing the snapshot. Data is read from Iconify’s GitHub datasets. Browser tests exposed cross-origin failures with the remote SVG API, so artwork is now bundled locally.

Browser checks cover search, filters, persistent favorites, pagination, no matches, SVG failure and recovery controls, size/color export, clipboard, download, and mobile overflow. Screenshots live in `docs/screens/icon-cabinet-*.png`.

Names and artwork come from the same refresh. All 12 compressed artwork collections plus the name index occupy about 8 MB; each library loads only when needed. Favorites are local to this browser, not synced across devices.
