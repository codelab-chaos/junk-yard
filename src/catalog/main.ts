import '@styles/base.css';
import './catalog.css';
import { CATALOG_FILE, SEARCH_INDEX_FILE, type Catalog, type CatalogEntry, type SearchIndex } from '@lib/catalog-types';
import { searchApps } from '@lib/search';
import { byId, h } from '@lib/dom';

const base = import.meta.env.BASE_URL;
const search = byId<HTMLInputElement>('search');
const tagRow = byId<HTMLDivElement>('tags');
const list = byId<HTMLUListElement>('apps');
const count = byId<HTMLParagraphElement>('count');

const params = new URLSearchParams(window.location.search);
const state = { query: params.get('q') ?? '', tag: params.get('tag') ?? '' };

async function loadJson<T>(file: string): Promise<T> {
  const res = await fetch(`${base}${file}`);
  if (!res.ok) throw new Error(`${file}: ${res.status}`);
  return (await res.json()) as T;
}

function tagCounts(apps: CatalogEntry[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const tag of apps.flatMap((a) => a.tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function appCard(app: CatalogEntry): HTMLLIElement {
  return h(
    'li',
    { class: 'app-card' },
    h(
      'a',
      { href: `${base}${app.path}` },
      h('h2', {}, app.title),
      h('p', {}, app.description),
      h(
        'div',
        { class: 'meta' },
        ...app.tags.map((t) => h('span', { class: 'chip' }, t)),
        h('time', { datetime: app.updated ?? app.created }, app.updated ?? app.created),
      ),
    ),
  );
}

function syncUrl(): void {
  const next = new URLSearchParams();
  if (state.query) next.set('q', state.query);
  if (state.tag) next.set('tag', state.tag);
  const qs = next.toString();
  history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
}

function render(catalog: Catalog, index: SearchIndex): void {
  const matches = searchApps(catalog.apps, index, state.query).filter((a) => !state.tag || a.tags.includes(state.tag));

  tagRow.replaceChildren(
    ...tagCounts(catalog.apps).map(([tag, n]) => {
      const chip = h('button', { class: 'chip', type: 'button', 'aria-pressed': String(tag === state.tag) }, `${tag} ${n}`);
      chip.addEventListener('click', () => {
        state.tag = state.tag === tag ? '' : tag;
        update();
      });
      return chip;
    }),
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
