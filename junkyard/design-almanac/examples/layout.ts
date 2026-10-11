import { css, html, type Example } from './types';

const spark = (pts: number[], w = 80, h = 22): string => {
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const step = w / (pts.length - 1);
  const d = pts.map((p, i) => `${(i * step).toFixed(1)},${(h - ((p - min) / (max - min || 1)) * h).toFixed(1)}`).join(' ');
  return `<svg viewBox="-1 -1 ${w + 2} ${h + 2}" width="${w}" height="${h}" aria-hidden="true"><polyline points="${d}" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></svg>`;
};

const DASH_ROWS: [string, string, string, number[], string][] = [
  ['eu-west-1', '41.2', '+2.1', [4, 5, 5, 6, 5, 7, 8, 7, 9, 8, 9, 10], ''],
  ['us-east-1', '88.7', '+0.4', [8, 8, 9, 8, 9, 9, 8, 9, 9, 10, 9, 9], ''],
  ['ap-south-1', '12.9', '-6.8', [9, 8, 8, 7, 6, 6, 5, 5, 4, 4, 3, 3], 'warn'],
  ['us-west-2', '63.0', '+1.2', [5, 6, 5, 6, 6, 7, 6, 7, 7, 7, 8, 8], ''],
  ['sa-east-1', '7.4', '+0.0', [3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 3], ''],
  ['eu-north-1', '22.6', '+3.9', [2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 9], ''],
];

export const LAYOUT_EXAMPLES: Example[] = [
  {
    id: 'bento-grid',
    css: css`
      .x { background: #ece8e1; display: grid; place-items: center; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #17140f; }
      .g { width: min(100%, 860px); height: min(100%, 520px); display: grid; gap: 10px;
        grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr);
        grid-template-areas: "a a b c" "a a d d" "e f d d"; }
      .t { border-radius: 18px; background: #fbfaf7; padding: 16px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
      .t small { font: 500 11px/1.2 'Spline Sans Mono', monospace; letter-spacing: .06em; text-transform: uppercase; opacity: .6; }
      .a { grid-area: a; background: #17140f; color: #fbfaf7; }
      .a b { font: 600 clamp(48px, 13cqw, 120px)/.85 'Bricolage Grotesque', sans-serif; letter-spacing: -.04em; }
      .a p { margin: 0; max-width: 22ch; font-size: 14px; opacity: .7; }
      .b { grid-area: b; background: #ff5b1f; color: #17140f; }
      .b b, .c b { font: 600 34px/1 'Bricolage Grotesque', sans-serif; }
      .c { grid-area: c; }
      .d { grid-area: d; }
      .bars { display: flex; align-items: end; gap: 6px; height: 60%; }
      .bars i { flex: 1; background: #17140f; border-radius: 4px 4px 0 0; height: var(--v); }
      .bars i:nth-child(9) { background: #ff5b1f; }
      .e { grid-area: e; background: #d9d3c7; }
      .f { grid-area: f; place-items: center; display: grid; }
      .ring { width: 64px; aspect-ratio: 1; border-radius: 50%; background: conic-gradient(#ff5b1f 0 72%, #e3ded4 0); mask: radial-gradient(circle, transparent 54%, #000 55%); }
      .e b { font: 600 22px/1.1 'Bricolage Grotesque', sans-serif; }
      @container (width < 560px) {
        .g { grid-template-columns: 1fr 1fr; grid-template-rows: 1.4fr 1fr 1fr 1fr; grid-template-areas: "a a" "b c" "d d" "e f"; }
        .t { padding: 12px; border-radius: 14px; }
        .a b { font-size: 56px; } .a p { display: none; }
        .b b, .c b { font-size: 24px; } .e b { font-size: 16px; }
        .ring { width: 40px; }
      }
    `,
    html: html`<div class="x"><div class="g">
      <div class="t a"><small>Battery</small><div><b>22h</b><p>A full day of video, then some. Charges to half in thirty minutes.</p></div></div>
      <div class="t b"><small>Weight</small><b>1.24 kg</b></div>
      <div class="t c"><small>Display</small><b>14.2″</b></div>
      <div class="t d"><small>Render time vs last gen</small><div class="bars">
        <i style="--v:30%"></i><i style="--v:38%"></i><i style="--v:34%"></i><i style="--v:46%"></i><i style="--v:52%"></i><i style="--v:49%"></i><i style="--v:63%"></i><i style="--v:70%"></i><i style="--v:96%"></i></div></div>
      <div class="t e"><small>Ports</small><b>3 × USB-C<br>HDMI, SD</b></div>
      <div class="t f"><div class="ring" aria-label="72 percent recycled"></div><small>72% recycled</small></div>
    </div></div>`,
  },
  {
    id: 'swiss-grid',
    css: css`
      .x { background: #f3f0e8; color: #111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 28px 32px;
        display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: auto 1fr auto; column-gap: 16px;
        background-image: repeating-linear-gradient(90deg, transparent 0 calc((100% - 80px) / 6), rgb(0 0 0 / .05) 0 calc((100% - 80px) / 6 + 16px)); background-origin: content-box; }
      .top { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; font-size: 11px; line-height: 1.35; border-top: 3px solid #111; padding-top: 8px; }
      .top span:nth-child(1) { grid-column: 1 / 3; font-weight: 700; }
      .top span:nth-child(2) { grid-column: 3 / 5; }
      .top span:nth-child(3) { grid-column: 5 / 7; }
      h2 { grid-column: 1 / 6; align-self: end; margin: 0; font-weight: 700; font-size: clamp(40px, min(11.5cqw, 17cqh), 128px); line-height: .88; letter-spacing: -.045em; }
      .dot { grid-column: 5 / 7; grid-row: 2; justify-self: end; align-self: start; width: clamp(80px, 22cqw, 220px); aspect-ratio: 1; border-radius: 50%; background: #e3261b; margin-top: 18px; }
      .cols { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; font-size: 11.5px; line-height: 1.4; margin-top: 18px; }
      .cols p { margin: 0; grid-column: span 2; }
      .cols p:first-child { font-weight: 700; }
      @container (width < 560px) { .cols p:nth-child(3), .top span:nth-child(2) { display: none; } .cols p { grid-column: span 3; } .top span:nth-child(1) { grid-column: 1 / 4; } .top span:nth-child(3) { grid-column: 4 / 7; } }
    `,
    html: html`<div class="x">
      <div class="top"><span>Kunstgewerbemuseum Zürich</span><span>Ausstellung 12.3 bis 30.4</span><span>Di bis So 10 bis 18 Uhr</span></div>
      <div class="dot"></div>
      <h2>Der Film<br>und die<br>Form</h2>
      <div class="cols"><p>Objective, asymmetric, set flush left on a six column grid.</p><p>Hierarchy from size and weight alone; one red for emphasis.</p><p>No ornament. White space is a structural element, not a leftover.</p></div>
    </div>`,
  },
  {
    id: 'split-screen',
    css: css`
      .x { display: flex; font-family: 'Schibsted Grotesk', sans-serif; }
      .h { flex: 1; transition: flex-grow .6s cubic-bezier(.2,.8,.2,1); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 28px; min-width: 0; }
      .h:hover { flex-grow: 1.6; }
      .l { background: linear-gradient(180deg, #f7c59f 0%, #f29e6d 38%, #c75b39 60%, #3c2a2a 100%); color: #fff6ec; }
      .l::before { content: ""; position: absolute; left: 50%; top: 34%; width: 90px; aspect-ratio: 1; translate: -50% 0; border-radius: 50%; background: #fff2d9; box-shadow: 0 0 60px 20px rgb(255 230 190 / .5); }
      .l::after { content: ""; position: absolute; inset: 52% -10% 0; background: #2b1d1f; clip-path: polygon(0 40%, 18% 18%, 34% 34%, 52% 6%, 70% 30%, 86% 14%, 100% 32%, 100% 100%, 0 100%); }
      .r { background: #f2efe8; color: #1b1a17; }
      .h > * { position: relative; z-index: 1; }
      small { font: 500 11px/1 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; opacity: .7; }
      h3 { font: 400 clamp(30px, 5.4cqw, 54px)/1 'Fraunces', serif; margin: 10px 0 8px; letter-spacing: -.02em; }
      p { margin: 0 0 18px; max-width: 30ch; font-size: 14px; line-height: 1.45; opacity: .85; }
      a { align-self: start; color: inherit; font-weight: 600; font-size: 14px; text-decoration: none; border-bottom: 1.5px solid; padding-bottom: 2px; }
      @container (width < 520px) { .x { flex-direction: column; } .h { padding: 20px; } .l::before { top: 12%; width: 60px; } .l::after { inset: 40% -10% 0; } }
    `,
    html: html`<div class="x">
      <section class="h l"><small>Travellers</small><h3>Go somewhere slow</h3><p>Small trains, long dinners, rooms with shutters.</p><a href="#">Plan a trip</a></section>
      <section class="h r"><small>Hosts</small><h3>Open your door</h3><p>List a room in ten minutes. We handle the paperwork and the keys.</p><a href="#">Start hosting</a></section>
    </div>`,
  },
  {
    id: 'masonry',
    css: css`
      .x { background: #1b1a18; padding: 16px; overflow: hidden; font-family: 'Schibsted Grotesk', sans-serif; }
      .m { columns: 150px; column-gap: 10px; }
      figure { break-inside: avoid; margin: 0 0 10px; border-radius: 10px; overflow: hidden; background: #2a2825; color: #efe9df; }
      .img { aspect-ratio: var(--r); background: var(--g); }
      figcaption { padding: 7px 10px 9px; font-size: 12px; display: flex; justify-content: space-between; gap: 6px; }
      figcaption span { opacity: .55; font-family: 'Spline Sans Mono', monospace; font-size: 10.5px; }
      .note { padding: 14px; font: italic 400 17px/1.25 'Fraunces', serif; background: #e9e2d4; color: #1b1a18; }
    `,
    html: html`<div class="x"><div class="m">
      <figure><div class="img" style="--r:3/4;--g:linear-gradient(160deg,#c9b38f,#6b4e2e)"></div><figcaption>Dune study<span>04</span></figcaption></figure>
      <figure><div class="img" style="--r:1/1;--g:radial-gradient(circle at 30% 30%,#9fb8a3,#2f4a3a)"></div><figcaption>Fern<span>11</span></figcaption></figure>
      <figure class="note">Masonry keeps every item whole and every gap closed.</figure>
      <figure><div class="img" style="--r:2/3;--g:linear-gradient(200deg,#e3a27a,#9a3f2b 70%,#3a1f1a)"></div><figcaption>Kiln<span>02</span></figcaption></figure>
      <figure><div class="img" style="--r:4/3;--g:linear-gradient(180deg,#a9c4d6,#e8e2d1)"></div><figcaption>Low tide<span>07</span></figcaption></figure>
      <figure><div class="img" style="--r:3/5;--g:linear-gradient(170deg,#3b3a56,#a07a8f)"></div><figcaption>Dusk<span>09</span></figcaption></figure>
      <figure><div class="img" style="--r:1/1;--g:conic-gradient(from 40deg,#d9c27a,#8e7a3c,#d9c27a)"></div><figcaption>Brass<span>15</span></figcaption></figure>
      <figure><div class="img" style="--r:5/4;--g:linear-gradient(120deg,#5d6b4a,#c2b98d)"></div><figcaption>Olive grove<span>03</span></figcaption></figure>
      <figure><div class="img" style="--r:3/4;--g:linear-gradient(200deg,#d5c6b5,#7d6a5d)"></div><figcaption>Linen<span>12</span></figcaption></figure>
      <figure><div class="img" style="--r:4/5;--g:radial-gradient(circle at 70% 20%,#f1d3a8,#b0603a 60%,#4d2316)"></div><figcaption>Ember<span>06</span></figcaption></figure>
    </div></div>`,
  },
  {
    id: 'broken-grid',
    css: css`
      .x { background: #efe7da; color: #1d1a16; font-family: 'Schibsted Grotesk', sans-serif;
        display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(8, 1fr); padding: 24px; gap: 0; }
      .img1 { grid-column: 6 / 12; grid-row: 1 / 7; background: linear-gradient(170deg, #b9573a, #7a2e1e 60%, #3d1a12); }
      .img2 { grid-column: 2 / 6; grid-row: 5 / 9; background: linear-gradient(150deg, #d8c3a0, #8f7a58); z-index: 2; mix-blend-mode: multiply; }
      h2 { grid-column: 1 / 11; grid-row: 2 / 5; z-index: 3; margin: 0; align-self: center; font: italic 300 clamp(48px, 12cqw, 140px)/.85 'Fraunces', serif; letter-spacing: -.035em; }
      h2 span { display: block; padding-left: 1.4em; font-style: normal; font-weight: 600; }
      p { grid-column: 9 / 13; grid-row: 7 / 9; z-index: 3; margin: 0; align-self: end; font-size: 12.5px; line-height: 1.4; background: #efe7da; padding: 12px 0 0 14px; }
      .n { grid-column: 12 / 13; grid-row: 1 / 3; writing-mode: vertical-rl; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .14em; text-transform: uppercase; justify-self: end; }
    `,
    html: html`<div class="x">
      <div class="img1"></div><div class="img2"></div>
      <h2>Rust &amp;<span>Ochre</span></h2>
      <p>Autumn collection. Wool, waxed cotton and hand-dyed linen, made in small runs.</p>
      <div class="n">Issue 14</div>
    </div>`,
  },
  {
    id: 'card-layout',
    css: css`
      .x { background: #f4f2ee; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #1c1b19; overflow: hidden; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; max-width: 860px; margin: 0 auto; }
      .c { position: relative; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 2px rgb(30 20 10 / .06), 0 4px 14px rgb(30 20 10 / .06); transition: translate .2s, box-shadow .2s; display: grid; grid-template-rows: auto 1fr auto; }
      .c:hover { translate: 0 -3px; box-shadow: 0 2px 4px rgb(30 20 10 / .06), 0 12px 28px rgb(30 20 10 / .1); }
      .img { aspect-ratio: 4 / 3; background: var(--g); }
      .b { padding: 12px 14px 4px; }
      .k { font: 500 10.5px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #8a5a2b; }
      h4 { margin: 4px 0 4px; font: 500 19px/1.15 'Fraunces', serif; }
      h4 a { color: inherit; text-decoration: none; }
      h4 a::after { content: ""; position: absolute; inset: 0; }
      p { margin: 0; font-size: 13px; color: #6b675f; line-height: 1.4; }
      .meta { padding: 10px 14px 14px; font-size: 12px; color: #6b675f; display: flex; gap: 12px; }
    `,
    html: html`<div class="x"><div class="grid">
      <article class="c"><div class="img" style="--g:radial-gradient(circle at 40% 45%,#f3d27a 0 18%,#e46a3b 19% 36%,#f1e6d4 37%)"></div><div class="b"><div class="k">Breakfast</div><h4><a href="#">Shakshuka with feta</a></h4><p>Eggs poached in a smoky pepper sauce.</p></div><div class="meta"><span>25 min</span><span>Serves 2</span></div></article>
      <article class="c"><div class="img" style="--g:linear-gradient(135deg,#7c9a5c,#c9d6a3 60%,#f2efe2)"></div><div class="b"><div class="k">Lunch</div><h4><a href="#">Green goddess bowl</a></h4><p>Herbs, avocado, crisp chickpeas.</p></div><div class="meta"><span>15 min</span><span>Serves 1</span></div></article>
      <article class="c"><div class="img" style="--g:radial-gradient(circle at 60% 40%,#5a2a22,#a2452e 45%,#e9c9a0 46%)"></div><div class="b"><div class="k">Dinner</div><h4><a href="#">Braised short ribs</a></h4><p>Low and slow in red wine and miso.</p></div><div class="meta"><span>3 h</span><span>Serves 4</span></div></article>
    </div></div>`,
  },
  {
    id: 'app-shell',
    css: css`
      .x { display: grid; grid-template-columns: 180px 1fr; grid-template-rows: 48px 1fr; grid-template-areas: "side top" "side main"; font-family: 'Schibsted Grotesk', sans-serif; font-size: 13px; color: #1f2328; background: #fff; }
      aside { grid-area: side; background: #f6f6f4; border-right: 1px solid #e4e4e0; padding: 14px 10px; display: flex; flex-direction: column; gap: 2px; }
      .logo { font: 600 15px 'Bricolage Grotesque', sans-serif; padding: 0 8px 14px; display: flex; align-items: center; gap: 8px; }
      .logo i { width: 18px; height: 18px; border-radius: 5px; background: #1f2328; }
      aside a { color: inherit; text-decoration: none; padding: 6px 8px; border-radius: 6px; display: flex; justify-content: space-between; }
      aside a[aria-current] { background: #fff; box-shadow: 0 0 0 1px #e4e4e0; font-weight: 600; }
      aside a span { color: #8b8f96; font-size: 12px; }
      aside h5 { margin: 14px 8px 4px; font: 500 10.5px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #8b8f96; }
      header { grid-area: top; border-bottom: 1px solid #e4e4e0; display: flex; align-items: center; gap: 12px; padding: 0 16px; }
      header .crumb { color: #8b8f96; } header .crumb b { color: #1f2328; font-weight: 600; }
      header .search { margin-left: auto; border: 1px solid #e4e4e0; border-radius: 6px; padding: 5px 10px; color: #8b8f96; width: 180px; display: flex; justify-content: space-between; }
      kbd { font: 11px 'Spline Sans Mono', monospace; }
      main { grid-area: main; overflow: auto; padding: 4px 16px; }
      .row { display: grid; grid-template-columns: 70px 1fr 90px 60px; gap: 10px; align-items: center; padding: 10px 0; border-bottom: 1px solid #efefec; }
      .row .id { font-family: 'Spline Sans Mono', monospace; color: #8b8f96; font-size: 12px; }
      .row .st { display: flex; align-items: center; gap: 6px; color: #5b6068; }
      .row .st::before { content: ""; width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid var(--c); background: var(--f, transparent); }
      .row time { color: #8b8f96; text-align: right; }
      @container (width < 560px) { .x { grid-template-columns: 1fr; grid-template-areas: "top" "main"; } aside { display: none; } .row { grid-template-columns: 60px 1fr 60px; } .row .st { display: none; } header .search { width: auto; } }
    `,
    html: html`<div class="x">
      <aside><div class="logo"><i></i>Ledger</div>
        <a href="#" aria-current="page">Inbox <span>12</span></a><a href="#">My issues <span>4</span></a><a href="#">Views</a>
        <h5>Team</h5><a href="#">Backlog</a><a href="#">Active</a><a href="#">Cycles</a><a href="#">Settings</a></aside>
      <header><span class="crumb">Platform / <b>Inbox</b></span><span class="search">Search <kbd>⌘K</kbd></span></header>
      <main>
        <div class="row"><span class="id">PLT-412</span><span>Rotate signing keys before audit</span><span class="st" style="--c:#d97706;--f:#d97706">In progress</span><time>2h</time></div>
        <div class="row"><span class="id">PLT-409</span><span>Cache invalidation on locale switch</span><span class="st" style="--c:#8b8f96">Todo</span><time>5h</time></div>
        <div class="row"><span class="id">PLT-398</span><span>Flaky upload test on CI runners</span><span class="st" style="--c:#2563eb;--f:#2563eb">Review</span><time>1d</time></div>
        <div class="row"><span class="id">PLT-391</span><span>Migrate billing webhooks to queue</span><span class="st" style="--c:#16a34a;--f:#16a34a">Done</span><time>2d</time></div>
        <div class="row"><span class="id">PLT-388</span><span>Dark mode tokens for charts</span><span class="st" style="--c:#8b8f96">Todo</span><time>3d</time></div>
        <div class="row"><span class="id">PLT-377</span><span>Audit log export as CSV</span><span class="st" style="--c:#16a34a;--f:#16a34a">Done</span><time>4d</time></div>
        <div class="row"><span class="id">PLT-370</span><span>Rate limits per workspace</span><span class="st" style="--c:#8b8f96">Todo</span><time>6d</time></div>
      </main>
    </div>`,
  },
  {
    id: 'data-dashboard',
    css: css`
      .x { background: #fbfaf6; color: #22201c; font: 12px/1.3 'Schibsted Grotesk', sans-serif; padding: 16px 18px; display: grid; grid-template-rows: auto auto 1fr; gap: 12px; font-variant-numeric: tabular-nums; }
      .hd { display: flex; align-items: baseline; justify-content: space-between; border-bottom: 1.5px solid #22201c; padding-bottom: 6px; }
      .hd b { font: 600 15px 'Bricolage Grotesque', sans-serif; }
      .hd span { font-family: 'Spline Sans Mono', monospace; font-size: 11px; color: #7b766c; }
      .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
      .kpis div { padding: 2px 12px; border-left: 1px solid #dedad0; }
      .kpis div:first-child { border: 0; padding-left: 0; }
      .kpis small { display: block; color: #7b766c; font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; }
      .kpis b { font: 500 22px 'Spline Sans Mono', monospace; letter-spacing: -.02em; }
      .kpis em { font-style: normal; font-size: 11px; color: #3f7d4a; margin-left: 4px; }
      .kpis em.dn { color: #c2410c; }
      table { width: 100%; border-collapse: collapse; align-self: start; }
      th { text-align: left; font-weight: 500; color: #7b766c; font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; padding: 4px 6px; border-bottom: 1px solid #dedad0; }
      td { padding: 5px 6px; border-bottom: 1px solid #efece5; }
      td.n { text-align: right; font-family: 'Spline Sans Mono', monospace; }
      td.s { color: #8c8678; width: 90px; }
      tr.warn td.s, tr.warn td.d { color: #c2410c; }
      td.d { color: #3f7d4a; }
      tr.warn td:first-child::after { content: " ▲"; color: #c2410c; font-size: 9px; }
      @container (width < 560px) { .kpis { grid-template-columns: 1fr 1fr; row-gap: 8px; } .kpis div:nth-child(3) { border: 0; padding-left: 0; } th:nth-child(3), td:nth-child(3) { display: none; } }
    `,
    html: html`<div class="x">
      <div class="hd"><b>Edge traffic</b><span>last 24h · updated 14:02 UTC</span></div>
      <div class="kpis"><div><small>Requests</small><b>235.8M</b><em>+1.9%</em></div><div><small>p95 latency</small><b>118ms</b><em class="dn">+6ms</em></div><div><small>Error rate</small><b>0.042%</b><em>-0.01</em></div><div><small>Cache hit</small><b>93.4%</b><em>+0.3</em></div></div>
      <table><thead><tr><th>Region</th><th>Req/s (k)</th><th>Δ%</th><th>24h</th></tr></thead><tbody>
      ${DASH_ROWS.map(([r, v, d, pts, cls]) => `<tr class="${cls}"><td>${r}</td><td class="n">${v}</td><td class="n d">${d}</td><td class="s">${spark(pts)}</td></tr>`).join('')}
      </tbody></table>
    </div>`,
  },
  {
    id: 'container-queries',
    css: css`
      .x { background: #ecebe6; padding: 18px; display: grid; grid-template-columns: 200px 1fr; gap: 16px; font-family: 'Schibsted Grotesk', sans-serif; color: #1d1c1a; align-items: start; }
      .slot { container-type: inline-size; resize: horizontal; overflow: hidden; min-width: 170px; max-width: 100%; border: 1px dashed #a9a59b; border-radius: 6px; padding: 8px; position: relative; }
      .slot > small { display: block; font: 500 10px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #8a867c; margin-bottom: 6px; }
      .card { background: #fff; border-radius: 10px; overflow: hidden; display: grid; gap: 0; }
      .art { aspect-ratio: 16 / 10; background: linear-gradient(140deg, #2f5d50, #9cc1a4); }
      .tx { padding: 12px; }
      .tx b { font: 500 18px/1.15 'Fraunces', serif; display: block; }
      .tx p { margin: 6px 0 0; font-size: 12.5px; color: #6c685f; display: none; line-height: 1.4; }
      .tx span { font: 500 11px 'Spline Sans Mono', monospace; color: #2f5d50; display: block; margin-top: 8px; }
      @container (width > 380px) {
        .card { grid-template-columns: 42% 1fr; }
        .art { aspect-ratio: auto; height: 100%; min-height: 150px; }
        .tx { padding: 16px 18px; }
        .tx b { font-size: 24px; }
        .tx p { display: block; }
      }
      @container (width > 620px) { .tx b { font-size: 32px; } }
      .hint { grid-column: 1 / -1; font-size: 12px; color: #8a867c; margin: 0; }
      @container (width < 520px) { .x { grid-template-columns: 1fr; } .slot.wide { display: none; } }
    `,
    html: html`<div class="x">
      <div class="slot"><small>Sidebar slot</small><div class="card"><div class="art"></div><div class="tx"><b>Forest bathing</b><p>A slow walk with no destination. Notice five sounds, then five smells.</p><span>12 min read</span></div></div></div>
      <div class="slot wide"><small>Main slot · drag corner to resize</small><div class="card"><div class="art"></div><div class="tx"><b>Forest bathing</b><p>A slow walk with no destination. Notice five sounds, then five smells.</p><span>12 min read</span></div></div></div>
      <p class="hint">Same component, same CSS. It reads the width of its slot, not the window.</p>
    </div>`,
  },
  {
    id: 'hero',
    css: css`
      .x { background: #f6f3ee; color: #191713; font-family: 'Schibsted Grotesk', sans-serif; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 28px; padding: 32px clamp(20px, 5cqw, 60px); }
      .k { font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #9a5b22; }
      h2 { font: 600 clamp(32px, 6cqw, 64px)/.98 'Bricolage Grotesque', sans-serif; letter-spacing: -.035em; margin: 12px 0 14px; text-wrap: balance; }
      p { margin: 0 0 22px; color: #5e5a52; font-size: 15px; max-width: 36ch; line-height: 1.45; }
      .cta { display: flex; gap: 14px; align-items: center; }
      .btn { background: #191713; color: #f6f3ee; border: 0; border-radius: 999px; padding: 12px 20px; font-weight: 600; font-size: 14px; }
      .cta a { color: #191713; font-size: 14px; }
      .shot { aspect-ratio: 4 / 3; border-radius: 12px; background: #fff; box-shadow: 0 30px 60px -20px rgb(60 40 20 / .3), 0 0 0 1px rgb(0 0 0 / .06); padding: 10px; display: grid; grid-template-rows: 10px 1fr; gap: 10px; rotate: 2deg; }
      .shot .dots { display: flex; gap: 5px; } .shot .dots i { width: 8px; height: 8px; border-radius: 50%; background: #e3ddd2; }
      .shot .body { display: grid; grid-template-columns: 1fr 2fr; gap: 8px; }
      .shot .body i { background: #f1ede6; border-radius: 6px; }
      .shot .body i:nth-child(2) { background: linear-gradient(160deg, #f0b37e, #d0652c); }
      @container (width < 560px) { .x { grid-template-columns: 1fr; padding: 22px 18px; } .shot { display: none; } }
    `,
    html: html`<div class="x"><div>
      <div class="k">Invoicing for studios</div>
      <h2>Get paid before the coffee goes cold.</h2>
      <p>Send an invoice from your time log in two clicks. Clients pay by card or bank, you see it land.</p>
      <div class="cta"><button class="btn">Start free</button><a href="#">See pricing</a></div>
    </div><div class="shot"><div class="dots"><i></i><i></i><i></i></div><div class="body"><i></i><i></i></div></div></div>`,
  },
  {
    id: 'scrapbook-collage',
    css: css`
      .x { background: #d9c5a3 radial-gradient(circle at 20% 30%, rgb(255 255 255 / .25), transparent 60%); font-family: 'Fraunces', serif; color: #2a2118; }
      .p { position: absolute; background: #fbf8f1; padding: 10px 10px 34px; box-shadow: 0 6px 14px rgb(60 40 20 / .25); }
      .p i { display: block; width: var(--w); aspect-ratio: 1; background: var(--g); }
      .p span { position: absolute; bottom: 9px; left: 12px; font: italic 400 15px 'Fraunces', serif; }
      .tape { position: absolute; width: 74px; height: 22px; background: rgb(240 230 200 / .7); top: -10px; left: 50%; translate: -50% 0; rotate: -4deg; clip-path: polygon(3% 0, 97% 4%, 100% 50%, 96% 100%, 2% 96%, 0 40%); }
      .p1 { left: 6%; top: 10%; rotate: -6deg; --w: clamp(110px, 24cqw, 210px); }
      .p2 { left: 36%; top: 22%; rotate: 4deg; --w: clamp(120px, 26cqw, 230px); z-index: 2; }
      .p3 { right: 6%; top: 8%; rotate: -2deg; --w: clamp(100px, 20cqw, 180px); }
      .note { position: absolute; left: 8%; bottom: 8%; background: #f4e04d; padding: 12px 14px; rotate: 3deg; width: 180px; font: 400 15px/1.25 'Fraunces', serif; box-shadow: 0 4px 10px rgb(60 40 20 / .2); z-index: 3;
        clip-path: polygon(0 2%, 100% 0, 98% 96%, 3% 100%); }
      .stk { position: absolute; right: 12%; bottom: 10%; width: 92px; aspect-ratio: 1; border-radius: 50%; background: #e2532c; color: #fff8ec; display: grid; place-items: center; text-align: center; font: 600 15px/1 'Bricolage Grotesque', sans-serif; rotate: 12deg; box-shadow: 0 0 0 4px #fff8ec, 0 6px 12px rgb(0 0 0 / .25); z-index: 4; }
      .tkt { position: absolute; right: 30%; bottom: 14%; background: #8fb3a9; color: #11302a; padding: 8px 16px; font: 600 12px 'Spline Sans Mono', monospace; letter-spacing: .1em; rotate: -8deg; z-index: 3;
        mask: radial-gradient(circle 6px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 6px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat; }
      @container (width < 520px) { .tkt { display: none; } .note { width: 150px; font-size: 14px; } .p2 { left: 30%; top: 30%; } }
    `,
    html: html`<div class="x">
      <div class="p p1"><div class="tape"></div><i style="--g:linear-gradient(180deg,#9cc3d5,#f2dcb3 55%,#d39a63 56%,#a86b3c)"></i><span>Lisbon, day 2</span></div>
      <div class="p p2"><div class="tape"></div><i style="--g:radial-gradient(circle at 50% 40%,#f6c453 0 20%,#e98a3a 21% 40%,#3d5c50 41%)"></i><span>the good lemons</span></div>
      <div class="p p3"><i style="--g:linear-gradient(160deg,#c46a4a,#5a2d24)"></i><span>tiles!!</span></div>
      <div class="note">Tram 28 at 7am, before anyone else is awake.</div>
      <div class="tkt">ADMIT ONE · 0412</div>
      <div class="stk">wish<br>you were<br>here</div>
    </div>`,
  },
];
