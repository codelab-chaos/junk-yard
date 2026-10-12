# Sci-fi images: sources (2026-10-11)

Feeds `junkyard/scifi-design-languages/data/media.ts`. The owner asked for real game images in place of the SVG plates.

## Steam (primary, 28 of 34 worlds)

- `https://store.steampowered.com/api/appdetails?appids={id}&cc=us&l=en`, no key needed. Each app id was checked against the returned name.
- The first three `screenshots` per app, in the publisher's order. `path_thumbnail` (600x338) is used for cards and `path_full` (1920x1080) for the hero. All are hosted on `shared.akamai.steamstatic.com` and were loaded in a browser contact sheet: 90 of 90 loaded, all in-game shots, no logos or title cards.
- Some store entries are remasters or bundles of the same look: Halo uses The Master Chief Collection (976730), Mass Effect the Legendary Edition (1328670), BioShock Remastered (409710), Deus Ex HR the Director's Cut (238010), Destiny uses Destiny 2 (1085660).
- Fallout (38400) and System Shock (482400) keep a store link and no screenshots. The 1997 isometric shots and the 2023 remake do not show the look those entries describe, so the gallery uses Wikimedia stills instead.
- Not on Steam: Metroid Prime, Killzone, Wipeout, StarCraft. These use Wikimedia stills.

## Wikimedia (fallback)

- Same method as the README. Metroid Prime got `M_screen017.jpg` (visor combat) and `Crater_style_guide_color.jpg` (concept art), both original-size uploads that return HTTP 200.
- Rejected: box art, logos, photos of developers and actors. The Portal and Mass Effect franchise pages had only box art or logos (moot now, since both are on Steam).

## interfaceingame.com (link only)

- A curated library of game UI screenshots. It states no reuse terms ("pictures ... are the property of their respective owners"), so images are not embedded. Each world links to its page there if one exists.
- Pages found by HEAD request (HTTP 200): mirrors-edge-catalyst, portal-2, halo-infinite, deus-ex-mankind-divided, cyberpunk-2077, destiny-2, elite-dangerous, doom (2016), no-mans-sky, titanfall-2, horizon-zero-dawn, nierautomata, control, death-stranding, starfield, returnal. Sequels stand in where the original is missing, and the link is named as that sequel.
- Not listed: Mirror's Edge (2008), Portal, Half-Life 1 and 2, Mass Effect, Dead Space, BioShock, Metroid Prime, Wipeout, FF VII, Fallout, System Shock, StarCraft, Alien Isolation, Killzone, Prey, Outer Wilds, Signalis, Hyper Light Drifter, Rain World.
