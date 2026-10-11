/** One box-shadow layer, in editor units (px, hex color + alpha). */
export interface ShadowLayer {
  inset: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  /** #rrggbb */
  color: string;
  /** 0..1 */
  alpha: number;
}

/** The scene the shadow is previewed on. */
export interface Stage {
  background: string;
  surface: string;
  radius: number;
  size: number;
}

export interface ShadowDesign {
  name: string;
  layers: ShadowLayer[];
  stage: Stage;
}

export const DEFAULT_STAGE: Stage = { background: '#f1f1f4', surface: '#ffffff', radius: 12, size: 180 };

export const MAX_LAYERS = 12;

export function defaultLayer(): ShadowLayer {
  return { inset: false, x: 0, y: 8, blur: 24, spread: 0, color: '#000000', alpha: 0.15 };
}

/** Numeric layer fields with their editor ranges, used for controls and hash validation. */
export const LAYER_FIELDS = [
  { key: 'x', label: 'X offset', min: -100, max: 100, step: 0.5 },
  { key: 'y', label: 'Y offset', min: -100, max: 100, step: 0.5 },
  { key: 'blur', label: 'Blur', min: 0, max: 200, step: 0.5 },
  { key: 'spread', label: 'Spread', min: -100, max: 100, step: 0.5 },
] as const satisfies readonly { key: keyof ShadowLayer; label: string; min: number; max: number; step: number }[];

export const STAGE_FIELDS = [
  { key: 'radius', label: 'Radius', min: 0, max: 120, step: 1 },
  { key: 'size', label: 'Size', min: 60, max: 320, step: 2 },
] as const satisfies readonly { key: keyof Stage; label: string; min: number; max: number; step: number }[];

export function cloneDesign(design: ShadowDesign): ShadowDesign {
  return { name: design.name, layers: design.layers.map((l) => ({ ...l })), stage: { ...design.stage } };
}
