/** Suno's style field holds up to 1,000 characters (read from the live v6 counter). */
export const STYLE_LIMIT = 1000;

export interface StyleSlot {
  id: string;
  label: string;
  hint: string;
  words: string[];
}

/** In the order most guides recommend. Words are ones testers report the model responds to. */
export const STYLE_SLOTS: StyleSlot[] = [
  { id: 'genre', label: 'Genre', hint: 'One main genre, at most one influence.', words: ['indie pop', 'synth-pop', 'neo-soul', 'trap', 'boom bap', 'house', 'drum and bass', 'country', 'americana', 'alt rock', 'grunge', 'metalcore', 'lo-fi hip hop', 'cinematic'] },
  { id: 'era', label: 'Era and scene', hint: 'A decade or a scene says more than "retro".', words: ['1970s', '1980s', '1990s', '2000s', '2010s', 'modern', 'UK garage', 'Nashville', 'West Coast', 'Motown'] },
  { id: 'tempo', label: 'Tempo and key', hint: 'An exact BPM beats "fast". Key is a weak hint.', words: ['70 BPM', '88 BPM', '96 BPM', '104 BPM', '120 BPM', '128 BPM', '140 BPM', 'half-time', 'minor key', 'major key'] },
  { id: 'instruments', label: 'Instruments', hint: 'Two or three, each with a job.', words: ['Rhodes piano', 'fingerpicked acoustic guitar', 'distorted guitars', '808 sub bass', 'warm bass guitar', 'brushed drums', 'live drums', 'analog synth arpeggio', 'string section', 'pedal steel'] },
  { id: 'vocal', label: 'Vocal', hint: 'Register, texture, delivery.', words: ['breathy female alto', 'raspy male baritone', 'soulful female belt', 'airy male falsetto', 'gritty vocals', 'close dry vocal', 'stacked harmonies', 'gospel choir', 'instrumental'] },
  { id: 'production', label: 'Production', hint: 'Describe the recording, not the quality.', words: ['radio-ready', 'crisp mix', 'punchy compression', 'wide stereo', 'controlled low end', 'tape saturation', 'close mic presence', 'small room', 'minimal reverb', 'clean mix'] },
  { id: 'mood', label: 'Mood', hint: 'One or two. "Bittersweet" works; "epic" does not.', words: ['bittersweet', 'haunting', 'anthemic', 'driving', 'building intensity', 'warm', 'melancholic', 'euphoric', 'defiant'] },
  { id: 'exclude', label: 'Exclude', hint: 'Goes in the separate Exclude field. Two or three items.', words: ['pop', 'humming', 'spoken intro', 'male vocal', 'female vocal', 'autotune', 'reverb'] },
];
