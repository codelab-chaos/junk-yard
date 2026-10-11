const VISIBLE_MS = 2400;

/** Quiet confirmation messages in a single live region. */
export function createToast(root: HTMLElement): (text: string) => void {
  let timer = 0;
  return (text) => {
    root.textContent = text;
    root.classList.add('is-visible');
    window.clearTimeout(timer);
    timer = window.setTimeout(() => root.classList.remove('is-visible'), VISIBLE_MS);
  };
}
