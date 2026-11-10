import { STEM_ENTRIES } from './entries-stems';
import { PROMPT_ENTRIES } from './entries-prompt';
import { SONG_ENTRIES } from './entries-song';
import type { Entry } from './types';

export { PLATFORMS, TOOLS, WHERE, platformName } from './platforms';
export { SOURCES } from './sources';

export const ENTRIES: Entry[] = [...SONG_ENTRIES, ...PROMPT_ENTRIES, ...STEM_ENTRIES];

const BY_ID = new Map(ENTRIES.map((e) => [e.id, e]));

export function findEntry(id: string | null | undefined): Entry | undefined {
  return id ? BY_ID.get(id) : undefined;
}

/** Sub-headings of the tag dictionary, in reading order. */
export const TAG_GROUPS = [
  { id: 'structure', name: 'Song structure', note: 'Section tags in square brackets, each on its own line. Brackets are read, not sung.' },
  { id: 'vocals', name: 'Vocals and voices', note: 'Who sings and how. Describe the voice in the style line too; tags alone are weaker.' },
  { id: 'instruments', name: 'Instruments and solos', note: 'Bring an instrument forward for one section.' },
  { id: 'delivery', name: 'Delivery and spelling', note: 'Punctuation and spelling inside the lyrics shape how a line is sung.' },
  { id: 'endings', name: 'Endings', note: 'Getting the song to stop where you want.' },
  { id: 'lore', name: 'Lore that does not hold up', note: 'Common tips with no reliable effect. Listed so you can stop trying them.' },
];

/** Sub-headings of the fix finder: where in the sound the problem lives. */
export const FIX_GROUPS = [
  { id: 'prompt', name: 'It did not follow the prompt', note: 'Wrong words, wrong genre, wrong length. Fix these before you generate again.' },
  { id: 'top', name: 'Top end: fizz, hiss, dullness', note: 'Shimmer, noise and swirl above about 8 kHz, or a mix with no air at all.' },
  { id: 'vocals', name: 'Vocals', note: 'Harsh, watery, flat or buried.' },
  { id: 'low', name: 'Low end and drums', note: 'Mud, boom and drums without punch.' },
  { id: 'space', name: 'Stereo and phase', note: 'Width that wanders or collapses in mono.' },
  { id: 'structure', name: 'Over the length of the song', note: 'Loops, volume jumps, endings that crackle, quality that fades.' },
];
