import type { World } from '../types';
import { GAMES_A } from './games-a';
import { GAMES_B } from './games-b';
import { GAMES_C } from './games-c';

/** Every world. Games only for now; films can be added later as more files in this folder. */
export const WORLDS: World[] = [...GAMES_A, ...GAMES_B, ...GAMES_C];
