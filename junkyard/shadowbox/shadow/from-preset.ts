import type { Preset } from '../presets';
import { DEFAULT_STAGE, type ShadowDesign } from './model';
import { parseBoxShadow } from './parse';

export function designFromPreset(preset: Preset): ShadowDesign | undefined {
  const layers = parseBoxShadow(preset.css);
  if (!layers) return undefined;
  return { name: preset.name, layers, stage: { ...DEFAULT_STAGE, ...preset.stage } };
}
