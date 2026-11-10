import '@styles/base.css';
import './styles.css';
import { byId } from '@lib/dom';
import { findJob, findModel } from './data/query';
import type { Modality } from './data/types';
import { renderJobs } from './ui/jobs';
import { renderPlatforms } from './ui/platforms';
import { renderRatings } from './ui/ratings';
import { readRoute, writeRoute, type Route } from './ui/route';
import { mountTabs } from './ui/tabs';
import { mountWallet } from './ui/wallet';

const jobsEl = byId('jobs');
const ratingsEl = byId('ratings');
let route: Route = readRoute();

const markTab = mountTabs(byId('tabs'), (m) => update({ modality: m, job: undefined, open: undefined }));
let plan = mountWallet(byId('wallet'), (p) => {
  plan = p;
  render();
});

/**
 * Rendering rebuilds the job picker and the chart, which would drop keyboard
 * focus to <body>. Controls carry a data-key; focus returns to the same
 * control, or to the model just opened from a pick.
 */
function update(patch: Partial<Route>, scrollTo?: string) {
  const focused = (document.activeElement as HTMLElement | null)?.dataset.key;
  route = { ...route, ...patch };
  writeRoute(route);
  render();
  const key = scrollTo ? `row-${scrollTo}` : focused;
  if (key) document.querySelector<HTMLElement>(`[data-key="${key}"]`)?.focus({ preventScroll: true });
  if (scrollTo) byId(`m-${scrollTo}`).scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function render() {
  markTab(route.modality);
  renderJobs(jobsEl, route.modality, route.job, plan, {
    pickJob: (job) => update({ job }),
    openModel: (id) => update({ open: id }, id),
  });
  renderRatings(
    ratingsEl,
    { ...route, plan },
    {
      sort: (sort) => update({ sort }),
      toggle: (id) => update({ open: route.open === id ? undefined : id }),
    },
  );
}

window.addEventListener('hashchange', () => {
  route = readRoute();
  render();
});

/** Deep links like #open=veo-3-1 work without naming the tab. */
function resolveDeepLink(): void {
  const p = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const model = findModel(p.get('open'));
  const job = findJob(p.get('job'));
  const modality: Modality | undefined = model?.modality ?? job?.modality;
  if (modality && modality !== route.modality) route = { ...route, modality, open: model?.id, job: job?.id };
}

resolveDeepLink();
renderPlatforms(byId('platforms'));
render();
if (route.open) byId(`m-${route.open}`).scrollIntoView({ block: 'center' });
