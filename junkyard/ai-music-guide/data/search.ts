import type { Entry } from './types';

/**
 * Words people use for the same idea. A query term matches any word in its
 * group, so "split" finds stem separation and "metallic" finds shimmer fixes.
 */
const SYNONYMS: string[][] = [
  ['stem', 'stems', 'split', 'separate', 'separation', 'isolate', 'unmix', 'demix', 'extract'],
  ['tag', 'tags', 'marker', 'markers', 'metatag', 'metatags', 'bracket', 'brackets'],
  ['vocal', 'vocals', 'voice', 'singer', 'singing', 'sung'],
  ['shimmer', 'metallic', 'tinny', 'harsh', 'fizz', 'artifact', 'artifacts', 'swirl', 'phasey', 'watery'],
  ['muddy', 'mud', 'boomy', 'murky', 'woolly'],
  ['loud', 'loudness', 'lufs', 'volume', 'limiter', 'limiting'],
  ['master', 'mastering', 'remaster'],
  ['lyric', 'lyrics', 'words', 'verse', 'verses'],
  ['hook', 'chorus', 'refrain', 'catchy'],
  ['instrumental', 'instrument', 'instruments', 'backing', 'beat', 'karaoke'],
  ['drum', 'drums', 'kick', 'snare', 'percussion'],
  ['prompt', 'prompts', 'style', 'styles', 'description'],
  ['extend', 'extension', 'continue', 'longer'],
  ['replace', 'inpaint', 'inpainting', 'regenerate', 'redo', 'fix'],
  ['copyright', 'rights', 'license', 'licence', 'ownership', 'commercial'],
  ['release', 'distribute', 'distribution', 'upload', 'spotify', 'streaming'],
  ['ending', 'end', 'outro', 'fade'],
  ['intro', 'start', 'opening'],
  ['sample', 'samples', 'upload', 'audio', 'hum', 'memo'],
  ['persona', 'personas', 'consistent', 'consistency'],
  ['midi', 'notes'],
  ['pronounce', 'pronunciation', 'phonetic', 'mispronounce', 'spelling'],
  ['realistic', 'real', 'human', 'organic', 'natural'],
  ['wide', 'width', 'stereo', 'mono'],
  ['tries', 'generations', 'rolls', 'rerolls', 'credits', 'iterations'],
];

const STOP = new Set('a an and are as at be by for from how i in is it its me my of on or the to what with you your do does can get'.split(' '));

/** Crude stemmer: enough that "vocals", "vocal" and "vocalist" meet. */
function stem(word: string): string {
  if (word.length < 4) return word;
  return word.replace(/(ings?|ed|s)$/, '').replace(/e$/, '').replace(/(.)\1$/, '$1') || word;
}

export function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

const GROUPS = new Map<string, Set<string>>();
for (const group of SYNONYMS) {
  const stems = new Set(group.map(stem));
  for (const s of stems) GROUPS.set(s, new Set([...(GROUPS.get(s) ?? []), ...stems]));
}

interface Field {
  weight: number;
  text: (e: Entry) => string;
}

/** Earlier fields count more. Titles and aliases decide most rankings. */
const FIELDS: Field[] = [
  { weight: 10, text: (e) => e.title },
  { weight: 7, text: (e) => (e.aka ?? []).join(' ') },
  { weight: 4, text: (e) => `${e.group ?? ''} ${e.example?.code ?? ''}` },
  { weight: 3, text: (e) => e.summary },
  { weight: 2, text: (e) => e.hear },
  { weight: 1, text: (e) => `${(e.steps ?? []).join(' ')} ${e.caution ?? ''}` },
];

interface Indexed {
  entry: Entry;
  fields: { weight: number; stems: string[] }[];
}

export function buildIndex(entries: Entry[]): Indexed[] {
  return entries.map((entry) => ({
    entry,
    fields: FIELDS.map((f) => ({ weight: f.weight, stems: [...new Set(words(f.text(entry)).map(stem))] })),
  }));
}

function termScore(term: string, fields: Indexed['fields']): number {
  const exact = GROUPS.get(term) ?? new Set([term]);
  let best = 0;
  for (const f of fields) {
    for (const s of f.stems) {
      // A direct hit beats a synonym, which beats a prefix ("sep" while typing "separation").
      const score = s === term ? f.weight : exact.has(s) ? f.weight * 0.7 : s.startsWith(term) && term.length > 2 ? f.weight * 0.5 : 0;
      if (score > best) best = score;
    }
  }
  return best;
}

/**
 * Most query terms have to match: one of two, two of three, and so on, so
 * "force an ending" still finds endings. Full matches rank first, then by
 * summed field weight.
 */
export function search(index: Indexed[], query: string): Entry[] {
  const terms = [...new Set(words(query).map(stem))];
  if (terms.length === 0) return [];
  const needed = terms.length <= 2 ? 1 : Math.ceil(terms.length * 0.6);
  const hits: { entry: Entry; matched: number; score: number }[] = [];
  for (const item of index) {
    let score = 0;
    let matched = 0;
    for (const t of terms) {
      const s = termScore(t, item.fields);
      if (s > 0) matched++;
      score += s;
    }
    if (matched >= needed) hits.push({ entry: item.entry, matched, score: score + (5 - item.entry.level) * 0.1 });
  }
  // Short queries with full matches keep only those; partial matches are the fallback.
  const best = Math.max(0, ...hits.map((h) => h.matched));
  const kept = terms.length <= 2 && best === terms.length ? hits.filter((h) => h.matched === best) : hits;
  return kept.sort((a, b) => b.matched - a.matched || b.score - a.score).map((h) => h.entry);
}

/** The query's stems and their synonyms, for highlighting matches in results. */
export function matchStems(query: string): Set<string> {
  const out = new Set<string>();
  for (const t of words(query).map(stem)) {
    out.add(t);
    for (const s of GROUPS.get(t) ?? []) out.add(s);
  }
  return out;
}

export function isMatch(word: string, stems: Set<string>): boolean {
  const s = stem(word.toLowerCase());
  if (stems.has(s)) return true;
  for (const t of stems) if (t.length > 2 && s.startsWith(t)) return true;
  return false;
}
