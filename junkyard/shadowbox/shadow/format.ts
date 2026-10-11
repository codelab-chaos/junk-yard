import type { ShadowLayer } from './model';

function num(n: number): string {
  return `${Math.round(n * 100) / 100}`;
}

function px(n: number): string {
  return n === 0 ? '0' : `${num(n)}px`;
}

export function layerColor(layer: ShadowLayer): string {
  const r = parseInt(layer.color.slice(1, 3), 16);
  const g = parseInt(layer.color.slice(3, 5), 16);
  const b = parseInt(layer.color.slice(5, 7), 16);
  return layer.alpha >= 1 ? layer.color : `rgba(${r}, ${g}, ${b}, ${num(layer.alpha)})`;
}

export function layerToCss(layer: ShadowLayer): string {
  const parts = [px(layer.x), px(layer.y), px(layer.blur), px(layer.spread), layerColor(layer)];
  return (layer.inset ? ['inset', ...parts] : parts).join(' ');
}

/** The value of a box-shadow declaration. */
export function layersToCss(layers: ShadowLayer[]): string {
  return layers.length === 0 ? 'none' : layers.map(layerToCss).join(', ');
}

export interface OutputFormat {
  id: string;
  label: string;
  render: (value: string) => string;
}

/** Copyable snippets, one per target. Add a target by adding a record. */
export const OUTPUT_FORMATS: OutputFormat[] = [
  { id: 'css', label: 'CSS', render: (v) => `box-shadow: ${v};` },
  {
    id: 'css-multiline',
    label: 'CSS (multi-line)',
    render: (v) => (v === 'none' ? 'box-shadow: none;' : `box-shadow:\n  ${v.split(/,\s(?![^(]*\))/).join(',\n  ')};`),
  },
  { id: 'var', label: 'CSS variable', render: (v) => `--shadow: ${v};` },
  { id: 'tailwind', label: 'Tailwind', render: (v) => `shadow-[${v.replace(/,\s+/g, ',').replace(/\s+/g, '_')}]` },
  { id: 'js', label: 'JS / React style', render: (v) => `boxShadow: '${v}',` },
  { id: 'value', label: 'Value only', render: (v) => v },
];
