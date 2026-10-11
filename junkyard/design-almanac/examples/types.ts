export interface ExampleContext {
  /** Aborted when the example is unmounted; pass to listeners and timers. */
  signal: AbortSignal;
  /** False for index thumbnails (inert, small); true in the detail view. */
  interactive: boolean;
}

/**
 * A self-contained live demo. `css` and `html` are rendered inside a
 * shadow root, so selectors never leak into the app or other examples.
 */
export interface Example {
  id: string;
  css: string;
  html: string;
  setup?: (root: ShadowRoot, ctx: ExampleContext) => void;
}

/** Identity tag so example CSS and HTML read as code in editors. */
export const css = (s: TemplateStringsArray, ...v: unknown[]): string => String.raw({ raw: s }, ...v);
export const html = css;

/** Run fn every ms until the signal aborts. */
export function every(ms: number, signal: AbortSignal, fn: () => void): void {
  const id = window.setInterval(fn, ms);
  signal.addEventListener('abort', () => window.clearInterval(id));
}

export function later(ms: number, signal: AbortSignal, fn: () => void): void {
  const id = window.setTimeout(fn, ms);
  signal.addEventListener('abort', () => window.clearTimeout(id));
}

export const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
