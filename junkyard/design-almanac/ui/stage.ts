import { BASE_CSS } from '../examples/base';
import type { Example } from '../examples';

/** Design size every thumbnail is laid out at before being zoomed to fit. */
export const THUMB_W = 720;
export const THUMB_H = 450;

const sheets = new Map<string, CSSStyleSheet>();

function sheet(key: string, text: string): CSSStyleSheet {
  let s = sheets.get(key);
  if (!s) {
    s = new CSSStyleSheet();
    s.replaceSync(text);
    sheets.set(key, s);
  }
  return s;
}

/**
 * Renders an example into `host` behind a shadow root, so its CSS is fully
 * scoped. Stylesheets are constructed once per example and shared between
 * the thumbnail and the detail view. Returns an unmount function.
 */
export function mountExample(host: HTMLElement, example: Example, interactive: boolean): () => void {
  const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
  root.adoptedStyleSheets = [sheet('__base', BASE_CSS), sheet(example.id, example.css)];
  root.innerHTML = example.html;
  host.toggleAttribute('data-interactive', interactive);
  const controller = new AbortController();
  example.setup?.(root, { signal: controller.signal, interactive });
  return () => {
    controller.abort();
    root.replaceChildren();
  };
}
