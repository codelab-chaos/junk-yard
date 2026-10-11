import { COLOR_EXAMPLES } from './color';
import { INTERACTION_EXAMPLES } from './interaction';
import { LAYOUT_EXAMPLES } from './layout';
import { MOTION_EXAMPLES } from './motion';
import { NAVIGATION_EXAMPLES } from './navigation';
import { SURFACE_EXAMPLES } from './surface';
import { TYPE_EXAMPLES } from './type';
import type { Example } from './types';

export type { Example, ExampleContext } from './types';

const ALL: Example[] = [
  ...LAYOUT_EXAMPLES,
  ...TYPE_EXAMPLES,
  ...COLOR_EXAMPLES,
  ...SURFACE_EXAMPLES,
  ...MOTION_EXAMPLES,
  ...INTERACTION_EXAMPLES,
  ...NAVIGATION_EXAMPLES,
];

export const EXAMPLES: ReadonlyMap<string, Example> = new Map(ALL.map((e) => [e.id, e]));
