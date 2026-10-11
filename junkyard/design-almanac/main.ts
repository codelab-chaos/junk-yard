import '@styles/base.css';
import './styles.css';
import { byId } from '@lib/dom';
import { findStyle, neighbours, NO_FILTERS, type Filters } from './data/query';
import { mountDetail } from './ui/detail-view';
import { mountFilters } from './ui/filters';
import { mountIndex } from './ui/index-view';
import { readRoute, routeHash, writeRoute, type Route } from './ui/route';

const BASE_TITLE = document.title;
const detailEl = byId('detail');
let indexFilters: Filters = NO_FILTERS;
let unmountDetail: (() => void) | undefined;
let currentStyle: string | undefined;
let indexScroll = 0;

const styleHref = (id: string) => routeHash({ style: id, filters: NO_FILTERS });
const indexHref = () => routeHash({ filters: indexFilters }) || '#';

const filters = mountFilters(byId('rail'), (f) => {
  indexFilters = f;
  filters.showCount(index.apply(f));
  writeRoute({ filters: f }, 'replace');
});
const index = mountIndex(byId('toc'), styleHref);

function showIndex(f: Filters) {
  unmountDetail?.();
  unmountDetail = undefined;
  currentStyle = undefined;
  document.body.dataset.view = 'index';
  document.title = BASE_TITLE;
  indexFilters = f;
  filters.set(f);
  filters.showCount(index.apply(f));
}

function showDetail(id: string) {
  const s = findStyle(id)!;
  unmountDetail?.();
  currentStyle = id;
  document.body.dataset.view = 'detail';
  document.title = `${s.name} · ${BASE_TITLE}`;
  unmountDetail = mountDetail(detailEl, s, { index: indexHref(), style: styleHref });
}

/** Morph the clicked thumbnail into the plate (and back) where supported. */
function transition(update: () => void, styleId: string | undefined) {
  const start = (document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } }).startViewTransition;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!start || reduce || !styleId) return update();
  const thumb = index.frameFor(styleId);
  const plate = () => detailEl.querySelector<HTMLElement>('.plate-frame');
  const tag = (el: HTMLElement | null | undefined, on: boolean) => el && (el.style.viewTransitionName = on ? 'almanac-plate' : '');
  const toDetail = document.body.dataset.view !== 'detail';
  tag(toDetail ? thumb : plate(), true);
  const vt = start.call(document, () => {
    tag(toDetail ? thumb : plate(), false);
    update();
    tag(toDetail ? plate() : thumb, true);
  });
  vt.finished.finally(() => {
    tag(thumb, false);
    tag(plate(), false);
  });
}

function render(route: Route) {
  const style = route.style && findStyle(route.style) ? route.style : undefined;
  if (style === currentStyle && style) return;
  const wasDetail = document.body.dataset.view === 'detail';
  if (style) {
    if (!wasDetail) indexScroll = window.scrollY;
    const fromIndex = !wasDetail;
    transition(() => {
      showDetail(style);
      window.scrollTo(0, 0);
    }, fromIndex ? style : undefined);
  } else {
    const leaving = currentStyle;
    transition(() => {
      showIndex(route.filters);
      if (wasDetail) {
        const row = leaving && document.querySelector<HTMLElement>(`.entry[data-id="${leaving}"]`);
        if (row && !row.hidden) row.scrollIntoView({ block: 'center' });
        else window.scrollTo(0, indexScroll);
      }
    }, leaving);
  }
}

window.addEventListener('hashchange', () => render(readRoute()));

document.addEventListener('keydown', (e) => {
  const target = e.target as HTMLElement;
  if (e.metaKey || e.ctrlKey || e.altKey || target.closest('input, textarea, select, .plate')) return;
  if (document.body.dataset.view === 'index' && e.key === '/') {
    e.preventDefault();
    filters.focusSearch();
    return;
  }
  const s = findStyle(currentStyle);
  if (!s) return;
  if (e.key === 'Escape') window.location.hash = indexHref();
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const { prev, next } = neighbours(s);
    writeRoute({ style: (e.key === 'ArrowLeft' ? prev : next).id, filters: NO_FILTERS }, 'push');
    render(readRoute());
  }
});

const initial = readRoute();
showIndex(initial.filters);
if (initial.style && findStyle(initial.style)) showDetail(initial.style);
