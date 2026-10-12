import { copyText } from '@lib/clipboard';
import { h } from '@lib/dom';
import { BRIEF, briefText, type BriefAxis } from '../data/brief';
import { lineageTitle, neighbours, NO_FILTERS, related, worldNumber } from '../data/query';
import type { World } from '../data/types';
import { gallery, outsideLinks, type Image } from '../data/media';
import { routeHash } from './route';

interface Links {
  index: string;
  world: (id: string) => string;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** How each brief axis is drawn. Text axes fall back to a paragraph. */
function answer(axis: BriefAxis, w: World): HTMLElement {
  switch (axis.id) {
    case 'palette':
      return h(
        'ul',
        { class: 'swatches' },
        ...w.palette.map((s) =>
          h('li', {}, h('i', { style: `background:${s.hex}` }), h('span', { class: 'sw-name' }, s.name), h('code', {}, s.hex.toUpperCase())),
        ),
      );
    case 'materials':
    case 'shapes':
      return h('ul', { class: 'terms' }, ...(axis.id === 'materials' ? w.materials : w.shapes).map((t) => h('li', {}, cap(t))));
    case 'tagline':
      return h('p', { class: 'tagline' }, w.tagline);
    default:
      return h('p', {}, axis.text(w));
  }
}

/** Hero image with a credit line, and thumbnails that swap into the hero. */
function mountGallery(images: Image[]): HTMLElement {
  const hero = h('img', { class: 'hero-img', alt: '', decoding: 'async' });
  const credit = h('a', { rel: 'noopener', target: '_blank' });
  const thumbs = images.map((img, i) => {
    const b = h('button', { type: 'button', class: 'thumb', 'aria-label': `Show image ${i + 1}` }, h('img', { src: img.thumb, alt: '', loading: 'lazy' }));
    b.addEventListener('click', () => show(i));
    return b;
  });
  function show(i: number) {
    const img = images[i];
    hero.src = img.full;
    hero.alt = img.alt;
    credit.href = img.source;
    credit.textContent = img.credit;
    thumbs.forEach((b, j) => b.setAttribute('aria-current', String(i === j)));
  }
  show(0);
  return h(
    'figure',
    { class: 'gallery' },
    h('div', { class: 'hero' }, hero),
    h('figcaption', {}, h('span', { class: 'credit' }, 'Image: ', credit), images.length > 1 ? h('span', { class: 'thumbs' }, ...thumbs) : null),
  );
}

/** One world as a spec sheet: images, the seven-part brief, then context. */
export function mountDetail(container: HTMLElement, w: World, links: Links): () => void {
  const [prev, next] = neighbours(w);
  const images = gallery(w);
  const figure = mountGallery(images);

  const copy = h('button', { type: 'button', class: 'copy' }, 'Copy brief');
  copy.addEventListener('click', () => copyText(briefText(w), copy));

  const kin = related(w);
  const lineageLink = (id: World['lineages'][number]) =>
    h('a', { href: routeHash({ filters: { ...NO_FILTERS, lineage: id } }) || '#' }, lineageTitle(id));

  container.replaceChildren(
    h(
      'nav',
      { class: 'detail-nav' },
      h('a', { href: links.index }, '← All worlds'),
      h('span', { class: 'pager' }, h('a', { href: links.world(prev.id), rel: 'prev' }, '← ', prev.title), h('a', { href: links.world(next.id), rel: 'next' }, next.title, ' →')),
    ),
    h(
      'header',
      { class: 'detail-head' },
      h('p', { class: 'num' }, `${worldNumber(w)} · ${w.year}`),
      h('h1', { id: 'detail-title' }, w.title),
      h('p', { class: 'makers' }, w.makers),
      h('p', { class: 'lineages' }, ...w.lineages.flatMap((id, i) => [i ? ' · ' : '', lineageLink(id)])),
    ),
    figure,
    h(
      'section',
      { class: 'brief', 'aria-label': 'Design brief' },
      h('header', { class: 'brief-head' }, h('h2', {}, 'The brief'), copy),
      h('dl', {}, ...BRIEF.map((a, i) => h('div', { class: `row row-${a.id}` }, h('dt', {}, h('span', { class: 'n' }, String(i + 1)), a.label), h('dd', {}, answer(a, w))))),
    ),
    h(
      'section',
      { class: 'context' },
      h('div', { class: 'why' }, h('h2', {}, 'Why it works'), h('p', {}, w.description)),
      h(
        'div',
        { class: 'lines' },
        h('h3', {}, 'Draws from'),
        h('ul', {}, ...w.influences.map((s) => h('li', {}, s))),
        w.influenced.length ? h('h3', {}, 'Shaped') : null,
        w.influenced.length ? h('ul', {}, ...w.influenced.map((s) => h('li', {}, s))) : null,
        kin.length ? h('h3', {}, 'On this page') : null,
        kin.length ? h('ul', {}, ...kin.map((o) => h('li', {}, h('a', { href: links.world(o.id) }, o.title)))) : null,
        h('h3', {}, 'See more'),
        h('ul', {}, ...[...outsideLinks(w), ...w.refs].map((r) => h('li', {}, h('a', { href: r.url, rel: 'noopener', target: '_blank' }, r.label)))),
      ),
    ),
  );
  return () => container.replaceChildren();
}
