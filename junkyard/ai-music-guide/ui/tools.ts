import { h } from '@lib/dom';
import { PLATFORMS, TOOLS } from '../data/catalog';
import type { Tool } from '../data/types';

const TOOL_KINDS: { id: Tool['kind']; name: string; note: string }[] = [
  { id: 'separation', name: 'Stem separation', note: 'Splitting a finished song into vocals, drums, bass and the rest.' },
  { id: 'cleanup', name: 'Repair and clean-up', note: 'Removing shimmer, noise, harsh esses and bleed.' },
  { id: 'midi', name: 'Audio to MIDI', note: 'Turning a part into notes, so a real instrument or plugin can replay it.' },
  { id: 'mastering', name: 'Mastering', note: 'Final loudness and tone.' },
];

let built: HTMLElement | undefined;

/** Two reference tables: song generators, then the tools that work on their output. Static, so built once. */
export function renderTools(): HTMLElement {
  if (built) return built;
  const gen = h(
    'section',
    { class: 'group', id: 'group-generators', 'aria-labelledby': 'gen-h', 'data-dock': 'Song generators' },
    h('header', { class: 'group-head' }, h('h2', { class: 'group-name', id: 'gen-h' }, 'Song generators'), h('p', { class: 'group-note' }, 'Prices and versions as checked on 31 Oct 2026. They change often; check before you subscribe.')),
    h(
      'div',
      { class: 'table-wrap', tabindex: '0', role: 'region', 'aria-label': 'Song generators, scrolls sideways' },
      h(
        'table',
        { class: 'ref' },
        h('thead', {}, h('tr', {}, ...['Generator', 'Best at', 'Model now', 'Price', 'Length', 'Exports', 'Rights', 'Use it when'].map((t) => h('th', { scope: 'col' }, t)))),
        h(
          'tbody',
          {},
          ...PLATFORMS.map((p) =>
            h(
              'tr',
              {},
              h('th', { scope: 'row' }, h('a', { href: p.url, target: '_blank', rel: 'noopener' }, p.name), h('span', { class: 'ref-sub' }, p.maker)),
              h('td', {}, p.best),
              h('td', {}, p.model),
              h('td', {}, p.price),
              h('td', {}, p.length),
              h('td', {}, p.exports),
              h('td', {}, p.rights),
              h('td', {}, p.use),
            ),
          ),
        ),
      ),
    ),
  );
  const kinds = TOOL_KINDS.map((k) => {
    const rows = TOOLS.filter((t) => t.kind === k.id);
    return h(
      'section',
      { class: 'group', id: `group-${k.id}`, 'aria-labelledby': `tk-${k.id}`, 'data-dock': k.name },
      h('header', { class: 'group-head' }, h('h2', { class: 'group-name', id: `tk-${k.id}` }, k.name), h('p', { class: 'group-note' }, k.note)),
      h(
        'div',
        { class: 'table-wrap', tabindex: '0', role: 'region', 'aria-label': `${k.name} tools, scrolls sideways` },
        h(
          'table',
          { class: 'ref ref-tools' },
          h('thead', {}, h('tr', {}, ...['Tool', 'Runs', 'Price', 'Best at', 'Notes'].map((t) => h('th', { scope: 'col' }, t)))),
          h(
            'tbody',
            {},
            ...rows.map((t) => h('tr', {}, h('th', { scope: 'row' }, h('a', { href: t.url, target: '_blank', rel: 'noopener' }, t.name)), h('td', {}, t.runs), h('td', {}, t.price), h('td', {}, t.best), h('td', {}, t.note))),
          ),
        ),
      ),
    );
  });
  built = h('div', { class: 'tools' }, gen, ...kinds);
  return built;
}
