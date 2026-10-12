# Sci-fi design languages: research logs

Raw research behind `junkyard/scifi-design-languages/`, kept so it never has to be redone. The structured result lives in `junkyard/scifi-design-languages/data/worlds/*.ts`; these logs keep what did not fit there.

Each log covers one data file and records, per work: sources consulted, stills rejected and why, substitutions, and facts that were uncertain or left out.

| Log | Data file | Works |
| --- | --- | --- |
| games-a (no log written) | `worlds/games-a.ts` | Mirror's Edge to Metroid Prime |
| [games-b.md](games-b.md) | `worlds/games-b.ts` | Wipeout to Titanfall 2 |
| [games-c.md](games-c.md) | `worlds/games-c.ts` | Prey to Rain World |

## Method (2026-10-11)

- Stills come from the English Wikipedia REST API (`/api/rest_v1/page/media-list/{title}`), hotlinked from `upload.wikimedia.org`, each URL checked for HTTP 200 and an image content type. Most are non-free (fair use on Wikipedia); credit links point at each file page.
- Wikimedia only serves certain thumbnail widths, so URLs are used exactly as the API returns them.

## Scope (2026-10-11)

- Kept to games only (34 worlds) to keep it a light study. Film logs were planned but never written; films can be added later as new files in `data/worlds/`.
- Images: official Steam screenshots first, Wikimedia stills where a game is not on Steam. See [images.md](images.md). The SVG plates were removed from the code and data on 2026-10-11.
