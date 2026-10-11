import { EXAMPLES } from '../examples';
import { mountExample, THUMB_W } from './stage';

/**
 * Thumbnails mount their live example only when they first come near the
 * viewport, and pause their animations whenever they leave it, so the
 * index never runs fifty demos at once. Each frame is zoomed from the
 * 720px design size to its actual width.
 */
export function lazyThumbs(frames: HTMLElement[]): void {
  const mounted = new WeakSet<HTMLElement>();

  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const host = target.firstElementChild as HTMLElement | null;
        if (!host) continue;
        host.toggleAttribute('data-paused', !isIntersecting);
        if (isIntersecting && !mounted.has(host)) {
          const example = EXAMPLES.get(host.dataset.example ?? '');
          if (example) mountExample(host, example, false);
          mounted.add(host);
        }
      }
    },
    { rootMargin: '240px 0px' },
  );

  const ro = new ResizeObserver((entries) => {
    for (const { target, contentRect } of entries) {
      (target as HTMLElement).style.setProperty('--z', String(contentRect.width / THUMB_W));
    }
  });

  for (const frame of frames) {
    io.observe(frame);
    ro.observe(frame);
  }
}
