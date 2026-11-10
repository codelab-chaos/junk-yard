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
//#region junkyard/ai-model-guide/data/jobs.ts
/**
* Editor's picks per job. "Top pick" is the best result; "Runner-up" is the
* strongest alternative, often with a different trade-off; "Cheapest drafts"
* is where to iterate before spending on the final, usually a fast model or
* one with free relaxed reruns. Picks can be any model; the guide marks
* which run only on Leonardo or not on it at all.
*/
var JOBS = [
	{
		id: "photo",
		modality: "image",
		label: "Photoreal people and places",
		need: "Believable skin, light and lenses.",
		best: "gpt-image-2-5-flare",
		value: "nano-banana-2-1",
		budget: "lucid-realism",
		note: "Describe the camera: lens, light, time of day. Lucid Realism tends toward one face, so describe the person."
	},
	{
		id: "text",
		modality: "image",
		label: "Text, posters and logos",
		need: "Every word spelled right, where you asked for it.",
		best: "gpt-image-2-5-sunburst",
		value: "ideogram-4-5",
		budget: "lucid-origin",
		note: "Put the exact words in quotes. Short text works on most top models; long or small text needs Sunburst, GPT Image 2 or Nano Banana Pro."
	},
	{
		id: "character",
		modality: "image",
		label: "The same character across images",
		need: "One face, outfit or product that holds across a series.",
		best: "nano-banana-2-1",
		value: "flux-3-image",
		budget: "phoenix-1",
		note: "Generate one hero image, then feed it back as a reference for every later shot. Change one thing per edit."
	},
	{
		id: "product",
		modality: "image",
		label: "Product shots and ads",
		need: "Clean surfaces, brand colors, room for copy.",
		best: "flux-3-image",
		value: "seedream-5-pro",
		budget: "lucid-realism",
		note: "Give brand colors as hex codes (FLUX) and attach the real product as a reference."
	},
	{
		id: "illustration",
		modality: "image",
		label: "Illustration, anime and concept art",
		need: "A strong style that stays on brief.",
		best: "midjourney-v8-1",
		value: "gpt-image-2-5-flare",
		budget: "phoenix-1",
		note: "A style reference image beats a paragraph of style words."
	},
	{
		id: "edit",
		modality: "image",
		label: "Edit an image you already have",
		need: "Change one thing and leave the rest alone.",
		best: "gpt-image-2-5-sunburst",
		value: "nano-banana-2-1",
		note: "Editing beats rerolling once an image is mostly right. Quality drifts over long edit chains: restart from the best version."
	},
	{
		id: "infographic",
		modality: "image",
		label: "Diagrams, infographics and mockups",
		need: "Logic, layout and lots of correct text.",
		best: "nano-banana-pro",
		value: "nano-banana-2-1",
		budget: "gpt-image-2-5-flare",
		note: "Check every number and label; these models can invent facts in charts."
	},
	{
		id: "drafts",
		modality: "image",
		label: "Quick ideas and moodboards",
		need: "Many options, fast and cheap.",
		best: "lucid-origin",
		value: "nano-banana-2-lite",
		budget: "muse-image",
		note: "Explore wide and cheap, then rerun the winner on a top model. On Leonardo, Flow State streams variations at 1 token an image."
	},
	{
		id: "print",
		modality: "image",
		label: "4K print and large formats",
		need: "Real detail at size, not an upscale of mush.",
		best: "flux-3-image",
		value: "nano-banana-2-1",
		budget: "lucid-origin",
		note: "Draft at 1K, then render the keeper at 4K or run the Pro Upscaler once."
	},
	{
		id: "ad",
		modality: "video",
		label: "Polished ad or product shot with sound",
		need: "Clean motion, strict adherence, audio in one pass.",
		best: "seedance-2-5",
		value: "gemini-omni",
		budget: "minimax-h3",
		note: "Start from a finished still as the first frame. Draft without audio at low resolution."
	},
	{
		id: "story",
		modality: "video",
		label: "Multi-shot story with dialogue",
		need: "Several cuts and spoken lines that stay coherent.",
		best: "seedance-2-5",
		value: "kling-3",
		budget: "wan-2-6",
		note: "Script it as numbered shots with camera directions. Plan for 3 to 5 attempts per shot."
	},
	{
		id: "action",
		modality: "video",
		label: "Action, dance and physics",
		need: "Bodies and objects that move believably.",
		best: "wan-3",
		value: "seedance-2-0",
		budget: "hailuo-2-3",
		note: "Describe one action per clip. Hailuo needs a photoreal start frame to avoid its 3D look."
	},
	{
		id: "consistent",
		modality: "video",
		label: "The same character across shots",
		need: "Faces and outfits that survive cuts.",
		best: "kling-o3",
		value: "seedance-2-5",
		budget: "minimax-h3",
		note: "Use 3 to 5 reference images of the character from different angles."
	},
	{
		id: "extend",
		modality: "video",
		label: "Extend or edit a clip",
		need: "Continue past the last frame, or change what is there.",
		best: "flux-3-video",
		value: "runway-aleph-2",
		budget: "gemini-omni",
		note: "FLUX 3 Video continues a clip across the seam; Runway Aleph changes what is already in a shot (objects, light, angle)."
	},
	{
		id: "loops",
		modality: "video",
		label: "Social loops and animated stills",
		need: "Short, cheap, eye-catching motion.",
		best: "minimax-h3",
		value: "hailuo-2-3",
		budget: "motion-2",
		note: "Keep loops short and low resolution while you search. On Leonardo Ultimate, Motion 2.0, Hailuo 2.3 and MiniMax H3 at 480p rerun free once tokens run out."
	},
	{
		id: "music",
		modality: "audio",
		label: "Music for a video",
		need: "A track of the right mood and length.",
		best: "suno-v6",
		value: "music-v1",
		note: "Suno leads for songs with lyrics and gives stems to edit; see the AI Music Session Guide. Leonardo's Music v1 is the convenient choice if your video is already there."
	},
	{
		id: "voice",
		modality: "audio",
		label: "Voiceover and dialogue",
		need: "Natural speech, the right voice.",
		best: "elevenlabs-v4",
		value: "dialogue-v3",
		budget: "seed-audio",
		note: "Many video models now generate speech themselves; add voiceover only when you need control."
	},
	{
		id: "sfx",
		modality: "audio",
		label: "Sound effects",
		need: "Foley for silent clips.",
		best: "sfx-v2",
		note: "Silent models (Hailuo 2.3, Motion 2.0, Seedance 1.0) are where added effects pay off."
	},
	{
		id: "asset",
		modality: "3d",
		label: "A 3D asset from an image",
		need: "A usable mesh with textures.",
		best: "rodin-v2",
		value: "meshy-7",
		note: "Make clean reference views first. Draft at low polygon counts and go dense only for the final."
	}
];
//#endregion
//#region junkyard/ai-model-guide/data/sources.ts
/** Shorthand for a ratings row: quality, adherence, craft, control, speed. */
var rate = (quality, adherence, craft, control, speed) => ({
	quality,
	adherence,
	craft,
	control,
	speed
});
/** Sources cited by more than one entry. Each was read on 2026-10-29. */
var SRC = {
	leoModels: {
		label: "Leonardo model list",
		url: "https://leonardo.ai/models"
	},
	leoImageGuide: {
		label: "Leonardo image model guide",
		url: "https://leonardo.ai/news/ai-image-models"
	},
	leoVideoGuide: {
		label: "Leonardo video model guide",
		url: "https://leonardo.ai/news/ai-video-models"
	},
	leoTokens: {
		label: "Leonardo tokens FAQ",
		url: "https://intercom.help/leonardo-ai/en/articles/9044700-tokens-frequently-asked-questions"
	},
	leoDocs: {
		label: "Leonardo API docs",
		url: "https://docs.leonardo.ai/llms.txt"
	},
	leoDeprecations: {
		label: "Leonardo deprecations",
		url: "https://docs.leonardo.ai/docs/deprecations-changes"
	},
	scopeful: {
		label: "Scopeful token table (third party)",
		url: "https://www.scopeful.org/tools/leonardo"
	},
	aaImage: {
		label: "Artificial Analysis image arena",
		url: "https://artificialanalysis.ai/image/leaderboard/text-to-image"
	},
	aaVideo: {
		label: "Artificial Analysis video arena",
		url: "https://artificialanalysis.ai/video/leaderboard/text-to-video"
	},
	lmImage: {
		label: "LMArena image leaderboard",
		url: "https://arena.ai/leaderboard/text-to-image"
	},
	lmVideo: {
		label: "LMArena video leaderboard",
		url: "https://arena.ai/leaderboard/text-to-video"
	},
	openaiPricing: {
		label: "OpenAI API pricing",
		url: "https://developers.openai.com/api/docs/pricing"
	},
	geminiPricing: {
		label: "Gemini API pricing",
		url: "https://ai.google.dev/gemini-api/docs/pricing"
	},
	runwayApi: {
		label: "Runway API rate card",
		url: "https://docs.dev.runwayml.com/guides/pricing/"
	},
	screenrove: {
		label: "Screenrove Leonardo capture",
		url: "https://screenrove.com/leonardo/flows"
	}
};
//#endregion
//#region junkyard/ai-model-guide/data/models-elsewhere.ts
/**
* Notable models Leonardo does not carry, so the guide answers "which model
* for this job" rather than "which Leonardo model". Prices are the maker's
* API rate where one exists. Research: docs/kb/research/ai-models/aggregators.md
* and docs/kb/research/ai-music/.
*/
var ELSEWHERE_MODELS = [
	{
		id: "midjourney-v8-1",
		name: "Midjourney V8.1",
		maker: "Midjourney",
		modality: "image",
		added: "2026-03",
		on: "not-leonardo",
		line: "The strongest house aesthetic: painterly, cinematic, flattering people. Weaker on literal instructions.",
		scores: rate(5, 3, 3, 3, 4),
		cost: {
			tokens: null,
			usd: .02,
			per: "1 image, share of a subscription",
			source: "est",
			scale: "Basic $10 (about 3.3 fast hours) to Mega $120; Standard and up add unlimited Relax."
		},
		tries: [2, 4],
		use: [
			"Mood, style and concept art where the look matters more than the details",
			"Portraits and fashion",
			"Exploring many directions fast with variations"
		],
		avoid: ["Exact text, counts and layouts", "Automated pipelines: there is no API"],
		tips: ["Use style references and a personal style profile to hold a look", "Vary the strongest grid image rather than rerolling from scratch"],
		elsewhere: "Only in Midjourney's own app and Discord. Subscription only, no API.",
		sources: [
			{
				label: "Midjourney V8.1 default",
				url: "https://updates.midjourney.com/v8-1-is-now-the-default-model"
			},
			{
				label: "Midjourney pricing (third party)",
				url: "https://eesel.ai/blog/midjourney-pricing"
			},
			{
				label: "Midjourney V8 strengths and weaknesses",
				url: "https://www.mindstudio.ai/blog/what-is-midjourney-v8-alpha-strengths-weaknesses"
			}
		]
	},
	{
		id: "mai-image-2-6",
		name: "MAI-Image-2.6",
		maker: "Microsoft",
		modality: "image",
		added: "2026-08",
		on: "not-leonardo",
		line: "Top-five image quality on both public arenas at about four cents an image.",
		scores: rate(5, 4, 4, 3, 4),
		cost: {
			tokens: null,
			usd: .0389,
			per: "1 image",
			source: "third",
			scale: "Flash: about $0.02"
		},
		tries: [1, 3],
		use: ["High-quality photoreal and general images at a low price", "Volume work on Azure"],
		avoid: ["Teams without Azure access: availability is mostly Azure and Microsoft apps"],
		tips: ["Start on Flash for drafts, switch to the full model for finals"],
		elsewhere: "Azure AI Foundry, Bing Image Creator, Copilot.",
		sources: [
			SRC.aaImage,
			SRC.lmImage,
			{
				label: "MAI-Image-2.6 launch",
				url: "https://windowsreport.com/microsoft-releases-mai-image-2-6-surges-to-no-2-on-arena/"
			}
		]
	},
	{
		id: "grok-imagine-image-2",
		name: "Grok Imagine Image 2.0",
		maker: "xAI",
		modality: "image",
		added: "2026-08",
		on: "not-leonardo",
		line: "Top six on both image arenas, with loose content limits.",
		scores: rate(5, 4, 4, 3, 4),
		cost: {
			tokens: null,
			usd: .06,
			per: "1 image",
			source: "third"
		},
		tries: [1, 3],
		use: ["Photoreal and stylised images where the arenas rank it near the top", "Pairing with Grok Imagine video"],
		avoid: ["Brand work that needs the strictest content safeguards"],
		tips: ["Ranked provisionally on one arena; check a few samples against your brief"],
		elsewhere: "xAI API, Grok apps, some aggregators.",
		sources: [
			SRC.aaImage,
			SRC.lmImage,
			{
				label: "Grok Imagine Image 2.0 pricing",
				url: "https://llmgateway.io/models/grok-imagine-image-2-0"
			}
		]
	},
	{
		id: "muse-image",
		name: "Muse Image",
		maker: "Meta",
		modality: "image",
		added: "2026-07",
		on: "not-leonardo",
		line: "Top-ten image quality at a cent an image: the cheapest good drafts.",
		scores: rate(4, 4, 3, 3, 4),
		cost: {
			tokens: null,
			usd: .01,
			per: "1 image",
			source: "third"
		},
		tries: [2, 3],
		use: ["Cheap exploration and moodboards", "Social and ad variants in volume"],
		avoid: ["Small or dense text"],
		tips: ["Draft here, then rerun the winning prompt on a top model"],
		elsewhere: "Meta AI apps and Meta's advertiser tools; API pricing from a single source.",
		sources: [SRC.aaImage, {
			label: "Muse Image launch",
			url: "https://qz.com/meta-muse-image-generator-consumers-advertisers-070726"
		}]
	},
	{
		id: "runway-gen-4-5",
		name: "Runway Gen-4.5",
		maker: "Runway",
		modality: "video",
		added: "2025-12",
		on: "not-leonardo",
		line: "Controllable cinematic video inside a full editing app, with a published API rate.",
		scores: rate(4, 4, 4, 4, 3),
		cost: {
			tokens: null,
			usd: .96,
			per: "8 s clip",
			source: "maker",
			scale: "$0.12 a second on the API; the app charges more per credit."
		},
		tries: [2, 4],
		use: ["Film and ad shots that need camera control and references", "Teams already editing in Runway"],
		avoid: ["Native audio and dialogue: pair with a sound model"],
		tips: ["Lock the first frame with an image, then describe only the motion"],
		elsewhere: "Runway app and API; Adobe Firefly.",
		sources: [SRC.runwayApi, SRC.aaVideo]
	},
	{
		id: "runway-aleph-2",
		name: "Runway Aleph 2",
		maker: "Runway",
		modality: "video",
		added: "",
		on: "not-leonardo",
		line: "Edits video you already have: restyle, relight, add or remove objects, new camera angles.",
		scores: rate(4, 4, 4, 5, 2),
		cost: {
			tokens: null,
			usd: 2.24,
			per: "8 s of edited video",
			source: "maker",
			scale: "$0.28 a second on the API."
		},
		tries: [2, 3],
		use: [
			"Changing a shot without reshooting it",
			"Removing an object or changing the weather or time of day",
			"Making a matching angle of an existing clip"
		],
		avoid: ["Generating from nothing: use a generation model"],
		tips: ["Ask for one change per pass; chain passes for more"],
		elsewhere: "Runway app and API.",
		sources: [SRC.runwayApi]
	},
	{
		id: "suno-v6",
		name: "Suno v6",
		maker: "Suno",
		modality: "audio",
		added: "2026-09",
		on: "not-leonardo",
		line: "Full songs with vocals in any genre, plus stems, MIDI and an editor. Tops the blind music arena.",
		scores: rate(5, 5, 5, 4, 4),
		cost: {
			tokens: null,
			usd: .04,
			per: "1 generation (2 songs), Pro plan share",
			source: "est",
			scale: "Pro $10 for 2,500 credits; 10 credits a generation. Downloads capped at 20 a month on Pro."
		},
		tries: [3, 10],
		use: [
			"Songs with lyrics",
			"Music beds you will edit or split into stems",
			"Covers of your own demos"
		],
		avoid: ["Releasing from the free plan: Suno owns free-plan songs"],
		tips: [
			"Write your own lyrics with section tags",
			"Set Variety to 0 to keep your style prompt as written",
			"See the AI Music Session Guide for tags, stems and mixing"
		],
		elsewhere: "Only on suno.com and its apps.",
		sources: [
			{
				label: "Suno v6 FAQ",
				url: "https://help.suno.com/en/articles/13924481"
			},
			{
				label: "Suno pricing",
				url: "https://suno.com/pricing"
			},
			{
				label: "Artificial Analysis music arena",
				url: "https://artificialanalysis.ai/music/leaderboard/instrumental"
			}
		]
	},
	{
		id: "elevenlabs-v4",
		name: "ElevenLabs v4",
		maker: "ElevenLabs",
		modality: "audio",
		added: "",
		on: "not-leonardo",
		line: "The top-rated text-to-speech: natural narration and character voices in many languages.",
		scores: rate(5, 5, 5, 4, 4),
		cost: {
			tokens: null,
			usd: .05,
			per: "about 1 min of speech",
			source: "est",
			scale: "$40 to $80 per million characters on the API."
		},
		tries: [1, 3],
		use: ["Narration and voiceover", "Character voices and dubbing"],
		avoid: ["Cloning a voice you have no rights to"],
		tips: ["Write numbers and names the way they should be said", "Generate one paragraph at a time and keep the best take"],
		elsewhere: "ElevenLabs app and API; Adobe Firefly; many aggregators.",
		sources: [{
			label: "Artificial Analysis speech arena",
			url: "https://artificialanalysis.ai/text-to-speech/arena"
		}, {
			label: "ElevenLabs pricing",
			url: "https://elevenlabs.io/pricing"
		}]
	}
];
//#endregion
//#region junkyard/ai-model-guide/data/models-image.ts
/**
* Image models on Leonardo.ai, October 2026. Costs are for one 1K image at the
* default quality unless `per` says otherwise. Estimates use 1,200 tokens per
* API dollar (see plans.ts). Ratings: quality, follows prompt, text, edits and
* consistency, speed.
*/
var IMAGE_MODELS = [
	{
		id: "gpt-image-2-5-sunburst",
		name: "GPT Image 2.5 Sunburst",
		maker: "OpenAI",
		modality: "image",
		added: "2026-09",
		status: "new",
		line: "Highest-precision generation and editing. Number one on both public image arenas.",
		scores: rate(5, 5, 5, 5, 2),
		cost: {
			tokens: 16,
			per: "1 image, 1K, Medium",
			source: "est",
			scale: "High ~63 · XHigh ~112 · Max ~250 per image. Same price as Flare."
		},
		tries: [1, 2],
		use: [
			"Small labels, fine line work and dense layouts that must survive a close look",
			"Precise edits to an existing image",
			"Up to 16 reference images"
		],
		avoid: ["Quick drafts: it is 1.5 to 2 times slower than Flare", "Long multi-turn edit chains, which can drift"],
		tips: ["Start at Medium; step up quality only for the final", "Name exact text in quotes and say where it goes"],
		elsewhere: "OpenAI API $0.006 (Low) to $0.21 (Max) per 1024² image. Also on Runway, Magnific, Krea, fal.",
		sources: [
			{
				label: "Leonardo: GPT Image 2.5",
				url: "https://leonardo.ai/news/gpt-image-2-5-now-on-leonardo"
			},
			SRC.openaiPricing,
			SRC.aaImage,
			SRC.lmImage,
			{
				label: "Pixmax Flare vs Sunburst timing",
				url: "https://www.pixmax.ai/blog/gpt-image-2-5-review-flare-sunburst.html"
			}
		]
	},
	{
		id: "gpt-image-2-5-flare",
		name: "GPT Image 2.5 Flare",
		maker: "OpenAI",
		modality: "image",
		added: "2026-09",
		status: "new",
		line: "Fast everyday generation with strong prompt following. Arena number two.",
		scores: rate(5, 5, 4, 4, 3),
		cost: {
			tokens: 16,
			per: "1 image, 1K, Medium",
			source: "est",
			scale: "High ~63 · Max ~250 per image. Price rises with size, count and references."
		},
		tries: [1, 2],
		use: [
			"A first choice for almost any brief",
			"Mixed scenes with several subjects and instructions",
			"Transparent PNGs"
		],
		avoid: ["Characters that must match across separate generations", "Pixel-exact text placement"],
		tips: ["About half the wait of GPT Image 2 (≈20 s vs 37 s in one API test)", "Medium quality is cheap enough to explore with"],
		elsewhere: "OpenAI API, Runway, Magnific (GPT Image 2.5 Medium 2K: 180 credits ≈ $0.18), Krea, fal.",
		sources: [
			{
				label: "Leonardo: GPT Image 2.5",
				url: "https://leonardo.ai/gpt-image-2-5"
			},
			SRC.openaiPricing,
			SRC.aaImage,
			SRC.lmImage
		]
	},
	{
		id: "gpt-image-2",
		name: "GPT Image 2",
		maker: "OpenAI",
		modality: "image",
		added: "2026-04",
		line: "Polished composition from simple prompts; still the strongest on dense multilingual text.",
		scores: rate(5, 5, 5, 4, 2),
		cost: {
			tokens: 63,
			per: "1 image, 1K, Medium",
			source: "est",
			scale: "Third party reports 259 / 1,033 / 2,042 at 1K / 2K / 4K, likely on High."
		},
		tries: [1, 2],
		use: [
			"Text-heavy posters, menus and signage",
			"Non-Latin scripts",
			"When you want fewer rerolls and can wait"
		],
		avoid: ["Large sizes on a budget: 4K runs into thousands of tokens"],
		tips: ["One review found it clean on 6 of 7 reruns of a text prompt"],
		elsewhere: "OpenAI API $0.006 (Low), $0.053 (Medium), $0.21 (High). Artlist, fal.",
		sources: [
			SRC.openaiPricing,
			SRC.scopeful,
			{
				label: "MagicShot GPT Image 2 vs Nano Banana 2",
				url: "https://magicshot.ai/blog/gpt-image-2-vs-nano-banana-2"
			}
		]
	},
	{
		id: "gpt-image-1-5",
		name: "GPT Image 1.5",
		maker: "OpenAI",
		modality: "image",
		added: "2025-12",
		status: "legacy",
		line: "Editing and spatial logic; UI mockups. Superseded by 2.5.",
		scores: rate(4, 4, 4, 4, 2),
		cost: {
			tokens: 40,
			per: "1 image, 1K, Medium",
			source: "est"
		},
		tries: [2, 3],
		variants: "GPT Image 1 (legacy: yellow cast, alters faces from references, slow).",
		use: ["Reproducing an older project that used it"],
		avoid: [
			"New work: 2.5 Flare is better and cheaper",
			"Non-Latin scripts",
			"Native 4K"
		],
		tips: ["Leonardo calls the look \"over-polished magazine\""],
		sources: [SRC.leoImageGuide, SRC.openaiPricing]
	},
	{
		id: "nano-banana-2-1",
		name: "Nano Banana 2.1",
		maker: "Google",
		modality: "image",
		added: "2026-10",
		status: "new",
		line: "Follows complex prompts closely and keeps people and products consistent across edits. Best quality per dollar.",
		scores: rate(5, 5, 4, 5, 3),
		cost: {
			tokens: 40,
			per: "1 image, 1K",
			source: "est",
			scale: "2K ~60 · 4K ~136 per image."
		},
		tries: [1, 2],
		use: [
			"The same character or product across a series",
			"Up to 14 image references, plus 1 video reference to make an image",
			"Mask edits and multi-turn changes"
		],
		avoid: ["Its arena score is preliminary (about 5,000 votes)"],
		tips: ["Prompt Enhance turns itself off when a reference is attached; write the full prompt yourself", "Choose it over Nano Banana Pro when you need a video reference"],
		elsewhere: "Google API $0.034 (1K) / $0.05 (2K) / $0.11 (4K). Runway $0.04 to $0.12. Krea, Magnific, fal.",
		sources: [
			{
				label: "Leonardo: Nano Banana 2.1",
				url: "https://leonardo.ai/news/nano-banana-2-1-now-on-leonardo"
			},
			SRC.geminiPricing,
			SRC.aaImage,
			SRC.lmImage
		]
	},
	{
		id: "nano-banana-2",
		name: "Nano Banana 2",
		maker: "Google",
		modality: "image",
		added: "2026-02",
		line: "Editing, infographics and text-heavy visuals with up to five consistent characters.",
		scores: rate(4, 4, 4, 4, 2),
		cost: {
			tokens: 80,
			per: "1 image, 1K",
			source: "third",
			scale: "2K 120 · 4K 160 per image."
		},
		tries: [1, 3],
		use: ["Infographics and explainer images", "Keeping up to 5 characters and 14 objects consistent"],
		avoid: ["Waiting: 30 to 60 s per image", "A rich look: Leonardo calls it flat, with occasional extra hands"],
		tips: ["Now costs about twice Nano Banana 2.1 for similar work; prefer 2.1"],
		elsewhere: "Google API $0.067 (1K). Unlimited on some Magnific and Higgsfield plans.",
		sources: [
			SRC.leoImageGuide,
			SRC.scopeful,
			SRC.geminiPricing
		]
	},
	{
		id: "nano-banana-2-lite",
		name: "Nano Banana 2 Lite",
		maker: "Google",
		modality: "image",
		added: "2026-07",
		line: "Faster, lighter generation with sharp detail and simple edits. About four seconds an image.",
		scores: rate(3, 3, 3, 3, 5),
		cost: {
			tokens: 40,
			per: "1 image, 1K",
			source: "est",
			scale: "1K only (≈1,584 px max side)."
		},
		tries: [2, 3],
		use: [
			"Fast ideation at 1K",
			"Simple one-subject images",
			"High volumes"
		],
		avoid: ["Complex briefs and heavy editing", "Print sizes"],
		tips: ["Kittl rated first-try reliability 4.5 of 5 over 132 prompts"],
		elsewhere: "Google API $0.034. Magnific 60 credits.",
		sources: [{
			label: "Kittl review",
			url: "https://www.kittl.com/blogs/kittl-review-nano-banana-2-lite/"
		}, SRC.geminiPricing]
	},
	{
		id: "nano-banana-pro",
		name: "Nano Banana Pro",
		maker: "Google",
		modality: "image",
		added: "2025-11",
		line: "Reasoning-heavy prompts, accurate text and native 4K. Top of the hardest-prompt benchmark.",
		scores: rate(4, 5, 5, 4, 1),
		cost: {
			tokens: 140,
			per: "1 image, 1K or 2K",
			source: "third",
			scale: "4K 250."
		},
		tries: [1, 2],
		use: [
			"Charts, diagrams and long text",
			"Translating text inside an image",
			"Prompts with many constraints"
		],
		avoid: ["Everyday images: slow and about four times the price of 2.1", "Facts in charts without checking them"],
		tips: ["Leonardo's own advice: try Nano Banana 2 first"],
		elsewhere: "Google API $0.134 (1K/2K) / $0.24 (4K). Runway $0.20. Krea, Magnific, Artlist.",
		sources: [
			SRC.leoImageGuide,
			SRC.scopeful,
			SRC.geminiPricing,
			{
				label: "GenOlympiad benchmark",
				url: "https://arxiv.org/abs/2610.26850"
			}
		]
	},
	{
		id: "nano-banana",
		name: "Nano Banana",
		maker: "Google",
		modality: "image",
		added: "2025-09",
		status: "legacy",
		line: "The conversational fixer: remove a person, change the time of day, storyboard.",
		scores: rate(3, 3, 3, 4, 3),
		cost: {
			tokens: 40,
			per: "1 image",
			source: "leo",
			scale: "Flat price; extra references are free."
		},
		tries: [2, 3],
		use: ["Quick conversational edits", "Storyboards"],
		avoid: ["Final art: flat stock-photo look, about 1K", "Transparent backgrounds"],
		tips: ["The first reference image gets priority"],
		sources: [{
			label: "Leonardo help: Nano Banana",
			url: "https://intercom.help/leonardo-ai/en/articles/12143945-nano-banana-gemini-2-5-flash-image"
		}, SRC.leoImageGuide]
	},
	{
		id: "flux-3-image",
		name: "FLUX 3 Image",
		maker: "Black Forest Labs",
		modality: "image",
		added: "2026-10",
		status: "new",
		line: "Native 4K detail, precise multi-reference editing and sharp text.",
		scores: rate(4, 4, 4, 5, 1),
		cost: {
			tokens: 58,
			per: "1 image, 1K",
			source: "est",
			scale: "2K ~120 · 4K ~730 per image."
		},
		tries: [1, 3],
		use: [
			"Print and large formats",
			"Laying out several references with bounding boxes (up to 10)",
			"Long, detailed prompts"
		],
		avoid: ["Fast iteration: 20 to 65 s per image", "4K drafts"],
		tips: ["Draft at 1K, render only the keeper at 4K"],
		variants: "FLUX 3 Klein (open weights, ~$0.009 on APIs; not on Leonardo).",
		elsewhere: "Third-party API trackers: $0.048 (1K) to $0.61 (4K).",
		sources: [
			SRC.leoModels,
			{
				label: "FLUX 3 pricing tracker",
				url: "https://www.llmreference.com/model/flux-3-image"
			},
			SRC.aaImage
		]
	},
	{
		id: "flux-2-pro",
		name: "FLUX.2 Pro",
		maker: "Black Forest Labs",
		modality: "image",
		added: "2026-01",
		line: "Cinematic realism with exact color control from hex codes.",
		scores: rate(4, 4, 3, 3, 3),
		cost: {
			tokens: 62,
			per: "1 image, 1K",
			source: "third"
		},
		tries: [2, 3],
		use: ["Brand colors given as hex codes", "Moody photographic scenes"],
		avoid: ["Long phrases of text"],
		tips: ["Max side 1,440 px on Leonardo; upscale the keeper"],
		elsewhere: "Magnific 50 credits; unlimited on some Magnific plans.",
		sources: [SRC.leoImageGuide, SRC.scopeful]
	},
	{
		id: "flux-kontext",
		name: "FLUX.1 Kontext",
		maker: "Black Forest Labs",
		modality: "image",
		added: "2025-06",
		status: "legacy",
		line: "Instruction edits and style transfer on an existing image.",
		scores: rate(3, 3, 3, 4, 3),
		cost: {
			tokens: 48,
			per: "1 edit, Pro",
			source: "est",
			scale: "Max ~96."
		},
		tries: [2, 3],
		variants: "Kontext Pro and Kontext Max (use Max when the edit involves text).",
		use: ["\"Make it night\", \"turn this into a watercolor\"", "Swapping a product into a scene"],
		avoid: ["Many edits in a row: quality degrades", "Edits that need 3D understanding"],
		tips: ["Do one change per edit"],
		sources: [SRC.leoImageGuide]
	},
	{
		id: "flux-dev",
		name: "FLUX Dev",
		maker: "Black Forest Labs",
		modality: "image",
		added: "2024-11",
		relaxed: true,
		line: "Open-weights workhorse and the base for training your own Elements.",
		scores: rate(3, 3, 2, 2, 4),
		cost: {
			tokens: 10,
			per: "1 image, 1K",
			source: "est"
		},
		tries: [3, 5],
		use: ["Training a personal style or subject (Elements)", "Free rerolls in relaxed mode"],
		avoid: ["Skin and products that must not look plastic", "Trained subjects can stick to their training backgrounds"],
		tips: ["Pair with an Element at moderate strength"],
		sources: [SRC.leoImageGuide, SRC.leoTokens]
	},
	{
		id: "flux-schnell",
		name: "FLUX Schnell",
		maker: "Black Forest Labs",
		modality: "image",
		added: "2024-11",
		relaxed: true,
		line: "The fastest, cheapest digital sketchpad.",
		scores: rate(2, 2, 1, 1, 5),
		cost: {
			tokens: 3,
			per: "1 image, 1K",
			source: "est"
		},
		tries: [4, 8],
		use: ["Thumbnails and composition sketches", "Testing a prompt before a premium run"],
		avoid: ["Anything final"],
		tips: ["Lock the composition here, then move the prompt to a better model"],
		sources: [SRC.leoImageGuide]
	},
	{
		id: "ideogram-4-5",
		name: "Ideogram 4.5",
		maker: "Ideogram",
		modality: "image",
		added: "2026-10",
		status: "new",
		line: "Sharp text rendering and faithful image references at up to 2K.",
		scores: rate(4, 4, 5, 4, 3),
		cost: {
			tokens: 72,
			per: "1 image, Medium",
			source: "est",
			scale: "Very low ~36 · High ~120."
		},
		tries: [1, 3],
		variants: "Ideogram 4.0, Ideogram 3.0 (Turbo, Balanced, Quality) and P-Image-Ideogram.",
		use: ["Logos, wordmarks, posters, print-on-demand", "Edit chains that must not build up artifacts"],
		avoid: ["Very small print: one test found errors in fine text", "Photorealism"],
		tips: ["Put every word you need in quotes; keep it short"],
		elsewhere: "Ideogram API $0.03 to $0.10; fal High $0.22. Magnific (P-Image Ideogram 44 credits).",
		sources: [
			SRC.leoModels,
			{
				label: "Ideogram 4.5",
				url: "https://ideogram.ai/models/4.5/"
			},
			{
				label: "Promptowy text test",
				url: "https://promptowy.com/krea-2-vs-ideogram/"
			}
		]
	},
	{
		id: "seedream-5-pro",
		name: "Seedream 5.0 Pro",
		maker: "ByteDance",
		modality: "image",
		added: "2026-07",
		line: "High-fidelity images with strong typography and layout control. The most-voted model on LMArena.",
		scores: rate(4, 4, 4, 3, 3),
		cost: {
			tokens: 60,
			per: "1 image, 1K",
			source: "est",
			scale: "2K ~108."
		},
		tries: [2, 3],
		variants: "Seedream 5.0 Flash (faster, multilingual text, up to 3K).",
		use: ["Ad and product polish", "Layouts with headlines"],
		avoid: ["A natural, imperfect look"],
		tips: ["Use Flash for multilingual drafts"],
		elsewhere: "BytePlus ~$0.045 to $0.09; Runway $0.05 (1K).",
		sources: [
			SRC.leoModels,
			SRC.lmImage,
			SRC.runwayApi
		]
	},
	{
		id: "seedream-4-5",
		name: "Seedream 4.5",
		maker: "ByteDance",
		modality: "image",
		added: "2025-12",
		status: "legacy",
		line: "Posters, logos and text-heavy designs at native 4K.",
		scores: rate(4, 3, 3, 3, 3),
		cost: {
			tokens: 48,
			per: "1 image",
			source: "est"
		},
		tries: [2, 3],
		variants: "Seedream 4.0.",
		use: ["Large poster layouts"],
		avoid: [
			"Mid-distance depth",
			"Long text: spelling degrades",
			"Looking less \"AI\""
		],
		tips: ["Leonardo calls it \"too perfect\"; add texture words"],
		sources: [SRC.leoImageGuide]
	},
	{
		id: "recraft-v4",
		name: "Recraft V4",
		maker: "Recraft",
		modality: "image",
		added: "2026-05",
		line: "Polished, production-ready design work with precise text.",
		scores: rate(4, 4, 4, 3, 3),
		cost: {
			tokens: 40,
			per: "1 image, 1K",
			source: "third"
		},
		tries: [2, 3],
		variants: "Recraft V4 Pro (higher resolution).",
		use: ["Brand graphics, icons, marketing layouts"],
		avoid: ["Photorealism"],
		tips: ["Recraft's own app exports true SVG vectors; Leonardo gives raster"],
		elsewhere: "Recraft API: raster from $0.035, vector $0.08. Magnific (V4.1).",
		sources: [
			SRC.leoModels,
			SRC.scopeful,
			{
				label: "Recraft API models",
				url: "https://www.recraft.ai/docs/api-reference/models/overview.md"
			}
		]
	},
	{
		id: "krea-2",
		name: "Krea 2",
		maker: "Krea",
		modality: "image",
		added: "2026-05",
		line: "Aesthetics and style transfer.",
		scores: rate(4, 3, 2, 3, 3),
		cost: {
			tokens: 72,
			per: "1 image",
			source: "est"
		},
		tries: [2, 3],
		variants: "Krea 2 Turbo (up to 4K). Krea 3 is already in the API docs.",
		use: ["Mood and style exploration", "Art direction from a style reference"],
		avoid: ["Small text"],
		tips: ["Cheaper on Krea itself (Krea 3 ≈ $0.03 per image on the Pro plan)"],
		elsewhere: "Krea 2 Large API $0.06.",
		sources: [
			SRC.leoModels,
			{
				label: "Promptowy text test",
				url: "https://promptowy.com/krea-2-vs-ideogram/"
			},
			SRC.aaImage
		]
	},
	{
		id: "lucid-origin",
		name: "Lucid Origin",
		maker: "Leonardo",
		modality: "image",
		added: "2025-08",
		relaxed: true,
		line: "Leonardo's aesthetic generalist: cinematic and photo looks, good text, very fast.",
		scores: rate(4, 3, 3, 2, 5),
		cost: {
			tokens: 8.5,
			per: "1 image, 1K, Fast (34 per batch of 4)",
			source: "third",
			scale: "Ultra costs about 4× Fast."
		},
		tries: [2, 4],
		use: [
			"Everyday images on a budget",
			"Exploring at batch-of-4 speed",
			"Free rerolls in relaxed mode"
		],
		avoid: ["Complex multi-subject or spatial prompts", "Strict consistency"],
		tips: ["Fast mode tames its over-detailing", "What Auto Image often picks"],
		elsewhere: "Replicate $0.017 (Standard) / $0.077 (Ultra).",
		sources: [
			SRC.leoImageGuide,
			SRC.screenrove,
			{
				label: "Replicate pricing",
				url: "https://whatmodel.sh/model/lucid-origin"
			}
		]
	},
	{
		id: "lucid-realism",
		name: "Lucid Realism",
		maker: "Leonardo",
		modality: "image",
		added: "2025-06",
		relaxed: true,
		line: "Hyper-photoreal, filmic texture. Good stills to feed into video.",
		scores: rate(4, 3, 2, 2, 5),
		cost: {
			tokens: 8.5,
			per: "1 image, 1K, Fast",
			source: "est",
			scale: "Ultra about 4×."
		},
		tries: [2, 4],
		use: ["Products and scenery", "Start frames for video models"],
		avoid: ["Varied faces: it tends toward a similar face", "Clean graphic work: the grain gets in the way"],
		tips: ["Describe age, build and features to fight the face bias"],
		sources: [SRC.leoImageGuide, SRC.leoTokens]
	},
	{
		id: "phoenix-1",
		name: "Phoenix 1.0",
		maker: "Leonardo",
		modality: "image",
		added: "2024-12",
		relaxed: true,
		line: "Strict prompt adherence for stylised assets, stickers and sketch-to-image.",
		scores: rate(3, 4, 3, 3, 4),
		cost: {
			tokens: 12,
			per: "1 image, 1K, Fast",
			source: "est",
			scale: "Quality ~2× · Ultra ~4×."
		},
		tries: [2, 4],
		variants: "Phoenix 0.9.",
		use: ["Character references and image-to-image", "Stickers, game assets, restyling a sketch"],
		avoid: ["Deliberately odd anatomy: it \"corrects\" a six-legged scorpion to eight legs", "Photorealism"],
		tips: ["Use Quality mode for finals"],
		elsewhere: "Replicate $0.018 (Fast) to $0.075 (Ultra).",
		sources: [SRC.leoImageGuide, {
			label: "Replicate: Phoenix 1.0",
			url: "https://replicate.com/leonardoai/phoenix-1.0"
		}]
	},
	{
		id: "auto-image",
		name: "Auto Image",
		maker: "Leonardo",
		modality: "image",
		added: "2026-01",
		line: "A preset that picks a model for your prompt. The only option on the Free plan.",
		scores: rate(3, 3, 3, 2, 4),
		cost: {
			tokens: 8.5,
			per: "1 image when it picks Lucid Origin",
			source: "third",
			scale: "You pay whatever the chosen model costs."
		},
		tries: [2, 4],
		use: ["Getting started", "The Free plan (150 tokens a day)"],
		avoid: ["Predictable cost or look"],
		tips: ["Check which model it picked, then pick that model yourself next time"],
		sources: [
			SRC.leoModels,
			SRC.screenrove,
			{
				label: "Leonardo pricing",
				url: "https://leonardo.ai/pricing"
			}
		]
	},
	{
		id: "legacy-presets",
		name: "Legacy style presets",
		maker: "Leonardo",
		modality: "image",
		added: "2023-12",
		status: "legacy",
		relaxed: true,
		line: "The SDXL-era fine-tunes, now kept as presets: Kino, Albedo, Lifelike Vision, Lightning and more.",
		scores: rate(2, 2, 1, 1, 4),
		cost: {
			tokens: 8,
			per: "1 image, legacy Alchemy pipeline",
			source: "leo",
			scale: "Older pipeline costs 1 to 16 per image."
		},
		tries: [3, 6],
		variants: "Anime, Cinematic Kino, Concept Art, Graphic Design, Illustrative Albedo, Lifelike Vision, Leonardo Lightning, Portrait Perfect, Stock Photography.",
		use: ["Matching an older project", "Free relaxed rerolls"],
		avoid: ["Text and complex prompts"],
		tips: ["Lucid Origin with a Style usually beats them now"],
		sources: [{
			label: "Leonardo token usage table",
			url: "https://intercom.help/leonardo-ai/en/articles/8044033-token-usage"
		}, SRC.leoTokens]
	}
];
//#endregion
//#region junkyard/ai-model-guide/data/models-other.ts
/** Audio and 3D models on Leonardo.ai, October 2026. Few costs are published here. */
var OTHER_MODELS = [
	{
		id: "music-v1",
		name: "Music v1",
		maker: "Likely ElevenLabs",
		modality: "audio",
		added: "2026-08",
		line: "Text-to-music with vocals or instrumental, 1 to 10 minutes per track.",
		scores: rate(4, 4, 4, 3, 3),
		cost: {
			tokens: null,
			per: "track",
			source: "est"
		},
		tries: [2, 4],
		use: ["Backing tracks for Leonardo videos", "Long instrumentals"],
		avoid: ["Releases that need stems or a dedicated music workflow"],
		tips: ["Generate 30 to 60 s first; extend once you like the direction", "Leonardo does not name the maker; the API name matches ElevenLabs Music"],
		elsewhere: "Suno v6 (Pro $10/mo) leads the music boards. ElevenLabs Music ≈ 900 credits a minute. Lyria 3.5 API $0.08 a song.",
		sources: [{
			label: "Leonardo AI music generator",
			url: "https://leonardo.ai/ai-music-generator"
		}, {
			label: "Leonardo docs: Music v1",
			url: "https://docs.leonardo.ai/docs/music-v1"
		}]
	},
	{
		id: "seed-audio",
		name: "Seed Audio 1.0",
		maker: "ByteDance",
		modality: "audio",
		added: "2026-08",
		line: "Voiceover and text-to-speech, with audio and image references.",
		scores: rate(4, 4, 4, 3, 4),
		cost: {
			tokens: null,
			per: "clip",
			source: "est"
		},
		tries: [1, 3],
		use: ["Narration for a video", "Matching a reference voice"],
		avoid: [],
		tips: ["Speed 0.5× to 2×"],
		elsewhere: "Also on Runway. Top TTS on Artificial Analysis: ElevenLabs v4 ($40 to $80 per million characters).",
		sources: [{
			label: "Leonardo: adding music to videos",
			url: "https://leonardo.ai/news/how-to-add-ai-music-to-videos"
		}, SRC.leoDocs]
	},
	{
		id: "dialogue-v3",
		name: "Dialogue v3",
		maker: "Likely ElevenLabs",
		modality: "audio",
		added: "2026-07",
		status: "api",
		line: "Multi-voice spoken dialogue. In the Leonardo API; not confirmed in the app.",
		scores: rate(5, 4, 5, 4, 4),
		cost: {
			tokens: null,
			per: "clip",
			source: "est"
		},
		tries: [1, 3],
		use: ["Conversations between characters"],
		avoid: [],
		tips: ["Its voice ids match ElevenLabs presets"],
		sources: [{
			label: "Leonardo docs: Dialogue v3",
			url: "https://docs.leonardo.ai/docs/dialogue-v3"
		}]
	},
	{
		id: "sfx-v2",
		name: "Sound Effects v2",
		maker: "Likely ElevenLabs",
		modality: "audio",
		added: "2026-07",
		status: "api",
		line: "Sound effects from 1 to 22 s. In the Leonardo API; not confirmed in the app.",
		scores: rate(4, 4, 4, 2, 5),
		cost: {
			tokens: null,
			per: "clip",
			source: "est"
		},
		tries: [2, 3],
		use: ["Foley for silent video models"],
		avoid: [],
		tips: ["Most top video models now make their own sound; check before adding SFX"],
		elsewhere: "ElevenLabs ≈ 200 credits per effect.",
		sources: [{
			label: "Leonardo docs: Sound Effects v2",
			url: "https://docs.leonardo.ai/docs/sound-effects-v2"
		}]
	},
	{
		id: "rodin-v2",
		name: "Rodin V2",
		maker: "Hyper3D",
		modality: "3d",
		added: "2026-08",
		line: "Image-to-3D from 1 to 5 reference views, exported as .glb with PBR textures.",
		scores: rate(4, 4, 4, 4, 2),
		cost: {
			tokens: 400,
			per: "1 model, lowest quality",
			source: "leo",
			scale: "Rises with mesh density and texture mode."
		},
		tries: [2, 3],
		use: ["Game props and product models", "Characters in T or A pose"],
		avoid: ["The Free plan: one model costs more than a day of free tokens"],
		tips: ["Make clean reference views first with the 3D Reference View Creator Blueprint", "Draft at 20k triangles or 18k quads; go up to 150k to 500k only for the final"],
		sources: [{
			label: "Leonardo help: 3D generation",
			url: "https://intercom.help/leonardo-ai/en/articles/16022939-3d-generation-by-leonardo-ai"
		}, {
			label: "Leonardo: image to 3D guide",
			url: "https://leonardo.ai/news/how-to-turn-an-image-into-3d-model"
		}]
	},
	{
		id: "meshy-7",
		name: "Meshy 7",
		maker: "Meshy",
		modality: "3d",
		added: "2026-10",
		status: "api",
		line: "Text or image to 3D with optional rigging and animation. In the Leonardo API; not confirmed in the app.",
		scores: rate(4, 3, 3, 4, 3),
		cost: {
			tokens: null,
			per: "model",
			source: "est"
		},
		tries: [2, 4],
		use: ["Rigged, animated characters"],
		avoid: [],
		tips: ["Text prompts are capped at 600 characters"],
		sources: [{
			label: "Leonardo docs: Meshy 7",
			url: "https://docs.leonardo.ai/docs/meshy-7"
		}]
	}
];
//#endregion
//#region junkyard/ai-model-guide/data/models-video.ts
/**
* Video models on Leonardo.ai, October 2026. Leonardo publishes no per-model
* video costs; estimates are an 8 s clip at 720p with native audio on, at
* 1,200 tokens per API dollar. Ratings: quality, follows prompt, motion and
* physics, control and references, speed.
*/
var VIDEO_MODELS = [
	{
		id: "seedance-2-5",
		name: "Seedance 2.5",
		maker: "ByteDance",
		modality: "video",
		added: "2026-07",
		status: "new",
		line: "Leonardo's most popular video family: motion transfer, editing, camera control, clips up to 30 s.",
		scores: rate(5, 5, 5, 5, 2),
		cost: {
			tokens: 2880,
			per: "8 s clip, 720p, audio",
			source: "est",
			scale: "480p ~1,900 · 1080p ~6,500 per 8 s."
		},
		tries: [2, 3],
		use: [
			"Ads and story beats that need sound",
			"Long single takes (up to 30 s)",
			"Mixing image, video and audio references"
		],
		avoid: ["Cheap motion tests: draft at 480p first"],
		tips: ["Top tier on both video arenas", "Write the shot like a director: subject, action, camera, sound"],
		elsewhere: "Runway API $0.20 / $0.30 / $0.68 per second (480p / 720p / 1080p). Magnific ≈ $1.10/s at 1080p. Higgsfield, Runway app.",
		sources: [
			SRC.leoVideoGuide,
			SRC.runwayApi,
			SRC.aaVideo,
			SRC.lmVideo,
			{
				label: "ByteDance: Seedance 2.5",
				url: "https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5"
			}
		]
	},
	{
		id: "seedance-2-0",
		name: "Seedance 2.0",
		maker: "ByteDance",
		modality: "video",
		added: "2026-03",
		line: "Top-tier motion and multi-shot scenes, 4 to 15 s.",
		scores: rate(5, 4, 5, 4, 2),
		cost: {
			tokens: 2419,
			per: "clip, 720p (length not stated)",
			source: "third",
			scale: "480p 1,124 · 1080p 5,443."
		},
		tries: [2, 4],
		variants: "Seedance 2.0 Fast (480p/720p) and 2.0 Mini (cost-effective daily output).",
		use: ["Action, dance and physical motion", "Multi-shot sequences"],
		avoid: ["1080p tests: the price more than doubles"],
		tips: ["Use Mini or Fast for blocking, full 2.0 for the final"],
		elsewhere: "Runway API $0.14 / $0.30 / $0.40 per second. Krea, Higgsfield.",
		sources: [
			SRC.scopeful,
			SRC.runwayApi,
			SRC.aaVideo,
			SRC.lmVideo
		]
	},
	{
		id: "seedance-1",
		name: "Seedance 1.0 Pro",
		maker: "ByteDance",
		modality: "video",
		added: "2025-06",
		status: "legacy",
		line: "Silent multi-shot and vertical formats.",
		scores: rate(3, 3, 2, 3, 3),
		cost: {
			tokens: null,
			per: "clip",
			source: "est"
		},
		tries: [3, 5],
		variants: "Seedance 1.0 Pro Fast. (1.0 Lite was retired in May 2026.)",
		use: ["Vertical social clips without sound"],
		avoid: ["Physics-heavy action", "Anything that needs audio"],
		tips: ["Seedance 2.0 Mini is usually the better budget pick now"],
		sources: [SRC.leoVideoGuide, SRC.leoDeprecations]
	},
	{
		id: "flux-3-video",
		name: "FLUX 3 Video",
		maker: "Black Forest Labs",
		modality: "video",
		added: "2026-08",
		line: "Multi-scene clips with dialogue up to 20 s, and the only model here that can continue an existing clip.",
		scores: rate(5, 4, 4, 5, 2),
		cost: {
			tokens: 2780,
			per: "8 s clip, 720p, audio",
			source: "est"
		},
		tries: [2, 4],
		use: ["Extending a clip across the seam", "Short scenes with spoken lines"],
		avoid: ["Budget work: FLUX 3 Max is far cheaper on other APIs"],
		tips: ["Ranked third on LMArena video"],
		elsewhere: "APIs ≈ $0.29/s; FLUX 3 Max ≈ $0.07/s. Unlimited 720p on OpenArt Wonder until 31 Oct 2026.",
		sources: [
			{
				label: "Leonardo docs: FLUX 3 Video",
				url: "https://docs.leonardo.ai/docs/flux-3-video"
			},
			SRC.aaVideo,
			SRC.lmVideo
		]
	},
	{
		id: "minimax-h3",
		name: "MiniMax H3",
		maker: "MiniMax",
		modality: "video",
		added: "2026-07",
		relaxed: true,
		line: "Up to 2K video with stereo audio in one pass; the cheapest model in the top tier.",
		scores: rate(5, 4, 4, 4, 3),
		cost: {
			tokens: 770,
			per: "8 s clip, 768p, audio",
			source: "est",
			scale: "Speed tiers Standard, Accelerated, Turbo. Free relaxed reruns at 480p on Ultimate."
		},
		tries: [2, 4],
		use: [
			"High quality per dollar",
			"Text, image or audio references (9 / 3 / 3)",
			"Start and end frames"
		],
		avoid: ["Its audio cannot be turned off"],
		tips: ["On Ultimate, iterate at 480p Turbo in relaxed mode, then render the keeper at 768p or 2K"],
		elsewhere: "Runway API $0.05 / $0.08 per second (480p / 768p); fal $0.03/s; Magnific Max Turbo 200 credits per 5 s.",
		sources: [
			{
				label: "Leonardo docs: MiniMax H3",
				url: "https://docs.leonardo.ai/docs/minimax-hailuo-03"
			},
			SRC.aaVideo,
			SRC.runwayApi,
			SRC.leoTokens
		]
	},
	{
		id: "hailuo-2-3",
		name: "Hailuo 2.3",
		maker: "MiniMax",
		modality: "video",
		added: "2025-10",
		relaxed: true,
		line: "Leonardo's default video model: dance, flips, anime and stylised 3D.",
		scores: rate(3, 3, 4, 2, 3),
		cost: {
			tokens: 340,
			per: "6 s clip, 768p, silent",
			source: "est"
		},
		tries: [3, 5],
		variants: "Hailuo 2.3 Fast.",
		use: ["Energetic motion and choreography", "Free relaxed reruns on Ultimate"],
		avoid: ["Realism from text alone: it has a \"3D look\" bias", "Anything with sound"],
		tips: ["Give it a photoreal start frame to escape the 3D bias"],
		elsewhere: "Magnific Fast 768p ≈ $0.025/s; unlimited on some Magnific plans.",
		sources: [SRC.leoVideoGuide, SRC.leoTokens]
	},
	{
		id: "veo-3-1",
		name: "Veo 3.1",
		maker: "Google DeepMind",
		modality: "video",
		added: "2025-10",
		line: "Polished ads and product shots with native audio and strict adherence.",
		scores: rate(4, 5, 3, 3, 2),
		cost: {
			tokens: 800,
			per: "clip, 720p (length not stated)",
			source: "third",
			scale: "4K 1,600. Google API pricing would put an 8 s clip with audio near 3,800."
		},
		tries: [2, 3],
		variants: "Veo 3.1 Fast and Veo 3.1 Lite (up to 1080p, cheaper). Veo 3 retired June 2026.",
		use: ["Clean commercial shots", "Dialogue and sound effects in one pass"],
		avoid: ["Start-to-end transitions between very different frames (they morph)", "Gritty textures"],
		tips: ["Give a start frame only", "Now mid-table on both arenas; check newer models first"],
		elsewhere: "Google API $0.40/s with audio (Fast $0.15, Lite $0.08). Krea, Magnific, Artlist.",
		sources: [
			SRC.leoVideoGuide,
			SRC.scopeful,
			SRC.runwayApi,
			SRC.aaVideo
		]
	},
	{
		id: "kling-3",
		name: "Kling 3.0",
		maker: "Kuaishou",
		modality: "video",
		added: "2026-02",
		line: "Multi-shot (up to 6 cuts), 15 s clips, bilingual audio.",
		scores: rate(4, 4, 4, 4, 1),
		cost: {
			tokens: 1630,
			per: "8 s clip, 1080p, audio",
			source: "est"
		},
		tries: [2, 4],
		variants: "Kling 3.0 Turbo (\"up to 20× faster\").",
		use: ["Cut sequences in one generation", "Spoken lines in English or Chinese"],
		avoid: [
			"Animation: it drifts back to photoreal",
			"Peak hours: very slow",
			"Negative camera prompts (\"no zoom\") fail"
		],
		tips: ["Phrase constraints positively: \"static camera\"", "Use Turbo for drafts"],
		elsewhere: "fal $0.14/s (Pro); Runway $0.12 to $0.17/s; unlimited on Higgsfield Plus.",
		sources: [SRC.leoVideoGuide, SRC.runwayApi]
	},
	{
		id: "kling-o3",
		name: "Kling O3 Omni",
		maker: "Kuaishou",
		modality: "video",
		added: "2026-02",
		line: "Create and edit video with strict character consistency from 3 to 5 references.",
		scores: rate(4, 4, 4, 5, 1),
		cost: {
			tokens: 1700,
			per: "8 s clip, 1080p",
			source: "est"
		},
		tries: [2, 3],
		variants: "Kling O1.",
		use: ["Recurring characters across shots", "Editing footage you already generated"],
		avoid: ["Rushed jobs: O3 is slow", "Peak photorealism"],
		tips: ["Video references cap the clip at 10 s"],
		sources: [SRC.leoVideoGuide]
	},
	{
		id: "kling-2",
		name: "Kling 2.x",
		maker: "Kuaishou",
		modality: "video",
		added: "2025-09",
		status: "legacy",
		line: "Cost-effective action workhorse; 2.1 Pro does start and end frames, 2.6 adds audio.",
		scores: rate(3, 3, 4, 3, 3),
		cost: {
			tokens: 420,
			per: "5 s clip, 1080p",
			source: "est"
		},
		tries: [3, 5],
		variants: "Kling 2.6, 2.5 Turbo, 2.5 Turbo Standard, 2.1 Pro.",
		use: ["Action on a budget", "Interpolating between two frames (2.1 Pro)"],
		avoid: ["Long or multi-shot pieces"],
		tips: ["5 or 10 s only"],
		elsewhere: "Magnific Kling 2.5 720p ≈ $0.03/s, unlimited on some plans.",
		sources: [SRC.leoVideoGuide]
	},
	{
		id: "kling-4",
		name: "Kling 4.0",
		maker: "Kuaishou",
		modality: "video",
		added: "2026-10",
		status: "api",
		line: "Up to 30 s, 4K, 10 image references. In the Leonardo API; not yet ranked. Ratings are provisional.",
		scores: rate(4, 4, 5, 5, 2),
		cost: {
			tokens: 1510,
			per: "8 s clip, 720p",
			source: "est"
		},
		tries: [2, 4],
		use: ["Long references-driven shots once it reaches the app"],
		avoid: ["Relying on it before reviews land"],
		tips: ["Watch for it in the Video tab"],
		elsewhere: "Runway list $0.157/s (720p), $0.235/s (1080p); Magnific 840 credits per 3 s at 1080p; 50% off on OpenArt until 20 Nov 2026.",
		sources: [{
			label: "Leonardo docs: Kling 4.0",
			url: "https://docs.leonardo.ai/docs/kling-40"
		}, SRC.runwayApi]
	},
	{
		id: "gemini-omni",
		name: "Gemini Omni 1.1 Flash",
		maker: "Google",
		modality: "video",
		added: "2026-08",
		line: "Real-world physics, video references, reframing and extension. Number one on LMArena video.",
		scores: rate(5, 5, 4, 4, 3),
		cost: {
			tokens: 960,
			per: "8 s clip, 720p",
			source: "est",
			scale: "1080p ~1,440 · 4K ~2,900."
		},
		tries: [2, 3],
		variants: "Gemini Omni Flash.",
		use: ["Believable physical action", "Reframing or extending a clip"],
		avoid: ["Clips over 10 s"],
		tips: ["Good value for a top-tier model"],
		elsewhere: "Runway API $0.10 / $0.15 / $0.30 per second (720p / 1080p / 4K).",
		sources: [
			SRC.leoModels,
			SRC.lmVideo,
			SRC.runwayApi
		]
	},
	{
		id: "grok-imagine-1-5",
		name: "Grok Imagine 1.5",
		maker: "xAI",
		modality: "video",
		added: "2026-05",
		line: "Image-to-video with sound; fourth on LMArena video.",
		scores: rate(4, 4, 4, 3, 3),
		cost: {
			tokens: 1540,
			per: "8 s clip, 720p",
			source: "est"
		},
		tries: [2, 4],
		use: ["Animating a still with sound"],
		avoid: ["Long clips (15 s max)"],
		tips: [],
		elsewhere: "Runway API $0.10 / $0.16 / $0.29 per second (480p / 720p / 1080p).",
		sources: [
			SRC.leoModels,
			SRC.lmVideo,
			SRC.runwayApi
		]
	},
	{
		id: "wan-3",
		name: "Wan 3.0",
		maker: "Alibaba",
		modality: "video",
		added: "2026-08",
		line: "Number one on Artificial Analysis video. Mixed image, video and audio references, up to 30 s.",
		scores: rate(5, 4, 5, 4, 2),
		cost: {
			tokens: 960,
			per: "8 s clip, 720p",
			source: "est",
			scale: "480p ~480 · 1080p ~1,900."
		},
		tries: [2, 4],
		use: ["Top-tier quality at a mid price", "Long clips"],
		avoid: [],
		tips: ["Default is 480p; set 720p or 1080p for finals"],
		elsewhere: "Runway API $0.05 / $0.10 / $0.20 per second (480p / 720p / 1080p).",
		sources: [
			{
				label: "Leonardo docs: Wan 3.0",
				url: "https://docs.leonardo.ai/docs/wan-30"
			},
			SRC.aaVideo,
			SRC.runwayApi
		]
	},
	{
		id: "wan-2-7",
		name: "Wan 2.7",
		maker: "Alibaba",
		modality: "video",
		added: "2026-04",
		line: "Generation with an edit mode for existing clips.",
		scores: rate(4, 3, 3, 4, 3),
		cost: {
			tokens: 800,
			per: "8 s clip, 720p",
			source: "est"
		},
		tries: [3, 4],
		use: ["Editing a clip you already have"],
		avoid: ["Clips over 10 s"],
		tips: [],
		elsewhere: "Higgsfield ≈ 13 credits per 5 s at 1080p.",
		sources: [SRC.leoModels]
	},
	{
		id: "wan-2-6",
		name: "Wan 2.6",
		maker: "Alibaba",
		modality: "video",
		added: "2026-01",
		relaxed: true,
		line: "Multi-shot clips of 5, 10 or 15 s; free relaxed reruns on Ultimate.",
		scores: rate(3, 3, 3, 3, 3),
		cost: {
			tokens: 600,
			per: "5 s clip, 720p",
			source: "est"
		},
		tries: [3, 5],
		use: ["Iterating for free on Ultimate"],
		avoid: ["Hero shots: Wan 3.0 is clearly better"],
		tips: ["Resolution sets the cost tier"],
		elsewhere: "Krea ≈ 370 compute units per 5 s at 720p.",
		sources: [SRC.leoModels, SRC.leoTokens]
	},
	{
		id: "ltx-2",
		name: "LTX-2",
		maker: "Lightricks",
		modality: "video",
		added: "2025-10",
		line: "Long, stable establishing shots at up to 2K.",
		scores: rate(3, 3, 2, 3, 4),
		cost: {
			tokens: null,
			per: "clip",
			source: "est"
		},
		tries: [3, 5],
		variants: "LTX-2 Ultra, LTX-2.3 Pro, LTX-2.3 Fast.",
		use: ["Slow pans and drone-style establishing shots"],
		avoid: ["Fast action"],
		tips: [],
		sources: [SRC.leoVideoGuide]
	},
	{
		id: "happy-horse",
		name: "Happy Horse 1.1",
		maker: "Alibaba",
		modality: "video",
		added: "2026-06",
		line: "Character scenes with multilingual speech, up to 1080p.",
		scores: rate(3, 3, 3, 3, 3),
		cost: {
			tokens: null,
			per: "clip",
			source: "est"
		},
		tries: [3, 5],
		variants: "Happy Horse 1.0.",
		use: ["Talking characters in several languages"],
		avoid: [],
		tips: ["Few independent reviews yet"],
		sources: [SRC.leoModels]
	},
	{
		id: "motion-2",
		name: "Motion 2.0",
		maker: "Leonardo",
		modality: "video",
		added: "2025-04",
		relaxed: true,
		line: "Fast 5-second loops from a still, with camera sliders.",
		scores: rate(2, 2, 2, 3, 5),
		cost: {
			tokens: 250,
			per: "≈5 s clip",
			source: "third",
			scale: "2025 figure. Free relaxed reruns on Ultimate."
		},
		tries: [3, 6],
		variants: "Motion 2.0 Fast. (Motion 1.0 retired June 2026.)",
		use: ["Animated thumbnails and social loops", "Bringing a Leonardo image to life cheaply"],
		avoid: ["Narrative, physics, sound"],
		tips: ["Use fewer sliders and a strong start frame"],
		sources: [
			SRC.leoVideoGuide,
			SRC.leoTokens,
			{
				label: "AI Art Kingdom token figures (2025)",
				url: "https://www.aiartkingdom.com/post/ai-video-creation-veo-3-guide"
			}
		]
	}
];
//#endregion
//#region junkyard/ai-model-guide/data/models.ts
var MODELS = [
	...IMAGE_MODELS,
	...VIDEO_MODELS,
	...OTHER_MODELS,
	...ELSEWHERE_MODELS
];
//#endregion
//#region junkyard/ai-model-guide/data/plans.ts
/**
* Where it can, the guide prices each model at its maker's API rate, so the
* numbers hold wherever you run it. Leonardo.ai plans are the worked example
* of an app subscription: per1k = plan price / monthly fast tokens, assuming
* you use the whole allowance. Checked 2026-10-29 on leonardo.ai/pricing.
*/
var PLANS = [
	{
		id: "api",
		kind: "api",
		label: "Maker API price",
		price: "pay per use",
		per1k: 0,
		tokens: "Pay per run",
		relaxed: "None"
	},
	{
		id: "essential",
		kind: "leonardo",
		label: "Leonardo Essential, monthly",
		price: "$12 / mo",
		per1k: 1.41,
		tokens: "8,500 tokens / mo",
		relaxed: "None"
	},
	{
		id: "essential-y",
		kind: "leonardo",
		label: "Leonardo Essential, yearly",
		price: "$10 / mo",
		per1k: 1.18,
		tokens: "8,500 tokens / mo",
		relaxed: "None"
	},
	{
		id: "premium",
		kind: "leonardo",
		label: "Leonardo Premium, monthly",
		price: "$30 / mo",
		per1k: 1.2,
		tokens: "25,000 tokens / mo",
		relaxed: "Leonardo image models"
	},
	{
		id: "premium-y",
		kind: "leonardo",
		label: "Leonardo Premium, yearly",
		price: "$24 / mo",
		per1k: .96,
		tokens: "25,000 tokens / mo",
		relaxed: "Leonardo image models"
	},
	{
		id: "ultimate",
		kind: "leonardo",
		label: "Leonardo Ultimate, monthly",
		price: "$60 / mo",
		per1k: 1,
		tokens: "60,000 tokens / mo",
		relaxed: "Images, plus some video"
	},
	{
		id: "ultimate-y",
		kind: "leonardo",
		label: "Leonardo Ultimate, yearly",
		price: "$48 / mo",
		per1k: .8,
		tokens: "60,000 tokens / mo",
		relaxed: "Images, plus some video"
	}
];
var findPlan = (id) => PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.id === "api");
/**
* Leonardo's published token costs and makers' API prices meet at about
* 1,200 tokens per API dollar (Nano Banana 2, GPT Image 2, FLUX.2 Pro). The
* guide uses that rate both ways: to estimate tokens from an API price, and
* an API price from tokens when only the Leonardo cost is known.
*/
var TOKENS_PER_API_DOLLAR = 1200;
//#endregion
//#region junkyard/ai-model-guide/data/query.ts
var MODALITIES = [
	{
		id: "image",
		label: "Image",
		unit: "image"
	},
	{
		id: "video",
		label: "Video",
		unit: "clip"
	},
	{
		id: "audio",
		label: "Audio",
		unit: "track"
	},
	{
		id: "3d",
		label: "3D",
		unit: "model"
	}
];
/** Column labels change with the medium: "craft" is lettering for images, motion for video. */
var AXES = {
	image: [
		{
			key: "quality",
			label: "Image quality"
		},
		{
			key: "adherence",
			label: "Follows prompt"
		},
		{
			key: "craft",
			label: "Text"
		},
		{
			key: "control",
			label: "Edits, consistency"
		},
		{
			key: "speed",
			label: "Speed"
		}
	],
	video: [
		{
			key: "quality",
			label: "Visual quality"
		},
		{
			key: "adherence",
			label: "Follows prompt"
		},
		{
			key: "craft",
			label: "Motion, physics"
		},
		{
			key: "control",
			label: "Control, refs"
		},
		{
			key: "speed",
			label: "Speed"
		}
	],
	audio: [
		{
			key: "quality",
			label: "Sound quality"
		},
		{
			key: "adherence",
			label: "Follows prompt"
		},
		{
			key: "craft",
			label: "Natural"
		},
		{
			key: "control",
			label: "Control"
		},
		{
			key: "speed",
			label: "Speed"
		}
	],
	"3d": [
		{
			key: "quality",
			label: "Mesh quality"
		},
		{
			key: "adherence",
			label: "Matches refs"
		},
		{
			key: "craft",
			label: "Topology"
		},
		{
			key: "control",
			label: "Control"
		},
		{
			key: "speed",
			label: "Speed"
		}
	]
};
var SORTS = [
	{
		id: "score",
		label: "Overall"
	},
	{
		id: "keeper",
		label: "Cost per result"
	},
	{
		id: "speed",
		label: "Speed"
	},
	{
		id: "new",
		label: "Newest"
	}
];
var WEIGHTS = {
	quality: 2,
	adherence: 1.5,
	craft: 1,
	control: 1,
	speed: .5
};
/** Overall score, 0 to 100, from the weighted 1 to 5 ratings that apply. */
function overall(m) {
	let sum = 0;
	let weight = 0;
	for (const [key, w] of Object.entries(WEIGHTS)) {
		const s = m.scores[key];
		if (s === null) continue;
		sum += s * w;
		weight += w;
	}
	return weight === 0 ? 0 : Math.round((sum / weight - 1) / 4 * 100);
}
var midTries = (m) => (m.tries[0] + m.tries[1]) / 2;
var keeperTokens = (m) => m.cost.tokens === null ? null : Math.round(m.cost.tokens * midTries(m));
var dollars = (tokens, plan) => tokens / 1e3 * plan.per1k;
function availability(m) {
	if (m.on === "not-leonardo") return "not-leonardo";
	return m.maker === "Leonardo" ? "leonardo-only" : "everywhere";
}
/** One run in dollars at the maker's API rate: published, or converted from Leonardo tokens. */
function runUsd(m) {
	if (m.cost.usd !== void 0) return m.cost.usd;
	return m.cost.tokens === null ? null : m.cost.tokens / TOKENS_PER_API_DOLLAR;
}
/** Price of one run on the chosen basis; null when unknown or not offered there. */
function runCost(m, plan) {
	if (plan.kind === "api") return runUsd(m);
	if (availability(m) === "not-leonardo" || m.cost.tokens === null) return null;
	return dollars(m.cost.tokens, plan);
}
/** Cost of one good result: a run times the middle of the typical tries. */
function keeperCost(m, plan) {
	const run = runCost(m, plan);
	return run === null ? null : run * midTries(m);
}
/**
* Where the price shown came from. Token estimates were made from the maker's
* API price, so on the API basis they are the maker's price; a Leonardo token
* figure converted to dollars is an estimate.
*/
function priceSource(m, plan) {
	if (plan.kind === "leonardo" || m.cost.usd !== void 0) return m.cost.source;
	return m.cost.source === "est" ? "maker" : "est";
}
/** Why a cost is missing, in words. */
function missingCost(m, plan) {
	return plan.kind === "leonardo" && availability(m) === "not-leonardo" ? "Not on Leonardo" : "Not published";
}
function usd(n) {
	if (n < .01) return "<$0.01";
	if (n < 10) return `$${n.toFixed(2)}`;
	return `$${Math.round(n)}`;
}
var tokensLabel = (n) => n.toLocaleString("en-US");
function sorted(models, key, plan) {
	const by = {
		score: (a, b) => overall(b) - overall(a),
		keeper: (a, b) => (keeperCost(a, plan) ?? Infinity) - (keeperCost(b, plan) ?? Infinity),
		speed: (a, b) => (b.scores.speed ?? 0) - (a.scores.speed ?? 0) || overall(b) - overall(a),
		new: (a, b) => b.added.localeCompare(a.added)
	};
	return [...models].sort((a, b) => by[key](a, b) || a.name.localeCompare(b.name));
}
var modelsFor = (m) => MODELS.filter((x) => x.modality === m);
var jobsFor = (m) => JOBS.filter((j) => j.modality === m);
var findModel = (id) => MODELS.find((m) => m.id === id);
var findJob = (id) => JOBS.find((j) => j.id === id);
var isModality = (v) => MODALITIES.some((m) => m.id === v);
var isSort = (v) => SORTS.some((s) => s.id === v);
/** The three picks a job names, in the order the guide presents them. */
function picks(job) {
	return [
		["Top pick", job.best],
		["Runner-up", job.value],
		["Cheapest drafts", job.budget]
	].flatMap(([role, id]) => {
		const model = findModel(id);
		return model ? [{
			role,
			model
		}] : [];
	});
}
var SOURCE_LABEL = {
	leo: "Published by Leonardo",
	third: "Reported by a third party",
	est: "Estimate",
	maker: "Maker's published API price"
};
//#endregion
//#region junkyard/ai-model-guide/ui/jobs.ts
function keeperLine(m, plan) {
	const c = keeperCost(m, plan);
	if (c === null) return plan.kind === "leonardo" && availability(m) === "not-leonardo" ? "Not on Leonardo" : "Cost not published";
	const where = availability(m) === "leonardo-only" ? " · Leonardo only" : availability(m) === "not-leonardo" ? " · not on Leonardo" : "";
	return `≈ ${usd(c)} per good result${where}`;
}
/** "What are you making?": job chips, then the guide's three picks for the chosen job. */
function renderJobs(container, modality, jobId, plan, on) {
	const jobs = jobsFor(modality);
	const job = findJob(jobId);
	const chips = jobs.map((j) => {
		const b = h("button", {
			type: "button",
			class: "job",
			"aria-pressed": String(j.id === job?.id),
			"data-key": `job-${j.id}`
		}, j.label);
		b.addEventListener("click", () => on.pickJob(j.id === job?.id ? void 0 : j.id));
		return b;
	});
	const body = job ? h("div", { class: "verdict" }, h("p", { class: "verdict-need" }, h("b", {}, job.label), " ", job.need), h("ol", { class: "picks" }, ...picks(job).map(({ role, model }) => {
		const open = h("button", {
			type: "button",
			class: "pick-name"
		}, model.name);
		open.addEventListener("click", () => on.openModel(model.id));
		return h("li", { class: "pick" }, h("span", { class: "pick-role" }, role), open, h("span", { class: "pick-maker" }, model.maker), h("span", { class: "pick-line" }, model.line), h("span", { class: "pick-cost" }, keeperLine(model, plan)));
	})), h("p", { class: "verdict-note" }, h("span", { class: "label" }, "How to get it right"), " ", job.note)) : h("p", { class: "verdict-empty" }, "Pick a job to see the top pick, a runner-up and the cheapest way to draft it. They are marked in the model reference below.");
	container.replaceChildren(h("div", {
		class: "job-chips",
		role: "group",
		"aria-label": "Jobs"
	}, ...chips), h("div", { "aria-live": "polite" }, body));
}
//#endregion
//#region junkyard/ai-model-guide/data/platforms.ts
/** Other multi-model platforms, checked 2026-10-29. See docs/kb/research/ai-models/aggregators.md. */
var PLATFORMS = [
	{
		name: "Maker APIs (OpenAI, Google, Runway, xAI…)",
		url: "https://developers.openai.com/api/docs/pricing",
		price: "Pay per use",
		credits: "Dollars per image, second or song",
		models: "Each maker's own models",
		bestFor: "The price baseline every app has to beat; full settings",
		watch: "Code or a front end needed; one account per maker. Some models (Midjourney, Suno) have no public API."
	},
	{
		name: "Leonardo.ai",
		url: "https://leonardo.ai/pricing",
		price: "$12 to $60 / mo",
		credits: "8,500 to 60,000 tokens / mo; Free 150 a day",
		models: "80+ image, video, audio and 3D",
		bestFor: "One app for everything, with free relaxed rerolls on its own models",
		watch: "Per-model costs are only shown on the Generate button. Free plan is Auto Image only and public."
	},
	{
		name: "Krea",
		url: "https://www.krea.ai/pricing",
		price: "$9 to $105 / mo",
		credits: "5,000 to 60,000 compute units / mo; Free 100 a day",
		models: "Krea 3, Nano Banana, Seedream, Veo, Kling, Seedance, Wan",
		bestFor: "Real-time drawing and fast image exploration",
		watch: "No rollover. Its own per-model counts disagree by up to 2×."
	},
	{
		name: "Magnific (was Freepik AI)",
		url: "https://www.magnific.com/pricing",
		price: "$20 to $110 / mo",
		credits: "240K to 4M credits a year, no monthly reset",
		models: "Nano Banana, GPT Image 2.5, FLUX.2, Kling 4.0, Seedance 2.5, Veo 3.1",
		bestFor: "Heavy image users: Premium+ includes \"unlimited\" Nano Banana 2 and Pro",
		watch: "Flagship video is pricey (Seedance 2.5 1080p ≈ $1.10/s). Renamed in April 2026."
	},
	{
		name: "OpenArt",
		url: "https://openart.ai/pricing",
		price: "$14 to $240 / mo",
		credits: "4,000 to 106,000 / mo",
		models: "100+ image, video and audio models",
		bestFor: "Character and story tools across many models",
		watch: "Per-model credit costs are not public. Commercial use from Plus."
	},
	{
		name: "Higgsfield",
		url: "https://higgsfield.ai",
		price: "$19 to $129 / mo",
		credits: "270 to 3,000 / mo",
		models: "Kling, Seedance, Wan, Nano Banana",
		bestFor: "Camera-move presets and social video",
		watch: "Credits are about $0.05 each; \"unlimited\" is time-limited and website-only."
	},
	{
		name: "Adobe Firefly",
		url: "https://www.adobe.com/products/firefly/plans.html",
		price: "$9.99 to $199.99 / mo",
		credits: "2,000 to 50,000 / mo",
		models: "Firefly, plus Google, OpenAI, FLUX, Kling, Runway, Luma, ElevenLabs",
		bestFor: "Commercially safe Firefly models inside Photoshop and Premiere",
		watch: "Partner models draw credits; Adobe models are unlimited."
	},
	{
		name: "Runway",
		url: "https://runway.com/pricing",
		price: "$15 to $95 / mo",
		credits: "625 to 9,500 / mo",
		models: "Gen-4.5, Aleph 2.0, Kling 4.0, Seedance 2.5, Nano Banana Pro",
		bestFor: "Video editing (Aleph) and a published per-model API rate card",
		watch: "App credits cost more than API credits."
	},
	{
		name: "Artlist",
		url: "https://artlist.io",
		price: "From ~$16 / mo",
		credits: "7,500 to 16,500 / mo",
		models: "Veo, Kling, Seedance, GPT Image 2, Nano Banana Pro",
		bestFor: "Video makers who also need stock music and footage",
		watch: "Pricing details are third-party only."
	},
	{
		name: "fal.ai / Replicate",
		url: "https://fal.ai/pricing",
		price: "Pay per use",
		credits: "Dollars per image or per second",
		models: "Most models above, by API",
		bestFor: "Developers, and a price baseline: Nano Banana 2 $0.08, Kling 3 Pro $0.14/s",
		watch: "No app; you write code or use a third-party front end."
	}
];
//#endregion
//#region junkyard/ai-model-guide/ui/platforms.ts
/** Multi-model apps and APIs side by side. */
function renderPlatforms(container) {
	const rows = PLATFORMS.map((p) => h("tr", {}, h("th", { scope: "row" }, h("a", {
		href: p.url,
		target: "_blank",
		rel: "noopener"
	}, p.name)), h("td", { "data-label": "Price" }, p.price), h("td", { "data-label": "Allowance" }, p.credits), h("td", { "data-label": "Models" }, p.models), h("td", { "data-label": "Best for" }, p.bestFor), h("td", { "data-label": "Watch out" }, p.watch)));
	container.replaceChildren(h("div", { class: "table-wrap" }, h("table", { class: "plat" }, h("thead", {}, h("tr", {}, ...[
		"Platform",
		"Price",
		"Allowance",
		"Models",
		"Best for",
		"Watch out"
	].map((t) => h("th", { scope: "col" }, t)))), h("tbody", {}, ...rows))));
}
//#endregion
//#region junkyard/ai-model-guide/ui/marks.ts
var WORDS = [
	"",
	"Poor",
	"Fair",
	"Good",
	"Very good",
	"Excellent"
];
/** A ratings-magazine ball: empty for 1, full for 5, in quarters between. */
function ball(score, axis) {
	if (score === null) return h("span", {
		class: "ball ball-na",
		title: `${axis}: not rated`
	}, "–");
	return h("span", {
		class: "ball",
		style: `--f:${(score - 1) / 4}`,
		role: "img",
		"aria-label": `${axis}: ${WORDS[score]}`,
		title: `${axis}: ${WORDS[score]}`
	});
}
/** Overall score as a bar and a number, 0 to 100. */
function scoreBar(n) {
	return h("span", {
		class: "score",
		title: `Overall score ${n} of 100`
	}, h("span", { class: "score-n" }, String(n)), h("span", {
		class: "score-bar",
		style: `--w:${n}%`
	}));
}
var SOURCE_CHAR = {
	leo: "L",
	third: "3",
	est: "E",
	maker: "M"
};
/** Small badge saying where a token figure came from. */
function sourceMark(source) {
	return h("span", {
		class: `src src-${source}`,
		title: SOURCE_LABEL[source],
		"aria-label": SOURCE_LABEL[source]
	}, SOURCE_CHAR[source]);
}
/** The ball legend shown under the ratings table. */
function ballLegend() {
	return h("p", { class: "legend" }, ...[
		1,
		2,
		3,
		4,
		5
	].flatMap((s) => [ball(s, WORDS[s]), h("span", {}, WORDS[s])]));
}
//#endregion
//#region junkyard/ai-model-guide/ui/ratings.ts
var STATUS_LABEL = {
	new: "New",
	legacy: "Older",
	api: "API only"
};
/** One run: dollars at the maker's rate, or Leonardo tokens on a Leonardo plan. */
function runCell(m, plan) {
	const run = runCost(m, plan);
	if (run === null) return h("td", { class: "num muted" }, missingCost(m, plan));
	return h("td", { class: "num" }, plan.kind === "api" ? usd(run) : tokensLabel(m.cost.tokens), " ", sourceMark(priceSource(m, plan)));
}
function keeperCell(m, plan) {
	const cost = keeperCost(m, plan);
	if (cost === null) return h("td", { class: "num keeper muted" }, plan.kind === "leonardo" && availability(m) === "not-leonardo" ? "Not on Leonardo" : "Unknown");
	return h("td", { class: "num keeper" }, h("b", {}, usd(cost)), plan.kind === "leonardo" ? h("small", {}, `${tokensLabel(keeperTokens(m))} tokens`) : null);
}
var WHERE_LABEL = {
	"leonardo-only": "Leonardo only",
	"not-leonardo": "Not on Leonardo"
};
function list(title, items) {
	if (items.length === 0) return null;
	return h("div", { class: "facts" }, h("h4", {}, title), h("ul", {}, ...items.map((i) => h("li", {}, i))));
}
/** The expanded entry: when to use it, what it costs on every plan, and where the numbers came from. */
function detail(m, plan, colspan) {
	const perPlan = !PLANS.some((p) => keeperCost(m, p) !== null) ? h("p", { class: "muted" }, "No maker or platform has published a price for this model, and no third party has reported one. Check the price before you generate.") : h("table", { class: "plan-table" }, h("caption", {}, "One good result, by where you pay"), h("tbody", {}, ...PLANS.map((p) => {
		const c = keeperCost(m, p);
		return h("tr", { class: p.id === plan.id ? "is-plan" : "" }, h("th", { scope: "row" }, p.label), h("td", {}, c === null ? missingCost(m, p) : usd(c)));
	})));
	const run = runCost(m, plan);
	return h("tr", { class: "detail-row" }, h("td", { colspan }, h("div", { class: "detail" }, h("p", { class: "detail-line" }, m.line), h("div", { class: "detail-cols" }, list("Use it for", m.use), list("Skip it for", m.avoid), list("How to get it right", m.tips)), h("div", { class: "detail-cost" }, h("dl", {}, h("dt", {}, "One run"), h("dd", {}, run === null ? missingCost(m, plan) : plan.kind === "api" ? usd(run) : `${tokensLabel(m.cost.tokens)} tokens`, m.cost.tokens !== null && plan.kind === "api" ? ` (${tokensLabel(m.cost.tokens)} Leonardo tokens)` : "", " · ", m.cost.per), h("dt", {}, "Source"), h("dd", {}, sourceMark(priceSource(m, plan)), " ", SOURCE_LABEL[priceSource(m, plan)]), m.cost.scale ? h("dt", {}, "Other settings") : null, m.cost.scale ? h("dd", {}, m.cost.scale) : null, h("dt", {}, "Typical tries"), h("dd", {}, `${m.tries[0]} to ${m.tries[1]} for a simple brief (estimate)`), m.relaxed ? h("dt", {}, "Free reruns") : null, m.relaxed ? h("dd", {}, m.modality === "video" ? "On Leonardo Ultimate, once tokens run out" : "On Leonardo Premium and up, once tokens run out") : null, m.variants ? h("dt", {}, "Also covers") : null, m.variants ? h("dd", {}, m.variants) : null, m.elsewhere ? h("dt", {}, "Where to run it") : null, m.elsewhere ? h("dd", {}, m.elsewhere) : null), perPlan), h("p", { class: "detail-sources" }, h("span", { class: "label" }, "Sources"), ...m.sources.flatMap((s, i) => [i ? " · " : " ", h("a", {
		href: s.url,
		target: "_blank",
		rel: "noopener"
	}, s.label)])))));
}
/** The model reference chart for one modality. Rebuilt on every change; it is at most a few dozen rows. */
function renderRatings(container, state, on) {
	const axes = AXES[state.modality];
	const unit = MODALITIES.find((m) => m.id === state.modality).label.toLowerCase();
	const models = sorted(modelsFor(state.modality), state.sort, state.plan);
	const job = findJob(state.job);
	const roles = new Map(job ? picks(job).map((p) => [p.model.id, p.role]) : []);
	const colspan = axes.length + 5;
	const sortButtons = SORTS.map((s) => {
		const b = h("button", {
			type: "button",
			class: "sort",
			"aria-pressed": String(s.id === state.sort),
			"data-key": `sort-${s.id}`
		}, s.label);
		b.addEventListener("click", () => on.sort(s.id));
		return b;
	});
	const head = h("thead", {}, h("tr", {}, h("th", {
		scope: "col",
		class: "col-name"
	}, "Model"), h("th", {
		scope: "col",
		class: "col-score"
	}, "Overall"), ...axes.map((a) => h("th", {
		scope: "col",
		class: "col-axis"
	}, h("span", {}, a.label))), h("th", {
		scope: "col",
		class: "num"
	}, state.plan.kind === "api" ? "Price per run" : "Leonardo tokens per run"), h("th", {
		scope: "col",
		class: "num"
	}, "Tries"), h("th", {
		scope: "col",
		class: "num"
	}, `Per good result, ${state.plan.kind === "api" ? "API price" : state.plan.label.replace("Leonardo ", "").split(",")[0]}`)));
	const rows = models.flatMap((m, i) => {
		const isOpen = m.id === state.open;
		const role = roles.get(m.id);
		const toggle = h("button", {
			type: "button",
			class: "row-toggle",
			"aria-expanded": String(isOpen),
			"aria-controls": `d-${m.id}`,
			"data-key": `row-${m.id}`
		}, h("span", { class: "row-name" }, m.name), h("span", { class: "row-meta" }, m.maker, m.status ? h("span", { class: `tag tag-${m.status}` }, STATUS_LABEL[m.status]) : null, availability(m) !== "everywhere" ? h("span", { class: `tag tag-where tag-${availability(m)}` }, WHERE_LABEL[availability(m)]) : null, m.relaxed ? h("span", { class: "tag tag-relaxed" }, "Free reruns") : null));
		toggle.addEventListener("click", () => on.toggle(m.id));
		const row = h("tr", {
			class: `row${isOpen ? " is-open" : ""}${role ? " is-pick" : ""}`,
			"data-id": m.id,
			id: `m-${m.id}`
		}, h("th", {
			class: "col-name",
			scope: "row"
		}, h("span", { class: "rank" }, String(i + 1)), toggle, h("span", { class: "row-line" }, m.line), role ? h("span", { class: "role" }, role) : null), h("td", { class: "col-score" }, scoreBar(overall(m))), ...axes.map((a) => h("td", {
			class: "col-axis",
			"data-axis": a.label
		}, ball(m.scores[a.key], a.label))), runCell(m, state.plan), h("td", { class: "num tries" }, `${m.tries[0]}–${m.tries[1]}`), keeperCell(m, state.plan));
		if (!isOpen) return [row];
		const d = detail(m, state.plan, colspan);
		d.id = `d-${m.id}`;
		return [row, d];
	});
	container.replaceChildren(h("div", { class: "ratings-bar" }, h("p", {
		class: "ratings-count",
		"aria-live": "polite"
	}, `${models.length} ${unit} models`), h("div", {
		class: "sorts",
		role: "group",
		"aria-label": "Sort by"
	}, h("span", { class: "label" }, "Sort"), ...sortButtons)), h("div", { class: "table-wrap" }, h("table", { class: "chart" }, head, h("tbody", {}, ...rows))), h("div", { class: "ratings-foot" }, ballLegend(), h("p", { class: "legend" }, h("span", {}, "Prices:"), sourceMark("maker"), h("span", {}, "maker's API price"), sourceMark("leo"), h("span", {}, "published by Leonardo"), sourceMark("third"), h("span", {}, "third party"), sourceMark("est"), h("span", {}, "estimate")), h("p", { class: "legend legend-wide" }, h("span", { class: "tag tag-relaxed" }, "Free reruns"), h("span", {}, "on Leonardo, keeps generating at no cost once your monthly tokens run out (relaxed mode): images on Premium and up, video on Ultimate."), h("span", { class: "tag tag-where tag-leonardo-only" }, "Leonardo only"), h("span", {}, "Leonardo's own models."), h("span", { class: "tag tag-where tag-not-leonardo" }, "Not on Leonardo"), h("span", {}, "runs elsewhere; everything else runs on Leonardo and on other platforms."))));
}
//#endregion
//#region junkyard/ai-model-guide/ui/route.ts
var DEFAULT_ROUTE = {
	modality: "image",
	sort: "score"
};
function readRoute(hash = window.location.hash) {
	const p = new URLSearchParams(hash.replace(/^#/, ""));
	const m = p.get("m");
	const s = p.get("sort");
	const modality = isModality(m) ? m : DEFAULT_ROUTE.modality;
	const job = findJob(p.get("job"));
	const open = findModel(p.get("open"));
	return {
		modality,
		job: job?.modality === modality ? job.id : void 0,
		sort: isSort(s) ? s : DEFAULT_ROUTE.sort,
		open: open?.modality === modality ? open.id : void 0
	};
}
function routeHash(r) {
	const p = new URLSearchParams();
	if (r.modality !== DEFAULT_ROUTE.modality) p.set("m", r.modality);
	if (r.job) p.set("job", r.job);
	if (r.sort !== DEFAULT_ROUTE.sort) p.set("sort", r.sort);
	if (r.open) p.set("open", r.open);
	const s = p.toString();
	return s ? `#${s}` : "";
}
/** Replace, not push: filtering is not navigation, so Back leaves the page. */
function writeRoute(r) {
	const hash = routeHash(r);
	if (hash === window.location.hash) return;
	history.replaceState(null, "", hash || window.location.pathname + window.location.search);
}
//#endregion
//#region junkyard/ai-model-guide/ui/tabs.ts
/** Image / Video / Audio / 3D, like the tabs in Leonardo's own model picker. */
function mountTabs(container, onPick) {
	const buttons = MODALITIES.map((m) => {
		const b = h("button", {
			type: "button",
			class: "tab",
			"data-id": m.id,
			"data-key": `tab-${m.id}`
		}, m.label, h("span", { class: "tab-n" }, String(modelsFor(m.id).length)));
		b.addEventListener("click", () => onPick(m.id));
		return b;
	});
	container.append(h("div", {
		class: "tabs-inner",
		role: "group"
	}, ...buttons));
	return (current) => {
		for (const b of buttons) b.setAttribute("aria-pressed", String(b.dataset.id === current));
	};
}
//#endregion
//#region src/lib/local-store.ts
/**
* localStorage wrapper that never throws: private windows and blocked
* storage fall back to the provided default.
*/
function readJson(key, fallback) {
	try {
		const raw = window.localStorage.getItem(key);
		return raw === null ? fallback : JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function writeJson(key, value) {
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch {
		return false;
	}
}
//#endregion
//#region junkyard/ai-model-guide/ui/wallet.ts
var KEY = "ai-model-guide:plan";
/**
* Where you pay. The default prices every model at its maker's API rate;
* the Leonardo plans show the same models inside one app subscription, as a
* worked example. Changing it reprices the whole guide.
*/
function mountWallet(container, onChange) {
	let plan = findPlan(readJson(KEY, null));
	const option = (p) => h("option", {
		value: p.id,
		selected: p.id === plan.id
	}, p.kind === "api" ? p.label : `${p.label.replace("Leonardo ", "")} · ${p.price}`);
	const select = h("select", { id: "plan" }, ...PLANS.filter((p) => p.kind === "api").map(option), h("optgroup", { label: "Leonardo.ai plan (example app)" }, ...PLANS.filter((p) => p.kind === "leonardo").map(option)));
	const rate = h("b", { class: "wallet-rate" });
	const unit = h("span", {});
	const detail = h("span", { class: "wallet-detail" });
	const formula = h("span", {});
	function paint() {
		if (plan.kind === "api") {
			rate.textContent = "Pay per run";
			unit.textContent = "";
			detail.textContent = "each model at its maker's API rate, where you can run it directly";
			formula.textContent = "price per run × typical tries";
		} else {
			rate.textContent = `$${plan.per1k.toFixed(2)}`;
			unit.textContent = " per 1,000 tokens";
			detail.textContent = `${plan.tokens} · free reruns: ${plan.relaxed}`;
			formula.textContent = "tokens per run × typical tries × your price per token";
		}
	}
	select.addEventListener("change", () => {
		plan = findPlan(select.value);
		writeJson(KEY, plan.id);
		paint();
		onChange(plan);
	});
	container.append(h("label", {
		class: "wallet-plan",
		for: "plan"
	}, h("span", { class: "label" }, "Prices on"), select), h("p", { class: "wallet-sum" }, rate, unit, detail), h("p", { class: "wallet-formula" }, h("span", { class: "label" }, "Cost per good result"), formula));
	paint();
	return plan;
}
//#endregion
//#region junkyard/ai-model-guide/main.ts
var jobsEl = byId("jobs");
var ratingsEl = byId("ratings");
var route = readRoute();
var markTab = mountTabs(byId("tabs"), (m) => update({
	modality: m,
	job: void 0,
	open: void 0
}));
var plan = mountWallet(byId("wallet"), (p) => {
	plan = p;
	render();
});
/**
* Rendering rebuilds the job picker and the chart, which would drop keyboard
* focus to <body>. Controls carry a data-key; focus returns to the same
* control, or to the model just opened from a pick.
*/
function update(patch, scrollTo) {
	const focused = document.activeElement?.dataset.key;
	route = {
		...route,
		...patch
	};
	writeRoute(route);
	render();
	const key = scrollTo ? `row-${scrollTo}` : focused;
	if (key) document.querySelector(`[data-key="${key}"]`)?.focus({ preventScroll: true });
	if (scrollTo) byId(`m-${scrollTo}`).scrollIntoView({
		block: "center",
		behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
	});
}
function render() {
	markTab(route.modality);
	renderJobs(jobsEl, route.modality, route.job, plan, {
		pickJob: (job) => update({ job }),
		openModel: (id) => update({ open: id }, id)
	});
	renderRatings(ratingsEl, {
		...route,
		plan
	}, {
		sort: (sort) => update({ sort }),
		toggle: (id) => update({ open: route.open === id ? void 0 : id })
	});
}
window.addEventListener("hashchange", () => {
	route = readRoute();
	render();
});
/** Deep links like #open=veo-3-1 work without naming the tab. */
function resolveDeepLink() {
	const p = new URLSearchParams(window.location.hash.replace(/^#/, ""));
	const model = findModel(p.get("open"));
	const job = findJob(p.get("job"));
	const modality = model?.modality ?? job?.modality;
	if (modality && modality !== route.modality) route = {
		...route,
		modality,
		open: model?.id,
		job: job?.id
	};
}
resolveDeepLink();
renderPlatforms(byId("platforms"));
render();
if (route.open) byId(`m-${route.open}`).scrollIntoView({ block: "center" });
//#endregion

//# sourceMappingURL=main.js.map