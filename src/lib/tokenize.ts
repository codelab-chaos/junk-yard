const STOPWORDS = new Set(
  'a an and are as at be by for from has have in is it its of on or that the this to was were will with you your'.split(' '),
);

/** Lowercase word tokens, shared by the index builder and the search UI. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export function uniqueTokens(...texts: string[]): string[] {
  return [...new Set(texts.flatMap(tokenize))].sort();
}
