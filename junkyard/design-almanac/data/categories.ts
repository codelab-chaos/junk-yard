import type { CategoryInfo } from './types';

/** Chapter order of the almanac. Entries are numbered in this order. */
export const CATEGORIES: CategoryInfo[] = [
  { id: 'layout', numeral: 'I', title: 'Layout', blurb: 'How space is divided before anything is drawn in it.' },
  { id: 'type', numeral: 'II', title: 'Type', blurb: 'Letterforms carrying voice, rhythm and hierarchy.' },
  { id: 'color', numeral: 'III', title: 'Color', blurb: 'Palettes, light and the systems that keep them honest.' },
  { id: 'surface', numeral: 'IV', title: 'Surface', blurb: 'Material, texture and depth: what things seem made of.' },
  { id: 'motion', numeral: 'V', title: 'Motion', blurb: 'Change over time that explains where things went.' },
  { id: 'interaction', numeral: 'VI', title: 'Interaction', blurb: 'Feedback loops between a hand and an interface.' },
  { id: 'navigation', numeral: 'VII', title: 'Navigation', blurb: 'Ways of knowing where you are and getting elsewhere.' },
];
