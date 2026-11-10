import type { Icon } from './search';
interface Shape { body: string; width?: number; height?: number; left?: number; top?: number }
interface Collection { width?: number; height?: number; icons: Record<string, Shape> }
const collections = new Map<string, Promise<Collection>>();
export async function getSvg(icon: Icon): Promise<string> {
  const prefix = icon.library.prefix;
  if (!collections.has(prefix)) {
    collections.set(prefix, (async () => {
      const response = await fetch(`../../assets/icon-cabinet/${prefix}.json.gz`);
      if (!response.ok || !response.body) throw new Error('Library unavailable');
      // Vite may decode .gz via Content-Encoding; static hosts may serve raw bytes.
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
        return await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).json() as Collection;
      }
      return JSON.parse(new TextDecoder().decode(bytes)) as Collection;
    })().catch(error => { collections.delete(prefix); throw error; }));
  }
  const collection = await collections.get(prefix)!;
  const shape = collection.icons[icon.name];
  if (!shape) throw new Error('Icon unavailable');
  const width = shape.width ?? collection.width ?? 16;
  const height = shape.height ?? collection.height ?? 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${shape.left ?? 0} ${shape.top ?? 0} ${width} ${height}">${shape.body}</svg>`;
}
export function svgUrl(svg: string): string { return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`; }
