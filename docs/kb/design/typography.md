# Typography

Each app picks its own display face; UI and mono faces can repeat. Load from Google Fonts with `display=swap` and keep system fallbacks in the stack.

| App | Display | UI | Mono | Why |
| --- | --- | --- | --- | --- |
| Shadowbox Toolkit | Instrument Serif | Geist | Geist Mono | Gallery placard voice for names, a quiet grotesk for controls, tabular mono for every number and code |
| Design Almanac | Fraunces (opsz, SOFT, WONK) | Schibsted Grotesk | Spline Sans Mono | A soft old-style serif reads as a printed almanac and its variable axes double as a specimen; a newspaper grotesk for body; a warm mono for small caps labels and CSS techniques |
| AI Music Session Guide | Archivo (width 62 to 125) | Archivo | IBM Plex Mono | One variable family plays every printed-form role: expanded 850 for the tape box title, condensed caps for field labels, normal width for body. Plex Mono sets tags and prompts as typed |
| AI Model Usage Guide | Libre Franklin 900 | Libre Franklin | DM Mono | Franklin Gothic is the voice of manuals and selection charts; one variable family covers masthead to table cells, mono keeps price columns aligned |

## Rules of thumb

- Numbers that change while you drag belong in a mono or `font-variant-numeric: tabular-nums` face so the layout does not jitter.
- A display serif at large size plus small uppercase mono labels gives an editorial, museum feel without decoration.
- Small caps labels: 10 to 11px, letter-spacing 0.08 to 0.12em, muted color.
- Keep body copy at 14 to 16px; tools can be dense, but not tiny.
