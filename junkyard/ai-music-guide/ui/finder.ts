import { h } from '@lib/dom';
import { WHERE } from '../data/catalog';
import { LEVELS } from '../data/stages';
import type { Entry, Level } from '../data/types';
import { VIEWS, type Route, type ViewId } from './route';

export interface FinderHandlers {
  query(q: string): void;
  level(l: Level | undefined): void;
  where(w: string | undefined): void;
  view(v: ViewId): void;
  clear(): void;
}

const SUGGESTED = ['clean stems', '[Whisper]', 'metallic highs', 'stop singing the tags', 'force an ending', 'radio ready', 'lyrics mispronounced', 'loudness'];

/** The search box is built once so typing never loses focus; everything around it re-renders. */
export function mountFinder(container: HTMLElement, on: FinderHandlers) {
  const input = h('input', {
    type: 'search',
    id: 'q',
    class: 'q',
    autocomplete: 'off',
    spellcheck: 'false',
    placeholder: 'clean stems, [Whisper], metallic highs…',
    'aria-describedby': 'q-hint',
  });
  input.addEventListener('input', () => on.query(input.value));
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && input.value) {
      ev.preventDefault();
      input.value = '';
      on.query('');
    }
  });
  const form = h(
    'form',
    { role: 'search', class: 'finder-form', 'aria-label': 'Search the guide' },
    h('label', { for: 'q', class: 'q-label' }, 'Search the guide'),
    h('div', { class: 'q-wrap' }, input, h('kbd', { class: 'q-kbd', 'aria-hidden': 'true' }, '/')),
  );
  form.addEventListener('submit', (ev) => ev.preventDefault());

  const hint = h('p', { class: 'q-hint', id: 'q-hint' });
  const facets = h('div', { class: 'facets' });
  const status = h('p', { class: 'status', 'aria-live': 'polite' });
  const tabs = h('nav', { class: 'views', 'aria-label': 'Ways to read the guide' });
  container.append(form, hint, facets, status);
  document.querySelector('.views-slot')?.append(tabs);

  // "/" focuses search from anywhere except another text field.
  window.addEventListener('keydown', (ev) => {
    const t = ev.target as HTMLElement;
    if (ev.key === '/' && !(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)) {
      ev.preventDefault();
      input.focus();
    }
  });

  function chipRow<T>(label: string, items: { value: T; text: string; count: number }[], current: T | undefined, pick: (v: T | undefined) => void, key: string): HTMLElement {
    return h(
      'fieldset',
      { class: 'facet' },
      h('legend', { class: 'label' }, label),
      ...items.map((it) => {
        const on = it.value === current;
        const b = h('button', { type: 'button', class: 'chip', 'aria-pressed': String(on), 'data-key': `${key}-${String(it.value)}`, disabled: !on && it.count === 0 }, it.text, h('span', { class: 'chip-n' }, String(it.count)));
        b.addEventListener('click', () => pick(on ? undefined : it.value));
        return b;
      }),
    );
  }

  /** Counts are what each chip would leave, given the search and the other facet. */
  return function update(route: Route, base: Entry[], shown: number) {
    if (input.value !== route.q) input.value = route.q;
    hint.replaceChildren('Try ', ...SUGGESTED.slice(0, 6).flatMap((s, i) => {
      const b = h('button', { type: 'button', class: 'linkish', 'data-key': `sug-${i}` }, s);
      b.addEventListener('click', () => on.query(s));
      return i ? [' · ', b] : [b];
    }));
    const byWhere = route.where ? base.filter((e) => matchesWhere(e, route.where!)) : base;
    const byLevel = route.level ? base.filter((e) => e.level === route.level) : base;
    facets.replaceChildren(
      chipRow('Level', LEVELS.map((l) => ({ value: l.level, text: l.name, count: byWhere.filter((e) => e.level === l.level).length })), route.level, on.level, 'lvl'),
      chipRow('Works in', WHERE.map((w) => ({ value: w.id, text: w.name, count: byLevel.filter((e) => matchesWhere(e, w.id)).length })), route.where, on.where, 'in'),
    );
    const filtered = !!(route.q || route.level || route.where);
    const clear = h('button', { type: 'button', class: 'linkish', 'data-key': 'clear' }, 'Clear all');
    clear.addEventListener('click', on.clear);
    status.replaceChildren(
      route.q ? `${shown} ${shown === 1 ? 'match' : 'matches'} for “${route.q}”` : `${shown} ${shown === 1 ? 'entry' : 'entries'}`,
      filtered ? ' · ' : '',
      filtered ? clear : '',
    );
    tabs.replaceChildren(
      h(
        'ul',
        {},
        ...VIEWS.map((v) => {
          const current = !route.q && v.id === route.view;
          const b = h('button', { type: 'button', class: 'view-tab', 'aria-pressed': String(current), 'data-key': `view-${v.id}` }, h('span', { class: 'view-tab-name' }, v.label), h('span', { class: 'view-tab-note' }, v.note));
          b.addEventListener('click', () => on.view(v.id));
          return h('li', {}, b);
        }),
      ),
    );
  };
}

/** Entries marked 'any' work in every generator. */
export function matchesWhere(e: Entry, where: string): boolean {
  const w = e.where ?? ['any'];
  return w.includes(where) || (where !== 'daw' && w.includes('any'));
}
