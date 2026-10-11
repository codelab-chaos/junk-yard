import { h } from '@lib/dom';

/** Token classes, matched in order. Add a rule by adding a record. */
const RULES: { kind: string; pattern: RegExp }[] = [
  { kind: 'color', pattern: /#[0-9a-f]{3,8}\b|(?:rgba?|hsla?|oklch)\([^)]*\)/iy },
  { kind: 'number', pattern: /-?\d*\.?\d+(?:px|rem|em|%)?/y },
  { kind: 'keyword', pattern: /\b(?:inset|none)\b/y },
  { kind: 'property', pattern: /[a-z-]+(?=\s*:)|boxShadow|--shadow|shadow-\[/iy },
];

/** Splits a code snippet into spans for color coding. Text nodes only, so it is injection-safe. */
export function highlight(code: string): (Node | string)[] {
  const out: (Node | string)[] = [];
  let plain = '';
  let i = 0;
  while (i < code.length) {
    const rule = RULES.find((r) => {
      r.pattern.lastIndex = i;
      return r.pattern.test(code);
    });
    if (!rule) {
      plain += code[i++];
      continue;
    }
    const end = rule.pattern.lastIndex;
    if (plain) out.push(plain);
    plain = '';
    out.push(h('span', { class: `tok-${rule.kind}` }, code.slice(i, end)));
    i = end;
  }
  if (plain) out.push(plain);
  return out;
}
