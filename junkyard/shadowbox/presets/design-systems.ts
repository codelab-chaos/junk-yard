import type { PresetCollection } from './types';

export const tailwind: PresetCollection = {
  id: 'tailwind',
  name: 'Tailwind CSS',
  note: 'v3 scale plus the v4 additions (2xs, xs, inset-shadow-*). md and up are identical in both.',
  presets: [
    { name: 'shadow-2xs (v4)', css: '0 1px rgb(0 0 0 / 0.05)' },
    { name: 'shadow-xs (v4)', css: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
    { name: 'shadow-sm (v3)', css: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
    { name: 'shadow (v3) / shadow-sm (v4)', css: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
    { name: 'shadow-md', css: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
    { name: 'shadow-lg', css: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
    { name: 'shadow-xl', css: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
    { name: 'shadow-2xl', css: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
    { name: 'shadow-inner (v3)', css: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' },
    { name: 'inset-shadow-2xs (v4)', css: 'inset 0 1px rgb(0 0 0 / 0.05)' },
    { name: 'inset-shadow-xs (v4)', css: 'inset 0 1px 1px rgb(0 0 0 / 0.05)' },
    { name: 'inset-shadow-sm (v4)', css: 'inset 0 2px 4px rgb(0 0 0 / 0.05)' },
    { name: 'ring-2 + ring-offset-2', css: '0 0 0 2px #ffffff, 0 0 0 4px #3b82f6' },
  ],
};

export const bootstrap: PresetCollection = {
  id: 'bootstrap',
  name: 'Bootstrap 5',
  presets: [
    { name: '.shadow-sm', css: '0 .125rem .25rem rgba(0, 0, 0, .075)' },
    { name: '.shadow', css: '0 .5rem 1rem rgba(0, 0, 0, .15)' },
    { name: '.shadow-lg', css: '0 1rem 3rem rgba(0, 0, 0, .175)' },
    { name: 'focus ring', css: '0 0 0 .25rem rgba(13, 110, 253, .25)' },
    { name: 'inset (form-control)', css: 'inset 0 1px 2px rgba(0, 0, 0, .075)' },
  ],
};

export const material3: PresetCollection = {
  id: 'material3',
  name: 'Material 3',
  note: 'Elevation levels 1 to 5 (key + ambient shadow).',
  presets: [
    { name: 'Level 1', css: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)' },
    { name: 'Level 2', css: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)' },
    { name: 'Level 3', css: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)' },
    { name: 'Level 4', css: '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)' },
    { name: 'Level 5', css: '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)' },
  ],
};

export const chakra: PresetCollection = {
  id: 'chakra',
  name: 'Chakra UI',
  presets: [
    { name: 'xs', css: '0 0 0 1px rgba(0, 0, 0, 0.05)' },
    { name: 'sm', css: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
    { name: 'base', css: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' },
    { name: 'md', css: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
    { name: 'lg', css: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
    { name: 'xl', css: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
    { name: '2xl', css: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
    { name: 'outline', css: '0 0 0 3px rgba(66, 153, 225, 0.6)' },
    { name: 'inner', css: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' },
    {
      name: 'dark-lg',
      css: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px',
      stage: { background: '#1a202c', surface: '#2d3748' },
    },
  ],
};

export const fluent: PresetCollection = {
  id: 'fluent',
  name: 'Fluent (Microsoft)',
  note: 'Fluent 2 shadow tokens and Fluent UI v8 depths.',
  presets: [
    { name: 'shadow2', css: '0 0 2px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.14)' },
    { name: 'shadow4', css: '0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14)' },
    { name: 'shadow8', css: '0 0 2px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.14)' },
    { name: 'shadow16', css: '0 0 2px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.14)' },
    { name: 'shadow28', css: '0 0 8px rgba(0, 0, 0, 0.12), 0 14px 28px rgba(0, 0, 0, 0.14)' },
    { name: 'shadow64', css: '0 0 8px rgba(0, 0, 0, 0.12), 0 32px 64px rgba(0, 0, 0, 0.14)' },
    { name: 'v8 depth4', css: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)' },
    { name: 'v8 depth8', css: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)' },
    { name: 'v8 depth16', css: '0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132), 0 1.2px 3.6px 0 rgba(0, 0, 0, 0.108)' },
    { name: 'v8 depth64', css: '0 25.6px 57.6px 0 rgba(0, 0, 0, 0.22), 0 4.8px 14.4px 0 rgba(0, 0, 0, 0.18)' },
  ],
};

export const primer: PresetCollection = {
  id: 'primer',
  name: 'GitHub Primer',
  note: 'Classic Primer shadow utilities.',
  presets: [
    { name: 'color-shadow-small', css: '0 1px 0 rgba(27, 31, 35, 0.04)' },
    { name: 'color-shadow-medium', css: '0 3px 6px rgba(149, 157, 165, 0.15)' },
    { name: 'color-shadow-large', css: '0 8px 24px rgba(149, 157, 165, 0.2)' },
    { name: 'color-shadow-extra-large', css: '0 12px 28px rgba(149, 157, 165, 0.3)' },
  ],
};

export const antDesign: PresetCollection = {
  id: 'antd',
  name: 'Ant Design',
  presets: [
    {
      name: 'boxShadow',
      css: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    },
    {
      name: 'boxShadowTertiary',
      css: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    },
    {
      name: 'card hover',
      css: '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
    },
  ],
};
