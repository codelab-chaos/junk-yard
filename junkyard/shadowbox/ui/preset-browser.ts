import { h } from '@lib/dom';
import { copyText } from '@lib/clipboard';
import { tokenize } from '@lib/tokenize';
import type { Preset, PresetCollection } from '../presets';
import { DEFAULT_STAGE } from '../shadow/model';
import { iconButton } from './controls';
import { icon } from './icons';

interface BrowserOptions {
  collections: () => PresetCollection[];
  onPick: (preset: Preset) => void;
  onPeek: (preset: Preset | undefined) => void;
  onDelete: (preset: Preset) => void;
}

const ALL = 'all';
const pad = (n: number) => String(n).padStart(2, '0');

function matches(preset: Preset, collection: PresetCollection, query: string[]): boolean {
  const hay = tokenize(`${preset.name} ${collection.name} ${preset.css}`);
  return query.every((q) => hay.some((t) => t.startsWith(q)));
}

/** One cell of the specimen drawer. The whole cell loads the preset; hover or focus previews it. */
function specimen(preset: Preset, collection: PresetCollection, opts: BrowserOptions): HTMLElement {
  const stage = { ...DEFAULT_STAGE, ...preset.stage };
  const box = h('span', { class: 'specimen-box' });
  box.style.background = stage.surface;
  box.style.borderRadius = `${Math.min(stage.radius, 18)}px`;
  box.style.boxShadow = preset.css;

  const pick = h('button', { type: 'button', class: 'specimen-pick', title: `Edit ${preset.name}` }, box, h('span', { class: 'specimen-name' }, preset.name));
  pick.style.setProperty('--specimen-bg', stage.background);
  pick.addEventListener('click', () => opts.onPick(preset));

  const copy = iconButton('copy', `Copy ${preset.name} CSS`, () =>
    void copyText(`box-shadow: ${preset.css};`).then((ok) => {
      copy.classList.toggle('is-done', ok);
      window.setTimeout(() => copy.classList.remove('is-done'), 1200);
    }),
  );
  const remove = collection.id === 'mine' ? iconButton('trash', `Delete ${preset.name}`, () => opts.onDelete(preset)) : null;

  const cell = h('li', { class: 'specimen' }, pick, h('span', { class: 'specimen-tools' }, copy, remove));
  cell.addEventListener('pointerenter', () => opts.onPeek(preset));
  cell.addEventListener('pointerleave', () => opts.onPeek(undefined));
  pick.addEventListener('focus', () => opts.onPeek(preset));
  pick.addEventListener('blur', () => opts.onPeek(undefined));
  return cell;
}

/** Searchable specimen drawer of every collection, built-in and saved. */
export function mountPresetBrowser(root: HTMLElement, opts: BrowserOptions): { refresh: () => void; focusSearch: () => void } {
  let selected = ALL;
  const search = h('input', { type: 'search', placeholder: 'Search 160 shadows: material 8, neon, inset...', 'aria-label': 'Search presets' });
  const index = h('nav', { class: 'collection-index', 'aria-label': 'Collections' });
  const list = h('div', { class: 'collections' });
  root.replaceChildren(h('div', { class: 'browser-bar' }, h('label', { class: 'search-field' }, icon('search'), search), index), list);

  const indexButton = (id: string, label: string, count: number) => {
    const b = h('button', { type: 'button', 'aria-pressed': String(id === selected) }, label, h('sup', {}, String(count)));
    b.addEventListener('click', () => {
      selected = id;
      refresh();
    });
    return b;
  };

  const refresh = () => {
    const collections = opts.collections();
    if (!collections.some((c) => c.id === selected)) selected = ALL;
    search.placeholder = `Search ${collections.reduce((n, c) => n + c.presets.length, 0)} shadows: material 8, neon, inset...`;
    index.replaceChildren(
      indexButton(ALL, 'All', collections.reduce((n, c) => n + c.presets.length, 0)),
      ...collections.map((c) => indexButton(c.id, c.name, c.presets.length)),
    );

    const query = tokenize(search.value);
    const sections = collections
      .map((c, i) => ({ c, n: i + 1, presets: c.presets.filter((p) => matches(p, c, query)) }))
      .filter(({ c, presets }) => (selected === ALL || c.id === selected) && presets.length > 0)
      .map(({ c, n, presets }) =>
        h(
          'section',
          { class: 'collection' },
          h(
            'header',
            { class: 'collection-head' },
            h('span', { class: 'collection-no' }, pad(n)),
            h('h3', {}, c.name),
            h('span', { class: 'collection-count' }, `${presets.length} ${presets.length === 1 ? 'shadow' : 'shadows'}`),
            c.note ? h('p', { class: 'note' }, c.note) : null,
          ),
          h('ul', { class: 'specimens' }, ...presets.map((p) => specimen(p, c, opts))),
        ),
      );
    list.replaceChildren(...(sections.length ? sections : [h('p', { class: 'empty' }, 'Nothing in the collection matches that search.')]));
  };

  search.addEventListener('input', refresh);
  refresh();
  return { refresh, focusSearch: () => search.focus() };
}
