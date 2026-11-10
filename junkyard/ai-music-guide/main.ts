import '@styles/base.css';
import './styles.css';
import { byId } from '@lib/dom';
import { ENTRIES, findEntry } from './data/catalog';
import { buildIndex, matchStems, search } from './data/search';
import type { Entry } from './data/types';
import { renderDock } from './ui/dock';
import { matchesWhere, mountFinder } from './ui/finder';
import { readRoute, VIEWS, writeRoute, type Route } from './ui/route';
import { renderBackwards, renderFixes, renderLadder, renderResults, renderTags, renderToolsView, type ViewContext } from './ui/views';

const main = byId('main');
const index = buildIndex(ENTRIES);
let route: Route = readRoute();

const updateFinder = mountFinder(byId('finder'), {
  query: (q) => update({ q, open: undefined }),
  level: (level) => update({ level }),
  where: (where) => update({ where }),
  view: (view) => update({ view, q: '', open: undefined }, { top: true }),
  clear: () => update({ q: '', level: undefined, where: undefined }),
});

function visible(r: Route): { base: Entry[]; shown: Entry[] } {
  const base = r.q ? search(index, r.q) : ENTRIES;
  const shown = base.filter((e) => (!r.level || e.level === r.level) && (!r.where || matchesWhere(e, r.where)));
  return { base, shown };
}

/** Entries the current view can show, before facets. */
function inView(r: Route, e: Entry): boolean {
  if (r.q) return true;
  if (r.view === 'tags') return e.kind === 'tag';
  if (r.view === 'fixes') return e.kind === 'fix';
  if (r.view === 'tools') return e.kind === 'tool';
  return true;
}

interface Focus {
  /** Move focus to this entry's toggle and bring it into view. */
  entry?: string;
  top?: boolean;
}

/**
 * Rendering rebuilds the results, which would drop keyboard focus to <body>.
 * Controls carry a data-key; focus returns to the same control, or to the
 * entry just jumped to. The search box is never rebuilt.
 */
function update(patch: Partial<Route>, focus: Focus = {}) {
  const active = document.activeElement as HTMLElement | null;
  const focused = active?.id === 'q' ? undefined : active?.dataset.key;
  route = { ...route, ...patch };
  writeRoute(route);
  render();
  const key = focus.entry ? `e-${focus.entry}` : focused;
  if (key) document.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`)?.focus({ preventScroll: true });
  const behavior: ScrollBehavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  if (focus.entry) document.getElementById(`e-${focus.entry}`)?.scrollIntoView({ block: 'start', behavior });
  else if (focus.top) byId('finder').scrollIntoView({ block: 'start', behavior });
}

/** Opening a related entry the current view hides switches to the full backwards view first. */
function jump(id: string) {
  const target = findEntry(id);
  if (!target) return;
  const { shown } = visible(route);
  const reachable = shown.includes(target) && inView(route, target);
  const patch: Partial<Route> = reachable ? { open: id } : { view: 'backwards', q: '', level: undefined, where: undefined, open: id };
  update(patch, { entry: id });
}

function render() {
  const { base, shown } = visible(route);
  const entries = shown.filter((e) => inView(route, e));
  const ctx: ViewContext = {
    entries,
    open: route.open,
    on: { toggle: (id) => update({ open: route.open === id ? undefined : id }), jump },
  };
  updateFinder(route, base.filter((e) => inView(route, e)), entries.length);
  document.body.dataset.view = route.q ? 'results' : route.view;
  const view = route.q
    ? renderResults(ctx, route.q, matchStems(route.q), () => update({ q: '' }), (q) => update({ q }))
    : route.view === 'ladder'
      ? renderLadder(ctx)
      : route.view === 'tags'
        ? renderTags(ctx)
        : route.view === 'fixes'
          ? renderFixes(ctx)
          : route.view === 'tools'
            ? renderToolsView(ctx)
            : renderBackwards(ctx);
  main.replaceChildren(view);
  renderDock(byId('dock'), main, route.q ? `${entries.length} matches` : VIEWS.find((v) => v.id === route.view)!.label);
}

window.addEventListener('hashchange', () => {
  route = readRoute();
  render();
});

render();
if (route.open) document.getElementById(`e-${route.open}`)?.scrollIntoView({ block: 'start' });
