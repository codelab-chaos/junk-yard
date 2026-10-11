import { css, html, type Example } from './types';

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ELEVATIONS = [0, 1, 2, 3, 4, 5];

export const SURFACE_EXAMPLES: Example[] = [
  {
    id: 'liquid-glass',
    css: css`
      .x { background: #0e1a1f; overflow: hidden; font-family: 'Schibsted Grotesk', sans-serif; color: #fff; }
      .art { position: absolute; inset: 0; background:
        radial-gradient(circle at 22% 30%, #ffb347 0 14%, transparent 15%),
        radial-gradient(circle at 75% 25%, #ff5e62 0 18%, transparent 19%),
        radial-gradient(circle at 60% 78%, #3fc5a6 0 20%, transparent 21%),
        linear-gradient(135deg, #10343d, #1f5162 50%, #0e1a1f); animation: drift 14s ease-in-out infinite alternate; }
      .art::after { content: "AFTER HOURS"; position: absolute; left: 6%; top: 46%; font: 800 clamp(40px, 11cqw, 130px)/.9 'Bricolage Grotesque', sans-serif; letter-spacing: -.04em; color: #f4efe6; }
      @keyframes drift { to { background-position: 30px -20px, -40px 30px, 20px -30px, 0 0; } }
      .glass { position: absolute; background: rgb(255 255 255 / .14); backdrop-filter: blur(18px) saturate(1.7); -webkit-backdrop-filter: blur(18px) saturate(1.7);
        box-shadow: inset 0 1px 0 rgb(255 255 255 / .55), inset 0 -1px 0 rgb(255 255 255 / .12), inset 1px 0 0 rgb(255 255 255 / .2), 0 12px 32px rgb(0 0 0 / .25); border-radius: 26px; }
      .player { left: 50%; translate: -50% 0; bottom: 22%; width: min(86%, 400px); padding: 14px; display: grid; grid-template-columns: 52px 1fr auto; gap: 12px; align-items: center; }
      .cover { width: 52px; aspect-ratio: 1; border-radius: 12px; background: linear-gradient(135deg, #ffb347, #ff5e62); }
      .meta b { display: block; font-size: 15px; } .meta span { font-size: 12.5px; opacity: .75; }
      .meta .bar { height: 4px; border-radius: 4px; background: rgb(255 255 255 / .25); margin-top: 8px; } .meta .bar i { display: block; width: 38%; height: 100%; border-radius: inherit; background: #fff; }
      .play { width: 42px; aspect-ratio: 1; border-radius: 50%; background: rgb(255 255 255 / .9); display: grid; place-items: center; }
      .play::after { content: ""; border-left: 12px solid #0e1a1f; border-block: 8px solid transparent; margin-left: 4px; }
      .tabs { left: 50%; translate: -50% 0; bottom: 5%; padding: 6px; display: flex; gap: 4px; border-radius: 99px; }
      .tabs span { padding: 7px 14px; border-radius: 99px; font-size: 12.5px; } .tabs span.on { background: rgb(255 255 255 / .28); }
    `,
    html: html`<div class="x"><div class="art"></div>
      <div class="glass player"><div class="cover"></div><div class="meta"><b>Slow Lanes</b><span>Neon Harbour</span><div class="bar"><i></i></div></div><div class="play"></div></div>
      <div class="glass tabs"><span class="on">Listen</span><span>Browse</span><span>Radio</span><span>Library</span></div></div>`,
  },
  {
    id: 'neubrutalism',
    css: css`
      .x { background: #ffe14d; display: grid; place-items: center; font-family: 'Bricolage Grotesque', sans-serif; color: #000; padding: 18px; }
      .card { width: min(100%, 440px); background: #fff; border: 3px solid #000; border-radius: 10px; box-shadow: 8px 8px 0 #000; padding: 22px; display: grid; gap: 14px; position: relative; }
      .tag { position: absolute; top: -16px; right: 18px; background: #ff6bcb; border: 3px solid #000; border-radius: 99px; padding: 3px 12px; font-weight: 700; font-size: 13px; rotate: 6deg; }
      h3 { margin: 0; font-size: clamp(26px, 4.6cqw, 36px); line-height: 1; letter-spacing: -.03em; font-weight: 800; }
      p { margin: 0; font: 500 14px/1.4 'Schibsted Grotesk', sans-serif; }
      .row { display: flex; gap: 12px; flex-wrap: wrap; }
      button { font: 700 15px 'Bricolage Grotesque', sans-serif; border: 3px solid #000; border-radius: 8px; padding: 10px 18px; background: #6bd4ff; box-shadow: 4px 4px 0 #000; transition: translate .08s, box-shadow .08s; color: #000; }
      button.alt { background: #fff; }
      button:active { translate: 4px 4px; box-shadow: 0 0 0 #000; }
      .inp { border: 3px solid #000; border-radius: 8px; padding: 10px 12px; font: 500 14px 'Schibsted Grotesk', sans-serif; background: #fffbe6; }
    `,
    html: html`<div class="x"><div class="card"><span class="tag">New!</span>
      <h3>Sell your zine in five minutes.</h3><p>No storefront to design. Paste a link, set a price, get paid.</p>
      <div class="inp">yourname@studio.cool</div>
      <div class="row"><button>Get started</button><button class="alt">See examples</button></div></div></div>`,
  },
  {
    id: 'claymorphism',
    css: css`
      .x { background: #f3e9ff; display: grid; place-items: center; font-family: 'Bricolage Grotesque', sans-serif; color: #3b2a55; padding: 18px; }
      .w { display: grid; grid-template-columns: 1.2fr 1fr; gap: 18px; width: min(100%, 560px); }
      .clay { border-radius: 32px; box-shadow: 14px 14px 30px rgb(120 80 170 / .25), inset -8px -8px 16px rgb(80 40 140 / .18), inset 8px 8px 16px rgb(255 255 255 / .75); }
      .main { background: #c9b2ff; padding: 22px; display: grid; gap: 10px; }
      .main b { font-size: 28px; letter-spacing: -.02em; } .main span { font: 500 13px 'Schibsted Grotesk', sans-serif; }
      .prog { height: 18px; border-radius: 99px; background: #b29bf0; box-shadow: inset 3px 3px 6px rgb(80 40 140 / .3), inset -3px -3px 6px rgb(255 255 255 / .4); }
      .prog i { display: block; width: 68%; height: 100%; border-radius: inherit; background: #ffb4d0; box-shadow: inset -3px -3px 6px rgb(200 60 120 / .3), inset 3px 3px 6px rgb(255 255 255 / .7); }
      .side { display: grid; gap: 18px; }
      .s { background: #ffd8a8; padding: 16px; display: flex; align-items: center; gap: 12px; font-weight: 600; }
      .s.b { background: #b8f0d8; }
      .ball { width: 44px; aspect-ratio: 1; border-radius: 50%; background: #ff8fab; box-shadow: inset -5px -5px 10px rgb(180 40 90 / .35), inset 5px 5px 10px rgb(255 255 255 / .7), 4px 6px 12px rgb(120 80 170 / .25); }
      .s.b .ball { background: #5ccfa0; box-shadow: inset -5px -5px 10px rgb(20 110 80 / .35), inset 5px 5px 10px rgb(255 255 255 / .7), 4px 6px 12px rgb(120 80 170 / .25); }
      @container (width < 520px) { .w { grid-template-columns: 1fr; } }
    `,
    html: html`<div class="x"><div class="w"><div class="clay main"><span>Spanish · Unit 4</span><b>At the market</b><div class="prog"><i></i></div><span>17 of 25 words learned</span></div>
      <div class="side"><div class="clay s"><i class="ball"></i>Daily streak 12</div><div class="clay s b"><i class="ball"></i>Review 8 words</div></div></div></div>`,
  },
  {
    id: 'y2k-chrome',
    css: css`
      .x { background: conic-gradient(from 200deg at 60% 40%, #c7f0ff, #e5c9ff, #ffd6f2, #d4fff0, #c7f0ff); display: grid; place-content: center; text-align: center; font-family: 'Bricolage Grotesque', sans-serif; overflow: hidden; }
      .x::before { content: ""; position: absolute; inset: 0; background: repeating-radial-gradient(circle at 60% 40%, rgb(255 255 255 / .35) 0 2px, transparent 2px 22px); }
      .burst { position: absolute; width: 130px; aspect-ratio: 1; right: 8%; top: 10%; background: #ff3ea5; clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); animation: spin 12s linear infinite; }
      .burst2 { width: 60px; left: 10%; top: auto; bottom: 14%; right: auto; background: #4dd2ff; animation-duration: 8s; }
      @keyframes spin { to { rotate: 1turn; } }
      h2 { position: relative; margin: 0; font-size: clamp(58px, 15cqw, 170px); font-weight: 800; font-stretch: 75%; line-height: .85; letter-spacing: -.03em;
        background: linear-gradient(180deg, #fdfdfd 0%, #9aa3b5 38%, #ffffff 48%, #3b4254 52%, #b9c2d6 75%, #f4f7ff 100%); -webkit-background-clip: text; background-clip: text; color: transparent;
        -webkit-text-stroke: 1.5px rgb(40 50 80 / .6); filter: drop-shadow(0 4px 0 rgb(80 60 160 / .35)); }
      .win { position: relative; margin: 16px auto 0; width: 260px; background: #e8e8f0; border: 2px solid; border-color: #fff #6b6b80 #6b6b80 #fff; font: 12px 'Spline Sans Mono', monospace; text-align: left; }
      .win .tb { background: linear-gradient(90deg, #2a2aa8, #c03ad6); color: #fff; padding: 3px 6px; display: flex; justify-content: space-between; }
      .win p { margin: 0; padding: 8px 10px; color: #222; }
    `,
    html: html`<div class="x"><i class="burst"></i><i class="burst burst2"></i><h2>CYBER<br>2000</h2>
      <div class="win"><div class="tb"><span>welcome.exe</span><span>_ □ x</span></div><p>Loading the future... 98%</p></div></div>`,
  },
  {
    id: 'grain-texture',
    css: css`
      .x { display: grid; grid-template-columns: 1fr 1fr; font-family: 'Fraunces', serif; color: #fff4e6; }
      .p { position: relative; background: linear-gradient(160deg, #f6a14b 0%, #d9534f 45%, #5b2348 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 22px; overflow: hidden; }
      .p.g::after { content: ""; position: absolute; inset: 0; background-image: ${NOISE}; mix-blend-mode: overlay; opacity: .55; pointer-events: none; }
      .p b { position: relative; z-index: 1; font-weight: 400; font-size: clamp(26px, 4.4cqw, 44px); line-height: 1; }
      .p small { position: relative; z-index: 1; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; opacity: .85; margin-top: 8px; }
    `,
    html: html`<div class="x"><div class="p"><b>Smooth</b><small>Flat gradient, visible banding</small></div><div class="p g"><b>Printed</b><small>feTurbulence grain, overlay 55%</small></div></div>`,
  },
  {
    id: 'tactile-skeuomorphism',
    css: css`
      .x { background: #d9d7d2; display: grid; place-items: center; font-family: 'Spline Sans Mono', monospace; color: #3a3935; padding: 16px; }
      .dev { width: min(100%, 520px); background: linear-gradient(180deg, #efede8, #dfddd7); border-radius: 18px; padding: 22px; box-shadow: 0 1px 0 #fff inset, 0 -2px 0 rgb(0 0 0 / .08) inset, 0 20px 40px -12px rgb(40 35 25 / .35), 0 2px 4px rgb(40 35 25 / .15);
        display: grid; grid-template-columns: auto 1fr auto; gap: 22px; align-items: center; }
      .lbl { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: #77746c; text-align: center; margin-top: 8px; }
      .knob { width: 92px; aspect-ratio: 1; border-radius: 50%; position: relative;
        background: repeating-conic-gradient(from 0deg, #cfcdc7 0 4deg, #e9e7e2 4deg 8deg); box-shadow: 0 6px 10px rgb(40 35 25 / .3), 0 1px 0 #fff inset; rotate: -40deg; transition: rotate .3s; }
      .knob::before { content: ""; position: absolute; inset: 14%; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fbfaf7, #d8d6d0); box-shadow: 0 1px 2px rgb(0 0 0 / .2); }
      .knob::after { content: ""; position: absolute; left: 50%; top: 18%; width: 4px; height: 16%; translate: -50% 0; border-radius: 2px; background: #ff5a1f; }
      .knob:hover { rotate: 60deg; }
      .keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .key { aspect-ratio: 1; border-radius: 10px; background: linear-gradient(180deg, #f8f7f3, #e2e0da); box-shadow: 0 4px 0 #b9b6ae, 0 6px 8px rgb(40 35 25 / .25), 0 1px 0 #fff inset; display: grid; place-items: center; font-size: 12px; transition: translate .06s, box-shadow .06s; user-select: none; }
      .key.or { background: linear-gradient(180deg, #ff7a3d, #ec5a1c); color: #fff; box-shadow: 0 4px 0 #b2410f, 0 6px 8px rgb(40 35 25 / .25), 0 1px 0 rgb(255 255 255 / .5) inset; }
      .key:active { translate: 0 3px; box-shadow: 0 1px 0 #b9b6ae, 0 2px 3px rgb(40 35 25 / .25), 0 1px 0 #fff inset; }
      .sw { width: 34px; height: 70px; border-radius: 18px; background: #c7c5bf; box-shadow: inset 0 2px 5px rgb(0 0 0 / .3); position: relative; cursor: pointer; }
      .sw input { appearance: none; position: absolute; inset: 0; margin: 0; cursor: pointer; }
      .sw i { position: absolute; left: 3px; right: 3px; top: 3px; height: 30px; border-radius: 15px; background: linear-gradient(180deg, #fbfaf7, #dddbd5); box-shadow: 0 3px 5px rgb(0 0 0 / .3), 0 1px 0 #fff inset; transition: top .15s cubic-bezier(.3,1.4,.6,1); pointer-events: none; }
      .sw input:checked + i { top: 37px; }
      .led { width: 8px; height: 8px; border-radius: 50%; background: #8a8780; margin: 0 auto 8px; }
      .sw:has(input:checked) ~ .led, .swc:has(input:checked) .led { background: #ff5a1f; box-shadow: 0 0 8px #ff5a1f; }
      @container (width < 520px) { .dev { grid-template-columns: auto 1fr; } .swc { display: none; } }
    `,
    html: html`<div class="x"><div class="dev">
      <div><div class="knob"></div><div class="lbl">Tone</div></div>
      <div><div class="keys"><div class="key">1</div><div class="key">2</div><div class="key or">rec</div><div class="key">4</div><div class="key">5</div><div class="key">6</div></div></div>
      <div class="swc"><div class="led"></div><label class="sw"><input type="checkbox" checked aria-label="Power"><i></i></label><div class="lbl">Power</div></div>
    </div></div>`,
  },
  {
    id: 'material-elevation',
    css: css`
      .x { background: #f3f1ec; display: grid; grid-template-rows: 1fr auto; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #1f1d1a; }
      .row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; align-items: center; }
      .s { aspect-ratio: 1; border-radius: 12px; background: #fff; display: grid; place-items: center; text-align: center; transition: box-shadow .25s, translate .25s; box-shadow: var(--e); }
      .s b { font: 500 22px 'Spline Sans Mono', monospace; display: block; } .s small { font-size: 11px; color: #77736b; }
      .s:hover { translate: 0 -4px; box-shadow: 0 12px 17px 2px rgb(30 25 15 / .14), 0 5px 22px 4px rgb(30 25 15 / .12); }
      .s[data-e="0"] { --e: 0 0 0 1px #e2dfd8; background: #f3f1ec; }
      .s[data-e="1"] { --e: 0 1px 2px rgb(30 25 15 / .3), 0 1px 3px 1px rgb(30 25 15 / .15); }
      .s[data-e="2"] { --e: 0 1px 2px rgb(30 25 15 / .3), 0 2px 6px 2px rgb(30 25 15 / .15); }
      .s[data-e="3"] { --e: 0 1px 3px rgb(30 25 15 / .3), 0 4px 8px 3px rgb(30 25 15 / .15); }
      .s[data-e="4"] { --e: 0 2px 3px rgb(30 25 15 / .3), 0 6px 10px 4px rgb(30 25 15 / .15); }
      .s[data-e="5"] { --e: 0 4px 4px rgb(30 25 15 / .3), 0 8px 12px 6px rgb(30 25 15 / .15); }
      .foot { display: flex; justify-content: space-between; align-items: end; }
      .foot p { margin: 0; font-size: 12.5px; color: #77736b; max-width: 40ch; }
      .fab { width: 56px; height: 56px; border-radius: 16px; background: #ffd9c2; color: #3a1b08; display: grid; place-items: center; font-size: 28px; box-shadow: 0 1px 3px rgb(30 25 15 / .3), 0 4px 8px 3px rgb(30 25 15 / .15); }
      @container (width < 560px) { .row { grid-template-columns: repeat(3, 1fr); } }
    `,
    html: html`<div class="x"><div class="row">${ELEVATIONS.map((e) => `<div class="s" data-e="${e}"><div><b>${e}</b><small>level</small></div></div>`).join('')}</div>
      <div class="foot"><p>Each level pairs a tight key shadow with a soft ambient one. Hover a surface to raise it.</p><div class="fab" aria-label="Create">+</div></div></div>`,
  },
  {
    id: 'flat-design',
    css: css`
      .x { background: #ecf0f1; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 1fr); gap: 8px; padding: 8px; font-family: 'Schibsted Grotesk', sans-serif; color: #fff; }
      .t { padding: 14px; display: flex; flex-direction: column; justify-content: space-between; background: var(--c); }
      .t span { font-size: 13px; font-weight: 600; }
      .t svg { width: 40px; height: 40px; }
      .w2 { grid-column: span 2; }
      .t b { font-weight: 300; font-size: clamp(30px, 6cqw, 58px); line-height: 1; }
    `,
    html: html`<div class="x">
      <div class="t w2" style="--c:#2980b9"><b>21°</b><span>Weather · Clear</span></div>
      <div class="t" style="--c:#e67e22"><svg viewBox="0 0 40 40"><rect x="6" y="9" width="28" height="24" fill="none" stroke="#fff" stroke-width="3"/><path d="M6 16h28M13 5v8M27 5v8" stroke="#fff" stroke-width="3"/></svg><span>Calendar</span></div>
      <div class="t" style="--c:#27ae60"><svg viewBox="0 0 40 40"><path d="M5 9h30v20H16l-8 6v-6H5z" fill="#fff"/></svg><span>Messages</span></div>
      <div class="t" style="--c:#8e44ad"><svg viewBox="0 0 40 40"><circle cx="13" cy="28" r="6" fill="#fff"/><path d="M19 28V7l14-3v19" fill="none" stroke="#fff" stroke-width="3"/><circle cx="29" cy="24" r="5" fill="#fff"/></svg><span>Music</span></div>
      <div class="t" style="--c:#c0392b"><svg viewBox="0 0 40 40"><rect x="4" y="9" width="32" height="22" fill="#fff"/><path d="M4 9l16 12L36 9" fill="none" stroke="#c0392b" stroke-width="3"/></svg><span>Mail</span></div>
      <div class="t w2" style="--c:#16a085"><b>4 new</b><span>Photos · Shared album</span></div>
    </div>`,
  },
  {
    id: 'web-brutalism',
    css: css`
      .x { background: #fff; color: #000; font: 16px/1.3 'Times New Roman', Times, serif; padding: 12px 16px; overflow: hidden; }
      h1 { font-size: 34px; margin: 0 0 4px; font-weight: bold; }
      a { color: #00e; } a:visited { color: #551a8b; }
      hr { border: 0; border-top: 1px solid #000; margin: 8px 0; }
      table { border-collapse: collapse; width: 100%; font-size: 14px; } td, th { border: 1px solid #000; padding: 4px 6px; text-align: left; vertical-align: top; }
      .mono { font-family: 'Courier New', monospace; font-size: 13px; }
      mark { background: #ff0; }
      .marq { background: #000; color: #0f0; font-family: 'Courier New', monospace; font-size: 13px; padding: 2px 6px; white-space: nowrap; overflow: hidden; }
      .marq span { display: inline-block; animation: m 14s linear infinite; } @keyframes m { from { translate: 100% 0; } to { translate: -100% 0; } }
    `,
    html: html`<div class="x">
      <h1>JANE DOE / WORK / 2014–2026</h1>
      <div class="mono">last updated: <mark>today</mark> · <a href="#">index</a> · <a href="#">about</a> · <a href="#">rss</a></div><hr>
      <table><tr><th>year</th><th>project</th><th>notes</th></tr>
        <tr><td>2026</td><td><a href="#">a website that is only a list</a></td><td>this one.</td></tr>
        <tr><td>2024</td><td><a href="#">printed matter</a></td><td>48 pages, risograph, sold out</td></tr>
        <tr><td>2021</td><td><a href="#">no javascript club</a></td><td>still running</td></tr>
        <tr><td>2017</td><td><a href="#">untitled (blue links)</a></td><td>exhibited, then deleted</td></tr></table><hr>
      <div class="marq"><span>THE WEB WAS NEVER BROKEN · VIEW SOURCE · THE WEB WAS NEVER BROKEN · VIEW SOURCE</span></div>
    </div>`,
  },
  {
    id: 'squircle-corners',
    css: css`
      .x { background: #f2f0eb; display: grid; grid-template-rows: 1fr auto; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #24221e; }
      .cmp { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center; }
      .col { display: grid; justify-items: center; gap: 12px; }
      .col small { font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #7c776e; }
      .sh { width: clamp(110px, 24cqw, 200px); aspect-ratio: 1; background: linear-gradient(160deg, #ff8a4c, #e2462b); border-radius: 28%; box-shadow: 0 16px 30px -10px rgb(160 50 20 / .5); }
      .sq { background: linear-gradient(160deg, #3c86ff, #2347d6); box-shadow: 0 16px 30px -10px rgb(30 60 180 / .5); }
      @supports (corner-shape: squircle) { .sq { border-radius: 50%; corner-shape: squircle; } }
      .icons { display: flex; gap: 10px; justify-content: center; }
      .icons i { width: 34px; aspect-ratio: 1; border-radius: 24%; background: var(--c); }
      @supports (corner-shape: squircle) { .icons i { border-radius: 40%; corner-shape: squircle; } }
      .st { font-size: 12.5px; color: #7c776e; text-align: center; margin: 14px 0 0; }
      .st b { color: #24221e; }
      .yes { display: none; } @supports (corner-shape: squircle) { .yes { display: inline; } .no { display: none; } }
    `,
    html: html`<div class="x"><div class="cmp">
      <div class="col"><div class="sh"></div><small>border-radius: 28%</small></div>
      <div class="col"><div class="sh sq"></div><small>corner-shape: squircle</small><div class="icons"><i style="--c:#2bb673"></i><i style="--c:#f4b400"></i><i style="--c:#7a5af8"></i><i style="--c:#ff5a5f"></i></div></div>
    </div><p class="st"><b class="yes">Your browser draws native squircles.</b><b class="no">Your browser shows the border-radius fallback.</b> Continuous curvature has no visible joint where the curve meets the edge.</p></div>`,
  },
  {
    id: 'dithered-pixel',
    css: css`
      .x { background: #fff; display: grid; place-items: center; font-family: 'Spline Sans Mono', monospace; color: #000; padding: 14px;
        background-image: repeating-conic-gradient(#000 0 25%, #fff 0 50%); background-size: 4px 4px; }
      :host(:not([data-interactive])) .x { background: #8c8c8c; }
      .win { width: min(100%, 520px); background: #fff; border: 2px solid #000; box-shadow: 4px 4px 0 #000; }
      .tb { height: 22px; border-bottom: 2px solid #000; display: grid; place-items: center; font-size: 12px; font-weight: 700;
        background: repeating-linear-gradient(180deg, #000 0 2px, #fff 2px 4px) content-box; padding: 4px 6px; }
      .tb span { background: #fff; padding: 0 8px; line-height: 14px; }
      .body { display: grid; grid-template-columns: 1fr 1fr; }
      .scene { aspect-ratio: 4 / 3; position: relative; overflow: hidden; border-right: 2px solid #000; image-rendering: pixelated; }
      .band { position: absolute; left: 0; right: 0; height: 20%; }
      .d1 { top: 0; background: #fff; }
      .d2 { top: 20%; background: repeating-conic-gradient(#000 0 25%, #fff 0 100%) 0 0 / 4px 4px; }
      .d3 { top: 40%; background: repeating-conic-gradient(#000 0 25%, #fff 0 50%) 0 0 / 4px 4px; }
      .d4 { top: 60%; background: repeating-conic-gradient(#fff 0 25%, #000 0 100%) 0 0 / 4px 4px; }
      .d5 { top: 80%; background: #000; }
      .sun { position: absolute; width: 30%; aspect-ratio: 1; left: 56%; top: 14%; border-radius: 50%; background: #fff; border: 2px solid #000; }
      .hill { position: absolute; left: -10%; right: -10%; bottom: -30%; height: 70%; border-radius: 50%; background: repeating-conic-gradient(#000 0 25%, #fff 0 50%) 0 0 / 2px 2px; border-top: 2px solid #000; }
      .txt { padding: 12px; font-size: 12px; line-height: 1.5; }
      .txt b { display: block; font-size: 15px; margin-bottom: 6px; }
      .btn { display: inline-block; margin-top: 10px; border: 2px solid #000; border-radius: 8px; padding: 3px 14px; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000; font-weight: 700; }
      .cur { display: inline-block; width: 8px; height: 13px; background: #000; vertical-align: -2px; animation: blink 1s steps(1) infinite; }
      @keyframes blink { 50% { opacity: 0; } }
    `,
    html: html`<div class="x"><div class="win"><div class="tb"><span>Dither.app</span></div><div class="body">
      <div class="scene"><i class="band d1"></i><i class="band d2"></i><i class="band d3"></i><i class="band d4"></i><i class="band d5"></i><i class="sun"></i><i class="hill"></i></div>
      <div class="txt"><b>Ordered dither</b>Five tones from two colors: white, 25, 50, 75 percent and black, each a 4px pattern.<span class="cur"></span><br><span class="btn">OK</span></div>
    </div></div></div>`,
  },
];
