import { css, html, later, reducedMotion, type Example } from './types';

const SLIDES = [
  ['Kyoto', 'Moss gardens and early trains', '#5f7a52,#c8d4a3'],
  ['Oaxaca', 'Mole, mezcal, markets', '#b84a2e,#f0b46a'],
  ['Tromsø', 'Northern lights in March', '#1f3550,#6fb0a8'],
  ['Matera', 'Cave hotels and quiet', '#a88563,#efdcc0'],
  ['Hobart', 'Cold water, warm bread', '#2c4a5e,#a8c3cf'],
];

const ANSWER =
  'Start with the floor plan, not the furniture. Measure the room, mark where light enters, then place the largest piece where you want the eye to land first.';

export const INTERACTION_EXAMPLES: Example[] = [
  {
    id: 'micro-interactions',
    css: css`
      .x { background: #faf7f2; display: grid; place-content: center; gap: 26px; font-family: 'Schibsted Grotesk', sans-serif; color: #24201b; }
      .row { display: flex; gap: 22px; justify-content: center; align-items: center; flex-wrap: wrap; }
      button { border: 1px solid #e3ddd3; background: #fff; border-radius: 99px; height: 52px; padding: 0 20px; display: inline-flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; color: #24201b; position: relative; transition: scale .15s, background .2s, border-color .2s; }
      button:active { scale: .94; }
      .heart svg { width: 22px; height: 22px; transition: scale .35s cubic-bezier(.3,1.8,.5,1); }
      .heart path { fill: none; stroke: #24201b; stroke-width: 2; transition: fill .2s, stroke .2s; }
      .heart[aria-pressed=true] path { fill: #ef3e36; stroke: #ef3e36; }
      .heart[aria-pressed=true] svg { scale: 1.2; }
      .heart i { position: absolute; left: 31px; top: 50%; width: 6px; height: 6px; border-radius: 50%; background: #ef3e36; opacity: 0; }
      .heart[aria-pressed=true] i { animation: burst .5s ease-out; }
      .heart i:nth-of-type(1) { --a: 0deg; } .heart i:nth-of-type(2) { --a: 60deg; } .heart i:nth-of-type(3) { --a: 120deg; } .heart i:nth-of-type(4) { --a: 180deg; } .heart i:nth-of-type(5) { --a: 240deg; } .heart i:nth-of-type(6) { --a: 300deg; }
      @keyframes burst { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--a)) translateY(0); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--a)) translateY(-26px) scale(.3); } }
      .copy { min-width: 150px; justify-content: center; overflow: hidden; }
      .copy span { transition: translate .3s cubic-bezier(.2,.8,.2,1), opacity .2s; }
      .copy .ok { position: absolute; translate: 0 120%; opacity: 0; color: #1f7a4d; }
      .copy[data-done] .ok { translate: 0 0; opacity: 1; } .copy[data-done] .lb { translate: 0 -120%; opacity: 0; }
      .copy[data-done] { border-color: #9bd1b4; background: #eefaf3; }
      .tog { width: 64px; padding: 0; justify-content: flex-start; background: #e9e4da; border: 0; }
      .tog::after { content: ""; position: absolute; left: 6px; width: 40px; height: 40px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgb(0 0 0 / .18); transition: left .35s cubic-bezier(.3,1.5,.5,1), width .15s; }
      .tog:active::after { width: 48px; }
      .tog[aria-pressed=true] { background: #24201b; } .tog[aria-pressed=true]::after { left: 18px; }
      .tog { width: 76px; }
      p { margin: 0; text-align: center; font-size: 12.5px; color: #8b8478; }
      @container (width > 600px) { .row, p { zoom: 1.5; } }
    `,
    html: html`<div class="x"><div class="row">
      <button class="heart" aria-pressed="true" aria-label="Like"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><i></i><i></i><i></i><i></i><i></i><i></i>128</button>
      <button class="copy"><span class="lb">Copy link</span><span class="ok">Copied</span></button>
      <button class="tog" aria-pressed="false" aria-label="Notifications"></button>
    </div><p>Each control answers within 300ms, then gets out of the way.</p></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      root.querySelectorAll<HTMLButtonElement>('[aria-pressed]').forEach((b) =>
        b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')), { signal }),
      );
      const copy = root.querySelector<HTMLButtonElement>('.copy')!;
      copy.addEventListener(
        'click',
        () => {
          copy.toggleAttribute('data-done', true);
          later(1400, signal, () => copy.removeAttribute('data-done'));
        },
        { signal },
      );
    },
  },
  {
    id: 'spatial-tilt',
    css: css`
      .x { background: radial-gradient(circle at 50% 30%, #2c2a3a, #121118); display: grid; place-items: center; perspective: 900px; font-family: 'Schibsted Grotesk', sans-serif; --rx: 0deg; --ry: 0deg; --gx: 50%; --gy: 30%; }
      .card { width: min(80%, 340px); aspect-ratio: 1.586; border-radius: 18px; position: relative; overflow: hidden; color: #f4efe6; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;
        background: linear-gradient(135deg, #3d3557, #1d1a2b 50%, #4a2f3a); box-shadow: 0 30px 60px -20px rgb(0 0 0 / .7), inset 0 1px 0 rgb(255 255 255 / .2);
        transform: rotateX(var(--rx)) rotateY(var(--ry)); transition: transform .15s ease-out; transform-style: preserve-3d; animation: idle 6s ease-in-out infinite; }
      :host([data-interactive]) .card { animation: none; }
      @keyframes idle { 0%, 100% { transform: rotateX(8deg) rotateY(-12deg); } 50% { transform: rotateX(-6deg) rotateY(12deg); } }
      .card::after { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at var(--gx) var(--gy), rgb(255 255 255 / .28), transparent 45%); mix-blend-mode: overlay; pointer-events: none; }
      .top { display: flex; justify-content: space-between; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .14em; text-transform: uppercase; opacity: .8; }
      .chip { width: 38px; height: 28px; border-radius: 6px; background: linear-gradient(135deg, #e8c77a, #b48a3c); }
      b { font: 400 24px 'Fraunces', serif; } .num { font: 500 13px 'Spline Sans Mono', monospace; letter-spacing: .12em; opacity: .85; }
    `,
    html: html`<div class="x"><div class="card"><div class="top"><span>Members</span><span>No. 0042</span></div><div class="chip"></div><div><b>Greenhouse Society</b><div class="num">VALID THRU 10/27</div></div></div></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive || reducedMotion()) return;
      const x = root.querySelector<HTMLElement>('.x')!;
      x.addEventListener(
        'pointermove',
        (e) => {
          const r = x.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          x.style.setProperty('--ry', `${((px - 0.5) * 22).toFixed(2)}deg`);
          x.style.setProperty('--rx', `${((0.5 - py) * 18).toFixed(2)}deg`);
          x.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
          x.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
        },
        { signal },
      );
      x.addEventListener('pointerleave', () => ['--rx', '--ry'].forEach((p) => x.style.setProperty(p, '0deg')), { signal });
    },
  },
  {
    id: 'anchor-popover',
    css: css`
      .x { background: #f4f2ed; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #22201c; }
      .bar { display: flex; gap: 6px; background: #fff; border-radius: 12px; padding: 6px; box-shadow: 0 0 0 1px #e3dfd6; width: max-content; max-width: 100%; }
      .bar button { border: 0; background: transparent; padding: 8px 12px; border-radius: 8px; font-size: 13.5px; color: inherit; }
      .bar button:hover, .bar button.on { background: #f0ece4; }
      #share { anchor-name: --share; } #more { anchor-name: --more; }
      .menu { margin: 0; border: 0; padding: 6px; border-radius: 12px; background: #fff; box-shadow: 0 0 0 1px #e3dfd6, 0 12px 30px -8px rgb(40 30 20 / .25); min-width: 200px; font-size: 13.5px; color: #22201c; font-family: 'Schibsted Grotesk', sans-serif; }
      .menu a { display: flex; justify-content: space-between; padding: 8px 10px; border-radius: 8px; color: inherit; text-decoration: none; }
      .menu a:hover { background: #f0ece4; } .menu kbd { font: 11px 'Spline Sans Mono', monospace; color: #8c867a; }
      .menu hr { border: 0; border-top: 1px solid #ece8e0; margin: 4px 0; }
      [popover].menu { position-area: bottom span-right; margin-top: 6px; opacity: 1; transition: opacity .15s, translate .15s, display .15s allow-discrete, overlay .15s allow-discrete; }
      [popover].menu:not(:popover-open) { opacity: 0; translate: 0 -4px; }
      @starting-style { [popover].menu:popover-open { opacity: 0; translate: 0 -4px; } }
      #m-share { position-anchor: --share; } #m-more { position-anchor: --more; }
      .static { position: absolute; left: 98px; top: 74px; }
      :host([data-interactive]) .static { display: none; }
      .doc { margin-top: 22px; display: grid; gap: 10px; max-width: 520px; } .doc i { height: 10px; border-radius: 4px; background: #e5e1d8; } .doc i:nth-child(1) { width: 60%; height: 18px; background: #d6d1c6; } .doc i:nth-child(4) { width: 80%; }
      .hint { position: absolute; bottom: 12px; left: 22px; font: 11px 'Spline Sans Mono', monospace; color: #8c867a; }
    `,
    html: html`<div class="x"><div class="bar"><button>Edit</button><button id="share" class="on" popovertarget="m-share">Share</button><button>Comment</button><button id="more" popovertarget="m-more">More</button></div>
      <div class="doc"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="menu static" aria-hidden="true"><a href="#">Copy link <kbd>⌘L</kbd></a><a href="#">Invite people</a><a href="#">Publish to web</a><hr><a href="#">Export PDF</a></div>
      <div class="menu" id="m-share" popover><a href="#">Copy link <kbd>⌘L</kbd></a><a href="#">Invite people</a><a href="#">Publish to web</a><hr><a href="#">Export PDF</a></div>
      <div class="menu" id="m-more" popover><a href="#">Duplicate</a><a href="#">Version history</a><hr><a href="#">Move to trash</a></div>
      <span class="hint">popover + anchor-name, no positioning script</span></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      root.querySelector('#share')?.classList.remove('on');
      root.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault(), { signal }));
    },
  },
  {
    id: 'chat-interface',
    css: css`
      .x { background: #f7f5f1; display: grid; grid-template-rows: 1fr auto; font-family: 'Schibsted Grotesk', sans-serif; color: #24211c; font-size: 14px; }
      .th { overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; gap: 14px; padding: 18px clamp(16px, 8cqw, 120px); }
      .u { align-self: flex-end; background: #24211c; color: #f7f5f1; padding: 10px 14px; border-radius: 16px 16px 4px 16px; max-width: 70%; }
      .a { display: grid; grid-template-columns: 26px 1fr; gap: 10px; max-width: 80%; line-height: 1.5; }
      .a i { width: 26px; height: 26px; border-radius: 8px; background: conic-gradient(from 45deg, #d97745, #e8b04a, #d97745); }
      .caret { display: inline-block; width: 8px; height: 15px; background: #d97745; vertical-align: -2px; margin-left: 2px; animation: b 1s steps(1) infinite; }
      @keyframes b { 50% { opacity: 0; } }
      .sug { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 clamp(16px, 8cqw, 120px) 10px; }
      .sug span { border: 1px solid #ddd7cc; border-radius: 99px; padding: 5px 12px; font-size: 12.5px; color: #615b51; }
      .cmp { margin: 0 clamp(16px, 8cqw, 120px) 16px; background: #fff; border-radius: 16px; box-shadow: 0 0 0 1px #e4dfd5, 0 4px 14px rgb(40 30 20 / .06); display: flex; align-items: center; padding: 8px 8px 8px 16px; gap: 8px; }
      .cmp span { flex: 1; color: #9a9387; }
      .cmp b { width: 34px; height: 34px; border-radius: 10px; background: #24211c; display: grid; place-items: center; }
      .cmp b::after { content: ""; border-bottom: 9px solid #fff; border-inline: 6px solid transparent; }
    `,
    html: html`<div class="x"><div class="th" aria-live="polite">
      <div class="u">How should I arrange a small living room?</div>
      <div class="a"><i></i><div class="msg">${ANSWER}<span class="caret"></span></div></div>
    </div><div><div class="sug"><span>Make it feel bigger</span><span>Where does the TV go?</span><span>Rug sizes</span></div><div class="cmp"><span>Ask a follow-up…</span><b></b></div></div></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive || reducedMotion()) return;
      const msg = root.querySelector<HTMLElement>('.msg')!;
      const caret = msg.querySelector('.caret')!;
      const words = ANSWER.split(' ');
      let i = 0;
      const tick = () => {
        i = i >= words.length + 12 ? 0 : i + 1;
        msg.firstChild!.textContent = words.slice(0, Math.min(i, words.length)).join(' ') + ' ';
        later(i === 0 ? 400 : 70 + Math.random() * 60, signal, tick);
      };
      msg.replaceChildren(document.createTextNode(''), caret);
      tick();
    },
  },
  {
    id: 'scroll-snap-carousel',
    css: css`
      .x { background: #efeae1; display: grid; grid-template-rows: auto 1fr; gap: 12px; padding: 18px 0; font-family: 'Schibsted Grotesk', sans-serif; color: #22201c; }
      .hd { display: flex; justify-content: space-between; align-items: end; padding: 0 20px; }
      .hd b { font: 400 26px 'Fraunces', serif; }
      .hd div { display: flex; gap: 6px; }
      .hd button { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #c9c2b5; background: transparent; font-size: 16px; color: inherit; }
      .tr { display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 20px; padding: 0 20px 10px; overscroll-behavior-x: contain; scrollbar-width: none; }
      .s { flex: 0 0 min(62%, 300px); scroll-snap-align: start; border-radius: 14px; background: linear-gradient(160deg, var(--g)); display: flex; flex-direction: column; justify-content: flex-end; padding: 16px; color: #fff; }
      .s b { font: 400 26px 'Fraunces', serif; } .s span { font-size: 13px; opacity: .9; }
    `,
    html: html`<div class="x"><div class="hd"><b>Slow places</b><div><button data-d="-1" aria-label="Previous">←</button><button data-d="1" aria-label="Next">→</button></div></div>
      <div class="tr">${SLIDES.map(([n, t, g]) => `<div class="s" style="--g:${g}"><b>${n}</b><span>${t}</span></div>`).join('')}</div></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const track = root.querySelector<HTMLElement>('.tr')!;
      root.querySelectorAll<HTMLButtonElement>('button[data-d]').forEach((b) =>
        b.addEventListener('click', () => track.scrollBy({ left: Number(b.dataset.d) * track.clientWidth * 0.6, behavior: 'smooth' }), { signal }),
      );
    },
  },
  {
    id: 'accordion',
    css: css`
      .x { background: #fbf9f5; padding: 22px clamp(18px, 8cqw, 120px); font-family: 'Schibsted Grotesk', sans-serif; color: #24211c; overflow: hidden; interpolate-size: allow-keywords; }
      h3 { margin: 0 0 10px; font: 400 26px 'Fraunces', serif; }
      details { border-top: 1px solid #ddd6ca; } details:last-of-type { border-bottom: 1px solid #ddd6ca; }
      summary { list-style: none; cursor: pointer; padding: 13px 0; display: flex; justify-content: space-between; font-weight: 600; font-size: 15px; }
      summary::-webkit-details-marker { display: none; }
      summary::after { content: "+"; font: 300 22px/1 'Fraunces', serif; transition: rotate .25s; }
      details[open] summary::after { rotate: 45deg; color: #b4532a; }
      details::details-content { block-size: 0; overflow: clip; transition: block-size .3s ease, content-visibility .3s allow-discrete; }
      details[open]::details-content { block-size: auto; }
      p { margin: 0 0 14px; color: #5f594f; font-size: 14px; line-height: 1.5; max-width: 60ch; }
    `,
    html: html`<div class="x"><h3>Questions, answered</h3>
      <details name="faq" open><summary>Can I change my plan later?</summary><p>Yes. Upgrades apply immediately; downgrades take effect at the end of the billing period, and unused time is credited.</p></details>
      <details name="faq"><summary>Do you offer refunds?</summary><p>Within 30 days of purchase, for any reason. Email us and we will process it within two working days.</p></details>
      <details name="faq"><summary>Where is my data stored?</summary><p>In the EU (Frankfurt), encrypted at rest and in transit. You can export everything at any time.</p></details>
      <details name="faq"><summary>Is there a student discount?</summary><p>Half price with a valid student email, renewed each year.</p></details></div>`,
  },
  {
    id: 'inline-validation',
    css: css`
      .x { background: #f6f4ef; display: grid; place-items: center; padding: 18px; font-family: 'Schibsted Grotesk', sans-serif; color: #24211c; }
      form { width: min(100%, 380px); display: grid; gap: 14px; background: #fff; padding: 22px; border-radius: 14px; box-shadow: 0 0 0 1px #e4dfd5; }
      h3 { margin: 0 0 2px; font: 400 24px 'Fraunces', serif; }
      .f { display: grid; gap: 5px; }
      label { font-size: 13px; font-weight: 600; }
      .w { position: relative; }
      input { width: 100%; font: 14px 'Schibsted Grotesk', sans-serif; padding: 10px 34px 10px 12px; border: 1.5px solid #d7d1c6; border-radius: 9px; background: #fff; color: inherit; outline: none; transition: border-color .15s, box-shadow .15s; }
      input:focus { border-color: #24211c; box-shadow: 0 0 0 3px rgb(36 33 28 / .1); }
      .w::after { position: absolute; right: 11px; top: 50%; translate: 0 -50%; font-size: 14px; font-weight: 700; }
      .msg { font-size: 12.5px; min-height: 1em; color: #77716a; }
      .f[data-state=valid] input, .f:has(input:user-valid) input { border-color: #2f8a57; }
      .f[data-state=valid] .w::after, .f:has(input:user-valid) .w::after { content: "✓"; color: #2f8a57; }
      .f[data-state=invalid] input, .f:has(input:user-invalid) input { border-color: #c63d2f; background: #fff8f6; }
      .f[data-state=invalid] .w::after, .f:has(input:user-invalid) .w::after { content: "!"; color: #c63d2f; }
      .f[data-state=invalid] .msg, .f:has(input:user-invalid) .msg { color: #c63d2f; }
      button { border: 0; border-radius: 9px; padding: 11px; background: #24211c; color: #fff; font-weight: 600; font-size: 14px; }
    `,
    html: html`<div class="x"><form novalidate><h3>Create account</h3>
      <div class="f" data-state="valid"><label for="n">Name</label><div class="w"><input id="n" required value="Ada Lovelace" aria-describedby="nm"></div><span class="msg" id="nm"></span></div>
      <div class="f" data-state="invalid"><label for="e">Email</label><div class="w"><input id="e" type="email" required value="ada@" aria-describedby="em"></div><span class="msg" id="em">Add the domain after the @, like ada@example.com</span></div>
      <div class="f"><label for="p">Password</label><div class="w"><input id="p" type="password" required minlength="10" aria-describedby="pm"></div><span class="msg" id="pm">At least 10 characters</span></div>
      <button type="submit">Continue</button></form></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      root.querySelector('form')!.addEventListener('submit', (e) => e.preventDefault(), { signal });
      root.querySelectorAll<HTMLInputElement>('input').forEach((input) =>
        input.addEventListener('input', () => input.closest('.f')!.removeAttribute('data-state'), { signal, once: true }),
      );
    },
  },
];
