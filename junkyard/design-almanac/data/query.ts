import { CATEGORIES } from './categories';
import { STYLES } from './styles';
import type { Category, Kind, StyleEntry } from './types';

export interface Filters {
  kind: Kind | 'all';
  category: Category | 'all';
  q: string;
}

export const NO_FILTERS: Filters = { kind: 'all', category: 'all', q: '' };

/** 1-based almanac number, fixed by position in STYLES. */
const NUMBER = new Map(STYLES.map((s, i) => [s.id, i + 1]));

export const entryNumber = (s: StyleEntry): number => NUMBER.get(s.id) ?? 0;
export const formatNumber = (n: number): string => String(n).padStart(2, '0');
export const findStyle = (id: string | undefined): StyleEntry | undefined => STYLES.find((s) => s.id === id);

export const isCategory = (v: string | null | undefined): v is Category => CATEGORIES.some((c) => c.id === v);
export const isKind = (v: string | null | undefined): v is Kind => v === 'trending' || v === 'mainstay';

function haystack(s: StyleEntry): string {
  return [s.name, s.summary, s.category, s.firstSeen, s.tags.join(' '), s.techniques.join(' ')].join(' ').toLowerCase();
}

const HAYSTACK = new Map(STYLES.map((s) => [s.id, haystack(s)]));

/** Every query word must appear somewhere in the entry. */
export function matches(s: StyleEntry, f: Filters): boolean {
  if (f.kind !== 'all' && s.kind !== f.kind) return false;
  if (f.category !== 'all' && s.category !== f.category) return false;
  const words = f.q.toLowerCase().split(/\s+/).filter(Boolean);
  const text = HAYSTACK.get(s.id) ?? '';
  return words.every((w) => text.includes(w));
}

export const filterStyles = (f: Filters): StyleEntry[] => STYLES.filter((s) => matches(s, f));

/** Previous and next entries in almanac order, wrapping around. */
export function neighbours(s: StyleEntry): { prev: StyleEntry; next: StyleEntry } {
  const i = STYLES.indexOf(s);
  const n = STYLES.length;
  return { prev: STYLES[(i - 1 + n) % n], next: STYLES[(i + 1) % n] };
}
