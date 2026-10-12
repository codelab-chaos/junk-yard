import { isLineage, isMedium, NO_FILTERS, type Filters } from '../data/query';

/** Everything the page shows, as stored in the URL fragment. */
export interface Route {
  world?: string;
  filters: Filters;
}

export function readRoute(hash = window.location.hash): Route {
  const p = new URLSearchParams(hash.replace(/^#/, ''));
  const medium = p.get('m');
  const lineage = p.get('l');
  return {
    world: p.get('w') ?? undefined,
    filters: {
      medium: isMedium(medium) ? medium : 'all',
      lineage: isLineage(lineage) ? lineage : 'all',
      q: (p.get('q') ?? '').slice(0, 80),
    },
  };
}

export function routeHash({ world, filters }: Route): string {
  const p = new URLSearchParams();
  if (world) p.set('w', world);
  if (filters.medium !== NO_FILTERS.medium) p.set('m', filters.medium);
  if (filters.lineage !== NO_FILTERS.lineage) p.set('l', filters.lineage);
  if (filters.q) p.set('q', filters.q);
  const s = p.toString();
  return s ? `#${s}` : '';
}

/** Push for navigation (back returns), replace while typing or filtering. */
export function writeRoute(route: Route, mode: 'push' | 'replace'): void {
  const hash = routeHash(route);
  if (hash === window.location.hash) return;
  const url = hash || window.location.pathname + window.location.search;
  if (mode === 'push') history.pushState(null, '', url);
  else history.replaceState(null, '', url);
}
