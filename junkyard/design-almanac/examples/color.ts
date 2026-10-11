import { css, html, type Example } from './types';

const themePanel = (mode: 'light' | 'dark'): string => `
  <div class="t ${mode}">
    <div class="head"><b>Notifications</b><small>${mode}</small></div>
    <div class="row"><span>Mentions</span><i class="sw on"></i></div>
    <div class="row"><span>Weekly digest</span><i class="sw"></i></div>
    <div class="row"><span>Product news</span><i class="sw on"></i></div>
    <button>Save changes</button>
    <div class="chips"><i style="--l:var(--bg)"></i><i style="--l:var(--surface)"></i><i style="--l:var(--line)"></i><i style="--l:var(--muted)"></i><i style="--l:var(--ink)"></i><i style="--l:var(--accent)"></i></div>
  </div>`;

// Inline SVG "photograph": grayscale landscape with turbulence texture, recolored by blend layers.
const PHOTO = `<svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".02 .06" numOctaves="3" seed="4"/><feColorMatrix type="saturate" values="0"/></filter>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#777"/></linearGradient></defs>
  <rect width="200" height="250" fill="url(#sky)"/>
  <rect width="200" height="140" filter="url(#n)" opacity=".35"/>
  <circle cx="140" cy="70" r="24" fill="#fff"/>
  <path d="M0 150 L40 105 L70 130 L110 80 L150 125 L175 108 L200 130 V250 H0Z" fill="#555"/>
  <path d="M0 180 L50 150 L95 172 L140 140 L200 168 V250 H0Z" fill="#2a2a2a"/>
  <path d="M0 215 Q100 190 200 212 V250 H0Z" fill="#0d0d0d"/>
</svg>`;

export const COLOR_EXAMPLES: Example[] = [
  {
    id: 'oklch-dark-mode',
    css: css`
      .x { --h: 255; background: oklch(0.9 0.01 var(--h)); display: grid; grid-template-rows: 1fr auto; gap: 12px; padding: 18px; font-family: 'Schibsted Grotesk', sans-serif; font-size: 13px; }
      .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: center; width: min(100%, 820px); margin: 0 auto; }
      .t { --c: 0.03; border-radius: 14px; padding: 16px; background: var(--surface); color: var(--ink); display: grid; gap: 10px; align-content: start; box-shadow: 0 0 0 1px var(--line); }
      .light { --bg: oklch(0.97 0.01 var(--h)); --surface: oklch(0.995 0.005 var(--h)); --line: oklch(0.9 0.02 var(--h)); --muted: oklch(0.55 0.03 var(--h)); --ink: oklch(0.22 0.03 var(--h)); --accent: oklch(0.55 0.17 var(--h)); --on: oklch(0.99 0.01 var(--h)); }
      .dark { --bg: oklch(0.17 0.015 var(--h)); --surface: oklch(0.23 0.02 var(--h)); --line: oklch(0.32 0.025 var(--h)); --muted: oklch(0.7 0.03 var(--h)); --ink: oklch(0.94 0.01 var(--h)); --accent: oklch(0.75 0.14 var(--h)); --on: oklch(0.18 0.02 var(--h)); }
      .head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--line); padding-bottom: 8px; }
      .head b { font: 500 18px 'Fraunces', serif; }
      .head small { font: 500 10.5px 'Spline Sans Mono', monospace; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
      .row { display: flex; justify-content: space-between; align-items: center; color: var(--ink); }
      .sw { width: 30px; height: 18px; border-radius: 99px; background: var(--line); position: relative; }
      .sw::after { content: ""; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: var(--surface); box-shadow: 0 1px 2px oklch(0 0 0 / .3); }
      .sw.on { background: var(--accent); } .sw.on::after { left: 14px; }
      button { justify-self: start; border: 0; border-radius: 8px; padding: 8px 14px; background: var(--accent); color: var(--on); font: 600 13px 'Schibsted Grotesk', sans-serif; }
      .chips { display: flex; gap: 4px; margin-top: 4px; } .chips i { flex: 1; height: 16px; border-radius: 4px; background: var(--l); box-shadow: inset 0 0 0 1px oklch(0.5 0 0 / .15); }
      .ctl { display: flex; align-items: center; gap: 12px; font: 500 11px 'Spline Sans Mono', monospace; color: oklch(0.35 0.03 var(--h)); }
      .ctl input { flex: 1; accent-color: oklch(0.55 0.17 var(--h)); }
      @container (width < 520px) { .pair { grid-template-columns: 1fr; } .t { padding: 12px; gap: 7px; } .chips { display: none; } }
    `,
    html: html`<div class="x"><div class="pair">${themePanel('light')}${themePanel('dark')}</div>
      <label class="ctl">hue <input type="range" min="0" max="360" value="255"> <output>oklch(L C 255)</output></label></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const x = root.querySelector<HTMLElement>('.x')!;
      const input = root.querySelector<HTMLInputElement>('input')!;
      const out = root.querySelector('output')!;
      input.addEventListener(
        'input',
        () => {
          x.style.setProperty('--h', input.value);
          out.textContent = `oklch(L C ${input.value})`;
        },
        { signal },
      );
    },
  },
  {
    id: 'aurora-gradient',
    css: css`
      .x { background: #1a1410; overflow: hidden; display: grid; place-content: center; text-align: center; color: #fff4e8; font-family: 'Fraunces', serif; }
      .b { position: absolute; border-radius: 50%; filter: blur(50px); opacity: .85; mix-blend-mode: screen; }
      .b1 { width: 55%; aspect-ratio: 1; background: #ff7a3d; left: -8%; top: -20%; animation: d1 18s ease-in-out infinite alternate; }
      .b2 { width: 50%; aspect-ratio: 1; background: #e8466b; right: -6%; top: 10%; animation: d2 22s ease-in-out infinite alternate; }
      .b3 { width: 46%; aspect-ratio: 1; background: #f5c65b; left: 30%; bottom: -35%; animation: d3 20s ease-in-out infinite alternate; }
      .b4 { width: 30%; aspect-ratio: 1; background: #2f8f83; left: 8%; bottom: -10%; animation: d2 26s ease-in-out infinite alternate-reverse; opacity: .6; }
      @keyframes d1 { to { translate: 30% 25%; } } @keyframes d2 { to { translate: -25% 20%; } } @keyframes d3 { to { translate: 15% -30%; } }
      .veil { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 30%, rgb(26 20 16 / .55)); }
      .c { position: relative; padding: 0 20px; }
      small { font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .14em; text-transform: uppercase; opacity: .8; }
      h2 { margin: 10px 0 0; font-weight: 300; font-size: clamp(36px, 7cqw, 80px); line-height: 1; letter-spacing: -.02em; }
      h2 em { font-weight: 500; }
    `,
    html: html`<div class="x"><i class="b b1"></i><i class="b b2"></i><i class="b b3"></i><i class="b b4"></i><i class="veil"></i>
      <div class="c"><small>Solstice festival · June 21</small><h2>The longest <em>evening</em><br>of the year</h2></div></div>`,
  },
  {
    id: 'minimal-monochrome',
    css: css`
      .x { background: #fff; color: #111; display: grid; grid-template-columns: 1.1fr 1fr; font-family: 'Schibsted Grotesk', sans-serif; }
      .img { background: linear-gradient(180deg, #e9e9e7, #cfcfcc); position: relative; }
      .img::after { content: ""; position: absolute; left: 50%; top: 50%; translate: -50% -46%; width: 40%; aspect-ratio: 3 / 4; background: linear-gradient(160deg, #3a3a3a, #111); border-radius: 46% 46% 8px 8px / 30% 30% 8px 8px; box-shadow: 0 30px 40px -20px rgb(0 0 0 / .5); }
      .info { padding: 28px clamp(18px, 4cqw, 44px); display: flex; flex-direction: column; justify-content: center; gap: 14px; }
      .k { font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #777; }
      h3 { margin: 0; font: 400 clamp(26px, 4.4cqw, 40px)/1.05 'Fraunces', serif; letter-spacing: -.01em; }
      .price { font-size: 15px; }
      .sizes { display: flex; gap: 6px; } .sizes span { width: 38px; height: 38px; display: grid; place-items: center; border: 1px solid #ccc; font-size: 12px; }
      .sizes span.on { background: #111; color: #fff; border-color: #111; } .sizes span.out { color: #bbb; text-decoration: line-through; }
      .btn { margin-top: 6px; background: #111; color: #fff; text-align: center; padding: 13px; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; }
      .note { font-size: 12px; color: #777; }
      @container (width < 520px) { .x { grid-template-columns: 1fr; grid-template-rows: 40% 1fr; } .info { padding: 16px; gap: 8px; } }
    `,
    html: html`<div class="x"><div class="img"></div><div class="info">
      <div class="k">Outerwear · 03</div><h3>Wool overcoat, double faced</h3><div class="price">€ 640</div>
      <div class="sizes"><span>44</span><span class="on">46</span><span>48</span><span class="out">50</span><span>52</span></div>
      <div class="btn">Add to bag</div><div class="note">Made in Biella. Free returns within 30 days.</div></div></div>`,
  },
  {
    id: 'duotone',
    css: css`
      .x { background: #111; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-family: 'Schibsted Grotesk', sans-serif; }
      .d { position: relative; overflow: hidden; isolation: isolate; background: var(--hi); }
      .d svg { position: absolute; inset: 0; width: 100%; height: 100%; mix-blend-mode: multiply; filter: contrast(1.1); }
      .d::after { content: ""; position: absolute; inset: 0; background: var(--lo); mix-blend-mode: lighten; }
      .d span { position: absolute; left: 12px; bottom: 10px; z-index: 2; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: var(--hi); mix-blend-mode: normal; }
      @container (width < 520px) { .x { grid-template-columns: 1fr 1fr; } .d:nth-child(3) { display: none; } }
    `,
    html: html`<div class="x">
      <div class="d" style="--hi:#ffd166;--lo:#3a0ca3">${PHOTO}<span>Gold / indigo</span></div>
      <div class="d" style="--hi:#ff8fab;--lo:#0b3d2e">${PHOTO}<span>Rose / pine</span></div>
      <div class="d" style="--hi:#e9f5db;--lo:#c1121f">${PHOTO}<span>Mint / signal</span></div>
    </div>`,
  },
  {
    id: 'dopamine-color',
    css: css`
      .x { background: #ff7a1a; display: grid; grid-template-columns: 1.2fr 1fr 1fr; grid-template-rows: 1fr 1fr; font-family: 'Bricolage Grotesque', sans-serif; color: #1a1033; }
      .x > * { position: relative; overflow: hidden; }
      .a { grid-row: 1 / 3; background: #ff7a1a; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; }
      .a h2 { margin: 0; font-size: clamp(40px, 8.5cqw, 96px); line-height: .88; letter-spacing: -.04em; font-weight: 800; }
      .a p { margin: 0; font: 500 14px/1.35 'Schibsted Grotesk', sans-serif; max-width: 22ch; }
      .b { background: #ff5fa8; } .b::after { content: ""; position: absolute; inset: 18% 18% -40%; border-radius: 50% 50% 0 0; background: #2d3bff; }
      .c { background: #c6f432; } .c::after { content: ""; position: absolute; width: 70%; aspect-ratio: 1; border-radius: 50%; background: #1a1033; left: 15%; top: 15%; box-shadow: 0 0 0 14px #c6f432, 0 0 0 28px #ff5fa8; }
      .d { background: #2d3bff; } .d::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, #ffd23f 0 14px, transparent 0 28px); clip-path: circle(40% at 50% 50%); }
      .e { background: #ffd23f; display: grid; place-items: center; font-size: clamp(22px, 4cqw, 40px); font-weight: 800; letter-spacing: -.03em; }
    `,
    html: html`<div class="x"><div class="a"><h2>Make it loud.</h2><p>Summer menu, out now. Mango chili, yuzu soda, black sesame soft serve.</p></div><div class="b"></div><div class="c"></div><div class="d"></div><div class="e">-30%</div></div>`,
  },
];
