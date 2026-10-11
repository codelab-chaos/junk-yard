import { STAGE_FIELDS } from '../shadow/model';
import type { DesignStore } from './store';
import { colorControl, rangeControl } from './controls';

export function mountStageEditor(root: HTMLElement, store: DesignStore): void {
  const render = () => {
    const { stage } = store.current;
    root.replaceChildren(
      colorControl('Background', stage.background, (v) => store.update((d) => (d.stage.background = v))),
      colorControl('Surface', stage.surface, (v) => store.update((d) => (d.stage.surface = v))),
      ...STAGE_FIELDS.map((f) =>
        rangeControl({ ...f, value: stage[f.key], unit: 'px', onInput: (v) => store.update((d) => (d.stage[f.key] = v)) }),
      ),
    );
  };
  store.subscribe((_, kind) => kind === 'structure' && render());
  render();
}
