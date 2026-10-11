import { css, html, type Example } from './types';

const letters = (word: string): string =>
  [...word].map((c, i) => `<span style="--i:${i}">${c}</span>`).join('');

const SCALE_STEPS = [5, 4, 3, 2, 1, 0, -1];

export const TYPE_EXAMPLES: Example[] = [
  {
    id: 'editorial-serif',
    css: css`
      .x { background: #fbf8f2; color: #1e1b16; padding: 28px clamp(20px, 6cqw, 72px); font-family: 'Fraunces', serif; overflow: hidden; }
      .w { max-width: 860px; margin: 0 auto; }
      .k { font: 600 11px 'Schibsted Grotesk', sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #a3321d; border-top: 1px solid #1e1b16; padding-top: 8px; display: flex; justify-content: space-between; }
      .k span { color: #7a7368; font-weight: 500; }
      h2 { font-weight: 400; font-optical-sizing: auto; font-size: clamp(34px, 6.4cqw, 68px); line-height: .98; letter-spacing: -.02em; margin: 14px 0 10px; text-wrap: balance; }
      h2 em { font-weight: 300; }
      .deck { font: italic 300 clamp(16px, 2.2cqw, 21px)/1.35 'Fraunces', serif; color: #4a443b; margin: 0 0 14px; max-width: 46ch; }
      .by { font: 500 11.5px 'Schibsted Grotesk', sans-serif; color: #7a7368; margin-bottom: 14px; }
      .by b { color: #1e1b16; font-weight: 600; }
      .body { columns: 2 240px; column-gap: 28px; column-rule: 1px solid #e5dfd3; font-size: 14px; line-height: 1.55; text-wrap: pretty; hyphens: auto; }
      .body p { margin: 0 0 10px; }
    `,
    html: html`<div class="x"><article class="w">
      <div class="k">Essay<span>No. 37 · Autumn</span></div>
      <h2>The quiet return of <em>the long sentence</em></h2>
      <p class="deck">After a decade of skimmable bullet points, readers are choosing prose that asks for their time.</p>
      <div class="by">By <b>Mara Okafor</b> · 14 minute read</div>
      <div class="body"><p>There is a particular pleasure in a sentence that knows where it is going but takes the scenic route, pausing at a clause, leaning on a comma, arriving later than you expected and better for it.</p><p>Editors noticed first. Pieces that ran long were read to the end more often, not less, provided the type was generous and the measure kind to the eye.</p><p>The page, it turns out, still matters on a screen.</p></div>
    </article></div>`,
  },
  {
    id: 'kinetic-type',
    css: css`
      .x { background: #141311; color: #f1ebe0; display: grid; place-content: center; text-align: center; font-family: 'Bricolage Grotesque', sans-serif; overflow: hidden; }
      .big { font-size: clamp(64px, 24cqw, 260px); font-weight: 700; font-stretch: 75%; line-height: .9; letter-spacing: -.02em; display: flex; justify-content: center; }
      .big span { display: inline-block; animation: wave 2.4s cubic-bezier(.5,0,.2,1) infinite; animation-delay: calc(var(--i) * 90ms); }
      .big span:nth-child(3) { color: #ff4f1f; }
      @keyframes wave { 0%, 60%, 100% { translate: 0 0; rotate: 0deg; } 25% { translate: 0 -18%; rotate: -6deg; } 40% { translate: 0 4%; rotate: 2deg; } }
      .line { margin-top: 14px; font: 400 clamp(18px, 3.2cqw, 30px) 'Fraunces', serif; display: flex; gap: .3em; justify-content: center; align-items: baseline; }
      .roll { display: inline-grid; height: 1.2em; overflow: hidden; text-align: left; font-style: italic; color: #ff4f1f; }
      .roll span { grid-area: 1 / 1; animation: roll 6s infinite; animation-delay: calc(var(--i) * -2s); translate: 0 110%; }
      @keyframes roll { 0% { translate: 0 110%; } 5%, 30% { translate: 0 0; } 35%, 100% { translate: 0 -110%; } }
      @media (prefers-reduced-motion: reduce) { .roll span { animation: none; } .roll span:first-child { translate: 0 0; } }
    `,
    html: html`<div class="x">
      <div class="big" aria-label="Motion">${letters('MOTION')}</div>
      <div class="line">Type that can <span class="roll" aria-label="speak, dance, shout"><span style="--i:0">speak.</span><span style="--i:1">dance.</span><span style="--i:2">shout.</span></span></div>
    </div>`,
  },
  {
    id: 'variable-fonts',
    css: css`
      .x { background: #f0ebe1; color: #1f1a14; display: grid; grid-template-rows: 1fr auto; padding: 24px clamp(18px, 4cqw, 40px); font-family: 'Fraunces', serif; }
      .spec { display: grid; place-items: center; }
      .word { font-size: clamp(80px, 22cqw, 260px); line-height: 1; letter-spacing: -.03em;
        font-variation-settings: "wght" var(--w, 400), "SOFT" var(--s, 0), "WONK" var(--k, 0), "opsz" var(--o, 144);
        animation: breathe 5s ease-in-out infinite alternate; }
      :host([data-interactive]) .word { animation: none; }
      @keyframes breathe { from { font-variation-settings: "wght" 100, "SOFT" 0, "WONK" 0, "opsz" 144; } to { font-variation-settings: "wght" 900, "SOFT" 100, "WONK" 1, "opsz" 144; } }
      .axes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; border-top: 1px solid #1f1a14; padding-top: 10px; font: 500 11px 'Spline Sans Mono', monospace; }
      label { display: grid; gap: 6px; text-transform: uppercase; letter-spacing: .06em; }
      label span { display: flex; justify-content: space-between; } label output { color: #b8431f; }
      input[type=range] { width: 100%; accent-color: #b8431f; margin: 0; }
      @container (width < 560px) { .axes { grid-template-columns: 1fr 1fr; } }
    `,
    html: html`<div class="x">
      <div class="spec"><div class="word">Soft</div></div>
      <div class="axes">
        <label><span>Weight <output>400</output></span><input type="range" data-var="--w" min="100" max="900" value="400"></label>
        <label><span>Soft <output>0</output></span><input type="range" data-var="--s" min="0" max="100" value="0"></label>
        <label><span>Wonk <output>0</output></span><input type="range" data-var="--k" min="0" max="1" step="1" value="0"></label>
        <label><span>Optical <output>144</output></span><input type="range" data-var="--o" min="9" max="144" value="144"></label>
      </div>
    </div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const word = root.querySelector<HTMLElement>('.word')!;
      root.querySelectorAll<HTMLInputElement>('input[type=range]').forEach((input) => {
        const out = input.parentElement!.querySelector('output')!;
        input.addEventListener(
          'input',
          () => {
            word.style.setProperty(input.dataset.var!, input.value);
            out.textContent = input.value;
          },
          { signal },
        );
      });
    },
  },
  {
    id: 'oversized-type',
    css: css`
      .x { background: #d7ff3a; color: #0f0f0d; font-family: 'Bricolage Grotesque', sans-serif; display: grid; grid-template-rows: auto 1fr; padding: 18px 20px 0; }
      .top { display: flex; justify-content: space-between; font: 500 12px 'Spline Sans Mono', monospace; text-transform: uppercase; letter-spacing: .08em; }
      h2 { margin: 0; align-self: end; font-size: min(41cqw, 92cqh); font-weight: 800; font-stretch: 75%; line-height: .74; letter-spacing: -.06em; translate: -.04em .1em; white-space: nowrap; }
    `,
    html: html`<div class="x"><div class="top"><span>Studio Ferro</span><span>Brand, type, motion</span><span>Est. 2014</span></div><h2>Ferro</h2></div>`,
  },
  {
    id: 'modular-scale',
    css: css`
      .x { --base: clamp(13px, 2.3cqw, 17px); --ratio: 1.25; background: #f7f5f0; color: #1d1b17; padding: 20px clamp(18px, 4cqw, 40px); display: grid; grid-template-rows: auto 1fr; gap: 10px; font-family: 'Fraunces', serif; overflow: hidden; }
      .bar { display: flex; gap: 6px; align-items: center; font: 500 11px 'Spline Sans Mono', monospace; color: #77716a; flex-wrap: wrap; }
      .bar button { font: inherit; border: 1px solid #cfc9bd; background: transparent; border-radius: 999px; padding: 3px 10px; color: #1d1b17; }
      .bar button[aria-pressed=true] { background: #1d1b17; color: #f7f5f0; border-color: #1d1b17; }
      .steps { display: grid; align-content: center; }
      .s { display: grid; grid-template-columns: 70px 1fr; align-items: baseline; gap: 10px; border-bottom: 1px solid #e4dfd5; white-space: nowrap; overflow: hidden; }
      .s small { font: 500 10.5px 'Spline Sans Mono', monospace; color: #77716a; }
      .s span { font-size: calc(var(--base) * pow(var(--ratio), var(--n))); line-height: 1.15; letter-spacing: -.01em; }
      .s:first-child span { letter-spacing: -.03em; }
    `,
    html: html`<div class="x">
      <div class="bar"><span>ratio</span><button data-r="1.125" aria-pressed="false">1.125 second</button><button data-r="1.25" aria-pressed="true">1.25 third</button><button data-r="1.333" aria-pressed="false">1.333 fourth</button><button data-r="1.5" aria-pressed="false">1.5 fifth</button></div>
      <div class="steps">${SCALE_STEPS.map((n) => `<div class="s" style="--n:${n}"><small>step ${n}</small><span>${n >= 3 ? 'Harmony' : n >= 0 ? 'Every size from one ratio' : 'Captions and footnotes stay related to the headline'}</span></div>`).join('')}</div>
    </div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const x = root.querySelector<HTMLElement>('.x')!;
      const buttons = [...root.querySelectorAll<HTMLButtonElement>('button[data-r]')];
      for (const b of buttons) {
        b.addEventListener(
          'click',
          () => {
            x.style.setProperty('--ratio', b.dataset.r!);
            buttons.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
          },
          { signal },
        );
      }
    },
  },
  {
    id: 'drop-caps',
    css: css`
      .x { background: #f5f0e6; color: #231e17; padding: 26px clamp(20px, 6cqw, 72px); font-family: 'Fraunces', serif; overflow: hidden; }
      .w { max-width: 820px; margin: 0 auto; display: grid; grid-template-columns: 1fr 34%; gap: 30px; align-items: start; }
      p { margin: 0 0 12px; font-size: 15px; line-height: 1.55; text-wrap: pretty; }
      p:first-child::first-letter { initial-letter: 3; -webkit-initial-letter: 3; font-weight: 600; color: #9c2f1a; margin-right: .08em; }
      @supports not ((initial-letter: 3) or (-webkit-initial-letter: 3)) {
        p:first-child::first-letter { float: left; font-size: 4.1em; line-height: .82; padding: .06em .08em 0 0; }
      }
      blockquote { margin: 6px 0 0; border-top: 3px solid #9c2f1a; padding-top: 12px; font: italic 300 clamp(20px, 3.2cqw, 30px)/1.15 'Fraunces', serif; letter-spacing: -.01em; hanging-punctuation: first; }
      blockquote cite { display: block; margin-top: 10px; font: 500 11px 'Spline Sans Mono', monospace; font-style: normal; letter-spacing: .08em; text-transform: uppercase; color: #8a8174; }
      @container (width < 560px) { .w { grid-template-columns: 1fr; gap: 10px; } blockquote { order: -1; } }
    `,
    html: html`<div class="x"><div class="w"><div>
      <p>Long before the printing press, scribes painted the first letter of a chapter in red and gold, so a reader turning pages could find where a new thought began. The habit survived lead type and phototypesetting, and now it survives CSS.</p>
      <p>A drop cap is a door. It tells the eye: start here. The pull quote does the opposite job, lifting one line out of the stream so a browsing reader can decide whether to stay.</p>
    </div><blockquote aria-hidden="true">“A drop cap is a door. It tells the eye: start here.”<cite>Pull quote</cite></blockquote></div></div>`,
  },
];
