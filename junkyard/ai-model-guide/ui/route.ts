import { findJob, findModel, isModality, isSort, type SortKey } from '../data/query';
import type { Modality } from '../data/types';

/** Everything the page shows, as stored in the URL fragment. The plan lives in local storage instead. */
export interface Route {
  modality: Modality;
  job?: string;
  sort: SortKey;
  open?: string;
}

export const DEFAULT_ROUTE: Route = { modality: 'image', sort: 'score' };

export function readRoute(hash = window.location.hash): Route {
  const p = new URLSearchParams(hash.replace(/^#/, ''));
  const m = p.get('m');
  const s = p.get('sort');
  const modality = isModality(m) ? m : DEFAULT_ROUTE.modality;
  const job = findJob(p.get('job'));
  const open = findModel(p.get('open'));
  return {
    modality,
    job: job?.modality === modality ? job.id : undefined,
    sort: isSort(s) ? s : DEFAULT_ROUTE.sort,
    open: open?.modality === modality ? open.id : undefined,
  };
}

export function routeHash(r: Route): string {
  const p = new URLSearchParams();
  if (r.modality !== DEFAULT_ROUTE.modality) p.set('m', r.modality);
  if (r.job) p.set('job', r.job);
  if (r.sort !== DEFAULT_ROUTE.sort) p.set('sort', r.sort);
  if (r.open) p.set('open', r.open);
  const s = p.toString();
  return s ? `#${s}` : '';
}

/** Replace, not push: filtering is not navigation, so Back leaves the page. */
export function writeRoute(r: Route): void {
  const hash = routeHash(r);
  if (hash === window.location.hash) return;
  history.replaceState(null, '', hash || window.location.pathname + window.location.search);
}
