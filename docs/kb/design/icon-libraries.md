# Open icon libraries

Checked 2026-10-16 for Icon Cabinet.

- [Iconify's API](https://iconify.design/docs/api/) exposes SVG artwork, icon data, collections, and search. Icon Cabinet bundles both names and compressed artwork locally after remote requests failed during browser testing.
- [Iconify's source datasets](https://github.com/iconify/icon-sets) provide per-library JSON with names and SVG bodies. The refresh script extracts names and gzips the SVG data per library. A lazy loader handles both raw gzip bytes and hosts that decode them with Content-Encoding.
- Libraries have different licenses. Preserve library and author metadata and link to the specific license instead of describing all icons as attribution-free. Icon Cabinet displays the metadata from Iconify's collections endpoint.
- Phosphor and other libraries represent weights/styles as distinct names. Counts include these variants. Search results show the full name so variants remain distinguishable.
- A library loading failure should leave search usable, disable export of missing data, and expose a retry action in the inspector.
