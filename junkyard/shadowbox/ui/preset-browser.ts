import { h } from '@lib/dom';
import { copyText } from '@lib/clipboard';
import { tokenize } from '@lib/tokenize';
import type { Preset, PresetCollection } from '../presets';
import { DEFAULT_STAGE } from '../shadow/model';
import { button } from './controls';

interface BrowserOptions {
  collections: () => PresetCollection[];
  onPick: (preset: Preset) => void;
  onDelete: (preset: Preset) => void;
}

const ALL = 'all';

function matches(preset: Preset, collection: PresetCollection, query: string[]): boolean {
  const hay = tokenize(`${preset.name} ${collection.name} ${preset.css}`);
  return query.every((q) => hay.some((t) => t.startsWith(q)));
}

function card(preset: Preset, collection: PresetCollection, opts: BrowserOptions): HTMLElement {
  const stage = { ...DEFAULT_STAGE, ...preset.stage };
  const swatch = h('div', { class: 'swatch' }, h('div', { class: 'swatch-box' }));
  swatch.style.background = stage.background;
  const box = swatch.firstElementChild as HTMLElement;
  box.style.background = stage.surface;
  box.style.borderRadius = `${Math.min(stage.radius, 24)}px`;
  box.style.boxShadow = preset.css;

  const copy = button('Copy CSS', () => void copyText(`box-shadow: ${preset.css};`, copy));
  const use = button('Edit', () => opts.onPick(preset), { class: 'primary' });
  const remove = collection.id === 'mine' ? button('Delete', () => opts.onDelete(preset)) : null;

  return h(
    'li',
    { class: 'preset' },
    swatch,
    h('div', { class: 'preset-name' }, preset.name),
    h('code', { class: 'preset-css', title: preset.css }, preset.css),
    h('div', { class: 'preset-actions' }, use, copy, remove),
  );
}

/** Searchable, filterable grid of every collection, built-in and saved. */
export function mountPresetBrowser(root: HTMLElement, opts: BrowserOptions): { refresh: () => void } {
  const search = h('input', { type: 'search', placeholder: 'Search presets (e.g. material 8, neon, inset)...' });
  const filter = h('select', { 'aria-label': 'Collection' });
  const list = h('div', { class: 'collections' });
  root.replaceChildren(h('div', { class: 'browser-bar' }, search, filter), list);

  const refresh = () => {
    const collections = opts.collections();
    const selected = filter.value || ALL;
    filter.replaceChildren(
      h('option', { value: ALL }, `All collections (${collections.reduce((n, c) => n + c.presets.length, 0)})`),
      ...collections.map((c) => h('option', { value: c.id }, `${c.name} (${c.presets.length})`)),
    );
    filter.value = collections.some((c) => c.id === selected) ? selected : ALL;

    const query = tokenize(search.value);
    const sections = collections
      .filter((c) => filter.value === ALL || c.id === filter.value)
      .map((c) => ({ c, presets: c.presets.filter((p) => matches(p, c, query)) }))
      .filter(({ presets }) => presets.length > 0)
      .map(({ c, presets }) =>
        h(
          'section',
          { class: 'collection' },
          h('h3', {}, c.name, h('small', {}, ` ${presets.length}`)),
          c.note ? h('p', { class: 'note' }, c.note) : null,
          h('ul', { class: 'preset-grid' }, ...presets.map((p) => card(p, c, opts))),
        ),
      );
    list.replaceChildren(...(sections.length ? sections : [h('p', { class: 'note' }, 'No presets match.')]));
  };

  search.addEventListener('input', refresh);
  filter.addEventListener('change', refresh);
  refresh();
  return { refresh };
}
