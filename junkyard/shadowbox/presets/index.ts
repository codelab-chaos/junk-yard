import type { PresetCollection } from './types';
import { antDesign, bootstrap, chakra, fluent, material3, primer, tailwind } from './design-systems';
import { material2 } from './material2';
import { everyday, glow, hard, insets, layered, neumorphism, overlays, rings } from './styles';

/** Display order of the built-in library. */
export const BUILT_IN_COLLECTIONS: PresetCollection[] = [
  everyday,
  tailwind,
  material2,
  material3,
  bootstrap,
  chakra,
  fluent,
  primer,
  antDesign,
  overlays,
  layered,
  neumorphism,
  glow,
  hard,
  rings,
  insets,
];

export type { Preset, PresetCollection } from './types';
