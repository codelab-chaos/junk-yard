import type { ShadowLayer } from '../shadow/model';
import { lightAngle, relight } from '../shadow/transforms';
import { LIGHT_ORBIT } from './preview';
import type { DesignStore } from './store';

const MIN_SCALE = 0.2;
const MAX_SCALE = 3;
const KEY_STEP = Math.PI / 36;

/**
 * Drag anywhere on the stage to move the light. Every layer's offset rotates
 * to fall away from the pointer, and its length scales with the pointer's
 * distance from the box (the orb's resting orbit is 1x).
 */
export function mountLightDrag(stage: HTMLElement, light: HTMLElement, store: DesignStore): void {
  const apply = (base: ShadowLayer[], rotate: number, scale: number) =>
    store.update((d) => (d.layers = relight(base, rotate, scale)), 'structure');

  stage.addEventListener('pointerdown', (down) => {
    if (down.button !== 0 || (down.target as HTMLElement).closest('button, input')) return;
    const base = store.current.layers.map((l) => ({ ...l }));
    if (!base.some((l) => l.x !== 0 || l.y !== 0)) return;
    const angle0 = lightAngle(base);
    const rect = stage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const orbit = (Math.min(rect.width, rect.height) / 2) * LIGHT_ORBIT;

    const move = (e: PointerEvent) => {
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.hypot(dx, dy) / orbit));
      apply(base, Math.atan2(dy, dx) - angle0, scale);
    };
    const end = () => {
      stage.removeEventListener('pointermove', move);
      stage.classList.remove('is-dragging');
    };

    stage.setPointerCapture(down.pointerId);
    stage.classList.add('is-dragging');
    move(down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', end, { once: true });
    stage.addEventListener('pointercancel', end, { once: true });
  });

  // Keyboard: arrows orbit the light, so the stage is operable without a pointer.
  light.addEventListener('keydown', (e) => {
    const turn = { ArrowLeft: -KEY_STEP, ArrowUp: -KEY_STEP, ArrowRight: KEY_STEP, ArrowDown: KEY_STEP }[e.key];
    if (turn === undefined) return;
    e.preventDefault();
    apply(store.current.layers, turn * (e.shiftKey ? 3 : 1), 1);
  });
}
