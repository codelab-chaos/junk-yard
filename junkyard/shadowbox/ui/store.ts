import { cloneDesign, type ShadowDesign } from '../shadow/model';

/**
 * 'structure' = layers added, removed, reordered or a whole design loaded
 * (controls must rebuild). 'values' = a field changed in place.
 */
export type ChangeKind = 'structure' | 'values';
type Listener = (design: ShadowDesign, kind: ChangeKind) => void;

export class DesignStore {
  private design: ShadowDesign;
  private listeners = new Set<Listener>();

  constructor(initial: ShadowDesign) {
    this.design = cloneDesign(initial);
  }

  get current(): ShadowDesign {
    return this.design;
  }

  subscribe(listener: Listener): void {
    this.listeners.add(listener);
  }

  /** Replace the whole design, e.g. from a preset or a shared hash. */
  load(design: ShadowDesign): void {
    this.design = cloneDesign(design);
    this.emit('structure');
  }

  update(mutate: (draft: ShadowDesign) => void, kind: ChangeKind = 'values'): void {
    mutate(this.design);
    this.emit(kind);
  }

  private emit(kind: ChangeKind): void {
    for (const listener of this.listeners) listener(this.design, kind);
  }
}
