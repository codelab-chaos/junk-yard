/** Shape of junkyard/{app}/app.json, authored by hand per app. */
export interface AppManifest {
  title: string;
  description: string;
  tags: string[];
  created: string;
  updated?: string;
  /** Extra search terms that don't appear in the page text. */
  keywords?: string[];
  /** Files in the app folder whose text is added to the search index. */
  index?: string[];
}

/** One app as listed in the generated catalog.json. */
export interface CatalogEntry {
  slug: string;
  path: string;
  title: string;
  description: string;
  tags: string[];
  created: string;
  updated?: string;
}

export interface Catalog {
  generated: string;
  apps: CatalogEntry[];
}

/** Generated search-index.json: indexed terms per app slug. */
export interface SearchIndex {
  version: 1;
  terms: Record<string, string[]>;
}

export const CATALOG_FILE = 'catalog.json';
export const SEARCH_INDEX_FILE = 'search-index.json';
