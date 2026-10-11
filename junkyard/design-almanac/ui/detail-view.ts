import { h } from '@lib/dom';
import { CATEGORIES } from '../data/categories';
import { entryNumber, formatNumber, neighbours } from '../data/query';
import { KIND_LABEL, type StyleEntry } from '../data/types';
import { EXAMPLES } from '../examples';
import { fitPlate } from './plate-fit';
import { mountExample } from './stage';

interface Links {
  index: string;
  style: (id: string) => string;
}

const note = (title: string, ...body: (Node | string)[]) => h('section', { class: 'note' }, h('h3', {}, title), ...body);

/**
 * One entry at full size: the live, interactive example as a plate, then
 * the field notes. Returns an unmount function that stops the example.
 */
export function mountDetail(container: HTMLElement, s: StyleEntry, links: Links): () => void {
  const { prev, next } = neighbours(s);
  const chapter = CATEGORIES.find((c) => c.id === s.category)!;
  const no = formatNumber(entryNumber(s));
  const host = h('div', { class: 'plate-host' });
  const frame = h('div', { class: 'plate-frame' }, host);

  const navLink = (target: StyleEntry, rel: 'prev' | 'next') =>
    h(
      'a',
      { class: `step step-${rel}`, href: links.style(target.id), rel, 'aria-label': `${rel === 'prev' ? 'Previous' : 'Next'}: ${target.name}` },
      h('small', {}, rel === 'prev' ? '← Previous' : 'Next →'),
      h('span', {}, `${formatNumber(entryNumber(target))} ${target.name}`),
    );

  container.replaceChildren(
    h('nav', { class: 'detail-nav', 'aria-label': 'Entry' }, h('a', { class: 'to-index', href: links.index }, '↑ Contents'), navLink(prev, 'prev'), navLink(next, 'next')),
    h(
      'header',
      { class: `detail-head kind-${s.kind}` },
      h('span', { class: 'detail-no', 'aria-hidden': 'true' }, no),
      h(
        'div',
        {},
        h(
          'p',
          { class: 'detail-kicker' },
          h('span', {}, `Chapter ${chapter.numeral}, ${chapter.title}`),
          h('span', { class: 'season-mark' }, KIND_LABEL[s.kind]),
          h('span', {}, `First seen ${s.firstSeen}`),
        ),
        h('h1', { id: 'detail-title' }, h('span', { class: 'sr-only' }, `No. ${no}. `), s.name),
      ),
    ),
    h('figure', { class: 'plate' }, frame, h('figcaption', {}, h('b', {}, `Plate ${no}.`), ' Live example: real HTML and CSS, not a picture. Hover, click and scroll it.')),
    h(
      'div',
      { class: 'notes' },
      h('p', { class: 'lede' }, s.summary),
      note('When to use', h('p', {}, s.whenToUse)),
      note('Pitfalls', h('p', {}, s.pitfalls)),
      note('Key techniques', h('ul', { class: 'techniques' }, ...s.techniques.map((t) => h('li', {}, h('code', {}, t))))),
      note('Filed under', h('p', { class: 'tags' }, s.tags.join(', '))),
    ),
  );

  const stopFit = fitPlate(frame, host);
  const example = EXAMPLES.get(s.example);
  const unmount = example ? mountExample(host, example, true) : () => {};
  return () => {
    stopFit();
    unmount();
  };
}
