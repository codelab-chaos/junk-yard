import type { ShadowLayer } from './model';

/** Default light position when no layer has an offset: straight above. */
const DEFAULT_LIGHT = -Math.PI / 2;

const snap = (n: number) => Math.round(n * 2) / 2;

/**
 * Where the light sits, in radians, derived from the layer with the longest
 * offset. Shadows fall away from the light, so the light is opposite.
 */
export function lightAngle(layers: ShadowLayer[]): number {
  const dominant = layers
    .filter((l) => !l.inset)
    .reduce<ShadowLayer | undefined>((best, l) => (!best || Math.hypot(l.x, l.y) > Math.hypot(best.x, best.y) ? l : best), undefined);
  if (!dominant || Math.hypot(dominant.x, dominant.y) === 0) return DEFAULT_LIGHT;
  return Math.atan2(dominant.y, dominant.x) + Math.PI;
}

export function hasOffset(layers: ShadowLayer[]): boolean {
  return layers.some((l) => l.x !== 0 || l.y !== 0);
}

/** Degrees on a compass where 0 is the top and angles grow clockwise. */
export function compassDegrees(radians: number): number {
  return Math.round(((radians * 180) / Math.PI + 90 + 360) % 360);
}

/**
 * Re-aims every layer at a moved light: offsets rotate by the change in
 * angle and stretch by `scale`, so all layers stay consistent with one light.
 */
export function relight(base: ShadowLayer[], rotate: number, scale: number): ShadowLayer[] {
  const cos = Math.cos(rotate);
  const sin = Math.sin(rotate);
  return base.map((l) => ({
    ...l,
    x: snap((l.x * cos - l.y * sin) * scale),
    y: snap((l.x * sin + l.y * cos) * scale),
  }));
}

function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return `#${[0, 8, 4].map((n) => Math.round(f(n) * 255).toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Shadow color tinted from the scene background: same hue, more saturated,
 * much darker. Pure black shadows look muddy on colored surfaces.
 */
export function shadowTint(background: string): string {
  const [h, s] = hexToHsl(background);
  return hslToHex(h, Math.min(1, s * 1.2 + (s > 0.04 ? 0.15 : 0)), 0.16);
}

/** Recolors dark layers with the scene tint; light layers (highlights, neumorphism) are kept. */
export function tintLayers(layers: ShadowLayer[], background: string): ShadowLayer[] {
  const tint = shadowTint(background);
  return layers.map((l) => (hexToHsl(l.color)[2] < 0.5 ? { ...l, color: tint } : l));
}

/** Relative luminance, used to pick readable ink over a user-chosen color. */
export function isDark(hex: string): boolean {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.4;
}
