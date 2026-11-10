import { h } from '@lib/dom';
import { MODALITIES, modelsFor } from '../data/query';
import type { Modality } from '../data/types';

/** Image / Video / Audio / 3D, like the tabs in Leonardo's own model picker. */
export function mountTabs(container: HTMLElement, onPick: (m: Modality) => void): (current: Modality) => void {
  const buttons = MODALITIES.map((m) => {
    const b = h('button', { type: 'button', class: 'tab', 'data-id': m.id, 'data-key': `tab-${m.id}` }, m.label, h('span', { class: 'tab-n' }, String(modelsFor(m.id).length)));
    b.addEventListener('click', () => onPick(m.id));
    return b;
  });
  container.append(h('div', { class: 'tabs-inner', role: 'group' }, ...buttons));
  return (current) => {
    for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.id === current));
  };
}
