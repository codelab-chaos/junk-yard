import type { Stage } from '../shadow/model';

export interface Preset {
  name: string;
  /** A box-shadow value exactly as the source ships it. */
  css: string;
  /** Scene overrides, e.g. neumorphism needs surface === background. */
  stage?: Partial<Stage>;
}

export interface PresetCollection {
  id: string;
  name: string;
  note?: string;
  presets: Preset[];
}
