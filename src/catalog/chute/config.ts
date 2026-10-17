import { regularPolygon, type Point } from './geometry';
import type { DeflectorSpec } from './types';

/** Units are px and seconds. */
export const PHYSICS = {
  gravity: 1400,
  maxSpeed: 1200,
  /** Velocity lost per second to air, as a fraction. */
  drag: 0.15,
  /** Bounce off deflectors and off each other. */
  restitution: 0.25,
  junkRestitution: 0.1,
  /** Share of sliding speed lost on each deflector contact. */
  friction: 0.04,
  /** Spin lost per second in the air, as a fraction. */
  spinDrag: 1.2,
  /** How far each contact pulls spin toward rolling speed (0 keeps spin, 1 snaps to it). */
  rollGrip: 0.35,
  /** Substeps per frame keep fast junk from tunneling through thin bars. */
  substeps: 4,
  maxFrame: 1 / 30,
} as const;

export const SPAWN = {
  perSecond: 5,
  maxJunk: 90,
  radius: [7, 20],
  sides: [3, 7],
  /** How irregular each vertex is, as a share of the radius. */
  jitter: 0.35,
  speed: [40, 140],
  sideways: 40,
  spin: 5,
  /** Below this speed a piece counts as resting. */
  restSpeed: 30,
  restLimit: 6,
  fadeTime: 1,
  /** Junk this far outside the viewport is removed. */
  margin: 80,
} as const;

export const CHUTE = {
  /** Horizontal center of the chute as a fraction of the page width. */
  x: 0.78,
  /** Mouth position inside the chute artwork, as fractions of its box. */
  mouth: { x: 0.5, y: 0.95, width: 0.2 },
  ambientOpacity: 0.45,
} as const;

export const EDITOR = {
  rotateStep: Math.PI / 12,
  nudge: 4,
  handleGap: 24,
  handleRadius: 9,
  /** The remove button sits beside the knob, along the deflector's local x axis. */
  removeGap: 40,
  removeRadius: 9,
  /** Larger touch target than the drawn knob. */
  handleHit: 20,
} as const;

/** Theme tokens the renderer reads from CSS, so colors stay in the stylesheet. */
export const THEME_TOKENS = {
  junk: ['--junk-1', '--junk-2', '--junk-3', '--junk-4', '--junk-5'],
  junkEdge: '--junk-edge',
  deflector: '--deflector',
  deflectorEdge: '--deflector-edge',
  accent: '--accent',
  panel: '--panel',
  text: '--text',
} as const;

export interface DeflectorKind {
  label: string;
  points: Point[];
}

export const DEFLECTOR_KINDS: Record<string, DeflectorKind> = {
  bar: { label: 'Bar', points: [[-90, -7], [90, -7], [90, 7], [-90, 7]] },
  plank: { label: 'Plank', points: [[-160, -6], [160, -6], [160, 6], [-160, 6]] },
  wedge: { label: 'Wedge', points: [[-60, 28], [60, 28], [0, -28]] },
  bumper: { label: 'Bumper', points: regularPolygon(14, 28) },
};

export const DEFAULT_LAYOUT: DeflectorSpec[] = [
  { kind: 'bar', x: 0.78, y: 0.3, angle: -0.35 },
  { kind: 'plank', x: 0.5, y: 0.52, angle: 0.22 },
  { kind: 'bumper', x: 0.76, y: 0.7, angle: 0 },
  { kind: 'wedge', x: 0.22, y: 0.82, angle: 0 },
];
