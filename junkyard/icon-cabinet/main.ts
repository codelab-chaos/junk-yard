import './styles.css';
import { getSvg, svgUrl } from './artwork';
import { copyText } from '../../src/lib/clipboard';
import { searchIcons, type Icon, type Library } from './search';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const query = $<HTMLInputElement>('query');
const library = $<HTMLSelectElement>('library');
const grid = $('results');
const notice = $('notice');
const inspector = document.querySelector<HTMLElement>('.inspector')!;
const source = $<HTMLTextAreaElement>('source');
const color = $<HTMLInputElement>('color');
const size = $<HTMLSelectElement>('size');
const pageSize = 72;
const storageKey = 'junkyard:icon-cabinet:saved';
let saved = new Set<string>();
try {
  const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
  if (Array.isArray(value)) saved = new Set(value.filter((id): id is string => typeof id === 'string'));
} catch { /* Saved icons are optional when storage is unavailable. */ }
let icons: Icon[] = [];
let matches: Icon[] = [];
let page = 0;
let savedOnly = false;
let selected: Icon | undefined;
let rawSvg = '';
let licenseText = '';
const licenses = new Map<string, string>();
let request: AbortController | undefined;
let previousFocus: HTMLElement | null = null;
const svgCache = new Map<string, string>();
const initial = new URLSearchParams(location.hash.slice(1));
query.value = initial.get('q') ?? '';
savedOnly = initial.get('saved') === '1';

function savedCount() {
  $('saved-count').textContent = String(saved.size);
  $('saved').setAttribute('aria-pressed', String(savedOnly));
  $('favorite').setAttribute('aria-pressed', String(!!selected && saved.has(selected.id)));
  $('favorite').textContent = selected && saved.has(selected.id) ? 'Unsave icon' : 'Save icon';
}
function message(text: string, retry?: () => void) {
  notice.textContent = text;
  notice.hidden = false;
  if (retry) {
    const button = document.createElement('button');
    button.textContent = 'Try again';
    button.onclick = retry;
    notice.append(button);
  }
}
function updateHash() {
  const params = new URLSearchParams();
  if (query.value.trim()) params.set('q', query.value.trim());
  if (library.value) params.set('library', library.value);
  if (savedOnly) params.set('saved', '1');
  history.replaceState(null, '', `${location.pathname}${location.search}${params.size ? `#${params}` : ''}`);
}
function filter() {
  page = 0;
  matches = searchIcons(icons, query.value, library.value, savedOnly ? saved : undefined);
  updateHash();
  render();
}
function render() {
  grid.replaceChildren();
  grid.setAttribute('aria-busy', 'false');
  notice.hidden = true;
  $('results-title').textContent = savedOnly ? 'Your saved icons' : query.value.trim() ? 'Search results' : 'The collection';
  $('summary').textContent = `${matches.length.toLocaleString()} icons${library.value ? '' : ' / 12 libraries'}`;
  if (!matches.length) message(savedOnly ? 'No saved icons match. Save an icon from the collection, or clear your filters.' : 'No icons found. Try a shorter word or choose All libraries.');
  for (const icon of matches.slice(page * pageSize, (page + 1) * pageSize)) {
    const tile = document.createElement('button');
    tile.className = 'icon-tile';
    tile.dataset.id = icon.id;
    tile.title = `${icon.name} · ${icon.library.name}`;
    tile.setAttribute('aria-label', `${icon.name}, ${icon.library.name}`);
    tile.setAttribute('aria-pressed', String(selected?.id === icon.id));
    const glyph = document.createElement('span');
    glyph.className = 'glyph';
    glyph.setAttribute('aria-hidden', 'true');
    void getSvg(icon).then(svg => { glyph.style.setProperty('--icon', `url("${svgUrl(svg)}")`); }).catch(() => {
      glyph.classList.add('unavailable'); glyph.textContent = '×'; tile.title += ' — artwork unavailable; select to retry';
    });
    const name = document.createElement('span');
    name.className = 'icon-name';
    name.textContent = icon.name;
    const family = document.createElement('span');
    family.className = 'icon-family';
    family.textContent = icon.library.name;
    tile.append(glyph, name, family);
    if (saved.has(icon.id)) {
      const mark = document.createElement('span');
      mark.className = 'saved-mark'; mark.textContent = '•'; mark.setAttribute('aria-label', 'Saved');
      tile.append(mark);
    }
    tile.onclick = () => { previousFocus = tile; void selectIcon(icon); };
    grid.append(tile);
  }
  $('page-label').textContent = `Page ${page + 1} of ${Math.max(1, Math.ceil(matches.length / pageSize))}`;
  $<HTMLButtonElement>('previous').disabled = page === 0;
  $<HTMLButtonElement>('next').disabled = (page + 1) * pageSize >= matches.length;
  savedCount();
}
function setExportEnabled(enabled: boolean) {
  $<HTMLButtonElement>('copy').disabled = !enabled;
  $<HTMLButtonElement>('download').disabled = !enabled;
}
function exportedSvg(): string {
  if (!rawSvg || !selected) return '';
  const document = new DOMParser().parseFromString(rawSvg, 'image/svg+xml');
  const svg = document.documentElement;
  if (svg.localName !== 'svg' || document.querySelector('parsererror')) throw new Error('Invalid SVG');
  svg.setAttribute('width', size.value);
  svg.setAttribute('height', size.value);
  svg.setAttribute('color', color.value);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', selected.name);
  const credit = `${selected.library.name} — ${selected.library.author.name}; ${selected.library.license.title}; ${selected.library.license.url ?? selected.library.author.url ?? ''}`.replaceAll('--', '—');
  return `<!-- ${credit}\n${licenseText.replaceAll('--', '—')} -->\n${new XMLSerializer().serializeToString(svg)}`;
}
function refreshExport() {
  source.value = exportedSvg();
  const image = $('preview').querySelector('img');
  if (image && source.value) image.src = svgUrl(source.value);
}
function addLink(parent: HTMLElement, text: string, url?: string) {
  if (url?.startsWith('https://')) {
    const link = document.createElement('a'); link.textContent = text; link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; parent.append(link);
  } else parent.append(text);
}
async function selectIcon(icon: Icon) {
  request?.abort();
  request = new AbortController();
  const currentRequest = request;
  selected = icon; rawSvg = ''; licenseText = ''; source.value = '';
  setExportEnabled(false);
  $<HTMLButtonElement>('favorite').disabled = false;
  inspector.classList.add('open');
  if (matchMedia('(max-width:700px)').matches) $('close-detail').focus();
  $('detail-library').textContent = icon.library.name;
  $('detail-title').textContent = icon.name;
  $('detail-id').textContent = icon.id;
  $('detail-status').textContent = 'Loading SVG…';
  const preview = document.createElement('img');
  preview.alt = icon.name;
  $('preview').replaceChildren(preview);
  const license = $('license'); license.replaceChildren();
  addLink(license, icon.library.author.name, icon.library.author.url);
  license.append(' · ');
  addLink(license, icon.library.license.title, icon.library.license.url ?? (icon.library.license.spdx ? `https://spdx.org/licenses/${icon.library.license.spdx}.html` : undefined));
  license.append('. Check the license for attribution and redistribution requirements.');
  for (const tile of grid.querySelectorAll('button')) tile.setAttribute('aria-pressed', String(tile.dataset.id === icon.id));
  savedCount();
  try {
    let svg = svgCache.get(icon.id);
    if (!svg) {
      svg = await getSvg(icon);
      svgCache.set(icon.id, svg);
    }
    let license = licenses.get(icon.library.prefix);
    if (!license) {
      const response = await fetch(`${import.meta.env.BASE_URL}assets/icon-cabinet/${icon.library.prefix}-license.txt`);
      if (!response.ok) throw new Error('License unavailable');
      license = await response.text();
      licenses.set(icon.library.prefix, license);
    }
    if (currentRequest.signal.aborted) return;
    licenseText = license;
    rawSvg = svg;
    refreshExport();
    setExportEnabled(true);
    $('detail-status').textContent = 'Ready to use. Color and size apply to your SVG.';
  } catch {
    if (currentRequest.signal.aborted) return;
    $('preview').textContent = 'Preview unavailable';
    $('detail-status').textContent = 'Could not load the SVG. Check your connection and ';
    const retry = document.createElement('button'); retry.textContent = 'Retry'; retry.onclick = () => void selectIcon(icon); $('detail-status').append(retry);
  }
}
function closeDetail() { inspector.classList.remove('open'); if (previousFocus?.isConnected) previousFocus.focus(); else query.focus(); }
$('close-detail').onclick = closeDetail;
query.addEventListener('input', filter);
library.addEventListener('change', filter);
$('saved').onclick = () => { savedOnly = !savedOnly; filter(); };
$('reset').onclick = () => { query.value = ''; library.value = ''; savedOnly = false; filter(); };
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-query]')) button.onclick = () => { query.value = button.dataset.query!; filter(); };
for (const [id, delta] of [['previous', -1], ['next', 1]] as const) $(id).onclick = () => {
  page += delta; render(); grid.scrollIntoView({ block: 'start' }); grid.querySelector('button')?.focus();
};
$('favorite').onclick = () => {
  if (!selected) return;
  if (saved.has(selected.id)) saved.delete(selected.id); else saved.add(selected.id);
  try { localStorage.setItem(storageKey, JSON.stringify([...saved])); }
  catch { $('detail-status').textContent = 'Saved for this visit. Your browser could not store it for next time.'; }
  if (savedOnly) filter(); else render();
};
color.addEventListener('input', refreshExport);
size.addEventListener('change', refreshExport);
$('copy').onclick = async () => {
  const success = await copyText(source.value);
  $('detail-status').textContent = success ? 'SVG copied to clipboard.' : 'Clipboard unavailable. Select and copy the SVG source below.';
  if (!success) { document.querySelector('details')!.open = true; source.focus(); source.select(); }
};
$('download').onclick = () => {
  if (!selected || !source.value) return;
  const url = URL.createObjectURL(new Blob([source.value], { type: 'image/svg+xml' }));
  const link = document.createElement('a'); link.href = url; link.download = `${selected.library.prefix}-${selected.name}.svg`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('detail-status').textContent = 'SVG download started.';
};
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && inspector.classList.contains('open')) closeDetail();
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement)) { event.preventDefault(); query.focus(); }
  if (event.key === 'Tab' && inspector.classList.contains('open') && matchMedia('(max-width:700px)').matches) {
    const controls = [...inspector.querySelectorAll<HTMLElement>('button:not(:disabled),select,input,summary,a[href],textarea')].filter(element => element.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
});
async function load() {
  notice.hidden = true; grid.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}assets/icon-cabinet/index.json`);
    if (!response.ok) throw new Error('Index unavailable');
    const data = await response.json() as { updated: string; libraries: Library[] };
    // Interleave families so the unfiltered page offers a useful cross-library comparison.
    icons = [];
    const count = Math.max(...data.libraries.map(item => item.icons.length));
    for (let i = 0; i < count; i++) for (const item of data.libraries) {
      const name = item.icons[i]; if (name) icons.push({ id: `${item.prefix}:${name}`, name, library: item });
    }
    library.replaceChildren(new Option('All libraries', ''));
    for (const item of data.libraries) library.add(new Option(`${item.name} (${item.total.toLocaleString()})`, item.prefix));
    library.value = data.libraries.some(item => item.prefix === initial.get('library')) ? initial.get('library')! : '';
    $('inventory').textContent = `${icons.length.toLocaleString()} icons · ${data.libraries.length} libraries · Indexed ${data.updated}`;
    filter();
  } catch {
    grid.setAttribute('aria-busy', 'false'); $('summary').textContent = 'Collection unavailable';
    message('Could not open the search index. Check your connection.', () => void load());
  }
}
savedCount();
void load();
