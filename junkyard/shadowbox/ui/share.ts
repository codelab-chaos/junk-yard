import { copyText } from '@lib/clipboard';
import { hashWithParam, readHashParam } from '@lib/hash-codec';
import { decodeDesign, encodeDesign } from '../shadow/codec';
import type { ShadowDesign } from '../shadow/model';
import type { DesignStore } from './store';

const PARAM = 's';

export function designFromHash(): ShadowDesign | undefined {
  const encoded = readHashParam(PARAM);
  return encoded ? decodeDesign(encoded) : undefined;
}

export function shareUrl(design: ShadowDesign): string {
  const url = new URL(window.location.href);
  url.hash = hashWithParam(PARAM, encodeDesign(design));
  return url.toString();
}

/**
 * Keeps the URL fragment in sync with the design so the address bar is
 * always a bookmarkable link. Loads designs when the hash changes
 * (opening a bookmark, back/forward).
 */
export function syncHash(store: DesignStore): void {
  let timer = 0;
  store.subscribe(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      history.replaceState(null, '', hashWithParam(PARAM, encodeDesign(store.current)));
    }, 250);
  });
  window.addEventListener('hashchange', () => {
    const encoded = readHashParam(PARAM);
    if (!encoded || encoded === encodeDesign(store.current)) return;
    const design = decodeDesign(encoded);
    if (design) store.load(design);
  });
}

export function copyShareLink(store: DesignStore): Promise<boolean> {
  return copyText(shareUrl(store.current));
}
