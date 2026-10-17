import { h } from '@lib/dom';
import { boundingRadius } from './geometry';
import type { DeflectorKind } from './config';

export interface ToolbarActions {
  add(kind: string): void;
  clear(): void;
  reset(): void;
  done(): void;
}

const SVG = 'http://www.w3.org/2000/svg';
const ICON = 20;

/** A small outline of a deflector kind, drawn from the same points the physics uses. */
function kindIcon({ points }: DeflectorKind): SVGSVGElement {
  const scale = (ICON / 2 - 1) / boundingRadius(points);
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', `${-ICON / 2} ${-ICON / 2} ${ICON} ${ICON}`);
  svg.setAttribute('width', String(ICON));
  svg.setAttribute('height', String(ICON));
  svg.setAttribute('aria-hidden', 'true');
  const poly = document.createElementNS(SVG, 'polygon');
  poly.setAttribute('points', points.map(([x, y]) => `${(x * scale).toFixed(2)},${(y * scale).toFixed(2)}`).join(' '));
  svg.append(poly);
  return svg;
}

function button(label: string, onClick: () => void, cls = '', icon?: SVGSVGElement): HTMLButtonElement {
  const btn = h('button', { type: 'button', class: cls || undefined }, label);
  if (icon) btn.prepend(icon);
  btn.addEventListener('click', onClick);
  return btn;
}

/** Tinker-mode controls, built from the deflector kinds data. */
export function buildToolbar(kinds: Record<string, DeflectorKind>, actions: ToolbarActions): HTMLElement {
  return h(
    'section',
    { class: 'chute-toolbar', 'aria-label': 'Chute tinker tools', hidden: true },
    h(
      'div',
      { class: 'chute-toolbar-row' },
      h('span', { class: 'chute-label' }, 'Add'),
      ...Object.entries(kinds).map(([kind, spec]) =>
        button(spec.label, () => actions.add(kind), 'chute-kind', kindIcon(spec)),
      ),
      h('span', { class: 'chute-sep', 'aria-hidden': 'true' }),
      button('Clear', actions.clear),
      button('Reset', actions.reset),
      button('Done', actions.done, 'primary'),
    ),
    h(
      'p',
      { class: 'chute-hint' },
      'Drag to move. Drag the knob, scroll, or press Q / E to rotate. The x or Delete removes. Esc exits.',
    ),
  );
}
