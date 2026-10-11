import { h } from '@lib/dom';
import { icon, type IconName } from './icons';

interface RangeSpec {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit?: string;
  onInput: (value: number) => void;
}

/** Pixels of pointer travel per step when scrubbing a label. */
const SCRUB_PX = 2;

const decimals = (step: number) => (String(step).split('.')[1] ?? '').length;

/**
 * A slider and number box that stay in sync. The number box accepts values
 * past the slider range. Dragging the label scrubs the value (Shift for 10x).
 */
export function rangeControl(spec: RangeSpec): HTMLDivElement {
  const slider = h('input', { type: 'range', min: spec.min, max: spec.max, step: spec.step, value: String(spec.value), 'aria-label': spec.label });
  const box = h('input', { type: 'number', step: spec.step, value: String(spec.value), 'aria-label': `${spec.label} value` });
  const label = h('span', { class: 'control-label', title: 'Drag to adjust' }, spec.label);
  let current = spec.value;

  const set = (n: number, source?: HTMLInputElement) => {
    if (!Number.isFinite(n)) return;
    current = Number(n.toFixed(decimals(spec.step)));
    if (source !== slider) slider.value = String(current);
    if (source !== box) box.value = String(current);
    spec.onInput(current);
  };
  slider.addEventListener('input', () => set(parseFloat(slider.value), slider));
  box.addEventListener('input', () => set(parseFloat(box.value), box));

  label.addEventListener('pointerdown', (down) => {
    down.preventDefault();
    label.setPointerCapture(down.pointerId);
    const start = current;
    const move = (e: PointerEvent) => {
      const steps = Math.round((e.clientX - down.clientX) / SCRUB_PX) * (e.shiftKey ? 10 : 1);
      set(start + steps * spec.step);
    };
    const end = () => {
      label.removeEventListener('pointermove', move);
      label.classList.remove('is-scrubbing');
    };
    label.classList.add('is-scrubbing');
    label.addEventListener('pointermove', move);
    label.addEventListener('pointerup', end, { once: true });
    label.addEventListener('pointercancel', end, { once: true });
  });

  return h('div', { class: 'control' }, label, slider, h('span', { class: 'control-value' }, box, spec.unit ? h('small', {}, spec.unit) : null));
}

export function colorControl(label: string, value: string, onInput: (hex: string) => void): HTMLLabelElement {
  const input = h('input', { type: 'color', value });
  const code = h('code', {}, value);
  input.addEventListener('input', () => {
    code.textContent = input.value;
    onInput(input.value);
  });
  return h('label', { class: 'control control-color' }, h('span', { class: 'control-label' }, label), h('span', { class: 'color-field' }, input, code));
}

/** Two or more mutually exclusive options, rendered as a segmented control. */
export function segmented<T extends string>(label: string, options: { value: T; label: string }[], value: T, onChange: (value: T) => void): HTMLDivElement {
  const buttons = options.map((o) => {
    const b = h('button', { type: 'button', 'aria-pressed': String(o.value === value) }, o.label);
    b.addEventListener('click', () => {
      for (const other of buttons) other.setAttribute('aria-pressed', String(other === b));
      onChange(o.value);
    });
    return b;
  });
  return h('div', { class: 'control' }, h('span', { class: 'control-label' }, label), h('div', { class: 'segmented', role: 'group', 'aria-label': label }, ...buttons));
}

export function button(label: string, onClick: () => void, attrs: Record<string, string> = {}): HTMLButtonElement {
  const el = h('button', { type: 'button', ...attrs }, label);
  el.addEventListener('click', onClick);
  return el;
}

/** Square icon-only button; the label becomes its accessible name and tooltip. */
export function iconButton(name: IconName, label: string, onClick: () => void, disabled = false): HTMLButtonElement {
  const el = h('button', { type: 'button', class: 'icon-btn', 'aria-label': label, title: label, disabled });
  el.append(icon(name));
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    onClick();
  });
  return el;
}
