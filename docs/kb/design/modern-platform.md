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
| Cross-document View Transitions | Interop 2026 focus area | Page to page navigation across the whole yard: `@view-transition { navigation: auto; }` in `src/styles/base.css`, inside a reduced-motion guard | Enhancement only; browsers without it just navigate |
| `@starting-style` and `transition-behavior: allow-discrete` | Baseline | Entry animations for toasts, popovers, `display` toggles | |
| Popover API | Baseline | Menus and lightweight overlays without JS positioning | |
| CSS anchor positioning | Reported as newly available in 2026, unconfirmed | Tooltips anchored to triggers | Treat as enhancement until verified |
| Scroll-driven animations | Not Baseline as of mid 2026 (Firefox stable behind a flag) | Reading progress, parallax | Enhancement only, never required for content |

## Clean page loads (checked 2026-10-10)

Rule: a page never shows a half-built state. Either it is presentable on first paint, or it shows a pulser until it is.

- **First paint background.** Every page `<head>` has `<meta name="color-scheme" content="light dark">` and an inline `<style>` giving `html` the page's own `--bg` for light and dark. Without it the browser paints default white (or black) until CSS arrives, which flashes on every navigation, worst in dark mode.
- **Keep the inline colors in sync** with the page's `--bg` token when a palette changes.
- **Crossfade between pages** with cross-document view transitions (see the table above); the old page stays up until the new one can render.
- **Dev mode is noisier.** `vite dev` injects CSS from JS after the first paint, so unstyled frames show there that the build does not have. Judge load quality on `npm run build && npm run preview`.
- **Pulsers for real waits.** When content depends on a fetch, fonts or large assets, show a quiet pulser in the page's own palette and reveal the finished layout in one step, rather than letting pieces pop in.
- **How to verify.** Load the page with JavaScript off and stylesheets blocked (Playwright `route` abort on `.css`) in both color schemes; the background should already be the page's own.

## Sources

- [Cross-document view transitions, MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition)

- [Interop 2026, web.dev](https://web.dev/blog/interop-2026)
- [What's new in CSS, modern-css.com](https://modern-css.com/whats-new/)
- [Scroll-driven animations cross-browser status, buildmvpfast.com](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
