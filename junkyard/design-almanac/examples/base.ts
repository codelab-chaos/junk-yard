import { css } from './types';

/**
 * Shared sheet adopted by every example's shadow root: a positioned,
 * size-contained canvas, plus the pause and reduced-motion switches.
 */
export const BASE_CSS = css`
  :host { display: block; position: relative; overflow: hidden; container-type: size; color-scheme: light;
    font: 14px/1.4 'Schibsted Grotesk', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
  *, *::before, *::after { box-sizing: border-box; }
  .x { position: absolute; inset: 0; }
  button { font: inherit; cursor: pointer; }
  :host([data-paused]) *, :host([data-paused]) *::before, :host([data-paused]) *::after { animation-play-state: paused !important; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  }
`;
