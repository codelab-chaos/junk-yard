import '@styles/base.css';
import './catalog.css';
import { CATALOG_FILE, SEARCH_INDEX_FILE, type Catalog, type CatalogEntry, type SearchIndex } from '@lib/catalog-types';
import { searchApps } from '@lib/search';
import { TAG_PARAM, matchesTags, parseTags, serializeTags, tagFacets, toggleTag } from '@lib/tag-filter';
import { byId, h } from '@lib/dom';

const base = import.meta.env.BASE_URL;
const search = byId<HTMLInputElement>('search');
const tagRow = byId<HTMLDivElement>('tags');
const list = byId<HTMLUListElement>('apps');
const count = byId<HTMLParagraphElement>('count');

const params = new URLSearchParams(window.location.search);
const state = { query: params.get('q') ?? '', tags: parseTags(params.get(TAG_PARAM)) };

async function loadJson<T>(file: string): Promise<T> {
  const res = await fetch(`${base}${file}`);
  if (!res.ok) throw new Error(`${file}: ${res.status}`);
  return (await res.json()) as T;
}

function tagButton(tag: string, label: string, disabled = false): HTMLButtonElement {
  const chip = h(
    'button',
    { class: 'chip', type: 'button', 'aria-pressed': String(state.tags.includes(tag)), disabled },
    label,
  );
  chip.addEventListener('click', () => {
    state.tags = toggleTag(state.tags, tag);
    update();
  });
  return chip;
}

function appCard(app: CatalogEntry): HTMLLIElement {
  return h(
    'li',
    { class: 'app-card' },
    h('h2', {}, h('a', { href: `${base}${app.path}` }, app.title)),
    h('p', {}, app.description),
    h(
      'div',
      { class: 'meta' },
      ...app.tags.map((t) => tagButton(t, t)),
      h('time', { datetime: app.updated ?? app.created }, app.updated ?? app.created),
    ),
  );
}

function clearButton(): HTMLButtonElement | null {
  if (state.tags.length === 0) return null;
  const btn = h('button', { class: 'chip clear', type: 'button' }, 'Clear tags');
  btn.addEventListener('click', () => {
    state.tags = [];
    update();
  });
  return btn;
}

function syncUrl(): void {
  const next = new URLSearchParams();
  if (state.query) next.set('q', state.query);
  if (state.tags.length > 0) next.set(TAG_PARAM, serializeTags(state.tags));
  const qs = next.toString();
  history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
}

function render(catalog: Catalog, index: SearchIndex): void {
  const matches = searchApps(catalog.apps, index, state.query).filter((a) => matchesTags(a, state.tags));

  tagRow.replaceChildren(
    ...tagFacets(catalog.apps, matches, state.tags).map((f) =>
      tagButton(f.tag, `${f.tag} ${f.count}`, f.count === 0 && !f.selected),
    ),
    clearButton() ?? '',
  );
  list.replaceChildren(...matches.map(appCard));
  count.textContent = `${matches.length} of ${catalog.apps.length} apps`;
}

let update = () => {};

async function start(): Promise<void> {
  const [catalog, index] = await Promise.all([loadJson<Catalog>(CATALOG_FILE), loadJson<SearchIndex>(SEARCH_INDEX_FILE)]);
  update = () => {
    syncUrl();
    render(catalog, index);
  };
  search.value = state.query;
  search.addEventListener('input', () => {
    state.query = search.value;
    update();
  });
  update();
}

start().catch((err: unknown) => {
  count.textContent = `Could not load the catalog: ${String(err)}`;
});
