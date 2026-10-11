import { defaultLayer, type ShadowLayer } from './model';

const REM_PX = 16;

/** Split on top-level commas only, so rgba(0, 0, 0, .1) stays whole. */
function splitTopLevel(value: string, separator: ',' | ' '): string[] {
  const out: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of value) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (depth === 0 && (separator === ' ' ? /\s/.test(ch) : ch === separator)) {
      if (current.trim()) out.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

function parseLength(token: string): number | undefined {
  const match = /^(-?\d*\.?\d+)(px|rem|em)?$/i.exec(token);
  if (!match) return undefined;
  const n = parseFloat(match[1]);
  const unit = (match[2] ?? 'px').toLowerCase();
  return unit === 'px' ? n : n * REM_PX;
}

let colorCtx: CanvasRenderingContext2D | null | undefined;

/**
 * Normalize any CSS color (named, hex, rgb, hsl, modern syntax) through the
 * canvas, which reports back either #rrggbb or rgba(r, g, b, a).
 */
export function normalizeColor(input: string): { color: string; alpha: number } | undefined {
  colorCtx ??= document.createElement('canvas').getContext('2d');
  if (!colorCtx) return undefined;
  const sentinel = '#010203';
  colorCtx.fillStyle = sentinel;
  colorCtx.fillStyle = input;
  const out = String(colorCtx.fillStyle);
  if (out === sentinel && input.trim().toLowerCase() !== sentinel) return undefined;
  if (out.startsWith('#')) return { color: out.toLowerCase(), alpha: 1 };
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(out);
  if (!m) return undefined;
  const hex = [m[1], m[2], m[3]].map((c) => Number(c).toString(16).padStart(2, '0')).join('');
  return { color: `#${hex}`, alpha: m[4] === undefined ? 1 : Number(m[4]) };
}

function parseLayer(text: string): ShadowLayer | undefined {
  const layer = { ...defaultLayer(), color: '#000000', alpha: 1 };
  const lengths: number[] = [];
  let colorSeen = false;
  for (const token of splitTopLevel(text, ' ')) {
    if (token.toLowerCase() === 'inset') {
      layer.inset = true;
      continue;
    }
    const length = parseLength(token);
    if (length !== undefined) {
      lengths.push(length);
      continue;
    }
    const color = normalizeColor(token);
    if (!color || colorSeen) return undefined;
    colorSeen = true;
    layer.color = color.color;
    layer.alpha = color.alpha;
  }
  if (lengths.length < 2 || lengths.length > 4) return undefined;
  [layer.x, layer.y, layer.blur = 0, layer.spread = 0] = lengths;
  return layer;
}

/**
 * Parse a box-shadow value (or a full `box-shadow: ...;` declaration).
 * Returns undefined when any layer is unreadable.
 */
export function parseBoxShadow(input: string): ShadowLayer[] | undefined {
  const value = input
    .trim()
    .replace(/^box-shadow\s*:/i, '')
    .replace(/;\s*$/, '')
    .trim();
  if (value === '' || value.toLowerCase() === 'none') return [];
  const layers = splitTopLevel(value, ',').map(parseLayer);
  return layers.every((l): l is ShadowLayer => l !== undefined) ? layers : undefined;
}
