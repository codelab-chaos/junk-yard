import { h } from '@lib/dom';
import { copyText } from '@lib/clipboard';
import { readJson, writeJson } from '@lib/local-store';
import { OUTPUT_FORMATS, layersToCss } from '../shadow/format';
import type { DesignStore } from './store';
import { highlight } from './highlight';
import { icon } from './icons';

const FORMAT_KEY = 'junkyard.shadowbox.format';

/** Code panel: pick a target format from the tabs, copy the snippet. */
export function mountOutput(root: HTMLElement, store: DesignStore): { copy: () => void } {
  let formatId = readJson(FORMAT_KEY, OUTPUT_FORMATS[0].id);
  const code = h('pre', { class: 'code' }, h('code', {}));

  const snippet = () => {
    const format = OUTPUT_FORMATS.find((f) => f.id === formatId) ?? OUTPUT_FORMATS[0];
    return format.render(layersToCss(store.current.layers));
  };
  const render = () => code.firstElementChild!.replaceChildren(...highlight(snippet()));

  const tabs = OUTPUT_FORMATS.map((f) => {
    const tab = h('button', { type: 'button', role: 'tab', 'aria-selected': String(f.id === formatId) }, f.label);
    tab.addEventListener('click', () => {
      formatId = f.id;
      writeJson(FORMAT_KEY, formatId);
      for (const t of tabs) t.setAttribute('aria-selected', String(t === tab));
      render();
    });
    return tab;
  });

  const copyLabel = h('span', {}, 'Copy');
  const copyButton = h('button', { type: 'button', class: 'primary copy-btn', title: 'Copy code (C)' }, icon('copy'), copyLabel);
  const copy = () => void copyText(snippet(), copyLabel);
  copyButton.addEventListener('click', copy);

  root.replaceChildren(
    h('div', { class: 'output-bar' }, h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Output format' }, ...tabs), copyButton),
    code,
  );
  store.subscribe(render);
  render();
  return { copy };
}
