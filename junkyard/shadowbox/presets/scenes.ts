import type { Stage } from '../shadow/model';

export interface Scene {
  name: string;
  background: Stage['background'];
  surface: Stage['surface'];
}

/** One-click stage backdrops. Add a scene by adding a record. */
export const SCENES: Scene[] = [
  { name: 'Gallery', background: '#f1f1f4', surface: '#ffffff' },
  { name: 'Plaster', background: '#ece6da', surface: '#faf7f0' },
  { name: 'Sky', background: '#dfe8f7', surface: '#ffffff' },
  { name: 'Sage', background: '#dfe7dc', surface: '#f7faf5' },
  { name: 'Clay', background: '#e0e5ec', surface: '#e0e5ec' },
  { name: 'Terracotta', background: '#e9b99a', surface: '#f8e7db' },
  { name: 'Slate', background: '#1d2027', surface: '#2a2e38' },
  { name: 'Ink', background: '#0e0e10', surface: '#1a1a1e' },
];
