import { h } from '@lib/dom';
import { copyText } from '@lib/clipboard';
import { readJson, writeJson } from '@lib/local-store';
import { OUTPUT_FORMATS } from '../shadow/format';
import { layersToCss } from '../shadow/format';
import type { DesignStore } from './store';
import { button } from './controls';

const FORMAT_KEY = 'junkyard.shadowbox.format';

/** Code panel: pick a target format, copy the snippet. */
export function mountOutput(root: HTMLElement, store: DesignStore): void {
  let formatId = readJson(FORMAT_KEY, OUTPUT_FORMATS[0].id);
  const code = h('pre', { class: 'code' });
  const select = h('select', { 'aria-label': 'Output format' }, ...OUTPUT_FORMATS.map((f) => h('option', { value: f.id }, f.label)));
  select.value = formatId;

  const snippet = () => {
    const format = OUTPUT_FORMATS.find((f) => f.id === formatId) ?? OUTPUT_FORMATS[0];
    return format.render(layersToCss(store.current.layers));
  };
  const render = () => (code.textContent = snippet());

  select.addEventListener('change', () => {
    formatId = select.value;
    writeJson(FORMAT_KEY, formatId);
    render();
  });
  const copy = button('Copy', () => void copyText(snippet(), copy), { class: 'primary' });

  root.replaceChildren(h('div', { class: 'output-bar' }, select, copy), code);
  store.subscribe(render);
  render();
}
