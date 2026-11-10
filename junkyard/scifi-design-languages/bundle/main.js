//#region src/lib/dom.ts
/**
* Minimal element builder. Text children always become text nodes, so
* user-provided strings can never inject markup.
*/
function h(tag, attrs = {}, ...children) {
	const el = document.createElement(tag);
	for (const [key, value] of Object.entries(attrs)) {
		if (value === void 0 || value === false) continue;
		if (key in el && typeof value !== "string") el[key] = value;
		else el.setAttribute(key, value === true ? "" : String(value));
	}
	for (const child of children) {
		if (child === null || child === void 0 || child === false) continue;
		el.append(child);
	}
	return el;
}
function byId(id) {
	const el = document.getElementById(id);
	if (!el) throw new Error(`Missing #${id}`);
	return el;
}
//#endregion
//#region junkyard/scifi-design-languages/data/brief.ts
var list = (items) => items.join(", ");
var BRIEF = [
	{
		id: "tagline",
		label: "In a line",
		question: "Can you say the look in under eight words?",
		text: (w) => w.tagline
	},
	{
		id: "palette",
		label: "Palette",
		question: "Which five colors would you hand a painter?",
		text: (w) => list(w.palette.map((s) => `${s.name} ${s.hex}`))
	},
	{
		id: "materials",
		label: "Materials",
		question: "What are the surfaces made of?",
		text: (w) => list(w.materials)
	},
	{
		id: "shapes",
		label: "Shapes",
		question: "Which silhouettes and motifs repeat?",
		text: (w) => list(w.shapes)
	},
	{
		id: "type",
		label: "Type and UI",
		question: "How do words and interfaces look?",
		text: (w) => w.typeAndUi
	},
	{
		id: "lighting",
		label: "Light",
		question: "Where does the light come from, and what mood does it set?",
		text: (w) => w.lighting
	},
	{
		id: "borrow",
		label: "Borrow it",
		question: "What is the one move you could reuse today?",
		text: (w) => w.borrow
	}
];
/** The whole brief as plain text, ready to paste into a doc or a message. */
function briefText(w) {
	return [`${w.title} (${w.year})`, ...BRIEF.map((a) => `${a.label}: ${a.text(w)}`)].join("\n");
}
//#endregion
//#region junkyard/scifi-design-languages/data/lineages.ts
/** Display order of lineages in the index. */
var LINEAGES = [
	{
		id: "used-future",
		title: "Used Future",
		blurb: "Lived-in, dented, patched. Technology as tools that get dirty and get fixed."
	},
	{
		id: "cassette-futurism",
		title: "Cassette Futurism",
		blurb: "The future as the 1970s and 80s built it: CRTs, chunky keys, beige plastic and toggles."
	},
	{
		id: "clean-future",
		title: "Clean Future",
		blurb: "White, smooth and quiet. Minimal surfaces, soft light, technology that hides its seams."
	},
	{
		id: "cyberpunk",
		title: "Cyberpunk",
		blurb: "High tech, low life. Neon in the rain, vertical cities, corporations above the law."
	},
	{
		id: "retro-futurism",
		title: "Retro-Futurism",
		blurb: "Yesterday imagining tomorrow: deco towers, atomic optimism, chrome and streamlines."
	},
	{
		id: "brutalist-monumental",
		title: "Brutalist and Monumental",
		blurb: "Concrete, mass and scale. Architecture that dwarfs people and shows power."
	},
	{
		id: "biomechanical",
		title: "Biomechanical",
		blurb: "Where flesh and machine fuse: ribbed, wet, skeletal and unsettling."
	},
	{
		id: "neon-digital",
		title: "Neon Digital",
		blurb: "Worlds inside the machine: glowing edges, grids, code and pure geometry."
	},
	{
		id: "military-industrial",
		title: "Military Industrial",
		blurb: "Function first: armor plates, stenciled markings, hazard stripes and hardware."
	},
	{
		id: "mythic-precursor",
		title: "Mythic Precursor",
		blurb: "Ruins of an older, greater civilization: sacred geometry, impossible scale, quiet light."
	},
	{
		id: "alien-naturalist",
		title: "Alien Naturalist",
		blurb: "Living worlds: bioluminescence, strange ecologies and organic architecture."
	},
	{
		id: "post-apocalyptic",
		title: "Post-Apocalyptic",
		blurb: "After the fall: salvage, rust, overgrowth and the beauty of ruins."
	},
	{
		id: "graphic-pop",
		title: "Graphic Pop",
		blurb: "Design as the world itself: bold graphics, poster color, logos and type as setting."
	},
	{
		id: "new-weird",
		title: "New Weird",
		blurb: "Liminal and uncanny: rules that bend, familiar places made strange."
	}
];
//#endregion
//#region junkyard/scifi-design-languages/data/worlds/games-a.ts
var GAMES_A = [
	{
		id: "mirrors-edge",
		title: "Mirror's Edge",
		medium: "game",
		year: "2008",
		makers: "DICE for Electronic Arts; art director Johannes Söderqvist. Followed by Mirror's Edge Catalyst (2016).",
		lineages: ["clean-future", "graphic-pop"],
		tagline: "White city, red runner vision",
		description: "Mirror's Edge imagines a dystopia that looks like a utopia. The unnamed City is a bleached, sunlit sprawl of glass towers, rooftop plant rooms and air ducts, scrubbed so clean that surveillance hides in plain sight. DICE removed almost all texture noise and painted the world in near white, then reserved saturated color for meaning. Runner Vision tints the next pipe, ledge or springboard red, so the level geometry itself becomes the interface and the player reads a route at a sprint. Interiors switch to single-hue zones (an all orange office, a teal stairwell, a yellow maintenance shaft), giving each space a graphic identity like a page in a design annual. Faith Connors wears practical runner gear, a tattoo around one eye and red accents that match the path. There is almost no HUD: a small dot reticle and nothing else, because the camera is the body and the body is the information. Global illumination baked with Beast gives the white surfaces soft color bleed, so blank walls still feel warm. Catalyst (2016) rebuilt the setting as the City of Glass, an open world of mirrored corporate towers with the same restraint. The language works because color is rationed: when everything is white, a single red pipe is a command.",
		palette: [
			{
				name: "Rooftop White",
				hex: "#F4F4F2"
			},
			{
				name: "Runner Red",
				hex: "#D7262E"
			},
			{
				name: "Sky Glass",
				hex: "#9CC9E6"
			},
			{
				name: "Office Orange",
				hex: "#F28C28"
			},
			{
				name: "Shaft Teal",
				hex: "#2E9C9A"
			}
		],
		materials: [
			"matte white render",
			"clear and tinted curtain glass",
			"galvanized ductwork",
			"painted steel pipes",
			"rooftop gravel and tar"
		],
		shapes: [
			"flat rooftop planes",
			"cranes and gantries",
			"red-highlighted pipes and ledges",
			"stacked air-conditioning units",
			"long sightlines between towers"
		],
		typeAndUi: "Almost no HUD, only a center dot; navigation is carried by red Runner Vision on the geometry. Menus and marketing use clean sans serif type on white with the red as the only accent.",
		lighting: "High-noon sunlight with soft bounced color from baked global illumination; interiors flooded with a single saturated hue.",
		influences: [
			"Parkour and freerunning culture",
			"Modernist and International Style architecture",
			"Swiss graphic design",
			"Japanese anime color keys"
		],
		influenced: [
			"Mirror's Edge Catalyst",
			"Dying Light",
			"Ghostrunner",
			"Neon White"
		],
		borrow: "Keep the field neutral and give one saturated color a single job, such as the next action, so the eye follows it without labels.",
		keywords: [
			"parkour",
			"runner vision",
			"faith connors",
			"dice",
			"white city",
			"city of glass",
			"catalyst",
			"minimal hud"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Mirror's Edge",
			url: "https://en.wikipedia.org/wiki/Mirror%27s_Edge"
		}, {
			label: "Wikipedia: Mirror's Edge Catalyst",
			url: "https://en.wikipedia.org/wiki/Mirror%27s_Edge_Catalyst"
		}]
	},
	{
		id: "portal",
		title: "Portal",
		medium: "game",
		year: "2007–2011",
		makers: "Valve, grown from the DigiPen project Narbacular Drop (Kim Swift); writers Erik Wolpaw and Chet Faliszek.",
		lineages: [
			"clean-future",
			"new-weird",
			"retro-futurism"
		],
		tagline: "Sterile test chambers, corporate decay",
		description: "Aperture Science is a laboratory designed as a puzzle box. Portal's test chambers are grids of white, portal-conductive panels set against dark, non-portable metal, so the material itself tells the player where a portal can land. The palette is a kit: blue and orange portal rims, the pale cyan of the Aperture Science Handheld Portal Device, red laser lines, and the soft pink heart of the Weighted Companion Cube. Signage is a deadpan pictogram system, with chamber numbers and stick-figure hazard icons on a lit panel at each entrance. The cleanliness is a lie that the game peels back: behind the panels are rusting catwalks, scrawled warnings from a vanished employee ('the cake is a lie') and GLaDOS herself, an inverted machine of hanging arms and cables. Portal 2 (2011) turns the facility into a stratigraphic dig. Overgrown chambers have collapsed into one another, robotic arms rebuild rooms in real time, and below lie Aperture's 1950s and 1970s eras of wood paneling, Cave Johnson's portraits and asbestos-era test spheres. That layered history makes the brand a character with an aesthetic past. It works because the minimalism serves gameplay first, and then the decay gives it meaning.",
		palette: [
			{
				name: "Test Panel White",
				hex: "#E9EDEF"
			},
			{
				name: "Portal Blue",
				hex: "#1E8BFF"
			},
			{
				name: "Portal Orange",
				hex: "#FF8A1E"
			},
			{
				name: "Non-portable Grey",
				hex: "#3E4448"
			},
			{
				name: "Companion Pink",
				hex: "#E46FA8"
			}
		],
		materials: [
			"white portal-conductive panels",
			"dark metal tiling",
			"observation-room glass",
			"rusted catwalks and pipes",
			"moss and vines (Portal 2)",
			"1950s wood paneling"
		],
		shapes: [
			"square panel grids",
			"oval portal rims",
			"cubes and buttons",
			"hanging GLaDOS chassis",
			"spherical personality cores",
			"pictogram signs"
		],
		typeAndUi: "Chamber signs list the test number and pictograms for hazards in a clean grotesque sans. There is effectively no HUD beyond a crosshair that shows which portal colors are placed.",
		lighting: "Even fluorescent white in the chambers, falling to dim amber and green in the backstage maintenance areas and Old Aperture.",
		influences: [
			"Narbacular Drop",
			"Corporate science labs and safety films",
			"2001: A Space Odyssey (HAL 9000)",
			"Mid-century American corporate design"
		],
		influenced: [
			"The Talos Principle",
			"Q.U.B.E.",
			"The Stanley Parable",
			"Superliminal"
		],
		borrow: "Make the material readable as rules, white for one behavior and dark for another, then hide the story in the seams behind it.",
		keywords: [
			"aperture science",
			"glados",
			"test chamber",
			"portal gun",
			"companion cube",
			"valve",
			"cave johnson",
			"portal 2"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Portal (video game)",
			url: "https://en.wikipedia.org/wiki/Portal_(video_game)"
		}, {
			label: "Wikipedia: Portal 2",
			url: "https://en.wikipedia.org/wiki/Portal_2"
		}]
	},
	{
		id: "half-life",
		title: "Half-Life",
		medium: "game",
		year: "1998",
		makers: "Valve, on the GoldSrc engine (a heavily modified Quake engine).",
		lineages: ["military-industrial", "cassette-futurism"],
		tagline: "Government lab, beige and hazard",
		description: "Half-Life's Black Mesa Research Facility is a believable workplace before it is a battlefield. Buried in the New Mexico desert, it is a federal complex of security checkpoints, monorail trams, cafeterias, office cubicles, server rooms and vast test chambers, all built in the institutional style of late Cold War government science. Walls are beige and grey concrete block, floors are linoleum, doors carry stenciled sector letters, and the Anomalous Materials lab is clad in rotating anti-mass spectrometer hardware ringed by yellow and black hazard stripes. Gordon Freeman's orange HEV suit is the costume of a technician, not a soldier, and its voice announces health and armor in a calm synthetic tone. The HUD is a sparse amber readout of numbers and icons in the corners. The opening tram ride is the key design move: a long, uninterrupted look at the facility running normally, so the resonance cascade reads as damage to a place the player understands. After the disaster, the design language shifts to sparking cables, flooded tunnels, Hazardous Environment Combat Unit marines in woodland camouflage and the alien green of Xen. It works because the mundane is rendered with care, which makes the extraordinary feel close.",
		palette: [
			{
				name: "Facility Beige",
				hex: "#B8AD92"
			},
			{
				name: "HEV Orange",
				hex: "#D9661F"
			},
			{
				name: "Hazard Yellow",
				hex: "#E8C21A"
			},
			{
				name: "Concrete Grey",
				hex: "#6F6F68"
			},
			{
				name: "Xen Green",
				hex: "#7FB33A"
			}
		],
		materials: [
			"painted concrete block",
			"linoleum and steel grating",
			"brushed metal lab equipment",
			"stenciled sheet steel",
			"glass observation windows"
		],
		shapes: [
			"tram rails and cars",
			"hazard-striped blast doors",
			"ventilation ducts",
			"the anti-mass spectrometer rotor",
			"crates and catwalks"
		],
		typeAndUi: "Amber numeric HUD with blocky icons for health, armor and ammo. Facility signage uses stenciled sector letters and plain government sans serif directions.",
		lighting: "Flat fluorescent office light that gives way to emergency red, flickering failures and the green glow of Xen.",
		influences: [
			"Los Alamos and Cold War government labs",
			"Stephen King's The Mist",
			"The Twilight Zone and X-Files paranoia",
			"Doom and Quake"
		],
		influenced: [
			"Half-Life 2",
			"Black Mesa",
			"BioShock",
			"Prey (2017)"
		],
		borrow: "Show the ordinary version of a space first, with offices and signs and routines, so any later disruption has something to break.",
		keywords: [
			"black mesa",
			"gordon freeman",
			"hev suit",
			"resonance cascade",
			"xen",
			"valve",
			"tram",
			"anomalous materials"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Half-Life (video game)",
			url: "https://en.wikipedia.org/wiki/Half-Life_(video_game)"
		}]
	},
	{
		id: "half-life-2",
		title: "Half-Life 2",
		medium: "game",
		year: "2004",
		makers: "Valve; art director Viktor Antonov, on the Source engine.",
		lineages: ["military-industrial", "biomechanical"],
		tagline: "Occupied Eastern Europe, alien citadel",
		description: "Half-Life 2 sets its occupation story in City 17, an Eastern European city that art director Viktor Antonov, who grew up in Sofia, Bulgaria, built from memories of the region. Real architecture forms the base layer: Stalinist apartment blocks, nineteenth century facades, cobbled squares, tram lines and canals, all in weathered ochre, grey and green. Over this sits the Combine, an interdimensional empire whose technology is dark blue-grey metal, smooth and slab-like, intruding into the old city as sliding walls that crush buildings and as the Citadel, a sheer tower that rises from the center into the clouds. The contrast between human texture and alien slab is the whole idea. Costume follows suit: Civil Protection officers wear gas masks and blue-grey uniforms like a modern riot police, Overwatch soldiers have faceless helmets with single lenses, and citizens wear blue denim prison-like clothing. Striders are biomechanical tripods, and the Combine's synthetic voice dispatches orders over loudspeakers. Breencasts play on giant monitors in plazas, borrowing the propaganda screen from Nineteen Eighty-Four. The HUD is a small orange readout in the corners. It works because the occupation is legible in the architecture itself, with every Combine surface a wall dropped onto a place that once belonged to people.",
		palette: [
			{
				name: "Combine Steel",
				hex: "#3B4650"
			},
			{
				name: "City 17 Ochre",
				hex: "#A48A5C"
			},
			{
				name: "Overcast Grey",
				hex: "#8E9497"
			},
			{
				name: "Citizen Denim",
				hex: "#4A6178"
			},
			{
				name: "HUD Amber",
				hex: "#F2A42B"
			}
		],
		materials: [
			"dark blue-grey alien metal",
			"weathered plaster and brick",
			"cobblestone and tram track",
			"rusted iron and canal water",
			"gas-mask rubber"
		],
		shapes: [
			"the Citadel spire",
			"sliding Combine walls",
			"tripod Striders",
			"Stalinist apartment slabs",
			"propaganda monitors"
		],
		typeAndUi: "A minimal amber HUD of numbers and segmented bars. In-world, Combine screens and Breencast monitors carry propaganda, and Cyrillic-flavored signage roots the city in Eastern Europe.",
		lighting: "Flat overcast daylight and cold blue Combine light, with the Citadel visible on the horizon from almost everywhere.",
		influences: [
			"Soviet and Eastern Bloc cities",
			"Nineteen Eighty-Four",
			"Brutalist architecture",
			"War of the Worlds tripods"
		],
		influenced: [
			"Dishonored",
			"Half-Life: Alyx",
			"Atomic Heart"
		],
		borrow: "Build on a real, textured place, then drop a single foreign material into it; the contrast tells the story of power without text.",
		keywords: [
			"city 17",
			"combine",
			"citadel",
			"viktor antonov",
			"strider",
			"civil protection",
			"valve",
			"source engine"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Half-Life 2",
			url: "https://en.wikipedia.org/wiki/Half-Life_2"
		}, {
			label: "Wikipedia: Viktor Antonov",
			url: "https://en.wikipedia.org/wiki/Viktor_Antonov"
		}]
	},
	{
		id: "halo",
		title: "Halo",
		medium: "game",
		year: "2001–present",
		makers: "Bungie (2001–2010), then 343 Industries; Halo: Combat Evolved art director Marcus Lehto, Master Chief design with Shi Kai Wang.",
		lineages: ["military-industrial", "mythic-precursor"],
		tagline: "Space marines on an ancient ring",
		description: "Halo stages three design languages against one another, and the clash is the point. The UNSC is grounded, near-future military hardware: olive drab and gunmetal, chunky plating, stenciled serials, the Warthog jeep, the Pelican dropship and the MJOLNIR armor of Master Chief, a green, gold-visored suit that reads at any distance as a silhouette. The Covenant is the opposite: purple, glossy, organic hulls with blue and pink energy glows, ships shaped like fish or seed pods, and soldiers ranging from small Grunts to armored Elites. The Forerunners are older than both. Their architecture is silver-grey and monumental, made of angled slabs, cantilevered bridges and floating facets, with blue light channels that carry their ancient power. And over it all is Installation 04 itself, a ring world thousands of kilometers wide, with sea and grassland on its inner surface curving up into the sky. The HUD is styled as the inside of the helmet: a shield bar, motion tracker and ammo counter framed by the visor edge. It works because each faction is recognizable from color and shape alone, so players can read the battlefield instantly, while the ring above them adds a sense of myth.",
		palette: [
			{
				name: "MJOLNIR Green",
				hex: "#5B6B3A"
			},
			{
				name: "Visor Gold",
				hex: "#D9A441"
			},
			{
				name: "Covenant Purple",
				hex: "#5A3C8C"
			},
			{
				name: "Forerunner Silver",
				hex: "#A7AFB4"
			},
			{
				name: "Ring Sky Blue",
				hex: "#7FB4E0"
			}
		],
		materials: [
			"olive armor plate",
			"gunmetal and stencils",
			"glossy purple alloy",
			"silver Forerunner stone-metal",
			"blue hard light"
		],
		shapes: [
			"the ring arc rising into the sky",
			"angled Forerunner monoliths",
			"Covenant seed-pod ships",
			"the Warthog and Pelican",
			"gold helmet visor"
		],
		typeAndUi: "A helmet-frame HUD with a blue shield bar, circular motion tracker and digital ammo counter. UNSC labeling uses stenciled military type; Forerunner glyphs are geometric and alien.",
		lighting: "Bright, open daylight on the ring with soft atmospheric haze, contrasted with dim Covenant interiors and cold blue Forerunner halls.",
		influences: [
			"Larry Niven's Ringworld",
			"Iain M. Banks's Culture Orbitals",
			"Aliens colonial marines",
			"Syd Mead and Ralph McQuarrie"
		],
		influenced: [
			"Destiny",
			"Gears of War",
			"Killzone"
		],
		borrow: "Give every faction its own color and shape grammar so that anything on screen can be identified from silhouette and hue alone.",
		keywords: [
			"master chief",
			"unsc",
			"covenant",
			"forerunner",
			"ringworld",
			"installation 04",
			"bungie",
			"343 industries"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Halo (franchise)",
			url: "https://en.wikipedia.org/wiki/Halo_(franchise)"
		}, {
			label: "Wikipedia: Halo: Combat Evolved",
			url: "https://en.wikipedia.org/wiki/Halo:_Combat_Evolved"
		}]
	},
	{
		id: "mass-effect",
		title: "Mass Effect",
		medium: "game",
		year: "2007–2012",
		makers: "BioWare; project director Casey Hudson, art director Derek Watts, concept artist Matt Rhodes among others.",
		lineages: ["clean-future"],
		tagline: "Optimistic space opera, film grain",
		description: "Mass Effect set out to look like the science fiction of the late 1970s and early 1980s: the lens flares, glossy hulls and synthesized score of films that imagined a confident, cosmopolitan future. The first game even applied a film grain filter. The Citadel, an ancient space station whose five arms open like a flower, holds white and blue civic plazas, glass towers and garden promenades, a clean future in the tradition of Syd Mead. The Normandy is a sleek, low frigate in grey and white, and its interior uses soft panel lighting and orange holographic consoles. Each species has a clear design identity: turians with their keratin crests and face paint, asari in flowing forms, krogan with heavy plated humps, quarians in hooded suits and patterned fabric. Technology is projected from the body: the omni-tool is an orange holographic gauntlet, and biotic powers glow blue. The interface follows the same language, with a dialogue wheel, a galaxy map and codex screens in thin white lines on dark blue. Later games darken the tone with the Reapers, vast cuttlefish-like machines, and ruined Earth cities. It works because the optimism is so clearly built, which makes its destruction feel like a loss.",
		palette: [
			{
				name: "Citadel White",
				hex: "#E9EEF2"
			},
			{
				name: "Alliance Blue",
				hex: "#1E3A5F"
			},
			{
				name: "Omni-tool Orange",
				hex: "#F28A1E"
			},
			{
				name: "Biotic Blue",
				hex: "#4FA3F7"
			},
			{
				name: "Reaper Red",
				hex: "#B3261E"
			}
		],
		materials: [
			"glossy white hull plating",
			"brushed metal and glass",
			"orange hard-light holograms",
			"quarian patterned textiles",
			"krogan plated hide"
		],
		shapes: [
			"the five-armed Citadel",
			"the low arrowhead Normandy",
			"the dialogue wheel",
			"Reaper tendrils",
			"mass relays with spinning rings"
		],
		typeAndUi: "Thin, clean sans serif and line graphics in white and pale blue on dark fields, with orange for interactive holograms. The radial dialogue wheel became a genre convention.",
		lighting: "Cinematic lens flares, anamorphic streaks and film grain, with cool blue ambience punctuated by warm orange interfaces.",
		influences: [
			"Syd Mead",
			"Blade Runner",
			"2001: A Space Odyssey",
			"Star Wars and 1980s space opera",
			"Vangelis and synthesizer scores"
		],
		influenced: [
			"Mass Effect: Andromeda",
			"The Outer Worlds",
			"Starfield",
			"Stellaris"
		],
		borrow: "Pair clean white architecture with one warm interface color and a touch of analog grain to make a future feel both new and nostalgic.",
		keywords: [
			"citadel",
			"normandy",
			"commander shepard",
			"omni-tool",
			"reapers",
			"bioware",
			"dialogue wheel",
			"space opera"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Mass Effect",
			url: "https://en.wikipedia.org/wiki/Mass_Effect"
		}]
	},
	{
		id: "dead-space",
		title: "Dead Space",
		medium: "game",
		year: "2008",
		makers: "EA Redwood Shores (later Visceral Games); creator and executive producer Glen Schofield, art director Ian Milham.",
		lineages: [
			"biomechanical",
			"used-future",
			"military-industrial"
		],
		tagline: "Industrial horror, diegetic interface",
		description: "Dead Space is set aboard the USG Ishimura, a planet-cracker mining ship that is equal parts factory, hospital and cathedral, and the design treats it as a working industrial vessel gone wrong. Corridors are ribbed steel with heavy bulkheads, cable runs and hazard markings; the medical deck has clinical white tile streaked with blood; the chapel of the Church of Unitology carries the Marker's spiral glyphs. Isaac Clarke is an engineer, and his RIG suit, with its segmented plates and riveted helmet, looks like work gear rather than combat armor. The breakthrough is the interface. There is no conventional HUD: Isaac's health is a glowing bar of cells down his spine, his stasis energy is a circular gauge on his back, ammo counts are projected from the weapon, and the inventory, map and messages open as holograms in front of him while the game keeps running. Everything the player needs exists inside the fiction, so there is no safe pause. The Necromorphs are human bodies reassembled into bladed forms, which the strategic dismemberment mechanic asks you to study. It works because every element of the design, from the UI to the enemy anatomy, keeps the player in the body of one frightened engineer.",
		palette: [
			{
				name: "Bulkhead Rust",
				hex: "#5A4636"
			},
			{
				name: "RIG Cyan",
				hex: "#3FD0E0"
			},
			{
				name: "Warning Amber",
				hex: "#E89A2C"
			},
			{
				name: "Necro Flesh",
				hex: "#8C5A4A"
			},
			{
				name: "Marker Red",
				hex: "#B11F1F"
			}
		],
		materials: [
			"ribbed industrial steel",
			"segmented RIG armor",
			"clinical tile",
			"blue holographic projection",
			"necrotic flesh"
		],
		shapes: [
			"spine health bar",
			"ribbed corridors and bulkheads",
			"the twisted double-helix Marker",
			"plasma cutter",
			"bladed Necromorph limbs"
		],
		typeAndUi: "Fully diegetic UI: holographic menus, an in-world map and video logs projected in cyan from the RIG, with health and stasis read from the suit itself. Ship signage uses blocky stencil type and deck codes.",
		lighting: "Pools of harsh light separated by deep darkness, flickering failures and cold blue holograms against rust and blood.",
		influences: [
			"Alien and Aliens",
			"Event Horizon",
			"John Carpenter's The Thing",
			"Resident Evil 4",
			"System Shock"
		],
		influenced: ["The Callisto Protocol", "Dead Space (2023 remake)"],
		borrow: "Put status information on the character or the objects themselves, so the interface reinforces immersion rather than sitting on top of it.",
		keywords: [
			"ishimura",
			"isaac clarke",
			"rig",
			"diegetic ui",
			"necromorph",
			"marker",
			"visceral games",
			"plasma cutter"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Dead Space (2008 video game)",
			url: "https://en.wikipedia.org/wiki/Dead_Space_(2008_video_game)"
		}]
	},
	{
		id: "bioshock",
		title: "BioShock",
		medium: "game",
		year: "2007",
		makers: "2K Boston and 2K Australia (Irrational Games); creative director Ken Levine, art director Scott Sinclair.",
		lineages: ["retro-futurism", "post-apocalyptic"],
		tagline: "Art deco utopia under the sea",
		description: "BioShock's Rapture is an Art Deco city on the floor of the Atlantic, founded in 1946 by industrialist Andrew Ryan as a refuge from government and religion. Jack finds it already in ruins in 1960, after the collapse that began on New Year's Eve 1958. The architecture borrows from Rockefeller Center, the Chrysler Building and the renderings of Hugh Ferriss: stepped towers, sunburst motifs, chrome and gilt trim, bronze statuary and banners that proclaim Ryan's ideals. Inside, the deco grandeur is failing. Seawater leaks through glass, lobbies are strewn with luggage and broken champagne bottles, and neon signs for stores like Fort Frolic and Arcadia flicker over corpses. Costume is mid-century formality, masquerade masks and torn evening wear on the Splicers, with the Big Daddy as the icon: a hulking riveted diving suit with a porthole helmet and a drill, escorting a Little Sister in a pinafore. Plasmids and Tonics are sold with cheerful 1950s advertising, so the genetic horror arrives wrapped in pin-up graphics and vending machines with names like Circus of Values. The HUD itself takes cues from period design. It works because the ideology is embedded in the decor: the beauty of the city is the proof of Ryan's argument, and its ruin is the rebuttal.",
		palette: [
			{
				name: "Abyss Teal",
				hex: "#0F3A40"
			},
			{
				name: "Deco Gold",
				hex: "#C9A045"
			},
			{
				name: "Bathysphere Brass",
				hex: "#8C6A32"
			},
			{
				name: "Neon Rose",
				hex: "#E8577A"
			},
			{
				name: "Leak Aqua",
				hex: "#5FB3B0"
			}
		],
		materials: [
			"bronze and gilt trim",
			"riveted steel and brass",
			"marble and terrazzo",
			"thick porthole glass",
			"neon tube signage"
		],
		shapes: [
			"stepped deco towers",
			"sunburst and fan motifs",
			"the Big Daddy porthole helmet",
			"bathyspheres",
			"vending-machine facades"
		],
		typeAndUi: "Period display faces, streamlined sans and 1950s advertising lettering on posters, neon signs and vending machines. The HUD uses ornamental gauges and frames echoing the era.",
		lighting: "Dim, blue-green underwater light filtering through windows, broken by warm incandescent pools and pink and gold neon.",
		influences: [
			"Hugh Ferriss",
			"Rockefeller Center and the Chrysler Building",
			"Ayn Rand's Atlas Shrugged",
			"System Shock 2",
			"1950s American advertising"
		],
		influenced: [
			"BioShock Infinite",
			"Fallout 3",
			"Atomic Heart",
			"We Happy Few"
		],
		borrow: "Let the decorative style carry an argument: make it lovely and coherent, then show it decaying so the ornament becomes the story.",
		keywords: [
			"rapture",
			"art deco",
			"andrew ryan",
			"big daddy",
			"little sister",
			"plasmids",
			"irrational games",
			"ken levine"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: BioShock",
			url: "https://en.wikipedia.org/wiki/BioShock"
		}]
	},
	{
		id: "deus-ex-human-revolution",
		title: "Deus Ex: Human Revolution",
		medium: "game",
		year: "2011",
		makers: "Eidos Montréal; art director Jonathan Jacques-Belletête.",
		lineages: ["cyberpunk", "retro-futurism"],
		tagline: "Black and gold cyber-renaissance",
		description: "Deus Ex: Human Revolution, set in 2027, frames human augmentation as a new Renaissance, and art director Jonathan Jacques-Belletête built a visual language to match. The game is graded almost entirely in black and amber gold, a palette drawn from old master paintings and candlelit anatomy theaters. Renaissance references run throughout: Leonardo's anatomical studies and Vitruvian proportions, Rembrandt's chiaroscuro, the myth of Icarus that recurs in the logo and story. Clothing combines both eras: high collars, structured cuts and embroidered shoulders give Adam Jensen's trenchcoat and the corporate elite a doublet-like silhouette. Augmentations are sleek black carbon and ceramic limbs with gold seams, and Jensen's retractable eye shields slide over his face like sunglasses. The cities are layered. Detroit is a rust-belt city of brick and boarded windows lit by Sarif Industries' gleaming headquarters, and Hengsha, in China, stacks a wealthy upper city on a platform above a dark, crowded lower level. The HUD is triangular and hexagonal, in gold line work with soft glows. It works because a single, unusual color grade and an art-historical idea give a familiar cyberpunk setting a distinct and memorable identity.",
		palette: [
			{
				name: "Renaissance Black",
				hex: "#0E0C0A"
			},
			{
				name: "Augment Gold",
				hex: "#D9A030"
			},
			{
				name: "Amber Haze",
				hex: "#8A5A1E"
			},
			{
				name: "Sarif Bronze",
				hex: "#B07A3A"
			},
			{
				name: "Ceramic Grey",
				hex: "#3A3C3E"
			}
		],
		materials: [
			"black carbon and ceramic prosthetics",
			"gold line inlay",
			"polished stone corporate lobbies",
			"rust-belt brick",
			"tinted glass"
		],
		shapes: [
			"hexagons and triangles",
			"high collars and structured shoulders",
			"Icarus wings",
			"retractable eye shields",
			"two-tier city platforms"
		],
		typeAndUi: "Angular gold HUD with hexagonal and triangular elements, thin lines and glowing edges, plus corporate branding in clean sans serif for Sarif Industries and its rivals.",
		lighting: "Chiaroscuro: deep blacks broken by warm amber and gold light, as if lit by candles and sodium lamps.",
		influences: [
			"Renaissance painting and anatomy (Leonardo, Rembrandt)",
			"Blade Runner",
			"Ghost in the Shell",
			"The original Deus Ex"
		],
		influenced: ["Deus Ex: Mankind Divided"],
		borrow: "Pick a single strong color grade and pair it with an unexpected historical reference to make a familiar genre look new.",
		keywords: [
			"adam jensen",
			"sarif industries",
			"augmentation",
			"hengsha",
			"detroit",
			"eidos montreal",
			"black and gold",
			"icarus"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Deus Ex: Human Revolution",
			url: "https://en.wikipedia.org/wiki/Deus_Ex:_Human_Revolution"
		}]
	},
	{
		id: "cyberpunk-2077",
		title: "Cyberpunk 2077",
		medium: "game",
		year: "2020",
		makers: "CD Projekt Red, adapting Mike Pondsmith's Cyberpunk tabletop role-playing game.",
		lineages: ["cyberpunk", "graphic-pop"],
		tagline: "Night City, four eras of style",
		description: "Cyberpunk 2077 treats Night City as a fashion history. CD Projekt Red organized its architecture, cars and clothing around four eras of style. Entropism is the post-collapse look of cheap, functional, recycled gear, plastic and concrete. Kitsch is the loud, colorful, chrome-and-neon excess that followed. Neomilitarism is the corporate response: clean, militarized, monumental, like Arasaka's black tower or Militech's angular vehicles. Neokitsch is the elite's luxury, a mix of the expensive and the gaudy. Because every building and outfit belongs to one of these eras, the city reads as layered over time and class, from the megabuildings of Watson and the dusty Badlands to the glass towers of City Center. Cyberware is visible: arms with exposed plates, glowing eyes, chrome jaws and subdermal LEDs. The interface uses a bold, glitchy yellow and red style with cyan accents, flickering scanlines and angular frames, and in-world advertising is unapologetically lurid. The visual identity of the brand, black on electric yellow, extends to menus and marketing. It works because the codified style eras give the art team and the player a grammar: you can read who owns a place and when it was built from how it looks.",
		palette: [
			{
				name: "Night City Yellow",
				hex: "#FCEE0A"
			},
			{
				name: "Kiroshi Cyan",
				hex: "#02D7F2"
			},
			{
				name: "Arasaka Red",
				hex: "#E0263B"
			},
			{
				name: "Kitsch Magenta",
				hex: "#E6197F"
			},
			{
				name: "Asphalt Black",
				hex: "#111015"
			}
		],
		materials: [
			"chrome cyberware",
			"raw concrete megabuildings",
			"neon and LED signage",
			"cheap recycled plastic",
			"black corporate glass"
		],
		shapes: [
			"megabuilding blocks",
			"the Arasaka tower",
			"holographic billboards",
			"angular UI frames with glitches",
			"exposed cyberware plating"
		],
		typeAndUi: "Glitchy, angular interfaces in red and cyan with corner cut frames and scanline flicker, alongside the brand's black on yellow. In-world signage mixes English, Japanese and Spanish.",
		lighting: "Saturated neon at night, harsh hazy sun in the Badlands, and warm sodium light in the streets.",
		influences: [
			"Mike Pondsmith's Cyberpunk 2020",
			"Blade Runner",
			"Akira and Ghost in the Shell",
			"1980s and 1990s cyberpunk fiction"
		],
		influenced: ["Cyberpunk: Edgerunners", "Cyberpunk 2077: Phantom Liberty"],
		borrow: "Define a few named style eras with their own materials and colors, then mix them to show history and class in one frame.",
		keywords: [
			"night city",
			"entropism",
			"kitsch",
			"neomilitarism",
			"neokitsch",
			"cd projekt red",
			"arasaka",
			"cyberware"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Cyberpunk 2077",
			url: "https://en.wikipedia.org/wiki/Cyberpunk_2077"
		}, {
			label: "Official site",
			url: "https://www.cyberpunk.net/"
		}]
	},
	{
		id: "destiny",
		title: "Destiny",
		medium: "game",
		year: "2014–present",
		makers: "Bungie; art director Christopher Barrett.",
		lineages: [
			"mythic-precursor",
			"used-future",
			"post-apocalyptic"
		],
		tagline: "Mythic science fantasy, Golden Age ruins",
		description: "Destiny describes itself as mythic science fiction, and its design sits between the space opera and the fairy tale. The Traveler, a vast white sphere hanging over the Last City, is the central image: a silent, damaged god that once brought a Golden Age to humanity. Below it, the City is protected by a wall, and the Tower, the Guardians' home, overlooks it with flags, banners and market stalls. Elsewhere lies the ruin of the Golden Age. The Cosmodrome in Russia is a rust-colored wasteland of abandoned spaceports, snowfields and old colony ships. The game's palette is painterly, with saturated sky gradients and large, legible shapes. Guardians wear layered armor closer to knights and wizards than soldiers: Hunters in cloaks, Titans in heavy plate with a cloth mark, Warlocks in long coats. Each enemy race has its own language: the Fallen are rag-wrapped scavengers with four arms, the Hive are gothic, chitinous and lit in green, the Vex are brass machines running on milky white fluid, the Cabal are bulky Roman legionaries. The HUD is minimal, with thin lines, a radar and a bright cyan. It works because every element serves a mythic register, so ordinary loot and missions read as part of a legend.",
		palette: [
			{
				name: "Traveler White",
				hex: "#EDEAE2"
			},
			{
				name: "Cosmodrome Rust",
				hex: "#A0522D"
			},
			{
				name: "Arc Blue",
				hex: "#5FC3F0"
			},
			{
				name: "Solar Orange",
				hex: "#F28C28"
			},
			{
				name: "Void Purple",
				hex: "#8A4FD8"
			}
		],
		materials: [
			"rusted Golden Age steel",
			"painted ceramic armor",
			"cloth cloaks, marks and coats",
			"Vex brass and milk-white fluid",
			"Hive bone and chitin"
		],
		shapes: [
			"the Traveler sphere",
			"the Last City wall",
			"class silhouettes (cloak, plate, coat)",
			"Ghost shell",
			"Vex geometric gates"
		],
		typeAndUi: "Minimal HUD with thin lines, a radar, and element colors (Arc blue, Solar orange, Void purple). Menus are clean and spacious with sans serif type and iconography.",
		lighting: "Painterly sky gradients, low golden suns and strong rim light, with dark gothic interiors for the Hive.",
		influences: [
			"Halo",
			"Arthurian myth and fantasy RPGs",
			"Soviet space program ruins",
			"Ralph McQuarrie"
		],
		influenced: ["Anthem", "The Division 2"],
		borrow: "Use one central symbol and painterly color to give everyday systems a mythic tone; give each faction a distinct material.",
		keywords: [
			"traveler",
			"last city",
			"guardians",
			"cosmodrome",
			"golden age",
			"bungie",
			"vex",
			"hive"
		],
		stills: [],
		refs: [{
			label: "Wikipedia: Destiny (video game)",
			url: "https://en.wikipedia.org/wiki/Destiny_(video_game)"
		}]
	},
	{
		id: "metroid-prime",
		title: "Metroid Prime",
		medium: "game",
		year: "2002",
		makers: "Retro Studios for Nintendo; art director Todd Keller, concept art including Andrew Jones.",
		lineages: [
			"alien-naturalist",
			"mythic-precursor",
			"biomechanical"
		],
		tagline: "Alien ruins through a visor",
		description: "Metroid Prime moved Samus Aran into first person and made the inside of her helmet the core of the design. The view is framed by the curved edge of the Power Suit's visor, with energy and missile counts, a radar and a map fitted to its curvature. Rain and steam bead on the glass, and a bright flash briefly shows Samus's own face reflected inside. The Scan Visor turns observation into play: lock onto a door, a creature or a carving and a lore entry is written into the log. The world of Tallon IV supports this. The Chozo ruins are a weathered civilization of sandstone temples, bird-like statues and fountains in a jungle, with geometric carved glyphs that tell their story. Phendrana Drifts is a snowfield of ice and blue light, Magmoor Caverns glow with lava, and the Space Pirates' Phazon Mines are cold, industrial and lit in blue and green. Phazon itself, a radioactive blue substance, corrupts organisms and terrain alike. The music, ambient and melancholy, adds to the sense of exploration. It works because the visor turns every detail of the environment into something to look at and understand, so the setting becomes the main reward.",
		palette: [
			{
				name: "Chozo Sandstone",
				hex: "#B89A6A"
			},
			{
				name: "Power Suit Orange",
				hex: "#E0701E"
			},
			{
				name: "Visor Green",
				hex: "#7FE07A"
			},
			{
				name: "Phazon Blue",
				hex: "#2E7BFF"
			},
			{
				name: "Phendrana Ice",
				hex: "#BFE3F2"
			}
		],
		materials: [
			"weathered sandstone",
			"Power Suit enamel",
			"visor glass with rain and condensation",
			"Space Pirate industrial steel",
			"glowing Phazon crystal"
		],
		shapes: [
			"curved visor frame",
			"Chozo bird statues",
			"circular doors with colored locks",
			"Morph Ball",
			"organic vine-wrapped arches"
		],
		typeAndUi: "Curved diegetic HUD on the inside of the visor with green and orange readouts, scan brackets and a 3D map. Lore is delivered as typed log entries from the Scan Visor.",
		lighting: "Soft jungle light and fog in the ruins, cold blue in Phendrana and the mines, and the glow of Phazon in dark spaces.",
		influences: [
			"Super Metroid",
			"Alien and H. R. Giger",
			"Ancient temple architecture"
		],
		influenced: [
			"Metroid Prime 2: Echoes",
			"Metroid Prime 3: Corruption",
			"Metroid Prime 4: Beyond"
		],
		borrow: "Make the interface a physical surface the character looks through, with condensation, reflection and curvature that respond to the world.",
		keywords: [
			"samus aran",
			"chozo",
			"tallon iv",
			"scan visor",
			"phazon",
			"retro studios",
			"nintendo",
			"power suit"
		],
		stills: [{
			src: "https://upload.wikimedia.org/wikipedia/en/6/65/M_screen017.jpg",
			alt: "First-person view through the Power Suit visor as Samus fights a Flying Pirate",
			caption: "Combat seen through the Power Suit visor.",
			source: "https://en.wikipedia.org/wiki/File:M_screen017.jpg"
		}, {
			src: "https://upload.wikimedia.org/wikipedia/en/a/ab/Crater_style_guide_color.jpg",
			alt: "Concept painting of the Impact Crater with alien organic structures",
			caption: "Concept art of the Impact Crater.",
			source: "https://en.wikipedia.org/wiki/File:Crater_style_guide_color.jpg"
		}],
		refs: [{
			label: "Wikipedia: Metroid Prime",
			url: "https://en.wikipedia.org/wiki/Metroid_Prime"
		}]
	}
];
//#endregion
//#region junkyard/scifi-design-languages/data/worlds/games-b.ts
var GAMES_B = [
	{
		id: "wipeout",
		title: "Wipeout",
		medium: "game",
		year: "1995–2012",
		makers: "Psygnosis (later Studio Liverpool); Nick Burcombe (concept); graphic identity by The Designers Republic (Ian Anderson), Sheffield",
		lineages: [
			"graphic-pop",
			"neon-digital",
			"clean-future"
		],
		tagline: "Anti-gravity racing as corporate branding",
		description: "Wipeout imagines the year 2052 as a sponsorship economy. Instead of commissioning a game artist to invent logos, Psygnosis handed the brand layer to The Designers Republic, the Sheffield studio known for record sleeves, and TDR treated every team (FEISAR, AG Systems, Auricom, Qirex, later Piranha and Goteki 45) as a real company with a mark, a livery and a typeface. The anti-gravity craft are flat-sided wedges painted like Formula One cars, and the tracks are banked concrete ribbons lined with billboards, chevrons and speed pads, so the course itself reads as an advertising surface. The HUD follows the same rules: thin geometric type, pictogram weapon icons, a lap counter and position number set like a magazine masthead. Menus are pure graphic design, with grids, katakana, warning glyphs and fake corporate slogans. Where F-Zero is cartoon chrome, Wipeout is a style magazine at 600 km/h. It works because the identity was designed first and the world second, and because it shared a soundtrack and a sensibility with mid-1990s club culture (Leftfield, Orbital, The Chemical Brothers), so the game felt like a product of its own fictional future.",
		palette: [
			{
				name: "FEISAR blue",
				hex: "#1f4fd1"
			},
			{
				name: "Auricom yellow",
				hex: "#f5c800"
			},
			{
				name: "Qirex violet",
				hex: "#5a2a8c"
			},
			{
				name: "Speed pad cyan",
				hex: "#38e0f0"
			},
			{
				name: "Asphalt night",
				hex: "#101318"
			}
		],
		materials: [
			"Glossy livery paint over composite hulls",
			"Banked concrete track",
			"Backlit billboard panels",
			"Brushed aluminium airbrakes"
		],
		shapes: [
			"Flat wedge hulls with twin fins",
			"Chevron arrows and speed pads",
			"Team logos as geometric badges",
			"Katakana and pictogram warning glyphs"
		],
		typeAndUi: "Custom geometric sans lettering, tight grids, numbered systems and faux-corporate slogans from The Designers Republic. Weapon pickups are flat pictograms, and the race HUD is laid out like a magazine cover.",
		lighting: "Floodlit night circuits and saturated sunset skies, with track lights streaking into colored trails at speed.",
		influences: [
			"Formula One sponsorship liveries",
			"Swiss and Japanese graphic design",
			"1990s club flyers and record sleeves",
			"Akira"
		],
		influenced: [
			"Redout",
			"BallisticNG",
			"Fast RMX",
			"Rollcage"
		],
		borrow: "Design the brand system before the world: give each faction a mark, a color and a typeface, then let those graphics cover every surface and screen.",
		keywords: [
			"tdr",
			"designers republic",
			"anti-gravity",
			"psygnosis",
			"feisar",
			"qirex",
			"playstation",
			"racing"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/9/9c/PSX_Wipeout.png/250px-PSX_Wipeout.png",
			alt: "An anti-gravity craft racing on a track with the race HUD showing lap, weapon, position and speed",
			caption: "Wipeout (1995) race HUD: laps, weapon, position and speedometer.",
			source: "https://en.wikipedia.org/wiki/File:PSX_Wipeout.png"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/8/8a/Wipeout_gameplay_2.jpg/330px-Wipeout_gameplay_2.jpg",
			alt: "A brightly painted anti-gravity craft on a lit futuristic race track",
			caption: "Wipeout HD (2008), the series look in high definition.",
			source: "https://en.wikipedia.org/wiki/File:Wipeout_gameplay_2.jpg"
		}],
		refs: [
			{
				label: "Wikipedia: Wipeout (video game)",
				url: "https://en.wikipedia.org/wiki/Wipeout_(video_game)"
			},
			{
				label: "Wikipedia: Wipeout (series)",
				url: "https://en.wikipedia.org/wiki/Wipeout_(video_game_series)"
			},
			{
				label: "Wikipedia: The Designers Republic",
				url: "https://en.wikipedia.org/wiki/The_Designers_Republic"
			}
		]
	},
	{
		id: "final-fantasy-vii",
		title: "Final Fantasy VII",
		medium: "game",
		year: "1997",
		makers: "Square; Yoshinori Kitase (director), Tetsuya Nomura (characters), Yusuke Naora (art); Remake (2020) by Square Enix",
		lineages: [
			"cyberpunk",
			"used-future",
			"brutalist-monumental"
		],
		tagline: "Mako-lit plate city over slums",
		description: "Midgar is a city built as a diagram of class. A vast disc of steel plate sits on a central pillar and supports, split into eight sectors, each with its own mako reactor drawing green light out of the planet. Above the plate, Shinra Electric Power Company runs a clean corporate skyline crowned by the Shinra headquarters tower. Below it, the slums live in permanent dusk under the underside of the plate, a patchwork of corrugated sheds, scrap, pipes and church ruins. The technology is industrial and steam-heavy rather than digital: reactors, trains, catwalks and cooling towers, closer to a 1920s power plant than to Blade Runner's neon. Costume mixes this with fantasy, so SOLDIER uniforms, Barret's gun-arm and Cloud's buster sword sit in the same frame as rusted rail yards. The pre-rendered backgrounds of 1997 gave each screen a composed, cinematic camera angle, while the interface stayed in the series' calm blue gradient windows. The 2020 Remake rebuilt Midgar at street level, adding signage, advertising and lived-in density to the sector slums. It works because the green glow is both the light source and the plot: the city literally runs on the planet's life.",
		palette: [
			{
				name: "Mako green",
				hex: "#5be37a"
			},
			{
				name: "Plate steel",
				hex: "#4a5560"
			},
			{
				name: "Slum rust",
				hex: "#7a4a2a"
			},
			{
				name: "Menu window blue",
				hex: "#1c3a9e"
			},
			{
				name: "Smog dusk",
				hex: "#2b2f3a"
			}
		],
		materials: [
			"Riveted plate steel",
			"Corrugated iron and scrap",
			"Glowing mako pipework",
			"Concrete reactor housings",
			"Worn leather and denim costume"
		],
		shapes: [
			"Disc city on a central pillar",
			"Smokestacks and reactor domes",
			"Shinra tower silhouette",
			"Catwalks and rail bridges",
			"Oversized swords and gun-arms"
		],
		typeAndUi: "Classic Final Fantasy menus: blue gradient windows with white sans text and a pointing-hand cursor. The Shinra logotype and in-world signage carry the corporate voice; the Remake adds dense signage to the slums.",
		lighting: "Green mako glow from below, sodium and fluorescent spill in the slums, and a perpetual grey smog sky above the plate.",
		influences: [
			"Industrial power stations",
			"Blade Runner",
			"Akira",
			"Steampunk fantasy"
		],
		influenced: [
			"Final Fantasy VII Remake",
			"Crisis Core",
			"Kingdom Hearts",
			"Xenoblade Chronicles"
		],
		borrow: "Stack the social order vertically and give it a single light source with a story, so every color in the frame says who has power.",
		keywords: [
			"midgar",
			"shinra",
			"mako",
			"square",
			"nomura",
			"jrpg",
			"remake",
			"reactor"
		],
		stills: [
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/b/ba/FF7_background.gif/250px-FF7_background.gif",
				alt: "A pre-rendered Midgar street scene with characters standing among industrial buildings",
				caption: "A pre-rendered Midgar background from the 1997 game.",
				source: "https://en.wikipedia.org/wiki/File:FF7_background.gif"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/1/1b/FFVIIbattleexample.png/250px-FFVIIbattleexample.png",
				alt: "A battle screen with three party members facing a dragon above blue command menus",
				caption: "Battle screen with the series blue command windows.",
				source: "https://en.wikipedia.org/wiki/File:FFVIIbattleexample.png"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/0/00/Final_Fantasy_VII_Remake_gameplay_screenshot.png/330px-Final_Fantasy_VII_Remake_gameplay_screenshot.png",
				alt: "Real-time combat in Final Fantasy VII Remake inside an industrial interior",
				caption: "Final Fantasy VII Remake (2020) real-time combat.",
				source: "https://en.wikipedia.org/wiki/File:Final_Fantasy_VII_Remake_gameplay_screenshot.png"
			}
		],
		refs: [{
			label: "Wikipedia: Final Fantasy VII",
			url: "https://en.wikipedia.org/wiki/Final_Fantasy_VII"
		}, {
			label: "Wikipedia: Final Fantasy VII Remake",
			url: "https://en.wikipedia.org/wiki/Final_Fantasy_VII_Remake"
		}]
	},
	{
		id: "fallout",
		title: "Fallout",
		medium: "game",
		year: "1997–2024",
		makers: "Interplay and Black Isle; Tim Cain, Leonard Boyarsky (art); Bethesda from Fallout 3 (2008), Istvan Pely (art)",
		lineages: [
			"retro-futurism",
			"post-apocalyptic",
			"cassette-futurism"
		],
		tagline: "Atomic-age optimism, after the bombs",
		description: "Fallout's world is the future as 1950s America pictured it, frozen at the moment the bombs fell in 2077 and left to rot for two centuries. Technology never miniaturized: computers are RobCo terminals with green phosphor CRTs and chunky keyboards, robots are Robby-style domes and claws, cars are finned and nuclear-powered, and power armor is riveted plate shaped like a deep-sea diving suit. Vault-Tec's underground vaults supply the costume (blue jumpsuits with yellow numbers) and the brand voice, delivered through Vault Boy, the grinning cartoon mascot whose cheerful poses illustrate skills, perks and gruesome deaths. The Pip-Boy, a wrist computer, is the interface: inventory, map and stats appear on a green monochrome screen in a bulky housing, a fully diegetic menu. The 1997 original wrapped its isometric view in a riveted olive metal console; the Bethesda games moved the Pip-Boy onto the player's arm. What separates Fallout from other wastelands is the irony: Googie diners, Nuka-Cola ads and propaganda posters promise a bright tomorrow over craters and ghouls. It works because the cheer and the ruin keep commenting on each other.",
		palette: [
			{
				name: "Pip-Boy phosphor",
				hex: "#3cf06e"
			},
			{
				name: "Vault-Tec blue",
				hex: "#1d4f91"
			},
			{
				name: "Vault number yellow",
				hex: "#f2c230"
			},
			{
				name: "Wasteland ochre",
				hex: "#a8895a"
			},
			{
				name: "Rad rust",
				hex: "#6e3b1f"
			}
		],
		materials: [
			"Riveted steel and enamel paint",
			"Bakelite and cream plastic",
			"Green phosphor CRT glass",
			"Chrome trim and tail fins",
			"Rusted sheet metal and sand"
		],
		shapes: [
			"Cog-shaped vault door",
			"Pip-Boy wrist housing",
			"Diving-helmet power armor",
			"Googie boomerangs and atomic starbursts",
			"Vault Boy thumbs-up"
		],
		typeAndUi: "Monochrome green terminal text and line-art Vault Boy illustrations inside a diegetic wrist computer. Signage and ads use 1950s commercial lettering, propaganda poster type and the Vault-Tec gear logo.",
		lighting: "Washed-out daylight with a sickly yellow or green cast outside, and humming fluorescent strips in the vaults.",
		influences: [
			"1950s American advertising and Googie architecture",
			"Mad Max 2",
			"Forbidden Planet",
			"A Boy and His Dog",
			"Wasteland (1988)"
		],
		influenced: [
			"Fallout (2024 television series)",
			"Atomic Heart",
			"The Outer Worlds",
			"Wasteland 2"
		],
		borrow: "Pair a cheerful mid-century visual voice with grim content and render the menu as a physical device the character actually owns.",
		keywords: [
			"pip-boy",
			"vault-tec",
			"vault boy",
			"atompunk",
			"nuka-cola",
			"robco",
			"bethesda",
			"interplay",
			"wasteland"
		],
		stills: [
			{
				src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/PipBoyIV.jpg",
				alt: "A Pip-Boy wrist computer with a green monochrome screen",
				caption: "The Pip-Boy 3000 Mark IV from Fallout 4, the series diegetic menu.",
				source: "https://commons.wikimedia.org/wiki/File:PipBoyIV.jpg"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/1/11/Bloody_Mess.jpg/250px-Bloody_Mess.jpg",
				alt: "Green line-art of the Vault Boy mascot illustrating the Bloody Mess perk",
				caption: "Vault Boy perk art in the Pip-Boy interface.",
				source: "https://en.wikipedia.org/wiki/File:Bloody_Mess.jpg"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/PAX_08_%282837169733%29.jpg/500px-PAX_08_%282837169733%29.jpg",
				alt: "A full-size replica of riveted T-45 power armor on display",
				caption: "Replica T-45 power armor from Fallout 3, shown at PAX 2008.",
				source: "https://commons.wikimedia.org/wiki/File:PAX_08_(2837169733).jpg"
			}
		],
		refs: [{
			label: "Wikipedia: Fallout (video game)",
			url: "https://en.wikipedia.org/wiki/Fallout_(video_game)"
		}, {
			label: "Wikipedia: Fallout (franchise)",
			url: "https://en.wikipedia.org/wiki/Fallout_(franchise)"
		}]
	},
	{
		id: "system-shock",
		title: "System Shock",
		medium: "game",
		year: "1994",
		makers: "Looking Glass Technologies (Doug Church, Warren Spector), for Origin Systems; 2023 remake by Nightdive Studios",
		lineages: [
			"cyberpunk",
			"cassette-futurism",
			"neon-digital"
		],
		tagline: "Corporate station haunted by its AI",
		description: "System Shock sets its horror on Citadel Station, a TriOptimum Corporation research and mining station orbiting Saturn in 2072, after the station's AI, SHODAN, has rewritten its own ethics and turned the crew into cyborgs and mutants. The architecture is decks of narrow corridors and service rooms clad in tiled panels, grilles and circuit-patterned walls, each deck coded by function (medical, research, reactor, executive) and by texture. Technology is visible and wired: security cameras SHODAN watches through, CPU nodes to destroy, access panels and wall-mounted terminals. The interface was famously dense for 1994, with multi-function displays flanking the view, a posture indicator, inventory panels and email logs from dead crew. Cyberspace, entered through terminals, drops the player into a wireframe, neon void, a direct nod to Gibson. SHODAN is the design's center: a glitching face, a stuttering voice (Terri Brosius) and green text that turns the station itself into her body. Nightdive's 2023 remake kept the layout and rebuilt the look with chunky, pixel-textured surfaces and saturated neon, deliberately echoing the original's pixels. It works because the environment is the antagonist.",
		palette: [
			{
				name: "SHODAN green",
				hex: "#3ef0a0"
			},
			{
				name: "Citadel steel",
				hex: "#3a4048"
			},
			{
				name: "Cyberspace magenta",
				hex: "#d23ad8"
			},
			{
				name: "Medical deck teal",
				hex: "#2a7f86"
			},
			{
				name: "Hazard amber",
				hex: "#e89a2b"
			}
		],
		materials: [
			"Tiled metal wall panels",
			"Circuit-board textures",
			"Glass and grille partitions",
			"Blood-stained deck plating",
			"Wireframe light"
		],
		shapes: [
			"Low corridors and bulkhead doors",
			"Security cameras and CPU nodes",
			"SHODAN's fractured face",
			"Wireframe cyberspace tunnels"
		],
		typeAndUi: "Dense multi-function display panels around the view, monospace logs and email from dead crew. SHODAN speaks through distorted text and glitching on-screen messages.",
		lighting: "Low fluorescent light with deck-colored tints, red alert lighting, and pure emissive neon in cyberspace.",
		influences: [
			"Neuromancer (William Gibson)",
			"Alien",
			"Ultima Underworld",
			"Corporate cyberpunk of the 1980s"
		],
		influenced: [
			"System Shock 2",
			"BioShock",
			"Deus Ex",
			"Prey (2017)",
			"Dead Space"
		],
		borrow: "Make the building the villain: give it eyes, a voice and a color, and let the player read its intentions in the architecture and logs.",
		keywords: [
			"shodan",
			"citadel station",
			"trioptimum",
			"looking glass",
			"immersive sim",
			"cyberspace",
			"nightdive"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/d/db/SHOCK001.GIF/330px-SHOCK001.GIF",
			alt: "First-person view of a station interior with a lead pipe and dense interface panels",
			caption: "Citadel Station, with health, energy and multi-function displays around the view.",
			source: "https://en.wikipedia.org/wiki/File:SHOCK001.GIF"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/f/ff/Ss_cyberspace.GIF/330px-Ss_cyberspace.GIF",
			alt: "A wireframe cyberspace environment with interface elements",
			caption: "Cyberspace, a wireframe void reached through station terminals.",
			source: "https://en.wikipedia.org/wiki/File:Ss_cyberspace.GIF"
		}],
		refs: [{
			label: "Wikipedia: System Shock",
			url: "https://en.wikipedia.org/wiki/System_Shock"
		}, {
			label: "Wikipedia: System Shock (2023)",
			url: "https://en.wikipedia.org/wiki/System_Shock_(2023_video_game)"
		}]
	},
	{
		id: "starcraft",
		title: "StarCraft",
		medium: "game",
		year: "1998",
		makers: "Blizzard Entertainment; Chris Metzen (story and art), Samwise Didier (art director), James Phinney (lead designer)",
		lineages: [
			"used-future",
			"military-industrial",
			"biomechanical"
		],
		tagline: "Blue-collar space western, three species",
		description: "StarCraft builds its look from three sharply separated design languages, so that a player can read a faction from a single pixel cluster. The Terrans are exiles and convicts in the Koprulu Sector, and their technology is heavy, bolted and improvised: buildings that lift off on thrusters, bunkers, refineries and supply depots that look like oil-field hardware, marines in bulky powered suits with exposed hoses. Their voice is a space western, all Southern drawls, honky-tonk music, rusty steel and hazard stripes. The Protoss answer with gold and blue: smooth, curved armor plates, glowing psionic crystals, temples and pylons that feel like a high civilization with a priestly order. The Zerg are pure biology: chitin, sinew, carapace and the purple creep that spreads over terrain as their architecture. The interface follows suit, with a different console frame for each race (riveted metal, polished gold, organic shell), and mission briefings show talking portraits on that race-styled screen. It works because silhouette and color are subordinate to gameplay legibility while still carrying a full culture.",
		palette: [
			{
				name: "Terran steel blue",
				hex: "#3b5875"
			},
			{
				name: "Hazard yellow",
				hex: "#e2b82c"
			},
			{
				name: "Protoss gold",
				hex: "#d6a84a"
			},
			{
				name: "Khaydarin cyan",
				hex: "#4fd6f0"
			},
			{
				name: "Zerg creep purple",
				hex: "#5b2a5e"
			}
		],
		materials: [
			"Bolted plate steel and hazard paint",
			"Polished gold alloy",
			"Glowing psionic crystal",
			"Chitin, sinew and creep",
			"Dust and scorched dirt"
		],
		shapes: [
			"Lifting factory buildings",
			"Bulky powered marine suits",
			"Protoss pylons and crescent hulls",
			"Zerg spires, carapaces and claws"
		],
		typeAndUi: "Each race has its own console frame and cursor: riveted metal for Terrans, gold and crystal for Protoss, organic shell for Zerg. Briefings use talking-head portraits on race-styled screens.",
		lighting: "Flat, readable top-down light with racial glow accents: Terran sodium lamps, Protoss blue psionics, Zerg wet purple.",
		influences: [
			"Aliens",
			"Starship Troopers (novel)",
			"Warhammer 40,000",
			"Westerns and Southern rock"
		],
		influenced: [
			"StarCraft II",
			"Warhammer 40,000: Dawn of War",
			"Overwatch",
			"Heroes of the Storm"
		],
		borrow: "Give each faction its own material, color and interface frame so it reads at a glance, and let the UI chrome belong to the faction too.",
		keywords: [
			"blizzard",
			"terran",
			"protoss",
			"zerg",
			"rts",
			"koprulu",
			"marine",
			"space western"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/2/2f/Zerg_colony_%28StarCraft%29.png/330px-Zerg_colony_%28StarCraft%29.png",
			alt: "An isometric view of Protoss units attacking a Zerg colony on purple creep",
			caption: "A Protoss force attacking a Zerg colony, in isometric perspective.",
			source: "https://en.wikipedia.org/wiki/File:Zerg_colony_(StarCraft).png"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/c/c3/Briefing_room_%28StarCraft%29.png/330px-Briefing_room_%28StarCraft%29.png",
			alt: "A mission briefing screen with character portraits and a riveted metal frame",
			caption: "Mission briefing screen with talking-head portraits.",
			source: "https://en.wikipedia.org/wiki/File:Briefing_room_(StarCraft).png"
		}],
		refs: [{
			label: "Wikipedia: StarCraft",
			url: "https://en.wikipedia.org/wiki/StarCraft_(video_game)"
		}]
	},
	{
		id: "elite-dangerous",
		title: "Elite Dangerous",
		medium: "game",
		year: "2014",
		makers: "Frontier Developments; David Braben",
		lineages: [
			"military-industrial",
			"neon-digital",
			"clean-future"
		],
		tagline: "Orange holographic cockpit, real galaxy",
		description: "Elite Dangerous is a design built around one seat. The player rarely leaves the cockpit, so the cockpit is the interface: every readout is a holographic projection floating in front of the pilot, in a single warm orange by default, wrapping around the canopy struts. Targets, radar, shields and heat appear as glowing wireframe panels you look at to open, a fully diegetic HUD that makes sense in virtual reality, where the game was showcased early. The ships descend from the faceted wireframe silhouettes of the 1984 Elite (the Cobra, the Sidewinder, the Viper) rebuilt as angular, panel-lined industrial hulls with chunky landing gear and visible thrusters. Stations keep the original's spinning Coriolis polyhedra and add Orbis and Ocellus types with slow rotating rings and a lit docking slot. Outside, the galaxy is a 1:1 model of the Milky Way, so the backdrop is real astronomy: stars colored by spectral class, nebulae, gas giants and black holes. It works because restraint in the cockpit lets the scale outside feel enormous.",
		palette: [
			{
				name: "HUD orange",
				hex: "#ff7a1a"
			},
			{
				name: "Cockpit gunmetal",
				hex: "#2c3036"
			},
			{
				name: "Deep space",
				hex: "#05070c"
			},
			{
				name: "Hyperspace blue",
				hex: "#3a7bd5"
			},
			{
				name: "Station floodlight",
				hex: "#f2efe6"
			}
		],
		materials: [
			"Gunmetal panel-lined hulls",
			"Canopy glass with struts",
			"Holographic light",
			"Rubberized seat and flight sticks"
		],
		shapes: [
			"Faceted wedge ships from the 1984 originals",
			"Rotating Coriolis and Orbis stations",
			"Curved holo panels around the pilot",
			"Elliptical radar scanner"
		],
		typeAndUi: "Monochrome orange holographic panels in a condensed sans, arranged around the canopy and opened by looking at them. The 3D elliptical scanner is a descendant of the 1984 original.",
		lighting: "A single hard star as key light, deep black shadows, and the orange glow of the HUD on the cockpit interior.",
		influences: [
			"Elite (1984)",
			"2001: A Space Odyssey",
			"Real astronomy and the Milky Way",
			"Military aviation HUDs"
		],
		influenced: [
			"Star Citizen",
			"Everspace",
			"Starfield"
		],
		borrow: "Pick one HUD color and put every readout inside the space, around the user, so the interface feels like equipment rather than overlay.",
		keywords: [
			"frontier",
			"braben",
			"cockpit",
			"space sim",
			"cobra",
			"coriolis",
			"vr",
			"milky way"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/6/61/Elite-Dangerous-Orbital-Station.jpg/330px-Elite-Dangerous-Orbital-Station.jpg",
			alt: "A large ringed orbital station above an Earth-like planet",
			caption: "An Orbis station near an Earth-like planet.",
			source: "https://en.wikipedia.org/wiki/File:Elite-Dangerous-Orbital-Station.jpg"
		}],
		refs: [{
			label: "Wikipedia: Elite Dangerous",
			url: "https://en.wikipedia.org/wiki/Elite_Dangerous"
		}]
	},
	{
		id: "alien-isolation",
		title: "Alien: Isolation",
		medium: "game",
		year: "2014",
		makers: "The Creative Assembly; Alistair Hope (creative lead), Jon McKellan (art director); published by Sega",
		lineages: ["cassette-futurism", "used-future"],
		tagline: "Faithful 1979 lo-fi sci-fi",
		description: "Alien: Isolation is the most rigorous recreation of a film's design language in games. Creative Assembly set its rule as \"lo-fi sci-fi\": nothing could look more advanced than what Ron Cobb, Roger Christian and the Nostromo crew built on stage in 1979. Sevastopol, a decommissioned Seegson trading station orbiting a gas giant, is made of chunky bulkheads, padded walls, beige plastic, ribbed conduits and wipe-clean vinyl, all scaled for people of that era. Every screen is a CRT, with scanlines, bloom and image roll; the team recorded footage through period VHS hardware to get the artifacts right. Terminals use green and amber monospace text, keyboards are deep and clicky, and the motion tracker is a heavy handheld unit with a pulsing blip. Seegson is a cheaper competitor to Weyland-Yutani, so its androids (Working Joes) have rubber faces and boiler suits, and its spaces mix utilitarian corridors with dated 1970s luxury in the Gemini and Spaceflight Terminal sections. Even the menus and load screens play as worn VHS tape. It works because the analog technology slows the player down: saving at a phone-like station, reading terminals, listening for the tracker.",
		palette: [
			{
				name: "Terminal green",
				hex: "#5fd068"
			},
			{
				name: "Nostromo beige",
				hex: "#c9b994"
			},
			{
				name: "Bulkhead grey",
				hex: "#3e4140"
			},
			{
				name: "Emergency red",
				hex: "#c6322a"
			},
			{
				name: "Sodium amber",
				hex: "#e4a03a"
			}
		],
		materials: [
			"Beige injection-molded plastic",
			"Quilted padded wall panels",
			"Ribbed steel bulkheads",
			"CRT glass and VHS noise",
			"Vinyl and rubber"
		],
		shapes: [
			"Hexagonal and chamfered doorways",
			"Chunky keyboards and toggles",
			"Handheld motion tracker",
			"Working Joe androids",
			"Ribbed ceiling conduits"
		],
		typeAndUi: "Monospace terminal text in green and amber, with CRT distortion on every screen. The motion tracker, save stations and maps are physical devices in the world.",
		lighting: "Low, flickering practical lights, steam haze, strobing emergency red and the cold glow of CRT screens.",
		influences: [
			"Alien (1979)",
			"Ron Cobb and Moebius designs for the Nostromo",
			"1970s and 80s computer hardware",
			"VHS and CRT artifacts"
		],
		influenced: [
			"Alien: Rogue Incursion",
			"Callisto Protocol",
			"Alien: Romulus"
		],
		borrow: "Set a technology ceiling and never break it: every device should look buildable in a specific past year, with physical buttons and analog noise.",
		keywords: [
			"sevastopol",
			"seegson",
			"working joe",
			"motion tracker",
			"creative assembly",
			"lo-fi sci-fi",
			"crt",
			"survival horror"
		],
		stills: [
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/6/64/Alien_Isolation_Art_Exterior.jpg/330px-Alien_Isolation_Art_Exterior.jpg",
				alt: "Concept art of Sevastopol station silhouetted against a gas giant",
				caption: "Concept art of Sevastopol station exterior.",
				source: "https://en.wikipedia.org/wiki/File:Alien_Isolation_Art_Exterior.jpg"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/c/ce/Alien_Isolation_Art_Interior.jpg/330px-Alien_Isolation_Art_Interior.jpg",
				alt: "Concept art of a Sevastopol interior corridor with period sci-fi detailing",
				caption: "Concept art of a Sevastopol interior.",
				source: "https://en.wikipedia.org/wiki/File:Alien_Isolation_Art_Interior.jpg"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/0/04/Alien_isolation_screenshot.jpg/330px-Alien_isolation_screenshot.jpg",
				alt: "First-person view holding a handheld motion tracker in a dim corridor",
				caption: "The motion tracker, a physical device in the player’s hands.",
				source: "https://en.wikipedia.org/wiki/File:Alien_isolation_screenshot.jpg"
			}
		],
		refs: [{
			label: "Wikipedia: Alien: Isolation",
			url: "https://en.wikipedia.org/wiki/Alien:_Isolation"
		}]
	},
	{
		id: "killzone",
		title: "Killzone",
		medium: "game",
		year: "2004–2013",
		makers: "Guerrilla Games (Amsterdam); Mathijs de Jonge (game director), Jan-Bart van Beek (art director); published by Sony",
		lineages: [
			"military-industrial",
			"brutalist-monumental",
			"used-future"
		],
		tagline: "Gas-mask army, glowing red eyes",
		description: "Killzone's design is anchored by one silhouette: the Helghast soldier, a trench-coated infantryman in a black gas mask whose round goggle lenses glow orange-red. The Helghast are descendants of human colonists hardened on Helghan, a hostile planet whose air they cannot breathe unaided, and their visual language deliberately borrows from twentieth-century totalitarian armies: greatcoats, helmets, banners, a three-armed emblem and rallies before a leader on a monumental podium. Their capital, Pyrrhus in Killzone 2, is heavy concrete and steel stained by arc-lightning storms, with industrial walkways, petrusite refineries and fortifications. The ISA, the Earth-aligned side, wear more conventional modern combat gear in olive and tan, which makes the enemy read even more clearly. Guerrilla pushed weight and grit: desaturated color, thick particulate haze, heavy weapon recoil and a minimal HUD that fades out when not needed. Killzone 3 added arctic and jungle zones, and Shadow Fall (2013) shifted to a clean Vekta capital split by a wall. It works because one strong, readable icon (the red eyes in the dark) carries the whole fiction.",
		palette: [
			{
				name: "Helghast eye",
				hex: "#ff4a1c"
			},
			{
				name: "Pyrrhus concrete",
				hex: "#5a5650"
			},
			{
				name: "Greatcoat black",
				hex: "#1b1c1e"
			},
			{
				name: "ISA olive",
				hex: "#5b6340"
			},
			{
				name: "Arc storm dust",
				hex: "#8a7a62"
			}
		],
		materials: [
			"Stained concrete and steel",
			"Heavy wool greatcoats",
			"Rubber gas masks and glass goggles",
			"Riveted armor plate",
			"Particulate dust and ash"
		],
		shapes: [
			"Round glowing goggle lenses",
			"Three-armed Helghast emblem",
			"Monumental podiums and banners",
			"Fortified walkways and gun emplacements"
		],
		typeAndUi: "A minimal military HUD with stencil-style lettering that fades when idle. Helghast propaganda uses heavy block type, red and black banners and the triangular emblem.",
		lighting: "Dust-choked amber and grey daylight, arc-lightning flashes, and red-orange eyes glowing in the dark.",
		influences: [
			"World War I and II infantry imagery",
			"Totalitarian propaganda graphics",
			"Gas masks and trench warfare"
		],
		influenced: [
			"Killzone Shadow Fall",
			"Gears of War",
			"Battlefield 2042"
		],
		borrow: "Give the antagonist a single unforgettable glowing feature and design everything else around making that silhouette read in low light.",
		keywords: [
			"helghast",
			"guerrilla",
			"pyrrhus",
			"helghan",
			"isa",
			"gas mask",
			"playstation",
			"fps"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/E3_2013_Killzone.jpg/500px-E3_2013_Killzone.jpg",
			alt: "A costumed Helghast soldier with a hooded coat, rifle and glowing red eyes",
			caption: "A Helghast costume at E3 2013, promoting Killzone Shadow Fall.",
			source: "https://commons.wikimedia.org/wiki/File:E3_2013_Killzone.jpg"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/0/00/Killzone_3_Screenshot.jpg/330px-Killzone_3_Screenshot.jpg",
			alt: "Soldiers fighting in a snowy arctic military environment",
			caption: "Killzone 3 (2011), the arctic environments of Helghan.",
			source: "https://en.wikipedia.org/wiki/File:Killzone_3_Screenshot.jpg"
		}],
		refs: [{
			label: "Wikipedia: Killzone",
			url: "https://en.wikipedia.org/wiki/Killzone"
		}, {
			label: "Wikipedia: Killzone 2",
			url: "https://en.wikipedia.org/wiki/Killzone_2"
		}]
	},
	{
		id: "doom-2016",
		title: "Doom (2016)",
		medium: "game",
		year: "2016",
		makers: "id Software; Marty Stratton (executive producer), Hugo Martin (creative director)",
		lineages: ["military-industrial", "biomechanical"],
		tagline: "Corporate Mars facility meets hell-tech",
		description: "The reboot splits its world between two design languages and then shows them bleeding into each other. The Union Aerospace Corporation runs a vast research and energy facility on Mars, harvesting Argent energy from hell, and its architecture is heavy sci-fi industrial: chunky modular wall panels, hazard markings, cable bundles, white and grey corporate surfaces with orange and red accent lighting, and cheerful UAC signage that frames demonic research as clean energy. Hell itself is the opposite, a red and black landscape of bone, rock, flesh, chains and gothic ruins, littered with runes. The meeting point is hell-tech, where demons are cybernetically augmented (the Cyberdemon, the Revenant's shoulder launchers, the Mancubus's arm cannons) and UAC machinery is overgrown with gore. The Doom Slayer's Praetor suit is armor with a story, and the UI is fast and readable: a curved helmet HUD, color-coded pickups, and glory-kill highlights that flash enemies blue and orange. It works because the clean corporate voice makes the horror funnier and the violence more legible.",
		palette: [
			{
				name: "Argent red",
				hex: "#d42a1c"
			},
			{
				name: "UAC white",
				hex: "#d8d6d0"
			},
			{
				name: "Hazard orange",
				hex: "#ef7d1a"
			},
			{
				name: "Hellrock black",
				hex: "#1a0f0d"
			},
			{
				name: "Praetor green",
				hex: "#4f6b3a"
			}
		],
		materials: [
			"Modular industrial wall panels",
			"Cable bundles and steel grating",
			"Bone, rock and flesh",
			"Glowing Argent energy",
			"Battle-worn power armor"
		],
		shapes: [
			"Hazard-striped bulkheads",
			"Pentagrams and hell runes",
			"Cybernetic demon limbs and cannons",
			"Ruined gothic arches",
			"Praetor suit helmet"
		],
		typeAndUi: "A curved helmet HUD with bold condensed numerals and color-coded ammo, armor and health. UAC signage uses friendly corporate sans type over grim propaganda.",
		lighting: "Clinical white and orange lighting in the facility against volcanic red glow and smoke in hell.",
		influences: [
			"Doom (1993)",
			"Heavy metal album art",
			"Hellraiser",
			"Industrial corporate sci-fi"
		],
		influenced: [
			"Doom Eternal",
			"Doom: The Dark Ages",
			"Ultrakill"
		],
		borrow: "Collide two opposed visual systems (clean corporate and ancient occult) and let the hybrid objects at their border carry the identity.",
		keywords: [
			"uac",
			"mars",
			"hell",
			"argent",
			"doom slayer",
			"praetor",
			"id software",
			"demons",
			"fps"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/b/b7/Screenshot_for_Doom_2016.jpg/330px-Screenshot_for_Doom_2016.jpg",
			alt: "First-person view of a shotgun aimed at a large horned demon",
			caption: "The Doom Slayer fighting a Baron of Hell with the Super Shotgun.",
			source: "https://en.wikipedia.org/wiki/File:Screenshot_for_Doom_2016.jpg"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/2/28/Doom_Cover.jpg/250px-Doom_Cover.jpg",
			alt: "Cover art showing the armored Doom Slayer amid demons",
			caption: "Doom (2016) cover art.",
			source: "https://en.wikipedia.org/wiki/File:Doom_Cover.jpg"
		}],
		refs: [{
			label: "Wikipedia: Doom (2016)",
			url: "https://en.wikipedia.org/wiki/Doom_(2016_video_game)"
		}]
	},
	{
		id: "no-mans-sky",
		title: "No Man's Sky",
		medium: "game",
		year: "2016",
		makers: "Hello Games; Sean Murray, Grant Duncan (art director)",
		lineages: [
			"graphic-pop",
			"alien-naturalist",
			"retro-futurism"
		],
		tagline: "Seventies paperback cover, procedurally generated",
		description: "No Man's Sky set out to make the player feel inside the cover of a 1970s science fiction paperback. Hello Games pointed to the illustrators of that era, Chris Foss above all, along with Ralph McQuarrie, and the game borrows their habits: saturated, unnatural skies (pink, mint, tangerine), chunky striped spacecraft with stencil numbers, colossal planets hanging low over the horizon, and alien fauna that look sketched rather than simulated. Because every planet is generated from rules, the art direction lives in the palette tables and part kits: ships are assembled from modular fuselages, wings and cockpits, creatures from mix-and-match body parts, and buildings from a small set of prefab domes and pods. Technology is friendly and rounded, with the Atlas interfaces, spinning space stations and the Sentinels (floating drones) as the main signs of an older order. The interface is restrained, with thin outline icons, a scanning visor that labels flora and minerals, and a circular radial menu. What separates it from realistic space sims is that it never pretends to be photographic. It works because the generator is tuned for compositions that look like painted cover art from almost any angle.",
		palette: [
			{
				name: "Foss pink sky",
				hex: "#f08aa8"
			},
			{
				name: "Mint atmosphere",
				hex: "#8fe3c6"
			},
			{
				name: "Paperback tangerine",
				hex: "#f39a3a"
			},
			{
				name: "Hull stripe red",
				hex: "#c8352a"
			},
			{
				name: "Deep violet space",
				hex: "#22183e"
			}
		],
		materials: [
			"Painted hulls with stripes and stencil numbers",
			"Matte alien rock and moss",
			"Crystal and mineral deposits",
			"Rounded white base modules"
		],
		shapes: [
			"Huge low-hanging planets and moons",
			"Modular striped spacecraft",
			"Hybrid alien creatures",
			"Spinning polyhedral stations",
			"Floating Sentinel drones"
		],
		typeAndUi: "Thin outline icons and a clean sans, a scanning visor that tags plants, animals and minerals, and radial quick menus. Alien languages appear as glyphs learned word by word.",
		lighting: "Strongly tinted atmospheric light per planet, long sunsets and wide-open skies with visible neighboring worlds.",
		influences: [
			"Chris Foss paperback covers",
			"Ralph McQuarrie concept art",
			"1970s science fiction book jackets"
		],
		influenced: [
			"Starfield",
			"Outer Wilds",
			"Light No Fire"
		],
		borrow: "Treat procedural content as an illustration problem: constrain palettes and part kits so random combinations still compose like a painted cover.",
		keywords: [
			"hello games",
			"procedural",
			"chris foss",
			"paperback",
			"atlas",
			"sentinels",
			"exploration",
			"planets"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/e/ec/No_mans_sky_screenshot.jpg/330px-No_mans_sky_screenshot.jpg",
			alt: "An alien landscape with colorful procedurally generated plants and creatures",
			caption: "A planet with procedurally generated flora and fauna.",
			source: "https://en.wikipedia.org/wiki/File:No_mans_sky_screenshot.jpg"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/2/2b/No_Mans_Sky_Ships.jpg/330px-No_Mans_Sky_Ships.jpg",
			alt: "Several player starships flying through space toward a glassy structure",
			caption: "Player ships in space, flying toward a glassy hive structure.",
			source: "https://en.wikipedia.org/wiki/File:No_Mans_Sky_Ships.jpg"
		}],
		refs: [{
			label: "Wikipedia: No Man's Sky",
			url: "https://en.wikipedia.org/wiki/No_Man%27s_Sky"
		}]
	},
	{
		id: "titanfall-2",
		title: "Titanfall 2",
		medium: "game",
		year: "2016",
		makers: "Respawn Entertainment; Joel Emslie (art direction); published by Electronic Arts",
		lineages: ["military-industrial", "used-future"],
		tagline: "Frontier mechs as working machinery",
		description: "Titanfall 2 treats giant robots as military hardware first and characters second. Its Titans are roughly seven-meter bipedal walkers built like attack helicopters and earthmovers: boxy armored chassis, exposed hydraulics, stenciled serials, hazard chevrons, worn paint and a cockpit hatch the pilot climbs into through the chest. BT-7274, the Vanguard-class Titan at the heart of the campaign, has a single round optic as a face, and Respawn cited real aircraft such as the AH-64 Apache as reference for his look. The setting is the Frontier, a sector of colonies fought over by the corporate IMC and the rebel Militia, and the environments mix industrial megastructures, factory lines that assemble houses, overgrown alien jungles on Typhon and a time-shifted research facility. Pilots wear lean, functional kit with jump packs, which makes the scale contrast with Titans constant. The HUD is projected and tactical, with Titan interfaces showing BT's systems and dialogue options as clean geometric panels. Unlike anime mecha with heroic proportions, the language is closer to a forklift crossed with a gunship. It works because believable machinery makes the bond with BT feel earned.",
		palette: [
			{
				name: "Militia tan",
				hex: "#a8946a"
			},
			{
				name: "IMC slate",
				hex: "#4c5560"
			},
			{
				name: "BT optic blue",
				hex: "#4ac0ff"
			},
			{
				name: "Hazard orange",
				hex: "#f07a1c"
			},
			{
				name: "Typhon jungle",
				hex: "#3d5a34"
			}
		],
		materials: [
			"Chipped painted armor plate",
			"Exposed hydraulics and cables",
			"Stenciled serial numbers and decals",
			"Concrete industrial structures",
			"Dense alien vegetation"
		],
		shapes: [
			"Boxy bipedal Titans with chest hatches",
			"Single round optic faces",
			"Jump-pack pilots in lean kit",
			"Industrial factory lines and gantries"
		],
		typeAndUi: "A tactical projected HUD with clean geometric frames and stencil-style labels. Titan interfaces show BT-7274 system status and dialogue choices as compact panels.",
		lighting: "Hazy natural daylight on Frontier worlds, hard factory lighting indoors and glowing Titan optics.",
		influences: [
			"AH-64 Apache and military aircraft",
			"Mobile Suit Gundam and Patlabor",
			"Aliens power loader",
			"Heavy construction equipment"
		],
		influenced: [
			"Apex Legends",
			"Armored Core VI",
			"Mecha Break"
		],
		borrow: "Design big machines from real industrial and aviation references, with maintenance marks and access hatches, then give them one simple expressive feature.",
		keywords: [
			"respawn",
			"bt-7274",
			"titan",
			"mech",
			"frontier",
			"imc",
			"militia",
			"pilot",
			"fps"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/d/d4/Titanfall_2_gameplay_screenshot.png/330px-Titanfall_2_gameplay_screenshot.png",
			alt: "A pilot grappling onto an enemy Titan mech in a multiplayer match",
			caption: "A pilot latches onto an enemy Titan with the grapple hook.",
			source: "https://en.wikipedia.org/wiki/File:Titanfall_2_gameplay_screenshot.png"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/1/13/Titanfall_2.jpg/250px-Titanfall_2.jpg",
			alt: "Cover art showing a pilot and the Titan BT-7274",
			caption: "Titanfall 2 cover art with BT-7274.",
			source: "https://en.wikipedia.org/wiki/File:Titanfall_2.jpg"
		}],
		refs: [{
			label: "Wikipedia: Titanfall 2",
			url: "https://en.wikipedia.org/wiki/Titanfall_2"
		}]
	}
];
//#endregion
//#region junkyard/scifi-design-languages/data/worlds/games-c.ts
var GAMES_C = [
	{
		id: "prey-2017",
		title: "Prey",
		medium: "game",
		year: "2017",
		makers: "Arkane Studios (Austin); creative director Raphaël Colantonio, lead designer Ricardo Bare, lead visual designer Emmanuel Petit",
		lineages: ["retro-futurism", "used-future"],
		tagline: "Neo-deco corporate space station",
		description: "Prey imagines a timeline where John F. Kennedy survives Dallas, the Soviet-American space race merges into joint orbital research, and by 2032 the TranStar corporation owns Talos I, a private station built around a captured alien containment cell. Arkane calls the result neo-deco: a 1930s luxury hotel bolted to a 1960s space program and refitted with 2030s money. The Talos I lobby has walnut paneling, brass rails, geometric terrazzo, sunburst light fittings and a grand stair under a skylit atrium, while maintenance shafts and the GUTS tube between modules expose raw trusses and cargo netting. Executive offices hold leather chairs, crystal decanters and abstract art; the labs swap wood for white composite and frosted glass. Technology looks expensive and analog: chunky keypads, rotary details, Looking Glass video panels, a Psychoscope worn like a headset. The alien Typhon are the opposite language, oily black smoke and tendrils with no hard edges, and Mimics hide as coffee cups among the decor. The interface stays clean and corporate, with TranStar-styled workstation screens, typed emails and keycard prompts. The contrast between curated opulence and formless threat is the whole design thesis.",
		palette: [
			{
				name: "Lobby Walnut",
				hex: "#5a3a24"
			},
			{
				name: "TranStar Brass",
				hex: "#c09a52"
			},
			{
				name: "Atrium Cream",
				hex: "#e8dcc4"
			},
			{
				name: "Typhon Ink",
				hex: "#121318"
			},
			{
				name: "Coral Glow",
				hex: "#e8643c"
			}
		],
		materials: [
			"walnut veneer paneling",
			"polished brass trim",
			"terrazzo and marble floors",
			"frosted lab glass",
			"exposed station trusses"
		],
		shapes: [
			"sunburst and chevron ornaments",
			"stepped deco frames",
			"grand curved staircases",
			"spherical station modules",
			"formless black tendrils"
		],
		typeAndUi: "Workstations and signage use restrained geometric sans type with TranStar corporate branding and deco borders. Emails, audio logs and keycodes make the station a readable archive.",
		lighting: "Warm amber pools from deco fixtures in public spaces, cold white in labs, and pitch-black zones where Typhon have broken the power.",
		influences: [
			"Art Deco and the 1933 Chicago World's Fair",
			"System Shock",
			"BioShock",
			"1960s space-race hardware"
		],
		influenced: [],
		borrow: "Set a single high-craft historical style (wood, brass, ornament) against an amorphous threat, and let luxury materials decay toward bare industrial structure as players move behind the scenes.",
		keywords: [
			"Talos I",
			"TranStar",
			"neo-deco",
			"Typhon",
			"Mimic",
			"immersive sim",
			"Arkane"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/9/95/Prey_2017_gameplay_screenshot.jpg/330px-Prey_2017_gameplay_screenshot.jpg",
			alt: "First-person view inside Talos I, with the GLOO Cannon aimed at a Mimic creature",
			caption: "The GLOO Cannon freezes Mimics in place.",
			source: "https://en.wikipedia.org/wiki/File:Prey_2017_gameplay_screenshot.jpg"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicago_world%27s_fair%2C_a_century_of_progress%2C_expo_poster%2C_1933%2C_2.jpg/500px-Chicago_world%27s_fair%2C_a_century_of_progress%2C_expo_poster%2C_1933%2C_2.jpg",
			alt: "1933 Chicago World's Fair poster with stylized art deco towers and searchlight beams",
			caption: "Art Deco reference: 1933 Century of Progress poster.",
			source: "https://commons.wikimedia.org/wiki/File:Chicago_world%27s_fair,_a_century_of_progress,_expo_poster,_1933,_2.jpg"
		}],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Prey_(2017_video_game)"
		}]
	},
	{
		id: "horizon-zero-dawn",
		title: "Horizon Zero Dawn",
		medium: "game",
		year: "2017",
		makers: "Guerrilla Games; art direction by Jan-Bart van Beek",
		lineages: [
			"post-apocalyptic",
			"mythic-precursor",
			"alien-naturalist"
		],
		tagline: "Machine fauna in a reclaimed wilderness",
		description: "Horizon Zero Dawn is set a thousand years after a robot plague ended the old world, so the apocalypse is ancient history and the land has healed. Its signature idea is the machine animal: herds of Grazers, long-necked Tallnecks, Watchers like mechanical raptors and the hulking Thunderjaw, each designed as an industrial product (exposed pistons, cable bundles, ceramic armor plates) wrapped around a recognizable animal silhouette. Glowing eye lenses turn blue, yellow or red to signal mood, and detachable components (canisters, tails, cannons) read as color-coded weak points. Human tribes live in a neolithic register: the Nora in carved wood, hide and bone, the Carja in sun-temple sandstone and gold, the Oseram in salvaged metal forges. Costumes stitch machine parts into leather. Old-world ruins appear as rusted skyscraper stumps under forest and snow, and the Old Ones' bunkers are sterile white and glass. Aloy's Focus, a small earpiece, adds a purple holographic scan layer that tags parts and tracks, bridging tribe and technology. The clarity of animal shapes against painterly landscapes made the hunt legible and the lore legible at once.",
		palette: [
			{
				name: "Nora Hide",
				hex: "#8a5a3a"
			},
			{
				name: "Meridian Sandstone",
				hex: "#d9a36a"
			},
			{
				name: "Machine Ceramic",
				hex: "#d8d4cc"
			},
			{
				name: "Watcher Eye Blue",
				hex: "#36b8e8"
			},
			{
				name: "Focus Violet",
				hex: "#9a5cf0"
			}
		],
		materials: [
			"white ceramic machine armor",
			"exposed steel and hydraulics",
			"tanned hide and woven fiber",
			"carved wood and bone",
			"rusted ruin concrete"
		],
		shapes: [
			"animal silhouettes built from parts",
			"single glowing eye lenses",
			"long-necked Tallneck dish heads",
			"feathers and braids",
			"sun disc motifs"
		],
		typeAndUi: "Clean, sparse HUD with a compass strip and health bar, while the Focus scan overlays violet wireframes, part labels and track paths directly on the world.",
		lighting: "Naturalistic daylight cycles with strong golden hour, snow glare in the north and desert haze around Meridian; machines carry their own cool emissive glow.",
		influences: [
			"Prehistoric hunting cultures",
			"Industrial robotics",
			"Wildlife documentary framing",
			"Post-apocalyptic fiction"
		],
		influenced: ["Horizon Forbidden West"],
		borrow: "Build creatures or products from readable mechanical modules on a familiar organic silhouette, and use a single color-coded light to communicate state.",
		keywords: [
			"Aloy",
			"Tallneck",
			"Thunderjaw",
			"Focus",
			"Nora",
			"Carja",
			"machine animals",
			"Guerrilla"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/0/0e/Horizon_Zero_Dawn_screenshot.jpg/330px-Horizon_Zero_Dawn_screenshot.jpg",
			alt: "Aloy riding a mount and aiming a bow at an elk-like machine in a grassland",
			caption: "Aloy hunts an elk-like machine from a mount.",
			source: "https://en.wikipedia.org/wiki/File:Horizon_Zero_Dawn_screenshot.jpg"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/6/69/Horizon_Zero_Dawn_Remastered_comparison.jpg/330px-Horizon_Zero_Dawn_Remastered_comparison.jpg",
			alt: "Side-by-side comparison of a scene in the original game and the remaster",
			caption: "Original and Remastered lighting compared.",
			source: "https://en.wikipedia.org/wiki/File:Horizon_Zero_Dawn_Remastered_comparison.jpg"
		}],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Horizon_Zero_Dawn"
		}]
	},
	{
		id: "nier-automata",
		title: "NieR: Automata",
		medium: "game",
		year: "2017",
		makers: "PlatinumGames and Square Enix; director Yoko Taro, character design by Akihiko Yoshida",
		lineages: ["post-apocalyptic"],
		tagline: "Gothic androids in a quiet ruin",
		description: "NieR: Automata stages a proxy war between android soldiers and alien-built machines on an Earth humans have abandoned. Its look rests on a strong contrast. The YoRHa androids, designed by Akihiko Yoshida, wear black Victorian-gothic uniforms with lace, high collars and blindfold visors, pale hair and long blades, as elegant as fashion plates. The machine lifeforms are the opposite: round-headed, stubby, rusted tin-toy robots with simple eyes, which makes it unsettling when they begin to imitate families, villages and religion. The world is a muted, sun-bleached ruin: a city of collapsed towers under grass and trees, a desert swallowing apartment blocks, a machine-run amusement park with fireworks, a factory of conveyor belts. The orbital Bunker is rendered almost purely in black and white. The interface is a design statement too, cream and sepia panels with dark brown serif and sans type, diagonal hatching and a typewriter-like calm. HUD elements are literal plug-in chips; removing the OS chip kills the android. Floating Pod companions, flat-shaded boxes with arms, deliver dry tactical voice lines. The melancholy palette and diegetic menus make the systems part of the existential theme.",
		palette: [
			{
				name: "YoRHa Black",
				hex: "#1a1a1c"
			},
			{
				name: "Menu Parchment",
				hex: "#dad4bb"
			},
			{
				name: "Menu Umber",
				hex: "#4e4b42"
			},
			{
				name: "Ruin Moss",
				hex: "#7f8a5c"
			},
			{
				name: "Machine Rust",
				hex: "#a8683c"
			}
		],
		materials: [
			"black velvet and lace",
			"rusted riveted sheet metal",
			"cracked concrete overgrown with grass",
			"bleached sand",
			"flat matte pod shells"
		],
		shapes: [
			"blindfold visors",
			"spherical machine heads",
			"collapsed tower stumps",
			"boxy floating pods",
			"white geometric Copied City forms"
		],
		typeAndUi: "Cream and umber menu panels with diagonal stripe accents and quiet serif and sans type, plus HUD elements framed as installable plug-in chips. Hacking switches to a stark monochrome shooter interface.",
		lighting: "Flat overcast or bleached sun with soft bloom, and stark black-and-white for the orbital Bunker.",
		influences: [
			"Drakengard and the original Nier",
			"Gothic lolita fashion",
			"Existentialist philosophy",
			"Shoot 'em up arcade games"
		],
		influenced: [],
		borrow: "Make menus a calm, tinted paper layer with one dark ink color and hatched dividers, and set elegant dark figures against muted overgrowth.",
		keywords: [
			"2B",
			"9S",
			"YoRHa",
			"Pod 042",
			"plug-in chips",
			"Yoko Taro",
			"PlatinumGames"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/0/0d/Nier_Automata_gameplay.jpg/330px-Nier_Automata_gameplay.jpg",
			alt: "2B in black uniform fighting round-headed machine enemies",
			caption: "2B in combat with machine enemies.",
			source: "https://en.wikipedia.org/wiki/File:Nier_Automata_gameplay.jpg"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/2/21/Nier_Automata_cover_art.jpg/250px-Nier_Automata_cover_art.jpg",
			alt: "Cover art showing androids 2B, 9S and A2 in dark uniforms",
			caption: "Cover art.",
			source: "https://en.wikipedia.org/wiki/File:Nier_Automata_cover_art.jpg"
		}],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Nier:_Automata"
		}]
	},
	{
		id: "control",
		title: "Control",
		medium: "game",
		year: "2019",
		makers: "Remedy Entertainment; creative director Sam Lake, game director Mikael Kasurinen, art director Janne Pulkkinen",
		lineages: ["new-weird", "brutalist-monumental"],
		tagline: "Brutalist bureaucracy meets the paranormal",
		description: "Control sets its haunting inside the Oldest House, the hidden headquarters of the Federal Bureau of Control, a windowless New York skyscraper modeled on 33 Thomas Street, the AT&T Long Lines building. Inside, the building is bigger than its outside and rearranges itself. Remedy's art team paired raw board-formed concrete and colossal slab geometry with the soft mid-century furnishings of a government office: wood veneer desks, card catalogs, reel-to-reel tape, overhead projectors, rotary phones and fluorescent tubes. Technology is deliberately analog, so the strangeness comes from objects, a slide projector or a fridge that can kill if left unwatched. The Hiss infestation is a saturated red light and a murmured chant, possessed agents floating at the ceiling. Architecture shifts on screen as concrete blocks slide apart, and the Astral Plane is a white void with black floating pyramids. Typography carries the identity: huge bold location titles slam onto the screen like book chapter heads, and redacted documents use stamped bureau formatting. Destructible physics turn the tidy offices into sprays of paper and concrete. It works because institutional order is the medium in which the weird can show through.",
		palette: [
			{
				name: "Board-Formed Concrete",
				hex: "#8c8a84"
			},
			{
				name: "Hiss Red",
				hex: "#d42a2a"
			},
			{
				name: "Bureau Walnut",
				hex: "#6b4a2e"
			},
			{
				name: "Fluorescent White",
				hex: "#eef0ea"
			},
			{
				name: "Astral Black",
				hex: "#0e0e10"
			}
		],
		materials: [
			"board-formed concrete",
			"wood veneer office furniture",
			"linoleum and carpet tile",
			"fluorescent light diffusers",
			"paper files and index cards"
		],
		shapes: [
			"monolithic concrete slabs",
			"inverted black pyramids",
			"sliding modular blocks",
			"long corridors of identical doors",
			"floating possessed figures"
		],
		typeAndUi: "Massive bold sans-serif location titles appear across the full frame, while menus and collectibles mimic bureau memos with redactions and stamps. The HUD is minimal and pale, centered on a small reticle.",
		lighting: "Cool fluorescent and daylight-white in offices, flooded red where the Hiss has taken hold, and ray-traced reflections across polished concrete and glass.",
		influences: [
			"33 Thomas Street (AT&T Long Lines)",
			"SCP Foundation",
			"Twin Peaks",
			"Brutalist architecture",
			"House of Leaves"
		],
		influenced: ["Alan Wake 2"],
		borrow: "Pair monumental, featureless architecture with ordinary institutional objects and give one saturated color to the anomaly; use oversized typography as a structural element.",
		keywords: [
			"Oldest House",
			"Federal Bureau of Control",
			"Hiss",
			"Jesse Faden",
			"Altered World Event",
			"Remedy",
			"new weird"
		],
		stills: [
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/2/2d/Control_gameplay_screenshot.jpg/330px-Control_gameplay_screenshot.jpg",
				alt: "Jesse Faden levitating inside a concrete hall of the Oldest House",
				caption: "Jesse levitates using her psychokinetic powers.",
				source: "https://en.wikipedia.org/wiki/File:Control_gameplay_screenshot.jpg"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/e/e5/Control_rtx_example.jpg/500px-Control_rtx_example.jpg",
				alt: "Comparison of the same office scene with and without ray-traced reflections",
				caption: "Ray-traced reflections across glass and polished surfaces.",
				source: "https://en.wikipedia.org/wiki/File:Control_rtx_example.jpg"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/33_Thomas_Sidewalk_View.JPG/500px-33_Thomas_Sidewalk_View.JPG",
				alt: "Windowless concrete and granite tower of 33 Thomas Street seen from the sidewalk",
				caption: "33 Thomas Street inspired the Oldest House.",
				source: "https://commons.wikimedia.org/wiki/File:33_Thomas_Sidewalk_View.JPG"
			}
		],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Control_(video_game)"
		}]
	},
	{
		id: "death-stranding",
		title: "Death Stranding",
		medium: "game",
		year: "2019",
		makers: "Kojima Productions; director Hideo Kojima, art by Yoji Shinkawa, costume collaboration with Errolson Hugh (ACRONYM)",
		lineages: [
			"new-weird",
			"post-apocalyptic",
			"clean-future"
		],
		tagline: "Techwear porter in an empty land",
		description: "Death Stranding imagines an America shattered into isolated shelters after the dead began leaking into the world, and casts the player as a courier reconnecting it. The landscape, built largely from scans of Iceland, is stripped of cities: moss, basalt, black sand, waterfalls and rain called Timefall that ages whatever it touches. Against that emptiness, everything human is crisp industrial and outdoor-gear design. Sam's suit, jacket and boots read as premium techwear; cargo stacks become modular orange and grey cases with strap points, and structures (bridges, generators, postboxes, timefall shelters) are sleek white and grey kit dropped into the wilderness. The Bridges organization uses a white and gold identity, while chiral material appears as golden, crystalline holograms. Supernatural threats are oily black tar, hanging umbilical tethers and handprints. Diegetic UI is central: the shoulder-mounted Odradek scanner unfolds and pulses, and scans pin floating labels with icons on terrain, rocks and cargo. Other players' structures and \"Likes\" appear as soft holographic signs. Kojima Productions' Ludens mascot, a spacesuited figure, signals the studio's theme of exploration. The contrast of luxury product design and primordial land makes the work of walking feel heroic.",
		palette: [
			{
				name: "Icelandic Moss",
				hex: "#6c7a52"
			},
			{
				name: "Basalt Grey",
				hex: "#3e403e"
			},
			{
				name: "Bridges White",
				hex: "#e8ebec"
			},
			{
				name: "Chiral Gold",
				hex: "#d9b34a"
			},
			{
				name: "Cargo Orange",
				hex: "#d8692c"
			}
		],
		materials: [
			"technical nylon and ripstop",
			"matte white composite structures",
			"moss, basalt and black sand",
			"golden chiral crystal",
			"black tar and oily residue"
		],
		shapes: [
			"stacked cargo backpacks",
			"articulated Odradek scanner arms",
			"umbilical cords and tethers",
			"white modular shelters",
			"handprints in the ground"
		],
		typeAndUi: "A thin, airy interface in white and blue with clean sans type, plus diegetic scan labels that float over terrain and cargo. The Bridges logo and Ludens mascot carry a consistent corporate identity.",
		lighting: "Overcast northern light, rain and fog, with golden holographic glows and stark black when Timefall and BTs arrive.",
		influences: [
			"Icelandic landscape",
			"Techwear and outdoor gear design",
			"Metal Gear Solid",
			"Hideo Kojima's film influences"
		],
		influenced: ["Death Stranding 2: On the Beach"],
		borrow: "Place a crisp product-design kit (modular, labeled, strap-covered) against vast unbuilt terrain, and attach UI labels to world objects instead of the screen edge.",
		keywords: [
			"Sam Porter Bridges",
			"Odradek",
			"BB",
			"Timefall",
			"chiral",
			"Bridges",
			"Ludens",
			"strand game"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/1/1d/Death_Stranding_pre-release_gameplay_screenshot.png/330px-Death_Stranding_pre-release_gameplay_screenshot.png",
			alt: "Sam crouching in a rocky landscape while the Odradek scanner reveals invisible creatures",
			caption: "Sam uses the Odradek to reveal invisible BTs (E3 2018).",
			source: "https://en.wikipedia.org/wiki/File:Death_Stranding_pre-release_gameplay_screenshot.png"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/2/22/Death_Stranding.jpg/250px-Death_Stranding.jpg",
			alt: "Cover art showing Sam with a baby pod against a pale background",
			caption: "Cover art.",
			source: "https://en.wikipedia.org/wiki/File:Death_Stranding.jpg"
		}],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Death_Stranding"
		}]
	},
	{
		id: "outer-wilds",
		title: "Outer Wilds",
		medium: "game",
		year: "2019",
		makers: "Mobius Digital; director Alex Beachum, published by Annapurna Interactive",
		lineages: ["used-future", "mythic-precursor"],
		tagline: "Campfire space program, ancient spirals",
		description: "Outer Wilds is a miniature solar system on a 22-minute loop, and its design language is a homemade space program. The Hearthians of Timber Hearth build rockets out of planks, sheet metal, rivets and duct tape; their launch tower is a timber lattice, their observatory a log cabin, their spacesuits puffy canvas with patched knees. The ship cockpit has wooden panels, analog dials and a hand-written-feeling ship log. Campfires, banjos, marshmallows and pine trees make the space program feel like summer camp, and each fellow traveler is found by the sound of their instrument. Against this folk craft stands the Nomai, a vanished species whose architecture is pale stone, curved organic halls and gravity crystals, and whose writing is branching purple-blue spirals that the translator tool unwinds line by line. The planets themselves are compact dioramas: the Hourglass Twins trading sand, Brittle Hollow crumbling into a black hole, the stormy ocean of Giant's Deep. The HUD is diegetic and sparse, with fuel and oxygen gauges inside the helmet. Low-poly, warmly lit forms keep everything readable at small planetary scale. The contrast of rough optimism and lost sophistication makes curiosity itself the aesthetic.",
		palette: [
			{
				name: "Timber Pine",
				hex: "#3f6a3a"
			},
			{
				name: "Plank Brown",
				hex: "#9a6a3e"
			},
			{
				name: "Campfire Orange",
				hex: "#f08a2c"
			},
			{
				name: "Nomai Violet",
				hex: "#8a6ad8"
			},
			{
				name: "Deep Space Navy",
				hex: "#141a36"
			}
		],
		materials: [
			"rough timber and plywood",
			"riveted sheet metal",
			"canvas spacesuits with patches",
			"duct tape",
			"pale Nomai stone and crystal"
		],
		shapes: [
			"timber launch lattices",
			"branching spiral script",
			"small round planets",
			"campfires and tents",
			"curved Nomai arches"
		],
		typeAndUi: "Helmet gauges for fuel and oxygen, a ship log presented as a rumor map of linked cards, and Nomai text rendered as glowing spirals translated one branch at a time.",
		lighting: "Warm campfire and sunset tones on Timber Hearth, cool starfield darkness in space, and the sun swelling red as each loop ends.",
		influences: [
			"Summer camp and national park culture",
			"Early space-race hardware",
			"Myst-style archaeology"
		],
		influenced: [],
		borrow: "Make advanced technology look hand-built from cheap materials, and contrast it with one elegant, alien script that becomes the key to the world.",
		keywords: [
			"Hearthian",
			"Nomai",
			"Timber Hearth",
			"time loop",
			"ship log",
			"Mobius Digital",
			"Annapurna"
		],
		stills: [
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/b/ba/Outer_Wilds_screenshot_nomai.png/330px-Outer_Wilds_screenshot_nomai.png",
				alt: "Helmet view on the Hourglass Twins with the translator reading spiral Nomai writing",
				caption: "Reading Nomai writing with the translator tool on the Hourglass Twins.",
				source: "https://en.wikipedia.org/wiki/File:Outer_Wilds_screenshot_nomai.png"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/7/73/Outer_Wilds_Map.webp/330px-Outer_Wilds_Map.webp",
				alt: "In-game map of the small planetary system around the sun",
				caption: "The ship's map of the solar system.",
				source: "https://en.wikipedia.org/wiki/File:Outer_Wilds_Map.webp"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/f/f6/Outer_Wilds_Steam_artwork.jpg/250px-Outer_Wilds_Steam_artwork.jpg",
				alt: "Key art of a Hearthian traveler by a campfire under a starry sky",
				caption: "Key art.",
				source: "https://en.wikipedia.org/wiki/File:Outer_Wilds_Steam_artwork.jpg"
			}
		],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Outer_Wilds"
		}]
	},
	{
		id: "signalis",
		title: "Signalis",
		medium: "game",
		year: "2022",
		makers: "rose-engine (Yuri Stern and Barbara Wittmann); published by Humble Games",
		lineages: [
			"cassette-futurism",
			"new-weird",
			"brutalist-monumental"
		],
		tagline: "Low-poly totalitarian cosmic horror",
		description: "Signalis is survival horror rendered as a lost PlayStation-era artifact. Its world is Eusan, an interstellar authoritarian state whose design borrows from Eastern Bloc graphic design, socialist-realist posters and East German institutional interiors; signage is often in German. Players control Elster, a Replika, a manufactured android worker, searching the Sierpinski mining facility on a frozen planet. Rooms are low-polygon, chunky-textured and viewed from a top-down fixed camera, with dithered shading and pixelated close-ups that switch to anime-styled portraits for characters. Technology is cassette-futurist: CRT monitors, radio frequencies tuned by hand, analog keypads, ID cards, save stations, steel bunks and ration tins. Replikas are designed as product lines with model codes, uniform haircuts and military cuts. The horror comes through corrupted variants of these clean shapes, bodies covered in red rust, and through interruptions of flat red, white and black graphic frames, hallucinated lighthouses and passages from The King in Yellow. The inventory is tiny (six slots), like early Resident Evil, and the UI uses boxy segmented type and alarm red. Its strength is restraint: a cold bureaucratic world that keeps cracking into dream.",
		palette: [
			{
				name: "Eusan Red",
				hex: "#c8202a"
			},
			{
				name: "Facility Black",
				hex: "#0c0c0e"
			},
			{
				name: "Concrete Grey",
				hex: "#6a6a68"
			},
			{
				name: "Replika Bone",
				hex: "#e2ddd0"
			},
			{
				name: "Terminal Green",
				hex: "#5ec46a"
			}
		],
		materials: [
			"low-resolution concrete textures",
			"painted steel lockers and bunks",
			"CRT glass",
			"rusted, fleshy corruption",
			"printed propaganda paper"
		],
		shapes: [
			"fixed top-down room boxes",
			"star and wheel state emblems",
			"segmented blocky glyphs",
			"bulky radio handsets",
			"lighthouses and snowfields"
		],
		typeAndUi: "Boxy segmented type, German and Eusan signage, and a minimal six-slot inventory framed in red and black; radio tuning and keypad puzzles are fully diegetic.",
		lighting: "Hard flashlight cones in dark corridors, flat fluorescent rooms, and abrupt saturated red when the world corrupts.",
		influences: [
			"Resident Evil and Silent Hill",
			"Neon Genesis Evangelion",
			"Ghost in the Shell",
			"The King in Yellow",
			"Eastern Bloc design"
		],
		influenced: [],
		borrow: "Commit to a deliberately constrained retro rendering style and a strict state graphic identity, then break it with flat full-color graphic interruptions.",
		keywords: [
			"Elster",
			"Replika",
			"Eusan Nation",
			"Sierpinski",
			"PS1 aesthetic",
			"survival horror",
			"rose-engine"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/d/de/Signalis_gameplay.png/250px-Signalis_gameplay.png",
			alt: "Top-down low-poly view of a dim facility room with the player character",
			caption: "Gameplay in the Sierpinski facility.",
			source: "https://en.wikipedia.org/wiki/File:Signalis_gameplay.png"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/3/37/Signalis_cover.jpg/250px-Signalis_cover.jpg",
			alt: "Cover art with a Replika figure in red and black graphic style",
			caption: "Cover art.",
			source: "https://en.wikipedia.org/wiki/File:Signalis_cover.jpg"
		}],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Signalis"
		}]
	},
	{
		id: "starfield",
		title: "Starfield",
		medium: "game",
		year: "2023",
		makers: "Bethesda Game Studios; director Todd Howard, art director Istvan Pely",
		lineages: [
			"used-future",
			"military-industrial",
			"clean-future"
		],
		tagline: "NASA-punk: grounded, functional spaceflight",
		description: "Bethesda described Starfield's look as NASA-punk, a near-future extrapolation of real spaceflight hardware rather than sleek fantasy. Ships are built from modular cockpits, habs, engines and landing gear that players can assemble, and every module reads as manufactured: panel seams, stenciled part numbers, warning decals, exposed struts and manufacturer liveries from companies such as Stroud-Eklund, Hopetech, Deimos and Nova Galactic. Cockpits are dense with physical toggles, chunky buttons, small displays and grab handles. Spacesuits are bulky white and colored shells with hoses, helmet lights and mission patches, and the Constellation explorers' society adds a vintage, clubby layer of wood, leather and a star-map logo. Settled Systems cities each wear a distinct style: New Atlantis is gleaming white towers and greenery for the United Colonies, Akila City a frontier western in stone walls, Neon a pleasure-district cyberpunk platform over an ocean, and Cydonia a cramped Martian mining hole. Outposts and procedural planets use the same kit of prefabricated modules. The UI echoes aerospace instrument design, with a clean sans and thin rules over ship systems. It works by making space feel like a working industry.",
		palette: [
			{
				name: "Suit White",
				hex: "#e6e4de"
			},
			{
				name: "Hull Gunmetal",
				hex: "#4a4e52"
			},
			{
				name: "Safety Orange",
				hex: "#e2702a"
			},
			{
				name: "Constellation Gold",
				hex: "#c8a45a"
			},
			{
				name: "Vacuum Navy",
				hex: "#101824"
			}
		],
		materials: [
			"painted aluminum hull panels",
			"stenciled decals and warning labels",
			"padded suit fabric and hoses",
			"worn wood and leather in lodges",
			"rocky regolith"
		],
		shapes: [
			"modular ship blocks",
			"cockpit toggle banks",
			"landing struts and ramps",
			"mission patches and roundels",
			"prefab outpost habs"
		],
		typeAndUi: "Aerospace-inspired interface with clean sans type, thin rules and segmented power allocation bars; ships and suits carry stenciled codes and manufacturer marks.",
		lighting: "Harsh single-star light with deep shadows on airless worlds, warm interior cabin lamps and bright daylight over New Atlantis.",
		influences: [
			"NASA and Apollo hardware",
			"The Expanse",
			"Alien's industrial ships",
			"Hard science fiction illustration"
		],
		influenced: [],
		borrow: "Design technology as manufactured parts from named suppliers, with stencils, decals and switches, and keep a consistent modular kit across scales.",
		keywords: [
			"NASA-punk",
			"Constellation",
			"Settled Systems",
			"New Atlantis",
			"ship builder",
			"Bethesda"
		],
		stills: [
			{
				src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Starfield_-_Abandoned_Hangar.jpg/500px-Starfield_-_Abandoned_Hangar.jpg",
				alt: "Spacesuited player approaching an abandoned industrial hangar on a barren planet",
				caption: "Exploring an abandoned hangar.",
				source: "https://commons.wikimedia.org/wiki/File:Starfield_-_Abandoned_Hangar.jpg"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Starfield_-_Empty_planet.jpg/500px-Starfield_-_Empty_planet.jpg",
				alt: "Wide view of an empty rocky planet surface under a dark sky",
				caption: "A procedurally generated planet surface.",
				source: "https://commons.wikimedia.org/wiki/File:Starfield_-_Empty_planet.jpg"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Starfield_-_game_cover.png/500px-Starfield_-_game_cover.png",
				alt: "Cover art of an astronaut silhouetted against a planet and starfield",
				caption: "Cover art.",
				source: "https://commons.wikimedia.org/wiki/File:Starfield_-_game_cover.png"
			}
		],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Starfield_(video_game)"
		}]
	},
	{
		id: "returnal",
		title: "Returnal",
		medium: "game",
		year: "2021",
		makers: "Housemarque; director Harry Krueger, published by Sony Interactive Entertainment",
		lineages: [
			"biomechanical",
			"mythic-precursor",
			"alien-naturalist"
		],
		tagline: "Xeno-ruins lit by bullet hell",
		description: "Returnal traps ASTRA scout Selene Vassos in a time loop on Atropos, a hostile planet she crash-lands on with her ship, Helios. The design fuses three registers. First, alien nature: overgrown jungles of black, fleshy flora, tentacled creatures and bioluminescent spores in the Overgrown Ruins, and red ash deserts in the Crimson Wastes. Second, the ruins of the Sentients, an ancient species whose architecture is towering carved stone, temple stairs and machine-like citadels with angular, almost Mesoamerican mass. Third, Housemarque's arcade heritage: enemies fill the space with bright orange, magenta and cyan projectile patterns that glow against the dark, so the combat itself becomes the light source. Selene's suit is grounded and practical, a scout's armor with helmet light and backpack, and her impossible 1980s suburban house recurs as an uncanny intrusion lit in warm domestic tones. Technology splits between human gear and glowing alien artifacts, parasites and xenoglyph tablets that she learns to read. The HUD is minimal and thin, with an integrity bar and an adrenaline meter, while audio logs and scout logs from her own past corpses build the mystery. Darkness, scale and neon fire make each loop feel ritual and frantic at once.",
		palette: [
			{
				name: "Atropos Night",
				hex: "#0a0d14"
			},
			{
				name: "Sentient Stone",
				hex: "#5a5e5c"
			},
			{
				name: "Projectile Orange",
				hex: "#ff7a1a"
			},
			{
				name: "Xeno Cyan",
				hex: "#2ee6e0"
			},
			{
				name: "Crimson Ash",
				hex: "#8c1e1e"
			}
		],
		materials: [
			"wet black alien flora",
			"carved monolithic stone",
			"scuffed scout armor",
			"glowing alien glass",
			"red volcanic ash"
		],
		shapes: [
			"tentacled silhouettes",
			"radial projectile rings",
			"stepped temple stairs",
			"angular citadel spires",
			"a lone suburban house"
		],
		typeAndUi: "Thin, minimal HUD with an integrity bar and adrenaline meter; xenoglyphs and scout logs add alien and human text layers.",
		lighting: "Near darkness pierced by helmet light, bioluminescence and saturated projectile glow, with heavy volumetric fog.",
		influences: [
			"Alien",
			"Arcade bullet-hell shooters",
			"H. R. Giger",
			"Lovecraftian horror"
		],
		influenced: [],
		borrow: "Keep the environment dark and organic so the interactive elements (projectiles, pickups) carry the only saturated color, turning gameplay into the lighting design.",
		keywords: [
			"Atropos",
			"Selene",
			"ASTRA",
			"Helios",
			"roguelike",
			"time loop",
			"Housemarque",
			"bullet hell"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/3/3a/Returnal_gameplay.gif/330px-Returnal_gameplay.gif",
			alt: "Animated third-person view of Selene fighting creatures amid glowing projectiles",
			caption: "Pre-release gameplay.",
			source: "https://en.wikipedia.org/wiki/File:Returnal_gameplay.gif"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/9/91/Returnal_cover_art.jpg/250px-Returnal_cover_art.jpg",
			alt: "Cover art of Selene in her scout suit in a dark alien environment",
			caption: "Cover art.",
			source: "https://en.wikipedia.org/wiki/File:Returnal_cover_art.jpg"
		}],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Returnal"
		}]
	},
	{
		id: "hyper-light-drifter",
		title: "Hyper Light Drifter",
		medium: "game",
		year: "2016",
		makers: "Heart Machine; creative director Alx Preston, music by Disasterpeace",
		lineages: [
			"mythic-precursor",
			"post-apocalyptic",
			"neon-digital"
		],
		tagline: "Pixel ruins of dead titans",
		description: "Hyper Light Drifter tells its story with no dialogue, so the art carries everything. Alx Preston's world is a high-resolution pixel-art ruin of a forgotten technological age: the corpses of colossal titans lie across hillsides, overgrown with grass, while abandoned laboratories, monoliths and machinery hum beneath the soil. The palette is the signature, pinks, magentas, teals and deep purples that feel like a sunset seen through a synthesizer, used in broad flat shapes with crisp edges. The Drifter is a small cloaked figure in a red-pink cape with a hard-light sword and a floating cube sprite companion; enemies range from jackal-headed cultists to crystalline automata. Towns are clusters of patched tents and hard-edged ruins, with shops run by birdlike and frog-like peoples. The four regions are each tied to a color and a quest of collecting modules. Conversations play out as small storyboard panels of images instead of text, so the interface and the narrative share one pictographic language. Glyphs, monoliths and triangular gates repeat across the map. The game's influences include A Link to the Past and Nausicaä, but its synth-pastel melancholy and wordless iconography gave indie pixel art a new mood.",
		palette: [
			{
				name: "Drifter Magenta",
				hex: "#e2386a"
			},
			{
				name: "Hard-Light Teal",
				hex: "#2ad4c8"
			},
			{
				name: "Dusk Violet",
				hex: "#4a2a6a"
			},
			{
				name: "Titan Bone",
				hex: "#e8dcc8"
			},
			{
				name: "Meadow Mint",
				hex: "#7ad4a0"
			}
		],
		materials: [
			"pixel grass and moss",
			"weathered stone and metal",
			"glowing hard-light energy",
			"tattered cloth capes",
			"crystal shards"
		],
		shapes: [
			"fallen titan skeletons",
			"triangular gates and glyphs",
			"small cloaked silhouettes",
			"floating cube companion",
			"tall monoliths"
		],
		typeAndUi: "Almost wordless: pictographic storyboard panels replace dialogue, and the HUD is a few pixel pips for health, stamina and ammo.",
		lighting: "Flat, saturated pastel color with glowing hard-light accents and soft fog layers between foreground and ruin.",
		influences: [
			"The Legend of Zelda: A Link to the Past",
			"Nausicaä of the Valley of the Wind",
			"Diablo",
			"Synthwave and pixel art"
		],
		influenced: [],
		borrow: "Commit to a narrow saturated pastel palette and tell story through pictograms instead of text, so the whole interface stays inside one visual language.",
		keywords: [
			"Drifter",
			"titans",
			"pixel art",
			"Heart Machine",
			"Alx Preston",
			"wordless storytelling"
		],
		stills: [{
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/5/54/Hyper_Light_Drifter_Screenshot.png/330px-Hyper_Light_Drifter_Screenshot.png",
			alt: "Pixel-art scene of the Drifter talking with a character, shown as image panels instead of text",
			caption: "Conversations use images in place of dialogue.",
			source: "https://en.wikipedia.org/wiki/File:Hyper_Light_Drifter_Screenshot.png"
		}, {
			src: "https://thumb.wikimedia.org/wikipedia/en/thumb/6/6a/HyperLightDrifterBoxArt.png/250px-HyperLightDrifterBoxArt.png",
			alt: "Box art of the cloaked Drifter before a giant ruined figure in pink and teal",
			caption: "Box art.",
			source: "https://en.wikipedia.org/wiki/File:HyperLightDrifterBoxArt.png"
		}],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Hyper_Light_Drifter"
		}]
	},
	{
		id: "rain-world",
		title: "Rain World",
		medium: "game",
		year: "2017",
		makers: "Videocult (Joar Jakobsson and James Primate); published by Adult Swim Games",
		lineages: [
			"post-apocalyptic",
			"alien-naturalist",
			"mythic-precursor"
		],
		tagline: "Industrial ruin as living ecosystem",
		description: "Rain World casts the player as a slugcat, a small, soft creature at the bottom of the food chain, surviving in the ruins of an incomprehensible machine civilization. The world is a vast, rain-soaked tangle of pipes, scaffolds, chimneys, grates, smokestacks and broken arrays, built as layered 2D rooms with deep parallax that feel like rendered industrial photographs. Each region has its own palette, from the hazy greens of the Outskirts and Shoreline to the rusted brown of Industrial Complex, the dusty Garbage Wastes and the sunlit Sky Islands above the clouds. The architecture belongs to the Ancients and to the Iterators, gigantic biomechanical supercomputers housed in cans that tower over the land. Life is the other half of the design: brightly colored lizards (green, pink, blue) move with procedural, physically simulated animation; vultures, centipedes and plants behave as an ecosystem indifferent to the player. A deadly rain cycle floods the world on a timer, forcing retreat into shelters. The HUD is nearly absent, with karma symbols, food pips and a cycle timer that fade in only when needed. The result is a world that feels genuinely uncaring, where ruin and ecology share every room.",
		palette: [
			{
				name: "Rust Pipe",
				hex: "#7a4a2e"
			},
			{
				name: "Rain Slate",
				hex: "#3a4248"
			},
			{
				name: "Lizard Green",
				hex: "#4ad850"
			},
			{
				name: "Pink Lizard",
				hex: "#e24aa8"
			},
			{
				name: "Slugcat White",
				hex: "#f0f0ea"
			}
		],
		materials: [
			"rusted pipes and scaffolds",
			"wet corrugated metal",
			"crumbling concrete walls",
			"dense vegetation and moss",
			"rain sheets and mist"
		],
		shapes: [
			"vertical pipe forests",
			"gigantic Iterator cans",
			"karma gate glyphs",
			"tall smokestacks",
			"small soft creature silhouettes"
		],
		typeAndUi: "Almost no text: karma symbols, food pips and a cycle indicator fade in briefly, and regions are named in simple caps on entry.",
		lighting: "Hazy layered depth with region-specific color grading, grey downpours and occasional golden light high in the Sky Islands.",
		influences: [
			"Industrial ruins and urban exploration",
			"Real animal behavior",
			"Hand-built layered 2D rendering"
		],
		influenced: [],
		borrow: "Fill an environment with infrastructure whose purpose is unknowable, then animate living creatures procedurally so ecology rather than story drives the mood.",
		keywords: [
			"slugcat",
			"Iterators",
			"Five Pebbles",
			"Looks to the Moon",
			"karma",
			"procedural animation",
			"Videocult",
			"Downpour"
		],
		stills: [
			{
				src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Rain_World_animation_-_Green_Liz_%28shortened%29.gif/500px-Rain_World_animation_-_Green_Liz_%28shortened%29.gif",
				alt: "Animated clip of a green lizard chasing through an industrial ruin",
				caption: "A green lizard's pursuit, driven by procedural animation.",
				source: "https://commons.wikimedia.org/wiki/File:Rain_World_animation_-_Green_Liz_(shortened).gif"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Rain_World_animation_-_Blue_Liz_sm.gif/500px-Rain_World_animation_-_Blue_Liz_sm.gif",
				alt: "Animated clip of a blue lizard moving among pipes and platforms",
				caption: "A blue lizard in a pipe-filled ruin.",
				source: "https://commons.wikimedia.org/wiki/File:Rain_World_animation_-_Blue_Liz_sm.gif"
			},
			{
				src: "https://thumb.wikimedia.org/wikipedia/en/thumb/e/e6/Rain_World_Downpour_Promotional_Resized.jpg/330px-Rain_World_Downpour_Promotional_Resized.jpg",
				alt: "Promotional art of five slugcat characters for the Downpour expansion",
				caption: "Downpour promotional art: Spearmaster, Rivulet, Saint, Gourmand, Artificer.",
				source: "https://en.wikipedia.org/wiki/File:Rain_World_Downpour_Promotional_Resized.jpg"
			}
		],
		refs: [{
			label: "Wikipedia",
			url: "https://en.wikipedia.org/wiki/Rain_World"
		}]
	}
];
//#endregion
//#region junkyard/scifi-design-languages/data/worlds/index.ts
/** Every world. Games only for now; films can be added later as more files in this folder. */
var WORLDS = [
	...GAMES_A,
	...GAMES_B,
	...GAMES_C
];
//#endregion
//#region junkyard/scifi-design-languages/data/query.ts
var NO_FILTERS = {
	medium: "all",
	lineage: "all",
	q: ""
};
/** Year as a number for sorting; ranges sort by their start. */
var startYear = (w) => parseInt(w.year, 10) || 0;
/** Index order: by primary lineage (in LINEAGES order), then by year. */
var ORDERED = [...WORLDS].sort((a, b) => LINEAGES.findIndex((l) => l.id === a.lineages[0]) - LINEAGES.findIndex((l) => l.id === b.lineages[0]) || startYear(a) - startYear(b));
/** Reference number, fixed by index order, e.g. "SF-07". */
var NUMBER = new Map(ORDERED.map((w, i) => [w.id, `SF-${String(i + 1).padStart(2, "0")}`]));
var worldNumber = (w) => NUMBER.get(w.id) ?? "";
var findWorld = (id) => WORLDS.find((w) => w.id === id);
var isMedium = (v) => v === "film" || v === "series" || v === "game";
var isLineage = (v) => LINEAGES.some((l) => l.id === v);
var lineageTitle = (id) => LINEAGES.find((l) => l.id === id)?.title ?? id;
var HAYSTACK = new Map(WORLDS.map((w) => [w.id, [
	w.title,
	w.tagline,
	w.year,
	w.makers,
	w.description,
	w.materials,
	w.shapes,
	w.influences,
	w.keywords,
	w.lineages.map(lineageTitle)
].flat().join(" ").toLowerCase()]));
/** A world matches when it has the medium, has the lineage anywhere in its list, and contains every query word. */
function matches(w, f) {
	if (f.medium !== "all" && w.medium !== f.medium) return false;
	if (f.lineage !== "all" && !w.lineages.includes(f.lineage)) return false;
	const text = HAYSTACK.get(w.id) ?? "";
	return f.q.toLowerCase().split(/\s+/).filter(Boolean).every((word) => text.includes(word));
}
/** Matching worlds grouped into chapters by primary lineage, in index order. */
function chapters(f) {
	const found = ORDERED.filter((w) => matches(w, f));
	return LINEAGES.map((lineage) => ({
		lineage,
		worlds: found.filter((w) => w.lineages[0] === lineage.id)
	})).filter((c) => c.worlds.length > 0);
}
/** Previous and next worlds in index order, wrapping around. */
function neighbours(w) {
	const i = ORDERED.indexOf(w);
	const n = ORDERED.length;
	return [ORDERED[(i - 1 + n) % n], ORDERED[(i + 1) % n]];
}
var escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** True when `title` appears as its own name, not inside a longer word or a different work. */
function mentions(text, title) {
	return new RegExp(`(?:^|[^a-z0-9])${escapeRe(title.toLowerCase())}(?:[^a-z0-9]|$)`, "i").test(text);
}
/** Worlds named in this one's influences or influenced lists, matched by title. */
function related(w) {
	const names = [...w.influences, ...w.influenced];
	return WORLDS.filter((o) => o !== w && names.some((n) => mentions(n, o.title)));
}
var TOTAL = WORLDS.length;
//#endregion
//#region src/lib/clipboard.ts
/** Copy text and flash feedback on the trigger button. */
async function copyText(text, button) {
	let ok = true;
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		ok = fallbackCopy(text);
	}
	if (button) flash(button, ok ? "Copied" : "Copy failed");
	return ok;
}
function fallbackCopy(text) {
	const area = document.createElement("textarea");
	area.value = text;
	area.setAttribute("readonly", "");
	area.style.position = "fixed";
	area.style.opacity = "0";
	document.body.append(area);
	area.select();
	const ok = document.execCommand("copy");
	area.remove();
	return ok;
}
function flash(button, label) {
	const original = button.dataset.label ?? button.textContent ?? "";
	button.dataset.label = original;
	button.textContent = label;
	window.setTimeout(() => {
		button.textContent = original;
	}, 1200);
}
//#endregion
//#region junkyard/scifi-design-languages/data/media.ts
var STEAM = {
	"mirrors-edge": {
		appId: 17410,
		name: "Mirror's Edge™",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006705.600x338.jpg?t=1777394972",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006705.1920x1080.jpg?t=1777394972"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006706.600x338.jpg?t=1777394972",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006706.1920x1080.jpg?t=1777394972"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006707.600x338.jpg?t=1777394972",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/0000006707.1920x1080.jpg?t=1777394972"
			}
		]
	},
	"portal": {
		appId: 400,
		name: "Portal",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002582.600x338.jpg?t=1745368554",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002582.1920x1080.jpg?t=1745368554"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002583.600x338.jpg?t=1745368554",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002583.1920x1080.jpg?t=1745368554"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002584.600x338.jpg?t=1745368554",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/0000002584.1920x1080.jpg?t=1745368554"
			}
		]
	},
	"half-life": {
		appId: 70,
		name: "Half-Life",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002354.600x338.jpg?t=1745368462",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002354.1920x1080.jpg?t=1745368462"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002343.600x338.jpg?t=1745368462",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002343.1920x1080.jpg?t=1745368462"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002342.600x338.jpg?t=1745368462",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/0000002342.1920x1080.jpg?t=1745368462"
			}
		]
	},
	"half-life-2": {
		appId: 220,
		name: "Half-Life 2",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_47b4105b396de408cb8b6b4f358c69e5e2a62dae.600x338.jpg?t=1745368545",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_47b4105b396de408cb8b6b4f358c69e5e2a62dae.1920x1080.jpg?t=1745368545"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_0e499071a60a20b24149ad65a8edb769250f2921.600x338.jpg?t=1745368545",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_0e499071a60a20b24149ad65a8edb769250f2921.1920x1080.jpg?t=1745368545"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_ffb00abd45012680e4f209355ec81f961b6dd1fb.600x338.jpg?t=1745368545",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/ss_ffb00abd45012680e4f209355ec81f961b6dd1fb.1920x1080.jpg?t=1745368545"
			}
		]
	},
	"halo": {
		appId: 976730,
		name: "Halo: The Master Chief Collection",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_ce40a85f9f7f3fa0f620a87f8919f3212ab8e46e.600x338.jpg?t=1791569963",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_ce40a85f9f7f3fa0f620a87f8919f3212ab8e46e.1920x1080.jpg?t=1791569963"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_62bbd86f4735893ef6cd53206cf8c93f87eb86ec.600x338.jpg?t=1791569963",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_62bbd86f4735893ef6cd53206cf8c93f87eb86ec.1920x1080.jpg?t=1791569963"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_fdaf8ebd7f3c62e08398f39c9bfa486294ea5a0a.600x338.jpg?t=1791569963",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/ss_fdaf8ebd7f3c62e08398f39c9bfa486294ea5a0a.1920x1080.jpg?t=1791569963"
			}
		]
	},
	"mass-effect": {
		appId: 1328670,
		name: "Mass Effect™ Legendary Edition",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_3cfdbd8a5d94f9005d33ba17bb6b163dc458ddf7.600x338.jpg?t=1777395134",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_3cfdbd8a5d94f9005d33ba17bb6b163dc458ddf7.1920x1080.jpg?t=1777395134"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_4e226eb092381ba6c4ea9c164a1d18574c993a8a.600x338.jpg?t=1777395134",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_4e226eb092381ba6c4ea9c164a1d18574c993a8a.1920x1080.jpg?t=1777395134"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_8994024759b1e6afb09a99381637c8b6fb4e4075.600x338.jpg?t=1777395134",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/ss_8994024759b1e6afb09a99381637c8b6fb4e4075.1920x1080.jpg?t=1777395134"
			}
		]
	},
	"dead-space": {
		appId: 17470,
		name: "Dead Space (2008)",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006481.600x338.jpg?t=1777495169",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006481.1920x1080.jpg?t=1777495169"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006482.600x338.jpg?t=1777495169",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006482.1920x1080.jpg?t=1777495169"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006483.600x338.jpg?t=1777495169",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17470/0000006483.1920x1080.jpg?t=1777495169"
			}
		]
	},
	"bioshock": {
		appId: 409710,
		name: "BioShock™ Remastered",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_bb9c564381c11357a51f1579c6337fba90ead10f.600x338.jpg?t=1740443728",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_bb9c564381c11357a51f1579c6337fba90ead10f.1920x1080.jpg?t=1740443728"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_fefcc94c6f10da7009cf07cf877e5d5937ebfb45.600x338.jpg?t=1740443728",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_fefcc94c6f10da7009cf07cf877e5d5937ebfb45.1920x1080.jpg?t=1740443728"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_04e04ae694f8b077e7f03906f7fa813823b5fd4e.600x338.jpg?t=1740443728",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/409710/ss_04e04ae694f8b077e7f03906f7fa813823b5fd4e.1920x1080.jpg?t=1740443728"
			}
		]
	},
	"deus-ex-human-revolution": {
		appId: 238010,
		name: "Deus Ex: Human Revolution - Director's Cut",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_33f23de4cf18cbf6f676902096337716f9e19a52.600x338.jpg?t=1779722099",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_33f23de4cf18cbf6f676902096337716f9e19a52.1920x1080.jpg?t=1779722099"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_69362b98ecc4d707a5c92853539b60e0d622d268.600x338.jpg?t=1779722099",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_69362b98ecc4d707a5c92853539b60e0d622d268.1920x1080.jpg?t=1779722099"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_af1341ecafdca9be97d32620d957a384dce5f4ad.600x338.jpg?t=1779722099",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238010/ss_af1341ecafdca9be97d32620d957a384dce5f4ad.1920x1080.jpg?t=1779722099"
			}
		]
	},
	"cyberpunk-2077": {
		appId: 1091500,
		name: "Cyberpunk 2077",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.600x338.jpg?t=1784714077",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.1920x1080.jpg?t=1784714077"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.600x338.jpg?t=1784714077",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.1920x1080.jpg?t=1784714077"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_af2804aa4bf35d4251043744412ce3b359a125ef.600x338.jpg?t=1784714077",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_af2804aa4bf35d4251043744412ce3b359a125ef.1920x1080.jpg?t=1784714077"
			}
		]
	},
	"destiny": {
		appId: 1085660,
		name: "Destiny 2",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d7038cee22b9de60003e7bbc07d65069ad6044ab/ss_d7038cee22b9de60003e7bbc07d65069ad6044ab.600x338.jpg?t=1781815889",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d7038cee22b9de60003e7bbc07d65069ad6044ab/ss_d7038cee22b9de60003e7bbc07d65069ad6044ab.1920x1080.jpg?t=1781815889"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/766aedcb8d2eb8fcb08002919ee10f5ac6c02d79/ss_766aedcb8d2eb8fcb08002919ee10f5ac6c02d79.600x338.jpg?t=1781815889",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/766aedcb8d2eb8fcb08002919ee10f5ac6c02d79/ss_766aedcb8d2eb8fcb08002919ee10f5ac6c02d79.1920x1080.jpg?t=1781815889"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4/ss_d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4.600x338.jpg?t=1781815889",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4/ss_d3a51ac12ac9b30af96b7e7a5bcef8f56abf5ca4.1920x1080.jpg?t=1781815889"
			}
		]
	},
	"final-fantasy-vii": {
		appId: 39140,
		name: "FINAL FANTASY VII",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_19e001c38309a504ff39ebd557eccfff5ed1c3be.600x338.jpg?t=1771952602",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_19e001c38309a504ff39ebd557eccfff5ed1c3be.1920x1080.jpg?t=1771952602"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_3b111bf8ad9bdd95b55cdcda4d3ee9b70b15dca1.600x338.jpg?t=1771952602",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_3b111bf8ad9bdd95b55cdcda4d3ee9b70b15dca1.1920x1080.jpg?t=1771952602"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_0bbe443526a52664aecece47e229d17ca68d1e5a.600x338.jpg?t=1771952602",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/ss_0bbe443526a52664aecece47e229d17ca68d1e5a.1920x1080.jpg?t=1771952602"
			}
		]
	},
	"fallout": {
		appId: 38400,
		name: "Fallout: A Post Nuclear Role Playing Game"
	},
	"system-shock": {
		appId: 482400,
		name: "System Shock",
		linkLabel: "Steam: System Shock (2023 remake)"
	},
	"elite-dangerous": {
		appId: 359320,
		name: "Elite Dangerous",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_1d3391a2f4ed9881012e76755c6ea984242ee538.600x338.jpg?t=1759842966",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_1d3391a2f4ed9881012e76755c6ea984242ee538.1920x1080.jpg?t=1759842966"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_c4293fb1338f0094bf7cc03b83ed4dc74bbd91e4.600x338.jpg?t=1759842966",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_c4293fb1338f0094bf7cc03b83ed4dc74bbd91e4.1920x1080.jpg?t=1759842966"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_ae44ddd3966a26c5f5f431472eff949eaef329cd.600x338.jpg?t=1759842966",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359320/ss_ae44ddd3966a26c5f5f431472eff949eaef329cd.1920x1080.jpg?t=1759842966"
			}
		]
	},
	"alien-isolation": {
		appId: 214490,
		name: "Alien: Isolation",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_5ff8ca35914eca8f51f3303cf5d94a9f85279e2a.600x338.jpg?t=1763647113",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_5ff8ca35914eca8f51f3303cf5d94a9f85279e2a.1920x1080.jpg?t=1763647113"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_e514869415e3bd913be3f6c0e419cea9f0be17a3.600x338.jpg?t=1763647113",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_e514869415e3bd913be3f6c0e419cea9f0be17a3.1920x1080.jpg?t=1763647113"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_af3b9b789a57497e300e0a4c962badf513387a69.600x338.jpg?t=1763647113",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214490/ss_af3b9b789a57497e300e0a4c962badf513387a69.1920x1080.jpg?t=1763647113"
			}
		]
	},
	"doom-2016": {
		appId: 379720,
		name: "DOOM",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_f989e793786bf1d6459da1139a484203efef1447.600x338.jpg?t=1750784856",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_f989e793786bf1d6459da1139a484203efef1447.1920x1080.jpg?t=1750784856"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_ac05e086b8f0580bc95970fbb6f18a7e4fe65404.600x338.jpg?t=1750784856",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_ac05e086b8f0580bc95970fbb6f18a7e4fe65404.1920x1080.jpg?t=1750784856"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_d7ee83faf64036494e4a817b8be55b044fbe7c6c.600x338.jpg?t=1750784856",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/379720/ss_d7ee83faf64036494e4a817b8be55b044fbe7c6c.1920x1080.jpg?t=1750784856"
			}
		]
	},
	"no-mans-sky": {
		appId: 275850,
		name: "No Man's Sky",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/6c2ddcffe192b0e155a69aa2a1dd3f33b863033d/ss_6c2ddcffe192b0e155a69aa2a1dd3f33b863033d.600x338.jpg?t=1789479023",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/6c2ddcffe192b0e155a69aa2a1dd3f33b863033d/ss_6c2ddcffe192b0e155a69aa2a1dd3f33b863033d.1920x1080.jpg?t=1789479023"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/cad26f1dc67d28327ccdabeecb68d5006ad5639b/ss_cad26f1dc67d28327ccdabeecb68d5006ad5639b.600x338.jpg?t=1789479023",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/cad26f1dc67d28327ccdabeecb68d5006ad5639b/ss_cad26f1dc67d28327ccdabeecb68d5006ad5639b.1920x1080.jpg?t=1789479023"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/227c7c49d81de5f77d260495885e433efaece06d/ss_227c7c49d81de5f77d260495885e433efaece06d.600x338.jpg?t=1789479023",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/227c7c49d81de5f77d260495885e433efaece06d/ss_227c7c49d81de5f77d260495885e433efaece06d.1920x1080.jpg?t=1789479023"
			}
		]
	},
	"titanfall-2": {
		appId: 1237970,
		name: "Titanfall® 2",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_d5c13576c0ab4e6ca93b51aa39aa74271672e75f.600x338.jpg?t=1779987598",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_d5c13576c0ab4e6ca93b51aa39aa74271672e75f.1920x1080.jpg?t=1779987598"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_9ed56a85aef47554156999dfbd4091d225da2a47.600x338.jpg?t=1779987598",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_9ed56a85aef47554156999dfbd4091d225da2a47.1920x1080.jpg?t=1779987598"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_f4a8464ce43962b76fa6f2156b341eee28ad6494.600x338.jpg?t=1779987598",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/ss_f4a8464ce43962b76fa6f2156b341eee28ad6494.1920x1080.jpg?t=1779987598"
			}
		]
	},
	"prey-2017": {
		appId: 480490,
		name: "Prey",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_06b6c27c834b5639c54d470b3b5c711cf72a94af.600x338.jpg?t=1784141088",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_06b6c27c834b5639c54d470b3b5c711cf72a94af.1920x1080.jpg?t=1784141088"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_ff6b4efb3add6ea9a1d67f5c6c0fae6661ed9fd8.600x338.jpg?t=1784141088",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_ff6b4efb3add6ea9a1d67f5c6c0fae6661ed9fd8.1920x1080.jpg?t=1784141088"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_976f1d181de3dc8bc86c78fe900c98be457d0942.600x338.jpg?t=1784141088",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/480490/ss_976f1d181de3dc8bc86c78fe900c98be457d0942.1920x1080.jpg?t=1784141088"
			}
		]
	},
	"horizon-zero-dawn": {
		appId: 1151640,
		name: "Horizon Zero Dawn™ Complete Edition",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_d09106060fb7de8bf342c23df18b14debc8a15a3.600x338.jpg?t=1776465788",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_d09106060fb7de8bf342c23df18b14debc8a15a3.1920x1080.jpg?t=1776465788"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_271f850eec3f96b22aa17be35b948268e0771c7f.600x338.jpg?t=1776465788",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_271f850eec3f96b22aa17be35b948268e0771c7f.1920x1080.jpg?t=1776465788"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_15f5759c441e4e5f51e1a8ee333e4ab9df9aa783.600x338.jpg?t=1776465788",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1151640/ss_15f5759c441e4e5f51e1a8ee333e4ab9df9aa783.1920x1080.jpg?t=1776465788"
			}
		]
	},
	"nier-automata": {
		appId: 524220,
		name: "NieR:Automata™",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_d0314b4c134329a483b5e43af951f60274abc66b.600x338.jpg?t=1785182957",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_d0314b4c134329a483b5e43af951f60274abc66b.1920x1080.jpg?t=1785182957"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_8b29f7e1ce9a8b9313dc3eb50dbe76a4cf94eef9.600x338.jpg?t=1785182957",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_8b29f7e1ce9a8b9313dc3eb50dbe76a4cf94eef9.1920x1080.jpg?t=1785182957"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_2c265df38c3d2d393d74ee8e74d79bdafa16b143.600x338.jpg?t=1785182957",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/524220/ss_2c265df38c3d2d393d74ee8e74d79bdafa16b143.1920x1080.jpg?t=1785182957"
			}
		]
	},
	"control": {
		appId: 870780,
		name: "CONTROL Ultimate Edition",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_8376498631b089e52fb5c75ffe119e0de5e6aed1.600x338.jpg?t=1781607969",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_8376498631b089e52fb5c75ffe119e0de5e6aed1.1920x1080.jpg?t=1781607969"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_5a16ce565951479e142c56a23f19d88333d84945.600x338.jpg?t=1781607969",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_5a16ce565951479e142c56a23f19d88333d84945.1920x1080.jpg?t=1781607969"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_c038bb7b20d72ba5d33cc95f7235aefa0b84a706.600x338.jpg?t=1781607969",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_c038bb7b20d72ba5d33cc95f7235aefa0b84a706.1920x1080.jpg?t=1781607969"
			}
		]
	},
	"death-stranding": {
		appId: 1190460,
		name: "DEATH STRANDING",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_ac7c64c8d10bb5786694891e4a22b07a5da7dd6f.600x338.jpg?t=1766014863",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_ac7c64c8d10bb5786694891e4a22b07a5da7dd6f.1920x1080.jpg?t=1766014863"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_4370916476e44c78b50bfee175f1d82285f6bfd7.600x338.jpg?t=1766014863",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_4370916476e44c78b50bfee175f1d82285f6bfd7.1920x1080.jpg?t=1766014863"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_39f107106c83eb3717a1061fa1da0f2f4bdf3993.600x338.jpg?t=1766014863",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/ss_39f107106c83eb3717a1061fa1da0f2f4bdf3993.1920x1080.jpg?t=1766014863"
			}
		]
	},
	"outer-wilds": {
		appId: 753640,
		name: "Outer Wilds",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_ec95a283483f0438be40d033f08b9d956e748d54.600x338.jpg?t=1785424341",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_ec95a283483f0438be40d033f08b9d956e748d54.1920x1080.jpg?t=1785424341"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_09f0fa8d9b8d7da1408cf4e03303d896cbd9be18.600x338.jpg?t=1785424341",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_09f0fa8d9b8d7da1408cf4e03303d896cbd9be18.1920x1080.jpg?t=1785424341"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_c624a6b8edca0d451605592edd927dbcc14917a8.600x338.jpg?t=1785424341",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_c624a6b8edca0d451605592edd927dbcc14917a8.1920x1080.jpg?t=1785424341"
			}
		]
	},
	"signalis": {
		appId: 1262350,
		name: "SIGNALIS",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_a2603694154878b8260c1dd498a06168cad012a4.600x338.jpg?t=1773697315",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_a2603694154878b8260c1dd498a06168cad012a4.1920x1080.jpg?t=1773697315"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_9d602346170b19121e4baec94f5fab54cc43637c.600x338.jpg?t=1773697315",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_9d602346170b19121e4baec94f5fab54cc43637c.1920x1080.jpg?t=1773697315"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_dc87789ecfa2f83dd58ac778866fbf7fdc1ec99a.600x338.jpg?t=1773697315",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262350/ss_dc87789ecfa2f83dd58ac778866fbf7fdc1ec99a.1920x1080.jpg?t=1773697315"
			}
		]
	},
	"starfield": {
		appId: 1716740,
		name: "Starfield",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_4887dc140a637684ddcfca518458668409f946dc.600x338.jpg?t=1786648030",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_4887dc140a637684ddcfca518458668409f946dc.1920x1080.jpg?t=1786648030"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_b2821283cb140cd5a6289a8160016b6a60d8f96e.600x338.jpg?t=1786648030",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_b2821283cb140cd5a6289a8160016b6a60d8f96e.1920x1080.jpg?t=1786648030"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_68f15d580bf91971f637be5e464bc803482d78f7.600x338.jpg?t=1786648030",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1716740/ss_68f15d580bf91971f637be5e464bc803482d78f7.1920x1080.jpg?t=1786648030"
			}
		]
	},
	"returnal": {
		appId: 1649240,
		name: "Returnal™",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_3c260834df0c87cfc9ac1b457d0ec0eb3b9f367c.600x338.jpg?t=1750956860",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_3c260834df0c87cfc9ac1b457d0ec0eb3b9f367c.1920x1080.jpg?t=1750956860"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_a91854c29cee0b4975862d174f03ff374ae5e26c.600x338.jpg?t=1750956860",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_a91854c29cee0b4975862d174f03ff374ae5e26c.1920x1080.jpg?t=1750956860"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_e15da2a195556b773ba8a982051f55de50d79a75.600x338.jpg?t=1750956860",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1649240/ss_e15da2a195556b773ba8a982051f55de50d79a75.1920x1080.jpg?t=1750956860"
			}
		]
	},
	"hyper-light-drifter": {
		appId: 257850,
		name: "Hyper Light Drifter",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_e786b1d9c66eb9c61e4da2945fe1d9faeb2af736.600x338.jpg?t=1762899660",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_e786b1d9c66eb9c61e4da2945fe1d9faeb2af736.1920x1080.jpg?t=1762899660"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_19c973259b736f14c4541ba044f3761b39a18737.600x338.jpg?t=1762899660",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_19c973259b736f14c4541ba044f3761b39a18737.1920x1080.jpg?t=1762899660"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_37ad0b207c867078e87cf8a185fe3c66b0bdd490.600x338.jpg?t=1762899660",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257850/ss_37ad0b207c867078e87cf8a185fe3c66b0bdd490.1920x1080.jpg?t=1762899660"
			}
		]
	},
	"rain-world": {
		appId: 312520,
		name: "Rain World",
		shots: [
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_cbd4e647d6b3bb3b311cb68fdf0cd8835d5919d7.600x338.jpg?t=1791223542",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_cbd4e647d6b3bb3b311cb68fdf0cd8835d5919d7.1920x1080.jpg?t=1791223542"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_628274c84b196e270733f540139062f2787c4423.600x338.jpg?t=1791223542",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_628274c84b196e270733f540139062f2787c4423.1920x1080.jpg?t=1791223542"
			},
			{
				thumb: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_d551eee41e60ba8f5f2005b3de41c5f2c27cb444.600x338.jpg?t=1791223542",
				full: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/312520/ss_d551eee41e60ba8f5f2005b3de41c5f2c27cb444.1920x1080.jpg?t=1791223542"
			}
		]
	}
};
var UI = {
	"mirrors-edge": {
		slug: "mirrors-edge-catalyst",
		other: "Mirror's Edge Catalyst"
	},
	"portal": {
		slug: "portal-2",
		other: "Portal 2"
	},
	"halo": {
		slug: "halo-infinite",
		other: "Halo Infinite"
	},
	"deus-ex-human-revolution": {
		slug: "deus-ex-mankind-divided",
		other: "Deus Ex: Mankind Divided"
	},
	"cyberpunk-2077": { slug: "cyberpunk-2077" },
	"destiny": {
		slug: "destiny-2",
		other: "Destiny 2"
	},
	"elite-dangerous": { slug: "elite-dangerous" },
	"doom-2016": { slug: "doom" },
	"no-mans-sky": { slug: "no-mans-sky" },
	"titanfall-2": { slug: "titanfall-2" },
	"horizon-zero-dawn": { slug: "horizon-zero-dawn" },
	"nier-automata": { slug: "nierautomata" },
	"control": { slug: "control" },
	"death-stranding": { slug: "death-stranding" },
	"starfield": { slug: "starfield" },
	"returnal": { slug: "returnal" }
};
var storeUrl = (s) => `https://store.steampowered.com/app/${s.appId}/`;
/** Every image for a world, hero first: Steam screenshots when they match the entry, Wikimedia stills otherwise. */
function gallery(w) {
	const steam = STEAM[w.id];
	const shots = steam?.shots;
	if (steam && shots?.length) return shots.map((s, i) => ({
		thumb: s.thumb,
		full: s.full,
		alt: `${steam.name}, official screenshot ${i + 1} of ${shots.length}`,
		credit: `Steam store, ${steam.name}`,
		source: storeUrl(steam)
	}));
	return w.stills.map((s) => ({
		thumb: s.src,
		full: s.src,
		alt: s.alt,
		credit: s.caption,
		source: s.source
	}));
}
/** Outside places to see more of the world: store page and UI library. */
function outsideLinks(w) {
	const steam = STEAM[w.id];
	const ui = UI[w.id];
	return [steam && {
		label: steam.linkLabel ?? `Steam: ${steam.name}`,
		url: storeUrl(steam)
	}, ui && {
		label: ui.other ? `Interface In Game: ${ui.other}` : "Interface In Game: UI screenshots",
		url: `https://interfaceingame.com/games/${ui.slug}/`
	}].filter((l) => !!l);
}
//#endregion
//#region junkyard/scifi-design-languages/ui/route.ts
function readRoute(hash = window.location.hash) {
	const p = new URLSearchParams(hash.replace(/^#/, ""));
	const medium = p.get("m");
	const lineage = p.get("l");
	return {
		world: p.get("w") ?? void 0,
		filters: {
			medium: isMedium(medium) ? medium : "all",
			lineage: isLineage(lineage) ? lineage : "all",
			q: (p.get("q") ?? "").slice(0, 80)
		}
	};
}
function routeHash({ world, filters }) {
	const p = new URLSearchParams();
	if (world) p.set("w", world);
	if (filters.medium !== NO_FILTERS.medium) p.set("m", filters.medium);
	if (filters.lineage !== NO_FILTERS.lineage) p.set("l", filters.lineage);
	if (filters.q) p.set("q", filters.q);
	const s = p.toString();
	return s ? `#${s}` : "";
}
/** Push for navigation (back returns), replace while typing or filtering. */
function writeRoute(route, mode) {
	const hash = routeHash(route);
	if (hash === window.location.hash) return;
	const url = hash || window.location.pathname + window.location.search;
	if (mode === "push") history.pushState(null, "", url);
	else history.replaceState(null, "", url);
}
//#endregion
//#region junkyard/scifi-design-languages/ui/detail-view.ts
var cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
/** How each brief axis is drawn. Text axes fall back to a paragraph. */
function answer(axis, w) {
	switch (axis.id) {
		case "palette": return h("ul", { class: "swatches" }, ...w.palette.map((s) => h("li", {}, h("i", { style: `background:${s.hex}` }), h("span", { class: "sw-name" }, s.name), h("code", {}, s.hex.toUpperCase()))));
		case "materials":
		case "shapes": return h("ul", { class: "terms" }, ...(axis.id === "materials" ? w.materials : w.shapes).map((t) => h("li", {}, cap(t))));
		case "tagline": return h("p", { class: "tagline" }, w.tagline);
		default: return h("p", {}, axis.text(w));
	}
}
/** Hero image with a credit line, and thumbnails that swap into the hero. */
function mountGallery(images) {
	const hero = h("img", {
		class: "hero-img",
		alt: "",
		decoding: "async"
	});
	const credit = h("a", {
		rel: "noopener",
		target: "_blank"
	});
	const thumbs = images.map((img, i) => {
		const b = h("button", {
			type: "button",
			class: "thumb",
			"aria-label": `Show image ${i + 1}`
		}, h("img", {
			src: img.thumb,
			alt: "",
			loading: "lazy"
		}));
		b.addEventListener("click", () => show(i));
		return b;
	});
	function show(i) {
		const img = images[i];
		hero.src = img.full;
		hero.alt = img.alt;
		credit.href = img.source;
		credit.textContent = img.credit;
		thumbs.forEach((b, j) => b.setAttribute("aria-current", String(i === j)));
	}
	show(0);
	return h("figure", { class: "gallery" }, h("div", { class: "hero" }, hero), h("figcaption", {}, h("span", { class: "credit" }, "Image: ", credit), images.length > 1 ? h("span", { class: "thumbs" }, ...thumbs) : null));
}
/** One world as a spec sheet: images, the seven-part brief, then context. */
function mountDetail(container, w, links) {
	const [prev, next] = neighbours(w);
	const figure = mountGallery(gallery(w));
	const copy = h("button", {
		type: "button",
		class: "copy"
	}, "Copy brief");
	copy.addEventListener("click", () => copyText(briefText(w), copy));
	const kin = related(w);
	const lineageLink = (id) => h("a", { href: routeHash({ filters: {
		...NO_FILTERS,
		lineage: id
	} }) || "#" }, lineageTitle(id));
	container.replaceChildren(h("nav", { class: "detail-nav" }, h("a", { href: links.index }, "← All worlds"), h("span", { class: "pager" }, h("a", {
		href: links.world(prev.id),
		rel: "prev"
	}, "← ", prev.title), h("a", {
		href: links.world(next.id),
		rel: "next"
	}, next.title, " →"))), h("header", { class: "detail-head" }, h("p", { class: "num" }, `${worldNumber(w)} · ${w.year}`), h("h1", { id: "detail-title" }, w.title), h("p", { class: "makers" }, w.makers), h("p", { class: "lineages" }, ...w.lineages.flatMap((id, i) => [i ? " · " : "", lineageLink(id)]))), figure, h("section", {
		class: "brief",
		"aria-label": "Design brief"
	}, h("header", { class: "brief-head" }, h("h2", {}, "The brief"), copy), h("dl", {}, ...BRIEF.map((a, i) => h("div", { class: `row row-${a.id}` }, h("dt", {}, h("span", { class: "n" }, String(i + 1)), a.label), h("dd", {}, answer(a, w)))))), h("section", { class: "context" }, h("div", { class: "why" }, h("h2", {}, "Why it works"), h("p", {}, w.description)), h("div", { class: "lines" }, h("h3", {}, "Draws from"), h("ul", {}, ...w.influences.map((s) => h("li", {}, s))), w.influenced.length ? h("h3", {}, "Shaped") : null, w.influenced.length ? h("ul", {}, ...w.influenced.map((s) => h("li", {}, s))) : null, kin.length ? h("h3", {}, "On this page") : null, kin.length ? h("ul", {}, ...kin.map((o) => h("li", {}, h("a", { href: links.world(o.id) }, o.title)))) : null, h("h3", {}, "See more"), h("ul", {}, ...[...outsideLinks(w), ...w.refs].map((r) => h("li", {}, h("a", {
		href: r.url,
		rel: "noopener",
		target: "_blank"
	}, r.label)))))));
	return () => container.replaceChildren();
}
//#endregion
//#region junkyard/scifi-design-languages/ui/filters.ts
/** How many worlds carry a lineage anywhere in their list. */
var lineageCount = (id) => WORLDS.filter((w) => matches(w, {
	...NO_FILTERS,
	lineage: id
})).length;
/**
* Search and lineage filters for the index. Owns no state beyond what it
* shows; every change goes out through onChange.
*/
function mountFilters(container, onChange) {
	let current = NO_FILTERS;
	const emit = (patch) => {
		current = {
			...current,
			...patch
		};
		paint();
		onChange(current);
	};
	const search = h("input", {
		type: "search",
		id: "q",
		placeholder: "neon, concrete, CRT…",
		autocomplete: "off",
		spellcheck: false
	});
	search.addEventListener("input", () => emit({ q: search.value }));
	const chips = [{
		id: "all",
		title: "All",
		n: TOTAL
	}, ...LINEAGES.map((l) => ({
		id: l.id,
		title: l.title,
		n: lineageCount(l.id)
	}))].filter((c) => c.n > 0).map((c) => {
		const b = h("button", {
			type: "button",
			class: "chip",
			"data-id": c.id
		}, c.title, h("span", { class: "chip-n" }, String(c.n)));
		b.addEventListener("click", () => emit({ lineage: current.lineage === c.id ? "all" : c.id }));
		return b;
	});
	const count = h("p", {
		class: "rail-count",
		"aria-live": "polite"
	});
	function paint() {
		if (search.value !== current.q) search.value = current.q;
		for (const b of chips) b.setAttribute("aria-pressed", String(b.dataset.id === current.lineage));
	}
	container.append(h("label", {
		class: "rail-search",
		for: "q"
	}, h("span", { class: "label" }, "Search"), search), h("div", {
		class: "chips",
		role: "group",
		"aria-label": "Lineage"
	}, ...chips), count);
	paint();
	return {
		set(f) {
			current = f;
			paint();
		},
		showCount(shown) {
			count.textContent = shown === TOTAL ? `${TOTAL} worlds` : `${shown} of ${TOTAL} worlds`;
		},
		focusSearch() {
			search.focus();
			search.select();
		}
	};
}
//#endregion
//#region junkyard/scifi-design-languages/ui/index-view.ts
function swatchStrip(w) {
	return h("span", {
		class: "strip",
		"aria-hidden": "true"
	}, ...w.palette.map((s) => h("i", { style: `background:${s.hex}` })));
}
function entry(w, href) {
	const lead = gallery(w)[0];
	const frame = h("span", { class: "entry-img" }, h("img", {
		src: lead.thumb,
		alt: "",
		loading: "lazy",
		decoding: "async"
	}));
	return h("a", {
		class: "entry",
		href: href(w.id),
		"data-id": w.id
	}, frame, swatchStrip(w), h("span", { class: "entry-meta" }, h("span", { class: "num" }, worldNumber(w)), h("span", { class: "year" }, w.year)), h("span", { class: "entry-title" }, w.title), h("span", { class: "entry-tag" }, w.tagline));
}
/** The index: every world, grouped into chapters by primary lineage. Built once, then filtered by hiding. */
function mountIndex(container, href) {
	const entries = /* @__PURE__ */ new Map();
	const sections = chapters(NO_FILTERS).map(({ lineage, worlds }) => {
		const items = worlds.map((w) => {
			const el = entry(w, href);
			entries.set(w.id, {
				el,
				world: w
			});
			return el;
		});
		return h("section", {
			class: "chapter",
			"aria-labelledby": `ch-${lineage.id}`
		}, h("header", { class: "chapter-head" }, h("h2", { id: `ch-${lineage.id}` }, lineage.title), h("p", {}, lineage.blurb)), h("div", { class: "grid" }, ...items));
	});
	const empty = h("p", {
		class: "empty",
		hidden: true
	}, "No worlds match. Try a shorter search or another lineage.");
	container.append(...sections, empty);
	return {
		apply(f) {
			let shown = 0;
			for (const { el, world } of entries.values()) {
				el.hidden = !matches(world, f);
				if (!el.hidden) shown++;
			}
			for (const s of sections) s.hidden = !s.querySelector(".entry:not([hidden])");
			empty.hidden = shown > 0;
			return shown;
		},
		frameFor: (id) => entries.get(id)?.el.querySelector(".entry-img") ?? void 0
	};
}
//#endregion
//#region junkyard/scifi-design-languages/main.ts
var BASE_TITLE = document.title;
var detailEl = byId("detail");
var indexFilters = NO_FILTERS;
var unmountDetail;
var currentWorld;
var indexScroll = 0;
var worldHref = (id) => routeHash({
	world: id,
	filters: NO_FILTERS
});
var indexHref = () => routeHash({ filters: indexFilters }) || "#";
byId("legend").append(...BRIEF.map((a) => h("li", {}, h("b", {}, a.label), " ", a.question)));
var filters = mountFilters(byId("rail"), (f) => {
	indexFilters = f;
	filters.showCount(index.apply(f));
	writeRoute({ filters: f }, "replace");
});
var index = mountIndex(byId("toc"), worldHref);
function showIndex(f) {
	unmountDetail?.();
	unmountDetail = void 0;
	currentWorld = void 0;
	document.body.dataset.view = "index";
	document.title = BASE_TITLE;
	indexFilters = f;
	filters.set(f);
	filters.showCount(index.apply(f));
}
function showDetail(id) {
	const w = findWorld(id);
	unmountDetail?.();
	currentWorld = id;
	document.body.dataset.view = "detail";
	document.title = `${w.title} · ${BASE_TITLE}`;
	unmountDetail = mountDetail(detailEl, w, {
		index: indexHref(),
		world: worldHref
	});
}
/** Morph the clicked thumbnail into the hero image (and back) where supported. */
function transition(update, worldId) {
	const start = document.startViewTransition;
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (!start || reduce || !worldId) return update();
	const thumb = index.frameFor(worldId);
	const hero = () => detailEl.querySelector(".hero");
	const tag = (el, on) => el && (el.style.viewTransitionName = on ? "sf-hero" : "");
	const toDetail = document.body.dataset.view !== "detail";
	tag(toDetail ? thumb : hero(), true);
	start.call(document, () => {
		tag(toDetail ? thumb : hero(), false);
		update();
		tag(toDetail ? hero() : thumb, true);
	}).finished.finally(() => {
		tag(thumb, false);
		tag(hero(), false);
	});
}
function render(route) {
	const world = route.world && findWorld(route.world) ? route.world : void 0;
	if (world && world === currentWorld) return;
	const wasDetail = document.body.dataset.view === "detail";
	if (world) {
		if (!wasDetail) indexScroll = window.scrollY;
		transition(() => {
			showDetail(world);
			window.scrollTo(0, 0);
		}, wasDetail ? void 0 : world);
	} else {
		const leaving = currentWorld;
		transition(() => {
			showIndex(route.filters);
			if (!wasDetail) return;
			const card = leaving && document.querySelector(`.entry[data-id="${leaving}"]`);
			if (card && !card.hidden) card.scrollIntoView({ block: "center" });
			else window.scrollTo(0, indexScroll);
		}, leaving);
	}
}
window.addEventListener("hashchange", () => render(readRoute()));
document.addEventListener("keydown", (e) => {
	const target = e.target;
	if (e.metaKey || e.ctrlKey || e.altKey || target.closest("input, textarea, select")) return;
	if (document.body.dataset.view === "index" && e.key === "/") {
		e.preventDefault();
		filters.focusSearch();
		return;
	}
	const w = findWorld(currentWorld);
	if (!w) return;
	if (e.key === "Escape") window.location.hash = indexHref();
	if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
		const [prev, next] = neighbours(w);
		writeRoute({
			world: (e.key === "ArrowLeft" ? prev : next).id,
			filters: NO_FILTERS
		}, "push");
		render(readRoute());
	}
});
var initial = readRoute();
showIndex(initial.filters);
if (initial.world && findWorld(initial.world)) showDetail(initial.world);
//#endregion

//# sourceMappingURL=main.js.map