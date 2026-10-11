# Shadowbox Toolkit

Browse, edit and share CSS box-shadows. Redesigned 2026-10-10.

Screens: `docs/screens/shadowbox-desktop.png`, `shadowbox-mobile.png`, `shadowbox-collection.png`.

## Concept

A museum shadow box: a framed display case lit by a single lamp.

- **Stage** is the display case: crop marks in the corners, a faint frame, a mono readout of the light angle and layer count. Ink on the stage flips light or dark from the backdrop's luminance so it stays readable on any scene.
- **The lamp** is the one amber element. It orbits the box on a dashed ring; dragging anywhere on the stage moves it, and every layer's offset rotates and stretches to match. This turns "edit X and Y on four layers" into one gesture, and keeps all layers consistent with one light (see [shadows.md](../design/shadows.md)).
- **Placard** under the stage names the piece in Instrument Serif; it is the editable preset name.
- **The collection** is a specimen drawer: a hairline grid of cells, each with the preset's own backdrop, numbered collection headings, and a text index of collections instead of a dropdown.

## Usability changes and why

| Change | Why |
| --- | --- |
| Hover or focus a specimen to preview it on the stage, click to load | Browse 150 presets without losing the current design |
| Drag the light, or arrow keys on the light | Direct manipulation of the most common edit |
| Undo and redo (buttons, Ctrl+Z, Ctrl+Shift+Z), idle-debounced | Safe to experiment; a drag is one step |
| Layers as compact rows, one open at a time, isolated layer thumbnail | The old stacked cards made multi-layer shadows a long scroll |
| Drop / Inset segmented control | Clearer than a checkbox labelled "inset" |
| Scrubbable control labels | Fine adjustments without aiming at a slider |
| Scene swatches (8 backdrops including neumorphic Clay) | One click instead of two color pickers |
| Tint to scene | Shadows that match colored backdrops, from research |
| Output as tabs with syntax color, `C` to copy | Formats were hidden in a select |
| Paste any box-shadow anywhere to import | The import box is still there, but rarely needed |
| Toasts for confirmations | Status text no longer shifts the toolbar |
| Sticky stage on phones | Edits in the inspector stay visible |

## Visual system

- Palette: warm plaster and ink (`--bg #efebe4`, `--ink #1c1a17`), amber lamp `#f3a73b`, burnt amber accent for focus and active. Dark mode is the gallery at night.
- Type: Instrument Serif (wordmark, placard, headings), Geist (UI), Geist Mono (numbers, code, labels).
- Primary actions are ink, not accent, so amber always means light or focus.
- Modern CSS used: size container queries (`cqmin`) so the light orbit and box size scale with the stage, `color-mix()` for tints, `display: contents` to re-order the viewer on mobile so the stage can stick across the inspector.

## Architecture notes

- Pure shadow math lives in `shadow/transforms.ts` (light angle, relight, tint, luminance); UI modules only call it.
- `ui/peek.ts` holds the transient preview so the store and history never see hover state.
- `ui/history.ts` subscribes to the store; undo applies snapshots through `store.load`.
- Scenes, icons, output formats, highlight rules and shortcuts are all data records: add one by adding a record.

## Learned

- `display: contents` plus `order` is the cleanest way to let one child of a column become sticky across siblings outside its parent.
- A hairline grid drawn with `gap: 1px` on a colored background fills a short last row with the border color. Draw right and bottom borders per cell instead.
- Shadow thumbnails at 34px need the alpha floored (we use 0.45) or they vanish.
