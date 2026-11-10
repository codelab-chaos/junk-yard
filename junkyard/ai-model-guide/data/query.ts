import { JOBS } from './jobs';
import { MODELS } from './models';
import { TOKENS_PER_API_DOLLAR } from './plans';
import type { CostSource, Job, Modality, Model, Plan, Scores } from './types';

export const MODALITIES: { id: Modality; label: string; unit: string }[] = [
  { id: 'image', label: 'Image', unit: 'image' },
  { id: 'video', label: 'Video', unit: 'clip' },
  { id: 'audio', label: 'Audio', unit: 'track' },
  { id: '3d', label: '3D', unit: 'model' },
];

/** Column labels change with the medium: "craft" is lettering for images, motion for video. */
export const AXES: Record<Modality, { key: keyof Scores; label: string }[]> = {
  image: [
    { key: 'quality', label: 'Image quality' },
    { key: 'adherence', label: 'Follows prompt' },
    { key: 'craft', label: 'Text' },
    { key: 'control', label: 'Edits, consistency' },
    { key: 'speed', label: 'Speed' },
  ],
  video: [
    { key: 'quality', label: 'Visual quality' },
    { key: 'adherence', label: 'Follows prompt' },
    { key: 'craft', label: 'Motion, physics' },
    { key: 'control', label: 'Control, refs' },
    { key: 'speed', label: 'Speed' },
  ],
  audio: [
    { key: 'quality', label: 'Sound quality' },
    { key: 'adherence', label: 'Follows prompt' },
    { key: 'craft', label: 'Natural' },
    { key: 'control', label: 'Control' },
    { key: 'speed', label: 'Speed' },
  ],
  '3d': [
    { key: 'quality', label: 'Mesh quality' },
    { key: 'adherence', label: 'Matches refs' },
    { key: 'craft', label: 'Topology' },
    { key: 'control', label: 'Control' },
    { key: 'speed', label: 'Speed' },
  ],
};

export type SortKey = 'score' | 'keeper' | 'speed' | 'new';
export const SORTS: { id: SortKey; label: string }[] = [
  { id: 'score', label: 'Overall' },
  { id: 'keeper', label: 'Cost per result' },
  { id: 'speed', label: 'Speed' },
  { id: 'new', label: 'Newest' },
];

const WEIGHTS: Record<keyof Scores, number> = { quality: 2, adherence: 1.5, craft: 1, control: 1, speed: 0.5 };

/** Overall score, 0 to 100, from the weighted 1 to 5 ratings that apply. */
export function overall(m: Model): number {
  let sum = 0;
  let weight = 0;
  for (const [key, w] of Object.entries(WEIGHTS) as [keyof Scores, number][]) {
    const s = m.scores[key];
    if (s === null) continue;
    sum += s * w;
    weight += w;
  }
  return weight === 0 ? 0 : Math.round(((sum / weight - 1) / 4) * 100);
}

export const midTries = (m: Model): number => (m.tries[0] + m.tries[1]) / 2;
export const keeperTokens = (m: Model): number | null => (m.cost.tokens === null ? null : Math.round(m.cost.tokens * midTries(m)));
export const dollars = (tokens: number, plan: Plan): number => (tokens / 1000) * plan.per1k;

/** Leonardo's own models run only there; most others run on many platforms and their maker's API. */
export type Availability = 'everywhere' | 'leonardo-only' | 'not-leonardo';
export function availability(m: Model): Availability {
  if (m.on === 'not-leonardo') return 'not-leonardo';
  return m.maker === 'Leonardo' ? 'leonardo-only' : 'everywhere';
}

/** One run in dollars at the maker's API rate: published, or converted from Leonardo tokens. */
export function runUsd(m: Model): number | null {
  if (m.cost.usd !== undefined) return m.cost.usd;
  return m.cost.tokens === null ? null : m.cost.tokens / TOKENS_PER_API_DOLLAR;
}

/** Price of one run on the chosen basis; null when unknown or not offered there. */
export function runCost(m: Model, plan: Plan): number | null {
  if (plan.kind === 'api') return runUsd(m);
  if (availability(m) === 'not-leonardo' || m.cost.tokens === null) return null;
  return dollars(m.cost.tokens, plan);
}

/** Cost of one good result: a run times the middle of the typical tries. */
export function keeperCost(m: Model, plan: Plan): number | null {
  const run = runCost(m, plan);
  return run === null ? null : run * midTries(m);
}

/**
 * Where the price shown came from. Token estimates were made from the maker's
 * API price, so on the API basis they are the maker's price; a Leonardo token
 * figure converted to dollars is an estimate.
 */
export function priceSource(m: Model, plan: Plan): CostSource {
  if (plan.kind === 'leonardo' || m.cost.usd !== undefined) return m.cost.source;
  return m.cost.source === 'est' ? 'maker' : 'est';
}

/** Why a cost is missing, in words. */
export function missingCost(m: Model, plan: Plan): string {
  return plan.kind === 'leonardo' && availability(m) === 'not-leonardo' ? 'Not on Leonardo' : 'Not published';
}

export function usd(n: number): string {
  if (n < 0.01) return '<$0.01';
  if (n < 10) return `$${n.toFixed(2)}`;
  return `$${Math.round(n)}`;
}

export const tokensLabel = (n: number): string => n.toLocaleString('en-US');

export function sorted(models: Model[], key: SortKey, plan: Plan): Model[] {
  const by: Record<SortKey, (a: Model, b: Model) => number> = {
    score: (a, b) => overall(b) - overall(a),
    keeper: (a, b) => (keeperCost(a, plan) ?? Infinity) - (keeperCost(b, plan) ?? Infinity),
    speed: (a, b) => (b.scores.speed ?? 0) - (a.scores.speed ?? 0) || overall(b) - overall(a),
    new: (a, b) => b.added.localeCompare(a.added),
  };
  return [...models].sort((a, b) => by[key](a, b) || a.name.localeCompare(b.name));
}

export const modelsFor = (m: Modality): Model[] => MODELS.filter((x) => x.modality === m);
export const jobsFor = (m: Modality): Job[] => JOBS.filter((j) => j.modality === m);
export const findModel = (id: string | null | undefined): Model | undefined => MODELS.find((m) => m.id === id);
export const findJob = (id: string | null | undefined): Job | undefined => JOBS.find((j) => j.id === id);
export const isModality = (v: string | null): v is Modality => MODALITIES.some((m) => m.id === v);
export const isSort = (v: string | null): v is SortKey => SORTS.some((s) => s.id === v);

/** The three picks a job names, in the order the guide presents them. */
export function picks(job: Job): { role: string; model: Model }[] {
  return (
    [
      ['Top pick', job.best],
      ['Runner-up', job.value],
      ['Cheapest drafts', job.budget],
    ] as const
  ).flatMap(([role, id]) => {
    const model = findModel(id);
    return model ? [{ role, model }] : [];
  });
}

export const SOURCE_LABEL = {
  leo: 'Published by Leonardo',
  third: 'Reported by a third party',
  est: 'Estimate',
  maker: "Maker's published API price",
} as const;
