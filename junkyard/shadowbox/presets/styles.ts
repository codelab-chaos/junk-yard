import type { PresetCollection } from './types';

export const everyday: PresetCollection = {
  id: 'everyday',
  name: 'Everyday cards',
  note: 'Common single and double layer shadows seen across the web.',
  presets: [
    { name: 'Whisper', css: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' },
    { name: 'Hairline lift', css: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' },
    { name: 'Soft card', css: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' },
    { name: 'Clean card', css: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' },
    { name: 'Cool gray card', css: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' },
    { name: 'Diffuse', css: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' },
    { name: 'Crisp', css: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' },
    { name: 'Bold', css: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' },
    { name: 'Card + border', css: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' },
    { name: 'Two-tone', css: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' },
    { name: 'Lifted', css: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px' },
    { name: 'Floating', css: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px' },
    { name: 'Hovering', css: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px' },
    { name: 'Indigo glow card', css: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' },
    { name: 'Deep indigo', css: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' },
    { name: 'Bottom only', css: 'rgba(0, 0, 0, 0.15) 0px 8px 6px -6px' },
    { name: 'Top bar', css: 'rgba(0, 0, 0, 0.1) 0px 1px 0px 0px' },
    { name: 'Sticky header', css: 'rgba(0, 0, 0, 0.08) 0px 2px 4px 0px, rgba(0, 0, 0, 0.06) 0px 1px 0px 0px' },
    {
      name: 'Dramatic stack',
      css: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    },
  ],
};

export const overlays: PresetCollection = {
  id: 'overlays',
  name: 'Menus, popovers, modals',
  presets: [
    { name: 'Dropdown menu', css: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.15)' },
    { name: 'Popover', css: '0 2px 8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)' },
    { name: 'Tooltip', css: '0 2px 6px rgba(0, 0, 0, 0.2)' },
    { name: 'Toast', css: '0 8px 20px -4px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.08)' },
    { name: 'Modal dialog', css: '0 24px 48px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05)' },
    { name: 'Desktop window (macOS-style)', css: '0 22px 70px 4px rgba(0, 0, 0, 0.56)' },
    { name: 'Bottom sheet', css: '0 -4px 16px rgba(0, 0, 0, 0.12)' },
    { name: 'Command palette', css: '0 0 0 1px rgba(0, 0, 0, 0.08), 0 16px 70px rgba(0, 0, 0, 0.2)' },
  ],
};

export const layered: PresetCollection = {
  id: 'layered',
  name: 'Layered smooth',
  note: 'Many stacked layers with doubling offsets for very soft, realistic shadows.',
  presets: [
    {
      name: 'Smooth 3',
      css: '0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.12)',
    },
    {
      name: 'Smooth 5',
      css: '0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11), 0 8px 8px rgba(0, 0, 0, 0.11), 0 16px 16px rgba(0, 0, 0, 0.11)',
    },
    {
      name: 'Smooth 6',
      css: '0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11), 0 8px 8px rgba(0, 0, 0, 0.11), 0 16px 16px rgba(0, 0, 0, 0.11), 0 32px 32px rgba(0, 0, 0, 0.11)',
    },
    {
      name: 'Sharp layered',
      css: '0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15)',
    },
    {
      name: 'Long dreamy',
      css: '0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07)',
    },
    {
      name: 'Warm tinted (low)',
      css: '0.3px 0.5px 0.7px hsl(30deg 30% 50% / 0.34), 0.4px 0.8px 1px -1.2px hsl(30deg 30% 50% / 0.34), 1px 2px 2.5px -2.5px hsl(30deg 30% 50% / 0.34)',
      stage: { background: '#f6efe6', surface: '#fffaf3' },
    },
    {
      name: 'Warm tinted (high)',
      css: '0.3px 0.5px 0.7px hsl(30deg 30% 50% / 0.3), 1.5px 2.9px 3.7px -0.4px hsl(30deg 30% 50% / 0.3), 2.7px 5.4px 6.8px -0.7px hsl(30deg 30% 50% / 0.3), 4.5px 8.9px 11.2px -1.1px hsl(30deg 30% 50% / 0.3), 7.1px 14.3px 18px -1.4px hsl(30deg 30% 50% / 0.3), 11.2px 22.3px 28.1px -1.8px hsl(30deg 30% 50% / 0.3), 17px 33.9px 42.7px -2.1px hsl(30deg 30% 50% / 0.3), 25px 50px 62.9px -2.5px hsl(30deg 30% 50% / 0.3)',
      stage: { background: '#f6efe6', surface: '#fffaf3' },
    },
  ],
};

const NEU = { background: '#e0e0e0', surface: '#e0e0e0', radius: 40 };

export const neumorphism: PresetCollection = {
  id: 'neumorphism',
  name: 'Neumorphism',
  note: 'Light + dark pair on a surface that matches the background.',
  presets: [
    { name: 'Raised', css: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff', stage: NEU },
    { name: 'Raised subtle', css: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff', stage: NEU },
    { name: 'Raised tight', css: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff', stage: NEU },
    { name: 'Pressed', css: 'inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff', stage: NEU },
    { name: 'Pressed subtle', css: 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff', stage: NEU },
    {
      name: 'Dark raised',
      css: '12px 12px 24px #1b1d21, -12px -12px 24px #353943',
      stage: { background: '#282b32', surface: '#282b32', radius: 40 },
    },
    {
      name: 'Dark pressed',
      css: 'inset 8px 8px 16px #1b1d21, inset -8px -8px 16px #353943',
      stage: { background: '#282b32', surface: '#282b32', radius: 40 },
    },
    {
      name: 'Pastel raised',
      css: '10px 10px 20px #c4c9e6, -10px -10px 20px #ffffff',
      stage: { background: '#e6ebff', surface: '#e6ebff', radius: 40 },
    },
  ],
};

const DARK = { background: '#0d0f14', surface: '#151821' };

export const glow: PresetCollection = {
  id: 'glow',
  name: 'Glow and neon',
  presets: [
    { name: 'Cyan neon', css: '0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 20px #00e5ff, 0 0 40px #00e5ff', stage: DARK },
    { name: 'Magenta neon', css: '0 0 5px #ff2bd6, 0 0 15px #ff2bd6, 0 0 30px #ff2bd6, 0 0 60px #ff2bd6', stage: DARK },
    { name: 'Lime neon', css: '0 0 4px #a6ff00, 0 0 12px #a6ff00, 0 0 24px #a6ff00', stage: DARK },
    { name: 'Neon tube (inner + outer)', css: 'inset 0 0 12px #00e5ff, 0 0 12px #00e5ff, 0 0 32px #0077ff', stage: DARK },
    { name: 'Soft blue glow', css: '0 0 24px rgba(59, 130, 246, 0.5)', stage: DARK },
    { name: 'Gradient-ish aura', css: '-12px 0 40px rgba(236, 72, 153, 0.5), 12px 0 40px rgba(59, 130, 246, 0.5)', stage: DARK },
    { name: 'Warm ember', css: '0 0 10px rgba(255, 140, 0, 0.6), 0 0 40px rgba(255, 69, 0, 0.4)', stage: DARK },
    { name: 'Light-mode colored lift', css: '0 10px 30px -10px rgba(99, 102, 241, 0.6)' },
    { name: 'Button glow (green)', css: '0 4px 14px 0 rgba(16, 185, 129, 0.39)' },
  ],
};

export const hard: PresetCollection = {
  id: 'hard',
  name: 'Hard, retro, brutalist',
  presets: [
    { name: 'Brutalist 4px', css: '4px 4px 0 0 #000000', stage: { radius: 0 } },
    { name: 'Brutalist 8px', css: '8px 8px 0 0 #000000', stage: { radius: 0 } },
    { name: 'Brutalist border + offset', css: '0 0 0 2px #000000, 6px 6px 0 2px #000000', stage: { radius: 0, surface: '#ffde59' } },
    {
      name: 'Retro stack',
      css: '5px 5px rgba(240, 46, 170, 0.4), 10px 10px rgba(240, 46, 170, 0.3), 15px 15px rgba(240, 46, 170, 0.2), 20px 20px rgba(240, 46, 170, 0.1), 25px 25px rgba(240, 46, 170, 0.05)',
    },
    { name: 'Long 3D block', css: '1px 1px 0 #444, 2px 2px 0 #444, 3px 3px 0 #444, 4px 4px 0 #444, 5px 5px 0 #444, 6px 6px 0 #444', stage: { radius: 4 } },
    { name: 'Pixel border', css: '0 -4px 0 0 #000, 0 4px 0 0 #000, -4px 0 0 0 #000, 4px 0 0 0 #000', stage: { radius: 0 } },
    { name: 'Double outline', css: '0 0 0 4px #ffffff, 0 0 0 8px #000000' },
    { name: 'Paper on paper', css: '3px 3px 0 -1px #ffffff, 3px 3px 0 0 #333333, 6px 6px 0 -1px #ffffff, 6px 6px 0 0 #333333', stage: { radius: 0 } },
  ],
};

export const rings: PresetCollection = {
  id: 'rings',
  name: 'Borders and focus rings',
  note: 'Spread-only shadows that act like borders without changing layout.',
  presets: [
    { name: 'Hairline border', css: '0 0 0 1px rgba(0, 0, 0, 0.1)' },
    { name: 'Inner hairline', css: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)' },
    { name: 'Focus ring blue', css: '0 0 0 3px rgba(66, 153, 225, 0.5)' },
    { name: 'Focus ring with offset', css: '0 0 0 2px #ffffff, 0 0 0 4px #6366f1' },
    { name: 'Error ring', css: '0 0 0 3px rgba(239, 68, 68, 0.35)' },
    { name: 'Success ring', css: '0 0 0 3px rgba(34, 197, 94, 0.35)' },
    { name: 'Selected card', css: '0 0 0 2px #2563eb, 0 4px 12px rgba(37, 99, 235, 0.25)' },
    { name: 'Rainbow rings', css: '0 0 0 3px #ef4444, 0 0 0 6px #f59e0b, 0 0 0 9px #22c55e, 0 0 0 12px #3b82f6, 0 0 0 15px #8b5cf6' },
  ],
};

export const insets: PresetCollection = {
  id: 'insets',
  name: 'Inset and pressed',
  presets: [
    { name: 'Input well', css: 'inset 0 1px 2px rgba(0, 0, 0, 0.075)' },
    { name: 'Pressed button', css: 'inset 0 3px 5px rgba(0, 0, 0, 0.125)' },
    { name: 'Deep well', css: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)' },
    { name: 'Inner glow', css: 'inset 0 0 20px rgba(59, 130, 246, 0.5)' },
    { name: 'Vignette', css: 'inset 0 0 60px rgba(0, 0, 0, 0.5)' },
    { name: 'Top highlight', css: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 3px rgba(0, 0, 0, 0.3)', stage: DARK },
    { name: 'Glass edge', css: 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 8px 32px rgba(31, 38, 135, 0.2)', stage: { background: '#8ea6ff', surface: '#b8c6ff' } },
    { name: 'Skeuo button', css: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -2px 0 rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.2)', stage: { surface: '#f4f4f6' } },
  ],
};
