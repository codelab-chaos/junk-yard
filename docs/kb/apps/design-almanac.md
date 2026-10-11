# Design Almanac

A field guide to fifty web design styles and patterns, each with a live, working example. Built 2026-10-10.

Screens: `docs/screens/design-almanac-desktop.png`, `design-almanac-mobile.png`.

## Concept

A printed almanac or specimen book. The index is a table of contents set in chapters (I Layout to VII Navigation), numbered entries 01 to 50, and a live thumbnail per entry. Opening an entry turns to its page: a huge entry number, the name, a full-size interactive **plate** with a caption ("Plate 07."), then field notes.

- **Rubric red marks the season.** Almanacs printed red-letter days in red; here red means "in season" (trending). Perennials (mainstays) are set in ink. The red is also used for chapter numerals, focus and the plate caption, never for decoration.
- **Rules instead of boxes.** Double rules under the masthead and above the colophon, hairlines between entries. No cards around sections.
- **Running head** on entry pages (Junk Yard / The Design Almanac), like a book.
- Keyboard: `/` search, left and right arrows turn the page, `Esc` returns to contents.

## Type and color

| Role | Face | Why |
| --- | --- | --- |
| Display | Fraunces (opsz, SOFT, WONK axes) | An old-style "wonky" serif with optical sizing: bookish at 170px, and its SOFT and WONK axes make "Almanac" feel hand-set. Also powers the variable font plate. |
| UI and body | Schibsted Grotesk | A newspaper grotesk (built for a news publisher), sturdier than Geist, distinct from Shadowbox. |
| Labels, code | Spline Sans Mono | Small caps labels and technique lists; warmer than Geist Mono. |
| Examples only | Bricolage Grotesque (opsz, wdth) | Condensed and bold display for neubrutalism, kinetic type, Y2K. |

Palette is OKLCH tokens on `:root`: paper `oklch(0.968 0.013 85)`, ink `oklch(0.23 0.014 60)`, rubric `oklch(0.53 0.185 32)`. Dark mode keeps hue and chroma and moves lightness (paper `0.185`, ink `0.93`, rubric `0.7`), the same technique the OKLCH plate demonstrates. Example plates keep their own palettes in both themes; they are artworks, not chrome.

## Architecture

- `data/styles.ts`: the fifty entries (id, name, kind, category, firstSeen, summary, whenToUse, pitfalls, techniques, tags, example id). Indexed for catalog search via `app.json` `index`.
- `data/query.ts`: pure filtering, numbering and neighbours.
- `examples/{layout,type,color,surface,motion,interaction,navigation}.ts`: one `Example` record per style (`css`, `html`, optional `setup(root, { signal, interactive })`).
- `ui/stage.ts` mounts an example into a **shadow root** with constructed stylesheets (`adoptedStyleSheets`), one sheet per example shared by thumbnail and plate, plus a base sheet. Nothing leaks in or out.
- `ui/lazy-thumbs.ts`: IntersectionObserver mounts a thumbnail when it nears the viewport and sets `data-paused` when it leaves; the base sheet pauses every animation under `:host([data-paused])`. A ResizeObserver sets `zoom` so the 720 by 450 design canvas fits the thumbnail.
- `ui/plate-fit.ts`: on wide screens the plate renders on a 1040 by 600 canvas zoomed to the frame; under 720px it renders fluid at real size, and examples adapt with `@container` queries against `:host` (`container-type: size`).
- `ui/route.ts`: state in the hash (`#style=bento-grid`, `#kind=trending&cat=layout&q=glass`). Entry clicks push history; filter typing replaces it.
- Thumbnail to plate morph uses a same-document View Transition, skipped under reduced motion.

## The fifty

| No. | Style | Kind | No. | Style | Kind |
| --- | --- | --- | --- | --- | --- |
| 01 | Bento grid | In season | 26 | Y2K chrome | In season |
| 02 | Swiss International grid | Perennial | 27 | Grain and noise | In season |
| 03 | Split screen | Perennial | 28 | Tactile skeuomorphism | In season |
| 04 | Masonry | Perennial | 29 | Material elevation | Perennial |
| 05 | Broken grid | In season | 30 | Flat design | Perennial |
| 06 | Card layout | Perennial | 31 | Web brutalism | Perennial |
| 07 | Sidebar app shell | Perennial | 32 | Squircle corners | In season |
| 08 | Data-dense dashboard | Perennial | 33 | Dither and pixel | In season |
| 09 | Container-query components | In season | 34 | View transition morphs | In season |
| 10 | Hero with call to action | Perennial | 35 | Scroll-driven animation | In season |
| 11 | Scrapbook collage | In season | 36 | Parallax depth | Perennial |
| 12 | Editorial serif layout | Perennial | 37 | Skeleton screens | Perennial |
| 13 | Kinetic typography | In season | 38 | Infinite marquee | Perennial |
| 14 | Variable font play | In season | 39 | Micro-interactions | In season |
| 15 | Type as image | In season | 40 | Spatial tilt | In season |
| 16 | Modular type scale | Perennial | 41 | Popover with anchor positioning | In season |
| 17 | Drop caps and pull quotes | Perennial | 42 | Conversational interface | In season |
| 18 | Dark mode with OKLCH tokens | In season | 43 | Scroll-snap carousel | Perennial |
| 19 | Aurora mesh gradient | In season | 44 | Accordion disclosure | Perennial |
| 20 | Minimal monochrome | Perennial | 45 | Inline form validation | Perennial |
| 21 | Duotone | Perennial | 46 | Sticky header | Perennial |
| 22 | Dopamine color | In season | 47 | Mega menu | Perennial |
| 23 | Liquid glass | In season | 48 | Tabs | Perennial |
| 24 | Neubrutalism | In season | 49 | Off-canvas drawer | Perennial |
| 25 | Claymorphism | In season | 50 | Command palette | In season |

## What we learned

- **Shadow DOM plus constructed stylesheets** is the cleanest way to host many independent demos on one page. `@container` queries inside a shadow root resolve against `:host` when the host has `container-type: size`, so `cqw` and `cqh` units scale typography with the frame.
- **Size display type with both axes.** `font-size: 41cqw` looked right in a 16:10 thumbnail and overflowed a tall plate; `min(41cqw, 92cqh)` fixed it.
- **CSS `zoom` beats `transform: scale` for thumbnails**: layout, hit testing and container units all follow, and it is Baseline since 2024. Fine dither patterns (2 to 4px) alias to black when zoomed down, so the dither plate swaps to flat gray in thumbnails.
- **Popovers inside a zoomed shadow root** still anchor correctly with `anchor-name` and `position-area` in Chromium. The thumbnail shows a static copy of the menu because top-layer popovers would escape the inert thumbnail.
- **Fixed-size UI floats in a big frame.** Phone-sized components looked lost in a 1300px plate; rendering wide plates on a fixed canvas and zooming fixed it without per-example work.
- `HTMLElement.hidden` is typed `boolean | "until-found"` in current DOM lib types; compare with `=== true`.
- View Transitions work with `view-transition-name` set on elements inside a shadow root (tested in Chromium for the swatch morph plate).

## Trend sources (checked 2026-10-10)

Trend lists are opinion pieces; treat them as directional.

- [Web Design Trends 2026, line25](https://line25.com/articles/web-design-trends-2026/): bento persistence, Glassmorphism 2.0, tactile brutalism.
- [Webdesign trends 2026 reality check, studiomeyer](https://studiomeyer.io/en/blog/webdesign-trends-2026-reality-check): bento and dark mode keep winning; kinetic type rarely ships; backdrop-filter cost on mid-range Android.
- [Web Design Trends 2026, bubble.io](https://bubble.io/blog/web-design-trends/)
- [Web design trends 2026, tinyfrog](https://tinyfrog.com/web-design-trends-2026/)
- [Beyond border-radius: corner-shape, Smashing Magazine (March 2026)](https://www.smashingmagazine.com/2026/03/beyond-border-radius-css-corner-shape-property-ui/): `corner-shape` in Chromium 139+, not Firefox or Safari; enhance inside `@supports`.
- [Squircles in CSS, squircle.js](https://squircle.js.org/blog/squircles-in-css)
- Apple introduced Liquid Glass at WWDC, June 2025.
