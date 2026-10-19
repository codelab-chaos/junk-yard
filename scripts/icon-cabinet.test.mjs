import assert from 'node:assert/strict';
import { gunzipSync } from 'node:zlib';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { searchIcons } from '../junkyard/icon-cabinet/search.ts';
const { libraries } = JSON.parse(await readFile(new URL('../public/assets/icon-cabinet/index.json', import.meta.url)));
const icons = libraries.flatMap(library => library.icons.map(name => ({ id: `${library.prefix}:${name}`, name, library })));
test('all indexed names have a library and license', () => {
  assert.equal(libraries.length, 12);
  assert.ok(icons.length > 70000);
  assert.equal(new Set(icons.map(icon => icon.id)).size, icons.length);
  for (const library of libraries) { assert.equal(library.icons.length, library.total); assert.ok(library.license.title); }
});
test('exact match outranks variants; synonyms span libraries', () => {
  const results = searchIcons(icons, 'house', 'lucide');
  assert.equal(results[0].name, 'house');
  assert.ok(results.every(icon => icon.library.prefix === 'lucide'));
  assert.ok(searchIcons(icons, 'home', '').some(icon => icon.name === 'house'));
});
test('multiword search intersects words, filters, and saved icons', () => {
  const saved = new Set(['lucide:arrow-left', 'ph:arrow-left']);
  assert.deepEqual(searchIcons(icons, '  ARROW left ', 'ph', saved).map(icon => icon.id), ['ph:arrow-left']);
  assert.equal(searchIcons(icons, 'zzzzzz-no-such-icon', '').length, 0);
  assert.equal(searchIcons(icons, '', '', new Set()).length, 0);
});

test('every searchable icon has bundled artwork and a license notice', async () => {
  for (const library of libraries) {
    const bytes = await readFile(new URL(`../public/assets/icon-cabinet/${library.prefix}.json.gz`, import.meta.url));
    const data = JSON.parse(gunzipSync(bytes));
    for (const name of library.icons) assert.ok(data.icons[name]?.body, `${library.prefix}:${name}`);
    const license = await readFile(new URL(`../public/assets/icon-cabinet/${library.prefix}-license.txt`, import.meta.url), 'utf8');
    assert.ok(license.length > 100);
    assert.ok(!license.includes('<!DOCTYPE html>'));
  }
});
