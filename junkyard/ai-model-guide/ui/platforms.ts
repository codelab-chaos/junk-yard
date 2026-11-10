import { h } from '@lib/dom';
import { PLATFORMS } from '../data/platforms';

/** Multi-model apps and APIs side by side. */
export function renderPlatforms(container: HTMLElement): void {
  const rows = PLATFORMS.map((p) =>
    h(
      'tr',
      {},
      h('th', { scope: 'row' }, h('a', { href: p.url, target: '_blank', rel: 'noopener' }, p.name)),
      h('td', { 'data-label': 'Price' }, p.price),
      h('td', { 'data-label': 'Allowance' }, p.credits),
      h('td', { 'data-label': 'Models' }, p.models),
      h('td', { 'data-label': 'Best for' }, p.bestFor),
      h('td', { 'data-label': 'Watch out' }, p.watch),
    ),
  );

  container.replaceChildren(
    h(
      'div',
      { class: 'table-wrap' },
      h(
        'table',
        { class: 'plat' },
        h(
          'thead',
          {},
          h('tr', {}, ...['Platform', 'Price', 'Allowance', 'Models', 'Best for', 'Watch out'].map((t) => h('th', { scope: 'col' }, t))),
        ),
        h('tbody', {}, ...rows),
      ),
    )
  );
}
