import { h } from '@lib/dom';

const smooth = (): ScrollBehavior => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

/** Scroll to an element and move focus to it, without touching the hash (it holds the guide's state). */
function goTo(target: HTMLElement, focus: HTMLElement) {
  target.scrollIntoView({ block: 'start', behavior: smooth() });
  if (!focus.hasAttribute('tabindex')) focus.setAttribute('tabindex', '-1');
  focus.focus({ preventScroll: true });
}

let observer: IntersectionObserver | undefined;

/**
 * The docked index: the current view's sections, read from the rendered page
 * ([data-dock] sections), with the section in view marked and its entries
 * listed underneath for jumping between items. Rebuilt after every render.
 */
export function renderDock(dock: HTMLElement, main: HTMLElement, title: string): void {
  observer?.disconnect();
  const sections = [...main.querySelectorAll<HTMLElement>('[data-dock]')];
  const links = new Map<HTMLElement, HTMLElement>();

  const entryLinks = (scope: ParentNode) =>
    [...scope.querySelectorAll<HTMLElement>('.entry')].map((li) => {
      const toggle = li.querySelector<HTMLElement>('.e-toggle')!;
      const a = h('a', { href: `#${li.id}`, class: 'dock-entry', 'data-tape': li.dataset.tape }, li.querySelector('.e-title')?.textContent ?? '');
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        goTo(li, toggle);
      });
      return h('li', {}, a);
    });

  const items = sections.map((sec) => {
    const heading = sec.querySelector<HTMLElement>('h2') ?? sec;
    const count = sec.querySelectorAll('.entry').length;
    const a = h(
      'a',
      { href: `#${sec.id}`, class: 'dock-link', 'data-tape': sec.dataset.tape },
      sec.dataset.dockN ? h('span', { class: 'dock-n' }, sec.dataset.dockN) : null,
      h('span', { class: 'dock-name' }, sec.dataset.dock!),
      count ? h('span', { class: 'dock-c' }, String(count)) : null,
    );
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      goTo(sec, heading);
    });
    links.set(sec, a);
    const sub = h('ol', { class: 'dock-sub' }, ...entryLinks(sec));
    return h('li', { class: 'dock-item' }, a, count ? sub : null);
  });

  // Search results have no sections: list the matches themselves.
  const body = items.length ? h('ol', { class: 'dock-list' }, ...items) : h('ol', { class: 'dock-sub dock-flat' }, ...entryLinks(main));

  const toSearch = h('button', { type: 'button', class: 'dock-search' }, 'Search', h('kbd', {}, '/'));
  toSearch.addEventListener('click', () => {
    const q = document.getElementById('q');
    if (q) goTo(document.getElementById('finder')!, q);
  });
  const toTop = h('a', { href: '#top', class: 'dock-top' }, '↑ Top');
  toTop.addEventListener('click', (ev) => {
    ev.preventDefault();
    window.scrollTo({ top: 0, behavior: smooth() });
  });

  dock.replaceChildren(h('nav', { class: 'dock-nav', 'aria-label': 'Index of this view' }, h('p', { class: 'dock-title' }, title), body, h('p', { class: 'dock-tools' }, toSearch, toTop)));

  // Mark the section nearest the top of the viewport as current.
  if (!sections.length) return;
  const visible = new Set<HTMLElement>();
  let last: HTMLElement | null = null;
  observer = new IntersectionObserver(
    (records) => {
      for (const r of records) (r.isIntersecting ? visible.add(r.target as HTMLElement) : visible.delete(r.target as HTMLElement));
      // Between sections nothing intersects the band; keep the last one marked.
      const current = sections.find((s) => visible.has(s)) ?? last;
      last = current;
      for (const [sec, a] of links) {
        const on = sec === current;
        if (on) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
        a.parentElement!.classList.toggle('is-current', on);
        // On narrow screens the dock is a horizontal strip: keep the current section in it.
        const strip = a.closest<HTMLElement>('.dock-list');
        if (on && strip && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: a.parentElement!.offsetLeft - 16, behavior: smooth() });
      }
    },
    { rootMargin: '-15% 0px -70% 0px' },
  );
  for (const s of sections) observer.observe(s);
}
