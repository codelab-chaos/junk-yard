export type Modality = 'image' | 'video' | 'audio' | '3d';

/** Where a token figure came from. Shown next to every cost so nothing reads as more certain than it is. */
export type CostSource = 'leo' | 'third' | 'est' | 'maker';

/** Editor's 1 to 5 rating; null when the axis does not apply. */
export type Score = 1 | 2 | 3 | 4 | 5 | null;

export interface Scores {
  /** How good a keeper looks. */
  quality: Score;
  /** Does it do what the prompt says. */
  adherence: Score;
  /** Image: lettering. Video: motion and physics. Audio: naturalness. */
  craft: Score;
  /** Image: edits and consistent subjects. Video: control and references. */
  control: Score;
  speed: Score;
}

export interface Cost {
  /** Leonardo tokens for one run at the stated setting; null when not published, or the model is not on Leonardo. */
  tokens: number | null;
  /** Maker's API price in dollars for one run, when known directly. Otherwise derived from tokens. */
  usd?: number;
  /** What one run buys, e.g. "1 image, 1K" or "8 s clip, 720p". */
  per: string;
  source: CostSource;
  /** Other settings worth knowing, e.g. "2K 120 · 4K 160". */
  scale?: string;
}

export interface Model {
  id: string;
  name: string;
  maker: string;
  modality: Modality;
  /** Month it reached Leonardo or its maker, YYYY-MM; empty when unconfirmed (sorts last). */
  added: string;
  /** One line: what it is for. */
  line: string;
  scores: Scores;
  cost: Cost;
  /** Typical attempts to get one keeper, low and high. Editor's estimate. */
  tries: [number, number];
  /** Free unlimited reruns on Premium and up once tokens run out (images), Ultimate for video. */
  relaxed?: boolean;
  use: string[];
  avoid: string[];
  tips: string[];
  /** Sibling and older versions folded into this entry. */
  variants?: string;
  /** Where else you can run it, and what it costs there. */
  elsewhere?: string;
  status?: 'new' | 'legacy' | 'api';
  /** Where it runs. Omitted: on Leonardo and elsewhere. Leonardo's own models are Leonardo-only. */
  on?: 'not-leonardo';
  sources: { label: string; url: string }[];
}

export interface Plan {
  id: string;
  /** 'api' prices every model at its maker's API rate; 'leonardo' prices Leonardo tokens on a plan. */
  kind: 'api' | 'leonardo';
  label: string;
  price: string;
  /** Dollars per 1,000 tokens when the whole allowance is used. */
  per1k: number;
  tokens: string;
  relaxed: string;
}

export interface Job {
  id: string;
  modality: Modality;
  label: string;
  /** What the job needs most, one line. */
  need: string;
  best: string;
  value?: string;
  budget?: string;
  note: string;
}

export interface Platform {
  name: string;
  url: string;
  price: string;
  credits: string;
  models: string;
  bestFor: string;
  watch: string;
}
