import { EDITOR } from './config';
import { pointInConvex } from './geometry';
import { angleToward, handlePosition, removePosition } from './handle';
import type { EditorView } from './render';
import type { Deflector, DeflectorSpec } from './types';
import type { World } from './world';

type Drag =
  | { mode: 'move'; d: Deflector; dx: number; dy: number }
  | { mode: 'rotate'; d: Deflector };

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/**
 * Direct manipulation of deflectors on the canvas: drag to move, drag the
 * knob or scroll to rotate, keys to nudge, rotate and delete.
 * Every finished change is reported through `onChange`.
 */
export class Editor implements EditorView {
  selected: Deflector | null = null;
  hovered: Deflector | null = null;

  private enabled = false;
  private drag: Drag | null = null;

  constructor(
    private canvas: HTMLCanvasElement,
    private world: World,
    private onChange: () => void,
    private onExit: () => void,
  ) {
    canvas.addEventListener('pointerdown', (e) => this.pointerDown(e));
    canvas.addEventListener('pointermove', (e) => this.pointerMove(e));
    canvas.addEventListener('pointerup', (e) => this.pointerUp(e));
    canvas.addEventListener('pointercancel', (e) => this.pointerUp(e));
    canvas.addEventListener('wheel', (e) => this.wheel(e), { passive: false });
    window.addEventListener('keydown', (e) => this.keyDown(e));
  }

  setEnabled(on: boolean): void {
    this.enabled = on;
    this.drag = null;
    this.selected = null;
    this.hovered = null;
    this.canvas.style.cursor = '';
  }

  add(kind: string): void {
    const spec: DeflectorSpec = { kind, x: 0.5, y: 0.45, angle: 0 };
    this.selected = this.world.addDeflector(spec);
    this.onChange();
  }

  replaceAll(specs: DeflectorSpec[]): void {
    this.world.setLayout(specs);
    this.selected = null;
    this.hovered = null;
    this.onChange();
  }

  private hit(x: number, y: number): Deflector | null {
    const list = this.world.deflectors;
    for (let i = list.length - 1; i >= 0; i--) {
      if (pointInConvex(x, y, list[i].poly)) return list[i];
    }
    return null;
  }

  /** True when (x, y) is on one of the selected deflector's controls. */
  private onControl(place: typeof handlePosition, x: number, y: number): boolean {
    if (!this.selected) return false;
    const at = place(this.selected, this.world.width, this.world.height);
    return Math.hypot(x - at.x, y - at.y) <= EDITOR.handleHit;
  }

  private onHandle(x: number, y: number): boolean {
    return this.onControl(handlePosition, x, y);
  }

  private onRemove(x: number, y: number): boolean {
    return this.onControl(removePosition, x, y);
  }

  private remove(d: Deflector): void {
    this.world.removeDeflector(d);
    this.selected = null;
    this.onChange();
  }

  private pointerDown(e: PointerEvent): void {
    if (!this.enabled) return;
    const { offsetX: x, offsetY: y } = e;
    if (this.selected && this.onRemove(x, y)) {
      this.remove(this.selected);
    } else if (this.selected && this.onHandle(x, y)) {
      this.drag = { mode: 'rotate', d: this.selected };
    } else {
      const d = this.hit(x, y);
      this.selected = d;
      if (d) this.drag = { mode: 'move', d, dx: x - d.x * this.world.width, dy: y - d.y * this.world.height };
    }
    if (this.drag) this.canvas.setPointerCapture(e.pointerId);
    this.updateCursor(x, y);
  }

  private pointerMove(e: PointerEvent): void {
    if (!this.enabled) return;
    const { offsetX: x, offsetY: y } = e;
    const { width, height } = this.world;
    const drag = this.drag;
    if (drag?.mode === 'move') {
      this.world.updateDeflector(drag.d, { x: (x - drag.dx) / width, y: (y - drag.dy) / height });
    } else if (drag?.mode === 'rotate') {
      const raw = angleToward(drag.d, x, y, width, height);
      const angle = e.shiftKey ? Math.round(raw / EDITOR.rotateStep) * EDITOR.rotateStep : raw;
      this.world.updateDeflector(drag.d, { angle });
    } else {
      this.hovered = this.hit(x, y);
    }
    this.updateCursor(x, y);
  }

  private pointerUp(e: PointerEvent): void {
    if (!this.drag) return;
    this.drag = null;
    if (this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId);
    this.updateCursor(e.offsetX, e.offsetY);
    this.onChange();
  }

  private wheel(e: WheelEvent): void {
    if (!this.enabled) return;
    const d = this.hit(e.offsetX, e.offsetY) ?? this.selected;
    if (!d) return;
    e.preventDefault();
    this.selected = d;
    this.rotate(d, Math.sign(e.deltaY));
  }

  private rotate(d: Deflector, steps: number): void {
    this.world.updateDeflector(d, { angle: d.angle + steps * EDITOR.rotateStep });
    this.onChange();
  }

  private keyDown(e: KeyboardEvent): void {
    if (!this.enabled || isTyping(e.target)) return;
    if (e.key === 'Escape') {
      if (this.selected) this.selected = null;
      else this.onExit();
      e.preventDefault();
      return;
    }
    const d = this.selected;
    if (!d) return;
    const { width, height } = this.world;
    const step = EDITOR.nudge * (e.shiftKey ? 10 : 1);
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    if (e.key in moves) {
      const [dx, dy] = moves[e.key];
      this.world.updateDeflector(d, { x: d.x + dx / width, y: d.y + dy / height });
      this.onChange();
    } else if (e.key === 'q' || e.key === 'e') {
      this.rotate(d, e.key === 'q' ? -1 : 1);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      this.remove(d);
    } else {
      return;
    }
    e.preventDefault();
  }

  private updateCursor(x: number, y: number): void {
    const cursor =
      this.drag?.mode === 'move'
        ? 'grabbing'
        : this.drag || this.onHandle(x, y)
          ? 'crosshair'
          : this.onRemove(x, y)
            ? 'pointer'
          : this.hit(x, y)
            ? 'grab'
            : '';
    this.canvas.style.cursor = cursor;
  }
}
