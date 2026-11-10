import { h } from '@lib/dom';
import { PLANS } from '../data/plans';
import {
  availability,
  AXES,
  findJob,
  keeperCost,
  keeperTokens,
  missingCost,
  MODALITIES,
  modelsFor,
  overall,
  picks,
  priceSource,
  runCost,
  SORTS,
  sorted,
  SOURCE_LABEL,
  tokensLabel,
  usd,
  type SortKey,
} from '../data/query';
import type { Modality, Model, Plan } from '../data/types';
import { ball, ballLegend, scoreBar, sourceMark } from './marks';

interface RatingsState {
  modality: Modality;
  sort: SortKey;
  job?: string;
  open?: string;
  plan: Plan;
}

interface RatingsHandlers {
  sort(key: SortKey): void;
  toggle(id: string): void;
}

const STATUS_LABEL = { new: 'New', legacy: 'Older', api: 'API only' } as const;

/** One run: dollars at the maker's rate, or Leonardo tokens on a Leonardo plan. */
function runCell(m: Model, plan: Plan): HTMLElement {
  const run = runCost(m, plan);
  if (run === null) return h('td', { class: 'num muted' }, missingCost(m, plan));
  const shown = plan.kind === 'api' ? usd(run) : tokensLabel(m.cost.tokens!);
  return h('td', { class: 'num' }, shown, ' ', sourceMark(priceSource(m, plan)));
}

function keeperCell(m: Model, plan: Plan): HTMLElement {
  const cost = keeperCost(m, plan);
  if (cost === null) return h('td', { class: 'num keeper muted' }, plan.kind === 'leonardo' && availability(m) === 'not-leonardo' ? 'Not on Leonardo' : 'Unknown');
  return h('td', { class: 'num keeper' }, h('b', {}, usd(cost)), plan.kind === 'leonardo' ? h('small', {}, `${tokensLabel(keeperTokens(m)!)} tokens`) : null);
}

const WHERE_LABEL = { 'leonardo-only': 'Leonardo only', 'not-leonardo': 'Not on Leonardo' } as const;

function list(title: string, items: string[]): HTMLElement | null {
  if (items.length === 0) return null;
  return h('div', { class: 'facts' }, h('h4', {}, title), h('ul', {}, ...items.map((i) => h('li', {}, i))));
}

/** The expanded entry: when to use it, what it costs on every plan, and where the numbers came from. */
function detail(m: Model, plan: Plan, colspan: number): HTMLElement {
  const known = PLANS.some((p) => keeperCost(m, p) !== null);
  const perPlan = !known
    ? h('p', { class: 'muted' }, 'No maker or platform has published a price for this model, and no third party has reported one. Check the price before you generate.')
    : h(
        'table',
        { class: 'plan-table' },
        h('caption', {}, 'One good result, by where you pay'),
        h(
          'tbody',
          {},
          ...PLANS.map((p) => {
            const c = keeperCost(m, p);
            return h('tr', { class: p.id === plan.id ? 'is-plan' : '' }, h('th', { scope: 'row' }, p.label), h('td', {}, c === null ? missingCost(m, p) : usd(c)));
          }),
        ),
      );
  const run = runCost(m, plan);

  return h(
    'tr',
    { class: 'detail-row' },
    h(
      'td',
      { colspan },
      h(
        'div',
        { class: 'detail' },
        h('p', { class: 'detail-line' }, m.line),
        h('div', { class: 'detail-cols' }, list('Use it for', m.use), list('Skip it for', m.avoid), list('How to get it right', m.tips)),
        h(
          'div',
          { class: 'detail-cost' },
          h(
            'dl',
            {},
            h('dt', {}, 'One run'),
            h(
              'dd',
              {},
              run === null ? missingCost(m, plan) : plan.kind === 'api' ? usd(run) : `${tokensLabel(m.cost.tokens!)} tokens`,
              m.cost.tokens !== null && plan.kind === 'api' ? ` (${tokensLabel(m.cost.tokens)} Leonardo tokens)` : '',
              ' · ',
              m.cost.per,
            ),
            h('dt', {}, 'Source'),
            h('dd', {}, sourceMark(priceSource(m, plan)), ' ', SOURCE_LABEL[priceSource(m, plan)]),
            m.cost.scale ? h('dt', {}, 'Other settings') : null,
            m.cost.scale ? h('dd', {}, m.cost.scale) : null,
            h('dt', {}, 'Typical tries'),
            h('dd', {}, `${m.tries[0]} to ${m.tries[1]} for a simple brief (estimate)`),
            m.relaxed ? h('dt', {}, 'Free reruns') : null,
            m.relaxed ? h('dd', {}, m.modality === 'video' ? 'On Leonardo Ultimate, once tokens run out' : 'On Leonardo Premium and up, once tokens run out') : null,
            m.variants ? h('dt', {}, 'Also covers') : null,
            m.variants ? h('dd', {}, m.variants) : null,
            m.elsewhere ? h('dt', {}, 'Where to run it') : null,
            m.elsewhere ? h('dd', {}, m.elsewhere) : null,
          ),
          perPlan,
        ),
        h(
          'p',
          { class: 'detail-sources' },
          h('span', { class: 'label' }, 'Sources'),
          ...m.sources.flatMap((s, i) => [i ? ' · ' : ' ', h('a', { href: s.url, target: '_blank', rel: 'noopener' }, s.label)]),
        ),
      ),
    ),
  );
}

/** The model reference chart for one modality. Rebuilt on every change; it is at most a few dozen rows. */
export function renderRatings(container: HTMLElement, state: RatingsState, on: RatingsHandlers): void {
  const axes = AXES[state.modality];
  const unit = MODALITIES.find((m) => m.id === state.modality)!.label.toLowerCase();
  const models = sorted(modelsFor(state.modality), state.sort, state.plan);
  const job = findJob(state.job);
  const roles = new Map(job ? picks(job).map((p) => [p.model.id, p.role]) : []);
  const colspan = axes.length + 5;

  const sortButtons = SORTS.map((s) => {
    const b = h('button', { type: 'button', class: 'sort', 'aria-pressed': String(s.id === state.sort), 'data-key': `sort-${s.id}` }, s.label);
    b.addEventListener('click', () => on.sort(s.id));
    return b;
  });

  const head = h(
    'thead',
    {},
    h(
      'tr',
      {},
      h('th', { scope: 'col', class: 'col-name' }, 'Model'),
      h('th', { scope: 'col', class: 'col-score' }, 'Overall'),
      ...axes.map((a) => h('th', { scope: 'col', class: 'col-axis' }, h('span', {}, a.label))),
      h('th', { scope: 'col', class: 'num' }, state.plan.kind === 'api' ? 'Price per run' : 'Leonardo tokens per run'),
      h('th', { scope: 'col', class: 'num' }, 'Tries'),
      h('th', { scope: 'col', class: 'num' }, `Per good result, ${state.plan.kind === 'api' ? 'API price' : state.plan.label.replace('Leonardo ', '').split(',')[0]}`),
    ),
  );

  const rows = models.flatMap((m, i) => {
    const isOpen = m.id === state.open;
    const role = roles.get(m.id);
    const toggle = h(
      'button',
      { type: 'button', class: 'row-toggle', 'aria-expanded': String(isOpen), 'aria-controls': `d-${m.id}`, 'data-key': `row-${m.id}` },
      h('span', { class: 'row-name' }, m.name),
      h(
        'span',
        { class: 'row-meta' },
        m.maker,
        m.status ? h('span', { class: `tag tag-${m.status}` }, STATUS_LABEL[m.status]) : null,
        availability(m) !== 'everywhere' ? h('span', { class: `tag tag-where tag-${availability(m)}` }, WHERE_LABEL[availability(m) as keyof typeof WHERE_LABEL]) : null,
        m.relaxed ? h('span', { class: 'tag tag-relaxed' }, 'Free reruns') : null,
      ),
    );
    toggle.addEventListener('click', () => on.toggle(m.id));
    const row = h(
      'tr',
      { class: `row${isOpen ? ' is-open' : ''}${role ? ' is-pick' : ''}`, 'data-id': m.id, id: `m-${m.id}` },
      h(
        'th',
        { class: 'col-name', scope: 'row' },
        h('span', { class: 'rank' }, String(i + 1)),
        toggle,
        h('span', { class: 'row-line' }, m.line),
        role ? h('span', { class: 'role' }, role) : null,
      ),
      h('td', { class: 'col-score' }, scoreBar(overall(m))),
      ...axes.map((a) => h('td', { class: 'col-axis', 'data-axis': a.label }, ball(m.scores[a.key], a.label))),
      runCell(m, state.plan),
      h('td', { class: 'num tries' }, `${m.tries[0]}–${m.tries[1]}`),
      keeperCell(m, state.plan),
    );
    if (!isOpen) return [row];
    const d = detail(m, state.plan, colspan);
    d.id = `d-${m.id}`;
    return [row, d];
  });

  container.replaceChildren(
    h(
      'div',
      { class: 'ratings-bar' },
      h('p', { class: 'ratings-count', 'aria-live': 'polite' }, `${models.length} ${unit} models`),
      h('div', { class: 'sorts', role: 'group', 'aria-label': 'Sort by' }, h('span', { class: 'label' }, 'Sort'), ...sortButtons),
    ),
    h('div', { class: 'table-wrap' }, h('table', { class: 'chart' }, head, h('tbody', {}, ...rows))),
    h(
      'div',
      { class: 'ratings-foot' },
      ballLegend(),
      h(
        'p',
        { class: 'legend' },
        h('span', {}, 'Prices:'),
        sourceMark('maker'),
        h('span', {}, "maker's API price"),
        sourceMark('leo'),
        h('span', {}, 'published by Leonardo'),
        sourceMark('third'),
        h('span', {}, 'third party'),
        sourceMark('est'),
        h('span', {}, 'estimate'),
      ),
      h(
        'p',
        { class: 'legend legend-wide' },
        h('span', { class: 'tag tag-relaxed' }, 'Free reruns'),
        h('span', {}, 'on Leonardo, keeps generating at no cost once your monthly tokens run out (relaxed mode): images on Premium and up, video on Ultimate.'),
        h('span', { class: 'tag tag-where tag-leonardo-only' }, 'Leonardo only'),
        h('span', {}, "Leonardo's own models."),
        h('span', { class: 'tag tag-where tag-not-leonardo' }, 'Not on Leonardo'),
        h('span', {}, 'runs elsewhere; everything else runs on Leonardo and on other platforms.'),
      ),
    ),
  );
}
