const SVG_NS = 'http://www.w3.org/2000/svg';

/** Stroke icons on a 24px grid. Add an icon by adding its path data. */
const PATHS = {
  back: 'M15 6l-6 6 6 6',
  undo: 'M9 14L4 9l5-5M4 9h11a5 5 0 010 10h-3',
  redo: 'M15 14l5-5-5-5M20 9H9a5 5 0 000 10h3',
  up: 'M12 19V5M6 11l6-6 6 6',
  down: 'M12 5v14M6 13l6 6 6-6',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  duplicate: 'M8 8h11v11H8zM5 16V5h11M13.5 11v5M11 13.5h5',
  trash: 'M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13',
  plus: 'M12 5v14M5 12h14',
  droplet: 'M12 3.5s6 6.5 6 10.5a6 6 0 01-12 0c0-4 6-10.5 6-10.5z',
  link: 'M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1',
  save: 'M6 4h12v16l-6-4-6 4z',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4',
  chevron: 'M9 6l6 6-6 6',
  sun: 'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
} as const;

export type IconName = keyof typeof PATHS;

export function icon(name: IconName): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('icon');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', PATHS[name]);
  svg.append(path);
  return svg;
}

/** Puts icons into every element marked data-icon="name" in static markup. */
export function hydrateIcons(root: ParentNode = document): void {
  for (const el of root.querySelectorAll<HTMLElement>('[data-icon]')) {
    el.prepend(icon(el.dataset.icon as IconName));
  }
}
