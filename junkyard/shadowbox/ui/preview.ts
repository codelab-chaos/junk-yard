import { layersToCss } from '../shadow/format';
import type { DesignStore } from './store';

export function mountPreview(stageEl: HTMLElement, boxEl: HTMLElement, store: DesignStore): void {
  const render = () => {
    const { layers, stage } = store.current;
    stageEl.style.background = stage.background;
    boxEl.style.background = stage.surface;
    boxEl.style.borderRadius = `${stage.radius}px`;
    boxEl.style.width = `${stage.size}px`;
    boxEl.style.height = `${stage.size}px`;
    boxEl.style.boxShadow = layersToCss(layers);
  };
  store.subscribe(render);
  render();
}
