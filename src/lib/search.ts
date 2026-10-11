import type { CatalogEntry, SearchIndex } from './catalog-types.ts';
import { tokenize } from './tokenize.ts';

interface Field {
  weight: number;
  terms: (app: CatalogEntry, index: SearchIndex) => string[];
}

/** Ranked fields: earlier ones matter more. Exact hits score full weight, prefix hits half. */
const FIELDS: Field[] = [
  { weight: 8, terms: (a) => tokenize(a.title) },
  { weight: 6, terms: (a) => a.tags.flatMap(tokenize) },
  { weight: 3, terms: (a) => tokenize(a.description) },
  { weight: 1, terms: (a, i) => i.terms[a.slug] ?? [] },
];

function scoreToken(token: string, terms: string[], weight: number): number {
  if (terms.includes(token)) return weight;
  if (terms.some((t) => t.startsWith(token))) return weight / 2;
  return 0;
}

/** Every query token must match somewhere; results are sorted by score. */
export function searchApps(apps: CatalogEntry[], index: SearchIndex, query: string): CatalogEntry[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return apps;

  const scored = apps.map((app) => {
    const fieldTerms = FIELDS.map((f) => ({ weight: f.weight, terms: f.terms(app, index) }));
    let total = 0;
    for (const token of tokens) {
      const best = Math.max(...fieldTerms.map((f) => scoreToken(token, f.terms, f.weight)));
      if (best === 0) return { app, total: 0 };
      total += best;
    }
    return { app, total };
  });

  return scored
    .filter((s) => s.total > 0)
    .sort((a, b) => b.total - a.total)
    .map((s) => s.app);
}
