import { h } from '@lib/dom';
import { CATEGORIES } from '../data/categories';
import { entryNumber, formatNumber, matches, type Filters } from '../data/query';
import { STYLES } from '../data/styles';
import { KIND_LABEL, type StyleEntry } from '../data/types';
import { lazyThumbs } from './lazy-thumbs';

interface IndexView {
  /** Show only matching entries; returns how many are visible. */
  apply(filters: Filters): number;
  /** The thumbnail frame for an entry (used to morph into the detail view). */
  frameFor(id: string): HTMLElement | undefined;
}

function entryRow(s: StyleEntry, href: (id: string) => string): { row: HTMLElement; frame: HTMLElement } {
  const frame = h('div', { class: 'thumb', 'aria-hidden': 'true', inert: true }, h('div', { class: 'thumb-host', 'data-example': s.example }));
  const row = h(
    'a',
    { class: `entry kind-${s.kind}`, href: href(s.id), 'data-id': s.id },
    h('span', { class: 'entry-no' }, formatNumber(entryNumber(s))),
    h(
      'span',
      { class: 'entry-text' },
      h('span', { class: 'entry-name' }, s.name),
      h('span', { class: 'entry-summary' }, s.summary),
      h('span', { class: 'entry-meta' }, h('span', { class: 'season-mark' }, KIND_LABEL[s.kind]), ` · ${s.firstSeen}`),
    ),
    frame,
  );
  return { row, frame };
}

/**
 * The table of contents: chapters in almanac order, each a list of
 * numbered entries with a live thumbnail. Built once; filtering only
 * toggles visibility so mounted thumbnails survive.
 */
export function mountIndex(container: HTMLElement, href: (id: string) => string): IndexView {
  const rows = new Map<string, HTMLElement>();
  const frames = new Map<string, HTMLElement>();
  const chapters: { el: HTMLElement; ids: string[] }[] = [];

  for (const c of CATEGORIES) {
    const entries = STYLES.filter((s) => s.category === c.id);
    const list = h('div', { class: 'entries' });
    for (const s of entries) {
      const { row, frame } = entryRow(s, href);
      rows.set(s.id, row);
      frames.set(s.id, frame);
      list.append(row);
    }
    const el = h(
      'section',
      { class: 'chapter-block', id: `chapter-${c.id}`, 'aria-labelledby': `h-${c.id}` },
      h(
        'header',
        { class: 'chapter-head' },
        h('span', { class: 'chapter-numeral' }, c.numeral),
        h('h2', { id: `h-${c.id}` }, c.title),
        h('p', {}, c.blurb),
      ),
      list,
    );
    chapters.push({ el, ids: entries.map((s) => s.id) });
    container.append(el);
  }

  const empty = h('p', { class: 'empty', hidden: true }, 'Nothing in the almanac matches. Try a broader word, or clear the filters.');
  container.append(empty);
  lazyThumbs([...frames.values()]);

  return {
    apply(filters) {
      let shown = 0;
      for (const s of STYLES) {
        const ok = matches(s, filters);
        rows.get(s.id)!.hidden = !ok;
        if (ok) shown++;
      }
      for (const ch of chapters) ch.el.hidden = ch.ids.every((id) => rows.get(id)!.hidden);
      empty.hidden = shown > 0;
      return shown;
    },
    frameFor: (id) => frames.get(id),
  };
}
