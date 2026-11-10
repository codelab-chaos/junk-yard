/** The production line, listed from the finished record back to the first idea. */
export type StageId = 'release' | 'master' | 'mix' | 'stems' | 'edit' | 'generate' | 'prompt' | 'write';

/** 1 basics, 2 intermediate, 3 advanced, 4 pro. */
export type Level = 1 | 2 | 3 | 4;

export type Kind = 'technique' | 'tag' | 'fix' | 'tool';

/** How far the guide trusts a tag or tip: tested widely, works sometimes, or community lore that does not hold up. */
export type Reliability = 'reliable' | 'mixed' | 'myth';

export interface Stage {
  id: StageId;
  /** Position on the line, 1 = the idea, 8 = the release. */
  n: number;
  name: string;
  /** What this stage hands to the next one when it is done well. */
  done: string;
  /** The question a reader brings to it. */
  ask: string;
}

export interface Example {
  label: string;
  code: string;
}

export interface Entry {
  id: string;
  title: string;
  kind: Kind;
  stage: StageId;
  level: Level;
  /** One line: what it is or what to do. */
  summary: string;
  /** Technique to output: what you will hear when it works. */
  hear: string;
  steps?: string[];
  example?: Example;
  /** When it backfires, or what to watch for. */
  caution?: string;
  /** Platform ids from platforms.ts, or 'any' / 'daw'. */
  where?: string[];
  reliability?: Reliability;
  /** Sub-heading inside the tag dictionary or the fix finder. */
  group?: string;
  /** Other words people search with. */
  aka?: string[];
  related?: string[];
  /** Keys into SOURCES. */
  sources?: string[];
}

export interface Platform {
  id: string;
  name: string;
  maker: string;
  best: string;
  model: string;
  price: string;
  length: string;
  exports: string;
  rights: string;
  use: string;
  url: string;
}

export interface Tool {
  id: string;
  name: string;
  kind: 'separation' | 'cleanup' | 'midi' | 'mastering';
  runs: string;
  price: string;
  best: string;
  note: string;
  url: string;
}

export interface Section {
  name: string;
  /** Bars, used for the width of the block. */
  bars: number;
  /** 0 to 1, how full the arrangement is. */
  energy: number;
}

export interface Form {
  id: string;
  genre: string;
  bpm: string;
  sections: Section[];
  note: string;
}
