import type { World } from './types';

/**
 * The design brief: the same questions asked of every world, in the same
 * order. The intro legend, the detail page and the copied text all read
 * from this list, so every entry is described the same way.
 */
export interface BriefAxis {
  id: 'tagline' | 'palette' | 'materials' | 'shapes' | 'type' | 'lighting' | 'borrow';
  label: string;
  /** The question the axis answers, shown in the legend. */
  question: string;
  /** Plain-text answer for one world, used for the copied brief. */
  text(w: World): string;
}

const list = (items: string[]) => items.join(', ');

export const BRIEF: BriefAxis[] = [
  { id: 'tagline', label: 'In a line', question: 'Can you say the look in under eight words?', text: (w) => w.tagline },
  {
    id: 'palette',
    label: 'Palette',
    question: 'Which five colors would you hand a painter?',
    text: (w) => list(w.palette.map((s) => `${s.name} ${s.hex}`)),
  },
  { id: 'materials', label: 'Materials', question: 'What are the surfaces made of?', text: (w) => list(w.materials) },
  { id: 'shapes', label: 'Shapes', question: 'Which silhouettes and motifs repeat?', text: (w) => list(w.shapes) },
  { id: 'type', label: 'Type and UI', question: 'How do words and interfaces look?', text: (w) => w.typeAndUi },
  { id: 'lighting', label: 'Light', question: 'Where does the light come from, and what mood does it set?', text: (w) => w.lighting },
  { id: 'borrow', label: 'Borrow it', question: 'What is the one move you could reuse today?', text: (w) => w.borrow },
];

/** The whole brief as plain text, ready to paste into a doc or a message. */
export function briefText(w: World): string {
  return [`${w.title} (${w.year})`, ...BRIEF.map((a) => `${a.label}: ${a.text(w)}`)].join('\n');
}
