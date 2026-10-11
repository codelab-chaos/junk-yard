import { h } from '@lib/dom';
import { CATEGORIES } from '../data/categories';
import { STYLES } from '../data/styles';
import { KIND_LABEL, type Kind } from '../data/types';
import type { Filters } from '../data/query';

interface FilterUi {
  /** Reflect filters coming from the URL without firing onChange. */
  set(filters: Filters): void;
  showCount(shown: number): void;
  focusSearch(): void;
}

const count = (pred: (s: (typeof STYLES)[number]) => boolean) => STYLES.filter(pred).length;

/**
 * The index rail: search, season (trending or mainstay) and chapter
 * filters. Owns no state; it reports every change through onChange.
 */
export function mountFilters(container: HTMLElement, onChange: (f: Filters) => void): FilterUi {
  let current: Filters = { kind: 'all', category: 'all', q: '' };
  const emit = (patch: Partial<Filters>) => {
    current = { ...current, ...patch };
    paint();
    onChange(current);
  };

  const search = h('input', {
    type: 'search',
    id: 'q',
    placeholder: 'glass, grid, 2014…',
    autocomplete: 'off',
    spellcheck: false,
  });
  search.addEventListener('input', () => emit({ q: search.value }));

  const kinds: (Kind | 'all')[] = ['all', 'trending', 'mainstay'];
  const kindButtons = kinds.map((k) => {
    const b = h(
      'button',
      { type: 'button', class: `season season-${k}`, 'data-kind': k },
      h('span', {}, k === 'all' ? 'All' : KIND_LABEL[k]),
      h('small', {}, String(k === 'all' ? STYLES.length : count((s) => s.kind === k))),
    );
    b.addEventListener('click', () => emit({ kind: k }));
    return b;
  });

  const allChapters = h('button', { type: 'button', class: 'chapter', 'data-cat': 'all' }, h('b', {}, '§'), h('span', {}, 'All chapters'));
  allChapters.addEventListener('click', () => emit({ category: 'all' }));
  const chapterButtons = [
    allChapters,
    ...CATEGORIES.map((c) => {
      const b = h(
        'button',
        { type: 'button', class: 'chapter', 'data-cat': c.id },
        h('b', {}, c.numeral),
        h('span', {}, c.title),
        h('small', {}, String(count((s) => s.category === c.id))),
      );
      b.addEventListener('click', () => emit({ category: current.category === c.id ? 'all' : c.id }));
      return b;
    }),
  ];

  const status = h('p', { class: 'rail-count', role: 'status' });

  container.append(
    h('label', { class: 'rail-label', for: 'q' }, 'Find a style'),
    search,
    h('div', { class: 'rail-label' }, 'Season'),
    h('div', { class: 'seasons' }, ...kindButtons),
    h('div', { class: 'rail-label' }, 'Chapters'),
    h('nav', { class: 'chapters', 'aria-label': 'Chapters' }, ...chapterButtons),
    status,
  );

  function paint() {
    if (search.value !== current.q) search.value = current.q;
    kindButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.kind === current.kind)));
    chapterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === current.category)));
  }

  return {
    set(filters) {
      current = filters;
      paint();
    },
    showCount(shown) {
      status.textContent = shown === STYLES.length ? `${STYLES.length} entries` : `${shown} of ${STYLES.length} entries`;
    },
    focusSearch: () => search.focus(),
  };
}
