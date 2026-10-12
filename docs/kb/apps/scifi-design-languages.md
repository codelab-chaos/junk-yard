# Sci-fi Design Languages

`junkyard/scifi-design-languages/`, shipped 2026-10-11.

## Concept

A studio spec sheet for learning how to talk about a look. Every world answers the same seven questions in the same order (in a line, palette, materials, shapes, type and UI, light, borrow it), so any two can be compared and the vocabulary sticks.

## Key decisions

- **One brief, one source.** `data/brief.ts` defines the seven axes. The intro legend, the detail page and the "Copy brief" text all read from it, so entries cannot drift apart.
- **Light scope.** 34 game worlds, no films. Research was cut short on purpose (see `docs/kb/research/scifi/`).
- **Real images, one source of truth.** `data/media.ts` maps each world to its Steam app (three official screenshots and a store link) and its interfaceingame.com page (link only). `gallery(w)` returns Steam shots, or Wikimedia stills when a game is not on Steam or the store shots are a different look (Fallout's 1997 sprites, System Shock's 2023 remake). The UI never knows where an image came from. Original SVG plates were tried first and removed the same day (code, types and per-entry specs): real screenshots teach the vocabulary better.
- **Quiet chrome.** Drafting paper, ink, monospace callouts and one safety-orange signal, so the worlds' palettes carry the color.

## Learned

- Steam's appdetails API is the cleanest source of real game images: official, 1920x1080, stable CDN, no key.
- An inline SVG used twice on one page needs unique gradient ids. Otherwise `url(#id)` resolves to the first copy, and if that copy is hidden (`display: none`), the gradient silently fails to paint. (Hit while the plates existed; scope ids per copy.)
