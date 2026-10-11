/**
 * JSON <-> URL-safe base64 (RFC 4648 base64url, no padding). The output only
 * contains [A-Za-z0-9_-], so it is safe in a URL fragment and a bookmark.
 * Decoding returns unknown; callers must validate the shape.
 */
const SAFE = /^[A-Za-z0-9_-]+$/;
const MAX_LENGTH = 8192;

export function encodeHashData(value: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeHashData(encoded: string): unknown {
  if (encoded.length === 0 || encoded.length > MAX_LENGTH || !SAFE.test(encoded)) return undefined;
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return undefined;
  }
}

/** Read one key from a `#key=value&...` fragment. */
export function readHashParam(key: string, hash = window.location.hash): string | undefined {
  return new URLSearchParams(hash.replace(/^#/, '')).get(key) ?? undefined;
}

export function hashWithParam(key: string, value: string): string {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  params.set(key, value);
  return `#${params.toString()}`;
}
