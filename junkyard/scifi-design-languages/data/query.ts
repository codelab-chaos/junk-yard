import { LINEAGES } from './lineages';
import type { Lineage, Medium, World } from './types';
import { WORLDS } from './worlds';

export interface Filters {
  medium: Medium | 'all';
  lineage: Lineage | 'all';
  q: string;
}

export const NO_FILTERS: Filters = { medium: 'all', lineage: 'all', q: '' };

export const MEDIA: { id: Medium | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'film', label: 'Film' },
  { id: 'series', label: 'Series' },
  { id: 'game', label: 'Game' },
];

/** Year as a number for sorting; ranges sort by their start. */
const startYear = (w: World): number => parseInt(w.year, 10) || 0;

/** Index order: by primary lineage (in LINEAGES order), then by year. */
const ORDERED = [...WORLDS].sort(
  (a, b) =>
    LINEAGES.findIndex((l) => l.id === a.lineages[0]) - LINEAGES.findIndex((l) => l.id === b.lineages[0]) ||
    startYear(a) - startYear(b),
);

/** Reference number, fixed by index order, e.g. "SF-07". */
const NUMBER = new Map(ORDERED.map((w, i) => [w.id, `SF-${String(i + 1).padStart(2, '0')}`]));

export const worldNumber = (w: World): string => NUMBER.get(w.id) ?? '';
export const findWorld = (id: string | undefined): World | undefined => WORLDS.find((w) => w.id === id);
export const isMedium = (v: string | null): v is Medium => v === 'film' || v === 'series' || v === 'game';
export const isLineage = (v: string | null): v is Lineage => LINEAGES.some((l) => l.id === v);
export const lineageTitle = (id: Lineage): string => LINEAGES.find((l) => l.id === id)?.title ?? id;

const HAYSTACK = new Map(
  WORLDS.map((w) => [
    w.id,
    [w.title, w.tagline, w.year, w.makers, w.description, w.materials, w.shapes, w.influences, w.keywords, w.lineages.map(lineageTitle)]
      .flat()
      .join(' ')
      .toLowerCase(),
  ]),
);

/** A world matches when it has the medium, has the lineage anywhere in its list, and contains every query word. */
export function matches(w: World, f: Filters): boolean {
  if (f.medium !== 'all' && w.medium !== f.medium) return false;
  if (f.lineage !== 'all' && !w.lineages.includes(f.lineage)) return false;
  const text = HAYSTACK.get(w.id) ?? '';
  return f.q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}

/** Matching worlds grouped into chapters by primary lineage, in index order. */
export function chapters(f: Filters): { lineage: (typeof LINEAGES)[number]; worlds: World[] }[] {
  const found = ORDERED.filter((w) => matches(w, f));
  return LINEAGES.map((lineage) => ({ lineage, worlds: found.filter((w) => w.lineages[0] === lineage.id) })).filter(
    (c) => c.worlds.length > 0,
  );
}

/** Previous and next worlds in index order, wrapping around. */
export function neighbours(w: World): [World, World] {
  const i = ORDERED.indexOf(w);
  const n = ORDERED.length;
  return [ORDERED[(i - 1 + n) % n], ORDERED[(i + 1) % n]];
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** True when `title` appears as its own name, not inside a longer word or a different work. */
function mentions(text: string, title: string): boolean {
  const re = new RegExp(`(?:^|[^a-z0-9])${escapeRe(title.toLowerCase())}(?:[^a-z0-9]|$)`, 'i');
  return re.test(text);
}

/** Worlds named in this one's influences or influenced lists, matched by title. */
export function related(w: World): World[] {
  const names = [...w.influences, ...w.influenced];
  return WORLDS.filter((o) => o !== w && names.some((n) => mentions(n, o.title)));
}

export const TOTAL = WORLDS.length;
