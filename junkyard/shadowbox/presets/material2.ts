import type { PresetCollection } from './types';

type Offsets = [y: number, blur: number, spread: number];

/**
 * Material Design 2 elevation (dp 1..24) is three layers per level, each
 * with a fixed alpha. MUI's theme.shadows is built from these same tables.
 */
const UMBRA: Offsets[] = [
  [2, 1, -1], [3, 1, -2], [3, 3, -2], [2, 4, -1], [3, 5, -1], [3, 5, -1], [4, 5, -2], [5, 5, -3],
  [5, 6, -3], [6, 6, -3], [6, 7, -4], [7, 8, -4], [7, 8, -4], [7, 9, -4], [8, 9, -5], [8, 10, -5],
  [8, 11, -5], [9, 11, -5], [9, 12, -6], [10, 13, -6], [10, 13, -6], [10, 14, -6], [11, 14, -7], [11, 15, -7],
];
const PENUMBRA: Offsets[] = [
  [1, 1, 0], [2, 2, 0], [3, 4, 0], [4, 5, 0], [5, 8, 0], [6, 10, 0], [7, 10, 1], [8, 10, 1],
  [9, 12, 1], [10, 14, 1], [11, 15, 1], [12, 17, 2], [13, 19, 2], [14, 21, 2], [15, 22, 2], [16, 24, 2],
  [17, 26, 2], [18, 28, 2], [19, 29, 2], [20, 31, 3], [21, 33, 3], [22, 35, 3], [23, 36, 3], [24, 38, 3],
];
const AMBIENT: Offsets[] = [
  [1, 3, 0], [1, 5, 0], [1, 8, 0], [1, 10, 0], [1, 14, 0], [1, 18, 0], [2, 16, 1], [3, 14, 2],
  [3, 16, 2], [4, 18, 3], [4, 20, 3], [5, 22, 4], [5, 24, 4], [5, 26, 4], [6, 28, 5], [6, 30, 5],
  [6, 32, 5], [7, 34, 6], [7, 36, 6], [8, 38, 7], [8, 40, 7], [8, 42, 7], [9, 44, 8], [9, 46, 8],
];
const LAYERS: [Offsets[], number][] = [
  [UMBRA, 0.2],
  [PENUMBRA, 0.14],
  [AMBIENT, 0.12],
];

function level(dp: number): string {
  return LAYERS.map(([table, alpha]) => {
    const [y, blur, spread] = table[dp - 1];
    return `0px ${y}px ${blur}px ${spread}px rgba(0, 0, 0, ${alpha})`;
  }).join(', ');
}

export const material2: PresetCollection = {
  id: 'material2',
  name: 'Material 2 / MUI',
  note: 'Elevation 1 to 24, identical to MUI theme.shadows[1..24].',
  presets: Array.from({ length: 24 }, (_, i) => ({ name: `Elevation ${i + 1}`, css: level(i + 1) })),
};
