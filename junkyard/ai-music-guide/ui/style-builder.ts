import { copyText } from '@lib/clipboard';
import { h } from '@lib/dom';
import { readJson, writeJson } from '@lib/local-store';
import { STYLE_LIMIT, STYLE_SLOTS } from '../data/style-words';

const KEY = 'ai-music-guide:style';
type Values = Record<string, string>;

let built: HTMLElement | undefined;

function compose(v: Values): string {
  return STYLE_SLOTS.filter((s) => s.id !== 'exclude')
    .map((s) => (v[s.id] ?? '').trim().replace(/,\s*$/, ''))
    .filter(Boolean)
    .join(', ');
}

/**
 * The style-box formula as a form: one field per slot, in the order the model
 * weighs them, with common words to click in. The result updates as you type.
 */
export function renderStyleBuilder(): HTMLElement {
  if (built) return built;
  const values: Values = readJson<Values>(KEY, {});
  const out = h('output', { class: 'sb-out', for: STYLE_SLOTS.map((s) => `sb-${s.id}`).join(' '), 'aria-live': 'polite' });
  const count = h('span', { class: 'sb-count' });
  const excl = h('p', { class: 'sb-excl' });
  const inputs = new Map<string, HTMLInputElement>();

  function refresh() {
    const text = compose(values);
    out.textContent = text || 'Fill in a slot or click a word to start.';
    out.classList.toggle('is-empty', !text);
    const over = text.length > STYLE_LIMIT;
    count.textContent = `${text.length} / ${STYLE_LIMIT} characters${over ? ', over the limit' : ''}`;
    count.classList.toggle('is-over', over);
    const ex = (values.exclude ?? '').trim();
    excl.replaceChildren(ex ? h('span', {}, h('span', { class: 'label' }, 'Exclude'), ' ', ex) : '');
    writeJson(KEY, values);
  }

  const fields = STYLE_SLOTS.map((slot, i) => {
    const input = h('input', { type: 'text', id: `sb-${slot.id}`, class: 'sb-input', value: values[slot.id] ?? '', 'aria-describedby': `sb-${slot.id}-hint`, autocomplete: 'off' });
    inputs.set(slot.id, input);
    input.addEventListener('input', () => {
      values[slot.id] = input.value;
      refresh();
    });
    const chips = slot.words.map((w) => {
      const b = h('button', { type: 'button', class: 'word' }, w);
      b.addEventListener('click', () => {
        const parts = input.value.split(',').map((p) => p.trim()).filter(Boolean);
        const at = parts.indexOf(w);
        if (at >= 0) parts.splice(at, 1);
        else parts.push(w);
        input.value = parts.join(', ');
        values[slot.id] = input.value;
        refresh();
      });
      return b;
    });
    return h(
      'div',
      { class: `sb-slot${slot.id === 'exclude' ? ' is-exclude' : ''}` },
      h('label', { for: `sb-${slot.id}`, class: 'sb-label' }, h('span', { class: 'sb-n', 'aria-hidden': 'true' }, slot.id === 'exclude' ? '–' : String(i + 1)), slot.label),
      h('p', { class: 'sb-hint', id: `sb-${slot.id}-hint` }, slot.hint),
      input,
      h('div', { class: 'sb-words', role: 'group', 'aria-label': `Common ${slot.label.toLowerCase()} words` }, ...chips),
    );
  });

  const copy = h('button', { type: 'button', class: 'copy' }, 'Copy style');
  copy.addEventListener('click', () => void copyText(compose(values), copy));
  const reset = h('button', { type: 'button', class: 'linkish' }, 'Clear');
  reset.addEventListener('click', () => {
    for (const k of Object.keys(values)) delete values[k];
    for (const input of inputs.values()) input.value = '';
    refresh();
  });

  refresh();
  built = h(
    'section',
    { class: 'feature builder', 'aria-labelledby': 'sb-h' },
    h(
      'div',
      { class: 'feature-head' },
      h('h3', { id: 'sb-h', class: 'feature-name' }, 'Style line builder'),
      h('p', { class: 'feature-dek' }, 'The order most guides agree on: genre first, then era, tempo, instruments, vocal, production and mood. Earlier words weigh more. Describe a sound, never an artist name.'),
    ),
    h('div', { class: 'sb-grid' }, ...fields),
    h('div', { class: 'sb-result' }, h('div', { class: 'sb-result-head' }, h('span', { class: 'label' }, 'Style line'), count, h('span', { class: 'sb-actions' }, reset, copy)), out, excl),
  );
  return built;
}
