import { h } from '@lib/dom';

interface RangeSpec {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit?: string;
  onInput: (value: number) => void;
}

/** A slider and number box that stay in sync. The number box accepts values past the slider range. */
export function rangeControl(spec: RangeSpec): HTMLLabelElement {
  const slider = h('input', { type: 'range', min: spec.min, max: spec.max, step: spec.step, value: String(spec.value) });
  const box = h('input', { type: 'number', step: spec.step, value: String(spec.value) });
  const set = (raw: string, source: HTMLInputElement) => {
    const n = parseFloat(raw);
    if (!Number.isFinite(n)) return;
    if (source !== slider) slider.value = String(n);
    if (source !== box) box.value = String(n);
    spec.onInput(n);
  };
  slider.addEventListener('input', () => set(slider.value, slider));
  box.addEventListener('input', () => set(box.value, box));
  return h('label', { class: 'control' }, h('span', {}, spec.label), slider, box, spec.unit ? h('small', {}, spec.unit) : null);
}

export function colorControl(label: string, value: string, onInput: (hex: string) => void): HTMLLabelElement {
  const input = h('input', { type: 'color', value });
  input.addEventListener('input', () => onInput(input.value));
  return h('label', { class: 'control control-color' }, h('span', {}, label), input);
}

export function button(label: string, onClick: () => void, attrs: Record<string, string> = {}): HTMLButtonElement {
  const el = h('button', { type: 'button', ...attrs }, label);
  el.addEventListener('click', onClick);
  return el;
}
