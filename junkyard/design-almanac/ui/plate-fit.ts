/** Design canvas for the detail plate on wide screens. */
const PLATE_W = 1040;
const PLATE_H = 600;
/** Below this frame width the example renders fluidly at its real size. */
const FLUID_BELOW = 720;

/**
 * Wide screens see the example as an enlarged plate: laid out on a fixed
 * canvas and zoomed to the frame, so a phone-sized component does not
 * float in empty space. Narrow screens get the real, fluid layout.
 * Returns a function that stops observing.
 */
export function fitPlate(frame: HTMLElement, host: HTMLElement): () => void {
  const ro = new ResizeObserver(([entry]) => {
    const w = entry.contentRect.width;
    const fluid = w < FLUID_BELOW;
    host.style.width = fluid ? '' : `${PLATE_W}px`;
    host.style.height = fluid ? '' : `${PLATE_H}px`;
    host.style.setProperty('zoom', fluid ? '' : String(w / PLATE_W));
    host.toggleAttribute('data-fluid', fluid);
  });
  ro.observe(frame);
  return () => ro.disconnect();
}
