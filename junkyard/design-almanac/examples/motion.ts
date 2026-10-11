import { css, every, html, type Example } from './types';

const SWATCHES = [
  ['Terracotta', '#c4623f', 'Fired clay, warm and earthy. Pairs with sage and cream.'],
  ['Sage', '#8fa58a', 'A gray green that calms everything next to it.'],
  ['Ink', '#26324a', 'Deep blue black for text that is not quite black.'],
  ['Saffron', '#e7a83a', 'A spice yellow; use it for one thing on the page.'],
];

const REVEAL_ITEMS = ['Arrive', 'Unpack', 'Wander', 'Taste', 'Linger', 'Return'];

const LOGOS = ['Northwind', 'Halcyon', 'Parallel', 'Ferro', 'Lumen&Co', 'Basalt', 'Okta Mill', 'Verdant'];

export const MOTION_EXAMPLES: Example[] = [
  {
    id: 'view-transitions',
    css: css`
      .x { background: #f4f0e8; padding: 18px; font-family: 'Schibsted Grotesk', sans-serif; color: #1f1c18; }
      .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; height: 100%; }
      .sw { border: 0; padding: 0; border-radius: 14px; background: var(--c); display: flex; align-items: flex-end; text-align: left; overflow: hidden; color: #fff; }
      .sw span { padding: 12px; font: 400 18px 'Fraunces', serif; }
      .detail { position: absolute; inset: 18px; border-radius: 18px; background: var(--c); color: #fff; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
      .detail[hidden] { display: none; }
      .detail .tx { padding: 26px; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; background: rgb(0 0 0 / .12); }
      .detail h3 { margin: 0; font: 400 clamp(32px, 6cqw, 60px)/1 'Fraunces', serif; }
      .detail p { margin: 0; max-width: 32ch; font-size: 14px; line-height: 1.4; }
      .detail code { font: 12px 'Spline Sans Mono', monospace; opacity: .85; }
      .detail button { position: absolute; top: 14px; right: 14px; border: 0; border-radius: 99px; padding: 6px 12px; background: rgb(255 255 255 / .9); color: #1f1c18; font-size: 12.5px; }
      .hint { position: absolute; left: 18px; bottom: 6px; font: 11px 'Spline Sans Mono', monospace; color: #8a8378; }
      @container (width < 520px) { .grid { grid-template-columns: 1fr 1fr; } .detail { grid-template-columns: 1fr; } .detail .tx { padding: 18px; } }
    `,
    html: html`<div class="x"><div class="grid">${SWATCHES.map(([n, c], i) => `<button class="sw" data-i="${i}" style="--c:${c}"><span>${n}</span></button>`).join('')}</div>
      <div class="detail" hidden><div></div><div class="tx"><h3></h3><code></code><p></p></div><button>Close</button></div></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const detail = root.querySelector<HTMLElement>('.detail')!;
      const tiles = [...root.querySelectorAll<HTMLButtonElement>('.sw')];
      let open: HTMLButtonElement | null = null;
      const transition = (update: () => void) => {
        const start = (document as Document & { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
        if (start) start.call(document, update);
        else update();
      };
      const show = (tile: HTMLButtonElement) => {
        const [name, color, text] = SWATCHES[Number(tile.dataset.i)];
        tile.style.viewTransitionName = 'almanac-swatch';
        transition(() => {
          tile.style.viewTransitionName = '';
          detail.style.viewTransitionName = 'almanac-swatch';
          detail.style.setProperty('--c', color);
          detail.querySelector('h3')!.textContent = name;
          detail.querySelector('code')!.textContent = color;
          detail.querySelector('p')!.textContent = text;
          detail.hidden = false;
          open = tile;
        });
      };
      const hide = () => {
        if (!open) return;
        const tile = open;
        transition(() => {
          detail.style.viewTransitionName = '';
          detail.hidden = true;
          tile.style.viewTransitionName = 'almanac-swatch';
          open = null;
        });
      };
      tiles.forEach((t) => t.addEventListener('click', () => show(t), { signal }));
      detail.querySelector('button')!.addEventListener('click', hide, { signal });
    },
  },
  {
    id: 'scroll-driven',
    css: css`
      .x { background: #10120f; color: #eae6da; font-family: 'Fraunces', serif; }
      .sc { position: absolute; inset: 0; overflow-y: auto; scroll-timeline: --page y; padding: 40px 0 120px; scrollbar-width: thin; }
      .prog { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: #e4572e; transform-origin: 0 50%; scale: .3 1; z-index: 2; }
      .it { margin: 0 auto 18px; width: min(86%, 520px); padding: 22px; border-radius: 16px; background: #1d211b; display: flex; align-items: baseline; gap: 16px; }
      .it b { font-weight: 300; font-size: clamp(30px, 5cqw, 48px); letter-spacing: -.02em; }
      .it span { font: 500 12px 'Spline Sans Mono', monospace; color: #e4572e; }
      .tip { text-align: center; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #8d917f; margin-bottom: 22px; }
      @supports (animation-timeline: view()) {
        .prog { animation: grow linear both; animation-timeline: --page; scale: 0 1; }
        .it { animation: rise linear both; animation-timeline: view(); animation-range: entry 0% cover 35%; }
      }
      @keyframes grow { to { scale: 1 1; } }
      @keyframes rise { from { opacity: 0; translate: 0 40px; scale: .92; } }
    `,
    html: html`<div class="x"><i class="prog"></i><div class="sc"><div class="tip">Scroll inside this frame</div>${REVEAL_ITEMS.map((t, i) => `<div class="it"><span>0${i + 1}</span><b>${t}</b></div>`).join('')}</div></div>`,
  },
  {
    id: 'parallax',
    css: css`
      .x { background: linear-gradient(180deg, #fbd7a8 0%, #f6a982 40%, #d77a6b 70%); overflow: hidden; --px: 0; --py: 0; }
      .l { position: absolute; left: -10%; right: -10%; bottom: -5%; translate: calc(var(--px) * var(--d) * -40px) calc(var(--py) * var(--d) * -14px); transition: translate .2s ease-out; animation: sway 9s ease-in-out infinite alternate; }
      :host([data-interactive]) .l { animation: none; }
      @keyframes sway { from { transform: translateX(calc(var(--d) * -18px)); } to { transform: translateX(calc(var(--d) * 18px)); } }
      .sun { position: absolute; width: 18%; aspect-ratio: 1; border-radius: 50%; left: 58%; top: 16%; background: #fff3d6; --d: .1; translate: calc(var(--px) * -4px) 0; box-shadow: 0 0 80px 20px rgb(255 230 180 / .6); }
      .l1 { --d: .25; height: 70%; background: #c06a6a; clip-path: polygon(0 60%, 12% 30%, 24% 50%, 40% 12%, 55% 44%, 70% 22%, 84% 48%, 100% 26%, 100% 100%, 0 100%); }
      .l2 { --d: .5; height: 55%; background: #8e4a5c; clip-path: polygon(0 50%, 18% 24%, 32% 46%, 48% 20%, 66% 52%, 82% 30%, 100% 50%, 100% 100%, 0 100%); }
      .l3 { --d: .8; height: 40%; background: #55304a; clip-path: polygon(0 40%, 20% 60%, 36% 30%, 58% 58%, 76% 34%, 100% 56%, 100% 100%, 0 100%); }
      .l4 { --d: 1.2; height: 24%; background: #2a1830; clip-path: polygon(0 30%, 30% 60%, 50% 40%, 75% 70%, 100% 35%, 100% 100%, 0 100%); }
      .cap { position: absolute; left: 22px; top: 18px; font: 400 clamp(22px, 4cqw, 40px)/1 'Fraunces', serif; color: #3a1f2e; }
      .cap small { display: block; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; margin-top: 8px; opacity: .7; }
    `,
    html: html`<div class="x"><i class="sun"></i><i class="l l1"></i><i class="l l2"></i><i class="l l3"></i><i class="l l4"></i><div class="cap">Five layers, five speeds<small>Move the pointer across the scene</small></div></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const x = root.querySelector<HTMLElement>('.x')!;
      x.addEventListener(
        'pointermove',
        (e) => {
          const r = x.getBoundingClientRect();
          x.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
          x.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        },
        { signal },
      );
    },
  },
  {
    id: 'skeleton-screens',
    css: css`
      .x { background: #f5f4f0; padding: 20px; display: grid; place-items: center; font-family: 'Schibsted Grotesk', sans-serif; color: #22201c; }
      .list { width: min(100%, 520px); display: grid; gap: 14px; }
      .item { display: grid; grid-template-columns: 56px 1fr; gap: 14px; align-items: center; background: #fff; border-radius: 12px; padding: 14px; }
      .sk { border-radius: 6px; background: linear-gradient(90deg, #ebe8e1 0%, #f6f4ef 40%, #ebe8e1 80%) 0 0 / 300% 100%; animation: shimmer 1.6s linear infinite; }
      @keyframes shimmer { from { background-position: 100% 0; } to { background-position: -50% 0; } }
      .av { width: 56px; height: 56px; border-radius: 50%; }
      .ln { height: 12px; margin: 6px 0; } .ln.w1 { width: 70%; } .ln.w2 { width: 45%; height: 10px; }
      .real { display: none; } .real b { display: block; font-size: 15px; } .real span { font-size: 13px; color: #75716a; }
      .avr { width: 56px; height: 56px; border-radius: 50%; background: var(--g); display: none; }
      .x[data-loaded] .sk { display: none; } .x[data-loaded] .real, .x[data-loaded] .avr { display: block; animation: in .3s ease-out; }
      @keyframes in { from { opacity: 0; } }
      .lbl { position: absolute; top: 10px; right: 14px; font: 500 11px 'Spline Sans Mono', monospace; color: #8b867b; }
    `,
    html: html`<div class="x" aria-busy="true"><span class="lbl">loading…</span><div class="list">
      ${[['Ines Duarte', 'Shared 3 photos', '#e09f7d,#b5523b'], ['Tomás Reyes', 'Commented on your sketch', '#9db7a5,#4f7a63'], ['Aiko Mori', 'Started following you', '#a7a0d6,#5b528f']]
        .map(([n, t, g]) => `<div class="item"><div class="sk av"></div><i class="avr" style="--g:linear-gradient(135deg,${g})"></i><div><div class="sk ln w1"></div><div class="sk ln w2"></div><div class="real"><b>${n}</b><span>${t}</span></div></div></div>`)
        .join('')}
    </div></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const x = root.querySelector<HTMLElement>('.x')!;
      const lbl = root.querySelector<HTMLElement>('.lbl')!;
      let loaded = false;
      every(2200, signal, () => {
        loaded = !loaded;
        x.toggleAttribute('data-loaded', loaded);
        x.setAttribute('aria-busy', String(!loaded));
        lbl.textContent = loaded ? 'loaded' : 'loading…';
      });
    },
  },
  {
    id: 'marquee',
    css: css`
      .x { background: #ece6da; display: grid; align-content: center; gap: 18px; overflow: hidden; }
      .band { display: flex; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
      .band:hover .track { animation-play-state: paused; }
      .track { display: flex; flex-shrink: 0; gap: 0; animation: slide 22s linear infinite; }
      .rev .track { animation-direction: reverse; animation-duration: 30s; }
      @keyframes slide { to { translate: -100% 0; } }
      .big { background: #1c1a17; color: #ece6da; padding: 12px 0; rotate: -2deg; width: 104%; margin-left: -2%; }
      .big span { font: italic 300 clamp(36px, 7cqw, 72px)/1 'Fraunces', serif; padding: 0 .4em; white-space: nowrap; }
      .big span:nth-child(even) { font-style: normal; color: #ff6a2b; font-size: .6em; align-self: center; }
      .logos span { font: 600 22px 'Bricolage Grotesque', sans-serif; color: #5a544a; padding: 0 28px; white-space: nowrap; letter-spacing: -.02em; }
      .logos span:nth-child(3n) { font: italic 400 24px 'Fraunces', serif; }
      .logos span:nth-child(4n) { font: 500 18px 'Spline Sans Mono', monospace; letter-spacing: .06em; text-transform: uppercase; }
    `,
    html: (() => {
      const words = ['Open late', '*', 'Natural wine', '*', 'Small plates', '*', 'No reservations', '*'];
      const big = words.map((w) => `<span>${w}</span>`).join('');
      const logos = LOGOS.map((l) => `<span>${l}</span>`).join('');
      return html`<div class="x"><div class="band big"><div class="track">${big}</div><div class="track" aria-hidden="true">${big}</div></div>
        <div class="band logos rev"><div class="track">${logos}</div><div class="track" aria-hidden="true">${logos}</div></div></div>`;
    })(),
  },
];
