import { h } from '@lib/dom';
import { ENTRIES, FIX_GROUPS, TAG_GROUPS } from '../data/catalog';
import { LEVELS, STAGES } from '../data/stages';
import type { Entry, Stage } from '../data/types';
import { entryRow, type EntryHandlers } from './entry';
import { renderForms } from './forms';
import { renderStyleBuilder } from './style-builder';
import { renderTools } from './tools';

export interface ViewContext {
  entries: Entry[];
  open?: string;
  on: EntryHandlers;
}

function list(entries: Entry[], ctx: ViewContext, extra: { showStage?: boolean; showKind?: boolean } = {}): HTMLElement {
  return h('ol', { class: 'sheet' }, ...entries.map((e) => entryRow(e, { open: ctx.open === e.id, ...extra }, ctx.on)));
}

function empty(text: string): HTMLElement {
  return h('p', { class: 'empty' }, text);
}

function stageHead(s: Stage, count: number): HTMLElement {
  return h(
    'header',
    { class: 'stage-head' },
    h('span', { class: 'stage-n', 'aria-hidden': 'true' }, String(s.n).padStart(2, '0')),
    h('div', { class: 'stage-text' }, h('h2', { class: 'stage-name', tabindex: '-1' }, h('span', { class: 'sr-only' }, `Stage ${s.n}: `), s.name), h('p', { class: 'stage-ask' }, s.ask)),
    h('p', { class: 'stage-done' }, h('span', { class: 'label' }, 'Done when'), ' ', s.done),
    h('span', { class: 'stage-count' }, `${count} ${count === 1 ? 'entry' : 'entries'}`),
  );
}

export function renderBackwards(ctx: ViewContext): HTMLElement {
  const sections = STAGES.map((s) => {
    const rows = ctx.entries.filter((e) => e.stage === s.id);
    const extras: Node[] = [];
    if (s.id === 'release') extras.push(renderForms());
    if (s.id === 'prompt') extras.push(renderStyleBuilder());
    return h('section', { class: 'stage', id: `stage-${s.id}`, 'data-stage': s.id, 'data-tape': s.id, 'data-dock': s.name, 'data-dock-n': String(s.n).padStart(2, '0') }, stageHead(s, rows.length), ...extras, rows.length ? list(rows, ctx, { showKind: true }) : empty('No entries at this stage match the filters.'));
  });
  return h('div', { class: 'view view-backwards' }, ...sections);
}

export function renderLadder(ctx: ViewContext): HTMLElement {
  return h(
    'div',
    { class: 'view view-ladder' },
    ...LEVELS.map((l) => {
      const rows = ctx.entries.filter((e) => e.level === l.level).sort((a, b) => STAGES.findIndex((s) => s.id === b.stage) - STAGES.findIndex((s) => s.id === a.stage));
      return h(
        'section',
        { class: 'rung', id: `level-${l.level}`, 'data-dock': l.name, 'data-dock-n': String(l.level) },
        h('header', { class: 'rung-head' }, h('h2', { class: 'rung-name' }, l.name), h('p', { class: 'rung-note' }, l.note), h('span', { class: 'stage-count' }, `${rows.length} entries`)),
        rows.length ? list(rows, ctx, { showStage: true, showKind: true }) : empty('Nothing at this level matches the filters.'),
      );
    }),
  );
}

function grouped(kind: Entry['kind'], groups: { id: string; name: string; note: string }[], ctx: ViewContext, cls: string): HTMLElement {
  const rows = ctx.entries.filter((e) => e.kind === kind);
  return h(
    'div',
    { class: `view ${cls}` },
    ...groups.map((g) => {
      const inGroup = rows.filter((e) => e.group === g.id);
      if (!inGroup.length) return null;
      return h('section', { class: 'group', id: `group-${g.id}`, 'data-dock': g.name }, h('header', { class: 'group-head' }, h('h2', { class: 'group-name' }, g.name), h('p', { class: 'group-note' }, g.note)), list(inGroup, ctx));
    }),
    rows.length ? null : empty('Nothing here matches the filters.'),
  );
}

export function renderTags(ctx: ViewContext): HTMLElement {
  return grouped('tag', TAG_GROUPS, ctx, 'view-tags');
}

export function renderFixes(ctx: ViewContext): HTMLElement {
  return grouped('fix', FIX_GROUPS, ctx, 'view-fixes');
}

export function renderToolsView(ctx: ViewContext): HTMLElement {
  const tools = ctx.entries.filter((e) => e.kind === 'tool');
  return h('div', { class: 'view view-tools' }, renderTools(), tools.length ? h('section', { class: 'group', id: 'group-using', 'data-dock': 'Using the tools' }, h('header', { class: 'group-head' }, h('h2', { class: 'group-name' }, 'Using the tools'), h('p', { class: 'group-note' }, 'How to get the most out of each one.')), list(tools, ctx, { showStage: true })) : null);
}

export function renderResults(ctx: ViewContext, query: string, marks: Set<string>, onClear: () => void, suggest: (q: string) => void): HTMLElement {
  if (ctx.entries.length === 0) {
    const clear = h('button', { type: 'button', class: 'linkish' }, 'Clear the search');
    clear.addEventListener('click', onClear);
    return h(
      'div',
      { class: 'view view-results' },
      h(
        'div',
        { class: 'no-results' },
        h('p', {}, 'Nothing matches ', h('q', {}, query), '. Try fewer words, or a word for the sound rather than the fix: "harsh", "muddy", "quiet vocal".'),
        h('p', {}, clear, ' or try ', ...['stems', 'chorus', 'mastering', 'ending'].flatMap((s, i) => {
          const b = h('button', { type: 'button', class: 'linkish' }, s);
          b.addEventListener('click', () => suggest(s));
          return i ? [', ', b] : [b];
        }), '.'),
      ),
      h('p', { class: 'empty-note' }, ENTRIES.length + ' entries are searched: titles, alternate names, examples, steps and what you hear.'),
    );
  }
  return h('div', { class: 'view view-results' }, h('ol', { class: 'sheet' }, ...ctx.entries.map((e) => entryRow(e, { open: ctx.open === e.id, marks, showStage: true, showKind: true }, ctx.on))));
}
