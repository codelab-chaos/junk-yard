import { layersToCss } from '../shadow/format';
import type { ShadowDesign } from '../shadow/model';
import { compassDegrees, hasOffset, isDark, lightAngle } from '../shadow/transforms';
import type { Peek } from './peek';
import type { DesignStore } from './store';

interface PreviewElements {
  stage: HTMLElement;
  box: HTMLElement;
  light: HTMLElement;
  readout: HTMLElement;
}

/** How far from the center the light orb sits, as a share of the stage half-size. */
export const LIGHT_ORBIT = 0.78;
const MORPH_MS = 420;

/**
 * Paints the stage: the box, its shadow, the light orb and the readout.
 * Shows the peeked design while one is set, the edited design otherwise.
 */
export function mountPreview(els: PreviewElements, store: DesignStore, peek: Peek): { morph: () => void } {
  let morphTimer = 0;

  const render = () => {
    const design: ShadowDesign = peek.current ?? store.current;
    const { layers, stage } = design;
    const angle = lightAngle(layers);

    els.stage.style.setProperty('--stage-bg', stage.background);
    els.stage.dataset.tone = isDark(stage.background) ? 'dark' : 'light';
    els.stage.classList.toggle('is-peeking', Boolean(peek.current));
    els.box.style.background = stage.surface;
    els.box.style.borderRadius = `${stage.radius}px`;
    els.box.style.setProperty('--box-size', `${stage.size}px`);
    els.box.style.boxShadow = layersToCss(layers);

    // The stage is a size container: the orb orbits at LIGHT_ORBIT of its half min side (cqmin).
    els.stage.style.setProperty('--lcos', String(Math.cos(angle)));
    els.stage.style.setProperty('--lsin', String(Math.sin(angle)));
    els.light.classList.toggle('is-idle', !hasOffset(layers));

    const lit = hasOffset(layers) ? `${compassDegrees(angle)}°` : 'overhead';
    els.readout.textContent = `${peek.current ? 'Preview' : 'Light'} ${lit} · ${layers.length} ${layers.length === 1 ? 'layer' : 'layers'}`;
  };

  store.subscribe(render);
  peek.subscribe(render);
  render();

  return {
    /** Lets the next change animate, e.g. when a whole preset loads. */
    morph: () => {
      els.stage.classList.add('is-morphing');
      window.clearTimeout(morphTimer);
      morphTimer = window.setTimeout(() => els.stage.classList.remove('is-morphing'), MORPH_MS);
    },
  };
}
