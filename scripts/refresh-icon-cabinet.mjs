// Refresh searchable names and compressed SVG collections from Iconify.
import { mkdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const prefixes = ['lucide', 'ph', 'tabler', 'heroicons', 'bi', 'ri', 'iconoir', 'carbon', 'mdi', 'material-symbols', 'fluent', 'iconamoon'];
async function get(path) {
  const response = await fetch(`https://api.iconify.design/${path}`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  return response.json();
}
const metadata = await get(`collections?prefixes=${prefixes.join(',')}`);
const libraries = [];
const assets = [];
const licenses = [];
for (const prefix of prefixes) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const response = await fetch(`https://raw.githubusercontent.com/iconify/icon-sets/master/json/${prefix}.json`, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`${prefix}: ${response.status}`);
  const data = await response.json();
  const icons = [...new Set(Object.keys(data.icons).filter(name => !data.icons[name].hidden))].sort();
  if (!icons.length || !metadata[prefix]?.license) throw new Error(`Missing data: ${prefix}`);
  assets.push([prefix, gzipSync(JSON.stringify({width: data.width, height: data.height, icons: data.icons}), { level: 9 })]);
  libraries.push({ prefix, ...metadata[prefix], total: icons.length, icons });
  const licenseUrl = (prefix === 'bi' ? 'https://github.com/twbs/icons/blob/main/LICENSE' : metadata[prefix].license.url ?? 'https://www.apache.org/licenses/LICENSE-2.0.txt')
    .replace('https://creativecommons.org/licenses/by/4.0/', 'https://creativecommons.org/licenses/by/4.0/legalcode.txt')
    .replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('/blob/', '/');
  const licenseResponse = await fetch(licenseUrl);
  if (!licenseResponse.ok) throw new Error(`License unavailable: ${prefix}`);
  licenses.push([prefix, await licenseResponse.text()]);
  console.log(prefix, icons.length);
}
await mkdir('assets/icon-cabinet', { recursive: true });
await writeFile('assets/icon-cabinet/index.json', JSON.stringify({ updated: new Date().toISOString().slice(0, 10), libraries }));

for (const [prefix, data] of assets) await writeFile(`assets/icon-cabinet/${prefix}.json.gz`, data);

for (const [prefix, text] of licenses) await writeFile(`assets/icon-cabinet/${prefix}-license.txt`, text);
