import { css, html, type Example } from './types';

const PARAS = Array.from({ length: 9 }, (_, i) => `<p><i style="width:${70 + ((i * 17) % 30)}%"></i><i></i><i style="width:${50 + ((i * 23) % 40)}%"></i></p>`).join('');

const COMMANDS = [
  ['Toggle dark theme', 'Appearance', '⌘⇧L'],
  ['Change theme accent', 'Appearance', ''],
  ['Go to Settings', 'Navigation', '⌘,'],
  ['New document', 'Create', '⌘N'],
  ['Invite teammate', 'Workspace', ''],
  ['Open recent: Q3 roadmap', 'Recent', ''],
  ['Export as PDF', 'File', '⌘⇧E'],
];

/** Wrap each matched query character (in order) in <mark>. */
function highlight(text: string, query: string): string {
  const q = query.toLowerCase();
  const at = q ? text.toLowerCase().indexOf(q) : -1;
  if (at >= 0) return `${text.slice(0, at)}<mark>${text.slice(at, at + q.length)}</mark>${text.slice(at + q.length)}`;
  let qi = 0;
  return [...text]
    .map((c) => {
      if (qi < q.length && c.toLowerCase() === q[qi]) {
        qi++;
        return `<mark>${c}</mark>`;
      }
      return c;
    })
    .join('');
}

const fuzzy = (text: string, q: string): boolean => {
  let i = 0;
  for (const c of text.toLowerCase()) if (c === q[i]) i++;
  return i === q.length;
};

const commandRows = (q: string, active: number): string =>
  COMMANDS.filter(([t]) => fuzzy(t, q.toLowerCase()))
    .map(([t, g, k], i) => `<li role="option" aria-selected="${i === active}"><span>${highlight(t, q)}</span><small>${g}</small>${k ? `<kbd>${k}</kbd>` : ''}</li>`)
    .join('') || '<li class="none">No matching commands</li>';

export const NAVIGATION_EXAMPLES: Example[] = [
  {
    id: 'sticky-header',
    css: css`
      .x { background: #fbfaf7; font-family: 'Schibsted Grotesk', sans-serif; color: #23201b; }
      .sc { position: absolute; inset: 0; overflow-y: auto; scrollbar-width: thin; }
      header { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 22px; padding: 16px 24px; transition: padding .25s, background .25s, box-shadow .25s; background: #fbfaf7; }
      .sc[data-stuck] header { padding: 10px 24px; background: rgb(251 250 247 / .78); backdrop-filter: blur(12px); box-shadow: 0 1px 0 #e4dfd5; }
      header b { font: 500 20px 'Fraunces', serif; transition: font-size .25s; } .sc[data-stuck] header b { font-size: 17px; }
      nav { display: flex; gap: 16px; font-size: 13.5px; color: #6b655b; } nav a { color: inherit; text-decoration: none; } nav a:first-child { color: #23201b; font-weight: 600; }
      header button { margin-left: auto; border: 0; background: #23201b; color: #fff; border-radius: 99px; padding: 7px 14px; font-size: 13px; font-weight: 600; }
      .hero { height: 150px; margin: 0 24px; border-radius: 14px; background: linear-gradient(135deg, #e7d6bd, #c9a27a); }
      article { padding: 18px 24px 40px; max-width: 640px; }
      article h3 { font: 400 28px 'Fraunces', serif; margin: 6px 0 14px; }
      p { display: grid; gap: 8px; margin: 0 0 18px; } p i { height: 9px; border-radius: 4px; background: #e8e3da; }
      @container (width < 520px) { nav { display: none; } }
    `,
    html: html`<div class="x"><div class="sc"><header><b>Field Notes</b><nav><a href="#">Journal</a><a href="#">Recipes</a><a href="#">Travel</a><a href="#">About</a></nav><button>Subscribe</button></header>
      <div class="hero"></div><article><h3>Winter pantry</h3>${PARAS}</article></div></div>`,
    setup(root, { signal }) {
      const sc = root.querySelector<HTMLElement>('.sc')!;
      const sync = () => sc.toggleAttribute('data-stuck', sc.scrollTop > 8);
      sc.addEventListener('scroll', sync, { signal, passive: true });
      requestAnimationFrame(() => {
        sc.scrollTop = 170;
        sync();
      });
    },
  },
  {
    id: 'mega-menu',
    css: css`
      .x { background: #f3f1ec; font-family: 'Schibsted Grotesk', sans-serif; color: #1f1d19; }
      .top { display: flex; align-items: center; gap: 4px; padding: 0 22px; height: 56px; background: #fff; border-bottom: 1px solid #e5e1d8; position: relative; z-index: 2; }
      .top b { font: 600 18px 'Bricolage Grotesque', sans-serif; margin-right: 18px; }
      .top button { border: 0; background: transparent; padding: 8px 12px; border-radius: 8px; font-size: 14px; color: inherit; display: flex; gap: 6px; align-items: center; }
      .top button::after { content: ""; width: 6px; height: 6px; border-right: 1.5px solid; border-bottom: 1.5px solid; rotate: 45deg; translate: 0 -2px; transition: rotate .2s; }
      .top button[aria-expanded=true] { background: #f3f1ec; } .top button[aria-expanded=true]::after { rotate: 225deg; translate: 0 2px; }
      .panel { position: absolute; left: 0; right: 0; top: 56px; background: #fff; border-bottom: 1px solid #e5e1d8; box-shadow: 0 24px 40px -24px rgb(40 30 20 / .3); padding: 22px; display: grid; grid-template-columns: repeat(3, 1fr) 1.2fr; gap: 24px; }
      .panel[hidden] { display: none; }
      h5 { margin: 0 0 10px; font: 500 10.5px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #8a8478; }
      .col a { display: block; color: inherit; text-decoration: none; padding: 6px 0; font-size: 14px; }
      .col a small { display: block; color: #8a8478; font-size: 12px; }
      .feat { border-radius: 12px; background: linear-gradient(150deg, #253b34, #4f7a68); color: #f1ede4; padding: 16px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 160px; }
      .feat b { font: 400 22px/1.1 'Fraunces', serif; } .feat span { font-size: 12.5px; opacity: .8; margin-top: 4px; }
      @container (width < 600px) { .panel { grid-template-columns: 1fr 1fr; } .feat, .col:nth-child(3) { display: none; } .top button:nth-of-type(n+3) { display: none; } }
    `,
    html: html`<div class="x"><div class="top"><b>Northfold</b><button aria-expanded="true" aria-controls="mm">Products</button><button aria-expanded="false">Solutions</button><button aria-expanded="false">Resources</button></div>
      <div class="panel" id="mm">
        <div class="col"><h5>Build</h5><a href="#">Editor<small>Write and design together</small></a><a href="#">Components<small>Reusable blocks</small></a><a href="#">Themes</a></div>
        <div class="col"><h5>Ship</h5><a href="#">Hosting<small>Global edge network</small></a><a href="#">Analytics<small>Privacy-first stats</small></a><a href="#">Forms</a></div>
        <div class="col"><h5>Grow</h5><a href="#">Newsletter</a><a href="#">Memberships<small>Paid tiers and gating</small></a><a href="#">Integrations</a></div>
        <div class="feat"><b>Northfold 4 is here</b><span>Real-time collaboration and a new type engine.</span></div>
      </div></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const btn = root.querySelector<HTMLButtonElement>('[aria-controls=mm]')!;
      const panel = root.querySelector<HTMLElement>('#mm')!;
      const set = (open: boolean) => {
        btn.setAttribute('aria-expanded', String(open));
        panel.hidden = !open;
      };
      btn.addEventListener('click', () => set(panel.hidden === true), { signal });
      root.addEventListener('keydown', (e) => (e as KeyboardEvent).key === 'Escape' && (set(false), btn.focus()), { signal });
    },
  },
  {
    id: 'tabs',
    css: css`
      .x { background: #fbf9f5; padding: clamp(20px, 9cqh, 70px) clamp(18px, 8cqw, 120px); font-family: 'Schibsted Grotesk', sans-serif; color: #23201b; }
      .x > * { max-width: 680px; }
      [role=tablist] { display: flex; gap: 4px; border-bottom: 1px solid #e2ddd3; position: relative; }
      [role=tab] { border: 0; background: transparent; padding: 10px 14px; font-size: 15px; color: #77706a; font-weight: 500; }
      [role=tab][aria-selected=true] { color: #23201b; }
      .ind { position: absolute; bottom: -1px; height: 2px; background: #c2512a; left: var(--l, 0); width: var(--w, 80px); transition: left .3s cubic-bezier(.2,.8,.2,1), width .3s cubic-bezier(.2,.8,.2,1); }
      [role=tabpanel] { padding: 18px 0; max-width: 560px; }
      [role=tabpanel][hidden] { display: none; }
      h4 { margin: 0 0 8px; font: 400 30px 'Fraunces', serif; }
      p { margin: 0 0 12px; font-size: 15px; line-height: 1.5; color: #5d574e; }
      dl { display: grid; grid-template-columns: 140px 1fr; gap: 8px 16px; margin: 0; font-size: 14px; } dt { color: #8a8478; } dd { margin: 0; }
    `,
    html: html`<div class="x"><div role="tablist" aria-label="Product">
      <button role="tab" aria-selected="true" aria-controls="p1" id="t1">Overview</button><button role="tab" aria-selected="false" aria-controls="p2" id="t2" tabindex="-1">Specs</button><button role="tab" aria-selected="false" aria-controls="p3" id="t3" tabindex="-1">Reviews</button><i class="ind"></i></div>
      <div role="tabpanel" id="p1" aria-labelledby="t1"><h4>Field kettle, 1.2 litre</h4><p>Spun from one sheet of steel, with a beech handle that stays cool. Boils on gas, induction or a campfire.</p><p>Arrow keys move between tabs; the indicator follows.</p></div>
      <div role="tabpanel" id="p2" aria-labelledby="t2" hidden><dl><dt>Capacity</dt><dd>1.2 L</dd><dt>Weight</dt><dd>780 g</dd><dt>Material</dt><dd>18/10 steel, beech</dd><dt>Hobs</dt><dd>Gas, induction, open fire</dd></dl></div>
      <div role="tabpanel" id="p3" aria-labelledby="t3" hidden><p>“Ten years and it still whistles like the first morning.” Ana, Porto</p><p>“Heavy, honest, beautiful.” Jonas, Bergen</p></div></div>`,
    setup(root, { signal, interactive }) {
      const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role=tab]')];
      const ind = root.querySelector<HTMLElement>('.ind')!;
      const place = (t: HTMLElement) => {
        ind.style.setProperty('--l', `${t.offsetLeft}px`);
        ind.style.setProperty('--w', `${t.offsetWidth}px`);
      };
      requestAnimationFrame(() => place(tabs[0]));
      if (!interactive) return;
      const select = (t: HTMLButtonElement) => {
        for (const o of tabs) {
          const on = o === t;
          o.setAttribute('aria-selected', String(on));
          o.tabIndex = on ? 0 : -1;
          root.getElementById(o.getAttribute('aria-controls')!)!.hidden = !on;
        }
        place(t);
        t.focus();
      };
      tabs.forEach((t, i) => {
        t.addEventListener('click', () => select(t), { signal });
        t.addEventListener(
          'keydown',
          (e) => {
            const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (d) select(tabs[(i + d + tabs.length) % tabs.length]);
          },
          { signal },
        );
      });
    },
  },
  {
    id: 'off-canvas-drawer',
    css: css`
      .x { background: #fbfaf6; font-family: 'Schibsted Grotesk', sans-serif; color: #22201b; overflow: hidden; }
      .page { position: absolute; inset: 0; }
      .bar { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-bottom: 1px solid #e6e1d8; }
      .bar button { width: 40px; height: 40px; border: 0; border-radius: 10px; background: #f0ece4; display: grid; place-content: center; gap: 4px; }
      .bar button i { display: block; width: 18px; height: 2px; background: #22201b; border-radius: 2px; }
      .bar b { font: 500 19px 'Fraunces', serif; }
      .content { padding: 18px; display: grid; gap: 12px; } .content i { height: 12px; border-radius: 4px; background: #ebe6dc; } .content i:first-child { height: 120px; border-radius: 12px; background: linear-gradient(135deg, #d9c3a5, #b38b62); }
      .scrim { position: absolute; inset: 0; background: rgb(25 20 15 / .45); opacity: 0; pointer-events: none; transition: opacity .3s; }
      .drawer { position: absolute; top: 0; bottom: 0; left: 0; width: min(78%, 300px); background: #22201b; color: #f3efe6; padding: 22px; translate: -100% 0; transition: translate .35s cubic-bezier(.2,.8,.2,1); display: flex; flex-direction: column; gap: 4px; }
      .x[data-open] .scrim { opacity: 1; pointer-events: auto; } .x[data-open] .drawer { translate: 0 0; }
      .drawer small { font: 500 10.5px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #a59e90; margin-bottom: 10px; }
      .drawer a { color: inherit; text-decoration: none; font: 400 26px/1.3 'Fraunces', serif; }
      .drawer a:first-of-type { color: #ff8a5b; }
      .drawer .close { margin-top: auto; align-self: start; border: 1px solid #4a463e; background: transparent; color: inherit; border-radius: 99px; padding: 6px 14px; font-size: 13px; }
    `,
    html: html`<div class="x" data-open><div class="page"><div class="bar"><button aria-label="Open menu" aria-expanded="true"><i></i><i></i><i></i></button><b>Harbour Bakery</b></div><div class="content"><i></i><i></i><i style="width:70%"></i><i></i><i style="width:50%"></i></div></div>
      <div class="scrim"></div><nav class="drawer" aria-label="Main"><small>Menu</small><a href="#">Today's bread</a><a href="#">Pastries</a><a href="#">Orders</a><a href="#">Visit us</a><button class="close">Close</button></nav></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const x = root.querySelector<HTMLElement>('.x')!;
      const page = root.querySelector<HTMLElement>('.page')!;
      const burger = root.querySelector<HTMLButtonElement>('.bar button')!;
      const set = (open: boolean) => {
        x.toggleAttribute('data-open', open);
        burger.setAttribute('aria-expanded', String(open));
        page.inert = open;
        if (!open) burger.focus();
      };
      set(true);
      burger.addEventListener('click', () => set(true), { signal });
      root.querySelector('.close')!.addEventListener('click', () => set(false), { signal });
      root.querySelector('.scrim')!.addEventListener('click', () => set(false), { signal });
      root.addEventListener('keydown', (e) => (e as KeyboardEvent).key === 'Escape' && set(false), { signal });
    },
  },
  {
    id: 'command-palette',
    css: css`
      .x { background: #ece9e2; font-family: 'Schibsted Grotesk', sans-serif; color: #201e1a; display: grid; place-items: start center; padding-top: 34px; }
      .app { position: absolute; inset: 0; padding: 16px; display: grid; grid-template-columns: 150px 1fr; gap: 14px; filter: blur(1px); opacity: .5; }
      .app i { border-radius: 10px; background: #dcd7cd; } .app i:last-child { background: #f6f4ef; }
      .scr { position: absolute; inset: 0; background: rgb(40 34 26 / .25); }
      .pal { position: relative; width: min(92%, 520px); background: #fbfaf7; border-radius: 14px; box-shadow: 0 0 0 1px rgb(0 0 0 / .08), 0 30px 60px -20px rgb(30 20 10 / .45); overflow: hidden; }
      .in { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid #e7e2d8; }
      .in svg { width: 16px; height: 16px; flex: none; }
      input { flex: 1; border: 0; outline: none; background: transparent; font: 16px 'Schibsted Grotesk', sans-serif; color: inherit; min-width: 0; }
      .in kbd, li kbd { font: 11px 'Spline Sans Mono', monospace; color: #7d776b; border: 1px solid #ddd7cc; border-radius: 5px; padding: 1px 6px; }
      ul { list-style: none; margin: 0; padding: 6px; max-height: 260px; overflow: auto; }
      li { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; font-size: 14px; }
      li span { flex: 1; } li small { color: #8a8478; font-size: 12px; }
      li[aria-selected=true] { background: #201e1a; color: #fbfaf7; } li[aria-selected=true] small, li[aria-selected=true] kbd { color: #c9c3b6; border-color: #4a463e; }
      mark { background: none; color: #c2512a; font-weight: 700; } li[aria-selected=true] mark { color: #ff9a6b; }
      li.none { color: #8a8478; }
      .ft { display: flex; gap: 14px; padding: 8px 16px; border-top: 1px solid #e7e2d8; font: 11px 'Spline Sans Mono', monospace; color: #8a8478; }
    `,
    html: html`<div class="x"><div class="app"><i></i><i></i></div><div class="scr"></div><div class="pal" role="dialog" aria-label="Command palette">
      <div class="in"><svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11 11l4 4" stroke="currentColor" stroke-width="1.6"/></svg><input value="theme" aria-label="Search commands" role="combobox" aria-expanded="true"><kbd>esc</kbd></div>
      <ul role="listbox">${commandRows('theme', 0)}</ul>
      <div class="ft"><span>↑↓ move</span><span>↵ run</span><span>⌘K toggle</span></div></div></div>`,
    setup(root, { signal, interactive }) {
      if (!interactive) return;
      const input = root.querySelector<HTMLInputElement>('input')!;
      const list = root.querySelector<HTMLElement>('ul')!;
      let active = 0;
      // Markup comes only from the authored COMMANDS list; the query is matched per character and never inserted raw.
      const render = () => (list.innerHTML = commandRows(input.value.replace(/[<>&"]/g, ''), active));
      input.addEventListener('input', () => ((active = 0), render()), { signal });
      input.addEventListener(
        'keydown',
        (e) => {
          const n = list.querySelectorAll('[role=option]').length;
          if (!n) return;
          if (e.key === 'ArrowDown') active = (active + 1) % n;
          else if (e.key === 'ArrowUp') active = (active - 1 + n) % n;
          else return;
          e.preventDefault();
          render();
        },
        { signal },
      );
    },
  },
];
