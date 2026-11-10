import type { Level } from '../data/types';

export const VIEWS = [
  { id: 'backwards', label: 'Work backwards', note: 'From the finished record back to the first idea' },
  { id: 'ladder', label: 'Basics to advanced', note: 'Every technique by skill level' },
  { id: 'tags', label: 'Tags and markers', note: 'What each lyric tag and style word does' },
  { id: 'fixes', label: 'Fix a sound', note: 'Start from what you hear' },
  { id: 'tools', label: 'Sites and tools', note: 'Generators, stem splitters, mastering' },
] as const;

export type ViewId = (typeof VIEWS)[number]['id'];

/** Everything the page shows, kept in the URL fragment so any state can be shared. */
export interface Route {
  view: ViewId;
  q: string;
  level?: Level;
  where?: string;
  open?: string;
}

export const DEFAULT_ROUTE: Route = { view: 'backwards', q: '' };

const isView = (v: string | null): v is ViewId => VIEWS.some((x) => x.id === v);

export function readRoute(hash = window.location.hash): Route {
  const p = new URLSearchParams(hash.replace(/^#/, ''));
  const v = p.get('v');
  const lvl = Number(p.get('lvl'));
  return {
    view: isView(v) ? v : DEFAULT_ROUTE.view,
    q: (p.get('q') ?? '').slice(0, 80),
    level: lvl >= 1 && lvl <= 4 ? (lvl as Level) : undefined,
    where: p.get('in') ?? undefined,
    open: p.get('e') ?? undefined,
  };
}

export function routeHash(r: Route): string {
  const p = new URLSearchParams();
  if (r.view !== DEFAULT_ROUTE.view) p.set('v', r.view);
  if (r.q) p.set('q', r.q);
  if (r.level) p.set('lvl', String(r.level));
  if (r.where) p.set('in', r.where);
  if (r.open) p.set('e', r.open);
  const s = p.toString();
  return s ? `#${s}` : '';
}

/** Replace, not push: searching and filtering are not navigation, so Back leaves the page. */
export function writeRoute(r: Route): void {
  const hash = routeHash(r);
  if (hash === window.location.hash) return;
  history.replaceState(null, '', hash || window.location.pathname + window.location.search);
}
