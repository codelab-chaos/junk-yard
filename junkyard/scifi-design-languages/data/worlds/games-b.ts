import type { World } from '../types';

export const GAMES_B: World[] = [
  {
    id: 'wipeout',
    title: 'Wipeout',
    medium: 'game',
    year: '1995–2012',
    makers:
      'Psygnosis (later Studio Liverpool); Nick Burcombe (concept); graphic identity by The Designers Republic (Ian Anderson), Sheffield',
    lineages: ['graphic-pop', 'neon-digital', 'clean-future'],
    tagline: 'Anti-gravity racing as corporate branding',
    description:
      'Wipeout imagines the year 2052 as a sponsorship economy. Instead of commissioning a game artist to invent logos, Psygnosis handed the brand layer to The Designers Republic, the Sheffield studio known for record sleeves, and TDR treated every team (FEISAR, AG Systems, Auricom, Qirex, later Piranha and Goteki 45) as a real company with a mark, a livery and a typeface. The anti-gravity craft are flat-sided wedges painted like Formula One cars, and the tracks are banked concrete ribbons lined with billboards, chevrons and speed pads, so the course itself reads as an advertising surface. The HUD follows the same rules: thin geometric type, pictogram weapon icons, a lap counter and position number set like a magazine masthead. Menus are pure graphic design, with grids, katakana, warning glyphs and fake corporate slogans. Where F-Zero is cartoon chrome, Wipeout is a style magazine at 600 km/h. It works because the identity was designed first and the world second, and because it shared a soundtrack and a sensibility with mid-1990s club culture (Leftfield, Orbital, The Chemical Brothers), so the game felt like a product of its own fictional future.',
    palette: [
      { name: 'FEISAR blue', hex: '#1f4fd1' },
      { name: 'Auricom yellow', hex: '#f5c800' },
      { name: 'Qirex violet', hex: '#5a2a8c' },
      { name: 'Speed pad cyan', hex: '#38e0f0' },
      { name: 'Asphalt night', hex: '#101318' },
    ],
    materials: ['Glossy livery paint over composite hulls', 'Banked concrete track', 'Backlit billboard panels', 'Brushed aluminium airbrakes'],
    shapes: ['Flat wedge hulls with twin fins', 'Chevron arrows and speed pads', 'Team logos as geometric badges', 'Katakana and pictogram warning glyphs'],
    typeAndUi:
      'Custom geometric sans lettering, tight grids, numbered systems and faux-corporate slogans from The Designers Republic. Weapon pickups are flat pictograms, and the race HUD is laid out like a magazine cover.',
    lighting: 'Floodlit night circuits and saturated sunset skies, with track lights streaking into colored trails at speed.',
    influences: ['Formula One sponsorship liveries', 'Swiss and Japanese graphic design', '1990s club flyers and record sleeves', 'Akira'],
    influenced: ['Redout', 'BallisticNG', 'Fast RMX', 'Rollcage'],
    borrow:
      'Design the brand system before the world: give each faction a mark, a color and a typeface, then let those graphics cover every surface and screen.',
    keywords: ['tdr', 'designers republic', 'anti-gravity', 'psygnosis', 'feisar', 'qirex', 'playstation', 'racing'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/9/9c/PSX_Wipeout.png/250px-PSX_Wipeout.png',
        alt: 'An anti-gravity craft racing on a track with the race HUD showing lap, weapon, position and speed',
        caption: 'Wipeout (1995) race HUD: laps, weapon, position and speedometer.',
        source: 'https://en.wikipedia.org/wiki/File:PSX_Wipeout.png',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/8/8a/Wipeout_gameplay_2.jpg/330px-Wipeout_gameplay_2.jpg',
        alt: 'A brightly painted anti-gravity craft on a lit futuristic race track',
        caption: 'Wipeout HD (2008), the series look in high definition.',
        source: 'https://en.wikipedia.org/wiki/File:Wipeout_gameplay_2.jpg',
      },
    ],
    refs: [
      { label: 'Wikipedia: Wipeout (video game)', url: 'https://en.wikipedia.org/wiki/Wipeout_(video_game)' },
      { label: 'Wikipedia: Wipeout (series)', url: 'https://en.wikipedia.org/wiki/Wipeout_(video_game_series)' },
      { label: 'Wikipedia: The Designers Republic', url: 'https://en.wikipedia.org/wiki/The_Designers_Republic' },
    ],
  },
  {
    id: 'final-fantasy-vii',
    title: 'Final Fantasy VII',
    medium: 'game',
    year: '1997',
    makers:
      'Square; Yoshinori Kitase (director), Tetsuya Nomura (characters), Yusuke Naora (art); Remake (2020) by Square Enix',
    lineages: ['cyberpunk', 'used-future', 'brutalist-monumental'],
    tagline: 'Mako-lit plate city over slums',
    description:
      "Midgar is a city built as a diagram of class. A vast disc of steel plate sits on a central pillar and supports, split into eight sectors, each with its own mako reactor drawing green light out of the planet. Above the plate, Shinra Electric Power Company runs a clean corporate skyline crowned by the Shinra headquarters tower. Below it, the slums live in permanent dusk under the underside of the plate, a patchwork of corrugated sheds, scrap, pipes and church ruins. The technology is industrial and steam-heavy rather than digital: reactors, trains, catwalks and cooling towers, closer to a 1920s power plant than to Blade Runner's neon. Costume mixes this with fantasy, so SOLDIER uniforms, Barret's gun-arm and Cloud's buster sword sit in the same frame as rusted rail yards. The pre-rendered backgrounds of 1997 gave each screen a composed, cinematic camera angle, while the interface stayed in the series' calm blue gradient windows. The 2020 Remake rebuilt Midgar at street level, adding signage, advertising and lived-in density to the sector slums. It works because the green glow is both the light source and the plot: the city literally runs on the planet's life.",
    palette: [
      { name: 'Mako green', hex: '#5be37a' },
      { name: 'Plate steel', hex: '#4a5560' },
      { name: 'Slum rust', hex: '#7a4a2a' },
      { name: 'Menu window blue', hex: '#1c3a9e' },
      { name: 'Smog dusk', hex: '#2b2f3a' },
    ],
    materials: ['Riveted plate steel', 'Corrugated iron and scrap', 'Glowing mako pipework', 'Concrete reactor housings', 'Worn leather and denim costume'],
    shapes: ['Disc city on a central pillar', 'Smokestacks and reactor domes', 'Shinra tower silhouette', 'Catwalks and rail bridges', 'Oversized swords and gun-arms'],
    typeAndUi:
      'Classic Final Fantasy menus: blue gradient windows with white sans text and a pointing-hand cursor. The Shinra logotype and in-world signage carry the corporate voice; the Remake adds dense signage to the slums.',
    lighting:
      'Green mako glow from below, sodium and fluorescent spill in the slums, and a perpetual grey smog sky above the plate.',
    influences: ['Industrial power stations', 'Blade Runner', 'Akira', 'Steampunk fantasy'],
    influenced: ['Final Fantasy VII Remake', 'Crisis Core', 'Kingdom Hearts', 'Xenoblade Chronicles'],
    borrow:
      'Stack the social order vertically and give it a single light source with a story, so every color in the frame says who has power.',
    keywords: ['midgar', 'shinra', 'mako', 'square', 'nomura', 'jrpg', 'remake', 'reactor'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/b/ba/FF7_background.gif/250px-FF7_background.gif',
        alt: 'A pre-rendered Midgar street scene with characters standing among industrial buildings',
        caption: 'A pre-rendered Midgar background from the 1997 game.',
        source: 'https://en.wikipedia.org/wiki/File:FF7_background.gif',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/1/1b/FFVIIbattleexample.png/250px-FFVIIbattleexample.png',
        alt: 'A battle screen with three party members facing a dragon above blue command menus',
        caption: 'Battle screen with the series blue command windows.',
        source: 'https://en.wikipedia.org/wiki/File:FFVIIbattleexample.png',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/0/00/Final_Fantasy_VII_Remake_gameplay_screenshot.png/330px-Final_Fantasy_VII_Remake_gameplay_screenshot.png',
        alt: 'Real-time combat in Final Fantasy VII Remake inside an industrial interior',
        caption: 'Final Fantasy VII Remake (2020) real-time combat.',
        source: 'https://en.wikipedia.org/wiki/File:Final_Fantasy_VII_Remake_gameplay_screenshot.png',
      },
    ],
    refs: [
      { label: 'Wikipedia: Final Fantasy VII', url: 'https://en.wikipedia.org/wiki/Final_Fantasy_VII' },
      { label: 'Wikipedia: Final Fantasy VII Remake', url: 'https://en.wikipedia.org/wiki/Final_Fantasy_VII_Remake' },
    ],
  },
  {
    id: 'fallout',
    title: 'Fallout',
    medium: 'game',
    year: '1997–2024',
    makers:
      'Interplay and Black Isle; Tim Cain, Leonard Boyarsky (art); Bethesda from Fallout 3 (2008), Istvan Pely (art)',
    lineages: ['retro-futurism', 'post-apocalyptic', 'cassette-futurism'],
    tagline: 'Atomic-age optimism, after the bombs',
    description:
      "Fallout's world is the future as 1950s America pictured it, frozen at the moment the bombs fell in 2077 and left to rot for two centuries. Technology never miniaturized: computers are RobCo terminals with green phosphor CRTs and chunky keyboards, robots are Robby-style domes and claws, cars are finned and nuclear-powered, and power armor is riveted plate shaped like a deep-sea diving suit. Vault-Tec's underground vaults supply the costume (blue jumpsuits with yellow numbers) and the brand voice, delivered through Vault Boy, the grinning cartoon mascot whose cheerful poses illustrate skills, perks and gruesome deaths. The Pip-Boy, a wrist computer, is the interface: inventory, map and stats appear on a green monochrome screen in a bulky housing, a fully diegetic menu. The 1997 original wrapped its isometric view in a riveted olive metal console; the Bethesda games moved the Pip-Boy onto the player's arm. What separates Fallout from other wastelands is the irony: Googie diners, Nuka-Cola ads and propaganda posters promise a bright tomorrow over craters and ghouls. It works because the cheer and the ruin keep commenting on each other.",
    palette: [
      { name: 'Pip-Boy phosphor', hex: '#3cf06e' },
      { name: 'Vault-Tec blue', hex: '#1d4f91' },
      { name: 'Vault number yellow', hex: '#f2c230' },
      { name: 'Wasteland ochre', hex: '#a8895a' },
      { name: 'Rad rust', hex: '#6e3b1f' },
    ],
    materials: ['Riveted steel and enamel paint', 'Bakelite and cream plastic', 'Green phosphor CRT glass', 'Chrome trim and tail fins', 'Rusted sheet metal and sand'],
    shapes: ['Cog-shaped vault door', 'Pip-Boy wrist housing', 'Diving-helmet power armor', 'Googie boomerangs and atomic starbursts', 'Vault Boy thumbs-up'],
    typeAndUi:
      'Monochrome green terminal text and line-art Vault Boy illustrations inside a diegetic wrist computer. Signage and ads use 1950s commercial lettering, propaganda poster type and the Vault-Tec gear logo.',
    lighting: 'Washed-out daylight with a sickly yellow or green cast outside, and humming fluorescent strips in the vaults.',
    influences: ['1950s American advertising and Googie architecture', 'Mad Max 2', 'Forbidden Planet', 'A Boy and His Dog', 'Wasteland (1988)'],
    influenced: ['Fallout (2024 television series)', 'Atomic Heart', 'The Outer Worlds', 'Wasteland 2'],
    borrow:
      'Pair a cheerful mid-century visual voice with grim content and render the menu as a physical device the character actually owns.',
    keywords: ['pip-boy', 'vault-tec', 'vault boy', 'atompunk', 'nuka-cola', 'robco', 'bethesda', 'interplay', 'wasteland'],
    stills: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/PipBoyIV.jpg',
        alt: 'A Pip-Boy wrist computer with a green monochrome screen',
        caption: 'The Pip-Boy 3000 Mark IV from Fallout 4, the series diegetic menu.',
        source: 'https://commons.wikimedia.org/wiki/File:PipBoyIV.jpg',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/1/11/Bloody_Mess.jpg/250px-Bloody_Mess.jpg',
        alt: 'Green line-art of the Vault Boy mascot illustrating the Bloody Mess perk',
        caption: 'Vault Boy perk art in the Pip-Boy interface.',
        source: 'https://en.wikipedia.org/wiki/File:Bloody_Mess.jpg',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/PAX_08_%282837169733%29.jpg/500px-PAX_08_%282837169733%29.jpg',
        alt: 'A full-size replica of riveted T-45 power armor on display',
        caption: 'Replica T-45 power armor from Fallout 3, shown at PAX 2008.',
        source: 'https://commons.wikimedia.org/wiki/File:PAX_08_(2837169733).jpg',
      },
    ],
    refs: [
      { label: 'Wikipedia: Fallout (video game)', url: 'https://en.wikipedia.org/wiki/Fallout_(video_game)' },
      { label: 'Wikipedia: Fallout (franchise)', url: 'https://en.wikipedia.org/wiki/Fallout_(franchise)' },
    ],
  },
  {
    id: 'system-shock',
    title: 'System Shock',
    medium: 'game',
    year: '1994',
    makers:
      'Looking Glass Technologies (Doug Church, Warren Spector), for Origin Systems; 2023 remake by Nightdive Studios',
    lineages: ['cyberpunk', 'cassette-futurism', 'neon-digital'],
    tagline: 'Corporate station haunted by its AI',
    description:
      "System Shock sets its horror on Citadel Station, a TriOptimum Corporation research and mining station orbiting Saturn in 2072, after the station's AI, SHODAN, has rewritten its own ethics and turned the crew into cyborgs and mutants. The architecture is decks of narrow corridors and service rooms clad in tiled panels, grilles and circuit-patterned walls, each deck coded by function (medical, research, reactor, executive) and by texture. Technology is visible and wired: security cameras SHODAN watches through, CPU nodes to destroy, access panels and wall-mounted terminals. The interface was famously dense for 1994, with multi-function displays flanking the view, a posture indicator, inventory panels and email logs from dead crew. Cyberspace, entered through terminals, drops the player into a wireframe, neon void, a direct nod to Gibson. SHODAN is the design's center: a glitching face, a stuttering voice (Terri Brosius) and green text that turns the station itself into her body. Nightdive's 2023 remake kept the layout and rebuilt the look with chunky, pixel-textured surfaces and saturated neon, deliberately echoing the original's pixels. It works because the environment is the antagonist.",
    palette: [
      { name: 'SHODAN green', hex: '#3ef0a0' },
      { name: 'Citadel steel', hex: '#3a4048' },
      { name: 'Cyberspace magenta', hex: '#d23ad8' },
      { name: 'Medical deck teal', hex: '#2a7f86' },
      { name: 'Hazard amber', hex: '#e89a2b' },
    ],
    materials: ['Tiled metal wall panels', 'Circuit-board textures', 'Glass and grille partitions', 'Blood-stained deck plating', 'Wireframe light'],
    shapes: ['Low corridors and bulkhead doors', 'Security cameras and CPU nodes', "SHODAN's fractured face", 'Wireframe cyberspace tunnels'],
    typeAndUi:
      'Dense multi-function display panels around the view, monospace logs and email from dead crew. SHODAN speaks through distorted text and glitching on-screen messages.',
    lighting: 'Low fluorescent light with deck-colored tints, red alert lighting, and pure emissive neon in cyberspace.',
    influences: ['Neuromancer (William Gibson)', 'Alien', 'Ultima Underworld', 'Corporate cyberpunk of the 1980s'],
    influenced: ['System Shock 2', 'BioShock', 'Deus Ex', 'Prey (2017)', 'Dead Space'],
    borrow:
      'Make the building the villain: give it eyes, a voice and a color, and let the player read its intentions in the architecture and logs.',
    keywords: ['shodan', 'citadel station', 'trioptimum', 'looking glass', 'immersive sim', 'cyberspace', 'nightdive'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/d/db/SHOCK001.GIF/330px-SHOCK001.GIF',
        alt: 'First-person view of a station interior with a lead pipe and dense interface panels',
        caption: 'Citadel Station, with health, energy and multi-function displays around the view.',
        source: 'https://en.wikipedia.org/wiki/File:SHOCK001.GIF',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/f/ff/Ss_cyberspace.GIF/330px-Ss_cyberspace.GIF',
        alt: 'A wireframe cyberspace environment with interface elements',
        caption: 'Cyberspace, a wireframe void reached through station terminals.',
        source: 'https://en.wikipedia.org/wiki/File:Ss_cyberspace.GIF',
      },
    ],
    refs: [
      { label: 'Wikipedia: System Shock', url: 'https://en.wikipedia.org/wiki/System_Shock' },
      { label: 'Wikipedia: System Shock (2023)', url: 'https://en.wikipedia.org/wiki/System_Shock_(2023_video_game)' },
    ],
  },
  {
    id: 'starcraft',
    title: 'StarCraft',
    medium: 'game',
    year: '1998',
    makers: 'Blizzard Entertainment; Chris Metzen (story and art), Samwise Didier (art director), James Phinney (lead designer)',
    lineages: ['used-future', 'military-industrial', 'biomechanical'],
    tagline: 'Blue-collar space western, three species',
    description:
      'StarCraft builds its look from three sharply separated design languages, so that a player can read a faction from a single pixel cluster. The Terrans are exiles and convicts in the Koprulu Sector, and their technology is heavy, bolted and improvised: buildings that lift off on thrusters, bunkers, refineries and supply depots that look like oil-field hardware, marines in bulky powered suits with exposed hoses. Their voice is a space western, all Southern drawls, honky-tonk music, rusty steel and hazard stripes. The Protoss answer with gold and blue: smooth, curved armor plates, glowing psionic crystals, temples and pylons that feel like a high civilization with a priestly order. The Zerg are pure biology: chitin, sinew, carapace and the purple creep that spreads over terrain as their architecture. The interface follows suit, with a different console frame for each race (riveted metal, polished gold, organic shell), and mission briefings show talking portraits on that race-styled screen. It works because silhouette and color are subordinate to gameplay legibility while still carrying a full culture.',
    palette: [
      { name: 'Terran steel blue', hex: '#3b5875' },
      { name: 'Hazard yellow', hex: '#e2b82c' },
      { name: 'Protoss gold', hex: '#d6a84a' },
      { name: 'Khaydarin cyan', hex: '#4fd6f0' },
      { name: 'Zerg creep purple', hex: '#5b2a5e' },
    ],
    materials: ['Bolted plate steel and hazard paint', 'Polished gold alloy', 'Glowing psionic crystal', 'Chitin, sinew and creep', 'Dust and scorched dirt'],
    shapes: ['Lifting factory buildings', 'Bulky powered marine suits', 'Protoss pylons and crescent hulls', 'Zerg spires, carapaces and claws'],
    typeAndUi:
      'Each race has its own console frame and cursor: riveted metal for Terrans, gold and crystal for Protoss, organic shell for Zerg. Briefings use talking-head portraits on race-styled screens.',
    lighting: 'Flat, readable top-down light with racial glow accents: Terran sodium lamps, Protoss blue psionics, Zerg wet purple.',
    influences: ['Aliens', 'Starship Troopers (novel)', 'Warhammer 40,000', 'Westerns and Southern rock'],
    influenced: ['StarCraft II', 'Warhammer 40,000: Dawn of War', 'Overwatch', 'Heroes of the Storm'],
    borrow:
      'Give each faction its own material, color and interface frame so it reads at a glance, and let the UI chrome belong to the faction too.',
    keywords: ['blizzard', 'terran', 'protoss', 'zerg', 'rts', 'koprulu', 'marine', 'space western'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/2/2f/Zerg_colony_%28StarCraft%29.png/330px-Zerg_colony_%28StarCraft%29.png',
        alt: 'An isometric view of Protoss units attacking a Zerg colony on purple creep',
        caption: 'A Protoss force attacking a Zerg colony, in isometric perspective.',
        source: 'https://en.wikipedia.org/wiki/File:Zerg_colony_(StarCraft).png',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/c/c3/Briefing_room_%28StarCraft%29.png/330px-Briefing_room_%28StarCraft%29.png',
        alt: 'A mission briefing screen with character portraits and a riveted metal frame',
        caption: 'Mission briefing screen with talking-head portraits.',
        source: 'https://en.wikipedia.org/wiki/File:Briefing_room_(StarCraft).png',
      },
    ],
    refs: [{ label: 'Wikipedia: StarCraft', url: 'https://en.wikipedia.org/wiki/StarCraft_(video_game)' }],
  },
  {
    id: 'elite-dangerous',
    title: 'Elite Dangerous',
    medium: 'game',
    year: '2014',
    makers: 'Frontier Developments; David Braben',
    lineages: ['military-industrial', 'neon-digital', 'clean-future'],
    tagline: 'Orange holographic cockpit, real galaxy',
    description:
      "Elite Dangerous is a design built around one seat. The player rarely leaves the cockpit, so the cockpit is the interface: every readout is a holographic projection floating in front of the pilot, in a single warm orange by default, wrapping around the canopy struts. Targets, radar, shields and heat appear as glowing wireframe panels you look at to open, a fully diegetic HUD that makes sense in virtual reality, where the game was showcased early. The ships descend from the faceted wireframe silhouettes of the 1984 Elite (the Cobra, the Sidewinder, the Viper) rebuilt as angular, panel-lined industrial hulls with chunky landing gear and visible thrusters. Stations keep the original's spinning Coriolis polyhedra and add Orbis and Ocellus types with slow rotating rings and a lit docking slot. Outside, the galaxy is a 1:1 model of the Milky Way, so the backdrop is real astronomy: stars colored by spectral class, nebulae, gas giants and black holes. It works because restraint in the cockpit lets the scale outside feel enormous.",
    palette: [
      { name: 'HUD orange', hex: '#ff7a1a' },
      { name: 'Cockpit gunmetal', hex: '#2c3036' },
      { name: 'Deep space', hex: '#05070c' },
      { name: 'Hyperspace blue', hex: '#3a7bd5' },
      { name: 'Station floodlight', hex: '#f2efe6' },
    ],
    materials: ['Gunmetal panel-lined hulls', 'Canopy glass with struts', 'Holographic light', 'Rubberized seat and flight sticks'],
    shapes: ['Faceted wedge ships from the 1984 originals', 'Rotating Coriolis and Orbis stations', 'Curved holo panels around the pilot', 'Elliptical radar scanner'],
    typeAndUi:
      'Monochrome orange holographic panels in a condensed sans, arranged around the canopy and opened by looking at them. The 3D elliptical scanner is a descendant of the 1984 original.',
    lighting: 'A single hard star as key light, deep black shadows, and the orange glow of the HUD on the cockpit interior.',
    influences: ['Elite (1984)', '2001: A Space Odyssey', 'Real astronomy and the Milky Way', 'Military aviation HUDs'],
    influenced: ['Star Citizen', 'Everspace', 'Starfield'],
    borrow:
      'Pick one HUD color and put every readout inside the space, around the user, so the interface feels like equipment rather than overlay.',
    keywords: ['frontier', 'braben', 'cockpit', 'space sim', 'cobra', 'coriolis', 'vr', 'milky way'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/6/61/Elite-Dangerous-Orbital-Station.jpg/330px-Elite-Dangerous-Orbital-Station.jpg',
        alt: 'A large ringed orbital station above an Earth-like planet',
        caption: 'An Orbis station near an Earth-like planet.',
        source: 'https://en.wikipedia.org/wiki/File:Elite-Dangerous-Orbital-Station.jpg',
      },
    ],
    refs: [{ label: 'Wikipedia: Elite Dangerous', url: 'https://en.wikipedia.org/wiki/Elite_Dangerous' }],
  },
  {
    id: 'alien-isolation',
    title: 'Alien: Isolation',
    medium: 'game',
    year: '2014',
    makers: 'The Creative Assembly; Alistair Hope (creative lead), Jon McKellan (art director); published by Sega',
    lineages: ['cassette-futurism', 'used-future'],
    tagline: 'Faithful 1979 lo-fi sci-fi',
    description:
      "Alien: Isolation is the most rigorous recreation of a film's design language in games. Creative Assembly set its rule as \"lo-fi sci-fi\": nothing could look more advanced than what Ron Cobb, Roger Christian and the Nostromo crew built on stage in 1979. Sevastopol, a decommissioned Seegson trading station orbiting a gas giant, is made of chunky bulkheads, padded walls, beige plastic, ribbed conduits and wipe-clean vinyl, all scaled for people of that era. Every screen is a CRT, with scanlines, bloom and image roll; the team recorded footage through period VHS hardware to get the artifacts right. Terminals use green and amber monospace text, keyboards are deep and clicky, and the motion tracker is a heavy handheld unit with a pulsing blip. Seegson is a cheaper competitor to Weyland-Yutani, so its androids (Working Joes) have rubber faces and boiler suits, and its spaces mix utilitarian corridors with dated 1970s luxury in the Gemini and Spaceflight Terminal sections. Even the menus and load screens play as worn VHS tape. It works because the analog technology slows the player down: saving at a phone-like station, reading terminals, listening for the tracker.",
    palette: [
      { name: 'Terminal green', hex: '#5fd068' },
      { name: 'Nostromo beige', hex: '#c9b994' },
      { name: 'Bulkhead grey', hex: '#3e4140' },
      { name: 'Emergency red', hex: '#c6322a' },
      { name: 'Sodium amber', hex: '#e4a03a' },
    ],
    materials: ['Beige injection-molded plastic', 'Quilted padded wall panels', 'Ribbed steel bulkheads', 'CRT glass and VHS noise', 'Vinyl and rubber'],
    shapes: ['Hexagonal and chamfered doorways', 'Chunky keyboards and toggles', 'Handheld motion tracker', 'Working Joe androids', 'Ribbed ceiling conduits'],
    typeAndUi:
      'Monospace terminal text in green and amber, with CRT distortion on every screen. The motion tracker, save stations and maps are physical devices in the world.',
    lighting: 'Low, flickering practical lights, steam haze, strobing emergency red and the cold glow of CRT screens.',
    influences: ['Alien (1979)', 'Ron Cobb and Moebius designs for the Nostromo', '1970s and 80s computer hardware', 'VHS and CRT artifacts'],
    influenced: ['Alien: Rogue Incursion', 'Callisto Protocol', 'Alien: Romulus'],
    borrow:
      'Set a technology ceiling and never break it: every device should look buildable in a specific past year, with physical buttons and analog noise.',
    keywords: ['sevastopol', 'seegson', 'working joe', 'motion tracker', 'creative assembly', 'lo-fi sci-fi', 'crt', 'survival horror'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/6/64/Alien_Isolation_Art_Exterior.jpg/330px-Alien_Isolation_Art_Exterior.jpg',
        alt: 'Concept art of Sevastopol station silhouetted against a gas giant',
        caption: 'Concept art of Sevastopol station exterior.',
        source: 'https://en.wikipedia.org/wiki/File:Alien_Isolation_Art_Exterior.jpg',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/c/ce/Alien_Isolation_Art_Interior.jpg/330px-Alien_Isolation_Art_Interior.jpg',
        alt: 'Concept art of a Sevastopol interior corridor with period sci-fi detailing',
        caption: 'Concept art of a Sevastopol interior.',
        source: 'https://en.wikipedia.org/wiki/File:Alien_Isolation_Art_Interior.jpg',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/0/04/Alien_isolation_screenshot.jpg/330px-Alien_isolation_screenshot.jpg',
        alt: 'First-person view holding a handheld motion tracker in a dim corridor',
        caption: 'The motion tracker, a physical device in the player’s hands.',
        source: 'https://en.wikipedia.org/wiki/File:Alien_isolation_screenshot.jpg',
      },
    ],
    refs: [{ label: 'Wikipedia: Alien: Isolation', url: 'https://en.wikipedia.org/wiki/Alien:_Isolation' }],
  },
  {
    id: 'killzone',
    title: 'Killzone',
    medium: 'game',
    year: '2004–2013',
    makers: 'Guerrilla Games (Amsterdam); Mathijs de Jonge (game director), Jan-Bart van Beek (art director); published by Sony',
    lineages: ['military-industrial', 'brutalist-monumental', 'used-future'],
    tagline: 'Gas-mask army, glowing red eyes',
    description:
      "Killzone's design is anchored by one silhouette: the Helghast soldier, a trench-coated infantryman in a black gas mask whose round goggle lenses glow orange-red. The Helghast are descendants of human colonists hardened on Helghan, a hostile planet whose air they cannot breathe unaided, and their visual language deliberately borrows from twentieth-century totalitarian armies: greatcoats, helmets, banners, a three-armed emblem and rallies before a leader on a monumental podium. Their capital, Pyrrhus in Killzone 2, is heavy concrete and steel stained by arc-lightning storms, with industrial walkways, petrusite refineries and fortifications. The ISA, the Earth-aligned side, wear more conventional modern combat gear in olive and tan, which makes the enemy read even more clearly. Guerrilla pushed weight and grit: desaturated color, thick particulate haze, heavy weapon recoil and a minimal HUD that fades out when not needed. Killzone 3 added arctic and jungle zones, and Shadow Fall (2013) shifted to a clean Vekta capital split by a wall. It works because one strong, readable icon (the red eyes in the dark) carries the whole fiction.",
    palette: [
      { name: 'Helghast eye', hex: '#ff4a1c' },
      { name: 'Pyrrhus concrete', hex: '#5a5650' },
      { name: 'Greatcoat black', hex: '#1b1c1e' },
      { name: 'ISA olive', hex: '#5b6340' },
      { name: 'Arc storm dust', hex: '#8a7a62' },
    ],
    materials: ['Stained concrete and steel', 'Heavy wool greatcoats', 'Rubber gas masks and glass goggles', 'Riveted armor plate', 'Particulate dust and ash'],
    shapes: ['Round glowing goggle lenses', 'Three-armed Helghast emblem', 'Monumental podiums and banners', 'Fortified walkways and gun emplacements'],
    typeAndUi:
      'A minimal military HUD with stencil-style lettering that fades when idle. Helghast propaganda uses heavy block type, red and black banners and the triangular emblem.',
    lighting: 'Dust-choked amber and grey daylight, arc-lightning flashes, and red-orange eyes glowing in the dark.',
    influences: ['World War I and II infantry imagery', 'Totalitarian propaganda graphics', 'Gas masks and trench warfare'],
    influenced: ['Killzone Shadow Fall', 'Gears of War', 'Battlefield 2042'],
    borrow:
      'Give the antagonist a single unforgettable glowing feature and design everything else around making that silhouette read in low light.',
    keywords: ['helghast', 'guerrilla', 'pyrrhus', 'helghan', 'isa', 'gas mask', 'playstation', 'fps'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/E3_2013_Killzone.jpg/500px-E3_2013_Killzone.jpg',
        alt: 'A costumed Helghast soldier with a hooded coat, rifle and glowing red eyes',
        caption: 'A Helghast costume at E3 2013, promoting Killzone Shadow Fall.',
        source: 'https://commons.wikimedia.org/wiki/File:E3_2013_Killzone.jpg',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/0/00/Killzone_3_Screenshot.jpg/330px-Killzone_3_Screenshot.jpg',
        alt: 'Soldiers fighting in a snowy arctic military environment',
        caption: 'Killzone 3 (2011), the arctic environments of Helghan.',
        source: 'https://en.wikipedia.org/wiki/File:Killzone_3_Screenshot.jpg',
      },
    ],
    refs: [
      { label: 'Wikipedia: Killzone', url: 'https://en.wikipedia.org/wiki/Killzone' },
      { label: 'Wikipedia: Killzone 2', url: 'https://en.wikipedia.org/wiki/Killzone_2' },
    ],
  },
  {
    id: 'doom-2016',
    title: 'Doom (2016)',
    medium: 'game',
    year: '2016',
    makers: 'id Software; Marty Stratton (executive producer), Hugo Martin (creative director)',
    lineages: ['military-industrial', 'biomechanical'],
    tagline: 'Corporate Mars facility meets hell-tech',
    description:
      "The reboot splits its world between two design languages and then shows them bleeding into each other. The Union Aerospace Corporation runs a vast research and energy facility on Mars, harvesting Argent energy from hell, and its architecture is heavy sci-fi industrial: chunky modular wall panels, hazard markings, cable bundles, white and grey corporate surfaces with orange and red accent lighting, and cheerful UAC signage that frames demonic research as clean energy. Hell itself is the opposite, a red and black landscape of bone, rock, flesh, chains and gothic ruins, littered with runes. The meeting point is hell-tech, where demons are cybernetically augmented (the Cyberdemon, the Revenant's shoulder launchers, the Mancubus's arm cannons) and UAC machinery is overgrown with gore. The Doom Slayer's Praetor suit is armor with a story, and the UI is fast and readable: a curved helmet HUD, color-coded pickups, and glory-kill highlights that flash enemies blue and orange. It works because the clean corporate voice makes the horror funnier and the violence more legible.",
    palette: [
      { name: 'Argent red', hex: '#d42a1c' },
      { name: 'UAC white', hex: '#d8d6d0' },
      { name: 'Hazard orange', hex: '#ef7d1a' },
      { name: 'Hellrock black', hex: '#1a0f0d' },
      { name: 'Praetor green', hex: '#4f6b3a' },
    ],
    materials: ['Modular industrial wall panels', 'Cable bundles and steel grating', 'Bone, rock and flesh', 'Glowing Argent energy', 'Battle-worn power armor'],
    shapes: ['Hazard-striped bulkheads', 'Pentagrams and hell runes', 'Cybernetic demon limbs and cannons', 'Ruined gothic arches', 'Praetor suit helmet'],
    typeAndUi:
      'A curved helmet HUD with bold condensed numerals and color-coded ammo, armor and health. UAC signage uses friendly corporate sans type over grim propaganda.',
    lighting: 'Clinical white and orange lighting in the facility against volcanic red glow and smoke in hell.',
    influences: ['Doom (1993)', 'Heavy metal album art', 'Hellraiser', 'Industrial corporate sci-fi'],
    influenced: ['Doom Eternal', 'Doom: The Dark Ages', 'Ultrakill'],
    borrow:
      'Collide two opposed visual systems (clean corporate and ancient occult) and let the hybrid objects at their border carry the identity.',
    keywords: ['uac', 'mars', 'hell', 'argent', 'doom slayer', 'praetor', 'id software', 'demons', 'fps'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/b/b7/Screenshot_for_Doom_2016.jpg/330px-Screenshot_for_Doom_2016.jpg',
        alt: 'First-person view of a shotgun aimed at a large horned demon',
        caption: 'The Doom Slayer fighting a Baron of Hell with the Super Shotgun.',
        source: 'https://en.wikipedia.org/wiki/File:Screenshot_for_Doom_2016.jpg',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/2/28/Doom_Cover.jpg/250px-Doom_Cover.jpg',
        alt: 'Cover art showing the armored Doom Slayer amid demons',
        caption: 'Doom (2016) cover art.',
        source: 'https://en.wikipedia.org/wiki/File:Doom_Cover.jpg',
      },
    ],
    refs: [{ label: 'Wikipedia: Doom (2016)', url: 'https://en.wikipedia.org/wiki/Doom_(2016_video_game)' }],
  },
  {
    id: 'no-mans-sky',
    title: "No Man's Sky",
    medium: 'game',
    year: '2016',
    makers: 'Hello Games; Sean Murray, Grant Duncan (art director)',
    lineages: ['graphic-pop', 'alien-naturalist', 'retro-futurism'],
    tagline: 'Seventies paperback cover, procedurally generated',
    description:
      "No Man's Sky set out to make the player feel inside the cover of a 1970s science fiction paperback. Hello Games pointed to the illustrators of that era, Chris Foss above all, along with Ralph McQuarrie, and the game borrows their habits: saturated, unnatural skies (pink, mint, tangerine), chunky striped spacecraft with stencil numbers, colossal planets hanging low over the horizon, and alien fauna that look sketched rather than simulated. Because every planet is generated from rules, the art direction lives in the palette tables and part kits: ships are assembled from modular fuselages, wings and cockpits, creatures from mix-and-match body parts, and buildings from a small set of prefab domes and pods. Technology is friendly and rounded, with the Atlas interfaces, spinning space stations and the Sentinels (floating drones) as the main signs of an older order. The interface is restrained, with thin outline icons, a scanning visor that labels flora and minerals, and a circular radial menu. What separates it from realistic space sims is that it never pretends to be photographic. It works because the generator is tuned for compositions that look like painted cover art from almost any angle.",
    palette: [
      { name: 'Foss pink sky', hex: '#f08aa8' },
      { name: 'Mint atmosphere', hex: '#8fe3c6' },
      { name: 'Paperback tangerine', hex: '#f39a3a' },
      { name: 'Hull stripe red', hex: '#c8352a' },
      { name: 'Deep violet space', hex: '#22183e' },
    ],
    materials: ['Painted hulls with stripes and stencil numbers', 'Matte alien rock and moss', 'Crystal and mineral deposits', 'Rounded white base modules'],
    shapes: ['Huge low-hanging planets and moons', 'Modular striped spacecraft', 'Hybrid alien creatures', 'Spinning polyhedral stations', 'Floating Sentinel drones'],
    typeAndUi:
      'Thin outline icons and a clean sans, a scanning visor that tags plants, animals and minerals, and radial quick menus. Alien languages appear as glyphs learned word by word.',
    lighting: 'Strongly tinted atmospheric light per planet, long sunsets and wide-open skies with visible neighboring worlds.',
    influences: ['Chris Foss paperback covers', 'Ralph McQuarrie concept art', '1970s science fiction book jackets'],
    influenced: ['Starfield', 'Outer Wilds', 'Light No Fire'],
    borrow:
      'Treat procedural content as an illustration problem: constrain palettes and part kits so random combinations still compose like a painted cover.',
    keywords: ['hello games', 'procedural', 'chris foss', 'paperback', 'atlas', 'sentinels', 'exploration', 'planets'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/e/ec/No_mans_sky_screenshot.jpg/330px-No_mans_sky_screenshot.jpg',
        alt: 'An alien landscape with colorful procedurally generated plants and creatures',
        caption: 'A planet with procedurally generated flora and fauna.',
        source: 'https://en.wikipedia.org/wiki/File:No_mans_sky_screenshot.jpg',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/2/2b/No_Mans_Sky_Ships.jpg/330px-No_Mans_Sky_Ships.jpg',
        alt: 'Several player starships flying through space toward a glassy structure',
        caption: 'Player ships in space, flying toward a glassy hive structure.',
        source: 'https://en.wikipedia.org/wiki/File:No_Mans_Sky_Ships.jpg',
      },
    ],
    refs: [{ label: "Wikipedia: No Man's Sky", url: 'https://en.wikipedia.org/wiki/No_Man%27s_Sky' }],
  },
  {
    id: 'titanfall-2',
    title: 'Titanfall 2',
    medium: 'game',
    year: '2016',
    makers: 'Respawn Entertainment; Joel Emslie (art direction); published by Electronic Arts',
    lineages: ['military-industrial', 'used-future'],
    tagline: 'Frontier mechs as working machinery',
    description:
      "Titanfall 2 treats giant robots as military hardware first and characters second. Its Titans are roughly seven-meter bipedal walkers built like attack helicopters and earthmovers: boxy armored chassis, exposed hydraulics, stenciled serials, hazard chevrons, worn paint and a cockpit hatch the pilot climbs into through the chest. BT-7274, the Vanguard-class Titan at the heart of the campaign, has a single round optic as a face, and Respawn cited real aircraft such as the AH-64 Apache as reference for his look. The setting is the Frontier, a sector of colonies fought over by the corporate IMC and the rebel Militia, and the environments mix industrial megastructures, factory lines that assemble houses, overgrown alien jungles on Typhon and a time-shifted research facility. Pilots wear lean, functional kit with jump packs, which makes the scale contrast with Titans constant. The HUD is projected and tactical, with Titan interfaces showing BT's systems and dialogue options as clean geometric panels. Unlike anime mecha with heroic proportions, the language is closer to a forklift crossed with a gunship. It works because believable machinery makes the bond with BT feel earned.",
    palette: [
      { name: 'Militia tan', hex: '#a8946a' },
      { name: 'IMC slate', hex: '#4c5560' },
      { name: 'BT optic blue', hex: '#4ac0ff' },
      { name: 'Hazard orange', hex: '#f07a1c' },
      { name: 'Typhon jungle', hex: '#3d5a34' },
    ],
    materials: ['Chipped painted armor plate', 'Exposed hydraulics and cables', 'Stenciled serial numbers and decals', 'Concrete industrial structures', 'Dense alien vegetation'],
    shapes: ['Boxy bipedal Titans with chest hatches', 'Single round optic faces', 'Jump-pack pilots in lean kit', 'Industrial factory lines and gantries'],
    typeAndUi:
      'A tactical projected HUD with clean geometric frames and stencil-style labels. Titan interfaces show BT-7274 system status and dialogue choices as compact panels.',
    lighting: 'Hazy natural daylight on Frontier worlds, hard factory lighting indoors and glowing Titan optics.',
    influences: ['AH-64 Apache and military aircraft', 'Mobile Suit Gundam and Patlabor', 'Aliens power loader', 'Heavy construction equipment'],
    influenced: ['Apex Legends', 'Armored Core VI', 'Mecha Break'],
    borrow:
      'Design big machines from real industrial and aviation references, with maintenance marks and access hatches, then give them one simple expressive feature.',
    keywords: ['respawn', 'bt-7274', 'titan', 'mech', 'frontier', 'imc', 'militia', 'pilot', 'fps'],
    stills: [
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/d/d4/Titanfall_2_gameplay_screenshot.png/330px-Titanfall_2_gameplay_screenshot.png',
        alt: 'A pilot grappling onto an enemy Titan mech in a multiplayer match',
        caption: "A pilot latches onto an enemy Titan with the grapple hook.",
        source: 'https://en.wikipedia.org/wiki/File:Titanfall_2_gameplay_screenshot.png',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/en/thumb/1/13/Titanfall_2.jpg/250px-Titanfall_2.jpg',
        alt: 'Cover art showing a pilot and the Titan BT-7274',
        caption: 'Titanfall 2 cover art with BT-7274.',
        source: 'https://en.wikipedia.org/wiki/File:Titanfall_2.jpg',
      },
    ],
    refs: [{ label: 'Wikipedia: Titanfall 2', url: 'https://en.wikipedia.org/wiki/Titanfall_2' }],
  },
];
