import { h } from '@lib/dom';
import { SOURCE_LABEL } from '../data/query';
import type { CostSource, Score } from '../data/types';

const WORDS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

/** A ratings-magazine ball: empty for 1, full for 5, in quarters between. */
export function ball(score: Score, axis: string): HTMLElement {
  if (score === null) return h('span', { class: 'ball ball-na', title: `${axis}: not rated` }, '–');
  return h('span', {
    class: 'ball',
    style: `--f:${(score - 1) / 4}`,
    role: 'img',
    'aria-label': `${axis}: ${WORDS[score]}`,
    title: `${axis}: ${WORDS[score]}`,
  });
}

/** Overall score as a bar and a number, 0 to 100. */
export function scoreBar(n: number): HTMLElement {
  return h(
    'span',
    { class: 'score', title: `Overall score ${n} of 100` },
    h('span', { class: 'score-n' }, String(n)),
    h('span', { class: 'score-bar', style: `--w:${n}%` }),
  );
}

const SOURCE_CHAR: Record<CostSource, string> = { leo: 'L', third: '3', est: 'E', maker: 'M' };

/** Small badge saying where a token figure came from. */
export function sourceMark(source: CostSource): HTMLElement {
  return h('span', { class: `src src-${source}`, title: SOURCE_LABEL[source], 'aria-label': SOURCE_LABEL[source] }, SOURCE_CHAR[source]);
}

/** The ball legend shown under the ratings table. */
export function ballLegend(): HTMLElement {
  return h(
    'p',
    { class: 'legend' },
    ...([1, 2, 3, 4, 5] as const).flatMap((s) => [ball(s, WORDS[s]), h('span', {}, WORDS[s])]),
  );
}
