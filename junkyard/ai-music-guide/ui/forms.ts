import { copyText } from '@lib/clipboard';
import { h } from '@lib/dom';
import { FORMS } from '../data/forms';
import type { Form } from '../data/types';

let built: HTMLElement | undefined;
let current = FORMS[0];

function clock(seconds: number): string {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** Seconds per bar at the middle of the form's tempo range, in 4/4. */
function barSeconds(f: Form): number {
  const [lo, hi = lo] = f.bpm.match(/\d+/g)!.map(Number);
  return (4 * 60) / ((lo + hi) / 2);
}

/** Lyric skeleton with one tag per section, ready to paste into a lyrics box. */
export function skeleton(f: Form): string {
  const seen = new Map<string, number>();
  return f.sections
    .map((s) => {
      const n = (seen.get(s.name) ?? 0) + 1;
      seen.set(s.name, n);
      const numbered = /^(Verse)$/.test(s.name) ? `${s.name} ${n}` : s.name;
      const lines = /Verse|Chorus|Pre-Chorus|Bridge|Hook|Post-Chorus/.test(s.name) ? '\n(lyrics)' : '';
      return `[${numbered}]${lines}`;
    })
    .join('\n\n');
}

function draw(f: Form): HTMLElement {
  const per = barSeconds(f);
  const total = f.sections.reduce((t, s) => t + s.bars, 0);
  let at = 0;
  const firstChorus = f.sections.findIndex((s) => /^(Chorus|Hook|Drop)$/.test(s.name));
  const toChorus = f.sections.slice(0, firstChorus).reduce((t, s) => t + s.bars, 0) * per;
  const blocks = f.sections.map((s, i) => {
    const start = at;
    at += s.bars;
    const label = `${s.name}, ${s.bars} bars, from ${clock(start * per)}`;
    return h(
      'li',
      { class: `blk${i === firstChorus ? ' is-first' : ''}`, style: `--bars:${s.bars};--e:${s.energy}`, title: label },
      h('span', { class: 'blk-fill', 'aria-hidden': 'true' }),
      h('span', { class: 'blk-name' }, s.name),
      h('span', { class: 'blk-t' }, clock(start * per)),
      h('span', { class: 'sr-only' }, `: ${s.bars} bars, starts at ${clock(start * per)}, energy ${Math.round(s.energy * 10)} of 10`),
    );
  });
  return h(
    'figure',
    { class: 'form-fig' },
    h('ol', { class: 'form-strip', 'aria-label': `${f.genre} song form, ${f.sections.length} sections` }, ...blocks),
    h(
      'figcaption',
      { class: 'form-cap' },
      h('span', {}, h('b', {}, clock(total * per)), ' long at ', f.bpm, ' BPM'),
      firstChorus >= 0 ? h('span', {}, 'First ', f.sections[firstChorus].name.toLowerCase(), ' at ', h('b', {}, clock(toChorus))) : null,
      h('span', { class: 'form-key' }, 'Block height is how full the arrangement is'),
    ),
    h('p', { class: 'form-note' }, f.note),
  );
}

/** "Anatomy of a hit": a song form per genre drawn as a strip of tape, with the tag skeleton to copy. */
export function renderForms(): HTMLElement {
  if (built) return built;
  const picker = h('div', { class: 'form-pick', role: 'group', 'aria-label': 'Genre' });
  const stage = h('div', { class: 'form-stage', 'aria-live': 'polite' });
  const copy = h('button', { type: 'button', class: 'copy' }, 'Copy the tags');
  const pre = h('pre', { class: 'form-skel' });
  copy.addEventListener('click', () => void copyText(skeleton(current), copy));

  function show() {
    for (const b of picker.querySelectorAll<HTMLButtonElement>('button')) b.setAttribute('aria-pressed', String(b.dataset.id === current.id));
    stage.replaceChildren(draw(current));
    pre.textContent = skeleton(current);
  }
  for (const f of FORMS) {
    const b = h('button', { type: 'button', class: 'chip', 'data-id': f.id }, f.genre);
    b.addEventListener('click', () => {
      current = f;
      show();
    });
    picker.append(b);
  }
  show();
  built = h(
    'section',
    { class: 'feature forms', 'aria-labelledby': 'forms-h' },
    h('div', { class: 'feature-head' }, h('h3', { id: 'forms-h', class: 'feature-name' }, 'Anatomy of a hit'), h('p', { class: 'feature-dek' }, 'Typical streaming-era song forms. Pick a genre, then copy its section tags into the lyrics box as a starting structure.')),
    picker,
    stage,
    h('details', { class: 'form-tags' }, h('summary', {}, 'Section tags for this form'), h('div', { class: 'form-tags-body' }, copy, pre)),
  );
  return built;
}
