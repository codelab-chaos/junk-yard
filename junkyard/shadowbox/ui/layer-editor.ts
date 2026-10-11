import { h } from '@lib/dom';
import { LAYER_FIELDS, MAX_LAYERS, defaultLayer, type ShadowLayer } from '../shadow/model';
import { layerToCss } from '../shadow/format';
import type { DesignStore } from './store';
import { colorControl, iconButton, rangeControl, segmented } from './controls';
import { icon } from './icons';

function move<T>(list: T[], from: number, to: number): void {
  const [item] = list.splice(from, 1);
  list.splice(to, 0, item);
}

const THUMB_SCALE = 0.35;

const summary = (l: ShadowLayer) => `${l.inset ? 'inset ' : ''}${l.x} ${l.y} ${l.blur} ${l.spread}`;

interface RowContext {
  store: DesignStore;
  index: number;
  total: number;
  open: boolean;
  toggle: () => void;
}

/** A layer as a compact row; the open row reveals its controls. */
function layerRow(layer: ShadowLayer, ctx: RowContext): HTMLElement {
  const { store, index, total } = ctx;
  const thumb = h('span', { class: 'layer-thumb' }, h('span', {}));
  const values = h('code', { class: 'layer-values' }, summary(layer));
  const dot = h('span', { class: 'layer-dot' });

  // The thumb shows this layer alone, shrunk to fit and darkened enough to read at 34px.
  const paint = (l: ShadowLayer) => {
    const k = THUMB_SCALE;
    (thumb.firstElementChild as HTMLElement).style.boxShadow = layerToCss({ ...l, x: l.x * k, y: l.y * k, blur: l.blur * k, spread: l.spread * k, alpha: Math.max(l.alpha, 0.45) });
    dot.style.background = l.color;
    values.textContent = summary(l);
  };
  paint(layer);

  const edit = (mutate: (l: ShadowLayer) => void) => {
    store.update((d) => mutate(d.layers[index]));
    paint(store.current.layers[index]);
  };
  const structural = (mutate: (layers: ShadowLayer[]) => void) => store.update((d) => mutate(d.layers), 'structure');

  const head = h(
    'div',
    { class: 'layer-head', role: 'button', tabindex: 0, 'aria-expanded': String(ctx.open) },
    thumb,
    h('span', { class: 'layer-title' }, h('strong', {}, `Layer ${index + 1}`), values),
    dot,
    h(
      'span',
      { class: 'layer-actions' },
      iconButton('up', 'Move up', () => structural((ls) => move(ls, index, index - 1)), index === 0),
      iconButton('down', 'Move down', () => structural((ls) => move(ls, index, index + 1)), index === total - 1),
      iconButton('duplicate', 'Duplicate', () => structural((ls) => ls.splice(index + 1, 0, { ...ls[index] })), total >= MAX_LAYERS),
      iconButton('trash', 'Remove', () => structural((ls) => ls.splice(index, 1))),
    ),
    h('span', { class: 'layer-chevron' }, icon('chevron')),
  );
  head.addEventListener('click', ctx.toggle);
  head.addEventListener('keydown', (e) => {
    if (e.target === head && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      ctx.toggle();
    }
  });

  const body = ctx.open
    ? h(
        'div',
        { class: 'layer-body' },
        segmented(
          'Type',
          [
            { value: 'drop', label: 'Drop' },
            { value: 'inset', label: 'Inset' },
          ],
          layer.inset ? 'inset' : 'drop',
          (v) => edit((l) => (l.inset = v === 'inset')),
        ),
        ...LAYER_FIELDS.map((f) => rangeControl({ ...f, value: layer[f.key], unit: 'px', onInput: (v) => edit((l) => (l[f.key] = v)) })),
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
      )
    : null;

  return h('li', { class: `layer${ctx.open ? ' is-open' : ''}` }, head, body);
}

/** Rebuilds the layer list on structural changes; value edits update in place. */
export function mountLayerEditor(root: HTMLElement, store: DesignStore): void {
  let openIndex = 0;

  const render = () => {
    const { layers } = store.current;
    openIndex = Math.min(openIndex, layers.length - 1);
    const add = h('button', { type: 'button', class: 'add-layer', disabled: layers.length >= MAX_LAYERS }, icon('plus'), 'Add layer');
    add.addEventListener('click', () => {
      openIndex = layers.length;
      store.update((d) => d.layers.push(defaultLayer()), 'structure');
    });
    root.replaceChildren(
      h(
        'ol',
        { class: 'layer-list' },
        ...layers.map((l, i) =>
          layerRow(l, {
            store,
            index: i,
            total: layers.length,
            open: i === openIndex,
            toggle: () => {
              openIndex = openIndex === i ? -1 : i;
              render();
            },
          }),
        ),
      ),
      add,
    );
  };
  store.subscribe((_, kind) => kind === 'structure' && render());
  render();
}
