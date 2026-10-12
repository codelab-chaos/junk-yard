import '@styles/base.css';
import './styles.css';
import { byId, h } from '@lib/dom';
import { BRIEF } from './data/brief';
import { findWorld, neighbours, NO_FILTERS, type Filters } from './data/query';
import { mountDetail } from './ui/detail-view';
import { mountFilters } from './ui/filters';
import { mountIndex } from './ui/index-view';
import { readRoute, routeHash, writeRoute, type Route } from './ui/route';

const BASE_TITLE = document.title;
const detailEl = byId('detail');
let indexFilters: Filters = NO_FILTERS;
let unmountDetail: (() => void) | undefined;
let currentWorld: string | undefined;
let indexScroll = 0;

const worldHref = (id: string) => routeHash({ world: id, filters: NO_FILTERS });
const indexHref = () => routeHash({ filters: indexFilters }) || '#';

byId('legend').append(...BRIEF.map((a) => h('li', {}, h('b', {}, a.label), ' ', a.question)));

const filters = mountFilters(byId('rail'), (f) => {
  indexFilters = f;
  filters.showCount(index.apply(f));
  writeRoute({ filters: f }, 'replace');
});
const index = mountIndex(byId('toc'), worldHref);

function showIndex(f: Filters) {
  unmountDetail?.();
  unmountDetail = undefined;
  currentWorld = undefined;
  document.body.dataset.view = 'index';
  document.title = BASE_TITLE;
  indexFilters = f;
  filters.set(f);
  filters.showCount(index.apply(f));
}

function showDetail(id: string) {
  const w = findWorld(id)!;
  unmountDetail?.();
  currentWorld = id;
  document.body.dataset.view = 'detail';
  document.title = `${w.title} · ${BASE_TITLE}`;
  unmountDetail = mountDetail(detailEl, w, { index: indexHref(), world: worldHref });
}

/** Morph the clicked thumbnail into the hero image (and back) where supported. */
function transition(update: () => void, worldId: string | undefined) {
  const start = (document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } }).startViewTransition;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!start || reduce || !worldId) return update();
  const thumb = index.frameFor(worldId);
  const hero = () => detailEl.querySelector<HTMLElement>('.hero');
  const tag = (el: HTMLElement | null | undefined, on: boolean) => el && (el.style.viewTransitionName = on ? 'sf-hero' : '');
  const toDetail = document.body.dataset.view !== 'detail';
  tag(toDetail ? thumb : hero(), true);
  const vt = start.call(document, () => {
    tag(toDetail ? thumb : hero(), false);
    update();
    tag(toDetail ? hero() : thumb, true);
  });
  vt.finished.finally(() => {
    tag(thumb, false);
    tag(hero(), false);
  });
}

function render(route: Route) {
  const world = route.world && findWorld(route.world) ? route.world : undefined;
  if (world && world === currentWorld) return;
  const wasDetail = document.body.dataset.view === 'detail';
  if (world) {
    if (!wasDetail) indexScroll = window.scrollY;
    transition(() => {
      showDetail(world);
      window.scrollTo(0, 0);
    }, wasDetail ? undefined : world);
  } else {
    const leaving = currentWorld;
    transition(() => {
      showIndex(route.filters);
      if (!wasDetail) return;
      const card = leaving && document.querySelector<HTMLElement>(`.entry[data-id="${leaving}"]`);
      if (card && !card.hidden) card.scrollIntoView({ block: 'center' });
      else window.scrollTo(0, indexScroll);
    }, leaving);
  }
}

window.addEventListener('hashchange', () => render(readRoute()));

document.addEventListener('keydown', (e) => {
  const target = e.target as HTMLElement;
  if (e.metaKey || e.ctrlKey || e.altKey || target.closest('input, textarea, select')) return;
  if (document.body.dataset.view === 'index' && e.key === '/') {
    e.preventDefault();
    filters.focusSearch();
    return;
  }
  const w = findWorld(currentWorld);
  if (!w) return;
  if (e.key === 'Escape') window.location.hash = indexHref();
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const [prev, next] = neighbours(w);
    writeRoute({ world: (e.key === 'ArrowLeft' ? prev : next).id, filters: NO_FILTERS }, 'push');
    render(readRoute());
  }
});

const initial = readRoute();
showIndex(initial.filters);
if (initial.world && findWorld(initial.world)) showDetail(initial.world);
