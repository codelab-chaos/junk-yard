/** Copy text and flash feedback on the trigger button. */
export async function copyText(text: string, button?: HTMLElement): Promise<boolean> {
  let ok = true;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    ok = fallbackCopy(text);
  }
  if (button) flash(button, ok ? 'Copied' : 'Copy failed');
  return ok;
}

function fallbackCopy(text: string): boolean {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.append(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  return ok;
}

function flash(button: HTMLElement, label: string): void {
  const original = button.dataset.label ?? button.textContent ?? '';
  button.dataset.label = original;
  button.textContent = label;
  window.setTimeout(() => {
    button.textContent = original;
  }, 1200);
}
