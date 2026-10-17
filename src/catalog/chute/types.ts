import type { Point } from './geometry';

/** A deflector as saved: position is a fraction of the viewport, angle in radians. */
export interface DeflectorSpec {
  kind: string;
  x: number;
  y: number;
  angle: number;
}

/** A placed deflector with its world-space outline. */
export interface Deflector extends DeflectorSpec {
  id: number;
  poly: Point[];
  /** Distance from center to the farthest vertex, in px. */
  reach: number;
}

export interface Junk {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  /** Distance to the farthest vertex in px: the broad-phase radius and the mass basis. */
  r: number;
  /** Convex outline in local space; it is both what's drawn and what collides. */
  shape: Point[];
  /** `shape` placed in world space, refreshed each substep. */
  hull: Point[];
  color: number;
  /** Seconds spent nearly still; long rests fade the piece out. */
  rest: number;
  /** 1 while alive, counts down to 0 while fading out. */
  fade: number;
  fading: boolean;
}

/** Where junk leaves the chute, in viewport px. */
export interface Emitter {
  x: number;
  y: number;
  width: number;
}
