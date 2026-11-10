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
//#region junkyard/design-almanac/data/categories.ts
/** Chapter order of the almanac. Entries are numbered in this order. */
var CATEGORIES = [
	{
		id: "layout",
		numeral: "I",
		title: "Layout",
		blurb: "How space is divided before anything is drawn in it."
	},
	{
		id: "type",
		numeral: "II",
		title: "Type",
		blurb: "Letterforms carrying voice, rhythm and hierarchy."
	},
	{
		id: "color",
		numeral: "III",
		title: "Color",
		blurb: "Palettes, light and the systems that keep them honest."
	},
	{
		id: "surface",
		numeral: "IV",
		title: "Surface",
		blurb: "Material, texture and depth: what things seem made of."
	},
	{
		id: "motion",
		numeral: "V",
		title: "Motion",
		blurb: "Change over time that explains where things went."
	},
	{
		id: "interaction",
		numeral: "VI",
		title: "Interaction",
		blurb: "Feedback loops between a hand and an interface."
	},
	{
		id: "navigation",
		numeral: "VII",
		title: "Navigation",
		blurb: "Ways of knowing where you are and getting elsewhere."
	}
];
//#endregion
//#region junkyard/design-almanac/data/styles.ts
var entry = (d) => ({
	...d,
	example: d.example ?? d.id
});
/**
* The fifty entries of the almanac, in chapter order. Every entry's
* `example` names a renderer in examples/. Kept as plain data so the
* index, detail view and search all derive from this one list.
*/
var STYLES = [
	entry({
		id: "bento-grid",
		name: "Bento grid",
		kind: "trending",
		category: "layout",
		firstSeen: "2022",
		summary: "A modular grid of tiles in deliberately unequal sizes, each holding one idea, like compartments in a bento box. Popularised by Apple keynote slides and product pages.",
		whenToUse: "Feature overviews and landing pages where several equally important facts need to be scanned at once.",
		pitfalls: "Tiles of equal visual weight flatten hierarchy. Stacking on mobile turns the grid into a long list, so decide the mobile order on purpose.",
		techniques: [
			"grid-template-areas",
			"grid-column: span 2",
			"grid-auto-flow: dense",
			"container queries per tile"
		],
		tags: [
			"grid",
			"tiles",
			"apple",
			"modular",
			"landing page"
		]
	}),
	entry({
		id: "swiss-grid",
		name: "Swiss International grid",
		kind: "mainstay",
		category: "layout",
		firstSeen: "1957",
		summary: "The International Typographic Style: asymmetric layouts on a strict modular grid, flush-left grotesk type, and photography or flat color fields instead of ornament.",
		whenToUse: "Information-heavy pages, posters, portfolios and anything that should feel objective and confident.",
		pitfalls: "Without a real grid underneath it reads as merely sparse. Ragged-right text needs careful line breaks.",
		techniques: [
			"12-column grid with named lines",
			"text-wrap: pretty",
			"hanging punctuation",
			"one red"
		],
		tags: [
			"grid",
			"helvetica",
			"modernism",
			"poster",
			"muller-brockmann"
		]
	}),
	entry({
		id: "split-screen",
		name: "Split screen",
		kind: "mainstay",
		category: "layout",
		firstSeen: "2015",
		summary: "The viewport divided into two halves of equal standing, often image against text or two contrasting choices side by side.",
		whenToUse: "Binary choices (two audiences, two products), sign-in screens, or pairing a strong image with its story.",
		pitfalls: "Two halves compete for attention; one should lead. On phones the halves must stack in a sensible order.",
		techniques: [
			"grid-template-columns: 1fr 1fr",
			"min-height: 100dvh",
			"object-fit: cover",
			"flex-direction switch at a breakpoint"
		],
		tags: [
			"halves",
			"two column",
			"comparison",
			"hero"
		]
	}),
	entry({
		id: "masonry",
		name: "Masonry",
		kind: "mainstay",
		category: "layout",
		firstSeen: "2010",
		summary: "Items of varying height packed into columns so there are no ragged gaps, the layout Pinterest made famous.",
		whenToUse: "Galleries and collections of images or notes whose heights you do not control.",
		pitfalls: "Reading order runs down columns, not across rows, which confuses keyboard users. Native CSS masonry (grid-lanes) is still emerging, so fall back to columns.",
		techniques: [
			"columns: 3 220px",
			"break-inside: avoid",
			"display: grid-lanes (emerging)",
			"aspect-ratio placeholders"
		],
		tags: [
			"pinterest",
			"gallery",
			"columns",
			"waterfall"
		]
	}),
	entry({
		id: "broken-grid",
		name: "Broken grid",
		kind: "trending",
		category: "layout",
		firstSeen: "2018",
		summary: "Elements that overlap, offset and cross gutters on purpose, so the underlying grid is felt by its violations. A counter-movement to tidy bento tiles.",
		whenToUse: "Fashion, culture and portfolio sites that want editorial energy and a sense of collage.",
		pitfalls: "Overlaps can hide content or break when text grows. It needs a strict grid first or it just looks broken.",
		techniques: [
			"overlapping grid-area lines",
			"z-index layering",
			"negative margins",
			"mix-blend-mode"
		],
		tags: [
			"asymmetric",
			"overlap",
			"editorial",
			"anti-grid"
		]
	}),
	entry({
		id: "card-layout",
		name: "Card layout",
		kind: "mainstay",
		category: "layout",
		firstSeen: "2012",
		summary: "Content broken into self-contained rectangles with a consistent anatomy: media, title, meta and action. The default of feeds and listings.",
		whenToUse: "Collections of similar, independent items such as articles, products or recipes.",
		pitfalls: "Cards around everything create noise and nesting. Make the whole card one link target, but not by nesting links.",
		techniques: [
			"repeat(auto-fill, minmax(220px, 1fr))",
			"subgrid for aligned card rows",
			"stretched link with ::after",
			"aspect-ratio media"
		],
		tags: [
			"cards",
			"feed",
			"listing",
			"grid"
		]
	}),
	entry({
		id: "app-shell",
		name: "Sidebar app shell",
		kind: "mainstay",
		category: "layout",
		firstSeen: "2008",
		summary: "A persistent sidebar for navigation, a top bar for context and a scrolling main region. The descendant of the holy grail layout, now the frame of most web apps.",
		whenToUse: "Tools people stay in for a long time and move between sections of often.",
		pitfalls: "Wasted width on large screens and a cramped main area on small ones. Plan the collapsed sidebar state.",
		techniques: [
			"grid-template: \"side top\" auto \"side main\" 1fr",
			"position: sticky",
			"overflow: auto on main only",
			"height: 100dvh"
		],
		tags: [
			"holy grail",
			"sidebar",
			"admin",
			"web app"
		]
	}),
	entry({
		id: "data-dashboard",
		name: "Data-dense dashboard",
		kind: "mainstay",
		category: "layout",
		firstSeen: "1990s",
		summary: "Many small, quiet visualisations and numbers on one screen for monitoring, in the tradition of Tufte and the trading terminal rather than big decorative KPI tiles.",
		whenToUse: "Operational views where experts compare many values at a glance and density beats whitespace.",
		pitfalls: "Decorative metrics and chartjunk. Color should flag exceptions, not decorate every series.",
		techniques: [
			"font-variant-numeric: tabular-nums",
			"inline SVG sparklines",
			"hairline tables",
			"grid with minmax(0, 1fr)"
		],
		tags: [
			"dashboard",
			"tufte",
			"sparkline",
			"monitoring",
			"tables"
		]
	}),
	entry({
		id: "container-queries",
		name: "Container-query components",
		kind: "trending",
		category: "layout",
		firstSeen: "2023",
		summary: "Components that change layout based on the width of their own slot rather than the viewport, so one card works in a sidebar and in a hero.",
		whenToUse: "Design systems and any component placed in slots of different widths.",
		pitfalls: "A container cannot query itself; you need a wrapper with container-type. Size containment can collapse unsized elements.",
		techniques: [
			"container-type: inline-size",
			"@container (width > 420px)",
			"cqi units",
			"container-name"
		],
		tags: [
			"responsive",
			"components",
			"container queries",
			"design system"
		]
	}),
	entry({
		id: "hero",
		name: "Hero with call to action",
		kind: "mainstay",
		category: "layout",
		firstSeen: "2010",
		summary: "An opening band with a headline, one sentence of support and a single primary action, sometimes paired with an image or product shot.",
		whenToUse: "Landing pages with one clear job, such as signing up or downloading.",
		pitfalls: "Oversized heroes push content below the fold and become generic. Say something specific in the headline.",
		techniques: [
			"text-wrap: balance",
			"clamp() headline size",
			"min-height in svh",
			"one primary button"
		],
		tags: [
			"landing page",
			"cta",
			"headline",
			"marketing"
		]
	}),
	entry({
		id: "scrapbook-collage",
		name: "Scrapbook collage",
		kind: "trending",
		category: "layout",
		firstSeen: "2023",
		summary: "Rotated photos, paper scraps, tape and stickers layered like a physical scrapbook, a handmade reaction to polished templates.",
		whenToUse: "Personal sites, events, music and youth brands that want warmth and personality.",
		pitfalls: "Rotated text is harder to read. Keep the real content upright and use collage for framing.",
		techniques: [
			"rotate: -3deg",
			"clip-path for torn edges",
			"filter: drop-shadow",
			"absolute positioning in a relative stage"
		],
		tags: [
			"collage",
			"stickers",
			"handmade",
			"tape",
			"zine"
		]
	}),
	entry({
		id: "editorial-serif",
		name: "Editorial serif layout",
		kind: "mainstay",
		category: "type",
		firstSeen: "1990s",
		summary: "Magazine conventions on screen: a high-contrast serif headline, a deck, a byline, generous measure and columns of text set like print.",
		whenToUse: "Long reads, journals and brands that want authority and calm.",
		pitfalls: "Thin serifs at small sizes on low-resolution screens. Keep the measure between 55 and 75 characters.",
		techniques: [
			"font-optical-sizing: auto",
			"max-width: 65ch",
			"text-wrap: pretty",
			"hyphens: auto"
		],
		tags: [
			"magazine",
			"serif",
			"long read",
			"newspaper"
		]
	}),
	entry({
		id: "kinetic-type",
		name: "Kinetic typography",
		kind: "trending",
		category: "type",
		firstSeen: "2021",
		summary: "Type that moves: letters sliding, rotating, stretching or cycling to carry rhythm and voice, borrowed from title sequences.",
		whenToUse: "Short, high-impact statements on landing pages, event sites and portfolios.",
		pitfalls: "Moving text fights reading and screen readers. Keep the real text in the DOM, animate presentation only, and stop under reduced motion.",
		techniques: [
			"per-letter spans with --i delay",
			"@keyframes with translate and rotate",
			"aria-label on the whole word",
			"prefers-reduced-motion"
		],
		tags: [
			"animation",
			"motion type",
			"title sequence",
			"letters"
		]
	}),
	entry({
		id: "variable-fonts",
		name: "Variable font play",
		kind: "trending",
		category: "type",
		firstSeen: "2018",
		summary: "One font file with continuous axes (weight, width, optical size, softness) used expressively, so type can respond to hover, scroll or size.",
		whenToUse: "Brand moments and interactive type, and also quietly for optical sizing on every serif.",
		pitfalls: "Animating axes on long text reflows the layout. Custom axes need font-variation-settings, which does not cascade per axis.",
		techniques: [
			"font-variation-settings: \"SOFT\" 100, \"WONK\" 1",
			"font-weight: 100 to 900 transitions",
			"font-optical-sizing",
			"@property for animatable axes"
		],
		tags: [
			"fonts",
			"axes",
			"weight",
			"fraunces",
			"opentype"
		]
	}),
	entry({
		id: "oversized-type",
		name: "Type as image",
		kind: "trending",
		category: "type",
		firstSeen: "2019",
		summary: "Headlines scaled until they become the main visual, cropped by the viewport, with little or no imagery.",
		whenToUse: "Portfolios, agencies and announcements where the words are the product.",
		pitfalls: "Long words overflow at small widths. Use fluid sizing based on container width and test the longest word.",
		techniques: [
			"font-size in cqi",
			"line-height: 0.85",
			"letter-spacing: -0.04em",
			"overflow: clip"
		],
		tags: [
			"big type",
			"headline",
			"typographic",
			"poster"
		]
	}),
	entry({
		id: "modular-scale",
		name: "Modular type scale",
		kind: "mainstay",
		category: "type",
		firstSeen: "2011",
		summary: "All font sizes derived from one base and one ratio (for example 1.25, a major third), so hierarchy steps feel related.",
		whenToUse: "Every design system. It is the cheapest way to make typography look intentional.",
		pitfalls: "Large ratios explode on desktop and crush on mobile. Use a smaller ratio on phones or fluid clamp() steps.",
		techniques: [
			"--step-n: calc(base * ratio^n)",
			"pow() in CSS",
			"clamp() fluid steps",
			"Utopia-style fluid scales"
		],
		tags: [
			"type scale",
			"ratio",
			"hierarchy",
			"design tokens"
		]
	}),
	entry({
		id: "drop-caps",
		name: "Drop caps and pull quotes",
		kind: "mainstay",
		category: "type",
		firstSeen: "Medieval",
		summary: "An enlarged first letter sunk into the opening paragraph, and a quotation lifted out at display size to give long text landmarks.",
		whenToUse: "Articles and essays that need entry points and rhythm.",
		pitfalls: "Drop caps that do not align to the baseline grid look accidental. Pull quotes repeat text, so hide them from screen readers.",
		techniques: [
			"initial-letter: 3",
			"::first-letter float fallback",
			"aria-hidden pull quote",
			"hanging-punctuation"
		],
		tags: [
			"initial letter",
			"quote",
			"editorial",
			"long read"
		]
	}),
	entry({
		id: "oklch-dark-mode",
		name: "Dark mode with OKLCH tokens",
		kind: "trending",
		category: "color",
		firstSeen: "2023",
		summary: "Light and dark themes generated from the same OKLCH tokens by moving lightness while keeping hue and chroma, so both themes stay perceptually balanced.",
		whenToUse: "Any interface with a dark theme. OKLCH makes tints, states and contrast predictable.",
		pitfalls: "Pure black backgrounds smear on OLED and look harsh. High chroma can fall outside sRGB, so check fallbacks.",
		techniques: [
			"oklch(0.7 0.15 250)",
			"light-dark()",
			"color-scheme: light dark",
			"color-mix(in oklch, ...)"
		],
		tags: [
			"dark mode",
			"oklch",
			"tokens",
			"theme",
			"color system"
		]
	}),
	entry({
		id: "aurora-gradient",
		name: "Aurora mesh gradient",
		kind: "trending",
		category: "color",
		firstSeen: "2021",
		summary: "Soft, blurred color fields that drift slowly behind content, like a mesh gradient or northern lights. Best used as atmosphere, not as the subject.",
		whenToUse: "A single hero or background band where a brand needs warmth without imagery.",
		pitfalls: "The default purple-blue glow is the signature of generic AI design. Pick brand hues, keep contrast for text, and avoid animating huge blurs.",
		techniques: [
			"layered radial-gradient()",
			"filter: blur() on a few blobs",
			"slow transform animations",
			"in oklch gradient interpolation"
		],
		tags: [
			"gradient",
			"mesh",
			"blur",
			"background",
			"aurora"
		]
	}),
	entry({
		id: "minimal-monochrome",
		name: "Minimal monochrome",
		kind: "mainstay",
		category: "color",
		firstSeen: "1960s",
		summary: "Black, white and grays only, with hierarchy carried entirely by type, space and contrast. The visual language of fashion houses and galleries.",
		whenToUse: "Luxury, photography and products whose content should supply all the color.",
		pitfalls: "Without color, states (error, selected) need other signals. Pure #000 on #fff is harsh for long reading.",
		techniques: [
			"a 9-step neutral ramp",
			"weight and size for hierarchy",
			"underline and inversion for states",
			"off-black text"
		],
		tags: [
			"black and white",
			"minimalism",
			"neutral",
			"gallery"
		]
	}),
	entry({
		id: "duotone",
		name: "Duotone",
		kind: "mainstay",
		category: "color",
		firstSeen: "2015",
		summary: "Photographs remapped to two colors, shadows to one and highlights to another, which unifies mismatched imagery under a brand palette.",
		whenToUse: "Campaigns and editorial sites with images from many sources.",
		pitfalls: "Low contrast pairs turn photos to mud. Faces need a light highlight color to stay recognisable.",
		techniques: [
			"grayscale + mix-blend-mode: multiply and screen",
			"SVG feColorMatrix",
			"background-blend-mode",
			"filter: url(#duotone)"
		],
		tags: [
			"photo",
			"two color",
			"spotify",
			"blend modes"
		]
	}),
	entry({
		id: "dopamine-color",
		name: "Dopamine color",
		kind: "trending",
		category: "color",
		firstSeen: "2022",
		summary: "Saturated, joyful palettes of clashing brights (tangerine, acid lime, hot pink) used in flat blocks, a reaction to years of beige minimalism.",
		whenToUse: "Consumer brands, food, events and anything aimed at play rather than trust.",
		pitfalls: "Bright backgrounds with white text fail contrast. Use dark ink on the brights and limit the palette to four.",
		techniques: [
			"flat color blocks",
			"high-chroma oklch values",
			"dark ink text on brights",
			"rounded geometric shapes"
		],
		tags: [
			"bright",
			"saturated",
			"playful",
			"color blocking"
		]
	}),
	entry({
		id: "liquid-glass",
		name: "Liquid glass",
		kind: "trending",
		category: "surface",
		firstSeen: "2025",
		summary: "Translucent panels that blur and slightly refract what is behind them, with a bright specular edge. Glassmorphism, revived and refined by Apple in 2025.",
		whenToUse: "Floating controls over rich content: toolbars, players, navigation and modals.",
		pitfalls: "backdrop-filter is expensive on mid-range phones and text contrast varies with the background. Use it on a few small surfaces only.",
		techniques: [
			"backdrop-filter: blur(16px) saturate(1.6)",
			"inset highlight box-shadow",
			"semi-transparent oklch fill",
			"SVG displacement for refraction (enhancement)"
		],
		tags: [
			"glassmorphism",
			"apple",
			"frosted",
			"blur",
			"translucent"
		]
	}),
	entry({
		id: "neubrutalism",
		name: "Neubrutalism",
		kind: "trending",
		category: "surface",
		firstSeen: "2021",
		summary: "Flat, bright fills with thick black borders and hard offset shadows that do not blur, so every element looks like a sticker. Raw, but deliberately designed.",
		whenToUse: "Startups, creative tools and products that want to look friendly and opinionated.",
		pitfalls: "Everything outlined becomes noisy. Use the hard shadow to mark interactive things only.",
		techniques: [
			"border: 3px solid #000",
			"box-shadow: 6px 6px 0 #000",
			"translate on :active to press",
			"flat saturated fills"
		],
		tags: [
			"brutalism",
			"hard shadow",
			"gumroad",
			"bold",
			"outline"
		]
	}),
	entry({
		id: "claymorphism",
		name: "Claymorphism",
		kind: "trending",
		category: "surface",
		firstSeen: "2021",
		summary: "Soft, inflated shapes in pastel colors with inner highlights and outer shadows, as if modelled from clay. Often paired with 3D illustration.",
		whenToUse: "Playful products, education and onboarding screens.",
		pitfalls: "Pastels lose contrast fast. Keep text on the flat background, not on the puffy shapes.",
		techniques: [
			"two inset box-shadows (light and dark)",
			"large border-radius",
			"pastel oklch fills",
			"outer soft shadow"
		],
		tags: [
			"clay",
			"3d",
			"pastel",
			"soft",
			"inflated"
		]
	}),
	entry({
		id: "y2k-chrome",
		name: "Y2K chrome",
		kind: "trending",
		category: "surface",
		firstSeen: "2020",
		summary: "A nostalgic revival of turn-of-the-millennium interfaces: liquid chrome type, iridescent gradients, starbursts and pixel UI chrome.",
		whenToUse: "Fashion, music and nostalgia-driven campaigns aimed at a young audience.",
		pitfalls: "Pastiche dates quickly and chrome type has poor legibility. Use it for display, never for body text.",
		techniques: [
			"background-clip: text with metallic gradients",
			"conic-gradient iridescence",
			"clip-path starbursts",
			"pixel borders"
		],
		tags: [
			"retro",
			"chrome",
			"iridescent",
			"nostalgia",
			"2000s"
		]
	}),
	entry({
		id: "grain-texture",
		name: "Grain and noise",
		kind: "trending",
		category: "surface",
		firstSeen: "2021",
		summary: "A fine film grain laid over flat color or gradients, which removes banding and makes digital surfaces feel printed and tactile.",
		whenToUse: "Gradients, hero backgrounds and illustrations that look too clean or show banding.",
		pitfalls: "Large noise PNGs cost bytes; generate it with SVG feTurbulence instead. Too much grain looks dirty.",
		techniques: [
			"SVG feTurbulence as a data URI",
			"mix-blend-mode: overlay",
			"opacity around 0.15 to 0.3",
			"pointer-events: none overlay"
		],
		tags: [
			"noise",
			"grain",
			"texture",
			"film",
			"print"
		]
	}),
	entry({
		id: "tactile-skeuomorphism",
		name: "Tactile skeuomorphism",
		kind: "trending",
		category: "surface",
		firstSeen: "2024",
		summary: "Physical-feeling controls (switches, knobs, keycaps) with real light, bevels and travel, used sparingly inside otherwise flat interfaces.",
		whenToUse: "Audio tools, hardware companions and moments where a control should feel satisfying.",
		pitfalls: "Detail costs consistency; mixed lighting directions look wrong. Pick one light source for every bevel.",
		techniques: [
			"layered gradients for bevels",
			"inset and outer shadows from one light",
			"transition on :checked",
			"appearance: none on inputs"
		],
		tags: [
			"skeuomorphic",
			"switch",
			"knob",
			"hardware",
			"teenage engineering"
		]
	}),
	entry({
		id: "material-elevation",
		name: "Material elevation",
		kind: "mainstay",
		category: "surface",
		firstSeen: "2014",
		summary: "Surfaces stacked at defined elevations with consistent shadows (or tonal tints in dark mode), where height signals importance and interactivity.",
		whenToUse: "Apps that need a clear, systematic depth model: menus over cards over the page.",
		pitfalls: "Too many levels blur the meaning. In dark mode shadows vanish, so lighten surfaces as they rise instead.",
		techniques: [
			"an elevation token scale",
			"two-layer shadows (key and ambient)",
			"surface tint via color-mix",
			"transition on hover lift"
		],
		tags: [
			"material design",
			"google",
			"shadow",
			"elevation",
			"depth"
		]
	}),
	entry({
		id: "flat-design",
		name: "Flat design",
		kind: "mainstay",
		category: "surface",
		firstSeen: "2012",
		summary: "Solid color, simple geometric icons and no gradients, textures or shadows. Born with Windows Metro and iOS 7 as a rejection of skeuomorphism.",
		whenToUse: "Interfaces that must stay light, fast and legible across many screen types.",
		pitfalls: "Without depth, buttons stop looking pressable. Keep clear affordances: color, shape and labels.",
		techniques: [
			"solid fills",
			"geometric SVG icons",
			"color for affordance",
			"consistent radius"
		],
		tags: [
			"flat",
			"metro",
			"ios 7",
			"icons",
			"minimal"
		]
	}),
	entry({
		id: "web-brutalism",
		name: "Web brutalism",
		kind: "mainstay",
		category: "surface",
		firstSeen: "2014",
		summary: "Raw HTML aesthetics: default fonts, blue links, visible structure and system borders, used to signal honesty and resist polish.",
		whenToUse: "Personal sites, art projects and manifestos where the medium is the message.",
		pitfalls: "Easily mistaken for broken. Still needs real hierarchy and accessible contrast.",
		techniques: [
			"system fonts and default link colors",
			"tables and hr as layout",
			"monospace",
			"no border-radius anywhere"
		],
		tags: [
			"brutalist",
			"raw html",
			"anti-design",
			"default styles"
		]
	}),
	entry({
		id: "squircle-corners",
		name: "Squircle corners",
		kind: "trending",
		category: "surface",
		firstSeen: "2025",
		summary: "Continuous-curvature corners (superellipses) instead of circular radii, the smooth corner of app icons, now native in CSS through corner-shape.",
		whenToUse: "Icons, avatars, buttons and cards where a softer, more refined corner is wanted.",
		pitfalls: "corner-shape is Chromium-only as of 2026. Keep border-radius as the baseline and enhance inside @supports.",
		techniques: [
			"corner-shape: squircle",
			"corner-shape: superellipse(2)",
			"@supports (corner-shape: squircle)",
			"border-radius fallback"
		],
		tags: [
			"corners",
			"superellipse",
			"icons",
			"border radius"
		]
	}),
	entry({
		id: "dithered-pixel",
		name: "Dither and pixel",
		kind: "trending",
		category: "surface",
		firstSeen: "2023",
		summary: "Ordered dithering, bitmap patterns and chunky pixels from early Mac and Game Boy screens, used as texture and illustration in modern layouts.",
		whenToUse: "Developer tools, indie games and brands that want a technical, lo-fi character.",
		pitfalls: "Scaled bitmaps blur unless rendered crisply. Dithered text is unreadable, so keep it to imagery.",
		techniques: [
			"image-rendering: pixelated",
			"repeating-conic-gradient checker",
			"small background-size patterns",
			"step() animations"
		],
		tags: [
			"pixel art",
			"dithering",
			"bitmap",
			"retro",
			"1-bit"
		]
	}),
	entry({
		id: "view-transitions",
		name: "View transition morphs",
		kind: "trending",
		category: "motion",
		firstSeen: "2023",
		summary: "The browser snapshots the page before and after a DOM change and morphs matching elements between them, so a thumbnail can grow into its detail view.",
		whenToUse: "List to detail, tab changes and reordering, where continuity explains what happened.",
		pitfalls: "Every view-transition-name must be unique at a time. Guard with feature detection and keep it short.",
		techniques: [
			"document.startViewTransition()",
			"view-transition-name",
			"::view-transition-group()",
			"prefers-reduced-motion"
		],
		tags: [
			"animation",
			"morph",
			"page transition",
			"continuity"
		]
	}),
	entry({
		id: "scroll-driven",
		name: "Scroll-driven animation",
		kind: "trending",
		category: "motion",
		firstSeen: "2023",
		summary: "Animations tied to scroll position instead of time, declared in CSS with scroll() and view() timelines and run off the main thread.",
		whenToUse: "Reading progress, reveal-on-scroll and storytelling where scroll is the clock.",
		pitfalls: "Not Baseline as of mid 2026 (Firefox behind a flag). Content must be fully visible without the animation.",
		techniques: [
			"animation-timeline: view()",
			"animation-range: entry 0% cover 40%",
			"scroll-timeline",
			"@supports (animation-timeline: view())"
		],
		tags: [
			"scroll",
			"reveal",
			"parallax",
			"timeline"
		]
	}),
	entry({
		id: "parallax",
		name: "Parallax depth",
		kind: "mainstay",
		category: "motion",
		firstSeen: "2011",
		summary: "Layers moving at different speeds as you scroll or move the pointer, which fakes depth like the background of a side-scrolling game.",
		whenToUse: "A single atmospheric scene or illustration with clear foreground and background.",
		pitfalls: "Causes motion sickness for some people and costs performance when done with scroll listeners. Respect reduced motion.",
		techniques: [
			"perspective + translateZ layers",
			"pointer-driven custom properties",
			"will-change: transform",
			"reduced-motion fallback"
		],
		tags: [
			"depth",
			"layers",
			"scroll",
			"3d"
		]
	}),
	entry({
		id: "skeleton-screens",
		name: "Skeleton screens",
		kind: "mainstay",
		category: "motion",
		firstSeen: "2013",
		summary: "Gray placeholder shapes in the layout of the coming content, often with a soft shimmer, so loading feels shorter and nothing jumps.",
		whenToUse: "Content that loads in under a few seconds and has a predictable shape.",
		pitfalls: "A skeleton that does not match the real layout causes the shift it was meant to prevent. Announce loading to screen readers.",
		techniques: [
			"linear-gradient shimmer on background-position",
			"aria-busy=\"true\"",
			"fixed aspect-ratio blocks",
			"animation pauses under reduced motion"
		],
		tags: [
			"loading",
			"placeholder",
			"shimmer",
			"perceived performance"
		]
	}),
	entry({
		id: "marquee",
		name: "Infinite marquee",
		kind: "mainstay",
		category: "motion",
		firstSeen: "1995",
		summary: "A band of text or logos scrolling endlessly, from the old marquee tag to the ticker strips of streetwear and agency sites.",
		whenToUse: "Logo walls, announcements and decorative bands that do not hold essential information.",
		pitfalls: "Moving text is hard to read and must be pausable (WCAG 2.2.2). Duplicate content should be hidden from screen readers.",
		techniques: [
			"duplicated track with translateX(-50%)",
			"animation-play-state on hover",
			"aria-hidden duplicate",
			"mask-image edge fades"
		],
		tags: [
			"ticker",
			"logos",
			"scrolling text",
			"band"
		]
	}),
	entry({
		id: "micro-interactions",
		name: "Micro-interactions",
		kind: "trending",
		category: "interaction",
		firstSeen: "2013",
		summary: "Small, single-purpose animations that confirm an action (a heart that bursts, a button that morphs into a check) and make interfaces feel alive.",
		whenToUse: "Moments of feedback: liking, saving, copying, completing a task.",
		pitfalls: "Delight that delays the user becomes friction. Keep feedback under 300ms and never block the next action.",
		techniques: [
			"transition on :active and [aria-pressed]",
			"spring-like cubic-bezier or linear()",
			"@starting-style",
			"scale and rotate keyframes"
		],
		tags: [
			"feedback",
			"animation",
			"buttons",
			"delight"
		]
	}),
	entry({
		id: "spatial-tilt",
		name: "Spatial tilt",
		kind: "trending",
		category: "interaction",
		firstSeen: "2023",
		summary: "Cards that tilt toward the pointer in 3D with a moving highlight, inspired by spatial computing and collectible card effects.",
		whenToUse: "One showcase object: a product card, a ticket, a membership pass.",
		pitfalls: "Tilting many items is distracting and pointless on touch. Keep the angle small and disable under reduced motion.",
		techniques: [
			"perspective and rotateX/rotateY from pointer position",
			"custom properties set in pointermove",
			"radial-gradient glare",
			"transform-style: preserve-3d"
		],
		tags: [
			"3d",
			"tilt",
			"hover",
			"card",
			"spatial"
		]
	}),
	entry({
		id: "anchor-popover",
		name: "Popover with anchor positioning",
		kind: "trending",
		category: "interaction",
		firstSeen: "2024",
		summary: "Menus and tooltips built on the native popover attribute and positioned against their trigger with CSS anchor positioning, with no JavaScript library.",
		whenToUse: "Menus, tooltips, pickers and any light overlay attached to a control.",
		pitfalls: "Anchor positioning is still settling across browsers; provide a reasonable fixed fallback position.",
		techniques: [
			"popover and popovertarget attributes",
			"anchor-name and position-anchor",
			"position-area: bottom",
			"@starting-style entry"
		],
		tags: [
			"popover",
			"tooltip",
			"menu",
			"anchor",
			"native"
		]
	}),
	entry({
		id: "chat-interface",
		name: "Conversational interface",
		kind: "trending",
		category: "interaction",
		firstSeen: "2023",
		summary: "A message thread with a composer at the bottom and responses that stream in token by token: the shape of nearly every AI product since 2023.",
		whenToUse: "Open-ended tasks where the user does not know the menu of options in advance.",
		pitfalls: "A blank prompt box is the hardest interface to start with. Offer suggestions, and announce streamed text politely to screen readers.",
		techniques: [
			"flex-direction: column-reverse thread",
			"aria-live=\"polite\"",
			"field-sizing: content textarea",
			"blinking caret during streaming"
		],
		tags: [
			"chat",
			"ai",
			"messages",
			"streaming",
			"assistant"
		]
	}),
	entry({
		id: "scroll-snap-carousel",
		name: "Scroll-snap carousel",
		kind: "mainstay",
		category: "interaction",
		firstSeen: "2019",
		summary: "A horizontal strip of items that snaps to each one, built on native scrolling so touch, trackpad and keyboard all work for free.",
		whenToUse: "Browsing related items on mobile, image sets and story strips.",
		pitfalls: "Hidden items are rarely seen; never put critical content off screen. Show a partial next item as a hint.",
		techniques: [
			"scroll-snap-type: x mandatory",
			"scroll-snap-align: start",
			"overscroll-behavior-x: contain",
			"scroll-padding"
		],
		tags: [
			"carousel",
			"slider",
			"swipe",
			"scroll snap"
		]
	}),
	entry({
		id: "accordion",
		name: "Accordion disclosure",
		kind: "mainstay",
		category: "interaction",
		firstSeen: "2000s",
		summary: "Stacked headings that expand to reveal their content, letting long material collapse into a scannable list.",
		whenToUse: "FAQs, settings and reference content that people scan for one answer.",
		pitfalls: "Hiding content people need to compare. Native details elements now animate height with interpolate-size.",
		techniques: [
			"details and summary",
			"name attribute for exclusive groups",
			"interpolate-size: allow-keywords",
			"::details-content"
		],
		tags: [
			"faq",
			"details",
			"collapse",
			"expand",
			"disclosure"
		]
	}),
	entry({
		id: "inline-validation",
		name: "Inline form validation",
		kind: "mainstay",
		category: "interaction",
		firstSeen: "2009",
		summary: "Fields that confirm or correct themselves as the user finishes them, with clear labels above the input and messages beside it.",
		whenToUse: "Sign-up, checkout and any form with rules the user cannot guess.",
		pitfalls: "Shouting errors before the user has finished typing. Validate on blur, and never rely on color alone.",
		techniques: [
			":user-invalid and :user-valid",
			"aria-describedby for messages",
			"pattern and required attributes",
			"accent-color"
		],
		tags: [
			"forms",
			"validation",
			"inputs",
			"errors"
		]
	}),
	entry({
		id: "sticky-header",
		name: "Sticky header",
		kind: "mainstay",
		category: "navigation",
		firstSeen: "2012",
		summary: "A header that stays pinned at the top while content scrolls beneath it, often condensing or gaining a backdrop once the page moves.",
		whenToUse: "Long pages where navigation or a primary action should always be reachable.",
		pitfalls: "Tall sticky headers steal reading space on phones. Anchor links land underneath unless scroll-padding-top is set.",
		techniques: [
			"position: sticky; top: 0",
			"scroll-padding-top",
			"backdrop-filter on scroll",
			"scroll-driven condense (enhancement)"
		],
		tags: [
			"header",
			"navbar",
			"fixed",
			"pinned"
		]
	}),
	entry({
		id: "mega-menu",
		name: "Mega menu",
		kind: "mainstay",
		category: "navigation",
		firstSeen: "2008",
		summary: "A wide dropdown that shows a whole section of the site at once, grouped into columns with headings and sometimes a featured item.",
		whenToUse: "Large sites (retail, universities, platforms) with deep but well-grouped navigation.",
		pitfalls: "Hover-only menus fail on touch and keyboard; open on click and close on Escape. Diagonal mouse paths can close the menu early.",
		techniques: [
			"button with aria-expanded",
			"grid columns of link groups",
			"focus-within to keep open",
			"Escape to close"
		],
		tags: [
			"dropdown",
			"navigation",
			"menu",
			"retail"
		]
	}),
	entry({
		id: "tabs",
		name: "Tabs",
		kind: "mainstay",
		category: "navigation",
		firstSeen: "1980s",
		summary: "A row of labels that switch between panels of related content in the same place, borrowed from the tabs of paper file folders.",
		whenToUse: "Peer views of the same object (overview, specs, reviews) that people do not need side by side.",
		pitfalls: "Too many tabs wrap or scroll and hide options. Follow the ARIA tabs pattern with arrow-key movement.",
		techniques: [
			"role=\"tablist\", \"tab\", \"tabpanel\"",
			"roving tabindex",
			"aria-selected",
			"animated indicator with anchor or transform"
		],
		tags: [
			"tabs",
			"panels",
			"segmented",
			"aria"
		]
	}),
	entry({
		id: "off-canvas-drawer",
		name: "Off-canvas drawer",
		kind: "mainstay",
		category: "navigation",
		firstSeen: "2010",
		summary: "Navigation hidden beside the viewport behind a menu button, sliding in over the content when opened. The hamburger menu.",
		whenToUse: "Small screens and secondary navigation that does not need to be visible all the time.",
		pitfalls: "Out of sight is out of mind; keep the most used destinations visible. Trap focus while open and return it on close.",
		techniques: [
			"dialog element with showModal()",
			"translate transition",
			"::backdrop",
			"inert on the page behind"
		],
		tags: [
			"hamburger",
			"menu",
			"drawer",
			"mobile nav",
			"sidebar"
		]
	}),
	entry({
		id: "command-palette",
		name: "Command palette",
		kind: "trending",
		category: "navigation",
		firstSeen: "2020",
		summary: "A keyboard-summoned search box (Cmd or Ctrl plus K) that finds pages, actions and settings by typing, borrowed from code editors.",
		whenToUse: "Power-user tools with many actions, where typing is faster than clicking through menus.",
		pitfalls: "Invisible to people who never press the shortcut; also provide a visible search button. Fuzzy matching must forgive typos.",
		techniques: [
			"dialog with an input and listbox",
			"aria-activedescendant",
			"fuzzy match with highlighted characters",
			"keyboard shortcut hint"
		],
		tags: [
			"cmd k",
			"search",
			"keyboard",
			"launcher",
			"raycast"
		]
	})
];
//#endregion
//#region junkyard/design-almanac/data/query.ts
var NO_FILTERS = {
	kind: "all",
	category: "all",
	q: ""
};
/** 1-based almanac number, fixed by position in STYLES. */
var NUMBER = new Map(STYLES.map((s, i) => [s.id, i + 1]));
var entryNumber = (s) => NUMBER.get(s.id) ?? 0;
var formatNumber = (n) => String(n).padStart(2, "0");
var findStyle = (id) => STYLES.find((s) => s.id === id);
var isCategory = (v) => CATEGORIES.some((c) => c.id === v);
var isKind = (v) => v === "trending" || v === "mainstay";
function haystack(s) {
	return [
		s.name,
		s.summary,
		s.category,
		s.firstSeen,
		s.tags.join(" "),
		s.techniques.join(" ")
	].join(" ").toLowerCase();
}
var HAYSTACK = new Map(STYLES.map((s) => [s.id, haystack(s)]));
/** Every query word must appear somewhere in the entry. */
function matches(s, f) {
	if (f.kind !== "all" && s.kind !== f.kind) return false;
	if (f.category !== "all" && s.category !== f.category) return false;
	const words = f.q.toLowerCase().split(/\s+/).filter(Boolean);
	const text = HAYSTACK.get(s.id) ?? "";
	return words.every((w) => text.includes(w));
}
/** Previous and next entries in almanac order, wrapping around. */
function neighbours(s) {
	const i = STYLES.indexOf(s);
	const n = STYLES.length;
	return {
		prev: STYLES[(i - 1 + n) % n],
		next: STYLES[(i + 1) % n]
	};
}
//#endregion
//#region junkyard/design-almanac/data/types.ts
var KIND_LABEL = {
	trending: "In season",
	mainstay: "Perennial"
};
//#endregion
//#region junkyard/design-almanac/examples/types.ts
/** Identity tag so example CSS and HTML read as code in editors. */
var css = (s, ...v) => String.raw({ raw: s }, ...v);
var html = css;
/** Run fn every ms until the signal aborts. */
function every(ms, signal, fn) {
	const id = window.setInterval(fn, ms);
	signal.addEventListener("abort", () => window.clearInterval(id));
}
function later(ms, signal, fn) {
	const id = window.setTimeout(fn, ms);
	signal.addEventListener("abort", () => window.clearTimeout(id));
}
var reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//#endregion
//#region junkyard/design-almanac/examples/color.ts
var themePanel = (mode) => `
  <div class="t ${mode}">
    <div class="head"><b>Notifications</b><small>${mode}</small></div>
    <div class="row"><span>Mentions</span><i class="sw on"></i></div>
    <div class="row"><span>Weekly digest</span><i class="sw"></i></div>
    <div class="row"><span>Product news</span><i class="sw on"></i></div>
    <button>Save changes</button>
    <div class="chips"><i style="--l:var(--bg)"></i><i style="--l:var(--surface)"></i><i style="--l:var(--line)"></i><i style="--l:var(--muted)"></i><i style="--l:var(--ink)"></i><i style="--l:var(--accent)"></i></div>
  </div>`;
var PHOTO = `<svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".02 .06" numOctaves="3" seed="4"/><feColorMatrix type="saturate" values="0"/></filter>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#777"/></linearGradient></defs>
  <rect width="200" height="250" fill="url(#sky)"/>
  <rect width="200" height="140" filter="url(#n)" opacity=".35"/>
  <circle cx="140" cy="70" r="24" fill="#fff"/>
  <path d="M0 150 L40 105 L70 130 L110 80 L150 125 L175 108 L200 130 V250 H0Z" fill="#555"/>
  <path d="M0 180 L50 150 L95 172 L140 140 L200 168 V250 H0Z" fill="#2a2a2a"/>
  <path d="M0 215 Q100 190 200 212 V250 H0Z" fill="#0d0d0d"/>
</svg>`;
var COLOR_EXAMPLES = [
	{
		id: "oklch-dark-mode",
		css: css`
      .x { --h: 255; background: oklch(0.9 0.01 var(--h)); display: grid; grid-template-rows: 1fr auto; gap: 12px; padding: 18px; font-family: 'Schibsted Grotesk', sans-serif; font-size: 13px; }
      .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: center; width: min(100%, 820px); margin: 0 auto; }
      .t { --c: 0.03; border-radius: 14px; padding: 16px; background: var(--surface); color: var(--ink); display: grid; gap: 10px; align-content: start; box-shadow: 0 0 0 1px var(--line); }
      .light { --bg: oklch(0.97 0.01 var(--h)); --surface: oklch(0.995 0.005 var(--h)); --line: oklch(0.9 0.02 var(--h)); --muted: oklch(0.55 0.03 var(--h)); --ink: oklch(0.22 0.03 var(--h)); --accent: oklch(0.55 0.17 var(--h)); --on: oklch(0.99 0.01 var(--h)); }
      .dark { --bg: oklch(0.17 0.015 var(--h)); --surface: oklch(0.23 0.02 var(--h)); --line: oklch(0.32 0.025 var(--h)); --muted: oklch(0.7 0.03 var(--h)); --ink: oklch(0.94 0.01 var(--h)); --accent: oklch(0.75 0.14 var(--h)); --on: oklch(0.18 0.02 var(--h)); }
      .head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--line); padding-bottom: 8px; }
      .head b { font: 500 18px 'Fraunces', serif; }
      .head small { font: 500 10.5px 'Spline Sans Mono', monospace; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
      .row { display: flex; justify-content: space-between; align-items: center; color: var(--ink); }
      .sw { width: 30px; height: 18px; border-radius: 99px; background: var(--line); position: relative; }
      .sw::after { content: ""; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; border-radius: 50%; background: var(--surface); box-shadow: 0 1px 2px oklch(0 0 0 / .3); }
      .sw.on { background: var(--accent); } .sw.on::after { left: 14px; }
      button { justify-self: start; border: 0; border-radius: 8px; padding: 8px 14px; background: var(--accent); color: var(--on); font: 600 13px 'Schibsted Grotesk', sans-serif; }
      .chips { display: flex; gap: 4px; margin-top: 4px; } .chips i { flex: 1; height: 16px; border-radius: 4px; background: var(--l); box-shadow: inset 0 0 0 1px oklch(0.5 0 0 / .15); }
      .ctl { display: flex; align-items: center; gap: 12px; font: 500 11px 'Spline Sans Mono', monospace; color: oklch(0.35 0.03 var(--h)); }
      .ctl input { flex: 1; accent-color: oklch(0.55 0.17 var(--h)); }
      @container (width < 520px) { .pair { grid-template-columns: 1fr; } .t { padding: 12px; gap: 7px; } .chips { display: none; } }
    `,
		html: html`<div class="x"><div class="pair">${themePanel("light")}${themePanel("dark")}</div>
      <label class="ctl">hue <input type="range" min="0" max="360" value="255"> <output>oklch(L C 255)</output></label></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const x = root.querySelector(".x");
			const input = root.querySelector("input");
			const out = root.querySelector("output");
			input.addEventListener("input", () => {
				x.style.setProperty("--h", input.value);
				out.textContent = `oklch(L C ${input.value})`;
			}, { signal });
		}
	},
	{
		id: "aurora-gradient",
		css: css`
      .x { background: #1a1410; overflow: hidden; display: grid; place-content: center; text-align: center; color: #fff4e8; font-family: 'Fraunces', serif; }
      .b { position: absolute; border-radius: 50%; filter: blur(50px); opacity: .85; mix-blend-mode: screen; }
      .b1 { width: 55%; aspect-ratio: 1; background: #ff7a3d; left: -8%; top: -20%; animation: d1 18s ease-in-out infinite alternate; }
      .b2 { width: 50%; aspect-ratio: 1; background: #e8466b; right: -6%; top: 10%; animation: d2 22s ease-in-out infinite alternate; }
      .b3 { width: 46%; aspect-ratio: 1; background: #f5c65b; left: 30%; bottom: -35%; animation: d3 20s ease-in-out infinite alternate; }
      .b4 { width: 30%; aspect-ratio: 1; background: #2f8f83; left: 8%; bottom: -10%; animation: d2 26s ease-in-out infinite alternate-reverse; opacity: .6; }
      @keyframes d1 { to { translate: 30% 25%; } } @keyframes d2 { to { translate: -25% 20%; } } @keyframes d3 { to { translate: 15% -30%; } }
      .veil { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 30%, rgb(26 20 16 / .55)); }
      .c { position: relative; padding: 0 20px; }
      small { font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .14em; text-transform: uppercase; opacity: .8; }
      h2 { margin: 10px 0 0; font-weight: 300; font-size: clamp(36px, 7cqw, 80px); line-height: 1; letter-spacing: -.02em; }
      h2 em { font-weight: 500; }
    `,
		html: html`<div class="x"><i class="b b1"></i><i class="b b2"></i><i class="b b3"></i><i class="b b4"></i><i class="veil"></i>
      <div class="c"><small>Solstice festival · June 21</small><h2>The longest <em>evening</em><br>of the year</h2></div></div>`
	},
	{
		id: "minimal-monochrome",
		css: css`
      .x { background: #fff; color: #111; display: grid; grid-template-columns: 1.1fr 1fr; font-family: 'Schibsted Grotesk', sans-serif; }
      .img { background: linear-gradient(180deg, #e9e9e7, #cfcfcc); position: relative; }
      .img::after { content: ""; position: absolute; left: 50%; top: 50%; translate: -50% -46%; width: 40%; aspect-ratio: 3 / 4; background: linear-gradient(160deg, #3a3a3a, #111); border-radius: 46% 46% 8px 8px / 30% 30% 8px 8px; box-shadow: 0 30px 40px -20px rgb(0 0 0 / .5); }
      .info { padding: 28px clamp(18px, 4cqw, 44px); display: flex; flex-direction: column; justify-content: center; gap: 14px; }
      .k { font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #777; }
      h3 { margin: 0; font: 400 clamp(26px, 4.4cqw, 40px)/1.05 'Fraunces', serif; letter-spacing: -.01em; }
      .price { font-size: 15px; }
      .sizes { display: flex; gap: 6px; } .sizes span { width: 38px; height: 38px; display: grid; place-items: center; border: 1px solid #ccc; font-size: 12px; }
      .sizes span.on { background: #111; color: #fff; border-color: #111; } .sizes span.out { color: #bbb; text-decoration: line-through; }
      .btn { margin-top: 6px; background: #111; color: #fff; text-align: center; padding: 13px; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; }
      .note { font-size: 12px; color: #777; }
      @container (width < 520px) { .x { grid-template-columns: 1fr; grid-template-rows: 40% 1fr; } .info { padding: 16px; gap: 8px; } }
    `,
		html: html`<div class="x"><div class="img"></div><div class="info">
      <div class="k">Outerwear · 03</div><h3>Wool overcoat, double faced</h3><div class="price">€ 640</div>
      <div class="sizes"><span>44</span><span class="on">46</span><span>48</span><span class="out">50</span><span>52</span></div>
      <div class="btn">Add to bag</div><div class="note">Made in Biella. Free returns within 30 days.</div></div></div>`
	},
	{
		id: "duotone",
		css: css`
      .x { background: #111; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-family: 'Schibsted Grotesk', sans-serif; }
      .d { position: relative; overflow: hidden; isolation: isolate; background: var(--hi); }
      .d svg { position: absolute; inset: 0; width: 100%; height: 100%; mix-blend-mode: multiply; filter: contrast(1.1); }
      .d::after { content: ""; position: absolute; inset: 0; background: var(--lo); mix-blend-mode: lighten; }
      .d span { position: absolute; left: 12px; bottom: 10px; z-index: 2; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: var(--hi); mix-blend-mode: normal; }
      @container (width < 520px) { .x { grid-template-columns: 1fr 1fr; } .d:nth-child(3) { display: none; } }
    `,
		html: html`<div class="x">
      <div class="d" style="--hi:#ffd166;--lo:#3a0ca3">${PHOTO}<span>Gold / indigo</span></div>
      <div class="d" style="--hi:#ff8fab;--lo:#0b3d2e">${PHOTO}<span>Rose / pine</span></div>
      <div class="d" style="--hi:#e9f5db;--lo:#c1121f">${PHOTO}<span>Mint / signal</span></div>
    </div>`
	},
	{
		id: "dopamine-color",
		css: css`
      .x { background: #ff7a1a; display: grid; grid-template-columns: 1.2fr 1fr 1fr; grid-template-rows: 1fr 1fr; font-family: 'Bricolage Grotesque', sans-serif; color: #1a1033; }
      .x > * { position: relative; overflow: hidden; }
      .a { grid-row: 1 / 3; background: #ff7a1a; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; }
      .a h2 { margin: 0; font-size: clamp(40px, 8.5cqw, 96px); line-height: .88; letter-spacing: -.04em; font-weight: 800; }
      .a p { margin: 0; font: 500 14px/1.35 'Schibsted Grotesk', sans-serif; max-width: 22ch; }
      .b { background: #ff5fa8; } .b::after { content: ""; position: absolute; inset: 18% 18% -40%; border-radius: 50% 50% 0 0; background: #2d3bff; }
      .c { background: #c6f432; } .c::after { content: ""; position: absolute; width: 70%; aspect-ratio: 1; border-radius: 50%; background: #1a1033; left: 15%; top: 15%; box-shadow: 0 0 0 14px #c6f432, 0 0 0 28px #ff5fa8; }
      .d { background: #2d3bff; } .d::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, #ffd23f 0 14px, transparent 0 28px); clip-path: circle(40% at 50% 50%); }
      .e { background: #ffd23f; display: grid; place-items: center; font-size: clamp(22px, 4cqw, 40px); font-weight: 800; letter-spacing: -.03em; }
    `,
		html: html`<div class="x"><div class="a"><h2>Make it loud.</h2><p>Summer menu, out now. Mango chili, yuzu soda, black sesame soft serve.</p></div><div class="b"></div><div class="c"></div><div class="d"></div><div class="e">-30%</div></div>`
	}
];
//#endregion
//#region junkyard/design-almanac/examples/interaction.ts
var SLIDES = [
	[
		"Kyoto",
		"Moss gardens and early trains",
		"#5f7a52,#c8d4a3"
	],
	[
		"Oaxaca",
		"Mole, mezcal, markets",
		"#b84a2e,#f0b46a"
	],
	[
		"Tromsø",
		"Northern lights in March",
		"#1f3550,#6fb0a8"
	],
	[
		"Matera",
		"Cave hotels and quiet",
		"#a88563,#efdcc0"
	],
	[
		"Hobart",
		"Cold water, warm bread",
		"#2c4a5e,#a8c3cf"
	]
];
var ANSWER = "Start with the floor plan, not the furniture. Measure the room, mark where light enters, then place the largest piece where you want the eye to land first.";
var INTERACTION_EXAMPLES = [
	{
		id: "micro-interactions",
		css: css`
      .x { background: #faf7f2; display: grid; place-content: center; gap: 26px; font-family: 'Schibsted Grotesk', sans-serif; color: #24201b; }
      .row { display: flex; gap: 22px; justify-content: center; align-items: center; flex-wrap: wrap; }
      button { border: 1px solid #e3ddd3; background: #fff; border-radius: 99px; height: 52px; padding: 0 20px; display: inline-flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; color: #24201b; position: relative; transition: scale .15s, background .2s, border-color .2s; }
      button:active { scale: .94; }
      .heart svg { width: 22px; height: 22px; transition: scale .35s cubic-bezier(.3,1.8,.5,1); }
      .heart path { fill: none; stroke: #24201b; stroke-width: 2; transition: fill .2s, stroke .2s; }
      .heart[aria-pressed=true] path { fill: #ef3e36; stroke: #ef3e36; }
      .heart[aria-pressed=true] svg { scale: 1.2; }
      .heart i { position: absolute; left: 31px; top: 50%; width: 6px; height: 6px; border-radius: 50%; background: #ef3e36; opacity: 0; }
      .heart[aria-pressed=true] i { animation: burst .5s ease-out; }
      .heart i:nth-of-type(1) { --a: 0deg; } .heart i:nth-of-type(2) { --a: 60deg; } .heart i:nth-of-type(3) { --a: 120deg; } .heart i:nth-of-type(4) { --a: 180deg; } .heart i:nth-of-type(5) { --a: 240deg; } .heart i:nth-of-type(6) { --a: 300deg; }
      @keyframes burst { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--a)) translateY(0); } 100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--a)) translateY(-26px) scale(.3); } }
      .copy { min-width: 150px; justify-content: center; overflow: hidden; }
      .copy span { transition: translate .3s cubic-bezier(.2,.8,.2,1), opacity .2s; }
      .copy .ok { position: absolute; translate: 0 120%; opacity: 0; color: #1f7a4d; }
      .copy[data-done] .ok { translate: 0 0; opacity: 1; } .copy[data-done] .lb { translate: 0 -120%; opacity: 0; }
      .copy[data-done] { border-color: #9bd1b4; background: #eefaf3; }
      .tog { width: 64px; padding: 0; justify-content: flex-start; background: #e9e4da; border: 0; }
      .tog::after { content: ""; position: absolute; left: 6px; width: 40px; height: 40px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgb(0 0 0 / .18); transition: left .35s cubic-bezier(.3,1.5,.5,1), width .15s; }
      .tog:active::after { width: 48px; }
      .tog[aria-pressed=true] { background: #24201b; } .tog[aria-pressed=true]::after { left: 18px; }
      .tog { width: 76px; }
      p { margin: 0; text-align: center; font-size: 12.5px; color: #8b8478; }
      @container (width > 600px) { .row, p { zoom: 1.5; } }
    `,
		html: html`<div class="x"><div class="row">
      <button class="heart" aria-pressed="true" aria-label="Like"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><i></i><i></i><i></i><i></i><i></i><i></i>128</button>
      <button class="copy"><span class="lb">Copy link</span><span class="ok">Copied</span></button>
      <button class="tog" aria-pressed="false" aria-label="Notifications"></button>
    </div><p>Each control answers within 300ms, then gets out of the way.</p></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			root.querySelectorAll("[aria-pressed]").forEach((b) => b.addEventListener("click", () => b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")), { signal }));
			const copy = root.querySelector(".copy");
			copy.addEventListener("click", () => {
				copy.toggleAttribute("data-done", true);
				later(1400, signal, () => copy.removeAttribute("data-done"));
			}, { signal });
		}
	},
	{
		id: "spatial-tilt",
		css: css`
      .x { background: radial-gradient(circle at 50% 30%, #2c2a3a, #121118); display: grid; place-items: center; perspective: 900px; font-family: 'Schibsted Grotesk', sans-serif; --rx: 0deg; --ry: 0deg; --gx: 50%; --gy: 30%; }
      .card { width: min(80%, 340px); aspect-ratio: 1.586; border-radius: 18px; position: relative; overflow: hidden; color: #f4efe6; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;
        background: linear-gradient(135deg, #3d3557, #1d1a2b 50%, #4a2f3a); box-shadow: 0 30px 60px -20px rgb(0 0 0 / .7), inset 0 1px 0 rgb(255 255 255 / .2);
        transform: rotateX(var(--rx)) rotateY(var(--ry)); transition: transform .15s ease-out; transform-style: preserve-3d; animation: idle 6s ease-in-out infinite; }
      :host([data-interactive]) .card { animation: none; }
      @keyframes idle { 0%, 100% { transform: rotateX(8deg) rotateY(-12deg); } 50% { transform: rotateX(-6deg) rotateY(12deg); } }
      .card::after { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at var(--gx) var(--gy), rgb(255 255 255 / .28), transparent 45%); mix-blend-mode: overlay; pointer-events: none; }
      .top { display: flex; justify-content: space-between; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .14em; text-transform: uppercase; opacity: .8; }
      .chip { width: 38px; height: 28px; border-radius: 6px; background: linear-gradient(135deg, #e8c77a, #b48a3c); }
      b { font: 400 24px 'Fraunces', serif; } .num { font: 500 13px 'Spline Sans Mono', monospace; letter-spacing: .12em; opacity: .85; }
    `,
		html: html`<div class="x"><div class="card"><div class="top"><span>Members</span><span>No. 0042</span></div><div class="chip"></div><div><b>Greenhouse Society</b><div class="num">VALID THRU 10/27</div></div></div></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive || reducedMotion()) return;
			const x = root.querySelector(".x");
			x.addEventListener("pointermove", (e) => {
				const r = x.getBoundingClientRect();
				const px = (e.clientX - r.left) / r.width;
				const py = (e.clientY - r.top) / r.height;
				x.style.setProperty("--ry", `${((px - .5) * 22).toFixed(2)}deg`);
				x.style.setProperty("--rx", `${((.5 - py) * 18).toFixed(2)}deg`);
				x.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
				x.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
			}, { signal });
			x.addEventListener("pointerleave", () => ["--rx", "--ry"].forEach((p) => x.style.setProperty(p, "0deg")), { signal });
		}
	},
	{
		id: "anchor-popover",
		css: css`
      .x { background: #f4f2ed; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #22201c; }
      .bar { display: flex; gap: 6px; background: #fff; border-radius: 12px; padding: 6px; box-shadow: 0 0 0 1px #e3dfd6; width: max-content; max-width: 100%; }
      .bar button { border: 0; background: transparent; padding: 8px 12px; border-radius: 8px; font-size: 13.5px; color: inherit; }
      .bar button:hover, .bar button.on { background: #f0ece4; }
      #share { anchor-name: --share; } #more { anchor-name: --more; }
      .menu { margin: 0; border: 0; padding: 6px; border-radius: 12px; background: #fff; box-shadow: 0 0 0 1px #e3dfd6, 0 12px 30px -8px rgb(40 30 20 / .25); min-width: 200px; font-size: 13.5px; color: #22201c; font-family: 'Schibsted Grotesk', sans-serif; }
      .menu a { display: flex; justify-content: space-between; padding: 8px 10px; border-radius: 8px; color: inherit; text-decoration: none; }
      .menu a:hover { background: #f0ece4; } .menu kbd { font: 11px 'Spline Sans Mono', monospace; color: #8c867a; }
      .menu hr { border: 0; border-top: 1px solid #ece8e0; margin: 4px 0; }
      [popover].menu { position-area: bottom span-right; margin-top: 6px; opacity: 1; transition: opacity .15s, translate .15s, display .15s allow-discrete, overlay .15s allow-discrete; }
      [popover].menu:not(:popover-open) { opacity: 0; translate: 0 -4px; }
      @starting-style { [popover].menu:popover-open { opacity: 0; translate: 0 -4px; } }
      #m-share { position-anchor: --share; } #m-more { position-anchor: --more; }
      .static { position: absolute; left: 98px; top: 74px; }
      :host([data-interactive]) .static { display: none; }
      .doc { margin-top: 22px; display: grid; gap: 10px; max-width: 520px; } .doc i { height: 10px; border-radius: 4px; background: #e5e1d8; } .doc i:nth-child(1) { width: 60%; height: 18px; background: #d6d1c6; } .doc i:nth-child(4) { width: 80%; }
      .hint { position: absolute; bottom: 12px; left: 22px; font: 11px 'Spline Sans Mono', monospace; color: #8c867a; }
    `,
		html: html`<div class="x"><div class="bar"><button>Edit</button><button id="share" class="on" popovertarget="m-share">Share</button><button>Comment</button><button id="more" popovertarget="m-more">More</button></div>
      <div class="doc"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="menu static" aria-hidden="true"><a href="#">Copy link <kbd>⌘L</kbd></a><a href="#">Invite people</a><a href="#">Publish to web</a><hr><a href="#">Export PDF</a></div>
      <div class="menu" id="m-share" popover><a href="#">Copy link <kbd>⌘L</kbd></a><a href="#">Invite people</a><a href="#">Publish to web</a><hr><a href="#">Export PDF</a></div>
      <div class="menu" id="m-more" popover><a href="#">Duplicate</a><a href="#">Version history</a><hr><a href="#">Move to trash</a></div>
      <span class="hint">popover + anchor-name, no positioning script</span></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			root.querySelector("#share")?.classList.remove("on");
			root.querySelectorAll(".menu a").forEach((a) => a.addEventListener("click", (e) => e.preventDefault(), { signal }));
		}
	},
	{
		id: "chat-interface",
		css: css`
      .x { background: #f7f5f1; display: grid; grid-template-rows: 1fr auto; font-family: 'Schibsted Grotesk', sans-serif; color: #24211c; font-size: 14px; }
      .th { overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; gap: 14px; padding: 18px clamp(16px, 8cqw, 120px); }
      .u { align-self: flex-end; background: #24211c; color: #f7f5f1; padding: 10px 14px; border-radius: 16px 16px 4px 16px; max-width: 70%; }
      .a { display: grid; grid-template-columns: 26px 1fr; gap: 10px; max-width: 80%; line-height: 1.5; }
      .a i { width: 26px; height: 26px; border-radius: 8px; background: conic-gradient(from 45deg, #d97745, #e8b04a, #d97745); }
      .caret { display: inline-block; width: 8px; height: 15px; background: #d97745; vertical-align: -2px; margin-left: 2px; animation: b 1s steps(1) infinite; }
      @keyframes b { 50% { opacity: 0; } }
      .sug { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 clamp(16px, 8cqw, 120px) 10px; }
      .sug span { border: 1px solid #ddd7cc; border-radius: 99px; padding: 5px 12px; font-size: 12.5px; color: #615b51; }
      .cmp { margin: 0 clamp(16px, 8cqw, 120px) 16px; background: #fff; border-radius: 16px; box-shadow: 0 0 0 1px #e4dfd5, 0 4px 14px rgb(40 30 20 / .06); display: flex; align-items: center; padding: 8px 8px 8px 16px; gap: 8px; }
      .cmp span { flex: 1; color: #9a9387; }
      .cmp b { width: 34px; height: 34px; border-radius: 10px; background: #24211c; display: grid; place-items: center; }
      .cmp b::after { content: ""; border-bottom: 9px solid #fff; border-inline: 6px solid transparent; }
    `,
		html: html`<div class="x"><div class="th" aria-live="polite">
      <div class="u">How should I arrange a small living room?</div>
      <div class="a"><i></i><div class="msg">${ANSWER}<span class="caret"></span></div></div>
    </div><div><div class="sug"><span>Make it feel bigger</span><span>Where does the TV go?</span><span>Rug sizes</span></div><div class="cmp"><span>Ask a follow-up…</span><b></b></div></div></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive || reducedMotion()) return;
			const msg = root.querySelector(".msg");
			const caret = msg.querySelector(".caret");
			const words = ANSWER.split(" ");
			let i = 0;
			const tick = () => {
				i = i >= words.length + 12 ? 0 : i + 1;
				msg.firstChild.textContent = words.slice(0, Math.min(i, words.length)).join(" ") + " ";
				later(i === 0 ? 400 : 70 + Math.random() * 60, signal, tick);
			};
			msg.replaceChildren(document.createTextNode(""), caret);
			tick();
		}
	},
	{
		id: "scroll-snap-carousel",
		css: css`
      .x { background: #efeae1; display: grid; grid-template-rows: auto 1fr; gap: 12px; padding: 18px 0; font-family: 'Schibsted Grotesk', sans-serif; color: #22201c; }
      .hd { display: flex; justify-content: space-between; align-items: end; padding: 0 20px; }
      .hd b { font: 400 26px 'Fraunces', serif; }
      .hd div { display: flex; gap: 6px; }
      .hd button { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #c9c2b5; background: transparent; font-size: 16px; color: inherit; }
      .tr { display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 20px; padding: 0 20px 10px; overscroll-behavior-x: contain; scrollbar-width: none; }
      .s { flex: 0 0 min(62%, 300px); scroll-snap-align: start; border-radius: 14px; background: linear-gradient(160deg, var(--g)); display: flex; flex-direction: column; justify-content: flex-end; padding: 16px; color: #fff; }
      .s b { font: 400 26px 'Fraunces', serif; } .s span { font-size: 13px; opacity: .9; }
    `,
		html: html`<div class="x"><div class="hd"><b>Slow places</b><div><button data-d="-1" aria-label="Previous">←</button><button data-d="1" aria-label="Next">→</button></div></div>
      <div class="tr">${SLIDES.map(([n, t, g]) => `<div class="s" style="--g:${g}"><b>${n}</b><span>${t}</span></div>`).join("")}</div></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const track = root.querySelector(".tr");
			root.querySelectorAll("button[data-d]").forEach((b) => b.addEventListener("click", () => track.scrollBy({
				left: Number(b.dataset.d) * track.clientWidth * .6,
				behavior: "smooth"
			}), { signal }));
		}
	},
	{
		id: "accordion",
		css: css`
      .x { background: #fbf9f5; padding: 22px clamp(18px, 8cqw, 120px); font-family: 'Schibsted Grotesk', sans-serif; color: #24211c; overflow: hidden; interpolate-size: allow-keywords; }
      h3 { margin: 0 0 10px; font: 400 26px 'Fraunces', serif; }
      details { border-top: 1px solid #ddd6ca; } details:last-of-type { border-bottom: 1px solid #ddd6ca; }
      summary { list-style: none; cursor: pointer; padding: 13px 0; display: flex; justify-content: space-between; font-weight: 600; font-size: 15px; }
      summary::-webkit-details-marker { display: none; }
      summary::after { content: "+"; font: 300 22px/1 'Fraunces', serif; transition: rotate .25s; }
      details[open] summary::after { rotate: 45deg; color: #b4532a; }
      details::details-content { block-size: 0; overflow: clip; transition: block-size .3s ease, content-visibility .3s allow-discrete; }
      details[open]::details-content { block-size: auto; }
      p { margin: 0 0 14px; color: #5f594f; font-size: 14px; line-height: 1.5; max-width: 60ch; }
    `,
		html: html`<div class="x"><h3>Questions, answered</h3>
      <details name="faq" open><summary>Can I change my plan later?</summary><p>Yes. Upgrades apply immediately; downgrades take effect at the end of the billing period, and unused time is credited.</p></details>
      <details name="faq"><summary>Do you offer refunds?</summary><p>Within 30 days of purchase, for any reason. Email us and we will process it within two working days.</p></details>
      <details name="faq"><summary>Where is my data stored?</summary><p>In the EU (Frankfurt), encrypted at rest and in transit. You can export everything at any time.</p></details>
      <details name="faq"><summary>Is there a student discount?</summary><p>Half price with a valid student email, renewed each year.</p></details></div>`
	},
	{
		id: "inline-validation",
		css: css`
      .x { background: #f6f4ef; display: grid; place-items: center; padding: 18px; font-family: 'Schibsted Grotesk', sans-serif; color: #24211c; }
      form { width: min(100%, 380px); display: grid; gap: 14px; background: #fff; padding: 22px; border-radius: 14px; box-shadow: 0 0 0 1px #e4dfd5; }
      h3 { margin: 0 0 2px; font: 400 24px 'Fraunces', serif; }
      .f { display: grid; gap: 5px; }
      label { font-size: 13px; font-weight: 600; }
      .w { position: relative; }
      input { width: 100%; font: 14px 'Schibsted Grotesk', sans-serif; padding: 10px 34px 10px 12px; border: 1.5px solid #d7d1c6; border-radius: 9px; background: #fff; color: inherit; outline: none; transition: border-color .15s, box-shadow .15s; }
      input:focus { border-color: #24211c; box-shadow: 0 0 0 3px rgb(36 33 28 / .1); }
      .w::after { position: absolute; right: 11px; top: 50%; translate: 0 -50%; font-size: 14px; font-weight: 700; }
      .msg { font-size: 12.5px; min-height: 1em; color: #77716a; }
      .f[data-state=valid] input, .f:has(input:user-valid) input { border-color: #2f8a57; }
      .f[data-state=valid] .w::after, .f:has(input:user-valid) .w::after { content: "✓"; color: #2f8a57; }
      .f[data-state=invalid] input, .f:has(input:user-invalid) input { border-color: #c63d2f; background: #fff8f6; }
      .f[data-state=invalid] .w::after, .f:has(input:user-invalid) .w::after { content: "!"; color: #c63d2f; }
      .f[data-state=invalid] .msg, .f:has(input:user-invalid) .msg { color: #c63d2f; }
      button { border: 0; border-radius: 9px; padding: 11px; background: #24211c; color: #fff; font-weight: 600; font-size: 14px; }
    `,
		html: html`<div class="x"><form novalidate><h3>Create account</h3>
      <div class="f" data-state="valid"><label for="n">Name</label><div class="w"><input id="n" required value="Ada Lovelace" aria-describedby="nm"></div><span class="msg" id="nm"></span></div>
      <div class="f" data-state="invalid"><label for="e">Email</label><div class="w"><input id="e" type="email" required value="ada@" aria-describedby="em"></div><span class="msg" id="em">Add the domain after the @, like ada@example.com</span></div>
      <div class="f"><label for="p">Password</label><div class="w"><input id="p" type="password" required minlength="10" aria-describedby="pm"></div><span class="msg" id="pm">At least 10 characters</span></div>
      <button type="submit">Continue</button></form></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			root.querySelector("form").addEventListener("submit", (e) => e.preventDefault(), { signal });
			root.querySelectorAll("input").forEach((input) => input.addEventListener("input", () => input.closest(".f").removeAttribute("data-state"), {
				signal,
				once: true
			}));
		}
	}
];
//#endregion
//#region junkyard/design-almanac/examples/layout.ts
var spark = (pts, w = 80, h = 22) => {
	const max = Math.max(...pts);
	const min = Math.min(...pts);
	const step = w / (pts.length - 1);
	const d = pts.map((p, i) => `${(i * step).toFixed(1)},${(h - (p - min) / (max - min || 1) * h).toFixed(1)}`).join(" ");
	return `<svg viewBox="-1 -1 ${w + 2} ${h + 2}" width="${w}" height="${h}" aria-hidden="true"><polyline points="${d}" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></svg>`;
};
var LAYOUT_EXAMPLES = [
	{
		id: "bento-grid",
		css: css`
      .x { background: #ece8e1; display: grid; place-items: center; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #17140f; }
      .g { width: min(100%, 860px); height: min(100%, 520px); display: grid; gap: 10px;
        grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr);
        grid-template-areas: "a a b c" "a a d d" "e f d d"; }
      .t { border-radius: 18px; background: #fbfaf7; padding: 16px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
      .t small { font: 500 11px/1.2 'Spline Sans Mono', monospace; letter-spacing: .06em; text-transform: uppercase; opacity: .6; }
      .a { grid-area: a; background: #17140f; color: #fbfaf7; }
      .a b { font: 600 clamp(48px, 13cqw, 120px)/.85 'Bricolage Grotesque', sans-serif; letter-spacing: -.04em; }
      .a p { margin: 0; max-width: 22ch; font-size: 14px; opacity: .7; }
      .b { grid-area: b; background: #ff5b1f; color: #17140f; }
      .b b, .c b { font: 600 34px/1 'Bricolage Grotesque', sans-serif; }
      .c { grid-area: c; }
      .d { grid-area: d; }
      .bars { display: flex; align-items: end; gap: 6px; height: 60%; }
      .bars i { flex: 1; background: #17140f; border-radius: 4px 4px 0 0; height: var(--v); }
      .bars i:nth-child(9) { background: #ff5b1f; }
      .e { grid-area: e; background: #d9d3c7; }
      .f { grid-area: f; place-items: center; display: grid; }
      .ring { width: 64px; aspect-ratio: 1; border-radius: 50%; background: conic-gradient(#ff5b1f 0 72%, #e3ded4 0); mask: radial-gradient(circle, transparent 54%, #000 55%); }
      .e b { font: 600 22px/1.1 'Bricolage Grotesque', sans-serif; }
      @container (width < 560px) {
        .g { grid-template-columns: 1fr 1fr; grid-template-rows: 1.4fr 1fr 1fr 1fr; grid-template-areas: "a a" "b c" "d d" "e f"; }
        .t { padding: 12px; border-radius: 14px; }
        .a b { font-size: 56px; } .a p { display: none; }
        .b b, .c b { font-size: 24px; } .e b { font-size: 16px; }
        .ring { width: 40px; }
      }
    `,
		html: html`<div class="x"><div class="g">
      <div class="t a"><small>Battery</small><div><b>22h</b><p>A full day of video, then some. Charges to half in thirty minutes.</p></div></div>
      <div class="t b"><small>Weight</small><b>1.24 kg</b></div>
      <div class="t c"><small>Display</small><b>14.2″</b></div>
      <div class="t d"><small>Render time vs last gen</small><div class="bars">
        <i style="--v:30%"></i><i style="--v:38%"></i><i style="--v:34%"></i><i style="--v:46%"></i><i style="--v:52%"></i><i style="--v:49%"></i><i style="--v:63%"></i><i style="--v:70%"></i><i style="--v:96%"></i></div></div>
      <div class="t e"><small>Ports</small><b>3 × USB-C<br>HDMI, SD</b></div>
      <div class="t f"><div class="ring" aria-label="72 percent recycled"></div><small>72% recycled</small></div>
    </div></div>`
	},
	{
		id: "swiss-grid",
		css: css`
      .x { background: #f3f0e8; color: #111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 28px 32px;
        display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: auto 1fr auto; column-gap: 16px;
        background-image: repeating-linear-gradient(90deg, transparent 0 calc((100% - 80px) / 6), rgb(0 0 0 / .05) 0 calc((100% - 80px) / 6 + 16px)); background-origin: content-box; }
      .top { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; font-size: 11px; line-height: 1.35; border-top: 3px solid #111; padding-top: 8px; }
      .top span:nth-child(1) { grid-column: 1 / 3; font-weight: 700; }
      .top span:nth-child(2) { grid-column: 3 / 5; }
      .top span:nth-child(3) { grid-column: 5 / 7; }
      h2 { grid-column: 1 / 6; align-self: end; margin: 0; font-weight: 700; font-size: clamp(40px, min(11.5cqw, 17cqh), 128px); line-height: .88; letter-spacing: -.045em; }
      .dot { grid-column: 5 / 7; grid-row: 2; justify-self: end; align-self: start; width: clamp(80px, 22cqw, 220px); aspect-ratio: 1; border-radius: 50%; background: #e3261b; margin-top: 18px; }
      .cols { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; font-size: 11.5px; line-height: 1.4; margin-top: 18px; }
      .cols p { margin: 0; grid-column: span 2; }
      .cols p:first-child { font-weight: 700; }
      @container (width < 560px) { .cols p:nth-child(3), .top span:nth-child(2) { display: none; } .cols p { grid-column: span 3; } .top span:nth-child(1) { grid-column: 1 / 4; } .top span:nth-child(3) { grid-column: 4 / 7; } }
    `,
		html: html`<div class="x">
      <div class="top"><span>Kunstgewerbemuseum Zürich</span><span>Ausstellung 12.3 bis 30.4</span><span>Di bis So 10 bis 18 Uhr</span></div>
      <div class="dot"></div>
      <h2>Der Film<br>und die<br>Form</h2>
      <div class="cols"><p>Objective, asymmetric, set flush left on a six column grid.</p><p>Hierarchy from size and weight alone; one red for emphasis.</p><p>No ornament. White space is a structural element, not a leftover.</p></div>
    </div>`
	},
	{
		id: "split-screen",
		css: css`
      .x { display: flex; font-family: 'Schibsted Grotesk', sans-serif; }
      .h { flex: 1; transition: flex-grow .6s cubic-bezier(.2,.8,.2,1); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 28px; min-width: 0; }
      .h:hover { flex-grow: 1.6; }
      .l { background: linear-gradient(180deg, #f7c59f 0%, #f29e6d 38%, #c75b39 60%, #3c2a2a 100%); color: #fff6ec; }
      .l::before { content: ""; position: absolute; left: 50%; top: 34%; width: 90px; aspect-ratio: 1; translate: -50% 0; border-radius: 50%; background: #fff2d9; box-shadow: 0 0 60px 20px rgb(255 230 190 / .5); }
      .l::after { content: ""; position: absolute; inset: 52% -10% 0; background: #2b1d1f; clip-path: polygon(0 40%, 18% 18%, 34% 34%, 52% 6%, 70% 30%, 86% 14%, 100% 32%, 100% 100%, 0 100%); }
      .r { background: #f2efe8; color: #1b1a17; }
      .h > * { position: relative; z-index: 1; }
      small { font: 500 11px/1 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; opacity: .7; }
      h3 { font: 400 clamp(30px, 5.4cqw, 54px)/1 'Fraunces', serif; margin: 10px 0 8px; letter-spacing: -.02em; }
      p { margin: 0 0 18px; max-width: 30ch; font-size: 14px; line-height: 1.45; opacity: .85; }
      a { align-self: start; color: inherit; font-weight: 600; font-size: 14px; text-decoration: none; border-bottom: 1.5px solid; padding-bottom: 2px; }
      @container (width < 520px) { .x { flex-direction: column; } .h { padding: 20px; } .l::before { top: 12%; width: 60px; } .l::after { inset: 40% -10% 0; } }
    `,
		html: html`<div class="x">
      <section class="h l"><small>Travellers</small><h3>Go somewhere slow</h3><p>Small trains, long dinners, rooms with shutters.</p><a href="#">Plan a trip</a></section>
      <section class="h r"><small>Hosts</small><h3>Open your door</h3><p>List a room in ten minutes. We handle the paperwork and the keys.</p><a href="#">Start hosting</a></section>
    </div>`
	},
	{
		id: "masonry",
		css: css`
      .x { background: #1b1a18; padding: 16px; overflow: hidden; font-family: 'Schibsted Grotesk', sans-serif; }
      .m { columns: 150px; column-gap: 10px; }
      figure { break-inside: avoid; margin: 0 0 10px; border-radius: 10px; overflow: hidden; background: #2a2825; color: #efe9df; }
      .img { aspect-ratio: var(--r); background: var(--g); }
      figcaption { padding: 7px 10px 9px; font-size: 12px; display: flex; justify-content: space-between; gap: 6px; }
      figcaption span { opacity: .55; font-family: 'Spline Sans Mono', monospace; font-size: 10.5px; }
      .note { padding: 14px; font: italic 400 17px/1.25 'Fraunces', serif; background: #e9e2d4; color: #1b1a18; }
    `,
		html: html`<div class="x"><div class="m">
      <figure><div class="img" style="--r:3/4;--g:linear-gradient(160deg,#c9b38f,#6b4e2e)"></div><figcaption>Dune study<span>04</span></figcaption></figure>
      <figure><div class="img" style="--r:1/1;--g:radial-gradient(circle at 30% 30%,#9fb8a3,#2f4a3a)"></div><figcaption>Fern<span>11</span></figcaption></figure>
      <figure class="note">Masonry keeps every item whole and every gap closed.</figure>
      <figure><div class="img" style="--r:2/3;--g:linear-gradient(200deg,#e3a27a,#9a3f2b 70%,#3a1f1a)"></div><figcaption>Kiln<span>02</span></figcaption></figure>
      <figure><div class="img" style="--r:4/3;--g:linear-gradient(180deg,#a9c4d6,#e8e2d1)"></div><figcaption>Low tide<span>07</span></figcaption></figure>
      <figure><div class="img" style="--r:3/5;--g:linear-gradient(170deg,#3b3a56,#a07a8f)"></div><figcaption>Dusk<span>09</span></figcaption></figure>
      <figure><div class="img" style="--r:1/1;--g:conic-gradient(from 40deg,#d9c27a,#8e7a3c,#d9c27a)"></div><figcaption>Brass<span>15</span></figcaption></figure>
      <figure><div class="img" style="--r:5/4;--g:linear-gradient(120deg,#5d6b4a,#c2b98d)"></div><figcaption>Olive grove<span>03</span></figcaption></figure>
      <figure><div class="img" style="--r:3/4;--g:linear-gradient(200deg,#d5c6b5,#7d6a5d)"></div><figcaption>Linen<span>12</span></figcaption></figure>
      <figure><div class="img" style="--r:4/5;--g:radial-gradient(circle at 70% 20%,#f1d3a8,#b0603a 60%,#4d2316)"></div><figcaption>Ember<span>06</span></figcaption></figure>
    </div></div>`
	},
	{
		id: "broken-grid",
		css: css`
      .x { background: #efe7da; color: #1d1a16; font-family: 'Schibsted Grotesk', sans-serif;
        display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(8, 1fr); padding: 24px; gap: 0; }
      .img1 { grid-column: 6 / 12; grid-row: 1 / 7; background: linear-gradient(170deg, #b9573a, #7a2e1e 60%, #3d1a12); }
      .img2 { grid-column: 2 / 6; grid-row: 5 / 9; background: linear-gradient(150deg, #d8c3a0, #8f7a58); z-index: 2; mix-blend-mode: multiply; }
      h2 { grid-column: 1 / 11; grid-row: 2 / 5; z-index: 3; margin: 0; align-self: center; font: italic 300 clamp(48px, 12cqw, 140px)/.85 'Fraunces', serif; letter-spacing: -.035em; }
      h2 span { display: block; padding-left: 1.4em; font-style: normal; font-weight: 600; }
      p { grid-column: 9 / 13; grid-row: 7 / 9; z-index: 3; margin: 0; align-self: end; font-size: 12.5px; line-height: 1.4; background: #efe7da; padding: 12px 0 0 14px; }
      .n { grid-column: 12 / 13; grid-row: 1 / 3; writing-mode: vertical-rl; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .14em; text-transform: uppercase; justify-self: end; }
    `,
		html: html`<div class="x">
      <div class="img1"></div><div class="img2"></div>
      <h2>Rust &amp;<span>Ochre</span></h2>
      <p>Autumn collection. Wool, waxed cotton and hand-dyed linen, made in small runs.</p>
      <div class="n">Issue 14</div>
    </div>`
	},
	{
		id: "card-layout",
		css: css`
      .x { background: #f4f2ee; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #1c1b19; overflow: hidden; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; max-width: 860px; margin: 0 auto; }
      .c { position: relative; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 2px rgb(30 20 10 / .06), 0 4px 14px rgb(30 20 10 / .06); transition: translate .2s, box-shadow .2s; display: grid; grid-template-rows: auto 1fr auto; }
      .c:hover { translate: 0 -3px; box-shadow: 0 2px 4px rgb(30 20 10 / .06), 0 12px 28px rgb(30 20 10 / .1); }
      .img { aspect-ratio: 4 / 3; background: var(--g); }
      .b { padding: 12px 14px 4px; }
      .k { font: 500 10.5px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #8a5a2b; }
      h4 { margin: 4px 0 4px; font: 500 19px/1.15 'Fraunces', serif; }
      h4 a { color: inherit; text-decoration: none; }
      h4 a::after { content: ""; position: absolute; inset: 0; }
      p { margin: 0; font-size: 13px; color: #6b675f; line-height: 1.4; }
      .meta { padding: 10px 14px 14px; font-size: 12px; color: #6b675f; display: flex; gap: 12px; }
    `,
		html: html`<div class="x"><div class="grid">
      <article class="c"><div class="img" style="--g:radial-gradient(circle at 40% 45%,#f3d27a 0 18%,#e46a3b 19% 36%,#f1e6d4 37%)"></div><div class="b"><div class="k">Breakfast</div><h4><a href="#">Shakshuka with feta</a></h4><p>Eggs poached in a smoky pepper sauce.</p></div><div class="meta"><span>25 min</span><span>Serves 2</span></div></article>
      <article class="c"><div class="img" style="--g:linear-gradient(135deg,#7c9a5c,#c9d6a3 60%,#f2efe2)"></div><div class="b"><div class="k">Lunch</div><h4><a href="#">Green goddess bowl</a></h4><p>Herbs, avocado, crisp chickpeas.</p></div><div class="meta"><span>15 min</span><span>Serves 1</span></div></article>
      <article class="c"><div class="img" style="--g:radial-gradient(circle at 60% 40%,#5a2a22,#a2452e 45%,#e9c9a0 46%)"></div><div class="b"><div class="k">Dinner</div><h4><a href="#">Braised short ribs</a></h4><p>Low and slow in red wine and miso.</p></div><div class="meta"><span>3 h</span><span>Serves 4</span></div></article>
    </div></div>`
	},
	{
		id: "app-shell",
		css: css`
      .x { display: grid; grid-template-columns: 180px 1fr; grid-template-rows: 48px 1fr; grid-template-areas: "side top" "side main"; font-family: 'Schibsted Grotesk', sans-serif; font-size: 13px; color: #1f2328; background: #fff; }
      aside { grid-area: side; background: #f6f6f4; border-right: 1px solid #e4e4e0; padding: 14px 10px; display: flex; flex-direction: column; gap: 2px; }
      .logo { font: 600 15px 'Bricolage Grotesque', sans-serif; padding: 0 8px 14px; display: flex; align-items: center; gap: 8px; }
      .logo i { width: 18px; height: 18px; border-radius: 5px; background: #1f2328; }
      aside a { color: inherit; text-decoration: none; padding: 6px 8px; border-radius: 6px; display: flex; justify-content: space-between; }
      aside a[aria-current] { background: #fff; box-shadow: 0 0 0 1px #e4e4e0; font-weight: 600; }
      aside a span { color: #8b8f96; font-size: 12px; }
      aside h5 { margin: 14px 8px 4px; font: 500 10.5px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #8b8f96; }
      header { grid-area: top; border-bottom: 1px solid #e4e4e0; display: flex; align-items: center; gap: 12px; padding: 0 16px; }
      header .crumb { color: #8b8f96; } header .crumb b { color: #1f2328; font-weight: 600; }
      header .search { margin-left: auto; border: 1px solid #e4e4e0; border-radius: 6px; padding: 5px 10px; color: #8b8f96; width: 180px; display: flex; justify-content: space-between; }
      kbd { font: 11px 'Spline Sans Mono', monospace; }
      main { grid-area: main; overflow: auto; padding: 4px 16px; }
      .row { display: grid; grid-template-columns: 70px 1fr 90px 60px; gap: 10px; align-items: center; padding: 10px 0; border-bottom: 1px solid #efefec; }
      .row .id { font-family: 'Spline Sans Mono', monospace; color: #8b8f96; font-size: 12px; }
      .row .st { display: flex; align-items: center; gap: 6px; color: #5b6068; }
      .row .st::before { content: ""; width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid var(--c); background: var(--f, transparent); }
      .row time { color: #8b8f96; text-align: right; }
      @container (width < 560px) { .x { grid-template-columns: 1fr; grid-template-areas: "top" "main"; } aside { display: none; } .row { grid-template-columns: 60px 1fr 60px; } .row .st { display: none; } header .search { width: auto; } }
    `,
		html: html`<div class="x">
      <aside><div class="logo"><i></i>Ledger</div>
        <a href="#" aria-current="page">Inbox <span>12</span></a><a href="#">My issues <span>4</span></a><a href="#">Views</a>
        <h5>Team</h5><a href="#">Backlog</a><a href="#">Active</a><a href="#">Cycles</a><a href="#">Settings</a></aside>
      <header><span class="crumb">Platform / <b>Inbox</b></span><span class="search">Search <kbd>⌘K</kbd></span></header>
      <main>
        <div class="row"><span class="id">PLT-412</span><span>Rotate signing keys before audit</span><span class="st" style="--c:#d97706;--f:#d97706">In progress</span><time>2h</time></div>
        <div class="row"><span class="id">PLT-409</span><span>Cache invalidation on locale switch</span><span class="st" style="--c:#8b8f96">Todo</span><time>5h</time></div>
        <div class="row"><span class="id">PLT-398</span><span>Flaky upload test on CI runners</span><span class="st" style="--c:#2563eb;--f:#2563eb">Review</span><time>1d</time></div>
        <div class="row"><span class="id">PLT-391</span><span>Migrate billing webhooks to queue</span><span class="st" style="--c:#16a34a;--f:#16a34a">Done</span><time>2d</time></div>
        <div class="row"><span class="id">PLT-388</span><span>Dark mode tokens for charts</span><span class="st" style="--c:#8b8f96">Todo</span><time>3d</time></div>
        <div class="row"><span class="id">PLT-377</span><span>Audit log export as CSV</span><span class="st" style="--c:#16a34a;--f:#16a34a">Done</span><time>4d</time></div>
        <div class="row"><span class="id">PLT-370</span><span>Rate limits per workspace</span><span class="st" style="--c:#8b8f96">Todo</span><time>6d</time></div>
      </main>
    </div>`
	},
	{
		id: "data-dashboard",
		css: css`
      .x { background: #fbfaf6; color: #22201c; font: 12px/1.3 'Schibsted Grotesk', sans-serif; padding: 16px 18px; display: grid; grid-template-rows: auto auto 1fr; gap: 12px; font-variant-numeric: tabular-nums; }
      .hd { display: flex; align-items: baseline; justify-content: space-between; border-bottom: 1.5px solid #22201c; padding-bottom: 6px; }
      .hd b { font: 600 15px 'Bricolage Grotesque', sans-serif; }
      .hd span { font-family: 'Spline Sans Mono', monospace; font-size: 11px; color: #7b766c; }
      .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
      .kpis div { padding: 2px 12px; border-left: 1px solid #dedad0; }
      .kpis div:first-child { border: 0; padding-left: 0; }
      .kpis small { display: block; color: #7b766c; font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; }
      .kpis b { font: 500 22px 'Spline Sans Mono', monospace; letter-spacing: -.02em; }
      .kpis em { font-style: normal; font-size: 11px; color: #3f7d4a; margin-left: 4px; }
      .kpis em.dn { color: #c2410c; }
      table { width: 100%; border-collapse: collapse; align-self: start; }
      th { text-align: left; font-weight: 500; color: #7b766c; font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; padding: 4px 6px; border-bottom: 1px solid #dedad0; }
      td { padding: 5px 6px; border-bottom: 1px solid #efece5; }
      td.n { text-align: right; font-family: 'Spline Sans Mono', monospace; }
      td.s { color: #8c8678; width: 90px; }
      tr.warn td.s, tr.warn td.d { color: #c2410c; }
      td.d { color: #3f7d4a; }
      tr.warn td:first-child::after { content: " ▲"; color: #c2410c; font-size: 9px; }
      @container (width < 560px) { .kpis { grid-template-columns: 1fr 1fr; row-gap: 8px; } .kpis div:nth-child(3) { border: 0; padding-left: 0; } th:nth-child(3), td:nth-child(3) { display: none; } }
    `,
		html: html`<div class="x">
      <div class="hd"><b>Edge traffic</b><span>last 24h · updated 14:02 UTC</span></div>
      <div class="kpis"><div><small>Requests</small><b>235.8M</b><em>+1.9%</em></div><div><small>p95 latency</small><b>118ms</b><em class="dn">+6ms</em></div><div><small>Error rate</small><b>0.042%</b><em>-0.01</em></div><div><small>Cache hit</small><b>93.4%</b><em>+0.3</em></div></div>
      <table><thead><tr><th>Region</th><th>Req/s (k)</th><th>Δ%</th><th>24h</th></tr></thead><tbody>
      ${[
			[
				"eu-west-1",
				"41.2",
				"+2.1",
				[
					4,
					5,
					5,
					6,
					5,
					7,
					8,
					7,
					9,
					8,
					9,
					10
				],
				""
			],
			[
				"us-east-1",
				"88.7",
				"+0.4",
				[
					8,
					8,
					9,
					8,
					9,
					9,
					8,
					9,
					9,
					10,
					9,
					9
				],
				""
			],
			[
				"ap-south-1",
				"12.9",
				"-6.8",
				[
					9,
					8,
					8,
					7,
					6,
					6,
					5,
					5,
					4,
					4,
					3,
					3
				],
				"warn"
			],
			[
				"us-west-2",
				"63.0",
				"+1.2",
				[
					5,
					6,
					5,
					6,
					6,
					7,
					6,
					7,
					7,
					7,
					8,
					8
				],
				""
			],
			[
				"sa-east-1",
				"7.4",
				"+0.0",
				[
					3,
					3,
					4,
					3,
					3,
					4,
					3,
					3,
					4,
					3,
					3,
					3
				],
				""
			],
			[
				"eu-north-1",
				"22.6",
				"+3.9",
				[
					2,
					3,
					3,
					4,
					5,
					5,
					6,
					7,
					7,
					8,
					9,
					9
				],
				""
			]
		].map(([r, v, d, pts, cls]) => `<tr class="${cls}"><td>${r}</td><td class="n">${v}</td><td class="n d">${d}</td><td class="s">${spark(pts)}</td></tr>`).join("")}
      </tbody></table>
    </div>`
	},
	{
		id: "container-queries",
		css: css`
      .x { background: #ecebe6; padding: 18px; display: grid; grid-template-columns: 200px 1fr; gap: 16px; font-family: 'Schibsted Grotesk', sans-serif; color: #1d1c1a; align-items: start; }
      .slot { container-type: inline-size; resize: horizontal; overflow: hidden; min-width: 170px; max-width: 100%; border: 1px dashed #a9a59b; border-radius: 6px; padding: 8px; position: relative; }
      .slot > small { display: block; font: 500 10px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #8a867c; margin-bottom: 6px; }
      .card { background: #fff; border-radius: 10px; overflow: hidden; display: grid; gap: 0; }
      .art { aspect-ratio: 16 / 10; background: linear-gradient(140deg, #2f5d50, #9cc1a4); }
      .tx { padding: 12px; }
      .tx b { font: 500 18px/1.15 'Fraunces', serif; display: block; }
      .tx p { margin: 6px 0 0; font-size: 12.5px; color: #6c685f; display: none; line-height: 1.4; }
      .tx span { font: 500 11px 'Spline Sans Mono', monospace; color: #2f5d50; display: block; margin-top: 8px; }
      @container (width > 380px) {
        .card { grid-template-columns: 42% 1fr; }
        .art { aspect-ratio: auto; height: 100%; min-height: 150px; }
        .tx { padding: 16px 18px; }
        .tx b { font-size: 24px; }
        .tx p { display: block; }
      }
      @container (width > 620px) { .tx b { font-size: 32px; } }
      .hint { grid-column: 1 / -1; font-size: 12px; color: #8a867c; margin: 0; }
      @container (width < 520px) { .x { grid-template-columns: 1fr; } .slot.wide { display: none; } }
    `,
		html: html`<div class="x">
      <div class="slot"><small>Sidebar slot</small><div class="card"><div class="art"></div><div class="tx"><b>Forest bathing</b><p>A slow walk with no destination. Notice five sounds, then five smells.</p><span>12 min read</span></div></div></div>
      <div class="slot wide"><small>Main slot · drag corner to resize</small><div class="card"><div class="art"></div><div class="tx"><b>Forest bathing</b><p>A slow walk with no destination. Notice five sounds, then five smells.</p><span>12 min read</span></div></div></div>
      <p class="hint">Same component, same CSS. It reads the width of its slot, not the window.</p>
    </div>`
	},
	{
		id: "hero",
		css: css`
      .x { background: #f6f3ee; color: #191713; font-family: 'Schibsted Grotesk', sans-serif; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 28px; padding: 32px clamp(20px, 5cqw, 60px); }
      .k { font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #9a5b22; }
      h2 { font: 600 clamp(32px, 6cqw, 64px)/.98 'Bricolage Grotesque', sans-serif; letter-spacing: -.035em; margin: 12px 0 14px; text-wrap: balance; }
      p { margin: 0 0 22px; color: #5e5a52; font-size: 15px; max-width: 36ch; line-height: 1.45; }
      .cta { display: flex; gap: 14px; align-items: center; }
      .btn { background: #191713; color: #f6f3ee; border: 0; border-radius: 999px; padding: 12px 20px; font-weight: 600; font-size: 14px; }
      .cta a { color: #191713; font-size: 14px; }
      .shot { aspect-ratio: 4 / 3; border-radius: 12px; background: #fff; box-shadow: 0 30px 60px -20px rgb(60 40 20 / .3), 0 0 0 1px rgb(0 0 0 / .06); padding: 10px; display: grid; grid-template-rows: 10px 1fr; gap: 10px; rotate: 2deg; }
      .shot .dots { display: flex; gap: 5px; } .shot .dots i { width: 8px; height: 8px; border-radius: 50%; background: #e3ddd2; }
      .shot .body { display: grid; grid-template-columns: 1fr 2fr; gap: 8px; }
      .shot .body i { background: #f1ede6; border-radius: 6px; }
      .shot .body i:nth-child(2) { background: linear-gradient(160deg, #f0b37e, #d0652c); }
      @container (width < 560px) { .x { grid-template-columns: 1fr; padding: 22px 18px; } .shot { display: none; } }
    `,
		html: html`<div class="x"><div>
      <div class="k">Invoicing for studios</div>
      <h2>Get paid before the coffee goes cold.</h2>
      <p>Send an invoice from your time log in two clicks. Clients pay by card or bank, you see it land.</p>
      <div class="cta"><button class="btn">Start free</button><a href="#">See pricing</a></div>
    </div><div class="shot"><div class="dots"><i></i><i></i><i></i></div><div class="body"><i></i><i></i></div></div></div>`
	},
	{
		id: "scrapbook-collage",
		css: css`
      .x { background: #d9c5a3 radial-gradient(circle at 20% 30%, rgb(255 255 255 / .25), transparent 60%); font-family: 'Fraunces', serif; color: #2a2118; }
      .p { position: absolute; background: #fbf8f1; padding: 10px 10px 34px; box-shadow: 0 6px 14px rgb(60 40 20 / .25); }
      .p i { display: block; width: var(--w); aspect-ratio: 1; background: var(--g); }
      .p span { position: absolute; bottom: 9px; left: 12px; font: italic 400 15px 'Fraunces', serif; }
      .tape { position: absolute; width: 74px; height: 22px; background: rgb(240 230 200 / .7); top: -10px; left: 50%; translate: -50% 0; rotate: -4deg; clip-path: polygon(3% 0, 97% 4%, 100% 50%, 96% 100%, 2% 96%, 0 40%); }
      .p1 { left: 6%; top: 10%; rotate: -6deg; --w: clamp(110px, 24cqw, 210px); }
      .p2 { left: 36%; top: 22%; rotate: 4deg; --w: clamp(120px, 26cqw, 230px); z-index: 2; }
      .p3 { right: 6%; top: 8%; rotate: -2deg; --w: clamp(100px, 20cqw, 180px); }
      .note { position: absolute; left: 8%; bottom: 8%; background: #f4e04d; padding: 12px 14px; rotate: 3deg; width: 180px; font: 400 15px/1.25 'Fraunces', serif; box-shadow: 0 4px 10px rgb(60 40 20 / .2); z-index: 3;
        clip-path: polygon(0 2%, 100% 0, 98% 96%, 3% 100%); }
      .stk { position: absolute; right: 12%; bottom: 10%; width: 92px; aspect-ratio: 1; border-radius: 50%; background: #e2532c; color: #fff8ec; display: grid; place-items: center; text-align: center; font: 600 15px/1 'Bricolage Grotesque', sans-serif; rotate: 12deg; box-shadow: 0 0 0 4px #fff8ec, 0 6px 12px rgb(0 0 0 / .25); z-index: 4; }
      .tkt { position: absolute; right: 30%; bottom: 14%; background: #8fb3a9; color: #11302a; padding: 8px 16px; font: 600 12px 'Spline Sans Mono', monospace; letter-spacing: .1em; rotate: -8deg; z-index: 3;
        mask: radial-gradient(circle 6px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 6px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat; }
      @container (width < 520px) { .tkt { display: none; } .note { width: 150px; font-size: 14px; } .p2 { left: 30%; top: 30%; } }
    `,
		html: html`<div class="x">
      <div class="p p1"><div class="tape"></div><i style="--g:linear-gradient(180deg,#9cc3d5,#f2dcb3 55%,#d39a63 56%,#a86b3c)"></i><span>Lisbon, day 2</span></div>
      <div class="p p2"><div class="tape"></div><i style="--g:radial-gradient(circle at 50% 40%,#f6c453 0 20%,#e98a3a 21% 40%,#3d5c50 41%)"></i><span>the good lemons</span></div>
      <div class="p p3"><i style="--g:linear-gradient(160deg,#c46a4a,#5a2d24)"></i><span>tiles!!</span></div>
      <div class="note">Tram 28 at 7am, before anyone else is awake.</div>
      <div class="tkt">ADMIT ONE · 0412</div>
      <div class="stk">wish<br>you were<br>here</div>
    </div>`
	}
];
//#endregion
//#region junkyard/design-almanac/examples/motion.ts
var SWATCHES = [
	[
		"Terracotta",
		"#c4623f",
		"Fired clay, warm and earthy. Pairs with sage and cream."
	],
	[
		"Sage",
		"#8fa58a",
		"A gray green that calms everything next to it."
	],
	[
		"Ink",
		"#26324a",
		"Deep blue black for text that is not quite black."
	],
	[
		"Saffron",
		"#e7a83a",
		"A spice yellow; use it for one thing on the page."
	]
];
var REVEAL_ITEMS = [
	"Arrive",
	"Unpack",
	"Wander",
	"Taste",
	"Linger",
	"Return"
];
var LOGOS = [
	"Northwind",
	"Halcyon",
	"Parallel",
	"Ferro",
	"Lumen&Co",
	"Basalt",
	"Okta Mill",
	"Verdant"
];
var MOTION_EXAMPLES = [
	{
		id: "view-transitions",
		css: css`
      .x { background: #f4f0e8; padding: 18px; font-family: 'Schibsted Grotesk', sans-serif; color: #1f1c18; }
      .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; height: 100%; }
      .sw { border: 0; padding: 0; border-radius: 14px; background: var(--c); display: flex; align-items: flex-end; text-align: left; overflow: hidden; color: #fff; }
      .sw span { padding: 12px; font: 400 18px 'Fraunces', serif; }
      .detail { position: absolute; inset: 18px; border-radius: 18px; background: var(--c); color: #fff; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
      .detail[hidden] { display: none; }
      .detail .tx { padding: 26px; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; background: rgb(0 0 0 / .12); }
      .detail h3 { margin: 0; font: 400 clamp(32px, 6cqw, 60px)/1 'Fraunces', serif; }
      .detail p { margin: 0; max-width: 32ch; font-size: 14px; line-height: 1.4; }
      .detail code { font: 12px 'Spline Sans Mono', monospace; opacity: .85; }
      .detail button { position: absolute; top: 14px; right: 14px; border: 0; border-radius: 99px; padding: 6px 12px; background: rgb(255 255 255 / .9); color: #1f1c18; font-size: 12.5px; }
      .hint { position: absolute; left: 18px; bottom: 6px; font: 11px 'Spline Sans Mono', monospace; color: #8a8378; }
      @container (width < 520px) { .grid { grid-template-columns: 1fr 1fr; } .detail { grid-template-columns: 1fr; } .detail .tx { padding: 18px; } }
    `,
		html: html`<div class="x"><div class="grid">${SWATCHES.map(([n, c], i) => `<button class="sw" data-i="${i}" style="--c:${c}"><span>${n}</span></button>`).join("")}</div>
      <div class="detail" hidden><div></div><div class="tx"><h3></h3><code></code><p></p></div><button>Close</button></div></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const detail = root.querySelector(".detail");
			const tiles = [...root.querySelectorAll(".sw")];
			let open = null;
			const transition = (update) => {
				const start = document.startViewTransition;
				if (start) start.call(document, update);
				else update();
			};
			const show = (tile) => {
				const [name, color, text] = SWATCHES[Number(tile.dataset.i)];
				tile.style.viewTransitionName = "almanac-swatch";
				transition(() => {
					tile.style.viewTransitionName = "";
					detail.style.viewTransitionName = "almanac-swatch";
					detail.style.setProperty("--c", color);
					detail.querySelector("h3").textContent = name;
					detail.querySelector("code").textContent = color;
					detail.querySelector("p").textContent = text;
					detail.hidden = false;
					open = tile;
				});
			};
			const hide = () => {
				if (!open) return;
				const tile = open;
				transition(() => {
					detail.style.viewTransitionName = "";
					detail.hidden = true;
					tile.style.viewTransitionName = "almanac-swatch";
					open = null;
				});
			};
			tiles.forEach((t) => t.addEventListener("click", () => show(t), { signal }));
			detail.querySelector("button").addEventListener("click", hide, { signal });
		}
	},
	{
		id: "scroll-driven",
		css: css`
      .x { background: #10120f; color: #eae6da; font-family: 'Fraunces', serif; }
      .sc { position: absolute; inset: 0; overflow-y: auto; scroll-timeline: --page y; padding: 40px 0 120px; scrollbar-width: thin; }
      .prog { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: #e4572e; transform-origin: 0 50%; scale: .3 1; z-index: 2; }
      .it { margin: 0 auto 18px; width: min(86%, 520px); padding: 22px; border-radius: 16px; background: #1d211b; display: flex; align-items: baseline; gap: 16px; }
      .it b { font-weight: 300; font-size: clamp(30px, 5cqw, 48px); letter-spacing: -.02em; }
      .it span { font: 500 12px 'Spline Sans Mono', monospace; color: #e4572e; }
      .tip { text-align: center; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #8d917f; margin-bottom: 22px; }
      @supports (animation-timeline: view()) {
        .prog { animation: grow linear both; animation-timeline: --page; scale: 0 1; }
        .it { animation: rise linear both; animation-timeline: view(); animation-range: entry 0% cover 35%; }
      }
      @keyframes grow { to { scale: 1 1; } }
      @keyframes rise { from { opacity: 0; translate: 0 40px; scale: .92; } }
    `,
		html: html`<div class="x"><i class="prog"></i><div class="sc"><div class="tip">Scroll inside this frame</div>${REVEAL_ITEMS.map((t, i) => `<div class="it"><span>0${i + 1}</span><b>${t}</b></div>`).join("")}</div></div>`
	},
	{
		id: "parallax",
		css: css`
      .x { background: linear-gradient(180deg, #fbd7a8 0%, #f6a982 40%, #d77a6b 70%); overflow: hidden; --px: 0; --py: 0; }
      .l { position: absolute; left: -10%; right: -10%; bottom: -5%; translate: calc(var(--px) * var(--d) * -40px) calc(var(--py) * var(--d) * -14px); transition: translate .2s ease-out; animation: sway 9s ease-in-out infinite alternate; }
      :host([data-interactive]) .l { animation: none; }
      @keyframes sway { from { transform: translateX(calc(var(--d) * -18px)); } to { transform: translateX(calc(var(--d) * 18px)); } }
      .sun { position: absolute; width: 18%; aspect-ratio: 1; border-radius: 50%; left: 58%; top: 16%; background: #fff3d6; --d: .1; translate: calc(var(--px) * -4px) 0; box-shadow: 0 0 80px 20px rgb(255 230 180 / .6); }
      .l1 { --d: .25; height: 70%; background: #c06a6a; clip-path: polygon(0 60%, 12% 30%, 24% 50%, 40% 12%, 55% 44%, 70% 22%, 84% 48%, 100% 26%, 100% 100%, 0 100%); }
      .l2 { --d: .5; height: 55%; background: #8e4a5c; clip-path: polygon(0 50%, 18% 24%, 32% 46%, 48% 20%, 66% 52%, 82% 30%, 100% 50%, 100% 100%, 0 100%); }
      .l3 { --d: .8; height: 40%; background: #55304a; clip-path: polygon(0 40%, 20% 60%, 36% 30%, 58% 58%, 76% 34%, 100% 56%, 100% 100%, 0 100%); }
      .l4 { --d: 1.2; height: 24%; background: #2a1830; clip-path: polygon(0 30%, 30% 60%, 50% 40%, 75% 70%, 100% 35%, 100% 100%, 0 100%); }
      .cap { position: absolute; left: 22px; top: 18px; font: 400 clamp(22px, 4cqw, 40px)/1 'Fraunces', serif; color: #3a1f2e; }
      .cap small { display: block; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; margin-top: 8px; opacity: .7; }
    `,
		html: html`<div class="x"><i class="sun"></i><i class="l l1"></i><i class="l l2"></i><i class="l l3"></i><i class="l l4"></i><div class="cap">Five layers, five speeds<small>Move the pointer across the scene</small></div></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const x = root.querySelector(".x");
			x.addEventListener("pointermove", (e) => {
				const r = x.getBoundingClientRect();
				x.style.setProperty("--px", ((e.clientX - r.left) / r.width - .5).toFixed(3));
				x.style.setProperty("--py", ((e.clientY - r.top) / r.height - .5).toFixed(3));
			}, { signal });
		}
	},
	{
		id: "skeleton-screens",
		css: css`
      .x { background: #f5f4f0; padding: 20px; display: grid; place-items: center; font-family: 'Schibsted Grotesk', sans-serif; color: #22201c; }
      .list { width: min(100%, 520px); display: grid; gap: 14px; }
      .item { display: grid; grid-template-columns: 56px 1fr; gap: 14px; align-items: center; background: #fff; border-radius: 12px; padding: 14px; }
      .sk { border-radius: 6px; background: linear-gradient(90deg, #ebe8e1 0%, #f6f4ef 40%, #ebe8e1 80%) 0 0 / 300% 100%; animation: shimmer 1.6s linear infinite; }
      @keyframes shimmer { from { background-position: 100% 0; } to { background-position: -50% 0; } }
      .av { width: 56px; height: 56px; border-radius: 50%; }
      .ln { height: 12px; margin: 6px 0; } .ln.w1 { width: 70%; } .ln.w2 { width: 45%; height: 10px; }
      .real { display: none; } .real b { display: block; font-size: 15px; } .real span { font-size: 13px; color: #75716a; }
      .avr { width: 56px; height: 56px; border-radius: 50%; background: var(--g); display: none; }
      .x[data-loaded] .sk { display: none; } .x[data-loaded] .real, .x[data-loaded] .avr { display: block; animation: in .3s ease-out; }
      @keyframes in { from { opacity: 0; } }
      .lbl { position: absolute; top: 10px; right: 14px; font: 500 11px 'Spline Sans Mono', monospace; color: #8b867b; }
    `,
		html: html`<div class="x" aria-busy="true"><span class="lbl">loading…</span><div class="list">
      ${[
			[
				"Ines Duarte",
				"Shared 3 photos",
				"#e09f7d,#b5523b"
			],
			[
				"Tomás Reyes",
				"Commented on your sketch",
				"#9db7a5,#4f7a63"
			],
			[
				"Aiko Mori",
				"Started following you",
				"#a7a0d6,#5b528f"
			]
		].map(([n, t, g]) => `<div class="item"><div class="sk av"></div><i class="avr" style="--g:linear-gradient(135deg,${g})"></i><div><div class="sk ln w1"></div><div class="sk ln w2"></div><div class="real"><b>${n}</b><span>${t}</span></div></div></div>`).join("")}
    </div></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const x = root.querySelector(".x");
			const lbl = root.querySelector(".lbl");
			let loaded = false;
			every(2200, signal, () => {
				loaded = !loaded;
				x.toggleAttribute("data-loaded", loaded);
				x.setAttribute("aria-busy", String(!loaded));
				lbl.textContent = loaded ? "loaded" : "loading…";
			});
		}
	},
	{
		id: "marquee",
		css: css`
      .x { background: #ece6da; display: grid; align-content: center; gap: 18px; overflow: hidden; }
      .band { display: flex; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
      .band:hover .track { animation-play-state: paused; }
      .track { display: flex; flex-shrink: 0; gap: 0; animation: slide 22s linear infinite; }
      .rev .track { animation-direction: reverse; animation-duration: 30s; }
      @keyframes slide { to { translate: -100% 0; } }
      .big { background: #1c1a17; color: #ece6da; padding: 12px 0; rotate: -2deg; width: 104%; margin-left: -2%; }
      .big span { font: italic 300 clamp(36px, 7cqw, 72px)/1 'Fraunces', serif; padding: 0 .4em; white-space: nowrap; }
      .big span:nth-child(even) { font-style: normal; color: #ff6a2b; font-size: .6em; align-self: center; }
      .logos span { font: 600 22px 'Bricolage Grotesque', sans-serif; color: #5a544a; padding: 0 28px; white-space: nowrap; letter-spacing: -.02em; }
      .logos span:nth-child(3n) { font: italic 400 24px 'Fraunces', serif; }
      .logos span:nth-child(4n) { font: 500 18px 'Spline Sans Mono', monospace; letter-spacing: .06em; text-transform: uppercase; }
    `,
		html: (() => {
			const big = [
				"Open late",
				"*",
				"Natural wine",
				"*",
				"Small plates",
				"*",
				"No reservations",
				"*"
			].map((w) => `<span>${w}</span>`).join("");
			const logos = LOGOS.map((l) => `<span>${l}</span>`).join("");
			return html`<div class="x"><div class="band big"><div class="track">${big}</div><div class="track" aria-hidden="true">${big}</div></div>
        <div class="band logos rev"><div class="track">${logos}</div><div class="track" aria-hidden="true">${logos}</div></div></div>`;
		})()
	}
];
//#endregion
//#region junkyard/design-almanac/examples/navigation.ts
var PARAS = Array.from({ length: 9 }, (_, i) => `<p><i style="width:${70 + i * 17 % 30}%"></i><i></i><i style="width:${50 + i * 23 % 40}%"></i></p>`).join("");
var COMMANDS = [
	[
		"Toggle dark theme",
		"Appearance",
		"⌘⇧L"
	],
	[
		"Change theme accent",
		"Appearance",
		""
	],
	[
		"Go to Settings",
		"Navigation",
		"⌘,"
	],
	[
		"New document",
		"Create",
		"⌘N"
	],
	[
		"Invite teammate",
		"Workspace",
		""
	],
	[
		"Open recent: Q3 roadmap",
		"Recent",
		""
	],
	[
		"Export as PDF",
		"File",
		"⌘⇧E"
	]
];
/** Wrap each matched query character (in order) in <mark>. */
function highlight(text, query) {
	const q = query.toLowerCase();
	const at = q ? text.toLowerCase().indexOf(q) : -1;
	if (at >= 0) return `${text.slice(0, at)}<mark>${text.slice(at, at + q.length)}</mark>${text.slice(at + q.length)}`;
	let qi = 0;
	return [...text].map((c) => {
		if (qi < q.length && c.toLowerCase() === q[qi]) {
			qi++;
			return `<mark>${c}</mark>`;
		}
		return c;
	}).join("");
}
var fuzzy = (text, q) => {
	let i = 0;
	for (const c of text.toLowerCase()) if (c === q[i]) i++;
	return i === q.length;
};
var commandRows = (q, active) => COMMANDS.filter(([t]) => fuzzy(t, q.toLowerCase())).map(([t, g, k], i) => `<li role="option" aria-selected="${i === active}"><span>${highlight(t, q)}</span><small>${g}</small>${k ? `<kbd>${k}</kbd>` : ""}</li>`).join("") || "<li class=\"none\">No matching commands</li>";
var NAVIGATION_EXAMPLES = [
	{
		id: "sticky-header",
		css: css`
      .x { background: #fbfaf7; font-family: 'Schibsted Grotesk', sans-serif; color: #23201b; }
      .sc { position: absolute; inset: 0; overflow-y: auto; scrollbar-width: thin; }
      header { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 22px; padding: 16px 24px; transition: padding .25s, background .25s, box-shadow .25s; background: #fbfaf7; }
      .sc[data-stuck] header { padding: 10px 24px; background: rgb(251 250 247 / .78); backdrop-filter: blur(12px); box-shadow: 0 1px 0 #e4dfd5; }
      header b { font: 500 20px 'Fraunces', serif; transition: font-size .25s; } .sc[data-stuck] header b { font-size: 17px; }
      nav { display: flex; gap: 16px; font-size: 13.5px; color: #6b655b; } nav a { color: inherit; text-decoration: none; } nav a:first-child { color: #23201b; font-weight: 600; }
      header button { margin-left: auto; border: 0; background: #23201b; color: #fff; border-radius: 99px; padding: 7px 14px; font-size: 13px; font-weight: 600; }
      .hero { height: 150px; margin: 0 24px; border-radius: 14px; background: linear-gradient(135deg, #e7d6bd, #c9a27a); }
      article { padding: 18px 24px 40px; max-width: 640px; }
      article h3 { font: 400 28px 'Fraunces', serif; margin: 6px 0 14px; }
      p { display: grid; gap: 8px; margin: 0 0 18px; } p i { height: 9px; border-radius: 4px; background: #e8e3da; }
      @container (width < 520px) { nav { display: none; } }
    `,
		html: html`<div class="x"><div class="sc"><header><b>Field Notes</b><nav><a href="#">Journal</a><a href="#">Recipes</a><a href="#">Travel</a><a href="#">About</a></nav><button>Subscribe</button></header>
      <div class="hero"></div><article><h3>Winter pantry</h3>${PARAS}</article></div></div>`,
		setup(root, { signal }) {
			const sc = root.querySelector(".sc");
			const sync = () => sc.toggleAttribute("data-stuck", sc.scrollTop > 8);
			sc.addEventListener("scroll", sync, {
				signal,
				passive: true
			});
			requestAnimationFrame(() => {
				sc.scrollTop = 170;
				sync();
			});
		}
	},
	{
		id: "mega-menu",
		css: css`
      .x { background: #f3f1ec; font-family: 'Schibsted Grotesk', sans-serif; color: #1f1d19; }
      .top { display: flex; align-items: center; gap: 4px; padding: 0 22px; height: 56px; background: #fff; border-bottom: 1px solid #e5e1d8; position: relative; z-index: 2; }
      .top b { font: 600 18px 'Bricolage Grotesque', sans-serif; margin-right: 18px; }
      .top button { border: 0; background: transparent; padding: 8px 12px; border-radius: 8px; font-size: 14px; color: inherit; display: flex; gap: 6px; align-items: center; }
      .top button::after { content: ""; width: 6px; height: 6px; border-right: 1.5px solid; border-bottom: 1.5px solid; rotate: 45deg; translate: 0 -2px; transition: rotate .2s; }
      .top button[aria-expanded=true] { background: #f3f1ec; } .top button[aria-expanded=true]::after { rotate: 225deg; translate: 0 2px; }
      .panel { position: absolute; left: 0; right: 0; top: 56px; background: #fff; border-bottom: 1px solid #e5e1d8; box-shadow: 0 24px 40px -24px rgb(40 30 20 / .3); padding: 22px; display: grid; grid-template-columns: repeat(3, 1fr) 1.2fr; gap: 24px; }
      .panel[hidden] { display: none; }
      h5 { margin: 0 0 10px; font: 500 10.5px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #8a8478; }
      .col a { display: block; color: inherit; text-decoration: none; padding: 6px 0; font-size: 14px; }
      .col a small { display: block; color: #8a8478; font-size: 12px; }
      .feat { border-radius: 12px; background: linear-gradient(150deg, #253b34, #4f7a68); color: #f1ede4; padding: 16px; display: flex; flex-direction: column; justify-content: flex-end; min-height: 160px; }
      .feat b { font: 400 22px/1.1 'Fraunces', serif; } .feat span { font-size: 12.5px; opacity: .8; margin-top: 4px; }
      @container (width < 600px) { .panel { grid-template-columns: 1fr 1fr; } .feat, .col:nth-child(3) { display: none; } .top button:nth-of-type(n+3) { display: none; } }
    `,
		html: html`<div class="x"><div class="top"><b>Northfold</b><button aria-expanded="true" aria-controls="mm">Products</button><button aria-expanded="false">Solutions</button><button aria-expanded="false">Resources</button></div>
      <div class="panel" id="mm">
        <div class="col"><h5>Build</h5><a href="#">Editor<small>Write and design together</small></a><a href="#">Components<small>Reusable blocks</small></a><a href="#">Themes</a></div>
        <div class="col"><h5>Ship</h5><a href="#">Hosting<small>Global edge network</small></a><a href="#">Analytics<small>Privacy-first stats</small></a><a href="#">Forms</a></div>
        <div class="col"><h5>Grow</h5><a href="#">Newsletter</a><a href="#">Memberships<small>Paid tiers and gating</small></a><a href="#">Integrations</a></div>
        <div class="feat"><b>Northfold 4 is here</b><span>Real-time collaboration and a new type engine.</span></div>
      </div></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const btn = root.querySelector("[aria-controls=mm]");
			const panel = root.querySelector("#mm");
			const set = (open) => {
				btn.setAttribute("aria-expanded", String(open));
				panel.hidden = !open;
			};
			btn.addEventListener("click", () => set(panel.hidden === true), { signal });
			root.addEventListener("keydown", (e) => e.key === "Escape" && (set(false), btn.focus()), { signal });
		}
	},
	{
		id: "tabs",
		css: css`
      .x { background: #fbf9f5; padding: clamp(20px, 9cqh, 70px) clamp(18px, 8cqw, 120px); font-family: 'Schibsted Grotesk', sans-serif; color: #23201b; }
      .x > * { max-width: 680px; }
      [role=tablist] { display: flex; gap: 4px; border-bottom: 1px solid #e2ddd3; position: relative; }
      [role=tab] { border: 0; background: transparent; padding: 10px 14px; font-size: 15px; color: #77706a; font-weight: 500; }
      [role=tab][aria-selected=true] { color: #23201b; }
      .ind { position: absolute; bottom: -1px; height: 2px; background: #c2512a; left: var(--l, 0); width: var(--w, 80px); transition: left .3s cubic-bezier(.2,.8,.2,1), width .3s cubic-bezier(.2,.8,.2,1); }
      [role=tabpanel] { padding: 18px 0; max-width: 560px; }
      [role=tabpanel][hidden] { display: none; }
      h4 { margin: 0 0 8px; font: 400 30px 'Fraunces', serif; }
      p { margin: 0 0 12px; font-size: 15px; line-height: 1.5; color: #5d574e; }
      dl { display: grid; grid-template-columns: 140px 1fr; gap: 8px 16px; margin: 0; font-size: 14px; } dt { color: #8a8478; } dd { margin: 0; }
    `,
		html: html`<div class="x"><div role="tablist" aria-label="Product">
      <button role="tab" aria-selected="true" aria-controls="p1" id="t1">Overview</button><button role="tab" aria-selected="false" aria-controls="p2" id="t2" tabindex="-1">Specs</button><button role="tab" aria-selected="false" aria-controls="p3" id="t3" tabindex="-1">Reviews</button><i class="ind"></i></div>
      <div role="tabpanel" id="p1" aria-labelledby="t1"><h4>Field kettle, 1.2 litre</h4><p>Spun from one sheet of steel, with a beech handle that stays cool. Boils on gas, induction or a campfire.</p><p>Arrow keys move between tabs; the indicator follows.</p></div>
      <div role="tabpanel" id="p2" aria-labelledby="t2" hidden><dl><dt>Capacity</dt><dd>1.2 L</dd><dt>Weight</dt><dd>780 g</dd><dt>Material</dt><dd>18/10 steel, beech</dd><dt>Hobs</dt><dd>Gas, induction, open fire</dd></dl></div>
      <div role="tabpanel" id="p3" aria-labelledby="t3" hidden><p>“Ten years and it still whistles like the first morning.” Ana, Porto</p><p>“Heavy, honest, beautiful.” Jonas, Bergen</p></div></div>`,
		setup(root, { signal, interactive }) {
			const tabs = [...root.querySelectorAll("[role=tab]")];
			const ind = root.querySelector(".ind");
			const place = (t) => {
				ind.style.setProperty("--l", `${t.offsetLeft}px`);
				ind.style.setProperty("--w", `${t.offsetWidth}px`);
			};
			requestAnimationFrame(() => place(tabs[0]));
			if (!interactive) return;
			const select = (t) => {
				for (const o of tabs) {
					const on = o === t;
					o.setAttribute("aria-selected", String(on));
					o.tabIndex = on ? 0 : -1;
					root.getElementById(o.getAttribute("aria-controls")).hidden = !on;
				}
				place(t);
				t.focus();
			};
			tabs.forEach((t, i) => {
				t.addEventListener("click", () => select(t), { signal });
				t.addEventListener("keydown", (e) => {
					const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
					if (d) select(tabs[(i + d + tabs.length) % tabs.length]);
				}, { signal });
			});
		}
	},
	{
		id: "off-canvas-drawer",
		css: css`
      .x { background: #fbfaf6; font-family: 'Schibsted Grotesk', sans-serif; color: #22201b; overflow: hidden; }
      .page { position: absolute; inset: 0; }
      .bar { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-bottom: 1px solid #e6e1d8; }
      .bar button { width: 40px; height: 40px; border: 0; border-radius: 10px; background: #f0ece4; display: grid; place-content: center; gap: 4px; }
      .bar button i { display: block; width: 18px; height: 2px; background: #22201b; border-radius: 2px; }
      .bar b { font: 500 19px 'Fraunces', serif; }
      .content { padding: 18px; display: grid; gap: 12px; } .content i { height: 12px; border-radius: 4px; background: #ebe6dc; } .content i:first-child { height: 120px; border-radius: 12px; background: linear-gradient(135deg, #d9c3a5, #b38b62); }
      .scrim { position: absolute; inset: 0; background: rgb(25 20 15 / .45); opacity: 0; pointer-events: none; transition: opacity .3s; }
      .drawer { position: absolute; top: 0; bottom: 0; left: 0; width: min(78%, 300px); background: #22201b; color: #f3efe6; padding: 22px; translate: -100% 0; transition: translate .35s cubic-bezier(.2,.8,.2,1); display: flex; flex-direction: column; gap: 4px; }
      .x[data-open] .scrim { opacity: 1; pointer-events: auto; } .x[data-open] .drawer { translate: 0 0; }
      .drawer small { font: 500 10.5px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #a59e90; margin-bottom: 10px; }
      .drawer a { color: inherit; text-decoration: none; font: 400 26px/1.3 'Fraunces', serif; }
      .drawer a:first-of-type { color: #ff8a5b; }
      .drawer .close { margin-top: auto; align-self: start; border: 1px solid #4a463e; background: transparent; color: inherit; border-radius: 99px; padding: 6px 14px; font-size: 13px; }
    `,
		html: html`<div class="x" data-open><div class="page"><div class="bar"><button aria-label="Open menu" aria-expanded="true"><i></i><i></i><i></i></button><b>Harbour Bakery</b></div><div class="content"><i></i><i></i><i style="width:70%"></i><i></i><i style="width:50%"></i></div></div>
      <div class="scrim"></div><nav class="drawer" aria-label="Main"><small>Menu</small><a href="#">Today's bread</a><a href="#">Pastries</a><a href="#">Orders</a><a href="#">Visit us</a><button class="close">Close</button></nav></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const x = root.querySelector(".x");
			const page = root.querySelector(".page");
			const burger = root.querySelector(".bar button");
			const set = (open) => {
				x.toggleAttribute("data-open", open);
				burger.setAttribute("aria-expanded", String(open));
				page.inert = open;
				if (!open) burger.focus();
			};
			set(true);
			burger.addEventListener("click", () => set(true), { signal });
			root.querySelector(".close").addEventListener("click", () => set(false), { signal });
			root.querySelector(".scrim").addEventListener("click", () => set(false), { signal });
			root.addEventListener("keydown", (e) => e.key === "Escape" && set(false), { signal });
		}
	},
	{
		id: "command-palette",
		css: css`
      .x { background: #ece9e2; font-family: 'Schibsted Grotesk', sans-serif; color: #201e1a; display: grid; place-items: start center; padding-top: 34px; }
      .app { position: absolute; inset: 0; padding: 16px; display: grid; grid-template-columns: 150px 1fr; gap: 14px; filter: blur(1px); opacity: .5; }
      .app i { border-radius: 10px; background: #dcd7cd; } .app i:last-child { background: #f6f4ef; }
      .scr { position: absolute; inset: 0; background: rgb(40 34 26 / .25); }
      .pal { position: relative; width: min(92%, 520px); background: #fbfaf7; border-radius: 14px; box-shadow: 0 0 0 1px rgb(0 0 0 / .08), 0 30px 60px -20px rgb(30 20 10 / .45); overflow: hidden; }
      .in { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid #e7e2d8; }
      .in svg { width: 16px; height: 16px; flex: none; }
      input { flex: 1; border: 0; outline: none; background: transparent; font: 16px 'Schibsted Grotesk', sans-serif; color: inherit; min-width: 0; }
      .in kbd, li kbd { font: 11px 'Spline Sans Mono', monospace; color: #7d776b; border: 1px solid #ddd7cc; border-radius: 5px; padding: 1px 6px; }
      ul { list-style: none; margin: 0; padding: 6px; max-height: 260px; overflow: auto; }
      li { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; font-size: 14px; }
      li span { flex: 1; } li small { color: #8a8478; font-size: 12px; }
      li[aria-selected=true] { background: #201e1a; color: #fbfaf7; } li[aria-selected=true] small, li[aria-selected=true] kbd { color: #c9c3b6; border-color: #4a463e; }
      mark { background: none; color: #c2512a; font-weight: 700; } li[aria-selected=true] mark { color: #ff9a6b; }
      li.none { color: #8a8478; }
      .ft { display: flex; gap: 14px; padding: 8px 16px; border-top: 1px solid #e7e2d8; font: 11px 'Spline Sans Mono', monospace; color: #8a8478; }
    `,
		html: html`<div class="x"><div class="app"><i></i><i></i></div><div class="scr"></div><div class="pal" role="dialog" aria-label="Command palette">
      <div class="in"><svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11 11l4 4" stroke="currentColor" stroke-width="1.6"/></svg><input value="theme" aria-label="Search commands" role="combobox" aria-expanded="true"><kbd>esc</kbd></div>
      <ul role="listbox">${commandRows("theme", 0)}</ul>
      <div class="ft"><span>↑↓ move</span><span>↵ run</span><span>⌘K toggle</span></div></div></div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const input = root.querySelector("input");
			const list = root.querySelector("ul");
			let active = 0;
			const render = () => list.innerHTML = commandRows(input.value.replace(/[<>&"]/g, ""), active);
			input.addEventListener("input", () => (active = 0, render()), { signal });
			input.addEventListener("keydown", (e) => {
				const n = list.querySelectorAll("[role=option]").length;
				if (!n) return;
				if (e.key === "ArrowDown") active = (active + 1) % n;
				else if (e.key === "ArrowUp") active = (active - 1 + n) % n;
				else return;
				e.preventDefault();
				render();
			}, { signal });
		}
	}
];
var SURFACE_EXAMPLES = [
	{
		id: "liquid-glass",
		css: css`
      .x { background: #0e1a1f; overflow: hidden; font-family: 'Schibsted Grotesk', sans-serif; color: #fff; }
      .art { position: absolute; inset: 0; background:
        radial-gradient(circle at 22% 30%, #ffb347 0 14%, transparent 15%),
        radial-gradient(circle at 75% 25%, #ff5e62 0 18%, transparent 19%),
        radial-gradient(circle at 60% 78%, #3fc5a6 0 20%, transparent 21%),
        linear-gradient(135deg, #10343d, #1f5162 50%, #0e1a1f); animation: drift 14s ease-in-out infinite alternate; }
      .art::after { content: "AFTER HOURS"; position: absolute; left: 6%; top: 46%; font: 800 clamp(40px, 11cqw, 130px)/.9 'Bricolage Grotesque', sans-serif; letter-spacing: -.04em; color: #f4efe6; }
      @keyframes drift { to { background-position: 30px -20px, -40px 30px, 20px -30px, 0 0; } }
      .glass { position: absolute; background: rgb(255 255 255 / .14); backdrop-filter: blur(18px) saturate(1.7); -webkit-backdrop-filter: blur(18px) saturate(1.7);
        box-shadow: inset 0 1px 0 rgb(255 255 255 / .55), inset 0 -1px 0 rgb(255 255 255 / .12), inset 1px 0 0 rgb(255 255 255 / .2), 0 12px 32px rgb(0 0 0 / .25); border-radius: 26px; }
      .player { left: 50%; translate: -50% 0; bottom: 22%; width: min(86%, 400px); padding: 14px; display: grid; grid-template-columns: 52px 1fr auto; gap: 12px; align-items: center; }
      .cover { width: 52px; aspect-ratio: 1; border-radius: 12px; background: linear-gradient(135deg, #ffb347, #ff5e62); }
      .meta b { display: block; font-size: 15px; } .meta span { font-size: 12.5px; opacity: .75; }
      .meta .bar { height: 4px; border-radius: 4px; background: rgb(255 255 255 / .25); margin-top: 8px; } .meta .bar i { display: block; width: 38%; height: 100%; border-radius: inherit; background: #fff; }
      .play { width: 42px; aspect-ratio: 1; border-radius: 50%; background: rgb(255 255 255 / .9); display: grid; place-items: center; }
      .play::after { content: ""; border-left: 12px solid #0e1a1f; border-block: 8px solid transparent; margin-left: 4px; }
      .tabs { left: 50%; translate: -50% 0; bottom: 5%; padding: 6px; display: flex; gap: 4px; border-radius: 99px; }
      .tabs span { padding: 7px 14px; border-radius: 99px; font-size: 12.5px; } .tabs span.on { background: rgb(255 255 255 / .28); }
    `,
		html: html`<div class="x"><div class="art"></div>
      <div class="glass player"><div class="cover"></div><div class="meta"><b>Slow Lanes</b><span>Neon Harbour</span><div class="bar"><i></i></div></div><div class="play"></div></div>
      <div class="glass tabs"><span class="on">Listen</span><span>Browse</span><span>Radio</span><span>Library</span></div></div>`
	},
	{
		id: "neubrutalism",
		css: css`
      .x { background: #ffe14d; display: grid; place-items: center; font-family: 'Bricolage Grotesque', sans-serif; color: #000; padding: 18px; }
      .card { width: min(100%, 440px); background: #fff; border: 3px solid #000; border-radius: 10px; box-shadow: 8px 8px 0 #000; padding: 22px; display: grid; gap: 14px; position: relative; }
      .tag { position: absolute; top: -16px; right: 18px; background: #ff6bcb; border: 3px solid #000; border-radius: 99px; padding: 3px 12px; font-weight: 700; font-size: 13px; rotate: 6deg; }
      h3 { margin: 0; font-size: clamp(26px, 4.6cqw, 36px); line-height: 1; letter-spacing: -.03em; font-weight: 800; }
      p { margin: 0; font: 500 14px/1.4 'Schibsted Grotesk', sans-serif; }
      .row { display: flex; gap: 12px; flex-wrap: wrap; }
      button { font: 700 15px 'Bricolage Grotesque', sans-serif; border: 3px solid #000; border-radius: 8px; padding: 10px 18px; background: #6bd4ff; box-shadow: 4px 4px 0 #000; transition: translate .08s, box-shadow .08s; color: #000; }
      button.alt { background: #fff; }
      button:active { translate: 4px 4px; box-shadow: 0 0 0 #000; }
      .inp { border: 3px solid #000; border-radius: 8px; padding: 10px 12px; font: 500 14px 'Schibsted Grotesk', sans-serif; background: #fffbe6; }
    `,
		html: html`<div class="x"><div class="card"><span class="tag">New!</span>
      <h3>Sell your zine in five minutes.</h3><p>No storefront to design. Paste a link, set a price, get paid.</p>
      <div class="inp">yourname@studio.cool</div>
      <div class="row"><button>Get started</button><button class="alt">See examples</button></div></div></div>`
	},
	{
		id: "claymorphism",
		css: css`
      .x { background: #f3e9ff; display: grid; place-items: center; font-family: 'Bricolage Grotesque', sans-serif; color: #3b2a55; padding: 18px; }
      .w { display: grid; grid-template-columns: 1.2fr 1fr; gap: 18px; width: min(100%, 560px); }
      .clay { border-radius: 32px; box-shadow: 14px 14px 30px rgb(120 80 170 / .25), inset -8px -8px 16px rgb(80 40 140 / .18), inset 8px 8px 16px rgb(255 255 255 / .75); }
      .main { background: #c9b2ff; padding: 22px; display: grid; gap: 10px; }
      .main b { font-size: 28px; letter-spacing: -.02em; } .main span { font: 500 13px 'Schibsted Grotesk', sans-serif; }
      .prog { height: 18px; border-radius: 99px; background: #b29bf0; box-shadow: inset 3px 3px 6px rgb(80 40 140 / .3), inset -3px -3px 6px rgb(255 255 255 / .4); }
      .prog i { display: block; width: 68%; height: 100%; border-radius: inherit; background: #ffb4d0; box-shadow: inset -3px -3px 6px rgb(200 60 120 / .3), inset 3px 3px 6px rgb(255 255 255 / .7); }
      .side { display: grid; gap: 18px; }
      .s { background: #ffd8a8; padding: 16px; display: flex; align-items: center; gap: 12px; font-weight: 600; }
      .s.b { background: #b8f0d8; }
      .ball { width: 44px; aspect-ratio: 1; border-radius: 50%; background: #ff8fab; box-shadow: inset -5px -5px 10px rgb(180 40 90 / .35), inset 5px 5px 10px rgb(255 255 255 / .7), 4px 6px 12px rgb(120 80 170 / .25); }
      .s.b .ball { background: #5ccfa0; box-shadow: inset -5px -5px 10px rgb(20 110 80 / .35), inset 5px 5px 10px rgb(255 255 255 / .7), 4px 6px 12px rgb(120 80 170 / .25); }
      @container (width < 520px) { .w { grid-template-columns: 1fr; } }
    `,
		html: html`<div class="x"><div class="w"><div class="clay main"><span>Spanish · Unit 4</span><b>At the market</b><div class="prog"><i></i></div><span>17 of 25 words learned</span></div>
      <div class="side"><div class="clay s"><i class="ball"></i>Daily streak 12</div><div class="clay s b"><i class="ball"></i>Review 8 words</div></div></div></div>`
	},
	{
		id: "y2k-chrome",
		css: css`
      .x { background: conic-gradient(from 200deg at 60% 40%, #c7f0ff, #e5c9ff, #ffd6f2, #d4fff0, #c7f0ff); display: grid; place-content: center; text-align: center; font-family: 'Bricolage Grotesque', sans-serif; overflow: hidden; }
      .x::before { content: ""; position: absolute; inset: 0; background: repeating-radial-gradient(circle at 60% 40%, rgb(255 255 255 / .35) 0 2px, transparent 2px 22px); }
      .burst { position: absolute; width: 130px; aspect-ratio: 1; right: 8%; top: 10%; background: #ff3ea5; clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); animation: spin 12s linear infinite; }
      .burst2 { width: 60px; left: 10%; top: auto; bottom: 14%; right: auto; background: #4dd2ff; animation-duration: 8s; }
      @keyframes spin { to { rotate: 1turn; } }
      h2 { position: relative; margin: 0; font-size: clamp(58px, 15cqw, 170px); font-weight: 800; font-stretch: 75%; line-height: .85; letter-spacing: -.03em;
        background: linear-gradient(180deg, #fdfdfd 0%, #9aa3b5 38%, #ffffff 48%, #3b4254 52%, #b9c2d6 75%, #f4f7ff 100%); -webkit-background-clip: text; background-clip: text; color: transparent;
        -webkit-text-stroke: 1.5px rgb(40 50 80 / .6); filter: drop-shadow(0 4px 0 rgb(80 60 160 / .35)); }
      .win { position: relative; margin: 16px auto 0; width: 260px; background: #e8e8f0; border: 2px solid; border-color: #fff #6b6b80 #6b6b80 #fff; font: 12px 'Spline Sans Mono', monospace; text-align: left; }
      .win .tb { background: linear-gradient(90deg, #2a2aa8, #c03ad6); color: #fff; padding: 3px 6px; display: flex; justify-content: space-between; }
      .win p { margin: 0; padding: 8px 10px; color: #222; }
    `,
		html: html`<div class="x"><i class="burst"></i><i class="burst burst2"></i><h2>CYBER<br>2000</h2>
      <div class="win"><div class="tb"><span>welcome.exe</span><span>_ □ x</span></div><p>Loading the future... 98%</p></div></div>`
	},
	{
		id: "grain-texture",
		css: css`
      .x { display: grid; grid-template-columns: 1fr 1fr; font-family: 'Fraunces', serif; color: #fff4e6; }
      .p { position: relative; background: linear-gradient(160deg, #f6a14b 0%, #d9534f 45%, #5b2348 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 22px; overflow: hidden; }
      .p.g::after { content: ""; position: absolute; inset: 0; background-image: ${"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}; mix-blend-mode: overlay; opacity: .55; pointer-events: none; }
      .p b { position: relative; z-index: 1; font-weight: 400; font-size: clamp(26px, 4.4cqw, 44px); line-height: 1; }
      .p small { position: relative; z-index: 1; font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .1em; text-transform: uppercase; opacity: .85; margin-top: 8px; }
    `,
		html: html`<div class="x"><div class="p"><b>Smooth</b><small>Flat gradient, visible banding</small></div><div class="p g"><b>Printed</b><small>feTurbulence grain, overlay 55%</small></div></div>`
	},
	{
		id: "tactile-skeuomorphism",
		css: css`
      .x { background: #d9d7d2; display: grid; place-items: center; font-family: 'Spline Sans Mono', monospace; color: #3a3935; padding: 16px; }
      .dev { width: min(100%, 520px); background: linear-gradient(180deg, #efede8, #dfddd7); border-radius: 18px; padding: 22px; box-shadow: 0 1px 0 #fff inset, 0 -2px 0 rgb(0 0 0 / .08) inset, 0 20px 40px -12px rgb(40 35 25 / .35), 0 2px 4px rgb(40 35 25 / .15);
        display: grid; grid-template-columns: auto 1fr auto; gap: 22px; align-items: center; }
      .lbl { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: #77746c; text-align: center; margin-top: 8px; }
      .knob { width: 92px; aspect-ratio: 1; border-radius: 50%; position: relative;
        background: repeating-conic-gradient(from 0deg, #cfcdc7 0 4deg, #e9e7e2 4deg 8deg); box-shadow: 0 6px 10px rgb(40 35 25 / .3), 0 1px 0 #fff inset; rotate: -40deg; transition: rotate .3s; }
      .knob::before { content: ""; position: absolute; inset: 14%; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fbfaf7, #d8d6d0); box-shadow: 0 1px 2px rgb(0 0 0 / .2); }
      .knob::after { content: ""; position: absolute; left: 50%; top: 18%; width: 4px; height: 16%; translate: -50% 0; border-radius: 2px; background: #ff5a1f; }
      .knob:hover { rotate: 60deg; }
      .keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .key { aspect-ratio: 1; border-radius: 10px; background: linear-gradient(180deg, #f8f7f3, #e2e0da); box-shadow: 0 4px 0 #b9b6ae, 0 6px 8px rgb(40 35 25 / .25), 0 1px 0 #fff inset; display: grid; place-items: center; font-size: 12px; transition: translate .06s, box-shadow .06s; user-select: none; }
      .key.or { background: linear-gradient(180deg, #ff7a3d, #ec5a1c); color: #fff; box-shadow: 0 4px 0 #b2410f, 0 6px 8px rgb(40 35 25 / .25), 0 1px 0 rgb(255 255 255 / .5) inset; }
      .key:active { translate: 0 3px; box-shadow: 0 1px 0 #b9b6ae, 0 2px 3px rgb(40 35 25 / .25), 0 1px 0 #fff inset; }
      .sw { width: 34px; height: 70px; border-radius: 18px; background: #c7c5bf; box-shadow: inset 0 2px 5px rgb(0 0 0 / .3); position: relative; cursor: pointer; }
      .sw input { appearance: none; position: absolute; inset: 0; margin: 0; cursor: pointer; }
      .sw i { position: absolute; left: 3px; right: 3px; top: 3px; height: 30px; border-radius: 15px; background: linear-gradient(180deg, #fbfaf7, #dddbd5); box-shadow: 0 3px 5px rgb(0 0 0 / .3), 0 1px 0 #fff inset; transition: top .15s cubic-bezier(.3,1.4,.6,1); pointer-events: none; }
      .sw input:checked + i { top: 37px; }
      .led { width: 8px; height: 8px; border-radius: 50%; background: #8a8780; margin: 0 auto 8px; }
      .sw:has(input:checked) ~ .led, .swc:has(input:checked) .led { background: #ff5a1f; box-shadow: 0 0 8px #ff5a1f; }
      @container (width < 520px) { .dev { grid-template-columns: auto 1fr; } .swc { display: none; } }
    `,
		html: html`<div class="x"><div class="dev">
      <div><div class="knob"></div><div class="lbl">Tone</div></div>
      <div><div class="keys"><div class="key">1</div><div class="key">2</div><div class="key or">rec</div><div class="key">4</div><div class="key">5</div><div class="key">6</div></div></div>
      <div class="swc"><div class="led"></div><label class="sw"><input type="checkbox" checked aria-label="Power"><i></i></label><div class="lbl">Power</div></div>
    </div></div>`
	},
	{
		id: "material-elevation",
		css: css`
      .x { background: #f3f1ec; display: grid; grid-template-rows: 1fr auto; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #1f1d1a; }
      .row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; align-items: center; }
      .s { aspect-ratio: 1; border-radius: 12px; background: #fff; display: grid; place-items: center; text-align: center; transition: box-shadow .25s, translate .25s; box-shadow: var(--e); }
      .s b { font: 500 22px 'Spline Sans Mono', monospace; display: block; } .s small { font-size: 11px; color: #77736b; }
      .s:hover { translate: 0 -4px; box-shadow: 0 12px 17px 2px rgb(30 25 15 / .14), 0 5px 22px 4px rgb(30 25 15 / .12); }
      .s[data-e="0"] { --e: 0 0 0 1px #e2dfd8; background: #f3f1ec; }
      .s[data-e="1"] { --e: 0 1px 2px rgb(30 25 15 / .3), 0 1px 3px 1px rgb(30 25 15 / .15); }
      .s[data-e="2"] { --e: 0 1px 2px rgb(30 25 15 / .3), 0 2px 6px 2px rgb(30 25 15 / .15); }
      .s[data-e="3"] { --e: 0 1px 3px rgb(30 25 15 / .3), 0 4px 8px 3px rgb(30 25 15 / .15); }
      .s[data-e="4"] { --e: 0 2px 3px rgb(30 25 15 / .3), 0 6px 10px 4px rgb(30 25 15 / .15); }
      .s[data-e="5"] { --e: 0 4px 4px rgb(30 25 15 / .3), 0 8px 12px 6px rgb(30 25 15 / .15); }
      .foot { display: flex; justify-content: space-between; align-items: end; }
      .foot p { margin: 0; font-size: 12.5px; color: #77736b; max-width: 40ch; }
      .fab { width: 56px; height: 56px; border-radius: 16px; background: #ffd9c2; color: #3a1b08; display: grid; place-items: center; font-size: 28px; box-shadow: 0 1px 3px rgb(30 25 15 / .3), 0 4px 8px 3px rgb(30 25 15 / .15); }
      @container (width < 560px) { .row { grid-template-columns: repeat(3, 1fr); } }
    `,
		html: html`<div class="x"><div class="row">${[
			0,
			1,
			2,
			3,
			4,
			5
		].map((e) => `<div class="s" data-e="${e}"><div><b>${e}</b><small>level</small></div></div>`).join("")}</div>
      <div class="foot"><p>Each level pairs a tight key shadow with a soft ambient one. Hover a surface to raise it.</p><div class="fab" aria-label="Create">+</div></div></div>`
	},
	{
		id: "flat-design",
		css: css`
      .x { background: #ecf0f1; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 1fr); gap: 8px; padding: 8px; font-family: 'Schibsted Grotesk', sans-serif; color: #fff; }
      .t { padding: 14px; display: flex; flex-direction: column; justify-content: space-between; background: var(--c); }
      .t span { font-size: 13px; font-weight: 600; }
      .t svg { width: 40px; height: 40px; }
      .w2 { grid-column: span 2; }
      .t b { font-weight: 300; font-size: clamp(30px, 6cqw, 58px); line-height: 1; }
    `,
		html: html`<div class="x">
      <div class="t w2" style="--c:#2980b9"><b>21°</b><span>Weather · Clear</span></div>
      <div class="t" style="--c:#e67e22"><svg viewBox="0 0 40 40"><rect x="6" y="9" width="28" height="24" fill="none" stroke="#fff" stroke-width="3"/><path d="M6 16h28M13 5v8M27 5v8" stroke="#fff" stroke-width="3"/></svg><span>Calendar</span></div>
      <div class="t" style="--c:#27ae60"><svg viewBox="0 0 40 40"><path d="M5 9h30v20H16l-8 6v-6H5z" fill="#fff"/></svg><span>Messages</span></div>
      <div class="t" style="--c:#8e44ad"><svg viewBox="0 0 40 40"><circle cx="13" cy="28" r="6" fill="#fff"/><path d="M19 28V7l14-3v19" fill="none" stroke="#fff" stroke-width="3"/><circle cx="29" cy="24" r="5" fill="#fff"/></svg><span>Music</span></div>
      <div class="t" style="--c:#c0392b"><svg viewBox="0 0 40 40"><rect x="4" y="9" width="32" height="22" fill="#fff"/><path d="M4 9l16 12L36 9" fill="none" stroke="#c0392b" stroke-width="3"/></svg><span>Mail</span></div>
      <div class="t w2" style="--c:#16a085"><b>4 new</b><span>Photos · Shared album</span></div>
    </div>`
	},
	{
		id: "web-brutalism",
		css: css`
      .x { background: #fff; color: #000; font: 16px/1.3 'Times New Roman', Times, serif; padding: 12px 16px; overflow: hidden; }
      h1 { font-size: 34px; margin: 0 0 4px; font-weight: bold; }
      a { color: #00e; } a:visited { color: #551a8b; }
      hr { border: 0; border-top: 1px solid #000; margin: 8px 0; }
      table { border-collapse: collapse; width: 100%; font-size: 14px; } td, th { border: 1px solid #000; padding: 4px 6px; text-align: left; vertical-align: top; }
      .mono { font-family: 'Courier New', monospace; font-size: 13px; }
      mark { background: #ff0; }
      .marq { background: #000; color: #0f0; font-family: 'Courier New', monospace; font-size: 13px; padding: 2px 6px; white-space: nowrap; overflow: hidden; }
      .marq span { display: inline-block; animation: m 14s linear infinite; } @keyframes m { from { translate: 100% 0; } to { translate: -100% 0; } }
    `,
		html: html`<div class="x">
      <h1>JANE DOE / WORK / 2014–2026</h1>
      <div class="mono">last updated: <mark>today</mark> · <a href="#">index</a> · <a href="#">about</a> · <a href="#">rss</a></div><hr>
      <table><tr><th>year</th><th>project</th><th>notes</th></tr>
        <tr><td>2026</td><td><a href="#">a website that is only a list</a></td><td>this one.</td></tr>
        <tr><td>2024</td><td><a href="#">printed matter</a></td><td>48 pages, risograph, sold out</td></tr>
        <tr><td>2021</td><td><a href="#">no javascript club</a></td><td>still running</td></tr>
        <tr><td>2017</td><td><a href="#">untitled (blue links)</a></td><td>exhibited, then deleted</td></tr></table><hr>
      <div class="marq"><span>THE WEB WAS NEVER BROKEN · VIEW SOURCE · THE WEB WAS NEVER BROKEN · VIEW SOURCE</span></div>
    </div>`
	},
	{
		id: "squircle-corners",
		css: css`
      .x { background: #f2f0eb; display: grid; grid-template-rows: 1fr auto; padding: 22px; font-family: 'Schibsted Grotesk', sans-serif; color: #24221e; }
      .cmp { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center; }
      .col { display: grid; justify-items: center; gap: 12px; }
      .col small { font: 500 11px 'Spline Sans Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: #7c776e; }
      .sh { width: clamp(110px, 24cqw, 200px); aspect-ratio: 1; background: linear-gradient(160deg, #ff8a4c, #e2462b); border-radius: 28%; box-shadow: 0 16px 30px -10px rgb(160 50 20 / .5); }
      .sq { background: linear-gradient(160deg, #3c86ff, #2347d6); box-shadow: 0 16px 30px -10px rgb(30 60 180 / .5); }
      @supports (corner-shape: squircle) { .sq { border-radius: 50%; corner-shape: squircle; } }
      .icons { display: flex; gap: 10px; justify-content: center; }
      .icons i { width: 34px; aspect-ratio: 1; border-radius: 24%; background: var(--c); }
      @supports (corner-shape: squircle) { .icons i { border-radius: 40%; corner-shape: squircle; } }
      .st { font-size: 12.5px; color: #7c776e; text-align: center; margin: 14px 0 0; }
      .st b { color: #24221e; }
      .yes { display: none; } @supports (corner-shape: squircle) { .yes { display: inline; } .no { display: none; } }
    `,
		html: html`<div class="x"><div class="cmp">
      <div class="col"><div class="sh"></div><small>border-radius: 28%</small></div>
      <div class="col"><div class="sh sq"></div><small>corner-shape: squircle</small><div class="icons"><i style="--c:#2bb673"></i><i style="--c:#f4b400"></i><i style="--c:#7a5af8"></i><i style="--c:#ff5a5f"></i></div></div>
    </div><p class="st"><b class="yes">Your browser draws native squircles.</b><b class="no">Your browser shows the border-radius fallback.</b> Continuous curvature has no visible joint where the curve meets the edge.</p></div>`
	},
	{
		id: "dithered-pixel",
		css: css`
      .x { background: #fff; display: grid; place-items: center; font-family: 'Spline Sans Mono', monospace; color: #000; padding: 14px;
        background-image: repeating-conic-gradient(#000 0 25%, #fff 0 50%); background-size: 4px 4px; }
      :host(:not([data-interactive])) .x { background: #8c8c8c; }
      .win { width: min(100%, 520px); background: #fff; border: 2px solid #000; box-shadow: 4px 4px 0 #000; }
      .tb { height: 22px; border-bottom: 2px solid #000; display: grid; place-items: center; font-size: 12px; font-weight: 700;
        background: repeating-linear-gradient(180deg, #000 0 2px, #fff 2px 4px) content-box; padding: 4px 6px; }
      .tb span { background: #fff; padding: 0 8px; line-height: 14px; }
      .body { display: grid; grid-template-columns: 1fr 1fr; }
      .scene { aspect-ratio: 4 / 3; position: relative; overflow: hidden; border-right: 2px solid #000; image-rendering: pixelated; }
      .band { position: absolute; left: 0; right: 0; height: 20%; }
      .d1 { top: 0; background: #fff; }
      .d2 { top: 20%; background: repeating-conic-gradient(#000 0 25%, #fff 0 100%) 0 0 / 4px 4px; }
      .d3 { top: 40%; background: repeating-conic-gradient(#000 0 25%, #fff 0 50%) 0 0 / 4px 4px; }
      .d4 { top: 60%; background: repeating-conic-gradient(#fff 0 25%, #000 0 100%) 0 0 / 4px 4px; }
      .d5 { top: 80%; background: #000; }
      .sun { position: absolute; width: 30%; aspect-ratio: 1; left: 56%; top: 14%; border-radius: 50%; background: #fff; border: 2px solid #000; }
      .hill { position: absolute; left: -10%; right: -10%; bottom: -30%; height: 70%; border-radius: 50%; background: repeating-conic-gradient(#000 0 25%, #fff 0 50%) 0 0 / 2px 2px; border-top: 2px solid #000; }
      .txt { padding: 12px; font-size: 12px; line-height: 1.5; }
      .txt b { display: block; font-size: 15px; margin-bottom: 6px; }
      .btn { display: inline-block; margin-top: 10px; border: 2px solid #000; border-radius: 8px; padding: 3px 14px; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000; font-weight: 700; }
      .cur { display: inline-block; width: 8px; height: 13px; background: #000; vertical-align: -2px; animation: blink 1s steps(1) infinite; }
      @keyframes blink { 50% { opacity: 0; } }
    `,
		html: html`<div class="x"><div class="win"><div class="tb"><span>Dither.app</span></div><div class="body">
      <div class="scene"><i class="band d1"></i><i class="band d2"></i><i class="band d3"></i><i class="band d4"></i><i class="band d5"></i><i class="sun"></i><i class="hill"></i></div>
      <div class="txt"><b>Ordered dither</b>Five tones from two colors: white, 25, 50, 75 percent and black, each a 4px pattern.<span class="cur"></span><br><span class="btn">OK</span></div>
    </div></div></div>`
	}
];
//#endregion
//#region junkyard/design-almanac/examples/type.ts
var letters = (word) => [...word].map((c, i) => `<span style="--i:${i}">${c}</span>`).join("");
var TYPE_EXAMPLES = [
	{
		id: "editorial-serif",
		css: css`
      .x { background: #fbf8f2; color: #1e1b16; padding: 28px clamp(20px, 6cqw, 72px); font-family: 'Fraunces', serif; overflow: hidden; }
      .w { max-width: 860px; margin: 0 auto; }
      .k { font: 600 11px 'Schibsted Grotesk', sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #a3321d; border-top: 1px solid #1e1b16; padding-top: 8px; display: flex; justify-content: space-between; }
      .k span { color: #7a7368; font-weight: 500; }
      h2 { font-weight: 400; font-optical-sizing: auto; font-size: clamp(34px, 6.4cqw, 68px); line-height: .98; letter-spacing: -.02em; margin: 14px 0 10px; text-wrap: balance; }
      h2 em { font-weight: 300; }
      .deck { font: italic 300 clamp(16px, 2.2cqw, 21px)/1.35 'Fraunces', serif; color: #4a443b; margin: 0 0 14px; max-width: 46ch; }
      .by { font: 500 11.5px 'Schibsted Grotesk', sans-serif; color: #7a7368; margin-bottom: 14px; }
      .by b { color: #1e1b16; font-weight: 600; }
      .body { columns: 2 240px; column-gap: 28px; column-rule: 1px solid #e5dfd3; font-size: 14px; line-height: 1.55; text-wrap: pretty; hyphens: auto; }
      .body p { margin: 0 0 10px; }
    `,
		html: html`<div class="x"><article class="w">
      <div class="k">Essay<span>No. 37 · Autumn</span></div>
      <h2>The quiet return of <em>the long sentence</em></h2>
      <p class="deck">After a decade of skimmable bullet points, readers are choosing prose that asks for their time.</p>
      <div class="by">By <b>Mara Okafor</b> · 14 minute read</div>
      <div class="body"><p>There is a particular pleasure in a sentence that knows where it is going but takes the scenic route, pausing at a clause, leaning on a comma, arriving later than you expected and better for it.</p><p>Editors noticed first. Pieces that ran long were read to the end more often, not less, provided the type was generous and the measure kind to the eye.</p><p>The page, it turns out, still matters on a screen.</p></div>
    </article></div>`
	},
	{
		id: "kinetic-type",
		css: css`
      .x { background: #141311; color: #f1ebe0; display: grid; place-content: center; text-align: center; font-family: 'Bricolage Grotesque', sans-serif; overflow: hidden; }
      .big { font-size: clamp(64px, 24cqw, 260px); font-weight: 700; font-stretch: 75%; line-height: .9; letter-spacing: -.02em; display: flex; justify-content: center; }
      .big span { display: inline-block; animation: wave 2.4s cubic-bezier(.5,0,.2,1) infinite; animation-delay: calc(var(--i) * 90ms); }
      .big span:nth-child(3) { color: #ff4f1f; }
      @keyframes wave { 0%, 60%, 100% { translate: 0 0; rotate: 0deg; } 25% { translate: 0 -18%; rotate: -6deg; } 40% { translate: 0 4%; rotate: 2deg; } }
      .line { margin-top: 14px; font: 400 clamp(18px, 3.2cqw, 30px) 'Fraunces', serif; display: flex; gap: .3em; justify-content: center; align-items: baseline; }
      .roll { display: inline-grid; height: 1.2em; overflow: hidden; text-align: left; font-style: italic; color: #ff4f1f; }
      .roll span { grid-area: 1 / 1; animation: roll 6s infinite; animation-delay: calc(var(--i) * -2s); translate: 0 110%; }
      @keyframes roll { 0% { translate: 0 110%; } 5%, 30% { translate: 0 0; } 35%, 100% { translate: 0 -110%; } }
      @media (prefers-reduced-motion: reduce) { .roll span { animation: none; } .roll span:first-child { translate: 0 0; } }
    `,
		html: html`<div class="x">
      <div class="big" aria-label="Motion">${letters("MOTION")}</div>
      <div class="line">Type that can <span class="roll" aria-label="speak, dance, shout"><span style="--i:0">speak.</span><span style="--i:1">dance.</span><span style="--i:2">shout.</span></span></div>
    </div>`
	},
	{
		id: "variable-fonts",
		css: css`
      .x { background: #f0ebe1; color: #1f1a14; display: grid; grid-template-rows: 1fr auto; padding: 24px clamp(18px, 4cqw, 40px); font-family: 'Fraunces', serif; }
      .spec { display: grid; place-items: center; }
      .word { font-size: clamp(80px, 22cqw, 260px); line-height: 1; letter-spacing: -.03em;
        font-variation-settings: "wght" var(--w, 400), "SOFT" var(--s, 0), "WONK" var(--k, 0), "opsz" var(--o, 144);
        animation: breathe 5s ease-in-out infinite alternate; }
      :host([data-interactive]) .word { animation: none; }
      @keyframes breathe { from { font-variation-settings: "wght" 100, "SOFT" 0, "WONK" 0, "opsz" 144; } to { font-variation-settings: "wght" 900, "SOFT" 100, "WONK" 1, "opsz" 144; } }
      .axes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; border-top: 1px solid #1f1a14; padding-top: 10px; font: 500 11px 'Spline Sans Mono', monospace; }
      label { display: grid; gap: 6px; text-transform: uppercase; letter-spacing: .06em; }
      label span { display: flex; justify-content: space-between; } label output { color: #b8431f; }
      input[type=range] { width: 100%; accent-color: #b8431f; margin: 0; }
      @container (width < 560px) { .axes { grid-template-columns: 1fr 1fr; } }
    `,
		html: html`<div class="x">
      <div class="spec"><div class="word">Soft</div></div>
      <div class="axes">
        <label><span>Weight <output>400</output></span><input type="range" data-var="--w" min="100" max="900" value="400"></label>
        <label><span>Soft <output>0</output></span><input type="range" data-var="--s" min="0" max="100" value="0"></label>
        <label><span>Wonk <output>0</output></span><input type="range" data-var="--k" min="0" max="1" step="1" value="0"></label>
        <label><span>Optical <output>144</output></span><input type="range" data-var="--o" min="9" max="144" value="144"></label>
      </div>
    </div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const word = root.querySelector(".word");
			root.querySelectorAll("input[type=range]").forEach((input) => {
				const out = input.parentElement.querySelector("output");
				input.addEventListener("input", () => {
					word.style.setProperty(input.dataset.var, input.value);
					out.textContent = input.value;
				}, { signal });
			});
		}
	},
	{
		id: "oversized-type",
		css: css`
      .x { background: #d7ff3a; color: #0f0f0d; font-family: 'Bricolage Grotesque', sans-serif; display: grid; grid-template-rows: auto 1fr; padding: 18px 20px 0; }
      .top { display: flex; justify-content: space-between; font: 500 12px 'Spline Sans Mono', monospace; text-transform: uppercase; letter-spacing: .08em; }
      h2 { margin: 0; align-self: end; font-size: min(41cqw, 92cqh); font-weight: 800; font-stretch: 75%; line-height: .74; letter-spacing: -.06em; translate: -.04em .1em; white-space: nowrap; }
    `,
		html: html`<div class="x"><div class="top"><span>Studio Ferro</span><span>Brand, type, motion</span><span>Est. 2014</span></div><h2>Ferro</h2></div>`
	},
	{
		id: "modular-scale",
		css: css`
      .x { --base: clamp(13px, 2.3cqw, 17px); --ratio: 1.25; background: #f7f5f0; color: #1d1b17; padding: 20px clamp(18px, 4cqw, 40px); display: grid; grid-template-rows: auto 1fr; gap: 10px; font-family: 'Fraunces', serif; overflow: hidden; }
      .bar { display: flex; gap: 6px; align-items: center; font: 500 11px 'Spline Sans Mono', monospace; color: #77716a; flex-wrap: wrap; }
      .bar button { font: inherit; border: 1px solid #cfc9bd; background: transparent; border-radius: 999px; padding: 3px 10px; color: #1d1b17; }
      .bar button[aria-pressed=true] { background: #1d1b17; color: #f7f5f0; border-color: #1d1b17; }
      .steps { display: grid; align-content: center; }
      .s { display: grid; grid-template-columns: 70px 1fr; align-items: baseline; gap: 10px; border-bottom: 1px solid #e4dfd5; white-space: nowrap; overflow: hidden; }
      .s small { font: 500 10.5px 'Spline Sans Mono', monospace; color: #77716a; }
      .s span { font-size: calc(var(--base) * pow(var(--ratio), var(--n))); line-height: 1.15; letter-spacing: -.01em; }
      .s:first-child span { letter-spacing: -.03em; }
    `,
		html: html`<div class="x">
      <div class="bar"><span>ratio</span><button data-r="1.125" aria-pressed="false">1.125 second</button><button data-r="1.25" aria-pressed="true">1.25 third</button><button data-r="1.333" aria-pressed="false">1.333 fourth</button><button data-r="1.5" aria-pressed="false">1.5 fifth</button></div>
      <div class="steps">${[
			5,
			4,
			3,
			2,
			1,
			0,
			-1
		].map((n) => `<div class="s" style="--n:${n}"><small>step ${n}</small><span>${n >= 3 ? "Harmony" : n >= 0 ? "Every size from one ratio" : "Captions and footnotes stay related to the headline"}</span></div>`).join("")}</div>
    </div>`,
		setup(root, { signal, interactive }) {
			if (!interactive) return;
			const x = root.querySelector(".x");
			const buttons = [...root.querySelectorAll("button[data-r]")];
			for (const b of buttons) b.addEventListener("click", () => {
				x.style.setProperty("--ratio", b.dataset.r);
				buttons.forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
			}, { signal });
		}
	},
	{
		id: "drop-caps",
		css: css`
      .x { background: #f5f0e6; color: #231e17; padding: 26px clamp(20px, 6cqw, 72px); font-family: 'Fraunces', serif; overflow: hidden; }
      .w { max-width: 820px; margin: 0 auto; display: grid; grid-template-columns: 1fr 34%; gap: 30px; align-items: start; }
      p { margin: 0 0 12px; font-size: 15px; line-height: 1.55; text-wrap: pretty; }
      p:first-child::first-letter { initial-letter: 3; -webkit-initial-letter: 3; font-weight: 600; color: #9c2f1a; margin-right: .08em; }
      @supports not ((initial-letter: 3) or (-webkit-initial-letter: 3)) {
        p:first-child::first-letter { float: left; font-size: 4.1em; line-height: .82; padding: .06em .08em 0 0; }
      }
      blockquote { margin: 6px 0 0; border-top: 3px solid #9c2f1a; padding-top: 12px; font: italic 300 clamp(20px, 3.2cqw, 30px)/1.15 'Fraunces', serif; letter-spacing: -.01em; hanging-punctuation: first; }
      blockquote cite { display: block; margin-top: 10px; font: 500 11px 'Spline Sans Mono', monospace; font-style: normal; letter-spacing: .08em; text-transform: uppercase; color: #8a8174; }
      @container (width < 560px) { .w { grid-template-columns: 1fr; gap: 10px; } blockquote { order: -1; } }
    `,
		html: html`<div class="x"><div class="w"><div>
      <p>Long before the printing press, scribes painted the first letter of a chapter in red and gold, so a reader turning pages could find where a new thought began. The habit survived lead type and phototypesetting, and now it survives CSS.</p>
      <p>A drop cap is a door. It tells the eye: start here. The pull quote does the opposite job, lifting one line out of the stream so a browsing reader can decide whether to stay.</p>
    </div><blockquote aria-hidden="true">“A drop cap is a door. It tells the eye: start here.”<cite>Pull quote</cite></blockquote></div></div>`
	}
];
//#endregion
//#region junkyard/design-almanac/examples/index.ts
var ALL = [
	...LAYOUT_EXAMPLES,
	...TYPE_EXAMPLES,
	...COLOR_EXAMPLES,
	...SURFACE_EXAMPLES,
	...MOTION_EXAMPLES,
	...INTERACTION_EXAMPLES,
	...NAVIGATION_EXAMPLES
];
var EXAMPLES = new Map(ALL.map((e) => [e.id, e]));
//#endregion
//#region junkyard/design-almanac/ui/plate-fit.ts
/** Design canvas for the detail plate on wide screens. */
var PLATE_W = 1040;
var PLATE_H = 600;
/** Below this frame width the example renders fluidly at its real size. */
var FLUID_BELOW = 720;
/**
* Wide screens see the example as an enlarged plate: laid out on a fixed
* canvas and zoomed to the frame, so a phone-sized component does not
* float in empty space. Narrow screens get the real, fluid layout.
* Returns a function that stops observing.
*/
function fitPlate(frame, host) {
	const ro = new ResizeObserver(([entry]) => {
		const w = entry.contentRect.width;
		const fluid = w < FLUID_BELOW;
		host.style.width = fluid ? "" : `${PLATE_W}px`;
		host.style.height = fluid ? "" : `${PLATE_H}px`;
		host.style.setProperty("zoom", fluid ? "" : String(w / PLATE_W));
		host.toggleAttribute("data-fluid", fluid);
	});
	ro.observe(frame);
	return () => ro.disconnect();
}
//#endregion
//#region junkyard/design-almanac/examples/base.ts
/**
* Shared sheet adopted by every example's shadow root: a positioned,
* size-contained canvas, plus the pause and reduced-motion switches.
*/
var BASE_CSS = css`
  :host { display: block; position: relative; overflow: hidden; container-type: size; color-scheme: light;
    font: 14px/1.4 'Schibsted Grotesk', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
  *, *::before, *::after { box-sizing: border-box; }
  .x { position: absolute; inset: 0; }
  button { font: inherit; cursor: pointer; }
  :host([data-paused]) *, :host([data-paused]) *::before, :host([data-paused]) *::after { animation-play-state: paused !important; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  }
`;
//#endregion
//#region junkyard/design-almanac/ui/stage.ts
var sheets = /* @__PURE__ */ new Map();
function sheet(key, text) {
	let s = sheets.get(key);
	if (!s) {
		s = new CSSStyleSheet();
		s.replaceSync(text);
		sheets.set(key, s);
	}
	return s;
}
/**
* Renders an example into `host` behind a shadow root, so its CSS is fully
* scoped. Stylesheets are constructed once per example and shared between
* the thumbnail and the detail view. Returns an unmount function.
*/
function mountExample(host, example, interactive) {
	const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
	root.adoptedStyleSheets = [sheet("__base", BASE_CSS), sheet(example.id, example.css)];
	root.innerHTML = example.html;
	host.toggleAttribute("data-interactive", interactive);
	const controller = new AbortController();
	example.setup?.(root, {
		signal: controller.signal,
		interactive
	});
	return () => {
		controller.abort();
		root.replaceChildren();
	};
}
//#endregion
//#region junkyard/design-almanac/ui/detail-view.ts
var note = (title, ...body) => h("section", { class: "note" }, h("h3", {}, title), ...body);
/**
* One entry at full size: the live, interactive example as a plate, then
* the field notes. Returns an unmount function that stops the example.
*/
function mountDetail(container, s, links) {
	const { prev, next } = neighbours(s);
	const chapter = CATEGORIES.find((c) => c.id === s.category);
	const no = formatNumber(entryNumber(s));
	const host = h("div", { class: "plate-host" });
	const frame = h("div", { class: "plate-frame" }, host);
	const navLink = (target, rel) => h("a", {
		class: `step step-${rel}`,
		href: links.style(target.id),
		rel,
		"aria-label": `${rel === "prev" ? "Previous" : "Next"}: ${target.name}`
	}, h("small", {}, rel === "prev" ? "← Previous" : "Next →"), h("span", {}, `${formatNumber(entryNumber(target))} ${target.name}`));
	container.replaceChildren(h("nav", {
		class: "detail-nav",
		"aria-label": "Entry"
	}, h("a", {
		class: "to-index",
		href: links.index
	}, "↑ Contents"), navLink(prev, "prev"), navLink(next, "next")), h("header", { class: `detail-head kind-${s.kind}` }, h("span", {
		class: "detail-no",
		"aria-hidden": "true"
	}, no), h("div", {}, h("p", { class: "detail-kicker" }, h("span", {}, `Chapter ${chapter.numeral}, ${chapter.title}`), h("span", { class: "season-mark" }, KIND_LABEL[s.kind]), h("span", {}, `First seen ${s.firstSeen}`)), h("h1", { id: "detail-title" }, h("span", { class: "sr-only" }, `No. ${no}. `), s.name))), h("figure", { class: "plate" }, frame, h("figcaption", {}, h("b", {}, `Plate ${no}.`), " Live example: real HTML and CSS, not a picture. Hover, click and scroll it.")), h("div", { class: "notes" }, h("p", { class: "lede" }, s.summary), note("When to use", h("p", {}, s.whenToUse)), note("Pitfalls", h("p", {}, s.pitfalls)), note("Key techniques", h("ul", { class: "techniques" }, ...s.techniques.map((t) => h("li", {}, h("code", {}, t))))), note("Filed under", h("p", { class: "tags" }, s.tags.join(", ")))));
	const stopFit = fitPlate(frame, host);
	const example = EXAMPLES.get(s.example);
	const unmount = example ? mountExample(host, example, true) : () => {};
	return () => {
		stopFit();
		unmount();
	};
}
//#endregion
//#region junkyard/design-almanac/ui/filters.ts
var count = (pred) => STYLES.filter(pred).length;
/**
* The index rail: search, season (trending or mainstay) and chapter
* filters. Owns no state; it reports every change through onChange.
*/
function mountFilters(container, onChange) {
	let current = {
		kind: "all",
		category: "all",
		q: ""
	};
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
		placeholder: "glass, grid, 2014…",
		autocomplete: "off",
		spellcheck: false
	});
	search.addEventListener("input", () => emit({ q: search.value }));
	const kindButtons = [
		"all",
		"trending",
		"mainstay"
	].map((k) => {
		const b = h("button", {
			type: "button",
			class: `season season-${k}`,
			"data-kind": k
		}, h("span", {}, k === "all" ? "All" : KIND_LABEL[k]), h("small", {}, String(k === "all" ? STYLES.length : count((s) => s.kind === k))));
		b.addEventListener("click", () => emit({ kind: k }));
		return b;
	});
	const allChapters = h("button", {
		type: "button",
		class: "chapter",
		"data-cat": "all"
	}, h("b", {}, "§"), h("span", {}, "All chapters"));
	allChapters.addEventListener("click", () => emit({ category: "all" }));
	const chapterButtons = [allChapters, ...CATEGORIES.map((c) => {
		const b = h("button", {
			type: "button",
			class: "chapter",
			"data-cat": c.id
		}, h("b", {}, c.numeral), h("span", {}, c.title), h("small", {}, String(count((s) => s.category === c.id))));
		b.addEventListener("click", () => emit({ category: current.category === c.id ? "all" : c.id }));
		return b;
	})];
	const status = h("p", {
		class: "rail-count",
		role: "status"
	});
	container.append(h("label", {
		class: "rail-label",
		for: "q"
	}, "Find a style"), search, h("div", { class: "rail-label" }, "Season"), h("div", { class: "seasons" }, ...kindButtons), h("div", { class: "rail-label" }, "Chapters"), h("nav", {
		class: "chapters",
		"aria-label": "Chapters"
	}, ...chapterButtons), status);
	function paint() {
		if (search.value !== current.q) search.value = current.q;
		kindButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.kind === current.kind)));
		chapterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === current.category)));
	}
	return {
		set(filters) {
			current = filters;
			paint();
		},
		showCount(shown) {
			status.textContent = shown === STYLES.length ? `${STYLES.length} entries` : `${shown} of ${STYLES.length} entries`;
		},
		focusSearch: () => search.focus()
	};
}
//#endregion
//#region junkyard/design-almanac/ui/lazy-thumbs.ts
/**
* Thumbnails mount their live example only when they first come near the
* viewport, and pause their animations whenever they leave it, so the
* index never runs fifty demos at once. Each frame is zoomed from the
* 720px design size to its actual width.
*/
function lazyThumbs(frames) {
	const mounted = /* @__PURE__ */ new WeakSet();
	const io = new IntersectionObserver((entries) => {
		for (const { target, isIntersecting } of entries) {
			const host = target.firstElementChild;
			if (!host) continue;
			host.toggleAttribute("data-paused", !isIntersecting);
			if (isIntersecting && !mounted.has(host)) {
				const example = EXAMPLES.get(host.dataset.example ?? "");
				if (example) mountExample(host, example, false);
				mounted.add(host);
			}
		}
	}, { rootMargin: "240px 0px" });
	const ro = new ResizeObserver((entries) => {
		for (const { target, contentRect } of entries) target.style.setProperty("--z", String(contentRect.width / 720));
	});
	for (const frame of frames) {
		io.observe(frame);
		ro.observe(frame);
	}
}
//#endregion
//#region junkyard/design-almanac/ui/index-view.ts
function entryRow(s, href) {
	const frame = h("div", {
		class: "thumb",
		"aria-hidden": "true",
		inert: true
	}, h("div", {
		class: "thumb-host",
		"data-example": s.example
	}));
	return {
		row: h("a", {
			class: `entry kind-${s.kind}`,
			href: href(s.id),
			"data-id": s.id
		}, h("span", { class: "entry-no" }, formatNumber(entryNumber(s))), h("span", { class: "entry-text" }, h("span", { class: "entry-name" }, s.name), h("span", { class: "entry-summary" }, s.summary), h("span", { class: "entry-meta" }, h("span", { class: "season-mark" }, KIND_LABEL[s.kind]), ` · ${s.firstSeen}`)), frame),
		frame
	};
}
/**
* The table of contents: chapters in almanac order, each a list of
* numbered entries with a live thumbnail. Built once; filtering only
* toggles visibility so mounted thumbnails survive.
*/
function mountIndex(container, href) {
	const rows = /* @__PURE__ */ new Map();
	const frames = /* @__PURE__ */ new Map();
	const chapters = [];
	for (const c of CATEGORIES) {
		const entries = STYLES.filter((s) => s.category === c.id);
		const list = h("div", { class: "entries" });
		for (const s of entries) {
			const { row, frame } = entryRow(s, href);
			rows.set(s.id, row);
			frames.set(s.id, frame);
			list.append(row);
		}
		const el = h("section", {
			class: "chapter-block",
			id: `chapter-${c.id}`,
			"aria-labelledby": `h-${c.id}`
		}, h("header", { class: "chapter-head" }, h("span", { class: "chapter-numeral" }, c.numeral), h("h2", { id: `h-${c.id}` }, c.title), h("p", {}, c.blurb)), list);
		chapters.push({
			el,
			ids: entries.map((s) => s.id)
		});
		container.append(el);
	}
	const empty = h("p", {
		class: "empty",
		hidden: true
	}, "Nothing in the almanac matches. Try a broader word, or clear the filters.");
	container.append(empty);
	lazyThumbs([...frames.values()]);
	return {
		apply(filters) {
			let shown = 0;
			for (const s of STYLES) {
				const ok = matches(s, filters);
				rows.get(s.id).hidden = !ok;
				if (ok) shown++;
			}
			for (const ch of chapters) ch.el.hidden = ch.ids.every((id) => rows.get(id).hidden);
			empty.hidden = shown > 0;
			return shown;
		},
		frameFor: (id) => frames.get(id)
	};
}
//#endregion
//#region junkyard/design-almanac/ui/route.ts
function readRoute(hash = window.location.hash) {
	const p = new URLSearchParams(hash.replace(/^#/, ""));
	const kind = p.get("kind");
	const cat = p.get("cat");
	return {
		style: p.get("style") ?? void 0,
		filters: {
			kind: isKind(kind) ? kind : "all",
			category: isCategory(cat) ? cat : "all",
			q: (p.get("q") ?? "").slice(0, 80)
		}
	};
}
function routeHash({ style, filters }) {
	const p = new URLSearchParams();
	if (style) p.set("style", style);
	if (filters.kind !== NO_FILTERS.kind) p.set("kind", filters.kind);
	if (filters.category !== NO_FILTERS.category) p.set("cat", filters.category);
	if (filters.q) p.set("q", filters.q);
	const s = p.toString();
	return s ? `#${s}` : "";
}
/** Push for navigation (back button returns), replace for filter typing. */
function writeRoute(route, mode) {
	const hash = routeHash(route);
	if (hash === window.location.hash) return;
	const url = hash || window.location.pathname + window.location.search;
	if (mode === "push") history.pushState(null, "", url);
	else history.replaceState(null, "", url);
}
//#endregion
//#region junkyard/design-almanac/main.ts
var BASE_TITLE = document.title;
var detailEl = byId("detail");
var indexFilters = NO_FILTERS;
var unmountDetail;
var currentStyle;
var indexScroll = 0;
var styleHref = (id) => routeHash({
	style: id,
	filters: NO_FILTERS
});
var indexHref = () => routeHash({ filters: indexFilters }) || "#";
var filters = mountFilters(byId("rail"), (f) => {
	indexFilters = f;
	filters.showCount(index.apply(f));
	writeRoute({ filters: f }, "replace");
});
var index = mountIndex(byId("toc"), styleHref);
function showIndex(f) {
	unmountDetail?.();
	unmountDetail = void 0;
	currentStyle = void 0;
	document.body.dataset.view = "index";
	document.title = BASE_TITLE;
	indexFilters = f;
	filters.set(f);
	filters.showCount(index.apply(f));
}
function showDetail(id) {
	const s = findStyle(id);
	unmountDetail?.();
	currentStyle = id;
	document.body.dataset.view = "detail";
	document.title = `${s.name} · ${BASE_TITLE}`;
	unmountDetail = mountDetail(detailEl, s, {
		index: indexHref(),
		style: styleHref
	});
}
/** Morph the clicked thumbnail into the plate (and back) where supported. */
function transition(update, styleId) {
	const start = document.startViewTransition;
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (!start || reduce || !styleId) return update();
	const thumb = index.frameFor(styleId);
	const plate = () => detailEl.querySelector(".plate-frame");
	const tag = (el, on) => el && (el.style.viewTransitionName = on ? "almanac-plate" : "");
	const toDetail = document.body.dataset.view !== "detail";
	tag(toDetail ? thumb : plate(), true);
	start.call(document, () => {
		tag(toDetail ? thumb : plate(), false);
		update();
		tag(toDetail ? plate() : thumb, true);
	}).finished.finally(() => {
		tag(thumb, false);
		tag(plate(), false);
	});
}
function render(route) {
	const style = route.style && findStyle(route.style) ? route.style : void 0;
	if (style === currentStyle && style) return;
	const wasDetail = document.body.dataset.view === "detail";
	if (style) {
		if (!wasDetail) indexScroll = window.scrollY;
		transition(() => {
			showDetail(style);
			window.scrollTo(0, 0);
		}, !wasDetail ? style : void 0);
	} else {
		const leaving = currentStyle;
		transition(() => {
			showIndex(route.filters);
			if (wasDetail) {
				const row = leaving && document.querySelector(`.entry[data-id="${leaving}"]`);
				if (row && !row.hidden) row.scrollIntoView({ block: "center" });
				else window.scrollTo(0, indexScroll);
			}
		}, leaving);
	}
}
window.addEventListener("hashchange", () => render(readRoute()));
document.addEventListener("keydown", (e) => {
	const target = e.target;
	if (e.metaKey || e.ctrlKey || e.altKey || target.closest("input, textarea, select, .plate")) return;
	if (document.body.dataset.view === "index" && e.key === "/") {
		e.preventDefault();
		filters.focusSearch();
		return;
	}
	const s = findStyle(currentStyle);
	if (!s) return;
	if (e.key === "Escape") window.location.hash = indexHref();
	if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
		const { prev, next } = neighbours(s);
		writeRoute({
			style: (e.key === "ArrowLeft" ? prev : next).id,
			filters: NO_FILTERS
		}, "push");
		render(readRoute());
	}
});
var initial = readRoute();
showIndex(initial.filters);
if (initial.style && findStyle(initial.style)) showDetail(initial.style);
//#endregion

//# sourceMappingURL=main.js.map