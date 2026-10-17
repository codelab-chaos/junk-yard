# Catalog (home page)

## Concept

A junk chute: a hopper at the top of the page keeps dropping scrap polygons that tumble off steel deflectors behind the catalog. Clicking the chute opens tinker mode, where the page steps back and the deflectors become editable.

## Key decisions

- **Simple gravity, no physics library.** Junk pieces collide as circles and draw as irregular polygons; deflectors are fixed convex polygons. Four substeps per frame and a speed cap keep junk from tunneling through 12px bars. Pairwise junk collisions are fine under the 90-piece cap.
- **Data-driven.** Physics constants, spawn rules, deflector kinds (outline points), the default layout and theme tokens live in `src/catalog/chute/config.ts`. The toolbar buttons and their icons are generated from the same deflector points the physics uses.
- **Separated concerns.** `world.ts` simulates with no DOM, `render.ts` draws from CSS tokens, `editor.ts` owns pointer and keyboard editing, `layout-store.ts` persists, `index.ts` wires the mode and loop.
- **Backdrop, not foreground.** The canvas is fixed behind the page at 45% opacity with no pointer events; cards keep opaque panels so text stays readable.
- **Settled junk fades.** Pieces resting for 6 seconds fade out, and the oldest fade when over the cap, so piles never grow without bound.
- **Layout is per viewer.** Deflector positions are viewport fractions saved in localStorage (`junkyard:chute-layout`), so a layout survives reloads and roughly survives resizes. Deflector sizes stay in px.
- **Reduced motion.** Ambient falling stops (deflectors still draw); tinker mode runs because the viewer asked for it.

## Learned

- A tiny chute rattle on hover signals the hopper is clickable. A permanent TINKER caption on the left is mirrored by an unlabeled count of junk on screen on the right; the pair reads as a gauge without needing a label.
- The selected deflector shows a rotation knob and, 40px beside it, a remove x. The gap keeps the two 20px touch targets from overlapping.
- Phone widths need shorter deflectors; the 320px plank spans most of a 390px screen.
