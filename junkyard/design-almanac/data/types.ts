/** "In season" styles are current trends; "perennial" ones are mainstays. */
export type Kind = 'trending' | 'mainstay';

export type Category = 'layout' | 'type' | 'color' | 'surface' | 'motion' | 'interaction' | 'navigation';

export interface StyleEntry {
  /** Stable slug used in URLs and as the example renderer id. */
  id: string;
  /** Id of the live example renderer in examples/ (usually the same as id). */
  example: string;
  name: string;
  kind: Kind;
  category: Category;
  /** When the style first appeared or became widespread, e.g. "1957" or "2023". */
  firstSeen: string;
  summary: string;
  whenToUse: string;
  pitfalls: string;
  /** Short CSS or platform techniques that make the style work. */
  techniques: string[];
  tags: string[];
}

export interface CategoryInfo {
  id: Category;
  /** Roman numeral chapter label shown in the index. */
  numeral: string;
  title: string;
  blurb: string;
}

export const KIND_LABEL: Record<Kind, string> = {
  trending: 'In season',
  mainstay: 'Perennial',
};
