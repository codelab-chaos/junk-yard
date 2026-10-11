import type { ShadowDesign } from '../shadow/model';

type Listener = (design: ShadowDesign | undefined) => void;

/**
 * A transient preview that never touches the store: hovering a preset shows
 * it on the stage, leaving restores the design being edited.
 */
export class Peek {
  private design: ShadowDesign | undefined;
  private listeners = new Set<Listener>();

  get current(): ShadowDesign | undefined {
    return this.design;
  }

  subscribe(listener: Listener): void {
    this.listeners.add(listener);
  }

  show(design: ShadowDesign | undefined): void {
    if (design === this.design) return;
    this.design = design;
    for (const listener of this.listeners) listener(design);
  }

  clear(): void {
    this.show(undefined);
  }
}
