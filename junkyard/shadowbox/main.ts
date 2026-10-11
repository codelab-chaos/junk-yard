import '@styles/base.css';
import './styles.css';
import { byId } from '@lib/dom';
import { BUILT_IN_COLLECTIONS, type Preset } from './presets';
import { deleteUserPreset, loadUserPresets, saveUserPreset, userCollection } from './presets/user-presets';
import { designFromPreset } from './shadow/from-preset';
import { layersToCss } from './shadow/format';
import { cleanName } from './shadow/codec';
import { parseBoxShadow } from './shadow/parse';
import { tintLayers } from './shadow/transforms';
import { DesignStore } from './ui/store';
import { History } from './ui/history';
import { Peek } from './ui/peek';
import { hydrateIcons } from './ui/icons';
import { createToast } from './ui/toast';
import { mountLayerEditor } from './ui/layer-editor';
import { mountStageEditor } from './ui/stage-editor';
import { mountPreview } from './ui/preview';
import { mountLightDrag } from './ui/light-drag';
import { mountOutput } from './ui/output';
import { mountPresetBrowser } from './ui/preset-browser';
import { bindPaste, bindShortcuts } from './ui/shortcuts';
import { copyShareLink, designFromHash, syncHash } from './ui/share';

const fallback = designFromPreset(BUILT_IN_COLLECTIONS[0].presets[13]);
if (!fallback) throw new Error('Default preset failed to parse');

hydrateIcons();

const store = new DesignStore(designFromHash() ?? fallback);
const history = new History(store);
const peek = new Peek();
const toast = createToast(byId('toast'));
let userPresets = loadUserPresets();

const stage = byId('stage');
const light = byId('light');
const preview = mountPreview({ stage, box: byId('box'), light, readout: byId('readout') }, store, peek);
mountLightDrag(stage, light, store);
mountLayerEditor(byId('layers'), store);
mountStageEditor(byId('scene'), store);
const output = mountOutput(byId('output'), store);
syncHash(store);

/** Loads a whole design with a morph, so switching presets reads as one motion. */
const loadDesign = (design: Parameters<DesignStore['load']>[0]) => {
  preview.morph();
  peek.clear();
  store.load(design);
};

// Placard: the editable preset name.
const nameInput = byId<HTMLInputElement>('name');
const showName = () => (nameInput.value = store.current.name);
store.subscribe((_, kind) => kind === 'structure' && showName());
showName();
nameInput.addEventListener('input', () => store.update((d) => (d.name = cleanName(nameInput.value))));

const browser = mountPresetBrowser(byId('library'), {
  collections: () => (userPresets.length ? [userCollection(userPresets), ...BUILT_IN_COLLECTIONS] : BUILT_IN_COLLECTIONS),
  onPeek: (preset?: Preset) => peek.show(preset && designFromPreset(preset)),
  onPick: (preset: Preset) => {
    const design = designFromPreset(preset);
    if (!design) return toast(`Could not read "${preset.name}"`);
    loadDesign(design);
    toast(`Loaded ${preset.name}`);
    if (window.scrollY > stage.offsetTop) window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  onDelete: (preset: Preset) => {
    userPresets = deleteUserPreset(preset.name);
    browser.refresh();
    toast(`Deleted ${preset.name}`);
  },
});

// Top bar actions.
const undoButton = byId<HTMLButtonElement>('undo');
const redoButton = byId<HTMLButtonElement>('redo');
const syncHistoryButtons = () => {
  undoButton.disabled = !history.canUndo;
  redoButton.disabled = !history.canRedo;
};
history.onChange(syncHistoryButtons);
store.subscribe(syncHistoryButtons);
syncHistoryButtons();
undoButton.addEventListener('click', () => history.undo());
redoButton.addEventListener('click', () => history.redo());

const save = () => {
  const { name, layers, stage: scene } = store.current;
  userPresets = saveUserPreset({ name: name || 'Untitled', css: layersToCss(layers), stage: scene });
  browser.refresh();
  toast(`Saved "${name || 'Untitled'}" to My presets`);
};
byId('save').addEventListener('click', save);

const share = () => void copyShareLink(store).then((ok) => toast(ok ? 'Share link copied' : 'Could not copy the link'));
byId('share').addEventListener('click', share);

byId('tint').addEventListener('click', () => {
  store.update((d) => (d.layers = tintLayers(d.layers, d.stage.background)), 'structure');
  toast('Shadow colors tinted from the backdrop');
});

// Import: paste anywhere, or use the import box.
const importCss = (text: string) => {
  const layers = parseBoxShadow(text);
  if (!layers) return toast('That is not a box-shadow I can read');
  loadDesign({ ...store.current, name: 'Imported', layers });
  toast(`Imported ${layers.length} ${layers.length === 1 ? 'layer' : 'layers'}`);
};
bindPaste(importCss);
const importText = byId<HTMLTextAreaElement>('import-text');
byId('import').addEventListener('click', () => importCss(importText.value));

bindShortcuts([
  { keys: 'mod+z', run: () => history.undo() },
  { keys: 'mod+shift+z', run: () => history.redo() },
  { keys: 'mod+y', run: () => history.redo() },
  { keys: 'mod+s', run: save, global: true },
  { keys: 'c', run: output.copy },
  { keys: '/', run: browser.focusSearch },
]);
