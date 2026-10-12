import { h } from '@lib/dom';
import { LINEAGES } from '../data/lineages';
import { matches, NO_FILTERS, TOTAL, type Filters } from '../data/query';
import { WORLDS } from '../data/worlds';

interface FilterUi {
  /** Reflect filters coming from the URL without firing onChange. */
  set(filters: Filters): void;
  showCount(shown: number): void;
  focusSearch(): void;
}

/** How many worlds carry a lineage anywhere in their list. */
const lineageCount = (id: string) => WORLDS.filter((w) => matches(w, { ...NO_FILTERS, lineage: id as Filters['lineage'] })).length;

/**
 * Search and lineage filters for the index. Owns no state beyond what it
 * shows; every change goes out through onChange.
 */
export function mountFilters(container: HTMLElement, onChange: (f: Filters) => void): FilterUi {
  let current: Filters = NO_FILTERS;
  const emit = (patch: Partial<Filters>) => {
    current = { ...current, ...patch };
    paint();
    onChange(current);
  };

  const search = h('input', { type: 'search', id: 'q', placeholder: 'neon, concrete, CRT…', autocomplete: 'off', spellcheck: false });
  search.addEventListener('input', () => emit({ q: search.value }));

  const chips = [{ id: 'all', title: 'All', n: TOTAL }, ...LINEAGES.map((l) => ({ id: l.id, title: l.title, n: lineageCount(l.id) }))]
    .filter((c) => c.n > 0)
    .map((c) => {
      const b = h('button', { type: 'button', class: 'chip', 'data-id': c.id }, c.title, h('span', { class: 'chip-n' }, String(c.n)));
      b.addEventListener('click', () => emit({ lineage: (current.lineage === c.id ? 'all' : c.id) as Filters['lineage'] }));
      return b;
    });

  const count = h('p', { class: 'rail-count', 'aria-live': 'polite' });

  function paint() {
    if (search.value !== current.q) search.value = current.q;
    for (const b of chips) b.setAttribute('aria-pressed', String(b.dataset.id === current.lineage));
  }

  container.append(
    h('label', { class: 'rail-search', for: 'q' }, h('span', { class: 'label' }, 'Search'), search),
    h('div', { class: 'chips', role: 'group', 'aria-label': 'Lineage' }, ...chips),
    count,
  );
  paint();

  return {
    set(f) {
      current = f;
      paint();
    },
    showCount(shown) {
      count.textContent = shown === TOTAL ? `${TOTAL} worlds` : `${shown} of ${TOTAL} worlds`;
    },
    focusSearch() {
      search.focus();
      search.select();
    },
  };
}
