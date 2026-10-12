export type Medium = 'film' | 'series' | 'game';

/** Design lineages: families of worlds that share a visual language. See lineages.ts. */
export type Lineage =
  | 'used-future'
  | 'cassette-futurism'
  | 'clean-future'
  | 'cyberpunk'
  | 'retro-futurism'
  | 'brutalist-monumental'
  | 'biomechanical'
  | 'neon-digital'
  | 'military-industrial'
  | 'mythic-precursor'
  | 'alien-naturalist'
  | 'post-apocalyptic'
  | 'graphic-pop'
  | 'new-weird';

export interface Swatch {
  name: string;
  hex: string;
}

export interface Still {
  /** Direct https URL to an image on upload.wikimedia.org (or thumb.wikimedia.org), verified to load. */
  src: string;
  alt: string;
  caption: string;
  /** The Wikipedia or Wikimedia Commons file page, for credit and license. */
  source: string;
}

export interface Ref {
  label: string;
  url: string;
}

export interface World {
  /** Stable kebab-case slug, used in URLs. */
  id: string;
  /** Terse title, the work's common name, e.g. "Mirror's Edge". */
  title: string;
  medium: Medium;
  /** Release year, or a range for a series or franchise, e.g. "2008" or "1987–1994". */
  year: string;
  /** Studio and the key designers or art directors behind the look. */
  makers: string;
  /** Primary lineage first, then up to two secondary ones. */
  lineages: Lineage[];
  /** The design language in 3 to 7 words, e.g. "White city, red runner vision". */
  tagline: string;
  /** Comprehensive: 140 to 220 words on the world's design language and why it works. */
  description: string;
  /** Exactly 5 swatches that define the look. */
  palette: Swatch[];
  /** 3 to 6 materials and surfaces. */
  materials: string[];
  /** 3 to 6 recurring forms, silhouettes and motifs. */
  shapes: string[];
  /** Typography, signage and interface language, 1 to 3 sentences. */
  typeAndUi: string;
  /** Lighting and atmosphere, 1 to 2 sentences. */
  lighting: string;
  /** 2 to 5 sources the look draws from. */
  influences: string[];
  /** 0 to 5 later works it shaped. */
  influenced: string[];
  /** How a designer can borrow this language today, 1 to 2 sentences. */
  borrow: string;
  /** Extra search terms. */
  keywords: string[];
  /** 0 to 3 Wikimedia stills; shown when the game is not on Steam, or when the Steam shots are a different look (see media.ts). */
  stills: Still[];
  refs: Ref[];
}
