import { cloneDesign, type ShadowDesign } from '../shadow/model';
import type { DesignStore } from './store';

const IDLE_MS = 350;
const LIMIT = 100;

/**
 * Undo and redo over whole-design snapshots. Changes are committed once the
 * store goes idle, so a slider drag or a light drag is one step.
 */
export class History {
  private past: ShadowDesign[] = [];
  private future: ShadowDesign[] = [];
  private committed: ShadowDesign;
  private timer = 0;
  private applying = false;
  private listeners = new Set<() => void>();

  constructor(private store: DesignStore) {
    this.committed = cloneDesign(store.current);
    store.subscribe(() => {
      if (this.applying) return;
      this.future = [];
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => this.commit(), IDLE_MS);
    });
  }

  get canUndo(): boolean {
    return this.past.length > 0 || this.dirty();
  }

  get canRedo(): boolean {
    return this.future.length > 0;
  }

  onChange(listener: () => void): void {
    this.listeners.add(listener);
  }

  undo(): void {
    this.commit();
    const previous = this.past.pop();
    if (!previous) return;
    this.future.push(this.committed);
    this.apply(previous);
  }

  redo(): void {
    const next = this.future.pop();
    if (!next) return;
    this.past.push(this.committed);
    this.apply(next);
  }

  private dirty(): boolean {
    return JSON.stringify(this.committed) !== JSON.stringify(this.store.current);
  }

  private commit(): void {
    window.clearTimeout(this.timer);
    if (this.dirty()) {
      this.past = [...this.past, this.committed].slice(-LIMIT);
      this.committed = cloneDesign(this.store.current);
    }
    this.notify();
  }

  private apply(design: ShadowDesign): void {
    this.committed = design;
    this.applying = true;
    this.store.load(design);
    this.applying = false;
    this.notify();
  }

  private notify(): void {
    for (const listener of this.listeners) listener();
  }
}
