import './chute.css';
import { h } from '@lib/dom';
import { CHUTE, DEFAULT_LAYOUT, DEFLECTOR_KINDS } from './config';
import { Editor } from './editor';
import { loadLayout, saveLayout } from './layout-store';
import { Renderer } from './render';
import { buildToolbar } from './toolbar';
import { World } from './world';

const TINKER_CLASS = 'tinkering';

/**
 * Mounts the falling-junk backdrop behind the page. The chute button at the
 * top of the page toggles tinker mode, where deflectors can be edited.
 */
export function mountJunkChute(chute: HTMLButtonElement): void {
  const canvas = h('canvas', { class: 'junk-canvas', 'aria-hidden': 'true' });
  const counter = h('span', { class: 'chute-count', 'aria-hidden': 'true' }, '0');
  const world = new World();
  const renderer = new Renderer(canvas);
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

  let tinkering = false;
  let frame = 0;
  let last = 0;

  const editor = new Editor(canvas, world, () => saveLayout(world.layout()), () => setTinkering(false));
  const toolbar = buildToolbar(DEFLECTOR_KINDS, {
    add: (kind) => editor.add(kind),
    clear: () => editor.replaceAll([]),
    reset: () => editor.replaceAll(DEFAULT_LAYOUT),
    done: () => setTinkering(false),
  });

  root.style.setProperty('--chute-x', `${CHUTE.x * 100}%`);
  root.style.setProperty('--junk-ambient-opacity', String(CHUTE.ambientOpacity));
  document.body.prepend(canvas);
  document.body.append(toolbar);
  chute.append(counter);

  /** The chute mouth in viewport px; it scrolls with the page. */
  function updateEmitter(): void {
    const box = chute.getBoundingClientRect();
    world.emitter = {
      x: box.left + box.width * CHUTE.mouth.x,
      y: box.top + box.height * CHUTE.mouth.y,
      width: box.width * CHUTE.mouth.width,
    };
  }

  function resize(): void {
    world.resize(window.innerWidth, window.innerHeight);
    renderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio || 1);
    draw();
  }

  function draw(): void {
    renderer.draw(world, tinkering ? editor : null);
    const count = String(world.visibleCount());
    if (counter.textContent !== count) counter.textContent = count;
  }

  function tick(now: number): void {
    const dt = last ? (now - last) / 1000 : 0;
    last = now;
    updateEmitter();
    world.step(dt);
    draw();
    frame = requestAnimationFrame(tick);
  }

  /** Ambient motion respects reduced motion; tinker mode always runs since the viewer asked for it. */
  function syncLoop(): void {
    const run = tinkering || !reducedMotion.matches;
    if (run && !frame) {
      last = 0;
      frame = requestAnimationFrame(tick);
    } else if (!run && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      world.junk = [];
      draw();
    }
  }

  function setTinkering(on: boolean): void {
    tinkering = on;
    if (on) window.scrollTo({ top: 0 });
    root.classList.toggle(TINKER_CLASS, on);
    chute.setAttribute('aria-pressed', String(on));
    toolbar.hidden = !on;
    editor.setEnabled(on);
    syncLoop();
    draw();
  }

  chute.addEventListener('click', () => setTinkering(!tinkering));
  window.addEventListener('resize', resize);
  reducedMotion.addEventListener('change', syncLoop);
  darkMode.addEventListener('change', () => {
    renderer.refreshTheme();
    draw();
  });

  world.colors = renderer.colorCount;
  world.setLayout(loadLayout(DEFAULT_LAYOUT));
  resize();
  syncLoop();
}
