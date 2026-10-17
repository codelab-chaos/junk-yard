import { readJson, writeJson } from '@lib/local-store';
import { DEFLECTOR_KINDS } from './config';
import type { DeflectorSpec } from './types';

const KEY = 'junkyard:chute-layout';
const VERSION = 1;

interface Saved {
  v: number;
  deflectors: DeflectorSpec[];
}

function isSpec(value: unknown): value is DeflectorSpec {
  const s = value as DeflectorSpec;
  return (
    typeof s === 'object' &&
    s !== null &&
    typeof s.kind === 'string' &&
    s.kind in DEFLECTOR_KINDS &&
    [s.x, s.y, s.angle].every(Number.isFinite)
  );
}

/** The viewer's own deflector layout, or the fallback when none is saved or it is unreadable. */
export function loadLayout(fallback: DeflectorSpec[]): DeflectorSpec[] {
  const saved = readJson<Partial<Saved> | null>(KEY, null);
  if (!saved || saved.v !== VERSION || !Array.isArray(saved.deflectors)) return fallback;
  return saved.deflectors.filter(isSpec);
}

export function saveLayout(deflectors: DeflectorSpec[]): void {
  writeJson(KEY, { v: VERSION, deflectors } satisfies Saved);
}
