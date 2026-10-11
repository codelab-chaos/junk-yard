# Art Direction

Every junkyard page should have art appeal and show modern web design at its best. A one-off tool is still a finished piece.

## Give each app a concept

Pick one idea drawn from the app's subject and let it drive type, color, layout and motion. The concept should explain the interface, not decorate it.

| App | Concept | How it shows up |
| --- | --- | --- |
| Shadowbox Toolkit | A museum shadow box: a framed display case with a single lamp | Framed stage with crop marks, a draggable light that sets shadow direction, a gallery placard for the preset name, the library as a specimen drawer |
| Design Almanac | A printed almanac: a field guide of fifty styles | Table of contents in chapters with numbered entries and live thumbnails, rubric red marking what is in season, each entry a full-size interactive plate with a caption, running head and double rules. See [apps/design-almanac.md](../apps/design-almanac.md) |

Good concepts come from the nouns in the app's job (light, shadow, specimen, map, ledger, instrument). Avoid concepts that only add ornament.

## Shared foundations

- **Tokens first.** Each app defines its palette as CSS custom properties on `:root`, overriding `src/styles/base.css`, with a dark variant under `prefers-color-scheme: dark`.
- **One accent, used for meaning.** In Shadowbox the amber accent is the light source and active state only. Primary buttons are ink, not accent.
- **Type pairing.** A display face for identity, a neutral UI face, a mono for numbers and code. See [typography.md](typography.md).
- **Hairlines over boxes.** Prefer 1px dividers and shared grid gutters to a card around every section.
- **Mobile is a real layout.** Design the phone composition on purpose (for Shadowbox, a sticky stage so edits stay visible), 16px side gutter, no horizontal scroll.
- **Motion explains state.** Animate a change the user caused (a preset morphing in, a toast arriving), not idle decoration. Respect `prefers-reduced-motion`.

## Checklist before shipping

1. Can you name the concept in five words, and does every decorative element serve it?
2. Is the main action obvious within one second at phone and desktop widths?
3. Does it look intentional in both light and dark mode?
4. Keyboard: visible focus rings, logical tab order, shortcuts listed where relevant.
5. Does it avoid the generic AI look listed in `AGENTS.MD`?
6. Did you add what you learned to this KB?
