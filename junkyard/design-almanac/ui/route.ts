import { isCategory, isKind, NO_FILTERS, type Filters } from '../data/query';

/** Everything the page shows, as stored in the URL fragment. */
export interface Route {
  style?: string;
  filters: Filters;
}

export function readRoute(hash = window.location.hash): Route {
  const p = new URLSearchParams(hash.replace(/^#/, ''));
  const kind = p.get('kind');
  const cat = p.get('cat');
  return {
    style: p.get('style') ?? undefined,
    filters: {
      kind: isKind(kind) ? kind : 'all',
      category: isCategory(cat) ? cat : 'all',
      q: (p.get('q') ?? '').slice(0, 80),
    },
  };
}

export function routeHash({ style, filters }: Route): string {
  const p = new URLSearchParams();
  if (style) p.set('style', style);
  if (filters.kind !== NO_FILTERS.kind) p.set('kind', filters.kind);
  if (filters.category !== NO_FILTERS.category) p.set('cat', filters.category);
  if (filters.q) p.set('q', filters.q);
  const s = p.toString();
  return s ? `#${s}` : '';
}

/** Push for navigation (back button returns), replace for filter typing. */
export function writeRoute(route: Route, mode: 'push' | 'replace'): void {
  const hash = routeHash(route);
  if (hash === window.location.hash) return;
  const url = hash || window.location.pathname + window.location.search;
  if (mode === 'push') history.pushState(null, '', url);
  else history.replaceState(null, '', url);
}
