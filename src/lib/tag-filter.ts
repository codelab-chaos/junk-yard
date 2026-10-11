import type { CatalogEntry } from './catalog-types.ts';

/** URL param holding the selected tags, comma separated. */
export const TAG_PARAM = 'tag';

export interface TagFacet {
  tag: string;
  /** Apps in the current result that carry this tag. */
  count: number;
  selected: boolean;
}

export function parseTags(value: string | null): string[] {
  return (value ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export function serializeTags(tags: string[]): string {
  return tags.join(',');
}

/** An app matches when it carries every selected tag. */
export function matchesTags(app: CatalogEntry, selected: string[]): boolean {
  return selected.every((tag) => app.tags.includes(tag));
}

export function toggleTag(selected: string[], tag: string): string[] {
  return selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag];
}

/**
 * Every tag in the catalog, counted against the current result so each chip
 * shows how many apps remain if it is added. Selected first, then by count.
 */
export function tagFacets(all: CatalogEntry[], result: CatalogEntry[], selected: string[]): TagFacet[] {
  const tags = new Set(all.flatMap((a) => a.tags));
  const counts = new Map<string, number>();
  for (const tag of result.flatMap((a) => a.tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...tags]
    .map((tag) => ({ tag, count: counts.get(tag) ?? 0, selected: selected.includes(tag) }))
    .sort((a, b) => Number(b.selected) - Number(a.selected) || b.count - a.count || a.tag.localeCompare(b.tag));
}
