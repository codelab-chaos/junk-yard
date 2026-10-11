import '@styles/base.css';
import './styles.css';
import { byId } from '@lib/dom';
import { BUILT_IN_COLLECTIONS, type Preset } from './presets';
import { deleteUserPreset, loadUserPresets, saveUserPreset, userCollection } from './presets/user-presets';
import { designFromPreset } from './shadow/from-preset';
import { layersToCss } from './shadow/format';
import { cleanName } from './shadow/codec';
import { parseBoxShadow } from './shadow/parse';
import { DesignStore } from './ui/store';
import { mountLayerEditor } from './ui/layer-editor';
import { mountStageEditor } from './ui/stage-editor';
import { mountPreview } from './ui/preview';
import { mountOutput } from './ui/output';
import { mountPresetBrowser } from './ui/preset-browser';
import { copyShareLink, designFromHash, syncHash } from './ui/share';

const fallback = designFromPreset(BUILT_IN_COLLECTIONS[0].presets[4]);
if (!fallback) throw new Error('Default preset failed to parse');

const store = new DesignStore(designFromHash() ?? fallback);
let userPresets = loadUserPresets();

mountPreview(byId('stage'), byId('box'), store);
mountLayerEditor(byId('layers'), store);
mountStageEditor(byId('stage-controls'), store);
mountOutput(byId('output'), store);
syncHash(store);

const nameInput = byId<HTMLInputElement>('name');
const status = byId<HTMLSpanElement>('status');
const say = (text: string) => {
  status.textContent = text;
  window.setTimeout(() => status.textContent === text && (status.textContent = ''), 2500);
};

const showName = () => (nameInput.value = store.current.name);
store.subscribe((_, kind) => kind === 'structure' && showName());
showName();
nameInput.addEventListener('input', () => store.update((d) => (d.name = cleanName(nameInput.value))));

const browser = mountPresetBrowser(byId('library'), {
  collections: () => (userPresets.length ? [userCollection(userPresets), ...BUILT_IN_COLLECTIONS] : BUILT_IN_COLLECTIONS),
  onPick: (preset: Preset) => {
    const design = designFromPreset(preset);
    if (!design) return say(`Could not parse "${preset.name}"`);
    store.load(design);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  onDelete: (preset: Preset) => {
    userPresets = deleteUserPreset(preset.name);
    browser.refresh();
  },
});

byId('save').addEventListener('click', () => {
  const { name, layers, stage } = store.current;
  userPresets = saveUserPreset({ name: name || 'Untitled', css: layersToCss(layers), stage });
  browser.refresh();
  say(`Saved "${name || 'Untitled'}" to My presets`);
});

const shareButton = byId('share');
shareButton.addEventListener('click', () => copyShareLink(store, shareButton));

const importText = byId<HTMLTextAreaElement>('import-text');
byId('import').addEventListener('click', () => {
  const layers = parseBoxShadow(importText.value);
  if (!layers) return say('Could not read that box-shadow');
  store.load({ ...store.current, name: 'Imported', layers });
  say(`Imported ${layers.length} layer${layers.length === 1 ? '' : 's'}`);
});
