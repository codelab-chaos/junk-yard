# Typography

Each app picks its own display face; UI and mono faces can repeat. Load from Google Fonts with `display=swap` and keep system fallbacks in the stack.

| App | Display | UI | Mono | Why |
| --- | --- | --- | --- | --- |
| Shadowbox Toolkit | Instrument Serif | Geist | Geist Mono | Gallery placard voice for names, a quiet grotesk for controls, tabular mono for every number and code |
| Design Almanac | Fraunces (opsz, SOFT, WONK) | Schibsted Grotesk | Spline Sans Mono | A soft old-style serif reads as a printed almanac and its variable axes double as a specimen; a newspaper grotesk for body; a warm mono for small caps labels and CSS techniques |

## Rules of thumb

- Numbers that change while you drag belong in a mono or `font-variant-numeric: tabular-nums` face so the layout does not jitter.
- A display serif at large size plus small uppercase mono labels gives an editorial, museum feel without decoration.
- Small caps labels: 10 to 11px, letter-spacing 0.08 to 0.12em, muted color.
- Keep body copy at 14 to 16px; tools can be dense, but not tiny.
