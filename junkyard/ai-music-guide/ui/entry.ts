import { copyText } from '@lib/clipboard';
import { h } from '@lib/dom';
import { findEntry, platformName, SOURCES } from '../data/catalog';
import { isMatch } from '../data/search';
import { levelName, stageName } from '../data/stages';
import type { Entry, Level, Reliability } from '../data/types';

export interface EntryHandlers {
  toggle(id: string): void;
  jump(id: string): void;
}

export interface EntryOptions {
  open: boolean;
  /** Query stems to highlight. */
  marks?: Set<string>;
  /** Show the stage name in the row, for views not grouped by stage. */
  showStage?: boolean;
  showKind?: boolean;
}

const KIND: Record<Entry['kind'], string> = { technique: 'Technique', tag: 'Tag', fix: 'Fix', tool: 'Tool' };
const RELIABILITY: Record<Reliability, string> = { reliable: 'Reliable', mixed: 'Hit and miss', myth: 'Myth' };

/** Text with query matches wrapped in <mark>. Built from text nodes, never markup. */
export function marked(text: string, marks?: Set<string>): (Node | string)[] {
  if (!marks || marks.size === 0) return [text];
  return text.split(/([A-Za-z0-9’']+)/).map((part, i) => (i % 2 === 1 && isMatch(part.replace(/[’']/g, ''), marks) ? h('mark', {}, part) : part));
}

/** Four segments, filled up to the level, plus the level's name in words. */
export function levelMeter(level: Level): HTMLElement {
  return h(
    'span',
    { class: 'meter', 'data-level': level },
    h('span', { class: 'meter-bars', 'aria-hidden': 'true' }, ...[1, 2, 3, 4].map((n) => h('i', { class: n <= level ? 'on' : '' }))),
    h('span', { class: 'meter-name' }, levelName(level)),
  );
}

function reliabilityMark(r: Reliability): HTMLElement {
  return h('span', { class: `trust trust-${r}` }, RELIABILITY[r]);
}

function detail(e: Entry, on: EntryHandlers): HTMLElement {
  const parts: Node[] = [];
  if (e.steps?.length) parts.push(h('div', { class: 'd-block' }, h('h4', { class: 'd-label' }, 'Do this'), h('ol', { class: 'd-steps' }, ...e.steps.map((s) => h('li', {}, s)))));
  if (e.example) {
    const copy = h('button', { type: 'button', class: 'copy' }, 'Copy');
    copy.addEventListener('click', () => void copyText(e.example!.code, copy));
    parts.push(
      h(
        'div',
        { class: 'd-block d-example' },
        h('div', { class: 'd-example-head' }, h('h4', { class: 'd-label' }, e.example.label), copy),
        h('pre', {}, h('code', {}, e.example.code)),
      ),
    );
  }
  if (e.caution) parts.push(h('div', { class: 'd-block' }, h('h4', { class: 'd-label' }, 'Watch out'), h('p', {}, e.caution)));
  const facts: Node[] = [];
  if (e.where?.length) facts.push(h('div', {}, h('dt', {}, 'Works in'), h('dd', {}, e.where.map(platformName).join(', '))));
  facts.push(h('div', {}, h('dt', {}, 'Stage'), h('dd', {}, stageName(e.stage))));
  if (e.related?.length) {
    const links = e.related
      .map(findEntry)
      .filter((r): r is Entry => !!r)
      .map((r) => {
        const b = h('button', { type: 'button', class: 'rel', 'data-key': `rel-${e.id}-${r.id}` }, r.title);
        b.addEventListener('click', () => on.jump(r.id));
        return b;
      });
    if (links.length) facts.push(h('div', {}, h('dt', {}, 'See also'), h('dd', { class: 'rels' }, ...links)));
  }
  if (e.sources?.length) {
    facts.push(
      h(
        'div',
        {},
        h('dt', {}, 'Sources'),
        h(
          'dd',
          { class: 'srcs' },
          ...e.sources
            .map((k) => SOURCES[k])
            .filter(Boolean)
            .map((s) => h('a', { href: s.url, target: '_blank', rel: 'noopener' }, s.name)),
        ),
      ),
    );
  }
  parts.push(h('dl', { class: 'd-facts' }, ...facts));
  return h('div', { class: 'detail', id: `d-${e.id}` }, ...parts);
}

/**
 * One line of the track sheet: what to do on the left, what you will hear on
 * the right, the level at the end. Opening it shows steps, an example to copy,
 * caveats and related entries.
 */
export function entryRow(e: Entry, opt: EntryOptions, on: EntryHandlers): HTMLElement {
  const toggle = h(
    'button',
    { type: 'button', class: 'e-toggle', 'aria-expanded': String(opt.open), 'aria-controls': `d-${e.id}`, 'data-key': `e-${e.id}` },
    h('span', { class: 'e-title' }, ...marked(e.title, opt.marks)),
  );
  toggle.addEventListener('click', () => on.toggle(e.id));
  const meta: Node[] = [];
  if (opt.showKind) meta.push(h('span', { class: 'e-kind' }, KIND[e.kind]));
  if (opt.showStage) meta.push(h('span', { class: 'e-stage' }, stageName(e.stage)));
  if (e.reliability) meta.push(reliabilityMark(e.reliability));
  return h(
    'li',
    { class: `entry kind-${e.kind}${opt.open ? ' is-open' : ''}`, id: `e-${e.id}`, 'data-tape': e.stage },
    h(
      'div',
      { class: 'e-line' },
      h('div', { class: 'e-what' }, h('h3', { class: 'e-head' }, toggle), h('p', { class: 'e-sum' }, ...marked(e.summary, opt.marks)), meta.length ? h('p', { class: 'e-meta' }, ...meta) : null),
      h('p', { class: 'e-hear' }, h('span', { class: 'e-hear-label' }, 'You hear'), ' ', ...marked(e.hear, opt.marks)),
      levelMeter(e.level),
    ),
    opt.open ? detail(e, on) : null,
  );
}
