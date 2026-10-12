import { h } from '@lib/dom';
import { chapters, matches, NO_FILTERS, worldNumber, type Filters } from '../data/query';
import type { World } from '../data/types';
import { gallery } from '../data/media';

interface IndexUi {
  /** Show only matching worlds; returns how many are visible. */
  apply(filters: Filters): number;
  frameFor(id: string): HTMLElement | undefined;
}

function swatchStrip(w: World): HTMLElement {
  return h('span', { class: 'strip', 'aria-hidden': 'true' }, ...w.palette.map((s) => h('i', { style: `background:${s.hex}` })));
}

function entry(w: World, href: (id: string) => string): HTMLElement {
  const lead = gallery(w)[0];
  const frame = h('span', { class: 'entry-img' }, h('img', { src: lead.thumb, alt: '', loading: 'lazy', decoding: 'async' }));
  return h(
    'a',
    { class: 'entry', href: href(w.id), 'data-id': w.id },
    frame,
    swatchStrip(w),
    h('span', { class: 'entry-meta' }, h('span', { class: 'num' }, worldNumber(w)), h('span', { class: 'year' }, w.year)),
    h('span', { class: 'entry-title' }, w.title),
    h('span', { class: 'entry-tag' }, w.tagline),
  );
}

/** The index: every world, grouped into chapters by primary lineage. Built once, then filtered by hiding. */
export function mountIndex(container: HTMLElement, href: (id: string) => string): IndexUi {
  const entries = new Map<string, { el: HTMLElement; world: World }>();
  const sections = chapters(NO_FILTERS).map(({ lineage, worlds }) => {
    const items = worlds.map((w) => {
      const el = entry(w, href);
      entries.set(w.id, { el, world: w });
      return el;
    });
    return h(
      'section',
      { class: 'chapter', 'aria-labelledby': `ch-${lineage.id}` },
      h('header', { class: 'chapter-head' }, h('h2', { id: `ch-${lineage.id}` }, lineage.title), h('p', {}, lineage.blurb)),
      h('div', { class: 'grid' }, ...items),
    );
  });
  const empty = h('p', { class: 'empty', hidden: true }, 'No worlds match. Try a shorter search or another lineage.');
  container.append(...sections, empty);

  return {
    apply(f) {
      let shown = 0;
      for (const { el, world } of entries.values()) {
        el.hidden = !matches(world, f);
        if (!el.hidden) shown++;
      }
      for (const s of sections) s.hidden = !s.querySelector('.entry:not([hidden])');
      empty.hidden = shown > 0;
      return shown;
    },
    frameFor: (id) => entries.get(id)?.el.querySelector<HTMLElement>('.entry-img') ?? undefined,
  };
}
