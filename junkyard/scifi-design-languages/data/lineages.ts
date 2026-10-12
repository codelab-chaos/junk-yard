import type { Lineage } from './types';

export interface LineageInfo {
  id: Lineage;
  title: string;
  blurb: string;
}

/** Display order of lineages in the index. */
export const LINEAGES: LineageInfo[] = [
  { id: 'used-future', title: 'Used Future', blurb: 'Lived-in, dented, patched. Technology as tools that get dirty and get fixed.' },
  { id: 'cassette-futurism', title: 'Cassette Futurism', blurb: 'The future as the 1970s and 80s built it: CRTs, chunky keys, beige plastic and toggles.' },
  { id: 'clean-future', title: 'Clean Future', blurb: 'White, smooth and quiet. Minimal surfaces, soft light, technology that hides its seams.' },
  { id: 'cyberpunk', title: 'Cyberpunk', blurb: 'High tech, low life. Neon in the rain, vertical cities, corporations above the law.' },
  { id: 'retro-futurism', title: 'Retro-Futurism', blurb: 'Yesterday imagining tomorrow: deco towers, atomic optimism, chrome and streamlines.' },
  { id: 'brutalist-monumental', title: 'Brutalist and Monumental', blurb: 'Concrete, mass and scale. Architecture that dwarfs people and shows power.' },
  { id: 'biomechanical', title: 'Biomechanical', blurb: 'Where flesh and machine fuse: ribbed, wet, skeletal and unsettling.' },
  { id: 'neon-digital', title: 'Neon Digital', blurb: 'Worlds inside the machine: glowing edges, grids, code and pure geometry.' },
  { id: 'military-industrial', title: 'Military Industrial', blurb: 'Function first: armor plates, stenciled markings, hazard stripes and hardware.' },
  { id: 'mythic-precursor', title: 'Mythic Precursor', blurb: 'Ruins of an older, greater civilization: sacred geometry, impossible scale, quiet light.' },
  { id: 'alien-naturalist', title: 'Alien Naturalist', blurb: 'Living worlds: bioluminescence, strange ecologies and organic architecture.' },
  { id: 'post-apocalyptic', title: 'Post-Apocalyptic', blurb: 'After the fall: salvage, rust, overgrowth and the beauty of ruins.' },
  { id: 'graphic-pop', title: 'Graphic Pop', blurb: 'Design as the world itself: bold graphics, poster color, logos and type as setting.' },
  { id: 'new-weird', title: 'New Weird', blurb: 'Liminal and uncanny: rules that bend, familiar places made strange.' },
];
