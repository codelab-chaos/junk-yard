import { decodeHashData, encodeHashData } from '@lib/hash-codec';
import { DEFAULT_STAGE, LAYER_FIELDS, MAX_LAYERS, STAGE_FIELDS, type ShadowDesign, type ShadowLayer, type Stage } from './model';

/**
 * Compact, versioned share format:
 * { v: 1, n: name, l: [[inset, x, y, blur, spread, 'rrggbb', alpha%]], s: [bg, surface, radius, size] }
 * Decoding validates every field and clamps numbers, so a crafted hash can
 * only ever produce a well-formed design.
 */
type WireLayer = [number, number, number, number, number, string, number];
type WireStage = [string, string, number, number];
interface Wire {
  v: 1;
  n: string;
  l: WireLayer[];
  s: WireStage;
}

const HEX = /^[0-9a-f]{6}$/i;
const MAX_NAME = 60;

function clamp(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === 'number' && Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, n));
}

function hex(value: unknown, fallback: string): string {
  return typeof value === 'string' && HEX.test(value) ? `#${value.toLowerCase()}` : fallback;
}

export function cleanName(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f<>]/g, '').trim().slice(0, MAX_NAME) : '';
}

function range(key: string) {
  const field = [...LAYER_FIELDS, ...STAGE_FIELDS].find((f) => f.key === key);
  if (!field) throw new Error(`Unknown field ${key}`);
  return field;
}

function fit(key: string, value: unknown, fallback: number): number {
  const { min, max } = range(key);
  return clamp(value, min, max, fallback);
}

export function encodeDesign(design: ShadowDesign): string {
  const wire: Wire = {
    v: 1,
    n: design.name,
    l: design.layers.map((l) => [
      l.inset ? 1 : 0,
      l.x,
      l.y,
      l.blur,
      l.spread,
      l.color.slice(1),
      Math.round(l.alpha * 100),
    ]),
    s: [design.stage.background.slice(1), design.stage.surface.slice(1), design.stage.radius, design.stage.size],
  };
  return encodeHashData(wire);
}

function decodeLayer(raw: unknown): ShadowLayer | undefined {
  if (!Array.isArray(raw) || raw.length !== 7) return undefined;
  const [inset, x, y, blur, spread, color, alpha] = raw as unknown[];
  return {
    inset: inset === 1,
    x: fit('x', x, 0),
    y: fit('y', y, 0),
    blur: fit('blur', blur, 0),
    spread: fit('spread', spread, 0),
    color: hex(color, '#000000'),
    alpha: clamp(alpha, 0, 100, 100) / 100,
  };
}

function decodeStage(raw: unknown): Stage {
  const [background, surface, radius, size] = Array.isArray(raw) ? (raw as unknown[]) : [];
  return {
    background: hex(background, DEFAULT_STAGE.background),
    surface: hex(surface, DEFAULT_STAGE.surface),
    radius: fit('radius', radius, DEFAULT_STAGE.radius),
    size: fit('size', size, DEFAULT_STAGE.size),
  };
}

export function decodeDesign(encoded: string): ShadowDesign | undefined {
  const data = decodeHashData(encoded) as Partial<Wire> | undefined;
  if (!data || data.v !== 1 || !Array.isArray(data.l)) return undefined;
  const layers = data.l.slice(0, MAX_LAYERS).map(decodeLayer);
  if (!layers.every((l): l is ShadowLayer => l !== undefined)) return undefined;
  return { name: cleanName(data.n) || 'Shared shadow', layers, stage: decodeStage(data.s) };
}
