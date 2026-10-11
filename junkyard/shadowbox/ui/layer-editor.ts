import { h } from '@lib/dom';
import { LAYER_FIELDS, MAX_LAYERS, defaultLayer, type ShadowLayer } from '../shadow/model';
import { layerToCss } from '../shadow/format';
import type { DesignStore } from './store';
import { button, colorControl, rangeControl } from './controls';

function move<T>(list: T[], from: number, to: number): void {
  const [item] = list.splice(from, 1);
  list.splice(to, 0, item);
}

function layerCard(store: DesignStore, layer: ShadowLayer, index: number, total: number): HTMLElement {
  const summary = h('code', { class: 'layer-css' }, layerToCss(layer));
  const edit = (mutate: (l: ShadowLayer) => void) => {
    store.update((d) => mutate(d.layers[index]));
    summary.textContent = layerToCss(store.current.layers[index]);
  };
  const structural = (mutate: (layers: ShadowLayer[]) => void) => store.update((d) => mutate(d.layers), 'structure');

  const inset = h('input', { type: 'checkbox', checked: layer.inset });
  inset.addEventListener('change', () => edit((l) => (l.inset = inset.checked)));

  return h(
    'section',
    { class: 'layer' },
    h(
      'header',
      {},
      h('strong', {}, `Layer ${index + 1}`),
      h('label', { class: 'inset' }, inset, ' inset'),
      h(
        'span',
        { class: 'layer-actions' },
        button('↑', () => structural((ls) => move(ls, index, index - 1)), { title: 'Move up', ...(index === 0 ? { disabled: '' } : {}) }),
        button('↓', () => structural((ls) => move(ls, index, index + 1)), { title: 'Move down', ...(index === total - 1 ? { disabled: '' } : {}) }),
        button('Dup', () => structural((ls) => ls.splice(index + 1, 0, { ...ls[index] })), { title: 'Duplicate', ...(total >= MAX_LAYERS ? { disabled: '' } : {}) }),
        button('✕', () => structural((ls) => ls.splice(index, 1)), { title: 'Remove' }),
      ),
    ),
    ...LAYER_FIELDS.map((f) =>
      rangeControl({ ...f, value: layer[f.key], unit: 'px', onInput: (v) => edit((l) => (l[f.key] = v)) }),
    ),
    colorControl('Color', layer.color, (hex) => edit((l) => (l.color = hex))),
    rangeControl({
      label: 'Opacity',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      value: Math.round(layer.alpha * 100),
      onInput: (v) => edit((l) => (l.alpha = Math.min(1, Math.max(0, v / 100)))),
    }),
    summary,
  );
}

/** Rebuilds the layer list on structural changes; value edits update in place. */
export function mountLayerEditor(root: HTMLElement, store: DesignStore): void {
  const render = () => {
    const { layers } = store.current;
    root.replaceChildren(
      ...layers.map((l, i) => layerCard(store, l, i, layers.length)),
      button(
        '+ Add layer',
        () => store.update((d) => d.layers.push(defaultLayer()), 'structure'),
        { class: 'add-layer', ...(layers.length >= MAX_LAYERS ? { disabled: '' } : {}) },
      ),
    );
  };
  store.subscribe((_, kind) => kind === 'structure' && render());
  render();
}
