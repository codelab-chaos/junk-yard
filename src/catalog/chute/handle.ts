import { EDITOR } from './config';
import type { Deflector } from './types';

/** The rotation knob sits "above" a deflector along its local up axis. */
export function handlePosition(d: Deflector, width: number, height: number): { x: number; y: number } {
  const dist = d.reach + EDITOR.handleGap;
  return {
    x: d.x * width + Math.sin(d.angle) * dist,
    y: d.y * height - Math.cos(d.angle) * dist,
  };
}

/** The remove button sits beside the knob so both controls travel together. */
export function removePosition(d: Deflector, width: number, height: number): { x: number; y: number } {
  const knob = handlePosition(d, width, height);
  return {
    x: knob.x + Math.cos(d.angle) * EDITOR.removeGap,
    y: knob.y + Math.sin(d.angle) * EDITOR.removeGap,
  };
}

/** Angle that points a deflector's up axis from its center toward (px, py). */
export function angleToward(d: Deflector, px: number, py: number, width: number, height: number): number {
  return Math.atan2(px - d.x * width, -(py - d.y * height));
}
