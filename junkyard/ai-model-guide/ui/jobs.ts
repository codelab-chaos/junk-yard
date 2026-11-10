import { h } from '@lib/dom';
import { availability, findJob, jobsFor, keeperCost, picks, usd } from '../data/query';
import type { Modality, Model, Plan } from '../data/types';

interface JobHandlers {
  pickJob(id: string | undefined): void;
  openModel(id: string): void;
}

function keeperLine(m: Model, plan: Plan): string {
  const c = keeperCost(m, plan);
  if (c === null) return plan.kind === 'leonardo' && availability(m) === 'not-leonardo' ? 'Not on Leonardo' : 'Cost not published';
  const where = availability(m) === 'leonardo-only' ? ' · Leonardo only' : availability(m) === 'not-leonardo' ? ' · not on Leonardo' : '';
  return `≈ ${usd(c)} per good result${where}`;
}

/** "What are you making?": job chips, then the guide's three picks for the chosen job. */
export function renderJobs(container: HTMLElement, modality: Modality, jobId: string | undefined, plan: Plan, on: JobHandlers): void {
  const jobs = jobsFor(modality);
  const job = findJob(jobId);

  const chips = jobs.map((j) => {
    const b = h('button', { type: 'button', class: 'job', 'aria-pressed': String(j.id === job?.id), 'data-key': `job-${j.id}` }, j.label);
    b.addEventListener('click', () => on.pickJob(j.id === job?.id ? undefined : j.id));
    return b;
  });

  const body = job
    ? h(
        'div',
        { class: 'verdict' },
        h('p', { class: 'verdict-need' }, h('b', {}, job.label), ' ', job.need),
        h(
          'ol',
          { class: 'picks' },
          ...picks(job).map(({ role, model }) => {
            const open = h('button', { type: 'button', class: 'pick-name' }, model.name);
            open.addEventListener('click', () => on.openModel(model.id));
            return h(
              'li',
              { class: 'pick' },
              h('span', { class: 'pick-role' }, role),
              open,
              h('span', { class: 'pick-maker' }, model.maker),
              h('span', { class: 'pick-line' }, model.line),
              h('span', { class: 'pick-cost' }, keeperLine(model, plan)),
            );
          }),
        ),
        h('p', { class: 'verdict-note' }, h('span', { class: 'label' }, 'How to get it right'), ' ', job.note),
      )
    : h('p', { class: 'verdict-empty' }, 'Pick a job to see the top pick, a runner-up and the cheapest way to draft it. They are marked in the model reference below.');

  container.replaceChildren(h('div', { class: 'job-chips', role: 'group', 'aria-label': 'Jobs' }, ...chips), h('div', { 'aria-live': 'polite' }, body));
}
