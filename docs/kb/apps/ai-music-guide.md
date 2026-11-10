# AI Music Session Guide

`junkyard/ai-music-guide/`, shipped 2026-10-31. A point-in-time, searchable guide to making AI music, Suno first with other generators alongside. It has 115 entries: techniques, lyric tags, fixes and tools, each as "technique → what you will hear". Readers can follow the guide backwards from a finished record to the first idea, or from basics to pro. Research: [research/ai-music/](../research/ai-music/).

Screens: `docs/screens/ai-music-guide-*.png`.

## Concept

A tape box and its track sheet.
- **Masthead:** the label on a reel's box, a double-ruled frame with Studio, Format, Order and Credits fields.
- **Entries:** numbered lines on a track sheet. What to do is on the left, "You hear" is on the right in red grease pencil, and a four-segment level meter closes the line.
- **"Work backwards" view:** opens with a track list of the eight stages (08 The record → 01 Write). Each stage has a large pencil-red number and a "Done when" note: what the stage hands to the next.
- **Accent:** pencil red, used only for results ("You hear"), the current view and the first chorus.

## Information architecture

- **Content model:** one `Entry` type with kind (technique, tag, fix, tool), stage, level, platforms, reliability, aliases, related entries and sources. Every view is a different arrangement of the same entries.
- **Views:** these are peer arrangements of one set, so tabs fit:
  - Work backwards (by stage, starting with the record)
  - Basics to advanced (by level)
  - Tags and markers (the tag dictionary, grouped)
  - Fix a sound (symptom first)
  - Sites and tools (reference tables)
- **Search:** the primary action, a large search box with `/` to focus.
  - Weighted fields: title, then aliases, then examples, then summary, then what you hear, then steps.
  - Synonym groups ("split" finds separation, "metallic" finds shimmer) and a crude stemmer.
  - Matches are highlighted.
  - One- and two-word queries need every word; longer ones need about 60 percent of the words, with full matches ranked first. Suggested queries like "force an ending" returned nothing when every word had to match.
- **Facets:** Level and "Works in" (Suno, ElevenLabs, Lyria, Udio, an audio editor). Counts reflect the other facet and the query; impossible chips are disabled.
- **URL state:** view, query, facets and the open entry all live in the hash, and related links jump across views.

## Key decisions

- **Working backwards is the default order.** The owner asked for it. Stages run from The record → Master → Mix → Stems and clean-up → Edit and arrange → Generate and choose → Prompt and tags → Write.
- **No artists named.** The owner asked for this to avoid bias. Techniques from charting AI acts are described by what they did ("a viral dance track's human re-record charted higher"). Links whose URLs contain act names are left out of the app.
- **Reliability verdicts on tags** (Reliable, Hit and miss, Myth). Suno has never published a tag list, so a guide that presents lore as fact misleads. Myths get their own group so readers can stop trying them.
- **Suno v6 changed the ground.** v6 launched on 9 Sep 2026 and retired every older model, so older tag lists describe behaviour that can no longer be reproduced. Entries say so where it matters: Variety at 0, short lines so v6 sings, stems that are now regenerated rather than cut.
- **Two tools inside stages.**
  - "Anatomy of a hit" draws song forms per genre as a tape strip (width is bars, height is energy, the first chorus in pencil red) and copies a matching tag skeleton.
  - "Style line builder" composes the style prompt in the recommended order, with a character count against Suno's 1,000-character limit, saved locally.
- **Sites and tools are tables.** Comparing price, length, exports and rights across rows is a table job.

## Type and color

Archivo's width axis carries the printed form: 125 at weight 850 for the title, 75 in caps for field labels, 100 for body. IBM Plex Mono sets tags, prompts and examples. Colors:
- Manila `oklch(0.95 0.02 82)`
- Sheet `oklch(0.977 0.011 86)`
- Ink `oklch(0.23 0.02 55)`
- Pencil `oklch(0.52 0.19 29)`
- Search highlight `oklch(0.88 0.11 95)`

Dark mode is a control room: `oklch(0.2 0.012 60)` with a brighter pencil.

## Skills review (2026-10-31)

Against [design/ui-skills.md](../design/ui-skills.md). The information architecture skill and its checklists (search, facets, labels) were read before design; the rest were applied through the review steps.

- **Task:** a person making an AI song finds the technique for the sound they want and learns what it will do. The search box is the first control after the masthead.
- **Structure by intent:** five arrangements of one entry set. Facets show counts and a "Clear all"; the state is in the URL.
- **Language:** a visible Terms note explains stem, DAW, LUFS, dBTP and SDR. "Audio editor (DAW)" is used in labels.
- **No hover-only meaning:** reliability shows as text plus a shape (filled, half or diamond, and struck through for myths). Song-form blocks carry visible labels and times, plus screen-reader text for bars and energy.
- **States:** a no-results message echoes the query and suggests other searches; empty stages say why.
- **Semantics:**
  - One `h1`; `h2` for stages and groups; `h3` for entries; a skip link.
  - Entry toggles are buttons with `aria-expanded` and `aria-controls`.
  - Tables use `th scope`, inside a focusable, labelled scroll region.
- **Focus survives re-renders:** the search box is built once and never re-rendered. Chips, tabs, toggles and related links restore focus by `data-key`. Jumping to a related entry moves focus to it, switching views if needed.
- **Announcements:** the result count and the song-form panel are polite live regions.
- **Forms:** builder fields have visible labels and hints linked with `aria-describedby`. The result is an `<output>`.
- **Touch:** chips and copy buttons are at least 36px tall, and tabs and toggles 44px, on coarse pointers.

Checked with Playwright:
- Tab order starts at the skip link, `/` focuses search, and typing keeps focus.
- Escape clears the search; focus survives chip, tab, toggle and related jumps.
- No console errors, no horizontal overflow at 390px, light and dark.

**Found and fixed during the review:**
- `base.css` gives `input[type=search]` a higher specificity than `.q`, which left the search box rounded and light. Fixed with `input.q`.
- The first-chorus regex matched "Pre-Chorus".
- Two suggested queries returned nothing until the search tolerated a missing word.

## Revision: docked index and contrast (2026-10-31)

Owner feedback after the first look: "create a docked index that's static so I can see and jump between subjects", and "it's so monotone there's no textures on these grids and everything looks the same, I can't focus on any one item".

- **Docked index.** A sticky left column lists the current view's sections (stages, levels or groups) with counts. It marks the section in view (IntersectionObserver, `aria-current="location"`) and opens that section's entries underneath for jumping between items. It also has Search and Top buttons. It is built from `[data-dock]` sections in the rendered page, so every view gets one, and search results list the matches. Below 1000px it becomes a sticky horizontal strip. It replaced the track list at the top of the backwards view.
- **Tape colours per stage.** Each of the eight stages has its own tape colour, like coloured labels on a track sheet. It appears on the stage number, the rule above the stage, a stripe down every entry (in every view, so a search result shows where it belongs), the stage chip and the dock. Identity only: the stage name always appears with it.
- **Banding and texture.** Alternate rows are banded, rows highlight on hover, the "You hear" column is tinted, an opened entry gets a 2px ink frame, and paper grain (an SVG noise data URI) sits under the manila.
- **Kinds by shape.** Technique is outlined, fix is filled, tag is bracketed and tool is dashed. Titles are heavier.

## Learned

- **Hash state and in-page anchors clash.** A plain `#stage-mix` link would wipe the route, so the stage strip scrolls by script and focuses the stage heading.
- **Build stateful widgets once and re-append them.** The song-form diagram and the style builder are cached elements, so re-rendering the view does not reset their state or input focus.
- **Monotone ruled lists blur together at length.** A single accent kept for meaning is right, but a long reference also needs identity colour (by section) and banding so the eye can hold one item. The first version had neither.
- **Synonyms need pruning.** "own" in the rights group made "copyright" match every "your own"; "lead" in the vocal group caught lead guitar.

## Refreshing

Suno ships monthly (release notes at suno.com/release-notes). Re-check these:
- the v6 FAQ, pricing and download caps
- Udio's download status and the Starstruck launch
- ElevenLabs and Lyria versions
- the Artificial Analysis music arena
- MVSep's leaderboard
- Spotify, Apple and distributor AI policies

Then edit `data/entries-*.ts`, `data/platforms.ts` and the dates in `index.html`.
