import { h } from '@lib/dom';
import { SCENES, type Scene } from '../presets/scenes';
import { STAGE_FIELDS } from '../shadow/model';
import type { DesignStore } from './store';
import { colorControl, rangeControl } from './controls';

function sceneSwatch(scene: Scene, store: DesignStore): HTMLButtonElement {
  const { stage } = store.current;
  const active = stage.background === scene.background && stage.surface === scene.surface;
  const swatch = h('button', { type: 'button', class: 'scene', title: scene.name, 'aria-label': `${scene.name} scene`, 'aria-pressed': String(active) });
  swatch.style.setProperty('--scene-bg', scene.background);
  swatch.style.setProperty('--scene-surface', scene.surface);
  swatch.addEventListener('click', () =>
    store.update((d) => {
      d.stage.background = scene.background;
      d.stage.surface = scene.surface;
    }, 'structure'),
  );
  return swatch;
}

/** Scene backdrops, colors and box geometry. */
export function mountStageEditor(root: HTMLElement, store: DesignStore): void {
  const render = () => {
    const { stage } = store.current;
    root.replaceChildren(
      h('div', { class: 'scenes', role: 'group', 'aria-label': 'Scenes' }, ...SCENES.map((s) => sceneSwatch(s, store))),
      h(
        'div',
        { class: 'scene-colors' },
        colorControl('Backdrop', stage.background, (v) => store.update((d) => (d.stage.background = v))),
        colorControl('Surface', stage.surface, (v) => store.update((d) => (d.stage.surface = v))),
      ),
      ...STAGE_FIELDS.map((f) =>
        rangeControl({ ...f, value: stage[f.key], unit: 'px', onInput: (v) => store.update((d) => (d.stage[f.key] = v)) }),
      ),
    );
  };
  store.subscribe((_, kind) => kind === 'structure' && render());
  render();
}
