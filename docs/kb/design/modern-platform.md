# Modern Platform Features

Browser features worth reaching for in junkyard apps. Use anything not marked Baseline as progressive enhancement: the page must work without it.

Status checked 2026-10-10. Re-check on [web.dev Baseline](https://web.dev/baseline) or caniuse before relying on a feature that is not yet widely available.

| Feature | Status | Use it for | Notes |
| --- | --- | --- | --- |
| Custom properties, `color-mix()`, `oklch()` | Baseline | Palettes, tints, hover states derived from tokens | `color-mix(in oklab, var(--text) 8%, transparent)` replaces most hand-picked tints |
| Container queries | Baseline | Components that adapt to their slot, not the viewport | |
| `:has()` | Baseline | Parent state styling (a row that contains an open disclosure) | |
| CSS nesting | Baseline | Keeping component CSS together | |
| Same-document View Transitions | Baseline newly available (Interop 2025) | Morphing between states, such as loading a preset | Guard with `document.startViewTransition?.()` |
| Cross-document View Transitions | Interop 2026 focus area | Page to page navigation in the catalog | Enhancement only |
| `@starting-style` and `transition-behavior: allow-discrete` | Baseline | Entry animations for toasts, popovers, `display` toggles | |
| Popover API | Baseline | Menus and lightweight overlays without JS positioning | |
| CSS anchor positioning | Reported as newly available in 2026, unconfirmed | Tooltips anchored to triggers | Treat as enhancement until verified |
| Scroll-driven animations | Not Baseline as of mid 2026 (Firefox stable behind a flag) | Reading progress, parallax | Enhancement only, never required for content |

## Sources

- [Interop 2026, web.dev](https://web.dev/blog/interop-2026)
- [What's new in CSS, modern-css.com](https://modern-css.com/whats-new/)
- [Scroll-driven animations cross-browser status, buildmvpfast.com](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
