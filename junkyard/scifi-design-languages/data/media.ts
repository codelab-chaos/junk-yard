import type { World } from './types';

/**
 * Real images and outside links per world, keyed by world id. Kept apart
 * from the hand-written entries so sources can change without touching them.
 *
 * steam: official store screenshots (first three, in the publisher's order),
 * read from store.steampowered.com/api/appdetails on 2026-10-11.
 * A store link with no shots means those screenshots show a different look
 * than the entry (Fallout's 1997 sprites, System Shock's 2023 remake).
 * The gallery then uses the Wikimedia stills on the world.
 * ui: slug on interfaceingame.com, a library of game UI screenshots. Linked
 * only, never embedded: the site grants no reuse rights. When the page is
 * a different game, the link is named as that game.
 * Worlds without a Steam release use their Wikimedia stills.
 */

interface Shot {
  thumb: string;
  full: string;
}

interface Steam {
  appId: number;
  /** Store name, which can differ from the world title (e.g. a remaster). */
  name: string;
  /** Omitted when the store screenshots are a different look than the entry. */
  shots?: Shot[];
  /** Store-link text when `Steam: ${name}` would name the wrong work. */
  linkLabel?: string;
}

const STEAM: Record<string, Steam> = {
  'mirrors-edge': {
    appId: 17410,
    name: "Mirror's Edge\u2122",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006705.600x338.jpg?t=1777394972', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006705.1920x1080.jpg?t=1777394972' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006706.600x338.jpg?t=1777394972', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006706.1920x1080.jpg?t=1777394972' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006707.600x338.jpg?t=1777394972', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006707.1920x1080.jpg?t=1777394972' },
    ],
  },
  'portal': {
    appId: 400,
    name: "Portal",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002582.600x338.jpg?t=1745368554', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002582.1920x1080.jpg?t=1745368554' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002583.600x338.jpg?t=1745368554', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002583.1920x1080.jpg?t=1745368554' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002584.600x338.jpg?t=1745368554', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002584.1920x1080.jpg?t=1745368554' },
    ],
  },
  'half-life': {
    appId: 70,
    name: "Half-Life",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002354.600x338.jpg?t=1745368462', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002354.1920x1080.jpg?t=1745368462' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002343.600x338.jpg?t=1745368462', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002343.1920x1080.jpg?t=1745368462' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002342.600x338.jpg?t=1745368462', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002342.1920x1080.jpg?t=1745368462' },
    ],
  },
  'half-life-2': {
    appId: 220,
    name: "Half-Life 2",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_47b4105b396de408cb8b6b4f358c69e5e2a62dae.600x338.jpg?t=1745368545', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_47b4105b396de408cb8b6b4f358c69e5e2a62dae.1920x1080.jpg?t=1745368545' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_0e499071a60a20b24149ad65a8edb769250f2921.600x338.jpg?t=1745368545', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_0e499071a60a20b24149ad65a8edb769250f2921.1920x1080.jpg?t=1745368545' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_ffb00abd45012680e4f209355ec81f961b6dd1fb.600x338.jpg?t=1745368545', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_ffb00abd45012680e4f209355ec81f961b6dd1fb.1920x1080.jpg?t=1745368545' },
    ],
  },
  'halo': {
    appId: 976730,
    name: "Halo: The Master Chief Collection",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_ce40a85f9f7f3fa0f620a87f8919f3212ab8e46e.600x338.jpg?t=1791569963', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_ce40a85f9f7f3fa0f620a87f8919f3212ab8e46e.1920x1080.jpg?t=1791569963' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_62bbd86f4735893ef6cd53206cf8c93f87eb86ec.600x338.jpg?t=1791569963', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_62bbd86f4735893ef6cd53206cf8c93f87eb86ec.1920x1080.jpg?t=1791569963' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_fdaf8ebd7f3c62e08398f39c9bfa486294ea5a0a.600x338.jpg?t=1791569963', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_fdaf8ebd7f3c62e08398f39c9bfa486294ea5a0a.1920x1080.jpg?t=1791569963' },
    ],
  },
  'mass-effect': {
    appId: 1328670,
    name: "Mass Effect\u2122 Legendary Edition",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_3cfdbd8a5d94f9005d33ba17bb6b163dc458ddf7.600x338.jpg?t=1777395134', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_3cfdbd8a5d94f9005d33ba17bb6b163dc458ddf7.1920x1080.jpg?t=1777395134' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_4e226eb092381ba6c4ea9c164a1d18574c993a8a.600x338.jpg?t=1777395134', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_4e226eb092381ba6c4ea9c164a1d18574c993a8a.1920x1080.jpg?t=1777395134' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_8994024759b1e6afb09a99381637c8b6fb4e4075.600x338.jpg?t=1777395134', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_8994024759b1e6afb09a99381637c8b6fb4e4075.1920x1080.jpg?t=1777395134' },
    ],
  },
  'dead-space': {
    appId: 17470,
    name: "Dead Space (2008)",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006481.600x338.jpg?t=1777495169', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006481.1920x1080.jpg?t=1777495169' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006482.600x338.jpg?t=1777495169', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006482.1920x1080.jpg?t=1777495169' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006483.600x338.jpg?t=1777495169', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006483.1920x1080.jpg?t=1777495169' },
    ],
  },
  'bioshock': {
    appId: 409710,
    name: "BioShock\u2122 Remastered",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_bb9c564381c11357a51f1579c6337fba90ead10f.600x338.jpg?t=1740443728', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_bb9c564381c11357a51f1579c6337fba90ead10f.1920x1080.jpg?t=1740443728' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_fefcc94c6f10da7009cf07cf877e5d5937ebfb45.600x338.jpg?t=1740443728', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_fefcc94c6f10da7009cf07cf877e5d5937ebfb45.1920x1080.jpg?t=1740443728' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_04e04ae694f8b077e7f03906f7fa813823b5fd4e.600x338.jpg?t=1740443728', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_04e04ae694f8b077e7f03906f7fa813823b5fd4e.1920x1080.jpg?t=1740443728' },
    ],
  },
  'deus-ex-human-revolution': {
    appId: 238010,
    name: "Deus Ex: Human Revolution - Director's Cut",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_33f23de4cf18cbf6f676902096337716f9e19a52.600x338.jpg?t=1779722099', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_33f23de4cf18cbf6f676902096337716f9e19a52.1920x1080.jpg?t=1779722099' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_69362b98ecc4d707a5c92853539b60e0d622d268.600x338.jpg?t=1779722099', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_69362b98ecc4d707a5c92853539b60e0d622d268.1920x1080.jpg?t=1779722099' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_af1341ecafdca9be97d32620d957a384dce5f4ad.600x338.jpg?t=1779722099', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_af1341ecafdca9be97d32620d957a384dce5f4ad.1920x1080.jpg?t=1779722099' },
    ],
  },
  'cyberpunk-2077': {
    appId: 1091500,
    name: "Cyberpunk 2077",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.600x338.jpg?t=1784714077', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.1920x1080.jpg?t=1784714077' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.600x338.jpg?t=1784714077', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.1920x1080.jpg?t=1784714077' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_af2804aa4bf35d4251043744412ce3b359a125ef.600x338.jpg?t=1784714077', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_af2804aa4bf35d4251043744412ce3b359a125ef.1920x1080.jpg?t=1784714077' },
    ],
  },
  'destiny': {
    appId: 1085660,
    name: "Destiny 2",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d7038cee22b9de60003e7bbc07d65069ad6044ab/ss_d7038cee22b9de60003e7bbc07d65069ad6044ab.600x338.jpg?t=1781815889', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d7038cee22b9de60003e7bbc07d65069ad6044ab/ss_d7038cee22b9de60003e7bbc07d65069ad6044ab.1920x1080.jpg?t=1781815889' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/766aedcb8d2eb8fcb08002919ee10f5ac6c02d79/ss_766aedcb8d2eb8fcb08002919ee10f5ac6c02d79.600x338.jpg?t=1781815889', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/766aedcb8d2eb8fcb08002919ee10f5ac6c02d79/ss_766aedcb8d2eb8fcb08002919ee10f5ac6c02d79.1920x1080.jpg?t=1781815889' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4/ss_d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4.600x338.jpg?t=1781815889', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4/ss_d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4.1920x1080.jpg?t=1781815889' },
    ],
  },
  'final-fantasy-vii': {
    appId: 39140,
    name: "FINAL FANTASY VII",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_19e001c38309a504ff39ebd557eccfff5ed1c3be.600x338.jpg?t=1771952602', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_19e001c38309a504ff39ebd557eccfff5ed1c3be.1920x1080.jpg?t=1771952602' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_3b111bf8ad9bdd95b55cdcda4d3ee9b70b15dca1.600x338.jpg?t=1771952602', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_3b111bf8ad9bdd95b55cdcda4d3ee9b70b15dca1.1920x1080.jpg?t=1771952602' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_0bbe443526a52664aecece47e229d17ca68d1e5a.600x338.jpg?t=1771952602', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_0bbe443526a52664aecece47e229d17ca68d1e5a.1920x1080.jpg?t=1771952602' },
    ],
  },
  'fallout': {
    appId: 38400,
    name: "Fallout: A Post Nuclear Role Playing Game",
  },
  'system-shock': {
    appId: 482400,
    name: "System Shock",
    linkLabel: 'Steam: System Shock (2023 remake)',
  },
  'elite-dangerous': {
    appId: 359320,
    name: "Elite Dangerous",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_1d3391a2f4ed9881012e76755c6ea984242ee538.600x338.jpg?t=1759842966', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_1d3391a2f4ed9881012e76755c6ea984242ee538.1920x1080.jpg?t=1759842966' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_c4293fb1338f0094bf7cc03b83ed4dc74bbd91e4.600x338.jpg?t=1759842966', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_c4293fb1338f0094bf7cc03b83ed4dc74bbd91e4.1920x1080.jpg?t=1759842966' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_ae44ddd3966a26c5f5f431472eff949eaef329cd.600x338.jpg?t=1759842966', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_ae44ddd3966a26c5f5f431472eff949eaef329cd.1920x1080.jpg?t=1759842966' },
    ],
  },
  'alien-isolation': {
    appId: 214490,
    name: "Alien: Isolation",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_5ff8ca35914eca8f51f3303cf5d94a9f85279e2a.600x338.jpg?t=1763647113', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_5ff8ca35914eca8f51f3303cf5d94a9f85279e2a.1920x1080.jpg?t=1763647113' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_e514869415e3bd913be3f6c0e419cea9f0be17a3.600x338.jpg?t=1763647113', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_e514869415e3bd913be3f6c0e419cea9f0be17a3.1920x1080.jpg?t=1763647113' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_af3b9b789a57497e300e0a4c962badf513387a69.600x338.jpg?t=1763647113', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_af3b9b789a57497e300e0a4c962badf513387a69.1920x1080.jpg?t=1763647113' },
    ],
  },
  'doom-2016': {
    appId: 379720,
    name: "DOOM",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_f989e793786bf1d6459da1139a484203efef1447.600x338.jpg?t=1750784856', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_f989e793786bf1d6459da1139a484203efef1447.1920x1080.jpg?t=1750784856' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_ac05e086b8f0580bc95970fbb6f18a7e4fe65404.600x338.jpg?t=1750784856', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_ac05e086b8f0580bc95970fbb6f18a7e4fe65404.1920x1080.jpg?t=1750784856' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_d7ee83faf64036494e4a817b8be55b044fbe7c6c.600x338.jpg?t=1750784856', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_d7ee83faf64036494e4a817b8be55b044fbe7c6c.1920x1080.jpg?t=1750784856' },
    ],
  },
  'no-mans-sky': {
    appId: 275850,
    name: "No Man's Sky",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/6c2ddcffe192b0e155a69aa2a1dd3f33b863033d/ss_6c2ddcffe192b0e155a69aa2a1dd3f33b863033d.600x338.jpg?t=1789479023', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/6c2ddcffe192b0e155a69aa2a1dd3f33b863033d/ss_6c2ddcffe192b0e155a69aa2a1dd3f33b863033d.1920x1080.jpg?t=1789479023' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/cad26f1dc67d28327ccdabeecb68d5006ad5639b/ss_cad26f1dc67d28327ccdabeecb68d5006ad5639b.600x338.jpg?t=1789479023', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/cad26f1dc67d28327ccdabeecb68d5006ad5639b/ss_cad26f1dc67d28327ccdabeecb68d5006ad5639b.1920x1080.jpg?t=1789479023' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/227c7c49d81de5f77d260495885e433efaece06d/ss_227c7c49d81de5f77d260495885e433efaece06d.600x338.jpg?t=1789479023', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/227c7c49d81de5f77d260495885e433efaece06d/ss_227c7c49d81de5f77d260495885e433efaece06d.1920x1080.jpg?t=1789479023' },
    ],
  },
  'titanfall-2': {
    appId: 1237970,
    name: "Titanfall\u00ae 2",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_d5c13576c0ab4e6ca93b51aa39aa74271672e75f.600x338.jpg?t=1779987598', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_d5c13576c0ab4e6ca93b51aa39aa74271672e75f.1920x1080.jpg?t=1779987598' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_9ed56a85aef47554156999dfbd4091d225da2a47.600x338.jpg?t=1779987598', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_9ed56a85aef47554156999dfbd4091d225da2a47.1920x1080.jpg?t=1779987598' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_f4a8464ce43962b76fa6f2156b341eee28ad6494.600x338.jpg?t=1779987598', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_f4a8464ce43962b76fa6f2156b341eee28ad6494.1920x1080.jpg?t=1779987598' },
    ],
  },
  'prey-2017': {
    appId: 480490,
    name: "Prey",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_06b6c27c834b5639c54d470b3b5c711cf72a94af.600x338.jpg?t=1784141088', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_06b6c27c834b5639c54d470b3b5c711cf72a94af.1920x1080.jpg?t=1784141088' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_ff6b4efb3add6ea9a1d67f5c6c0fae6661ed9fd8.600x338.jpg?t=1784141088', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_ff6b4efb3add6ea9a1d67f5c6c0fae6661ed9fd8.1920x1080.jpg?t=1784141088' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_976f1d181de3dc8bc86c78fe900c98be457d0942.600x338.jpg?t=1784141088', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_976f1d181de3dc8bc86c78fe900c98be457d0942.1920x1080.jpg?t=1784141088' },
    ],
  },
  'horizon-zero-dawn': {
    appId: 1151640,
    name: "Horizon Zero Dawn\u2122 Complete Edition",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_d09106060fb7de8bf342c23df18b14debc8a15a3.600x338.jpg?t=1776465788', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_d09106060fb7de8bf342c23df18b14debc8a15a3.1920x1080.jpg?t=1776465788' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_271f850eec3f96b22aa17be35b948268e0771c7f.600x338.jpg?t=1776465788', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_271f850eec3f96b22aa17be35b948268e0771c7f.1920x1080.jpg?t=1776465788' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_15f5759c441e4e5f51e1a8ee333e4ab9df9aa783.600x338.jpg?t=1776465788', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_15f5759c441e4e5f51e1a8ee333e4ab9df9aa783.1920x1080.jpg?t=1776465788' },
    ],
  },
  'nier-automata': {
    appId: 524220,
    name: "NieR:Automata\u2122",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_d0314b4c134329a483b5e43af951f60274abc66b.600x338.jpg?t=1785182957', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_d0314b4c134329a483b5e43af951f60274abc66b.1920x1080.jpg?t=1785182957' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_8b29f7e1ce9a8b9313dc3eb50dbe76a4cf94eef9.600x338.jpg?t=1785182957', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_8b29f7e1ce9a8b9313dc3eb50dbe76a4cf94eef9.1920x1080.jpg?t=1785182957' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_2c265df38c3d2d393d74ee8e74d79bdafa16b143.600x338.jpg?t=1785182957', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_2c265df38c3d2d393d74ee8e74d79bdafa16b143.1920x1080.jpg?t=1785182957' },
    ],
  },
  'control': {
    appId: 870780,
    name: "CONTROL Ultimate Edition",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_8376498631b089e52fb5c75ffe119e0de5e6aed1.600x338.jpg?t=1781607969', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_8376498631b089e52fb5c75ffe119e0de5e6aed1.1920x1080.jpg?t=1781607969' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_5a16ce565951479e142c56a23f19d88333d84945.600x338.jpg?t=1781607969', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_5a16ce565951479e142c56a23f19d88333d84945.1920x1080.jpg?t=1781607969' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_c038bb7b20d72ba5d33cc95f7235aefa0b84a706.600x338.jpg?t=1781607969', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_c038bb7b20d72ba5d33cc95f7235aefa0b84a706.1920x1080.jpg?t=1781607969' },
    ],
  },
  'death-stranding': {
    appId: 1190460,
    name: "DEATH STRANDING",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_ac7c64c8d10bb5786694891e4a22b07a5da7dd6f.600x338.jpg?t=1766014863', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_ac7c64c8d10bb5786694891e4a22b07a5da7dd6f.1920x1080.jpg?t=1766014863' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_4370916476e44c78b50bfee175f1d82285f6bfd7.600x338.jpg?t=1766014863', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_4370916476e44c78b50bfee175f1d82285f6bfd7.1920x1080.jpg?t=1766014863' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_39f107106c83eb3717a1061fa1da0f2f4bdf3993.600x338.jpg?t=1766014863', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_39f107106c83eb3717a1061fa1da0f2f4bdf3993.1920x1080.jpg?t=1766014863' },
    ],
  },
  'outer-wilds': {
    appId: 753640,
    name: "Outer Wilds",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_ec95a283483f0438be40d033f08b9d956e748d54.600x338.jpg?t=1785424341', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_ec95a283483f0438be40d033f08b9d956e748d54.1920x1080.jpg?t=1785424341' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_09f0fa8d9b8d7da1408cf4e03303d896cbd9be18.600x338.jpg?t=1785424341', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_09f0fa8d9b8d7da1408cf4e03303d896cbd9be18.1920x1080.jpg?t=1785424341' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_c624a6b8edca0d451605592edd927dbcc14917a8.600x338.jpg?t=1785424341', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_c624a6b8edca0d451605592edd927dbcc14917a8.1920x1080.jpg?t=1785424341' },
    ],
  },
  'signalis': {
    appId: 1262350,
    name: "SIGNALIS",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_a2603694154878b8260c1dd498a06168cad012a4.600x338.jpg?t=1773697315', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_a2603694154878b8260c1dd498a06168cad012a4.1920x1080.jpg?t=1773697315' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_9d602346170b19121e4baec94f5fab54cc43637c.600x338.jpg?t=1773697315', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_9d602346170b19121e4baec94f5fab54cc43637c.1920x1080.jpg?t=1773697315' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_dc87789ecfa2f83dd58ac778866fbf7fdc1ec99a.600x338.jpg?t=1773697315', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_dc87789ecfa2f83dd58ac778866fbf7fdc1ec99a.1920x1080.jpg?t=1773697315' },
    ],
  },
  'starfield': {
    appId: 1716740,
    name: "Starfield",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_4887dc140a637684ddcfca518458668409f946dc.600x338.jpg?t=1786648030', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_4887dc140a637684ddcfca518458668409f946dc.1920x1080.jpg?t=1786648030' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_b2821283cb140cd5a6289a8160016b6a60d8f96e.600x338.jpg?t=1786648030', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_b2821283cb140cd5a6289a8160016b6a60d8f96e.1920x1080.jpg?t=1786648030' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_68f15d580bf91971f637be5e464bc803482d78f7.600x338.jpg?t=1786648030', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_68f15d580bf91971f637be5e464bc803482d78f7.1920x1080.jpg?t=1786648030' },
    ],
  },
  'returnal': {
    appId: 1649240,
    name: "Returnal\u2122",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_3c260834df0c87cfc9ac1b457d0ec0eb3b9f367c.600x338.jpg?t=1750956860', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_3c260834df0c87cfc9ac1b457d0ec0eb3b9f367c.1920x1080.jpg?t=1750956860' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_a91854c29cee0b4975862d174f03ff374ae5e26c.600x338.jpg?t=1750956860', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_a91854c29cee0b4975862d174f03ff374ae5e26c.1920x1080.jpg?t=1750956860' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_e15da2a195556b773ba8a982051f55de50d79a75.600x338.jpg?t=1750956860', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_e15da2a195556b773ba8a982051f55de50d79a75.1920x1080.jpg?t=1750956860' },
    ],
  },
  'hyper-light-drifter': {
    appId: 257850,
    name: "Hyper Light Drifter",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_e786b1d9c66eb9c61e4da2945fe1d9faeb2af736.600x338.jpg?t=1762899660', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_e786b1d9c66eb9c61e4da2945fe1d9faeb2af736.1920x1080.jpg?t=1762899660' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_19c973259b736f14c4541ba044f3761b39a18737.600x338.jpg?t=1762899660', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_19c973259b736f14c4541ba044f3761b39a18737.1920x1080.jpg?t=1762899660' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_37ad0b207c867078e87cf8a185fe3c66b0bdd490.600x338.jpg?t=1762899660', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_37ad0b207c867078e87cf8a185fe3c66b0bdd490.1920x1080.jpg?t=1762899660' },
    ],
  },
  'rain-world': {
    appId: 312520,
    name: "Rain World",
    shots: [
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_cbd4e647d6b3bb3b311cb68fdf0cd8835d5919d7.600x338.jpg?t=1791223542', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_cbd4e647d6b3bb3b311cb68fdf0cd8835d5919d7.1920x1080.jpg?t=1791223542' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_628274c84b196e270733f540139062f2787c4423.600x338.jpg?t=1791223542', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_628274c84b196e270733f540139062f2787c4423.1920x1080.jpg?t=1791223542' },
      { thumb: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_d551eee41e60ba8f5f2005b3de41c5f2c27cb444.600x338.jpg?t=1791223542', full: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_d551eee41e60ba8f5f2005b3de41c5f2c27cb444.1920x1080.jpg?t=1791223542' },
    ],
  },
};

interface UiPage {
  slug: string;
  /** Set when the page is a different game than the entry. */
  other?: string;
}

const UI: Record<string, UiPage> = {
  'mirrors-edge': { slug: 'mirrors-edge-catalyst', other: "Mirror's Edge Catalyst" },
  'portal': { slug: 'portal-2', other: 'Portal 2' },
  'halo': { slug: 'halo-infinite', other: 'Halo Infinite' },
  'deus-ex-human-revolution': { slug: 'deus-ex-mankind-divided', other: 'Deus Ex: Mankind Divided' },
  'cyberpunk-2077': { slug: 'cyberpunk-2077' },
  'destiny': { slug: 'destiny-2', other: 'Destiny 2' },
  'elite-dangerous': { slug: 'elite-dangerous' },
  'doom-2016': { slug: 'doom' },
  'no-mans-sky': { slug: 'no-mans-sky' },
  'titanfall-2': { slug: 'titanfall-2' },
  'horizon-zero-dawn': { slug: 'horizon-zero-dawn' },
  'nier-automata': { slug: 'nierautomata' },
  'control': { slug: 'control' },
  'death-stranding': { slug: 'death-stranding' },
  'starfield': { slug: 'starfield' },
  'returnal': { slug: 'returnal' },
};

/** One image as the page shows it, whatever its source. */
export interface Image {
  thumb: string;
  full: string;
  alt: string;
  credit: string;
  /** Where the image comes from, for credit. */
  source: string;
}

export interface Link {
  label: string;
  url: string;
}

const storeUrl = (s: Steam) => `https://store.steampowered.com/app/${s.appId}/`;

/** Every image for a world, hero first: Steam screenshots when they match the entry, Wikimedia stills otherwise. */
export function gallery(w: World): Image[] {
  const steam = STEAM[w.id];
  const shots = steam?.shots;
  if (steam && shots?.length) {
    return shots.map((s, i) => ({
      thumb: s.thumb,
      full: s.full,
      alt: `${steam.name}, official screenshot ${i + 1} of ${shots.length}`,
      credit: `Steam store, ${steam.name}`,
      source: storeUrl(steam),
    }));
  }
  return w.stills.map((s) => ({ thumb: s.src, full: s.src, alt: s.alt, credit: s.caption, source: s.source }));
}

/** Outside places to see more of the world: store page and UI library. */
export function outsideLinks(w: World): Link[] {
  const steam = STEAM[w.id];
  const ui = UI[w.id];
  return [
    steam && { label: steam.linkLabel ?? `Steam: ${steam.name}`, url: storeUrl(steam) },
    ui && {
      label: ui.other ? `Interface In Game: ${ui.other}` : 'Interface In Game: UI screenshots',
      url: `https://interfaceingame.com/games/${ui.slug}/`,
    },
  ].filter((l): l is Link => !!l);
}
