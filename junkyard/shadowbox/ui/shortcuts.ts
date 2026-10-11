/** Keyboard bindings: a key description mapped to an action. Add a shortcut by adding a record. */
export interface Shortcut {
  /** e.g. 'mod+z', 'mod+shift+z', '/', 'c' */
  keys: string;
  run: () => void;
  /** Also fires while typing in a field. */
  global?: boolean;
}

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

function describe(e: KeyboardEvent): string {
  const parts = [];
  if (e.metaKey || e.ctrlKey) parts.push('mod');
  if (e.shiftKey && e.key.length === 1 && /[a-z]/i.test(e.key)) parts.push('shift');
  parts.push(e.key.toLowerCase());
  return parts.join('+');
}

/**
 * Global shortcuts. Single-key shortcuts never fire while typing, and
 * mod+z is left to text fields so their own undo keeps working.
 */
export function bindShortcuts(shortcuts: Shortcut[]): void {
  document.addEventListener('keydown', (e) => {
    const match = shortcuts.find((s) => s.keys === describe(e));
    if (!match || (isTyping(e.target) && !match.global)) return;
    e.preventDefault();
    match.run();
  });
}

/** Paste anywhere outside a text field to hand the text to `onText`. */
export function bindPaste(onText: (text: string) => void): void {
  document.addEventListener('paste', (e) => {
    if (isTyping(e.target)) return;
    const text = e.clipboardData?.getData('text/plain');
    if (!text) return;
    e.preventDefault();
    onText(text);
  });
}
