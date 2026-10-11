import { readJson, writeJson } from '@lib/local-store';
import { cleanName } from '../shadow/codec';
import type { Preset, PresetCollection } from './types';

const KEY = 'junkyard.shadowbox.presets.v1';

/** Presets saved in this browser, stored in the same shape as built-ins. */
export function loadUserPresets(): Preset[] {
  const raw = readJson<unknown>(KEY, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (p): p is Preset => typeof p === 'object' && p !== null && typeof p.name === 'string' && typeof p.css === 'string',
  );
}

export function saveUserPreset(preset: Preset): Preset[] {
  const name = cleanName(preset.name) || 'Untitled';
  const next = [{ ...preset, name }, ...loadUserPresets().filter((p) => p.name !== name)];
  writeJson(KEY, next);
  return next;
}

export function deleteUserPreset(name: string): Preset[] {
  const next = loadUserPresets().filter((p) => p.name !== name);
  writeJson(KEY, next);
  return next;
}

export function userCollection(presets: Preset[]): PresetCollection {
  return { id: 'mine', name: 'My presets', note: 'Saved in this browser only.', presets };
}
