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
//#region junkyard/ai-music-guide/data/entries-stems.ts
/** Stems, clean-up, mix and master. Research: docs/kb/research/ai-music/stems-cleanup.md */
var STEM_ENTRIES = [
	{
		id: "wav-first",
		title: "Download WAV, never MP3, before you edit",
		kind: "technique",
		stage: "stems",
		level: 1,
		summary: "Every later step inherits the source. Lossy files separate worse and swirl more with each pass.",
		hear: "Stems with less \"underwater\" swirl and a top end that does not fizz after processing.",
		steps: [
			"On Suno, download WAV from the web app (Pro or Premier). The mobile app defaults to MP3.",
			"Keep the full-mix WAV even after you take stems; you will compare against it.",
			"Stay lossless between every step: 24-bit or 32-bit float WAV at one sample rate for the whole project."
		],
		caution: "Resampling back and forth (44.1 to 48 to 44.1 kHz) and saving MP3 between steps both add artifacts you cannot remove later.",
		where: ["suno", "any"],
		aka: [
			"lossless",
			"mp3",
			"wav",
			"format",
			"download",
			"sample rate",
			"bit depth"
		],
		related: ["spectrum-check", "stem-order"],
		sources: ["suno-wav", "ableton-stems"]
	},
	{
		id: "spectrum-check",
		title: "Check the spectrum for a hard cutoff",
		kind: "technique",
		stage: "stems",
		level: 3,
		summary: "Open the WAV in a spectrum viewer. A flat shelf around 16 kHz means the file is band-limited, so boosting air will only raise noise.",
		hear: "Nothing new, but you stop adding top end that is not there and stop chasing a brightness the file cannot have.",
		steps: [
			"Open the file in Spek, Audacity (Plot Spectrum) or iZotope RX.",
			"Look for a hard edge in the highs. Around 15 to 16 kHz is typical of a 128 kbps MP3 and of many AI exports.",
			"If there is an edge, plan to low-pass just below it instead of boosting with a high shelf or exciter."
		],
		where: ["daw"],
		aka: [
			"spectrogram",
			"frequency",
			"cutoff",
			"bandwidth",
			"air",
			"high end"
		],
		related: ["fix-shimmer", "wav-first"],
		sources: ["hydrogen-mp3", "antwort-suno"]
	},
	{
		id: "sparse-for-stems",
		title: "Generate a sparse, dry arrangement if you plan to split it",
		kind: "technique",
		stage: "stems",
		level: 2,
		summary: "Fewer layers and less reverb give the separator less to untangle. Bleed and shimmer collect in long reverb tails and dense highs.",
		hear: "Stems that sound like separate recordings rather than ghosts of the mix, with less of the other instruments leaking in.",
		steps: [
			"Add clean-mix words to the style: \"dry vocal, minimal reverb, clean mix, sparse arrangement\".",
			"Prefer \"powerful but clear\" over \"massive\", \"huge\" or \"wall of sound\".",
			"Make three or four takes and keep the one that separates cleanest, not only the one that sounds biggest."
		],
		example: {
			label: "Style line",
			code: "indie pop, 2010s, 104 BPM, clean electric guitar, live drums, bass, dry close female vocal, minimal reverb, clean mix, sparse arrangement"
		},
		where: ["any"],
		aka: [
			"bleed",
			"clean stems",
			"reverb",
			"dense"
		],
		related: ["stem-order", "fix-shimmer"],
		sources: ["reddit-shimmer", "apipass-v5"]
	},
	{
		id: "suno-stems",
		title: "Suno stems: Auto Split, Split from Mix, Advanced Split",
		kind: "tool",
		stage: "stems",
		level: 2,
		summary: "Suno splits the finished song for you. Auto Split gives up to 12 stems; Split from Mix gives one part plus everything else. Since June 2026 Suno regenerates each stem to match the song rather than cutting it out.",
		hear: "Crisper stems with less spill than older splits, but they are re-renders: they may not add back up exactly to the mix, and phase between them can wander.",
		steps: [
			"Auto Split: song menu, Get Stems. Up to 12 stems for 50 credits, Pro or Premier.",
			"Split from Mix: pick one instrument or the vocal; you get it plus a complement track. 10 credits per stem.",
			"Advanced Split (Premier): choose from about 100 instrument types, 10 credits per stem.",
			"In Studio, right-click a clip and choose Split Stems; Multitrack export saves every track as WAV."
		],
		caution: "Auto Split does not always label stems correctly, and asking for an instrument that is not there can still cost credits. Solo each stem and run a mono check before you build on them. If you only need vocal and instrumental, Split from Mix is cheaper.",
		where: ["suno"],
		aka: [
			"clean stems",
			"get stems",
			"12 stems",
			"two stems",
			"multitrack",
			"export stems",
			"studio"
		],
		related: ["stem-order", "best-of-both-vocals"],
		sources: ["suno-stems", "roex-stems"]
	},
	{
		id: "stem-order",
		title: "Split in order: vocals first, then the instrumental",
		kind: "technique",
		stage: "stems",
		level: 3,
		summary: "Take vocals off the full mix with the best vocal model, then split the instrumental (not the mix) into drums, bass and the rest.",
		hear: "Cleaner drums and bass, because the multi-stem model no longer has to fight the vocal, and fewer \"s\" sounds stuck in the hi-hats.",
		steps: [
			"Separate vocals and instrumental from the full mix with a top vocal model (BS-Roformer, on MVSep or in Ultimate Vocal Remover).",
			"Vocals: split lead from backing if you need to, then remove reverb and echo.",
			"Instrumental: split into drums, bass and other with a strong multi-stem model (BS-Roformer SW or an SCNet ensemble; Demucs htdemucs_ft locally for free).",
			"Split \"other\" into guitar, piano or synth only if you will treat them differently.",
			"Drums: split into kick, snare and cymbals, or go straight to drum-to-MIDI."
		],
		caution: "Do not chain separators on the same part. Each pass adds artifacts; one strong model per step beats three weak ones in a row.",
		where: ["daw"],
		aka: [
			"clean stems",
			"workflow",
			"order of operations",
			"uvr",
			"roformer",
			"demucs",
			"separation chain"
		],
		related: [
			"best-of-both-vocals",
			"dereverb-vocal",
			"null-test",
			"tool-uvr"
		],
		sources: ["mvsep", "demucs"]
	},
	{
		id: "best-of-both-vocals",
		title: "Compare Suno's vocal stem with your own split, section by section",
		kind: "technique",
		stage: "stems",
		level: 3,
		summary: "Neither always wins. Line both up and keep the cleaner one for each verse and chorus.",
		hear: "A vocal with fewer warbly patches, because each weak spot comes from whichever separation handled it better.",
		steps: [
			"Line both vocal stems up at bar 1 in your editor.",
			"Loop each section and switch between them at matched level.",
			"Cut and crossfade to the cleaner one per section."
		],
		where: ["suno", "daw"],
		aka: [
			"acapella",
			"a cappella",
			"vocal stem",
			"compare"
		],
		related: ["stem-order", "suno-stems"],
		sources: ["mvsep"]
	},
	{
		id: "dereverb-vocal",
		title: "Strip the baked-in reverb, then add your own",
		kind: "technique",
		stage: "stems",
		level: 3,
		summary: "AI vocals come with reverb you cannot control, and the shimmer lives in its tail. Remove it after the vocal is isolated.",
		hear: "A drier, closer vocal that sits in front of the mix, with a clean space you chose instead of a metallic wash.",
		steps: [
			"On Suno Premier, try Studio's Remove FX (Get Dry) on the vocal track first.",
			"Otherwise isolate the vocal first; de-reverb models are trained on isolated voices.",
			"Run a de-reverb model (a BS-Roformer de-reverb, UVR DeEcho-DeReverb, LALAL.AI Echo and Reverb Remover, or iZotope RX De-reverb).",
			"Add a short plate or room on a send, plus a tempo-synced delay for the chorus."
		],
		caution: "UVR DeEcho-DeReverb handles room reverb but leaves bright plate reverb behind. Listen for lost consonants and back off.",
		where: ["suno", "daw"],
		aka: [
			"reverb",
			"echo",
			"dry",
			"de-reverb",
			"dereverb",
			"wet"
		],
		related: ["fix-shimmer", "vocal-chain"],
		sources: ["dereverb-room", "mvsep"]
	},
	{
		id: "null-test",
		title: "Null test and mono check your stems",
		kind: "technique",
		stage: "stems",
		level: 3,
		summary: "Sum the stems, flip polarity, play against the original. What is left is what the split lost or added.",
		hear: "Confidence that nothing went missing, and early warning of parts that vanish in mono on a phone speaker.",
		steps: [
			"Line every stem up at bar 1 and confirm the waveforms match.",
			"Sum the stems, invert polarity and play against the original mix. A quiet residual, around -30 dBFS or lower, means a complete set.",
			"Solo each stem: listen for hi-hat ghosts in the vocal, vocal \"s\" in the cymbals, kick thump in the bass.",
			"Sum to mono. If a part thins or drops out, nudge its timing, flip its polarity or narrow its width."
		],
		where: ["daw"],
		aka: [
			"phase",
			"polarity",
			"bleed",
			"quality control",
			"mono"
		],
		related: ["stem-order", "fix-phase"],
		sources: ["dubspot-stems"]
	},
	{
		id: "ensemble",
		title: "Ensemble two separation models",
		kind: "technique",
		stage: "stems",
		level: 4,
		summary: "Average the output of two or three different strong models. It used to always win; with 2026 models, one top model often matches it.",
		hear: "Slightly fuller stems with fewer holes, at two or three times the processing time.",
		steps: [
			"Pick models of different families (a BS-Roformer, a MelBand-Roformer, an SCNet).",
			"Run them in parallel on the same source, not one after another.",
			"Average the waveforms. In the audio-separator command line, add --extra_models and --ensemble_algorithm avg_wave."
		],
		example: {
			label: "audio-separator",
			code: "audio-separator song.wav \\\n  -m model_a.ckpt --extra_models model_b.ckpt \\\n  --ensemble_algorithm avg_wave --output_format=WAV"
		},
		caution: "On MVSep's 2026 leaderboard a single BS-Roformer 124-band model (12.39 dB vocal SDR) beats the 2025 three-model ensemble (11.93). Try the single model first.",
		where: ["daw"],
		aka: [
			"average",
			"combine models",
			"sdr",
			"audio-separator"
		],
		related: ["stem-order", "tool-uvr"],
		sources: ["mvsep", "audio-separator"]
	},
	{
		id: "fullness-bleedless",
		title: "Choose \"fullness\" or \"bleedless\" by where the stem is going",
		kind: "technique",
		stage: "stems",
		level: 4,
		summary: "Some models keep more of the part with more leakage; others leak less and sound thinner. Pick by what happens next.",
		hear: "An instrumental that sounds full on its own, or a stem clean enough for MIDI conversion, instead of a compromise that does neither.",
		steps: ["Releasing the stem on its own (an instrumental or a cappella): use a fullness model.", "Converting to MIDI or splitting it further: use a bleedless or highest-SDR model."],
		where: ["daw"],
		aka: [
			"fullness",
			"bleedless",
			"sdr",
			"instrumental"
		],
		related: ["stem-to-midi"],
		sources: ["mvsep"]
	},
	{
		id: "stem-to-midi",
		title: "Turn the bass and chords into MIDI and replay them",
		kind: "technique",
		stage: "stems",
		level: 4,
		summary: "Convert a separated part to notes, clean them up, and play them with a real instrument or a plugin.",
		hear: "A low end that is tight and in tune, chords without smear, and parts you can change after the fact.",
		steps: [
			"Bass first: it is one note at a time, so it converts most reliably. Quantize lightly.",
			"Use Suno Studio Get MIDI (10 credits per stem), Spotify Basic Pitch (free), Melodyne, RipX or Fadr.",
			"For dense parts, lower Basic Pitch's onset and note thresholds and clean the notes by hand.",
			"Play the MIDI with your own bass or synth. Keep the AI part quietly underneath for texture if it helps."
		],
		caution: "MIDI from AI audio is a sketch: expect wrong notes in chords and fast runs. Fix by ear.",
		where: ["suno", "daw"],
		aka: [
			"midi",
			"basic pitch",
			"melodyne",
			"ripx",
			"replay",
			"rebuild",
			"notes"
		],
		related: ["replace-drums", "fullness-bleedless"],
		sources: [
			"suno-midi",
			"basic-pitch",
			"dubspot-rebuild"
		]
	},
	{
		id: "replace-drums",
		title: "Replace or layer the drums with samples",
		kind: "technique",
		stage: "stems",
		level: 4,
		summary: "AI drums have soft, smeared hits. Trigger real samples from the separated kick and snare, or program the groove yourself.",
		hear: "Punchy, consistent drums with real attack, the biggest single jump toward a \"produced\" sound.",
		steps: [
			"Split the drum stem into kick, snare and cymbals (MVSep DrumSep).",
			"Trigger samples from the kick and snare hits, or convert them to MIDI.",
			"Layer the samples under the AI drums at first; mute the AI drums only if the groove survives.",
			"Cymbals separate worst. Replace them rather than keep them."
		],
		where: ["daw"],
		aka: [
			"drums",
			"samples",
			"trigger",
			"punch",
			"transients",
			"drum replacement"
		],
		related: ["fix-transients", "stem-to-midi"],
		sources: ["mvsep", "dubspot-rebuild"]
	},
	{
		id: "tool-uvr",
		title: "Ultimate Vocal Remover and MVSep: free top-tier separation",
		kind: "tool",
		stage: "stems",
		level: 3,
		summary: "UVR runs the open models on your computer; MVSep.com runs the leaderboard models in the browser.",
		hear: "Vocal splits as clean as paid tools, often cleaner, if you pick a current Roformer model rather than the old defaults.",
		steps: [
			"UVR 5.6: in the download center, get a BS-Roformer or MelBand-Roformer vocal model.",
			"Keep segment size and overlap at defaults first; higher overlap is slightly better and slower.",
			"On MVSep, pick by the published score for the stem you need."
		],
		example: {
			label: "Demucs, free and local",
			code: "uvx demucs -n htdemucs_ft --float32 song.wav\nuvx demucs --two-stems=vocals song.wav"
		},
		caution: "Demucs is no longer developed and is well behind Roformer models for vocals (8.33 against 12.39 dB SDR). Use it for drums and bass, or when nothing else runs.",
		where: ["daw"],
		aka: [
			"clean stems",
			"uvr",
			"uvr5",
			"mvsep",
			"demucs",
			"roformer",
			"open source",
			"free"
		],
		related: ["stem-order", "ensemble"],
		sources: [
			"uvr",
			"mvsep",
			"demucs"
		]
	},
	{
		id: "fix-shimmer",
		title: "Metallic, swirly shimmer in the high end",
		kind: "fix",
		group: "top",
		stage: "stems",
		level: 3,
		summary: "The \"Suno shimmer\": a fizzy, phasey sheen on cymbals, reverb tails and vocal air. Fix it per stem, before mastering.",
		hear: "A smooth top end, cymbals that ring instead of sizzling, and vocals without a robotic halo.",
		steps: [
			"First try a new take or a Remaster. One report says a High remaster cut shimmer sharply; treat it as worth a try, not a promise.",
			"Low-pass the affected stems, not the whole mix, between 12 and 16 kHz. Many AI files stop near 16 kHz anyway.",
			"Use a dynamic EQ band around 8 to 16 kHz that only acts when the shimmer flares.",
			"Light spectral de-noise on the stem (raise smoothing to avoid \"musical noise\").",
			"De-reverb the vocal and add your own reverb; the shimmer lives in the tail.",
			"If the mix is still fizzy, cut the side channel above about 8 to 10 kHz with mid/side EQ."
		],
		caution: "EQ alone often does not remove it fully. Do not boost air with a shelf or exciter on a shimmery source; it gets louder.",
		where: ["suno", "daw"],
		aka: [
			"suno shimmer",
			"metallic",
			"swirl",
			"fizz",
			"robotic",
			"artifact",
			"tinny",
			"high end",
			"sizzle"
		],
		related: [
			"dereverb-vocal",
			"spectrum-check",
			"remaster-in-app"
		],
		sources: [
			"reddit-shimmer",
			"antwort-suno",
			"rx-denoise",
			"dubspot-stems"
		]
	},
	{
		id: "fix-hiss",
		title: "Steady hiss or noise under everything",
		kind: "fix",
		group: "top",
		stage: "stems",
		level: 3,
		summary: "A constant noise floor baked into the generation, most obvious in quiet intros and endings.",
		hear: "Clean silence between phrases and a black background behind sparse sections.",
		steps: [
			"Spectral de-noise: learn a profile from a quiet gap, or use adaptive mode.",
			"Raise the threshold slowly; too much removes low-level detail and breath.",
			"A gentle high-cut on the noisiest stems."
		],
		where: ["daw"],
		aka: [
			"noise",
			"hiss",
			"noise floor",
			"denoise"
		],
		related: ["fix-shimmer", "fix-tails"],
		sources: ["rx-denoise", "dubspot-stems"]
	},
	{
		id: "fix-watery-vocal",
		title: "Phasey, watery or underwater vocal",
		kind: "fix",
		group: "vocals",
		stage: "stems",
		level: 3,
		summary: "Holes left by separation, or warble generated into the voice itself.",
		hear: "A solid, present vocal with steady tone through held notes.",
		steps: [
			"Re-split with a higher-scoring or \"fullness\" vocal model, or ensemble two.",
			"Do not re-separate a stem that was already separated.",
			"Light spectral de-noise only.",
			"Melodyne to steady wobbly pitch.",
			"If it is in the generation itself, replace that section, or re-sing or re-voice the part."
		],
		caution: "Warble that is in every take is a generation problem, not noise. Processing will not fix it; a new take or a replaced section will.",
		where: ["daw"],
		aka: [
			"phasey",
			"watery",
			"underwater",
			"warble",
			"robotic vocal",
			"artifact"
		],
		related: [
			"best-of-both-vocals",
			"ensemble",
			"replace-section"
		],
		sources: ["mvsep", "jr-noise"]
	},
	{
		id: "fix-transients",
		title: "Soft, smeared drum hits",
		kind: "fix",
		group: "low",
		stage: "stems",
		level: 3,
		summary: "Both the generator and the separator blur the start of each hit, so drums sound pillowy and far away.",
		hear: "Drums that snap and push the groove forward.",
		steps: [
			"Transient shaper on the drum stem: raise attack.",
			"Faster compressor attack and release on drums.",
			"Best fix: trigger or layer samples from the separated kick and snare."
		],
		where: ["daw"],
		aka: [
			"punch",
			"transient",
			"weak drums",
			"soft drums",
			"smeared"
		],
		related: ["replace-drums"],
		sources: ["dubspot-stems", "dubspot-rebuild"]
	},
	{
		id: "fix-mud",
		title: "Muddy low mids, boomy low end",
		kind: "fix",
		group: "low",
		stage: "mix",
		level: 3,
		summary: "Kick, bass and low instruments pile into the same range, so the mix sounds thick and unclear.",
		hear: "A kick and bass you can tell apart, and space around the vocal.",
		steps: [
			"High-pass everything except kick and bass at 30 to 40 Hz.",
			"High-pass the vocal at about 80 to 100 Hz.",
			"Cut boxiness at 200 to 400 Hz on guitars, keys and pads.",
			"Carve the kick and bass: give each its own peak and dip the other there.",
			"Still muddy: rebuild the bass from MIDI."
		],
		where: ["daw"],
		aka: [
			"muddy",
			"boomy",
			"murky",
			"low end",
			"bass",
			"eq"
		],
		related: ["stem-to-midi", "mono-low-end"],
		sources: ["dubspot-stems", "roex-stems"]
	},
	{
		id: "fix-harsh-vocal",
		title: "Harsh vocal and sharp \"s\" sounds",
		kind: "fix",
		group: "vocals",
		stage: "mix",
		level: 3,
		summary: "AI vocals often have a piercing band between 2 and 6 kHz and exaggerated sibilance.",
		hear: "A vocal that is bright and clear without stinging on \"s\", \"t\" and \"ch\".",
		steps: [
			"Sweep for harsh spots between 2 and 5 kHz and cut them narrowly.",
			"De-ess between 5 and 8 kHz.",
			"Prefer several small narrow cuts over one big high shelf."
		],
		where: ["daw"],
		aka: [
			"sibilance",
			"de-ess",
			"harsh",
			"piercing",
			"ess",
			"shrill"
		],
		related: ["vocal-chain"],
		sources: [
			"dubspot-stems",
			"roex-stems",
			"rx-deess"
		]
	},
	{
		id: "fix-flat-vocal",
		title: "Vocal too even, no life in it",
		kind: "fix",
		group: "vocals",
		stage: "mix",
		level: 3,
		summary: "Generated vocals arrive heavily levelled. More compression makes them flatter.",
		hear: "A vocal that leans in on the chorus and pulls back on the verse.",
		steps: ["Ride the vocal with volume automation per phrase.", "Then compress lightly: 2:1 to 4:1 with 2 to 4 dB of gain reduction."],
		where: ["daw"],
		aka: [
			"compression",
			"dynamics",
			"lifeless",
			"flat",
			"automation"
		],
		related: ["vocal-chain", "vocal-front"],
		sources: ["dubspot-stems"]
	},
	{
		id: "fix-narrow",
		title: "Mono-ish or wandering stereo",
		kind: "fix",
		group: "space",
		stage: "mix",
		level: 3,
		summary: "Parts drift around the stereo field, or the mix collapses to the middle.",
		hear: "A stable picture: kick, bass and vocal in the middle, guitars and keys either side.",
		steps: [
			"Re-pan the stems: kick, bass and lead vocal centred; guitars and keys a little left and right.",
			"Add depth with your own reverb rather than a widener.",
			"Check in mono after every width change."
		],
		caution: "Stereo wideners on phasey AI material make mono collapse worse.",
		where: ["daw"],
		aka: [
			"stereo",
			"width",
			"wide",
			"mono",
			"panning",
			"imager"
		],
		related: ["null-test", "mono-low-end"],
		sources: ["roex-stems", "dubspot-stems"]
	},
	{
		id: "fix-phase",
		title: "Parts cancel each other out",
		kind: "fix",
		group: "space",
		stage: "mix",
		level: 3,
		summary: "Stems drift out of alignment, so combined parts sound hollow or thin.",
		hear: "Full, solid low end and a centred vocal that does not wobble.",
		steps: [
			"Align every stem to bar 1.",
			"Nudge timing on the offending part.",
			"Flip polarity and compare.",
			"Watch a correlation meter; keep it above zero."
		],
		where: ["daw"],
		aka: [
			"phase",
			"polarity",
			"hollow",
			"thin",
			"cancel"
		],
		related: ["null-test"],
		sources: ["dubspot-stems", "roex-stems"]
	},
	{
		id: "fix-tails",
		title: "Crunchy fade, clicks or crackle at the end",
		kind: "fix",
		group: "structure",
		stage: "edit",
		level: 2,
		summary: "Generations often break up as they end: crackle, a noisy tail or a click.",
		hear: "An ending that decays cleanly into silence.",
		steps: [
			"Cut before the damage and draw your own fade.",
			"Gate or expand the last tail.",
			"Single clicks: de-click, or attenuate the spot with spectral repair."
		],
		where: ["daw"],
		aka: [
			"crackle",
			"click",
			"pop",
			"fade",
			"tail",
			"ending"
		],
		related: ["tag-end", "fix-hiss"],
		sources: ["reddit-shimmer", "rx-deess"]
	},
	{
		id: "fix-dips",
		title: "Volume dips and sections that jump out",
		kind: "fix",
		group: "structure",
		stage: "mix",
		level: 2,
		summary: "The model drifts in loudness, especially across extends.",
		hear: "A song that builds where you meant it to, not where the model happened to get louder.",
		steps: ["Clip gain or automate each section to level before any compression.", "Then light bus compression, 1 to 2 dB of gain reduction."],
		where: ["daw"],
		aka: [
			"volume",
			"level",
			"dip",
			"loudness jump",
			"inconsistent"
		],
		related: ["fix-flat-vocal"],
		sources: ["roex-stems", "dubspot-stems"]
	},
	{
		id: "fix-decay",
		title: "Quality falls apart after two minutes",
		kind: "fix",
		group: "structure",
		stage: "generate",
		level: 2,
		summary: "Errors build up in long generations. Mud and artifacts often grow past the two to three minute mark.",
		hear: "A last chorus as clean as the first.",
		steps: [
			"Generate in 1.5 to 2 minute sections.",
			"Extend from the cleanest earlier point, not the very end.",
			"Replace the bad section rather than regenerate the song."
		],
		where: ["suno", "any"],
		aka: [
			"degrade",
			"long song",
			"gets worse",
			"falls apart"
		],
		related: ["extend-from-best", "replace-section"],
		sources: ["apipass-v5", "reddit-shimmer"]
	},
	{
		id: "fix-codec",
		title: "Low-bitrate swirl, the \"MP3 sound\"",
		kind: "fix",
		group: "top",
		stage: "stems",
		level: 2,
		summary: "Warbly highs from a lossy download or from repeated lossy saves.",
		hear: "Steady cymbals and breath without a swirling, chirpy edge.",
		steps: [
			"Download the WAV again.",
			"Never save MP3 between steps.",
			"Low-pass just above the codec cutoff to hide what remains."
		],
		where: ["any", "daw"],
		aka: [
			"mp3",
			"codec",
			"swirl",
			"bitrate",
			"compression artifacts",
			"chirp"
		],
		related: ["wav-first", "spectrum-check"],
		sources: ["suno-wav", "antwort-suno"]
	},
	{
		id: "vocal-chain",
		title: "A starter chain for an AI vocal",
		kind: "technique",
		stage: "mix",
		level: 3,
		summary: "The order and the ranges most guides converge on, from clean-up to space.",
		hear: "A vocal that is clear, forward and smooth, without shimmer or sting.",
		steps: [
			"Light spectral de-noise (watch for lost consonants).",
			"De-reverb, only if you will add your own space.",
			"High-pass 80 to 100 Hz, cut boxiness at 200 to 400 Hz, narrow cuts on harsh spots at 2 to 5 kHz.",
			"Compress 2:1 to 4:1, 2 to 4 dB of gain reduction.",
			"De-ess 5 to 8 kHz.",
			"Low-pass at 14 to 16 kHz if shimmer remains. Add a high shelf above 10 kHz only if the top is clean.",
			"Your own reverb and delay on sends. Melodyne for pitch and timing if it wobbles."
		],
		where: ["daw"],
		aka: [
			"vocal chain",
			"vocal mix",
			"eq",
			"compressor",
			"de-esser",
			"plugins"
		],
		related: [
			"dereverb-vocal",
			"fix-harsh-vocal",
			"vocal-front"
		],
		sources: ["dubspot-stems", "antwort-suno"]
	},
	{
		id: "vocal-front",
		title: "Put the vocal in front and keep it there",
		kind: "technique",
		stage: "mix",
		level: 3,
		summary: "Hits are sung at you. A dry, centred, upfront vocal with space around it reads as expensive.",
		hear: "Every word understood on a phone speaker, with the band supporting rather than covering it.",
		steps: [
			"Balance the band around the vocal, not the vocal on top of the band.",
			"Duck pads and guitars slightly in the vocal's presence range (dynamic EQ or sidechain).",
			"Keep reverb short on the lead and longer on backing vocals."
		],
		where: ["daw"],
		aka: [
			"vocal level",
			"buried vocal",
			"upfront",
			"presence",
			"clarity"
		],
		related: ["vocal-chain", "fix-flat-vocal"],
		sources: ["dubspot-stems"]
	},
	{
		id: "mono-low-end",
		title: "Keep the low end in mono",
		kind: "technique",
		stage: "mix",
		level: 3,
		summary: "Kick and bass in the centre, and nothing wide below about 120 Hz.",
		hear: "Low end that hits the same on a club system, earbuds and a phone.",
		steps: [
			"Pan kick and bass centre.",
			"Narrow everything else below about 120 Hz.",
			"High-pass non-bass parts at 30 to 40 Hz."
		],
		where: ["daw"],
		aka: [
			"low end",
			"bass",
			"mono",
			"sub",
			"kick"
		],
		related: ["fix-mud", "fix-narrow"],
		sources: ["dubspot-stems"]
	},
	{
		id: "saturate-glue",
		title: "Low-pass first, then saturate to glue it together",
		kind: "technique",
		stage: "mix",
		level: 3,
		summary: "Light tape or saturation glues AI parts with replaced ones and softens brittle highs.",
		hear: "Parts that sound recorded in the same room, with a warmer, rounder top.",
		steps: [
			"Low-pass or shelf the shimmer band first.",
			"Add light saturation or tape emulation on the bus or the music group.",
			"Match levels before and after so you judge tone, not loudness."
		],
		caution: "Saturation adds harmonics in the shimmer band. Saturating first makes shimmer worse.",
		where: ["daw"],
		aka: [
			"tape",
			"saturation",
			"warmth",
			"analog",
			"glue"
		],
		related: ["fix-shimmer"],
		sources: ["dubspot-rebuild"]
	},
	{
		id: "automix",
		title: "Use an automatic mixer as a first pass",
		kind: "tool",
		stage: "mix",
		level: 2,
		summary: "Services such as RoEx Automix balance Suno stems by genre, with a slider for how important each part is.",
		hear: "A balanced starting mix in minutes, a better base than the raw stereo file.",
		steps: [
			"Upload the stems.",
			"Pick the genre and raise the importance of the vocal.",
			"Use the result as a reference or a starting point, then fix by hand."
		],
		where: ["suno", "daw"],
		aka: [
			"auto mix",
			"ai mixing",
			"roex",
			"balance"
		],
		related: ["vocal-front"],
		sources: ["roex-stems"]
	},
	{
		id: "loudness-targets",
		title: "Master for streaming: -14 LUFS, -1 dBTP",
		kind: "technique",
		stage: "master",
		level: 3,
		summary: "Spotify and YouTube turn loud songs down to about -14 LUFS. Masters much louder than that only lose punch.",
		hear: "A master that sounds as loud as its neighbours on a playlist, with drums that still hit.",
		steps: [
			"Aim for -14 to -10 LUFS integrated, depending on genre.",
			"Set a true-peak limiter ceiling of -1 dBTP; use -2 dBTP if the master is louder than -14 LUFS.",
			"Spotify's Loud setting is -11 LUFS, Quiet -19. Apple Music Sound Check sits near -16."
		],
		where: ["daw"],
		aka: [
			"lufs",
			"loudness",
			"true peak",
			"dbtp",
			"limiter",
			"spotify",
			"normalization",
			"how loud"
		],
		related: ["measure-first", "reference-match"],
		sources: ["spotify-loudness", "mtm-loudness"]
	},
	{
		id: "measure-first",
		title: "Measure before you limit: AI output is already loud",
		kind: "technique",
		stage: "master",
		level: 3,
		summary: "Generated files often arrive at around -9 LUFS with flattened peaks. Adding a limiter doubles the distortion.",
		hear: "No \"tin can\" crunch, and choruses that open up instead of pumping.",
		steps: [
			"Meter the raw file: integrated LUFS and true peak.",
			"If it is already loud and flat-topped, do not limit more; turn it down or remix from stems.",
			"Master a remix from cleaned stems instead of the stereo file whenever you can."
		],
		where: ["daw"],
		aka: [
			"over limiting",
			"distortion",
			"crunch",
			"squashed",
			"meter"
		],
		related: ["loudness-targets"],
		sources: ["reddit-shimmer", "spotify-loudness"]
	},
	{
		id: "reference-match",
		title: "Master against a level-matched reference",
		kind: "technique",
		stage: "master",
		level: 4,
		summary: "Pick one to three released songs in the genre, match their loudness, and compare tone and width.",
		hear: "A song that sits next to released tracks without sounding thinner, duller or smaller.",
		steps: [
			"Load the references next to your master and level-match them (Ozone Gain Match, or the REFERENCE plugin).",
			"Use Match EQ at 25 to 50 percent, not 100, so you borrow the balance without copying the curve.",
			"Check in mono, on small speakers, and after an AAC or OGG preview."
		],
		where: ["daw"],
		aka: [
			"reference track",
			"match eq",
			"ozone",
			"compare",
			"tonal balance"
		],
		related: ["loudness-targets", "reference-first"],
		sources: ["ozone-ref"]
	},
	{
		id: "remaster-in-app",
		title: "Suno Remaster is a regeneration, not a master",
		kind: "tool",
		stage: "master",
		level: 2,
		summary: "Subtle, Normal and High strengths re-render the song. Subtle can tidy a mix or clarify words; High can change the music.",
		hear: "Subtle: a slightly cleaner take of the same song. High: a related but different performance.",
		steps: [
			"Try Subtle first for clarity or pronunciation.",
			"Compare against the original at matched level.",
			"Do not remaster a remaster; each pass drifts further."
		],
		caution: "Do not stack it with other AI masters (Suno Remaster, then an online master, then Ozone). Pick one.",
		where: ["suno"],
		aka: [
			"remaster",
			"master",
			"cleaner",
			"pronunciation"
		],
		related: ["fix-shimmer", "online-master"],
		sources: ["suno-remaster", "jr-remaster"]
	},
	{
		id: "online-master",
		title: "Online mastering services for a fast finish",
		kind: "tool",
		stage: "master",
		level: 2,
		summary: "LANDR, eMastered, BandLab and RoEx master a stereo file for you, some with a free preview.",
		hear: "A louder, more even file than the raw export, in minutes. Less control than mastering yourself.",
		steps: [
			"Upload a WAV with headroom, peaking below about -3 dBFS.",
			"Compare presets at matched loudness, not the loudest one.",
			"Check the result against the targets: about -14 LUFS, -1 dBTP."
		],
		where: ["any"],
		aka: [
			"landr",
			"emastered",
			"bandlab",
			"ai mastering",
			"online"
		],
		related: ["loudness-targets", "measure-first"],
		sources: ["bandlab-review", "roex-stems"]
	}
];
//#endregion
//#region junkyard/ai-music-guide/data/entries-prompt.ts
/**
* The style box, the lyrics box and the tag dictionary. Suno has never
* published an official tag list; reliability verdicts come from community
* testing and are noted per tag. Research: docs/kb/research/ai-music/suno.md
*/
var PROMPT_ENTRIES = [
	{
		id: "custom-mode",
		title: "Use Custom (Advanced) mode, not Simple",
		kind: "technique",
		stage: "prompt",
		level: 1,
		summary: "Simple mode writes the lyrics, style and structure for you. Advanced gives you a lyrics box, a style box and a title, so the song is yours.",
		hear: "Your words, sung in the order you wrote them, in a genre you chose, instead of generic AI lyrics.",
		steps: [
			"On Suno's Create page, pick Advanced (older help pages and the iOS app still call it Custom).",
			"Paste your lyrics with section tags.",
			"Write the style line separately; never put style words in the lyrics box."
		],
		where: ["suno"],
		aka: [
			"custom",
			"advanced",
			"simple mode",
			"own lyrics"
		],
		related: ["style-formula", "tag-sections"],
		sources: ["suno-modes"]
	},
	{
		id: "style-formula",
		title: "Write the style line in a fixed order",
		kind: "technique",
		stage: "prompt",
		level: 1,
		summary: "Genre and subgenre, era, tempo, two or three instruments, the vocal, production, mood. Put what you must have first.",
		hear: "Fewer genre-mush results, and a first minute that matches what you asked for. The model follows the prompt most closely early in the song.",
		steps: [
			"One main genre and at most one secondary influence.",
			"Give an exact BPM rather than \"fast\" or \"slow\".",
			"Name two or three instruments with a role each (\"piano carrying the melody, low cello drone\").",
			"Describe the voice: register, texture, delivery.",
			"Add production words, then one or two moods."
		],
		example: {
			label: "Style line",
			code: "neo-soul, late 1990s, 88 BPM, Rhodes piano carrying the chords, warm bass guitar, brushed drums, intimate female alto vocal, close mic, tape saturation, warm and bittersweet"
		},
		caution: "More is not better. Style lines up to 1,000 characters are allowed, but v6 guides suggest 60 to 90 words, and quality words like \"epic\" or \"masterpiece\" carry no musical meaning.",
		where: ["any"],
		aka: [
			"style prompt",
			"prompt formula",
			"genre",
			"order",
			"style box",
			"description"
		],
		related: [
			"style-prose",
			"no-artist-names",
			"exclude-field"
		],
		sources: [
			"field-guide",
			"sunobuilder-v6",
			"aimusicdaily-tags"
		]
	},
	{
		id: "style-prose",
		title: "On v6, write the style as a short brief with jobs for each part",
		kind: "technique",
		stage: "prompt",
		level: 2,
		summary: "v6 reads musicians' language. Two to four sentences that say what each instrument does, and when it enters or drops out, beat a list of adjectives.",
		hear: "An arrangement that moves: parts entering and leaving where you said, rather than everything playing all the time.",
		steps: [
			"Sentence one: genre and tempo.",
			"Sentence two: the vocal.",
			"Sentence three: the instruments and their roles.",
			"Sentence four: structure and production, using arrangement verbs: enters, drops out, doubles, widens, strips back."
		],
		example: {
			label: "Style brief",
			code: "Dark synth-pop at 112 BPM. A breathy male tenor, close and dry in the verses, doubled in the chorus. Analog bass arpeggio and gated drums; a bright lead synth enters on the chorus and drops out in the bridge. Crisp, wide, radio-ready mix."
		},
		caution: "Comma lists still work. Prose helps most when the arrangement matters; for a simple vibe, a list is fine.",
		where: ["suno", "eleven"],
		aka: [
			"natural language",
			"brief",
			"arrangement",
			"v6 prompt"
		],
		related: ["style-formula"],
		sources: [
			"sunobuilder-v6",
			"suno-v6-faq",
			"eleven-best"
		]
	},
	{
		id: "no-artist-names",
		title: "Describe the sound, never name the artist",
		kind: "technique",
		stage: "prompt",
		level: 1,
		summary: "Suno, ElevenLabs and Lyria strip or block artist names. Break the sound you want into its parts instead.",
		hear: "The era, texture and feel you were after, consistent from take to take, and no blocked or rewritten prompts.",
		steps: [
			"Name the era or decade.",
			"Name the two or three defining instruments and how they are played.",
			"Describe the voice: timbre, register, delivery.",
			"Describe the production and the room.",
			"Add the mood."
		],
		example: {
			label: "Instead of a band name",
			code: "1990s grunge, distorted downtuned guitars, loose heavy drums, melodic bass, raw strained male vocal, roomy live recording, angsty and raw"
		},
		caution: "Some ordinary words are also names. One tester's \"capo\" (the guitar clamp) was read as a rapper and the style was rewritten. If a style comes back strange, look for a word that is also a name.",
		where: ["any"],
		aka: [
			"artist name",
			"sound like",
			"in the style of",
			"blocked",
			"reference artist"
		],
		related: ["style-formula", "reference-first"],
		sources: [
			"suno-responsibly",
			"suno-blocked",
			"violet-prompts"
		]
	},
	{
		id: "exclude-field",
		title: "Put what you do not want in Exclude, never in the style box",
		kind: "technique",
		stage: "prompt",
		level: 2,
		summary: "Writing \"no male vocal\" in the style box can ask for a male vocal. Exclude Styles is the negative prompt.",
		hear: "The instrument or voice you kept getting stops turning up.",
		steps: [
			"Open More Options and fill Exclude Styles.",
			"Keep it to two or three items; long lists make arrangements unstable.",
			"If there is no exclude field, end the style with \"no X\" (use \"no\", not \"don't\")."
		],
		example: {
			label: "Exclude",
			code: "pop, humming, spoken intro"
		},
		where: [
			"suno",
			"udio",
			"eleven"
		],
		aka: [
			"negative prompt",
			"exclude styles",
			"remove instrument",
			"no vocals",
			"avoid"
		],
		related: ["fix-pop-drift", "fix-intro-humming"],
		sources: [
			"suno-exclude",
			"hookgenius-v6",
			"field-guide"
		]
	},
	{
		id: "variety-zero",
		title: "Set Variety to 0 when you need the prompt kept word for word",
		kind: "technique",
		stage: "prompt",
		level: 2,
		summary: "v6's Variety slider rewrites your style prompt to add variation. Suno's own advice: turn it to 0 to keep your tags.",
		hear: "Takes that follow your style line. In one test, Off kept the style exactly on 52 of 54 takes; Normal rewrote it every time.",
		steps: [
			"More Options, Variety: 0 while testing a prompt.",
			"Raise it only when you want ideas.",
			"Check the stored style on the song page to see what was actually used."
		],
		where: ["suno"],
		aka: [
			"variety",
			"prompt rewritten",
			"style ignored",
			"slider"
		],
		related: ["sliders", "one-variable"],
		sources: ["suno-v6-faq", "hookgenius-v6"]
	},
	{
		id: "sliders",
		title: "Weirdness, Style Influence and Audio Influence",
		kind: "technique",
		stage: "prompt",
		level: 2,
		summary: "The creative sliders under More Options. Move one at a time.",
		hear: "Low weirdness: safe, expected takes. Higher style influence: closer to your style words. Higher audio influence: closer to your upload.",
		steps: [
			"Weirdness: 10 to 30 percent for covers and safe work, 40 to 60 balanced, 70 and up for experiments.",
			"Style Influence: 70 to 90 percent for vague prompts like \"pop\", 40 to 60 for detailed ones.",
			"Audio Influence: 70 to 80 percent when fixing a lyric or keeping a cover close."
		],
		caution: "Typing \"weirdness 20%\" into the prompt does nothing. The sliders only work in the interface.",
		where: ["suno"],
		reliability: "reliable",
		aka: [
			"weirdness",
			"style influence",
			"audio influence",
			"audio strength",
			"settings",
			"slider"
		],
		related: ["variety-zero"],
		sources: ["suno-sliders", "field-guide"]
	},
	{
		id: "production-words",
		title: "Production words that move the mix",
		kind: "technique",
		stage: "prompt",
		level: 2,
		summary: "Describe the recording, not the quality. \"Realistic\" does little; \"close mic, small room, breath detail\" does a lot.",
		hear: "Polished words give a brighter, tighter, wider mix. Analog words give warmth, room and small imperfections that read as human.",
		steps: [
			"Polished: radio-ready, crisp mix, clean transients, punchy compression, wide stereo, bright modern mix, controlled low end.",
			"Analog and human: tape saturation, slight wow and flutter, close mic presence, small room, breath detail, one-take performance, natural timing drift, fret squeak.",
			"For synths, name the synthesis (FM, wavetable) or the motion (LFO-driven) to escape the default sawtooth."
		],
		caution: "\"Ethereal\", \"lush\" and \"shimmering\" are often ignored or add the very haze you are trying to avoid.",
		where: ["any"],
		aka: [
			"mix words",
			"realistic",
			"human",
			"analog",
			"polished",
			"radio ready",
			"lo-fi"
		],
		related: ["style-formula", "sparse-for-stems"],
		sources: ["field-guide", "sunobuilder-v6"]
	},
	{
		id: "sing-not-read",
		title: "Short lines so v6 sings instead of reading",
		kind: "technique",
		stage: "prompt",
		level: 2,
		summary: "v6 sings every syllable you give it, so dense lines come out rushed and flat: the \"it reads, it doesn't sing\" complaint.",
		hear: "Melody with held notes and breathing room, instead of words crammed onto the beat.",
		steps: [
			"Ballads: 6 to 8 syllables per verse line, 4 to 6 per chorus line.",
			"Elsewhere: 6 to 10 syllables, with matching lines within one or two of each other.",
			"End chorus lines on open vowels: ay, oh, oo, ah.",
			"Make the chorus look different on the page (shorter lines) or v6 sings it like the verse."
		],
		where: ["suno", "any"],
		aka: [
			"syllables",
			"rushed",
			"flat delivery",
			"reads not sings",
			"phrasing",
			"cramming"
		],
		related: ["prosody", "tag-stretch"],
		sources: ["undetectr-v6", "field-guide"]
	},
	{
		id: "hum-the-melody",
		title: "Upload a hum or voice memo of the melody",
		kind: "technique",
		stage: "prompt",
		level: 3,
		summary: "A sung reference beats every adjective. Upload a hummed melody, a voice memo or a rough demo and build on it with Cover or Extend.",
		hear: "Your melody and phrasing, produced. The strongest single fix for v6 phrasing, and the melody is yours.",
		steps: [
			"Record the hook or the whole top line on your phone, in time.",
			"Upload Audio, then Cover or Extend from it.",
			"Raise Audio Influence to keep your melody."
		],
		caution: "Uploads are screened. Commercial songs you do not own will likely be blocked.",
		where: ["suno", "eleven"],
		aka: [
			"hum",
			"voice memo",
			"upload audio",
			"demo",
			"melody",
			"reference audio",
			"cover"
		],
		related: ["own-voice", "protectable"],
		sources: [
			"undetectr-v6",
			"suno-upload",
			"suno-responsibly"
		]
	},
	{
		id: "one-variable",
		title: "Change one thing per test, and run it twice",
		kind: "technique",
		stage: "prompt",
		level: 2,
		summary: "On v6, the two takes from one generation can differ more than a deliberate prompt change. Judge a change over two or three runs.",
		hear: "You learn which word actually moved the sound, instead of chasing noise.",
		steps: [
			"Variety at 0.",
			"Change one word, tag or slider.",
			"Run two or three generations before you decide."
		],
		where: ["any"],
		aka: [
			"testing",
			"a/b",
			"experiment",
			"iterate"
		],
		related: ["variety-zero", "tries-budget"],
		sources: ["hookgenius-v6", "field-guide"]
	},
	{
		id: "lyria-timestamps",
		title: "Lyria: timestamp lines and a singer profile",
		kind: "technique",
		stage: "prompt",
		level: 3,
		summary: "Google's Lyria 3.5 takes section timing inside the prompt and a named voice type, because the API cannot edit afterwards.",
		hear: "Sections that start when you said, in one pass.",
		example: {
			label: "Lyria 3.5 prompt",
			code: "Warm indie folk, 96 BPM, D major. Male Baritone.\n[0:00 - 0:08] Intro: fingerpicked acoustic guitar\n[0:08 - 0:40] Verse 1: guitar and voice only\n[0:40 - 1:10] Chorus: drums and harmonies enter\n\nLyrics:\n[Verse 1]\n...\n[Chorus]\n..."
		},
		steps: [
			"Pick a singer profile: Female Soprano, Female Alto, Male Tenor, Male Baritone.",
			"Give BPM and key.",
			"Prompt in the language you want sung.",
			"Prototype on the Clip model, render the final on 3.5."
		],
		where: ["lyria"],
		aka: [
			"lyria",
			"gemini",
			"google",
			"timestamps",
			"flow music"
		],
		related: ["eleven-plan"],
		sources: ["lyria-guide"]
	},
	{
		id: "eleven-plan",
		title: "ElevenLabs: control each section with a composition plan",
		kind: "technique",
		stage: "prompt",
		level: 3,
		summary: "ElevenLabs Music takes a list of sections, each with its own length, lyrics and include and exclude styles.",
		hear: "Exact section lengths and a style change exactly where you want it, such as a stripped bridge.",
		steps: [
			"In the app, add sections and set per-section styles in the editor.",
			"On the API, draft a plan with the free plan endpoint, edit it, then compose from it.",
			"Narrate the arrangement in order (\"start with… then bring in…\"), and mark silences, or the model fills them."
		],
		example: {
			label: "One section of a plan",
			code: "{\n  \"text\": \"[Bridge]\\nAll the lights went out...\",\n  \"duration_ms\": 16000,\n  \"positive_styles\": [\"solo piano\", \"close vocal\"],\n  \"negative_styles\": [\"drums\"]\n}"
		},
		where: ["eleven"],
		aka: [
			"elevenlabs",
			"composition plan",
			"sections",
			"api",
			"json"
		],
		related: ["lyria-timestamps"],
		sources: ["eleven-compose", "eleven-best"]
	},
	{
		id: "udio-clips",
		title: "Udio: build the song clip by clip",
		kind: "technique",
		stage: "prompt",
		level: 2,
		summary: "Udio generates short clips and extends them. Manual Mode uses exact tags only; clip start at 0% makes an intro.",
		hear: "Natural-sounding vocals, built one section at a time, but only playable inside Udio.",
		steps: [
			"Manual Mode for exact tags and custom lyrics.",
			"Generate the intro with clip start at 0%, then extend.",
			"Raise prompt strength for adherence, lower lyrics strength for a more natural delivery."
		],
		caution: "Udio has not allowed downloads since October 2025. Use it to sketch, not to release.",
		where: ["udio"],
		aka: [
			"udio",
			"manual mode",
			"clip start",
			"extend"
		],
		related: ["pick-platform"],
		sources: ["udio-prompt", "udio-downloads"]
	},
	{
		id: "tag-sections",
		title: "[Verse] [Chorus] [Bridge]",
		kind: "tag",
		group: "structure",
		stage: "prompt",
		level: 1,
		reliability: "reliable",
		summary: "The core section tags, each on its own line in square brackets. Also [Intro], [Pre-Chorus], [Outro].",
		hear: "A song with a real shape: verses that set up, a chorus that returns, a bridge that changes.",
		example: {
			label: "Lyrics box",
			code: "[Verse 1]\nPorch light on at 2 a.m.\n...\n\n[Pre-Chorus]\n...\n\n[Chorus]\n...\n\n[Bridge]\n...\n\n[Outro]"
		},
		caution: "On v6 these also name the targets for plain-language edits (\"change the chorus\"), so spell them the same way every time.",
		where: [
			"suno",
			"udio",
			"lyria",
			"eleven"
		],
		aka: [
			"structure",
			"section tags",
			"verse",
			"chorus",
			"bridge",
			"pre-chorus",
			"intro",
			"outro"
		],
		related: ["tag-post-chorus", "tag-end"],
		sources: ["aimusicdaily-tags", "sunobuilder-v6"]
	},
	{
		id: "tag-post-chorus",
		title: "[Hook] [Post-Chorus] [Refrain]",
		kind: "tag",
		group: "structure",
		stage: "prompt",
		level: 2,
		reliability: "mixed",
		summary: "[Hook] asks for a shorter, sharper line; [Post-Chorus] a chant or chop after the chorus; [Refrain] a line repeated at the end of each verse.",
		hear: "A second hook after the chorus, the \"oh-oh\" or title chant that modern pop leans on.",
		example: {
			label: "Lyrics box",
			code: "[Chorus]\n...\n\n[Post-Chorus]\n(oh-oh) say it again\n(oh-oh) say it again"
		},
		where: ["suno", "any"],
		aka: [
			"hook",
			"post-chorus",
			"refrain",
			"chant",
			"tag line"
		],
		related: ["post-chorus-hook", "tag-sections"],
		sources: ["aimusicdaily-tags", "top40-postchorus"]
	},
	{
		id: "tag-instrumental",
		title: "[Instrumental] [Interlude] [Break]",
		kind: "tag",
		group: "structure",
		stage: "prompt",
		level: 2,
		reliability: "mixed",
		summary: "Sections with no singing. Descriptive forms work better than the bare tag.",
		hear: "A breather between vocal sections. [Melodic Interlude] and [Instrumental Bridge] land more often than [Instrumental] alone.",
		example: {
			label: "Lyrics box",
			code: "[Melodic Interlude]\n\n[Instrumental Bridge]"
		},
		where: ["suno", "udio"],
		aka: [
			"instrumental",
			"interlude",
			"break",
			"no vocals section",
			"breakdown"
		],
		related: ["tag-solos"],
		sources: ["field-guide"]
	},
	{
		id: "tag-drop",
		title: "[Build] [Drop]",
		kind: "tag",
		group: "structure",
		stage: "prompt",
		level: 2,
		reliability: "mixed",
		summary: "Electronic structure: a rise, then the peak. Strong in EDM and cinematic styles.",
		hear: "A riser and a release where you put them. In other genres it can confuse the model; use [Instrumental Break] there.",
		example: {
			label: "Lyrics box",
			code: "[Build]\nhold on, hold on\n\n[Drop]"
		},
		where: ["suno", "any"],
		aka: [
			"drop",
			"build",
			"edm",
			"riser",
			"buildup"
		],
		related: ["energy-curve"],
		sources: ["aimusicdaily-tags"]
	},
	{
		id: "tag-modifiers",
		title: "[Short Instrumental Intro] [Explosive Chorus]",
		kind: "tag",
		group: "structure",
		stage: "prompt",
		level: 2,
		reliability: "mixed",
		summary: "Adjectives inside the section tag: length, energy, density. Also [Stripped Back], [Long Mellow Intro].",
		hear: "Sometimes the change you asked for. Chorus modifiers are often overridden; what the lyrics say matters more.",
		where: ["suno"],
		aka: [
			"modifier",
			"short intro",
			"stripped back",
			"explosive"
		],
		related: ["tag-pipe", "fix-long-intro"],
		sources: ["field-guide"]
	},
	{
		id: "tag-pipe",
		title: "[Chorus | anthemic | stacked harmonies]",
		kind: "tag",
		group: "structure",
		stage: "prompt",
		level: 3,
		reliability: "mixed",
		summary: "Pipe-stacked directions for one section, overriding the global style for that part. A colon works the same way: [Chorus: anthemic, female vocal].",
		hear: "A section that changes character, such as a bigger final chorus or a whispered bridge. Tested on v3.5 to v5.5; still read on v6, but unmeasured.",
		example: {
			label: "Lyrics box",
			code: "[Final Chorus | anthemic | stacked harmonies | full drums]\n...\n\n[Bridge: whispered, piano only]\n..."
		},
		caution: "Seven elements at most, the most important first. Put directions inside brackets, never in parentheses, which get sung.",
		where: ["suno"],
		aka: [
			"pipe",
			"colon",
			"stacked tags",
			"section style",
			"combined tags"
		],
		related: ["tag-modifiers", "tag-parentheses"],
		sources: ["field-guide", "hookgenius-v6"]
	},
	{
		id: "tag-vocal-type",
		title: "[Male Vocal] [Female Vocal] [Duet]",
		kind: "tag",
		group: "vocals",
		stage: "prompt",
		level: 1,
		reliability: "mixed",
		summary: "Voice tags in the lyrics box. Less reliable than describing the voice in the style line and setting Vocal Gender.",
		hear: "The right voice more often when the tag agrees with the style line and the Vocal Gender control.",
		steps: [
			"Describe the voice in the style line: \"breathy female alto\".",
			"Set Vocal Gender in More Options.",
			"Use the tag per section only when the voice changes, as in a duet."
		],
		caution: "Duet roles are a recurring v6 miss. Write the duet lines on separate tagged sections, one voice per section.",
		where: ["suno", "any"],
		aka: [
			"male",
			"female",
			"duet",
			"voice",
			"gender",
			"singer"
		],
		related: ["tag-delivery", "fix-gender-flip"],
		sources: ["field-guide", "suno-gender"]
	},
	{
		id: "tag-delivery",
		title: "[Whisper] [Spoken Word] [Rap] [Falsetto] [Belting]",
		kind: "tag",
		group: "vocals",
		stage: "prompt",
		level: 2,
		reliability: "mixed",
		summary: "Performance cues per section. v6 reads section cues: one tester got chest-led verses and a whispered bridge only from the tags.",
		hear: "Contrast between sections: a hushed verse, a belted chorus, a spoken bridge.",
		example: {
			label: "Lyrics box",
			code: "[Verse 1: intimate, chest voice]\n...\n\n[Chorus: belting, full voice]\n...\n\n[Bridge: whispered]\n..."
		},
		where: ["suno", "any"],
		aka: [
			"whisper",
			"spoken word",
			"rap",
			"falsetto",
			"belting",
			"delivery",
			"performance"
		],
		related: ["tag-vocal-type", "tag-harmonies"],
		sources: ["hookgenius-v6", "jr-tags"]
	},
	{
		id: "tag-harmonies",
		title: "[Harmonies] [Choir] [Call and Response]",
		kind: "tag",
		group: "vocals",
		stage: "prompt",
		level: 2,
		reliability: "mixed",
		summary: "Ask for stacked voices or a group. Pair with \"stacked harmonies\" or \"gospel choir\" in the style line.",
		hear: "A wider, fuller chorus with backing voices under the lead.",
		where: ["suno", "any"],
		aka: [
			"harmony",
			"choir",
			"backing vocals",
			"stacks",
			"gang vocals",
			"call and response"
		],
		related: ["tag-parentheses", "doubles-harmonies"],
		sources: ["jr-tags", "field-guide"]
	},
	{
		id: "tag-parentheses",
		title: "(backing vocals in parentheses)",
		kind: "tag",
		group: "vocals",
		stage: "prompt",
		level: 1,
		reliability: "reliable",
		summary: "Text in parentheses is sung, usually as a backing vocal, echo or ad-lib. Square brackets are not sung.",
		hear: "Answering voices and ad-libs: \"I'm gone (so gone)\".",
		example: {
			label: "Lyrics box",
			code: "[Chorus]\nI'm already gone (so gone)\nLeft the light on (on and on)"
		},
		caution: "One or two per line at most; on fast or dense lines they collapse into the lead. Never put directions like (guitar solo) in parentheses; they get sung.",
		where: [
			"suno",
			"udio",
			"lyria"
		],
		aka: [
			"parentheses",
			"ad-libs",
			"adlibs",
			"echo",
			"backing",
			"brackets"
		],
		related: ["tag-harmonies", "fix-sung-tags"],
		sources: ["undetectr-lyrics", "field-guide"]
	},
	{
		id: "tag-solos",
		title: "[Guitar Solo] [Piano Solo] [Sax Solo]",
		kind: "tag",
		group: "instruments",
		stage: "prompt",
		level: 2,
		reliability: "mixed",
		summary: "Instrument features as their own sections. Also [Drum Solo], [Percussion Break], [Orchestral Break].",
		hear: "A solo where you tagged it, more often when the instrument is also named in the style line.",
		example: {
			label: "Lyrics box",
			code: "[Chorus]\n...\n\n[Guitar Solo]\n\n[Final Chorus]\n..."
		},
		caution: "Square brackets only. \"(Guitar Solo)\" in parentheses gets sung.",
		where: ["suno", "udio"],
		aka: [
			"solo",
			"guitar solo",
			"piano",
			"sax",
			"instrument break"
		],
		related: ["tag-instrumental", "tag-instrument-cue"],
		sources: ["jr-tags", "trustnode-v6"]
	},
	{
		id: "tag-instrument-cue",
		title: "[808 sub bass] [pedal steel guitar]",
		kind: "tag",
		group: "instruments",
		stage: "prompt",
		level: 3,
		reliability: "mixed",
		summary: "An instrument named in a tag at the start of a section to bring it in there.",
		hear: "A new colour entering for that section, when the model agrees.",
		where: ["suno"],
		aka: [
			"instrument tag",
			"808",
			"pedal steel",
			"cue"
		],
		related: ["style-prose"],
		sources: ["field-guide"]
	},
	{
		id: "tag-rhythm-dots",
		title: "Rhythm dots: \". . . ! . .\"",
		kind: "tag",
		group: "lore",
		stage: "prompt",
		level: 3,
		reliability: "myth",
		summary: "Community lore that dots and exclamation marks in instrumental sections shape the rhythm.",
		hear: "No reliable effect found. Describe the rhythm in words instead (\"half-time drums\", \"driving eighth-note bass\").",
		where: ["suno"],
		aka: [
			"dots",
			"rhythm notation",
			"lore"
		],
		sources: ["field-guide"]
	},
	{
		id: "tag-caps",
		title: "ALL CAPS for intensity",
		kind: "tag",
		group: "delivery",
		stage: "prompt",
		level: 2,
		reliability: "mixed",
		summary: "Capitals push a louder, harder delivery on that line.",
		hear: "A shouted or belted climax line. Use it once or twice; all-caps lyrics lose the effect.",
		example: {
			label: "Lyrics box",
			code: "[Final Chorus]\nI won't go back\nI WON'T GO BACK"
		},
		where: ["suno"],
		aka: [
			"caps",
			"capitals",
			"shout",
			"intensity",
			"loud"
		],
		related: ["tag-delivery"],
		sources: ["field-guide"]
	},
	{
		id: "tag-stretch",
		title: "Stretched vowels: lo-o-ove",
		kind: "tag",
		group: "delivery",
		stage: "prompt",
		level: 2,
		reliability: "reliable",
		summary: "Write the held vowel out with hyphens to get a long note.",
		hear: "A sustained note where the line needs one. A launch-week v6 tester found it the only change that produced a held note.",
		example: {
			label: "Lyrics box",
			code: "and I'm still waiting for you-u-u\nall night lo-o-ong"
		},
		where: ["suno", "udio"],
		aka: [
			"held note",
			"sustain",
			"long note",
			"melisma",
			"stretch"
		],
		related: ["sing-not-read"],
		sources: ["undetectr-v6"]
	},
	{
		id: "tag-punctuation",
		title: "Commas, ellipses, periods and stutters",
		kind: "tag",
		group: "delivery",
		stage: "prompt",
		level: 3,
		reliability: "mixed",
		summary: "Punctuation as phrasing. Commas give a breath, ellipses drag, a period resets, \"B-b-baby\" stutters.",
		hear: "Breaths in rap lines (a comma every 6 to 9 syllables helps), dragged phrases, a trap-style stutter.",
		caution: "Long hyphen runs smear words together.",
		where: ["suno"],
		aka: [
			"comma",
			"ellipsis",
			"period",
			"stutter",
			"breath",
			"phrasing"
		],
		related: ["sing-not-read"],
		sources: ["field-guide"]
	},
	{
		id: "tag-phonetic",
		title: "Respell words the way they sound",
		kind: "tag",
		group: "delivery",
		stage: "prompt",
		level: 1,
		reliability: "reliable",
		summary: "Fix a mispronounced word by spelling it phonetically (\"reed\" for read), or hyphenate the syllables (un-be-liev-a-ble).",
		hear: "The word sung right. Fix one word at a time and regenerate only that section if you can.",
		example: {
			label: "Lyrics box",
			code: "I reed your letter twice\nun-be-liev-a-ble"
		},
		where: [
			"suno",
			"udio",
			"any"
		],
		aka: [
			"pronunciation",
			"mispronounced",
			"phonetic",
			"spelling",
			"wrong word",
			"acronym"
		],
		related: ["fix-mispronounce", "replace-section"],
		sources: ["field-guide", "udio-prompt"]
	},
	{
		id: "tag-end",
		title: "[Outro] then [End]",
		kind: "tag",
		group: "endings",
		stage: "prompt",
		level: 1,
		reliability: "mixed",
		summary: "One [Outro], then [End] alone on the last line, to stop the song instead of letting it ramble or cut off.",
		hear: "A song that finishes. Community testing before v6 put it at 85 to 90 percent; on v6, set the Duration control as well.",
		example: {
			label: "Lyrics box",
			code: "[Outro]\nporch light, porch light\n\n[End]"
		},
		caution: "For a guaranteed ending, crop and fade in the editor, or extend from a chosen point to write a new ending.",
		where: ["suno"],
		aka: [
			"end",
			"ending",
			"outro",
			"stop",
			"finish",
			"cut off"
		],
		related: ["fix-no-ending", "tag-fade"],
		sources: ["field-guide", "suno-editor"]
	},
	{
		id: "tag-fade",
		title: "[Fade Out]",
		kind: "tag",
		group: "endings",
		stage: "prompt",
		level: 2,
		reliability: "mixed",
		summary: "Ask for a fade instead of a hard stop. Unverified on v6.",
		hear: "Sometimes a fade. The editor's Fade tool always works.",
		where: ["suno"],
		aka: [
			"fade",
			"fade out",
			"fade in"
		],
		related: ["tag-end"],
		sources: ["jr-tags", "suno-editor"]
	},
	{
		id: "tag-start-on",
		title: "[START_ON: TRUE] and other code-like tags",
		kind: "tag",
		group: "lore",
		stage: "prompt",
		level: 3,
		reliability: "myth",
		summary: "Tags written like settings ([START_ON: TRUE], [DUET_START_ON]) circulate in tip lists.",
		hear: "No documented effect, and they risk being sung. Use plain section tags and the Exclude field instead.",
		where: ["suno"],
		aka: [
			"start on",
			"duet start",
			"code tags",
			"lore"
		],
		related: ["fix-long-intro"],
		sources: ["field-guide"]
	},
	{
		id: "tag-percent",
		title: "\"weirdness 20%\" typed into the prompt",
		kind: "tag",
		group: "lore",
		stage: "prompt",
		level: 2,
		reliability: "myth",
		summary: "Writing slider values in the style box or lyrics.",
		hear: "Nothing. The sliders only work in the interface.",
		where: ["suno"],
		aka: [
			"slider in prompt",
			"percent",
			"settings in prompt"
		],
		related: ["sliders"],
		sources: ["undetectr-change"]
	},
	{
		id: "fix-sung-tags",
		title: "It sings the tags or the directions",
		kind: "fix",
		group: "prompt",
		stage: "prompt",
		level: 1,
		summary: "Words meant as instructions come out as lyrics.",
		hear: "Only your lyrics sung, with the directions followed instead.",
		steps: [
			"Keep tags short, alone on their line, in square brackets.",
			"Move voice and style descriptions to the style line.",
			"Never put directions in parentheses.",
			"Use Advanced mode; in Simple mode the description can leak into the lyrics."
		],
		where: ["suno", "any"],
		aka: [
			"stop singing the tags",
			"sings tags",
			"reads brackets",
			"lyric bleed",
			"instructions sung"
		],
		related: ["tag-parentheses", "custom-mode"],
		sources: ["jr-tags", "field-guide"]
	},
	{
		id: "fix-pop-drift",
		title: "Every genre drifts toward pop",
		kind: "fix",
		group: "prompt",
		stage: "prompt",
		level: 2,
		summary: "Strong tags (pop, rock, electronic) win over weak ones (grunge, math rock, swing), so niche styles slide into the mainstream.",
		hear: "The genre you asked for, all the way through.",
		steps: [
			"Add \"pop\" to Exclude.",
			"Repeat the weak genre with its defining instruments and era.",
			"Variety at 0, Style Influence up.",
			"Restate the genre on every extend."
		],
		where: ["suno"],
		aka: [
			"genre drift",
			"sounds generic",
			"pop",
			"wrong genre",
			"mainstream"
		],
		related: ["exclude-field", "variety-zero"],
		sources: ["field-guide", "hookgenius-v6"]
	},
	{
		id: "fix-mispronounce",
		title: "A word is mispronounced",
		kind: "fix",
		group: "prompt",
		stage: "prompt",
		level: 1,
		summary: "Names, slang, acronyms and words with two readings (\"read\", \"live\") often come out wrong.",
		hear: "The word as you say it.",
		steps: [
			"Respell it phonetically or hyphenate the syllables.",
			"On v6, change just that lyric with a plain-language edit.",
			"Remaster on Subtle can clarify words without changing the song."
		],
		where: ["suno", "any"],
		aka: [
			"pronunciation",
			"wrong word",
			"garbled",
			"mumbled"
		],
		related: ["tag-phonetic", "remaster-in-app"],
		sources: ["field-guide", "suno-remaster"]
	},
	{
		id: "fix-long-intro",
		title: "Long, wandering intro",
		kind: "fix",
		group: "prompt",
		stage: "prompt",
		level: 1,
		summary: "The song noodles for 20 or 30 seconds before anything happens. Streaming listeners skip.",
		hear: "A vocal inside the first 5 to 10 seconds.",
		steps: [
			"Use [Short Instrumental Intro], or start the lyrics straight at [Verse 1].",
			"Crop the intro afterwards in the editor.",
			"Or open on the chorus."
		],
		where: ["suno", "any"],
		aka: [
			"intro too long",
			"slow start",
			"skip",
			"long intro"
		],
		related: ["hook-early", "fix-intro-humming"],
		sources: ["field-guide", "osu-intros"]
	},
	{
		id: "fix-intro-humming",
		title: "Humming, \"ooh\" or spoken words before the song",
		kind: "fix",
		group: "prompt",
		stage: "prompt",
		level: 2,
		summary: "A known quirk: wordless vocals or a spoken intro you never wrote.",
		hear: "The song starting with the instruments or your first line.",
		steps: [
			"Exclude: humming, ooh, ahh, spoken intro.",
			"Tag [Short Instrumental Intro].",
			"Crop if it persists."
		],
		where: ["suno"],
		aka: [
			"humming",
			"ooh",
			"spoken intro",
			"weird intro vocals"
		],
		related: ["exclude-field", "fix-long-intro"],
		sources: ["field-guide"]
	},
	{
		id: "fix-no-ending",
		title: "The song ends too early, too late, or not at all",
		kind: "fix",
		group: "prompt",
		stage: "prompt",
		level: 1,
		summary: "Songs that cut off mid-line or keep going after the last chorus.",
		hear: "An ending at the length you planned.",
		steps: [
			"Set Duration in More Options (v6).",
			"Finish with one [Outro] and [End].",
			"Shorten the final section.",
			"Crop and fade, or extend from a chosen point for a new ending."
		],
		where: ["suno"],
		aka: [
			"force an ending",
			"stop",
			"ending",
			"cut off",
			"too long",
			"too short",
			"duration"
		],
		related: ["tag-end", "fix-tails"],
		sources: [
			"hookgenius-v6",
			"field-guide",
			"suno-editor"
		]
	},
	{
		id: "fix-gender-flip",
		title: "The voice changes gender mid-song",
		kind: "fix",
		group: "prompt",
		stage: "prompt",
		level: 2,
		summary: "Common on v6-wild and in extends.",
		hear: "One consistent singer.",
		steps: [
			"Set Vocal Gender.",
			"Exclude the other voice type.",
			"Use a Persona or Voice for a whole project."
		],
		where: ["suno"],
		aka: [
			"gender",
			"voice changes",
			"wrong singer",
			"inconsistent voice"
		],
		related: ["tag-vocal-type", "persona-lock"],
		sources: ["gearnews-v6"]
	},
	{
		id: "fix-muffled-v6",
		title: "Muffled mix with a buried vocal",
		kind: "fix",
		group: "top",
		stage: "mix",
		level: 2,
		summary: "The most repeated v6 complaint: no air on top, thick low mids, a vocal sitting behind the band.",
		hear: "An open top end and a vocal in front.",
		steps: [
			"Prompt the mix: \"vocal-forward, crisp mix, bright modern mix\".",
			"Try Remaster, or a Cover of the take.",
			"Afterwards: a 2 to 3 dB high shelf from about 8 kHz, cut 2 to 4 dB at 200 to 400 Hz, 1.5 to 3 dB of presence at 2 to 5 kHz."
		],
		caution: "Check the top end first. If the take is shimmery, boosting the highs makes the shimmer louder.",
		where: ["suno", "daw"],
		aka: [
			"muffled",
			"dull",
			"buried vocal",
			"dark mix",
			"no air",
			"v6"
		],
		related: ["vocal-front", "fix-shimmer"],
		sources: [
			"erasy-muffled",
			"jr-v6",
			"gearnews-v6"
		]
	},
	{
		id: "fix-loop-chorus",
		title: "The same chorus over and over, or a loop after a minute",
		kind: "fix",
		group: "structure",
		stage: "prompt",
		level: 2,
		summary: "The model repeats one section or chord loop until the song ends.",
		hear: "A song that develops, with a final chorus that lifts.",
		steps: [
			"Write the final chorus differently (a changed line, a [Final Chorus] tag with directions).",
			"Replace the looping section.",
			"Assemble from several takes."
		],
		where: ["suno"],
		aka: [
			"repetitive",
			"loop",
			"same chorus",
			"boring",
			"repeats"
		],
		related: ["replace-section", "assemble-takes"],
		sources: ["field-guide"]
	}
];
//#endregion
//#region junkyard/ai-music-guide/data/entries-song.ts
/**
* Writing, generating, editing and releasing. Techniques drawn from popular
* AI releases are described without naming the acts.
* Research: docs/kb/research/ai-music/technique.md and suno.md
*/
var SONG_ENTRIES = [
	{
		id: "reference-first",
		title: "Pick a reference track before the first prompt",
		kind: "technique",
		stage: "write",
		level: 1,
		summary: "Choose one or two released songs that sound like your target. Describe them in words for the prompt, and use them again when you master.",
		hear: "A clear target: you know when a take is close, instead of picking whatever sounds nice.",
		steps: [
			"Pick one or two songs in the genre you want.",
			"Write down their tempo, instruments, voice, production and mood.",
			"That list becomes your style line.",
			"Keep the songs for level-matched comparison at the master stage."
		],
		where: ["any"],
		aka: [
			"reference",
			"target",
			"inspiration",
			"sound like"
		],
		related: ["no-artist-names", "reference-match"],
		sources: ["roex-mix"]
	},
	{
		id: "write-own-lyrics",
		title: "Write the lyrics yourself",
		kind: "technique",
		stage: "write",
		level: 1,
		summary: "Every AI act that reached charts, radio or a label deal kept at least one human part, and lyrics were the most common one.",
		hear: "Words that sound like a person meant them, and a song you can protect: in the US, human-written lyrics can be copyrighted, prompts cannot.",
		steps: [
			"Draft the chorus first, with the title in it.",
			"Write the verses as specifics that lead to the chorus.",
			"Paste into the lyrics box with section tags."
		],
		caution: "AI lyric helpers lean on stock rhymes (fire and desire, heart and apart, soul and whole). If you use one, rewrite those lines.",
		where: ["any"],
		aka: [
			"lyrics",
			"songwriting",
			"human lyrics",
			"chatgpt lyrics",
			"words"
		],
		related: [
			"personal-material",
			"title-in-chorus",
			"protectable"
		],
		sources: ["copyright-office"]
	},
	{
		id: "personal-material",
		title: "Write from real, specific material",
		kind: "technique",
		stage: "write",
		level: 2,
		summary: "Charting AI acts drew on diaries, faith and loss. Concrete objects, places and times beat abstractions.",
		hear: "Lines that stick: \"the porch light at 2 a.m.\" rather than \"my heart is lost in the night\".",
		steps: [
			"Start from a real moment.",
			"Name objects, places and times.",
			"Write lines a person would say out loud; use \"you\" in the chorus."
		],
		where: ["any"],
		aka: [
			"imagery",
			"concrete",
			"diary",
			"specific",
			"personal",
			"storytelling"
		],
		related: ["write-own-lyrics"],
		sources: ["cbs-act"]
	},
	{
		id: "title-in-chorus",
		title: "Put the title in the chorus and repeat it",
		kind: "technique",
		stage: "write",
		level: 1,
		summary: "Put the title on the first or last line of the chorus, and sing the chorus at least three times. A study of about 2,400 songs found each extra chorus repeat raised the odds of a No. 1.",
		hear: "A song people can name after one listen and find again.",
		where: ["any"],
		aka: [
			"title",
			"repetition",
			"hook line",
			"memorable"
		],
		related: ["hook-early", "post-chorus-hook"],
		sources: ["npr-repetition", "osu-intros"]
	},
	{
		id: "prosody",
		title: "Match the stresses to the beat",
		kind: "technique",
		stage: "write",
		level: 2,
		summary: "Stressed syllables belong on strong beats and long notes. Keep matching lines of verse 1 and verse 2 to the same syllable count, give or take one.",
		hear: "Words that land on the beat, and fewer garbled or rushed phrases.",
		steps: [
			"Say each line out loud over a click and mark the stresses.",
			"Match syllable counts between verses so the melody repeats cleanly.",
			"Keep chorus lines short: about 5 to 9 syllables.",
			"Contrast line lengths between verse and chorus."
		],
		where: ["any"],
		aka: [
			"prosody",
			"syllables",
			"stress",
			"meter",
			"flow",
			"scansion"
		],
		related: ["sing-not-read"],
		sources: ["berklee-lyrics", "coursera-lyrics"]
	},
	{
		id: "section-lengths",
		title: "Keep sections short",
		kind: "technique",
		stage: "write",
		level: 1,
		summary: "Verse 4 to 8 lines, chorus 4 to 6, bridge 2 to 4. Longer sections get rushed or slurred.",
		hear: "Clean delivery, with room for the melody to breathe.",
		where: ["suno", "any"],
		aka: [
			"verse length",
			"how many lines",
			"section length",
			"too long"
		],
		related: ["sing-not-read"],
		sources: ["aimusicdaily-tags"]
	},
	{
		id: "protectable",
		title: "Keep a human part you can own",
		kind: "technique",
		stage: "write",
		level: 3,
		summary: "The US Copyright Office says prompts are not authorship. Human lyrics, melody, performance, and the selection and arrangement of AI output can be protected, with AI parts disclaimed.",
		hear: "Not a sound, but a song that is yours: one that others cannot copy freely, and that a sample user has to clear.",
		steps: [
			"Prompt only: nothing protectable.",
			"Your lyrics: the lyrics are protected.",
			"Plus your melody or demo uploaded as input: most of the composition.",
			"Plus your re-recorded vocal or instruments: those parts of the recording.",
			"Plus your arrangement and edit in a DAW: the selection and arrangement, with AI stems disclaimed."
		],
		caution: "Commercial rights from a paid plan are not the same as copyright. The Supreme Court declined to review the human-authorship rule in March 2026; how much human input is enough is still decided case by case.",
		where: ["any"],
		aka: [
			"copyright",
			"ownership",
			"human authorship",
			"register",
			"legal",
			"protect"
		],
		related: [
			"write-own-lyrics",
			"hum-the-melody",
			"own-voice"
		],
		sources: [
			"copyright-office",
			"hk-scotus",
			"suno-rights"
		]
	},
	{
		id: "tries-budget",
		title: "Budget 5 to 50 generations per finished song",
		kind: "technique",
		stage: "generate",
		level: 1,
		summary: "Nobody publishes keeper rates. Community guides report 5 to 15 tries to find a strong seed, then 3 to 5 extends, and 30 to 50 generations for a finished track including tests.",
		hear: "Better songs, because you stop settling for the first decent take.",
		steps: [
			"One Suno generation is 10 credits for two songs.",
			"Forty generations is 400 credits: about six finished songs a month on Pro (2,500 credits), about 25 on Premier (10,000).",
			"Since September 2026 downloads are capped too: 20 a month on Pro, 60 on Premier, unlimited from inside Studio."
		],
		caution: "One charting act reported 500 or more songs per album cycle. Heavy over-generation and strict curation is the norm, not a sign you are doing it wrong.",
		where: ["suno", "any"],
		aka: [
			"how many tries",
			"generations",
			"credits",
			"cost",
			"keeper",
			"iterations",
			"rolls"
		],
		related: ["score-takes", "one-variable"],
		sources: [
			"jr-finish",
			"frankx-workflow",
			"suno-pricing",
			"suno-tos"
		]
	},
	{
		id: "score-takes",
		title: "Pick takes by the hook, not the first impression",
		kind: "technique",
		stage: "generate",
		level: 1,
		summary: "Compare two to four candidates at a time. Listen to each three times and score hook, clarity, structure, emotion, replay and how fixable it is.",
		hear: "A keeper with a strong hook and fixable flaws, rather than the one with the flashiest intro.",
		steps: [
			"Generate a batch.",
			"Narrow to two to four.",
			"Listen three times each; score the six points from 1 to 5.",
			"Always compare a new take with your current keeper, not only with the other new takes."
		],
		caution: "Ten candidates at once causes decision fatigue. Hook strength varies most between generations, so rank it first.",
		where: ["any"],
		aka: [
			"choose",
			"pick",
			"curation",
			"compare takes",
			"scoring",
			"which take"
		],
		related: ["tries-budget"],
		sources: ["jr-finish"]
	},
	{
		id: "wild-then-v6",
		title: "Explore on v6-wild, finish on v6",
		kind: "technique",
		stage: "generate",
		level: 2,
		summary: "v6-wild is less predictable and more varied, for finding ideas. v6 is the precise one. v6-mini is free and fast for drafts.",
		hear: "Fresher ideas than the samey takes v6 can fall into, with a polished final version.",
		steps: [
			"Draft and test lyrics on v6-mini or v6-wild.",
			"When a direction works, regenerate or Cover it on v6.",
			"Raise Variety while exploring, set it to 0 when refining."
		],
		where: ["suno"],
		aka: [
			"v6",
			"v6-wild",
			"v6-mini",
			"model choice",
			"which model"
		],
		related: ["variety-zero", "max-mode"],
		sources: ["suno-v6-faq"]
	},
	{
		id: "max-mode",
		title: "Max Mode for long songs and close covers",
		kind: "technique",
		stage: "generate",
		level: 2,
		summary: "Costs more credits (the amount is not published). Suno recommends it for songs over two minutes, covers that should stay close, and keeping one voice and style through a track.",
		hear: "A back half as clean and consistent as the first minute.",
		where: ["suno"],
		aka: [
			"max mode",
			"quality",
			"long song",
			"consistency"
		],
		related: ["fix-decay"],
		sources: ["suno-v6-faq"]
	},
	{
		id: "intro-first",
		title: "Generate the intro four times, then build from the best",
		kind: "technique",
		stage: "generate",
		level: 2,
		summary: "Find the sound in a 15 to 20 second opening, then extend section by section with explicit directions.",
		hear: "A consistent sound from bar one, and cheaper tests than whole songs.",
		steps: [
			"Lyrics box: only the intro and first verse.",
			"Generate several, keep the best.",
			"Extend one section at a time, restating the genre and tempo each time."
		],
		where: ["suno", "udio"],
		aka: [
			"extend method",
			"build up",
			"section by section"
		],
		related: ["extend-from-best", "udio-clips"],
		sources: ["field-guide", "frankx-workflow"]
	},
	{
		id: "persona-lock",
		title: "Lock one voice with a Persona or Voice",
		kind: "technique",
		stage: "generate",
		level: 2,
		summary: "Save a take's vocal and style as a Persona (Style Persona) and use it for every song in a project.",
		hear: "The same singer across an EP: the artist identity that brand-building needs.",
		steps: [
			"On a take you love, create a Persona from it.",
			"Set it private if you do not want others using it.",
			"Use it for every song in the project."
		],
		caution: "Voices made on v5.5 can sound different on v6. One review found Persona results can \"take the edge off\" a performance.",
		where: ["suno"],
		aka: [
			"persona",
			"personas",
			"voices",
			"consistent voice",
			"same singer",
			"artist identity"
		],
		related: ["own-voice", "fix-gender-flip"],
		sources: ["suno-personas", "musictech-studio"]
	},
	{
		id: "own-voice",
		title: "Sing it yourself, then convert or keep your voice",
		kind: "technique",
		stage: "generate",
		level: 4,
		summary: "Several viral acts sang the song themselves and ran the voice through Suno, keeping human phrasing and timing. Suno Voices builds a profile from 15 seconds to 4 minutes of your singing.",
		hear: "The most \"real\" vocal there is: human breath, phrasing and emotion, in a produced voice.",
		steps: [
			"Record an a cappella in a quiet room, at least a minute.",
			"Create a Voice (you read a phrase aloud to verify it is you).",
			"Keep Audio Influence high.",
			"Or sing the guide and use it as the upload for Cover."
		],
		caution: "Never convert to sound like a real artist. A dance track whose vocal resembled a star was pulled for impersonation; a re-recording with a human singer later charted higher.",
		where: ["suno"],
		aka: [
			"my voice",
			"own voice",
			"voice model",
			"sing",
			"voices",
			"clone"
		],
		related: [
			"persona-lock",
			"human-vocal",
			"impersonation"
		],
		sources: ["suno-voices", "dazed-suno"]
	},
	{
		id: "pick-platform",
		title: "Choose the generator by what you need to keep",
		kind: "technique",
		stage: "generate",
		level: 1,
		summary: "Suno for full vocal songs and stems; ElevenLabs for section control and licensed commercial use; Lyria for cheap API songs; Stable Audio for instrumentals; Udio only to sketch.",
		hear: "Fewer dead ends: a song you can actually download, edit and release.",
		where: ["any"],
		aka: [
			"which app",
			"best ai music generator",
			"compare",
			"suno vs udio",
			"alternatives"
		],
		related: [
			"udio-clips",
			"eleven-plan",
			"lyria-timestamps"
		],
		sources: ["aa-arena", "udio-downloads"]
	},
	{
		id: "replace-section",
		title: "Replace the weak section, keep the rest",
		kind: "technique",
		stage: "edit",
		level: 2,
		summary: "Highlight a region, change its lyrics or prompt, and get two new versions of just that part. On v6 you can also ask in plain language.",
		hear: "The great chorus survives while the bad verse, wrong word or broken ending gets fixed.",
		steps: [
			"Open the song, select the region, Replace Section.",
			"Edit the lyrics or prompt for that part only.",
			"On v6: \"Change the chorus so it's sung by a gospel choir\", or change a single lyric.",
			"Keep Audio Influence around 70 to 80 percent when fixing a lyric."
		],
		where: [
			"suno",
			"eleven",
			"udio"
		],
		aka: [
			"replace",
			"inpaint",
			"fix section",
			"edit lyrics",
			"regenerate part",
			"song editor"
		],
		related: ["extend-from-best", "fix-decay"],
		sources: [
			"suno-replace",
			"suno-v6-faq",
			"eleven-edit"
		]
	},
	{
		id: "extend-from-best",
		title: "Extend from a point of momentum",
		kind: "technique",
		stage: "edit",
		level: 2,
		summary: "Extend from mid-verse or mid-chorus, not after a natural ending, and from the cleanest point rather than the very end.",
		hear: "Extensions that flow on instead of restarting, and no buildup of artifacts.",
		steps: [
			"Pick the extend point inside a section.",
			"Give the next lyrics and restate the style.",
			"Use Get Whole Song to stitch it."
		],
		where: ["suno", "udio"],
		aka: [
			"extend",
			"continue",
			"longer",
			"get whole song"
		],
		related: ["intro-first", "fix-decay"],
		sources: ["suno-extend", "field-guide"]
	},
	{
		id: "assemble-takes",
		title: "Assemble one song from several takes",
		kind: "technique",
		stage: "edit",
		level: 3,
		summary: "Lock BPM and key in the style line, generate four to six takes, and treat each as a source of sections. Cut on downbeats.",
		hear: "The best verse, the best chorus and the best ending in one song.",
		steps: [
			"Same BPM and key in every generation.",
			"Mark the best section of each take.",
			"Cut on downbeats in Suno Studio or a DAW, with short crossfades."
		],
		where: ["suno", "daw"],
		aka: [
			"comp",
			"splice",
			"edit together",
			"combine takes",
			"frankenstein"
		],
		related: ["replace-section"],
		sources: ["field-guide"]
	},
	{
		id: "hook-early",
		title: "Get to the hook fast",
		kind: "technique",
		stage: "edit",
		level: 2,
		summary: "Top-10 intros shrank from about 20 seconds in the mid-1980s to about 5 seconds by 2015. Aim for a vocal by 0:05 to 0:10 and a chorus by 0:30 to 0:45, or open on the chorus.",
		hear: "A song that starts immediately, with less risk of a skip.",
		steps: [
			"Crop the intro to 8 seconds or less.",
			"Cut or shorten verse 2 (a common modern edit).",
			"Or move a chorus to the top."
		],
		caution: "The same study found no stream advantage for front-loaded songs within an artist's own catalogue. It is the norm, not a guarantee.",
		where: ["any"],
		aka: [
			"intro",
			"skip",
			"first chorus",
			"front load",
			"attention",
			"tiktok"
		],
		related: ["fix-long-intro", "song-length"],
		sources: ["osu-intros", "hsd-chorus"]
	},
	{
		id: "song-length",
		title: "Aim for about 2:30 to 3:30",
		kind: "technique",
		stage: "edit",
		level: 1,
		summary: "Year-end Hot 100 songs averaged about 3:16 in 2020 and 3:24 in 2025; Spotify charting songs averaged about 3:00 in 2024.",
		hear: "A song that ends while people still want more.",
		where: ["any"],
		aka: [
			"length",
			"duration",
			"how long",
			"runtime"
		],
		related: ["hook-early", "fix-no-ending"],
		sources: ["devto-length", "hypebot-length"]
	},
	{
		id: "energy-curve",
		title: "Shape the energy: something changes every 8 to 16 bars",
		kind: "technique",
		stage: "edit",
		level: 3,
		summary: "Sparse verses, full choruses, a stripped bridge, a biggest final chorus. AI tends to flatten this; fix it with section tags, Replace Section or the editor.",
		hear: "A song that builds and pays off, where the loudest moment is earned by the quiet one before it.",
		steps: [
			"Verse 1: thinner drums, simple bass, close dry vocal.",
			"Pre-chorus: a riser or snare build; drop the kick for the last bar.",
			"Chorus: full drums, wider parts, doubles and harmonies.",
			"Verse 2: keep one element from the chorus so energy does not fall to zero.",
			"Bridge: strip back, or change chords.",
			"Final chorus: extra harmonies and ad-libs, maybe a key change."
		],
		where: ["any", "daw"],
		aka: [
			"dynamics",
			"arrangement",
			"build",
			"energy",
			"flat",
			"boring"
		],
		related: ["tag-drop", "post-chorus-hook"],
		sources: ["jr-finish"]
	},
	{
		id: "post-chorus-hook",
		title: "Add a post-chorus hook",
		kind: "technique",
		stage: "edit",
		level: 2,
		summary: "A short chant, vocal chop or title repeat right after the chorus: a second hook. Usually 8 bars, sometimes 4.",
		hear: "The part people hum, and a natural 15 to 30 second clip for short video.",
		where: ["any"],
		aka: [
			"post-chorus",
			"vocal chop",
			"chant",
			"second hook"
		],
		related: ["tag-post-chorus", "title-in-chorus"],
		sources: ["top40-postchorus", "bmi-postchorus"]
	},
	{
		id: "studio-chat",
		title: "Suno Studio: edit by asking",
		kind: "tool",
		stage: "edit",
		level: 3,
		summary: "Premier's browser editor has a chat bar (\"make the drums punchier\", \"give me three alternate takes\"), take lanes, MIDI tracks, effects, Remove FX and multitrack WAV export.",
		hear: "Section and part edits without leaving Suno, with every take kept in a lane to compare.",
		steps: [
			"Open the song in Studio (Chrome works best).",
			"Use take lanes: audition, rate and commit.",
			"Down-vote with a reason (\"Multiple stems\") to steer the next take.",
			"Export Multitrack for a DAW, or Full Song."
		],
		caution: "No VST or AU plugins. For serious mixing, export the tracks.",
		where: ["suno"],
		aka: [
			"suno studio",
			"daw",
			"chat bar",
			"take lanes",
			"premier"
		],
		related: ["suno-stems", "stem-to-midi"],
		sources: ["suno-studio", "suno-studio-chat"]
	},
	{
		id: "replace-one-part",
		title: "Replace one or two parts with real playing",
		kind: "technique",
		stage: "mix",
		level: 4,
		summary: "Re-record the bass, a guitar, live drums, or a chorus double over the AI stems.",
		hear: "Groove and human timing that AI parts lack. Under the July 2026 industry labels, keeping the main performances human moves a track from \"AI-Generated\" toward \"AI-Assisted\".",
		where: ["daw"],
		aka: [
			"re-record",
			"live instruments",
			"real musicians",
			"overdub",
			"human"
		],
		related: [
			"stem-to-midi",
			"human-vocal",
			"ai-labels"
		],
		sources: ["jr-enhance", "fimi-labels"]
	},
	{
		id: "doubles-harmonies",
		title: "Rebuild the chorus vocal stack",
		kind: "technique",
		stage: "mix",
		level: 4,
		summary: "Mute the AI backing vocals and add your own doubles and harmonies, sung or generated and converted.",
		hear: "A wide, heavy chorus with the lead still clear in the middle.",
		steps: [
			"Double the lead in the chorus, panned slightly or centred under it.",
			"Add harmonies wide left and right.",
			"Keep the lead louder and drier than the stack."
		],
		where: ["daw"],
		aka: [
			"doubles",
			"harmonies",
			"stack",
			"backing vocals",
			"width"
		],
		related: ["tag-harmonies", "vocal-front"],
		sources: ["sweetwater-doubles"]
	},
	{
		id: "human-vocal",
		title: "Re-record the lead vocal with a human singer",
		kind: "technique",
		stage: "mix",
		level: 4,
		summary: "Use the AI vocal as a guide and have a singer (or you) record the real lead.",
		hear: "The single biggest jump in realism: real breath, phrasing and emotion. A viral dance track's human re-record charted higher in the UK than its AI original.",
		where: ["daw"],
		aka: [
			"singer",
			"re-sing",
			"human vocal",
			"session singer",
			"topline"
		],
		related: ["own-voice", "replace-one-part"],
		sources: ["dazed-suno"]
	},
	{
		id: "blueprint",
		title: "Treat the AI song as a demo and re-produce it",
		kind: "technique",
		stage: "mix",
		level: 4,
		summary: "Rebuild the arrangement in a DAW with your own sounds and players; keep AI stems only as texture.",
		hear: "A record that is indistinguishable from a conventional production, with the strongest claim to authorship.",
		where: ["daw"],
		aka: [
			"demo",
			"blueprint",
			"re-produce",
			"remake",
			"production"
		],
		related: ["stem-to-midi", "protectable"],
		sources: ["dubspot-rebuild"]
	},
	{
		id: "ai-labels",
		title: "Know which label your song will carry",
		kind: "technique",
		stage: "release",
		level: 3,
		summary: "The July 2026 industry standard (IFPI, RIAA, the Recording Academy and others) splits \"AI-Generated\" (AI made the primary elements) from \"AI-Assisted\" (substantially human, main performances human).",
		hear: "Decides more than the sound: chart eligibility, recommendations and how listeners read the song.",
		steps: [
			"Decide which human parts you will keep: lyrics, melody, vocal, arrangement.",
			"Australia's ARIA charts exclude wholly AI recordings from 31 August 2026 and require a declaration.",
			"The Grammys accept AI-assisted work only with meaningful human authorship."
		],
		where: ["any"],
		aka: [
			"ai generated",
			"ai assisted",
			"label",
			"charts",
			"eligibility",
			"aria",
			"grammys"
		],
		related: ["disclose", "protectable"],
		sources: ["fimi-labels", "aria-rules"]
	},
	{
		id: "disclose",
		title: "Disclose AI use through your distributor",
		kind: "technique",
		stage: "release",
		level: 2,
		summary: "Spotify's AI Credits (April 2026) and Apple Music's Transparency Tags arrive through the distributor's upload form. DistroKid has an AI disclosure step.",
		hear: "No takedowns and a transparent credit. Acts with open \"AI-assisted\" bios charted without trouble; acts that hid AI use each hit a takedown, a credit change or a rule change.",
		steps: [
			"Tick the AI disclosure at upload: vocals, instrumentation, composition, lyrics.",
			"State the human parts in your bio.",
			"Keep the record: song link, plan at creation, date, model, downloaded file."
		],
		caution: "Spotify's \"AI Persona\" badge (from mid-September 2026) keeps fully AI artist profiles out of algorithmic recommendations by default.",
		where: ["any"],
		aka: [
			"disclosure",
			"distrokid",
			"spotify",
			"apple music",
			"ai credits",
			"transparency",
			"label"
		],
		related: [
			"ai-labels",
			"impersonation",
			"distributor-rules"
		],
		sources: [
			"interspace-credits",
			"musictech-persona",
			"distrokid-ai"
		]
	},
	{
		id: "distributor-rules",
		title: "Check each distributor and store before you upload",
		kind: "technique",
		stage: "release",
		level: 2,
		summary: "DistroKid accepts AI-assisted music with disclosure. CD Baby has been the most restrictive. Bandcamp bans music made wholly or largely by AI. Deezer tags fully AI tracks and keeps them out of recommendations.",
		hear: "A release that stays up.",
		where: ["any"],
		aka: [
			"distrokid",
			"tunecore",
			"cd baby",
			"bandcamp",
			"deezer",
			"tidal",
			"upload rules"
		],
		related: ["disclose", "suno-download-rights"],
		sources: [
			"hypebot-distributors",
			"bandcamp-ban",
			"deezer-ai"
		]
	},
	{
		id: "suno-download-rights",
		title: "Suno: you need a paid download to release",
		kind: "technique",
		stage: "release",
		level: 1,
		summary: "Songs made on Pro or Premier carry commercial rights once a download is spent on them. Free-plan songs belong to Suno and are personal use only.",
		hear: "Not a sound: the difference between a song you can release and one you cannot.",
		steps: [
			"Pro: 20 downloads a month. Premier: 60, plus unlimited from inside Studio.",
			"One song counts once, whatever the formats or stems.",
			"Since October 2026, songs made while unsubscribed can qualify by spending a paid download on them.",
			"Remixes and covers of other people's songs are never monetisable."
		],
		caution: "Recording or ripping the stream breaks the terms, and so do tools that strip Suno's watermark or metadata.",
		where: ["suno"],
		aka: [
			"rights",
			"commercial use",
			"downloads",
			"free plan",
			"pro",
			"premier",
			"ownership",
			"monetize"
		],
		related: ["protectable", "disclose"],
		sources: [
			"suno-tos",
			"suno-rights",
			"suno-retro"
		]
	},
	{
		id: "impersonation",
		title: "Never imitate a real artist's voice or name",
		kind: "technique",
		stage: "release",
		level: 1,
		summary: "Spotify removes vocal clones without the artist's authorisation. Suno's guidelines ban using a voice or likeness without permission.",
		hear: "A song that stays up. Tracks promoted with a star's name, or sung in a sound-alike voice, were pulled.",
		steps: [
			"No artist names in prompts, tags, titles or hashtags.",
			"Describe traits, not people.",
			"If a take sounds uncannily like someone, regenerate it."
		],
		where: ["any"],
		aka: [
			"impersonation",
			"sound alike",
			"voice clone",
			"deepfake",
			"takedown"
		],
		related: ["no-artist-names", "own-voice"],
		sources: ["mbw-spotify-policy", "suno-responsibly"]
	},
	{
		id: "test-hook",
		title: "Test the hook on short video before finishing",
		kind: "technique",
		stage: "release",
		level: 3,
		summary: "Several charting AI songs started as a 15 to 30 second chorus posted to short-video apps and were finished only after people asked for more.",
		hear: "Evidence of demand before you spend days on the mix.",
		where: ["any"],
		aka: [
			"tiktok",
			"reels",
			"shorts",
			"promotion",
			"marketing",
			"viral"
		],
		related: ["post-chorus-hook", "cadence"],
		sources: ["techloy-acts"]
	},
	{
		id: "cadence",
		title: "Release singles steadily, not album dumps",
		kind: "technique",
		stage: "release",
		level: 4,
		summary: "One AI band released two albums 15 days apart, got a short algorithmic lift, then stalled under scrutiny. Spam filters target mass uploads and duplicates.",
		hear: "A catalogue that grows an audience rather than tripping filters.",
		where: ["any"],
		aka: [
			"release schedule",
			"cadence",
			"spam",
			"how often",
			"album"
		],
		related: ["test-hook", "disclose"],
		sources: ["dmn-band", "mbw-spotify-policy"]
	},
	{
		id: "content-id",
		title: "Be careful with Content ID",
		kind: "technique",
		stage: "release",
		level: 3,
		summary: "Content ID matches fingerprints, not authorship. AI tracks can be claimed by others with similar output, or claim others by mistake.",
		hear: "Fewer surprise claims on your own videos.",
		steps: ["Keep creation evidence: prompts, dates, stems, project files.", "Expect some distributors to decline Content ID for AI tracks."],
		where: ["any"],
		aka: [
			"content id",
			"youtube",
			"claims",
			"monetization"
		],
		related: ["disclose"],
		sources: ["jr-contentid"]
	}
];
//#endregion
//#region junkyard/ai-music-guide/data/platforms.ts
/** Checked 2026-10-31. Research: docs/kb/research/ai-music/platforms.md and suno.md */
var PLATFORMS = [
	{
		id: "suno",
		name: "Suno",
		maker: "Suno",
		best: "Full songs with vocals in any genre; tops the blind music arena",
		model: "v6, v6-wild (paid), v6-mini (free). Older models retired 9 Sep 2026",
		price: "Free 50 credits a day; Pro $10 (2,500 credits); Premier $30 (10,000)",
		length: "Up to 8 min",
		exports: "MP3; WAV on paid plans; up to 12 stems; MIDI in Studio (Premier)",
		rights: "Paid plans: commercial use once a download is spent. Free: Suno owns the song",
		use: "You want the most capable vocal songs plus stems and an editor",
		url: "https://suno.com"
	},
	{
		id: "eleven",
		name: "ElevenLabs Music",
		maker: "ElevenLabs",
		best: "Section-by-section control; licensed for most commercial uses",
		model: "Music v2.5 (Sep 2026)",
		price: "ElevenMusic Free; Pro $9.99 (1,000 generations); API on paid plans",
		length: "3 s to 10 min",
		exports: "MP3, WAV/PCM; 2, 4 or 6 stems; no MIDI found",
		rights: "\"Cleared for nearly all commercial uses\"; check your tier",
		use: "Ads, video and games where structure and clean licensing matter",
		url: "https://elevenlabs.io/music"
	},
	{
		id: "lyria",
		name: "Google Lyria 3.5 and Flow Music",
		maker: "Google",
		best: "Quick full songs from text or images; Flow Music adds covers, section edits and stems",
		model: "Lyria 3.5, Lyria 3 Pro",
		price: "Limited free use in Gemini; API $0.08 a song; Flow Music from $6",
		length: "About 3 min",
		exports: "MP3; WAV on the API; stems in Flow Music",
		rights: "Paid Flow plans reportedly commercial; the Gemini app is unclear",
		use: "A cheap API song, or a Google studio with an agent",
		url: "https://deepmind.google/models/lyria/"
	},
	{
		id: "mureka",
		name: "Mureka",
		maker: "Kunlun Tech",
		best: "Lyrics-first vocal songs; third in the blind vocal arena",
		model: "V9.5 (Aug 2026)",
		price: "From about $8 a month (yearly)",
		length: "Typically 2.5 to 4 min",
		exports: "WAV, 12 stems, MIDI, DAW session on the top tier",
		rights: "Full commercial rights on paid plans",
		use: "Near-Suno vocals with MIDI and stems at a low price",
		url: "https://www.mureka.ai"
	},
	{
		id: "stable",
		name: "Stable Audio 3.0",
		maker: "Stability AI",
		best: "Instrumentals, loops, sound design and scoring; licensed training data",
		model: "SA3 Small, Medium, Large (May 2026); some open weights",
		price: "Free 50 credits; Solo $12",
		length: "Up to 6:20",
		exports: "WAV; multi-track in the app",
		rights: "Commercial on all plans; enterprise licence above $1M revenue",
		use: "You need instrumentals with clean provenance, or to run it locally",
		url: "https://stableaudio.com"
	},
	{
		id: "minimax",
		name: "MiniMax Music 3.0",
		maker: "MiniMax",
		best: "Long, coherent vocal songs; open weights",
		model: "Music 3.0 (Aug 2026)",
		price: "API about $0.15 a song; open weights free",
		length: "Up to 5 min",
		exports: "WAV, MP3, PCM",
		rights: "Community licence; a deal needed above $20M revenue",
		use: "An open vocal model you can host, or a cheap API",
		url: "https://www.minimax.io"
	},
	{
		id: "acestep",
		name: "ACE-Step 1.5",
		maker: "Open source",
		best: "Free, fast local songs on a consumer GPU; LoRA training",
		model: "1.5 and 1.5 XL (2026)",
		price: "Free (MIT licence)",
		length: "Up to 10 min",
		exports: "Local WAV",
		rights: "MIT code; training data undisclosed",
		use: "Free local generation and experiments",
		url: "https://github.com/ace-step/ACE-Step-1.5"
	},
	{
		id: "udio",
		name: "Udio",
		maker: "Udio",
		best: "Natural vocals, built clip by clip",
		model: "v1.5, v1.5 Allegro",
		price: "Standard $10; Pro more",
		length: "32 s or 130 s clips, extended",
		exports: "None. Downloads off since 29 Oct 2025",
		rights: "No export; the terms forbid copying output",
		use: "Sketching and listening inside Udio only",
		url: "https://www.udio.com"
	},
	{
		id: "aiva",
		name: "AIVA",
		maker: "AIVA",
		best: "Orchestral and cinematic scores with editable MIDI",
		model: "Not published",
		price: "Standard about €11 (yearly)",
		length: "Up to 5:30 (Pro)",
		exports: "MIDI on all tiers; WAV on Pro",
		rights: "You own copyright only on Pro",
		use: "You need a score you can edit note by note",
		url: "https://www.aiva.ai"
	},
	{
		id: "soundraw",
		name: "Soundraw",
		maker: "Soundraw",
		best: "Royalty-free instrumentals you rearrange block by block",
		model: "v2",
		price: "Creator about $11 (yearly)",
		length: "Adjustable",
		exports: "MP3, WAV; stems on Artist Pro",
		rights: "Commercial use; streaming release allowed",
		use: "Background music and beats without vocals",
		url: "https://soundraw.io"
	}
];
var TOOLS = [
	{
		id: "mvsep",
		name: "MVSep",
		kind: "separation",
		runs: "Browser",
		price: "Free tier, paid premium",
		best: "The top leaderboard models: BS-Roformer 124-band (12.39 dB vocal SDR), drum and bass ensembles, karaoke, de-reverb",
		note: "Pick by the published score for the stem you need",
		url: "https://mvsep.com"
	},
	{
		id: "uvr",
		name: "Ultimate Vocal Remover 5.6",
		kind: "separation",
		runs: "Windows, macOS",
		price: "Free, open source",
		best: "Running Roformer and MDX models locally",
		note: "Download a current Roformer model; the old defaults are well behind",
		url: "https://github.com/Anjok07/ultimatevocalremovergui"
	},
	{
		id: "suno-split",
		name: "Suno Get Stems",
		kind: "separation",
		runs: "Suno",
		price: "50 credits (12 stems), 10 per stem otherwise",
		best: "Quick stems from your own Suno songs",
		note: "Regenerated, not cut out: may not sum back to the mix exactly",
		url: "https://help.suno.com/en/articles/12702337"
	},
	{
		id: "logic",
		name: "Logic Pro Stem Splitter",
		kind: "separation",
		runs: "Mac (Apple silicon)",
		price: "$199.99 one-time",
		best: "Vocals, piano and guitar; ranked first of 11 tools in a 2026 test",
		note: "Six stems since Logic 11.2",
		url: "https://support.apple.com/guide/logicpro/lgcp61bae908/mac"
	},
	{
		id: "spectralayers",
		name: "SpectraLayers Pro 12",
		kind: "separation",
		runs: "Windows, macOS",
		price: "$349.99",
		best: "Bass and synth extraction, plus manual spectral repair",
		note: "Ranked second in the same test",
		url: "https://www.steinberg.net/spectralayers/"
	},
	{
		id: "lalal",
		name: "LALAL.AI",
		kind: "separation",
		runs: "Browser, VST on Pro",
		price: "From $7.50 a month (yearly)",
		best: "Guitar and piano; echo and reverb remover; lead and backing split",
		note: "Billed in minutes × stem types, so costs add up",
		url: "https://www.lalal.ai"
	},
	{
		id: "demucs",
		name: "Demucs",
		kind: "separation",
		runs: "Command line",
		price: "Free",
		best: "Drums and bass when nothing else runs",
		note: "No longer developed; far behind Roformer models for vocals",
		url: "https://github.com/adefossez/demucs"
	},
	{
		id: "ableton",
		name: "Ableton Live 12.3",
		kind: "separation",
		runs: "Windows, macOS",
		price: "Suite",
		best: "Built-in four-stem split, high-quality mode",
		note: "Low-bitrate MP3 input gives worse stems",
		url: "https://www.ableton.com/en/live-manual/12/stem-separation"
	},
	{
		id: "rx",
		name: "iZotope RX 11",
		kind: "cleanup",
		runs: "Windows, macOS",
		price: "Standard about £312",
		best: "Spectral de-noise, spectral repair, de-ess, de-reverb, de-click, Music Rebalance",
		note: "The standard repair toolkit; light settings first",
		url: "https://www.izotope.com/en/products/rx.html"
	},
	{
		id: "suno-dry",
		name: "Suno Studio Remove FX",
		kind: "cleanup",
		runs: "Suno Studio (Premier)",
		price: "Premier plan",
		best: "Stripping baked-in reverb and delay from a track",
		note: "Try it before any external de-reverb",
		url: "https://help.suno.com/en/articles/13671105"
	},
	{
		id: "roex",
		name: "RoEx Automix",
		kind: "cleanup",
		runs: "Browser",
		price: "Free preview, about $6.49 a download",
		best: "An automatic first mix from Suno stems",
		note: "A starting point, then fix by hand",
		url: "https://www.roexaudio.com"
	},
	{
		id: "basic-pitch",
		name: "Spotify Basic Pitch",
		kind: "midi",
		runs: "Browser, Python",
		price: "Free, open source",
		best: "Any instrument to MIDI",
		note: "Lower the thresholds for dense parts",
		url: "https://basicpitch.spotify.com"
	},
	{
		id: "suno-midi",
		name: "Suno Studio Get MIDI",
		kind: "midi",
		runs: "Suno Studio (Premier)",
		price: "10 credits a stem",
		best: "MIDI from Suno stems without leaving Suno",
		note: "A sketch: expect to fix chords by hand",
		url: "https://help.suno.com/en/articles/13925249"
	},
	{
		id: "melodyne",
		name: "Melodyne 5",
		kind: "midi",
		runs: "Windows, macOS",
		price: "Essential about $99, Editor $399",
		best: "Vocal pitch and timing on AI vocals; polyphonic notes in Editor",
		note: "Also exports MIDI",
		url: "https://www.celemony.com/en/melodyne"
	},
	{
		id: "ripx",
		name: "RipX DAW 8",
		kind: "midi",
		runs: "Windows, macOS",
		price: "$99, PRO $198",
		best: "Editing separated parts note by note",
		note: "Audio and MIDI treated as one",
		url: "https://hitnmix.com"
	},
	{
		id: "ozone",
		name: "iZotope Ozone 12",
		kind: "mastering",
		runs: "Windows, macOS",
		price: "Elements, Standard, Advanced",
		best: "Master Assistant with your own reference; Match EQ; Gain Match",
		note: "Use Match EQ at a partial amount",
		url: "https://www.izotope.com/en/products/ozone.html"
	},
	{
		id: "landr",
		name: "LANDR, eMastered, BandLab",
		kind: "mastering",
		runs: "Browser",
		price: "BandLab free; others from about $10 a month",
		best: "A fast online master",
		note: "Compare presets at matched loudness, not the loudest",
		url: "https://www.bandlab.com/mastering"
	},
	{
		id: "suno-remaster",
		name: "Suno Remaster",
		kind: "mastering",
		runs: "Suno",
		price: "Credits",
		best: "Clearer words and a tidier mix (Subtle)",
		note: "A regeneration, not a master; High can change the song",
		url: "https://help.suno.com/en/articles/8105281"
	}
];
/** The "Works in" facet. Entries marked 'any' work in every generator. */
var WHERE = [
	{
		id: "suno",
		name: "Suno"
	},
	{
		id: "eleven",
		name: "ElevenLabs"
	},
	{
		id: "lyria",
		name: "Lyria"
	},
	{
		id: "udio",
		name: "Udio"
	},
	{
		id: "daw",
		name: "Audio editor"
	}
];
var NAMES = {
	any: "Any generator",
	daw: "Audio editor (DAW)",
	suno: "Suno",
	eleven: "ElevenLabs Music",
	lyria: "Google Lyria",
	udio: "Udio"
};
function platformName(id) {
	return NAMES[id] ?? PLATFORMS.find((p) => p.id === id)?.name ?? id;
}
//#endregion
//#region junkyard/ai-music-guide/data/sources.ts
/**
* Every source cited in an entry, checked 2026-10-31. Links whose address
* names an AI act are kept in the research logs only; the guide names no artists.
*/
var SOURCES = {
	"suno-v6-faq": {
		name: "Suno: v6 FAQ",
		url: "https://help.suno.com/en/articles/13924481"
	},
	"suno-modes": {
		name: "Suno: Create modes",
		url: "https://help.suno.com/en/articles/10625537"
	},
	"suno-sliders": {
		name: "Suno: creative sliders",
		url: "https://help.suno.com/en/articles/6141377"
	},
	"suno-exclude": {
		name: "Suno: Exclude Styles",
		url: "https://help.suno.com/en/articles/3161921"
	},
	"suno-gender": {
		name: "Suno: vocal gender",
		url: "https://help.suno.com/en/articles/10153473"
	},
	"suno-personas": {
		name: "Suno: Personas",
		url: "https://help.suno.com/en/articles/3484161"
	},
	"suno-voices": {
		name: "Suno: Voices",
		url: "https://help.suno.com/en/articles/11362369"
	},
	"suno-upload": {
		name: "Suno: upload audio",
		url: "https://help.suno.com/en/articles/6141569"
	},
	"suno-extend": {
		name: "Suno: Extend",
		url: "https://help.suno.com/en/articles/2409601"
	},
	"suno-replace": {
		name: "Suno: Replace Section",
		url: "https://help.suno.com/en/articles/3271873"
	},
	"suno-editor": {
		name: "Suno: Song Editor",
		url: "https://help.suno.com/en/articles/6141505"
	},
	"suno-remaster": {
		name: "Suno: Remaster",
		url: "https://help.suno.com/en/articles/8105281"
	},
	"suno-stems": {
		name: "Suno: stem separation",
		url: "https://help.suno.com/en/articles/12702337"
	},
	"suno-midi": {
		name: "Suno Studio: export and MIDI",
		url: "https://help.suno.com/en/articles/13925249"
	},
	"suno-studio": {
		name: "Suno Studio 2.0",
		url: "https://help.suno.com/en/articles/13670529"
	},
	"suno-studio-chat": {
		name: "Suno Studio: chat bar",
		url: "https://help.suno.com/en/articles/13670721"
	},
	"suno-wav": {
		name: "Suno: download formats",
		url: "https://help.suno.com/en/articles/13926081"
	},
	"suno-pricing": {
		name: "Suno: pricing",
		url: "https://suno.com/pricing"
	},
	"suno-tos": {
		name: "Suno: download caps and terms, Sep 2026",
		url: "https://suno.com/blog/suno-updates-tos"
	},
	"suno-rights": {
		name: "Suno: commercial rights",
		url: "https://help.suno.com/en/articles/9601665"
	},
	"suno-retro": {
		name: "Suno: rights for earlier songs",
		url: "https://help.suno.com/en/articles/9604993"
	},
	"suno-responsibly": {
		name: "Suno: building responsibly",
		url: "https://suno.com/blog/building-the-future-of-music-responsibly"
	},
	"suno-blocked": {
		name: "Suno: why a song failed",
		url: "https://help.suno.com/en/articles/3198209"
	},
	"field-guide": {
		name: "Suno field guide (community)",
		url: "https://github.com/mttkllr/suno-field-guide"
	},
	"hookgenius-v6": {
		name: "HookGenius: v6 tested",
		url: "https://hookgenius.app/learn/suno-v6-guide/"
	},
	"sunobuilder-v6": {
		name: "SunoBuilder: v6 prompt guide",
		url: "https://sunobuilder.com/guides/suno-v6-prompt-guide.html"
	},
	"aimusicdaily-tags": {
		name: "AI Music Daily: Suno tags",
		url: "https://aimusicdaily.com/suno-prompt-tags"
	},
	"undetectr-v6": {
		name: "v6 vocal prompts (launch week)",
		url: "https://undetectr.com/blog/suno-v6-vocal-prompts"
	},
	"undetectr-lyrics": {
		name: "Writing lyrics for Suno",
		url: "https://undetectr.com/blog/write-lyrics-for-suno-ai"
	},
	"undetectr-change": {
		name: "v6 changing your prompt",
		url: "https://undetectr.com/blog/suno-v6-changing-your-prompt"
	},
	"jr-tags": {
		name: "Jack Righteous: metatags",
		url: "https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/understanding-suno-ai-a-comprehensive-guide-to-metatags"
	},
	"jr-finish": {
		name: "Jack Righteous: finishing one song",
		url: "https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/how-to-finish-one-suno-song-without-wasting-generations"
	},
	"jr-noise": {
		name: "Jack Righteous: shimmer and hiss",
		url: "https://jackrighteous.com/en-gb/blogs/guides-using-suno-ai-music-creation/reduce-ai-music-noise-fix-shimmer-hiss-in-suno-ai"
	},
	"jr-remaster": {
		name: "Jack Righteous: Remaster guide",
		url: "https://jackrighteous.com/en-gb/blogs/guides-using-suno-ai-music-creation/suno-ai-remaster-guide-v4"
	},
	"jr-v6": {
		name: "Jack Righteous: v6 reviews",
		url: "https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/suno-v6-reviews-problems-whats-next"
	},
	"jr-enhance": {
		name: "Jack Righteous: enhancing Suno music",
		url: "https://jackrighteous.com/blogs/music-creation-process-guide/enhance-your-suno-ai-music-tips-for-beginners"
	},
	"jr-contentid": {
		name: "Jack Righteous: Content ID claims",
		url: "https://jackrighteous.com/blogs/ai-music-distribution-guide/stolen-ai-music-content-id-claim-recovery"
	},
	"erasy-muffled": {
		name: "Why v6 sounds muffled",
		url: "https://erasy.co/blog/suno-v6-sounds-muffled"
	},
	"gearnews-v6": {
		name: "Gearnews: v6 problems",
		url: "https://www.gearnews.com/suno-v6-problems-tech/"
	},
	"trustnode-v6": {
		name: "v6 tag notes",
		url: "https://trustnodelogic.com/suno6.html"
	},
	"violet-prompts": {
		name: "Violet Recording: Suno prompts",
		url: "https://violetrecording.com/how-to-write-suno-prompts/"
	},
	"apipass-v5": {
		name: "Suno v5 issues and fixes",
		url: "https://apipass.dev/blogs/suno-v5-common-issues-and-solutions"
	},
	"frankx-workflow": {
		name: "A Suno production workflow",
		url: "https://www.frankx.ai/blog/suno-music-production-workflow"
	},
	"musictech-studio": {
		name: "MusicTech: Suno Studio review",
		url: "https://musictech.com/reviews/music-production/suno-studio-review/"
	},
	"reddit-shimmer": {
		name: "r/SunoAI shimmer thread (snapshot)",
		url: "https://reddit.sentinel-team.org/posts/1s52x7v/snapshots/2026-03-27T18%3A20%3A17.4177Z"
	},
	"udio-prompt": {
		name: "Udio: prompt like a master",
		url: "https://help.udio.com/en/articles/10716541-prompt-like-a-master"
	},
	"udio-downloads": {
		name: "Udio downloads disabled",
		url: "https://undetectr.com/blog/udio-download"
	},
	"eleven-best": {
		name: "ElevenLabs: music best practices",
		url: "https://elevenlabs.io/docs/overview/capabilities/music/best-practices"
	},
	"eleven-compose": {
		name: "ElevenLabs: compose API",
		url: "https://elevenlabs.io/docs/api-reference/music/compose.md"
	},
	"eleven-edit": {
		name: "ElevenLabs: editing sections",
		url: "https://elevenlabs.io/docs/help-center/product/core-capabilities/music/how-can-i-edit-my-track-add-or-remove-sections-or-change-the-style-of-a-specific-part-in-eleven-music.md"
	},
	"lyria-guide": {
		name: "Google: Lyria prompt guide",
		url: "https://ai.google.dev/gemini-api/docs/lyria-prompt-guide"
	},
	"aa-arena": {
		name: "Artificial Analysis Music Arena",
		url: "https://artificialanalysis.ai/music/leaderboard/instrumental"
	},
	mvsep: {
		name: "MVSep: model scores",
		url: "https://mvsep.com/algorithms"
	},
	demucs: {
		name: "Demucs README",
		url: "https://github.com/adefossez/demucs"
	},
	uvr: {
		name: "Ultimate Vocal Remover",
		url: "https://github.com/Anjok07/ultimatevocalremovergui"
	},
	"audio-separator": {
		name: "audio-separator",
		url: "https://pypi.org/project/audio-separator/"
	},
	"dereverb-room": {
		name: "De-reverb model card",
		url: "https://huggingface.co/anvuew/dereverb_room"
	},
	"ableton-stems": {
		name: "Ableton: stem separation FAQ",
		url: "https://help.ableton.com/hc/en-us/articles/23730994755996"
	},
	"basic-pitch": {
		name: "Spotify: Basic Pitch",
		url: "https://engineering.atspotify.com/meet-basic-pitch/"
	},
	"rx-denoise": {
		name: "iZotope: Spectral De-noise",
		url: "https://downloads.izotope.com/docs/rx6/34-spectral-de-noise/index.html"
	},
	"rx-deess": {
		name: "iZotope: De-ess",
		url: "https://s3.amazonaws.com/izotopedownloads/docs/rx9/en/de-ess/index.html"
	},
	"dubspot-stems": {
		name: "Dubspot: mixing AI stems",
		url: "https://blog.dubspot.com/mixing-ai-generated-stems-2026"
	},
	"dubspot-rebuild": {
		name: "Dubspot: AI track to real arrangement",
		url: "https://blog.dubspot.com/turn-an-ai-track-into-a-real-arrangement-2026"
	},
	"roex-stems": {
		name: "RoEx: why Suno stems sound bad",
		url: "https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them"
	},
	"roex-mix": {
		name: "RoEx: mixing and mastering Suno tracks",
		url: "https://www.roexaudio.com/blog/how-to-mix-and-master-your-suno-tracks-(and-actually-sound-professional)"
	},
	"antwort-suno": {
		name: "Removing AI artifacts from Suno stems",
		url: "https://www.antwort.net/a/tutorial/how-to-remove-ai-artifacts-from-suno-ai-stems-der-ultimative-guide.html"
	},
	"hydrogen-mp3": {
		name: "Hydrogenaudio: MP3 cutoffs",
		url: "https://hydrogenaudio.org/index.php?msg=683024"
	},
	"sweetwater-doubles": {
		name: "Sweetwater: vocal doubles",
		url: "https://www.sweetwater.com/insync/?p=234398"
	},
	"spotify-loudness": {
		name: "Spotify: loudness normalization",
		url: "https://support.spotify.com/us/artists/article/loudness-normalization/"
	},
	"mtm-loudness": {
		name: "Mastering The Mix: platform loudness",
		url: "https://www.masteringthemix.com/blogs/learn/76296773-mastering-audio-for-soundcloud-itunes-spotify-and-youtube"
	},
	"ozone-ref": {
		name: "iZotope: track referencing",
		url: "https://www.izotope.com/en/products/ozone/features/track-referencing"
	},
	"bandlab-review": {
		name: "BandLab Mastering review",
		url: "https://violetrecording.com/bandlab-mastering-review/"
	},
	"osu-intros": {
		name: "Ohio State: shrinking intros",
		url: "https://news.osu.edu/has-music-streaming-killed-the-instrumental-intro/"
	},
	"npr-repetition": {
		name: "NPR: repetition and the charts",
		url: "https://www.npr.org/2015/01/11/376496332/the-more-the-better-repetition-propels-songs-up-the-charts"
	},
	"hsd-chorus": {
		name: "Hit Songs Deconstructed: time to chorus",
		url: "https://reports.hitsongsdeconstructed.com/articles/hip-hop-vs-pop-which-hooks-you-faster/"
	},
	"devto-length": {
		name: "Song lengths, Hot 100 1959–2025",
		url: "https://dev.to/tonywangca/are-songs-really-getting-shorter-6618-hot-100-hits-1959-2025-4cdg"
	},
	"hypebot-length": {
		name: "Hypebot: songs getting shorter",
		url: "https://www.hypebot.com/songs-are-getting-shorter-and-the-surprising-truth-behind-it/"
	},
	"top40-postchorus": {
		name: "Top40 Theory: the post-chorus",
		url: "https://www.top40theory.com/blog/everything-you-need-to-know-about-the-postchorus"
	},
	"bmi-postchorus": {
		name: "BMI: the power of post-choruses",
		url: "https://bmi.com/news/entry/the-power-of-post-choruses"
	},
	"berklee-lyrics": {
		name: "Berklee: lyric writing",
		url: "https://online.berklee.edu/courses/lyric-writing-tools-and-strategies"
	},
	"coursera-lyrics": {
		name: "Coursera: songwriting lyrics",
		url: "https://www.coursera.org/learn/songwriting-lyrics"
	},
	"cbs-act": {
		name: "CBS: an AI act's lyric process",
		url: "https://www.cbsnews.com/entertainment/31"
	},
	"dazed-suno": {
		name: "Dazed: artists using Suno like Auto-Tune",
		url: "https://www.dazeddigital.com/music/article/71134/1/suno-is-the-new-auto-tune-meet-the-artists-using-ai-to-go-viral"
	},
	"techloy-acts": {
		name: "AI acts that topped charts",
		url: "https://www.techloy.com/10-ai-music-acts-that-have-officially-topped-the-global-charts/"
	},
	"dmn-band": {
		name: "Digital Music News: an AI band's rise",
		url: "https://www.digitalmusicnews.com/?p=327133"
	},
	"copyright-office": {
		name: "US Copyright Office AI report, part 2",
		url: "https://copyrightalliance.org/ai-report-part-2-copyrightability/"
	},
	"hk-scotus": {
		name: "Supreme Court declines AI authorship case",
		url: "https://www.hklaw.com/en/insights/publications/2026/03/the-final-word-supreme-court-refuses-to-hear-case-on-ai-authorship"
	},
	"fimi-labels": {
		name: "Industry AI labelling standard",
		url: "https://www.fimi.it/en/news/music-community-introduces-labeling-program-distinguish-genai-sound-recordings/"
	},
	"aria-rules": {
		name: "ARIA: AI chart rules",
		url: "https://au.variety.com/2026/music/news/aria-introduces-new-rules-for-ai-generated-music-39662/"
	},
	"interspace-credits": {
		name: "Spotify AI Credits via distributors",
		url: "https://interspacemusic.com/blog/spotify-ai-credits-live-disclosure-only-travels-through-your-distributor/"
	},
	"musictech-persona": {
		name: "Spotify AI Persona badge",
		url: "https://musictech.com/news/industry/spotify-label-ai-generated-artists-exclude-recommendations-default/"
	},
	"distrokid-ai": {
		name: "DistroKid AI disclosure",
		url: "https://www.digitalmusicnews.com/2026/05/14/distrokid-ai-credit-disclosure-what-it-looks-like/"
	},
	"hypebot-distributors": {
		name: "Distributors and AI music",
		url: "https://www.hypebot.com/are-tunecore-cd-baby-distrokid-symphonic-blocking-ai-music.md"
	},
	"bandcamp-ban": {
		name: "Bandcamp bans AI music",
		url: "https://techcrunch.com/2026/01/14/bandcamp-takes-a-stand-against-ai-music-banning-it-from-the-platform/"
	},
	"deezer-ai": {
		name: "Deezer: AI over half of uploads",
		url: "https://newsroom-deezer.com/2026/07/ai-music-exceeds-50-percent-daily-uploads-deezer/"
	},
	"mbw-spotify-policy": {
		name: "Spotify AI policy and spam filter",
		url: "https://musicbusinessworldwide.com/spotify-has-deleted-75m-spammy-tracks-as-it-unveils-new-ai-music-policies"
	}
};
//#endregion
//#region junkyard/ai-music-guide/data/catalog.ts
var ENTRIES = [
	...SONG_ENTRIES,
	...PROMPT_ENTRIES,
	...STEM_ENTRIES
];
var BY_ID = new Map(ENTRIES.map((e) => [e.id, e]));
function findEntry(id) {
	return id ? BY_ID.get(id) : void 0;
}
/** Sub-headings of the tag dictionary, in reading order. */
var TAG_GROUPS = [
	{
		id: "structure",
		name: "Song structure",
		note: "Section tags in square brackets, each on its own line. Brackets are read, not sung."
	},
	{
		id: "vocals",
		name: "Vocals and voices",
		note: "Who sings and how. Describe the voice in the style line too; tags alone are weaker."
	},
	{
		id: "instruments",
		name: "Instruments and solos",
		note: "Bring an instrument forward for one section."
	},
	{
		id: "delivery",
		name: "Delivery and spelling",
		note: "Punctuation and spelling inside the lyrics shape how a line is sung."
	},
	{
		id: "endings",
		name: "Endings",
		note: "Getting the song to stop where you want."
	},
	{
		id: "lore",
		name: "Lore that does not hold up",
		note: "Common tips with no reliable effect. Listed so you can stop trying them."
	}
];
/** Sub-headings of the fix finder: where in the sound the problem lives. */
var FIX_GROUPS = [
	{
		id: "prompt",
		name: "It did not follow the prompt",
		note: "Wrong words, wrong genre, wrong length. Fix these before you generate again."
	},
	{
		id: "top",
		name: "Top end: fizz, hiss, dullness",
		note: "Shimmer, noise and swirl above about 8 kHz, or a mix with no air at all."
	},
	{
		id: "vocals",
		name: "Vocals",
		note: "Harsh, watery, flat or buried."
	},
	{
		id: "low",
		name: "Low end and drums",
		note: "Mud, boom and drums without punch."
	},
	{
		id: "space",
		name: "Stereo and phase",
		note: "Width that wanders or collapses in mono."
	},
	{
		id: "structure",
		name: "Over the length of the song",
		note: "Loops, volume jumps, endings that crackle, quality that fades."
	}
];
//#endregion
//#region junkyard/ai-music-guide/data/search.ts
/**
* Words people use for the same idea. A query term matches any word in its
* group, so "split" finds stem separation and "metallic" finds shimmer fixes.
*/
var SYNONYMS = [
	[
		"stem",
		"stems",
		"split",
		"separate",
		"separation",
		"isolate",
		"unmix",
		"demix",
		"extract"
	],
	[
		"tag",
		"tags",
		"marker",
		"markers",
		"metatag",
		"metatags",
		"bracket",
		"brackets"
	],
	[
		"vocal",
		"vocals",
		"voice",
		"singer",
		"singing",
		"sung"
	],
	[
		"shimmer",
		"metallic",
		"tinny",
		"harsh",
		"fizz",
		"artifact",
		"artifacts",
		"swirl",
		"phasey",
		"watery"
	],
	[
		"muddy",
		"mud",
		"boomy",
		"murky",
		"woolly"
	],
	[
		"loud",
		"loudness",
		"lufs",
		"volume",
		"limiter",
		"limiting"
	],
	[
		"master",
		"mastering",
		"remaster"
	],
	[
		"lyric",
		"lyrics",
		"words",
		"verse",
		"verses"
	],
	[
		"hook",
		"chorus",
		"refrain",
		"catchy"
	],
	[
		"instrumental",
		"instrument",
		"instruments",
		"backing",
		"beat",
		"karaoke"
	],
	[
		"drum",
		"drums",
		"kick",
		"snare",
		"percussion"
	],
	[
		"prompt",
		"prompts",
		"style",
		"styles",
		"description"
	],
	[
		"extend",
		"extension",
		"continue",
		"longer"
	],
	[
		"replace",
		"inpaint",
		"inpainting",
		"regenerate",
		"redo",
		"fix"
	],
	[
		"copyright",
		"rights",
		"license",
		"licence",
		"ownership",
		"commercial"
	],
	[
		"release",
		"distribute",
		"distribution",
		"upload",
		"spotify",
		"streaming"
	],
	[
		"ending",
		"end",
		"outro",
		"fade"
	],
	[
		"intro",
		"start",
		"opening"
	],
	[
		"sample",
		"samples",
		"upload",
		"audio",
		"hum",
		"memo"
	],
	[
		"persona",
		"personas",
		"consistent",
		"consistency"
	],
	["midi", "notes"],
	[
		"pronounce",
		"pronunciation",
		"phonetic",
		"mispronounce",
		"spelling"
	],
	[
		"realistic",
		"real",
		"human",
		"organic",
		"natural"
	],
	[
		"wide",
		"width",
		"stereo",
		"mono"
	],
	[
		"tries",
		"generations",
		"rolls",
		"rerolls",
		"credits",
		"iterations"
	]
];
var STOP = new Set("a an and are as at be by for from how i in is it its me my of on or the to what with you your do does can get".split(" "));
/** Crude stemmer: enough that "vocals", "vocal" and "vocalist" meet. */
function stem(word) {
	if (word.length < 4) return word;
	return word.replace(/(ings?|ed|s)$/, "").replace(/e$/, "").replace(/(.)\1$/, "$1") || word;
}
function words(text) {
	return text.toLowerCase().replace(/[’']/g, "").split(/[^a-z0-9]+/).filter((w) => w.length > 1 && !STOP.has(w));
}
var GROUPS = /* @__PURE__ */ new Map();
for (const group of SYNONYMS) {
	const stems = new Set(group.map(stem));
	for (const s of stems) GROUPS.set(s, /* @__PURE__ */ new Set([...GROUPS.get(s) ?? [], ...stems]));
}
/** Earlier fields count more. Titles and aliases decide most rankings. */
var FIELDS = [
	{
		weight: 10,
		text: (e) => e.title
	},
	{
		weight: 7,
		text: (e) => (e.aka ?? []).join(" ")
	},
	{
		weight: 4,
		text: (e) => `${e.group ?? ""} ${e.example?.code ?? ""}`
	},
	{
		weight: 3,
		text: (e) => e.summary
	},
	{
		weight: 2,
		text: (e) => e.hear
	},
	{
		weight: 1,
		text: (e) => `${(e.steps ?? []).join(" ")} ${e.caution ?? ""}`
	}
];
function buildIndex(entries) {
	return entries.map((entry) => ({
		entry,
		fields: FIELDS.map((f) => ({
			weight: f.weight,
			stems: [...new Set(words(f.text(entry)).map(stem))]
		}))
	}));
}
function termScore(term, fields) {
	const exact = GROUPS.get(term) ?? /* @__PURE__ */ new Set([term]);
	let best = 0;
	for (const f of fields) for (const s of f.stems) {
		const score = s === term ? f.weight : exact.has(s) ? f.weight * .7 : s.startsWith(term) && term.length > 2 ? f.weight * .5 : 0;
		if (score > best) best = score;
	}
	return best;
}
/**
* Most query terms have to match: one of two, two of three, and so on, so
* "force an ending" still finds endings. Full matches rank first, then by
* summed field weight.
*/
function search(index, query) {
	const terms = [...new Set(words(query).map(stem))];
	if (terms.length === 0) return [];
	const needed = terms.length <= 2 ? 1 : Math.ceil(terms.length * .6);
	const hits = [];
	for (const item of index) {
		let score = 0;
		let matched = 0;
		for (const t of terms) {
			const s = termScore(t, item.fields);
			if (s > 0) matched++;
			score += s;
		}
		if (matched >= needed) hits.push({
			entry: item.entry,
			matched,
			score: score + (5 - item.entry.level) * .1
		});
	}
	const best = Math.max(0, ...hits.map((h) => h.matched));
	return (terms.length <= 2 && best === terms.length ? hits.filter((h) => h.matched === best) : hits).sort((a, b) => b.matched - a.matched || b.score - a.score).map((h) => h.entry);
}
/** The query's stems and their synonyms, for highlighting matches in results. */
function matchStems(query) {
	const out = /* @__PURE__ */ new Set();
	for (const t of words(query).map(stem)) {
		out.add(t);
		for (const s of GROUPS.get(t) ?? []) out.add(s);
	}
	return out;
}
function isMatch(word, stems) {
	const s = stem(word.toLowerCase());
	if (stems.has(s)) return true;
	for (const t of stems) if (t.length > 2 && s.startsWith(t)) return true;
	return false;
}
//#endregion
//#region junkyard/ai-music-guide/ui/dock.ts
var smooth = () => matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
/** Scroll to an element and move focus to it, without touching the hash (it holds the guide's state). */
function goTo(target, focus) {
	target.scrollIntoView({
		block: "start",
		behavior: smooth()
	});
	if (!focus.hasAttribute("tabindex")) focus.setAttribute("tabindex", "-1");
	focus.focus({ preventScroll: true });
}
var observer;
/**
* The docked index: the current view's sections, read from the rendered page
* ([data-dock] sections), with the section in view marked and its entries
* listed underneath for jumping between items. Rebuilt after every render.
*/
function renderDock(dock, main, title) {
	observer?.disconnect();
	const sections = [...main.querySelectorAll("[data-dock]")];
	const links = /* @__PURE__ */ new Map();
	const entryLinks = (scope) => [...scope.querySelectorAll(".entry")].map((li) => {
		const toggle = li.querySelector(".e-toggle");
		const a = h("a", {
			href: `#${li.id}`,
			class: "dock-entry",
			"data-tape": li.dataset.tape
		}, li.querySelector(".e-title")?.textContent ?? "");
		a.addEventListener("click", (ev) => {
			ev.preventDefault();
			goTo(li, toggle);
		});
		return h("li", {}, a);
	});
	const items = sections.map((sec) => {
		const heading = sec.querySelector("h2") ?? sec;
		const count = sec.querySelectorAll(".entry").length;
		const a = h("a", {
			href: `#${sec.id}`,
			class: "dock-link",
			"data-tape": sec.dataset.tape
		}, sec.dataset.dockN ? h("span", { class: "dock-n" }, sec.dataset.dockN) : null, h("span", { class: "dock-name" }, sec.dataset.dock), count ? h("span", { class: "dock-c" }, String(count)) : null);
		a.addEventListener("click", (ev) => {
			ev.preventDefault();
			goTo(sec, heading);
		});
		links.set(sec, a);
		const sub = h("ol", { class: "dock-sub" }, ...entryLinks(sec));
		return h("li", { class: "dock-item" }, a, count ? sub : null);
	});
	const body = items.length ? h("ol", { class: "dock-list" }, ...items) : h("ol", { class: "dock-sub dock-flat" }, ...entryLinks(main));
	const toSearch = h("button", {
		type: "button",
		class: "dock-search"
	}, "Search", h("kbd", {}, "/"));
	toSearch.addEventListener("click", () => {
		const q = document.getElementById("q");
		if (q) goTo(document.getElementById("finder"), q);
	});
	const toTop = h("a", {
		href: "#top",
		class: "dock-top"
	}, "↑ Top");
	toTop.addEventListener("click", (ev) => {
		ev.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: smooth()
		});
	});
	dock.replaceChildren(h("nav", {
		class: "dock-nav",
		"aria-label": "Index of this view"
	}, h("p", { class: "dock-title" }, title), body, h("p", { class: "dock-tools" }, toSearch, toTop)));
	if (!sections.length) return;
	const visible = /* @__PURE__ */ new Set();
	let last = null;
	observer = new IntersectionObserver((records) => {
		for (const r of records) r.isIntersecting ? visible.add(r.target) : visible.delete(r.target);
		const current = sections.find((s) => visible.has(s)) ?? last;
		last = current;
		for (const [sec, a] of links) {
			const on = sec === current;
			if (on) a.setAttribute("aria-current", "location");
			else a.removeAttribute("aria-current");
			a.parentElement.classList.toggle("is-current", on);
			const strip = a.closest(".dock-list");
			if (on && strip && strip.scrollWidth > strip.clientWidth) strip.scrollTo({
				left: a.parentElement.offsetLeft - 16,
				behavior: smooth()
			});
		}
	}, { rootMargin: "-15% 0px -70% 0px" });
	for (const s of sections) observer.observe(s);
}
//#endregion
//#region junkyard/ai-music-guide/data/stages.ts
/** Listed from the finished record back to the idea: the guide works backwards. */
var STAGES = [
	{
		id: "release",
		n: 8,
		name: "The record",
		done: "A song that grabs in the first ten seconds, holds through the chorus, and clears the platform rules for AI music.",
		ask: "What does a finished, releasable song have, and what are the rules for putting it out?"
	},
	{
		id: "master",
		n: 7,
		name: "Master",
		done: "Competitive loudness without squashing, a balanced tone next to a reference track, clean peaks for every platform.",
		ask: "How do I make it sound finished and as loud as the songs it sits next to?"
	},
	{
		id: "mix",
		n: 6,
		name: "Mix",
		done: "A vocal that sits in front, a tight low end, width without phase problems, and no AI shimmer in the top end.",
		ask: "How do I turn generated audio into a mix that sounds expensive?"
	},
	{
		id: "stems",
		n: 5,
		name: "Stems and clean-up",
		done: "Separate vocal, drum, bass and music tracks with little bleed, so each can be fixed or replaced on its own.",
		ask: "How do I pull the song apart cleanly and repair what the model got wrong?"
	},
	{
		id: "edit",
		n: 4,
		name: "Edit and arrange",
		done: "One take built from the best sections: the right intro, a chorus that lands, an ending that ends.",
		ask: "How do I fix one bad section without losing the rest?"
	},
	{
		id: "generate",
		n: 3,
		name: "Generate and choose",
		done: "A shortlist of takes with the right feel, picked by listening for the hook, the vocal and the low end.",
		ask: "How many tries does it take, and how do I pick the keeper?"
	},
	{
		id: "prompt",
		n: 2,
		name: "Prompt and tags",
		done: "A style description and tagged lyrics that tell the model the sound, the structure and the vocal, section by section.",
		ask: "How do I get the sound in my head out of the model?"
	},
	{
		id: "write",
		n: 1,
		name: "Write",
		done: "A reference track, a title, a hook and lyrics that sing well, before the first generation.",
		ask: "What should exist before I press create?"
	}
];
var LEVELS = [
	{
		level: 1,
		name: "Basics",
		note: "First songs. Custom mode, a clear style line, tagged sections."
	},
	{
		level: 2,
		name: "Intermediate",
		note: "Steering the model: vocal tags, extends, replacing sections, exclusions."
	},
	{
		level: 3,
		name: "Advanced",
		note: "Leaving the app: stems, a DAW, cleanup, mixing against a reference."
	},
	{
		level: 4,
		name: "Pro",
		note: "Rebuilding parts, re-recording, mastering and releasing like a label would."
	}
];
function findStage(id) {
	return STAGES.find((s) => s.id === id);
}
function stageName(id) {
	return findStage(id)?.name ?? id;
}
function levelName(level) {
	return LEVELS.find((l) => l.level === level)?.name ?? String(level);
}
//#endregion
//#region junkyard/ai-music-guide/ui/route.ts
var VIEWS = [
	{
		id: "backwards",
		label: "Work backwards",
		note: "From the finished record back to the first idea"
	},
	{
		id: "ladder",
		label: "Basics to advanced",
		note: "Every technique by skill level"
	},
	{
		id: "tags",
		label: "Tags and markers",
		note: "What each lyric tag and style word does"
	},
	{
		id: "fixes",
		label: "Fix a sound",
		note: "Start from what you hear"
	},
	{
		id: "tools",
		label: "Sites and tools",
		note: "Generators, stem splitters, mastering"
	}
];
var DEFAULT_ROUTE = {
	view: "backwards",
	q: ""
};
var isView = (v) => VIEWS.some((x) => x.id === v);
function readRoute(hash = window.location.hash) {
	const p = new URLSearchParams(hash.replace(/^#/, ""));
	const v = p.get("v");
	const lvl = Number(p.get("lvl"));
	return {
		view: isView(v) ? v : DEFAULT_ROUTE.view,
		q: (p.get("q") ?? "").slice(0, 80),
		level: lvl >= 1 && lvl <= 4 ? lvl : void 0,
		where: p.get("in") ?? void 0,
		open: p.get("e") ?? void 0
	};
}
function routeHash(r) {
	const p = new URLSearchParams();
	if (r.view !== DEFAULT_ROUTE.view) p.set("v", r.view);
	if (r.q) p.set("q", r.q);
	if (r.level) p.set("lvl", String(r.level));
	if (r.where) p.set("in", r.where);
	if (r.open) p.set("e", r.open);
	const s = p.toString();
	return s ? `#${s}` : "";
}
/** Replace, not push: searching and filtering are not navigation, so Back leaves the page. */
function writeRoute(r) {
	const hash = routeHash(r);
	if (hash === window.location.hash) return;
	history.replaceState(null, "", hash || window.location.pathname + window.location.search);
}
//#endregion
//#region junkyard/ai-music-guide/ui/finder.ts
var SUGGESTED = [
	"clean stems",
	"[Whisper]",
	"metallic highs",
	"stop singing the tags",
	"force an ending",
	"radio ready",
	"lyrics mispronounced",
	"loudness"
];
/** The search box is built once so typing never loses focus; everything around it re-renders. */
function mountFinder(container, on) {
	const input = h("input", {
		type: "search",
		id: "q",
		class: "q",
		autocomplete: "off",
		spellcheck: "false",
		placeholder: "clean stems, [Whisper], metallic highs…",
		"aria-describedby": "q-hint"
	});
	input.addEventListener("input", () => on.query(input.value));
	input.addEventListener("keydown", (ev) => {
		if (ev.key === "Escape" && input.value) {
			ev.preventDefault();
			input.value = "";
			on.query("");
		}
	});
	const form = h("form", {
		role: "search",
		class: "finder-form",
		"aria-label": "Search the guide"
	}, h("label", {
		for: "q",
		class: "q-label"
	}, "Search the guide"), h("div", { class: "q-wrap" }, input, h("kbd", {
		class: "q-kbd",
		"aria-hidden": "true"
	}, "/")));
	form.addEventListener("submit", (ev) => ev.preventDefault());
	const hint = h("p", {
		class: "q-hint",
		id: "q-hint"
	});
	const facets = h("div", { class: "facets" });
	const status = h("p", {
		class: "status",
		"aria-live": "polite"
	});
	const tabs = h("nav", {
		class: "views",
		"aria-label": "Ways to read the guide"
	});
	container.append(form, hint, facets, status);
	document.querySelector(".views-slot")?.append(tabs);
	window.addEventListener("keydown", (ev) => {
		const t = ev.target;
		if (ev.key === "/" && !(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)) {
			ev.preventDefault();
			input.focus();
		}
	});
	function chipRow(label, items, current, pick, key) {
		return h("fieldset", { class: "facet" }, h("legend", { class: "label" }, label), ...items.map((it) => {
			const on = it.value === current;
			const b = h("button", {
				type: "button",
				class: "chip",
				"aria-pressed": String(on),
				"data-key": `${key}-${String(it.value)}`,
				disabled: !on && it.count === 0
			}, it.text, h("span", { class: "chip-n" }, String(it.count)));
			b.addEventListener("click", () => pick(on ? void 0 : it.value));
			return b;
		}));
	}
	/** Counts are what each chip would leave, given the search and the other facet. */
	return function update(route, base, shown) {
		if (input.value !== route.q) input.value = route.q;
		hint.replaceChildren("Try ", ...SUGGESTED.slice(0, 6).flatMap((s, i) => {
			const b = h("button", {
				type: "button",
				class: "linkish",
				"data-key": `sug-${i}`
			}, s);
			b.addEventListener("click", () => on.query(s));
			return i ? [" · ", b] : [b];
		}));
		const byWhere = route.where ? base.filter((e) => matchesWhere(e, route.where)) : base;
		const byLevel = route.level ? base.filter((e) => e.level === route.level) : base;
		facets.replaceChildren(chipRow("Level", LEVELS.map((l) => ({
			value: l.level,
			text: l.name,
			count: byWhere.filter((e) => e.level === l.level).length
		})), route.level, on.level, "lvl"), chipRow("Works in", WHERE.map((w) => ({
			value: w.id,
			text: w.name,
			count: byLevel.filter((e) => matchesWhere(e, w.id)).length
		})), route.where, on.where, "in"));
		const filtered = !!(route.q || route.level || route.where);
		const clear = h("button", {
			type: "button",
			class: "linkish",
			"data-key": "clear"
		}, "Clear all");
		clear.addEventListener("click", on.clear);
		status.replaceChildren(route.q ? `${shown} ${shown === 1 ? "match" : "matches"} for “${route.q}”` : `${shown} ${shown === 1 ? "entry" : "entries"}`, filtered ? " · " : "", filtered ? clear : "");
		tabs.replaceChildren(h("ul", {}, ...VIEWS.map((v) => {
			const current = !route.q && v.id === route.view;
			const b = h("button", {
				type: "button",
				class: "view-tab",
				"aria-pressed": String(current),
				"data-key": `view-${v.id}`
			}, h("span", { class: "view-tab-name" }, v.label), h("span", { class: "view-tab-note" }, v.note));
			b.addEventListener("click", () => on.view(v.id));
			return h("li", {}, b);
		})));
	};
}
/** Entries marked 'any' work in every generator. */
function matchesWhere(e, where) {
	const w = e.where ?? ["any"];
	return w.includes(where) || where !== "daw" && w.includes("any");
}
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
//#region junkyard/ai-music-guide/ui/entry.ts
var KIND = {
	technique: "Technique",
	tag: "Tag",
	fix: "Fix",
	tool: "Tool"
};
var RELIABILITY = {
	reliable: "Reliable",
	mixed: "Hit and miss",
	myth: "Myth"
};
/** Text with query matches wrapped in <mark>. Built from text nodes, never markup. */
function marked(text, marks) {
	if (!marks || marks.size === 0) return [text];
	return text.split(/([A-Za-z0-9’']+)/).map((part, i) => i % 2 === 1 && isMatch(part.replace(/[’']/g, ""), marks) ? h("mark", {}, part) : part);
}
/** Four segments, filled up to the level, plus the level's name in words. */
function levelMeter(level) {
	return h("span", {
		class: "meter",
		"data-level": level
	}, h("span", {
		class: "meter-bars",
		"aria-hidden": "true"
	}, ...[
		1,
		2,
		3,
		4
	].map((n) => h("i", { class: n <= level ? "on" : "" }))), h("span", { class: "meter-name" }, levelName(level)));
}
function reliabilityMark(r) {
	return h("span", { class: `trust trust-${r}` }, RELIABILITY[r]);
}
function detail(e, on) {
	const parts = [];
	if (e.steps?.length) parts.push(h("div", { class: "d-block" }, h("h4", { class: "d-label" }, "Do this"), h("ol", { class: "d-steps" }, ...e.steps.map((s) => h("li", {}, s)))));
	if (e.example) {
		const copy = h("button", {
			type: "button",
			class: "copy"
		}, "Copy");
		copy.addEventListener("click", () => void copyText(e.example.code, copy));
		parts.push(h("div", { class: "d-block d-example" }, h("div", { class: "d-example-head" }, h("h4", { class: "d-label" }, e.example.label), copy), h("pre", {}, h("code", {}, e.example.code))));
	}
	if (e.caution) parts.push(h("div", { class: "d-block" }, h("h4", { class: "d-label" }, "Watch out"), h("p", {}, e.caution)));
	const facts = [];
	if (e.where?.length) facts.push(h("div", {}, h("dt", {}, "Works in"), h("dd", {}, e.where.map(platformName).join(", "))));
	facts.push(h("div", {}, h("dt", {}, "Stage"), h("dd", {}, stageName(e.stage))));
	if (e.related?.length) {
		const links = e.related.map(findEntry).filter((r) => !!r).map((r) => {
			const b = h("button", {
				type: "button",
				class: "rel",
				"data-key": `rel-${e.id}-${r.id}`
			}, r.title);
			b.addEventListener("click", () => on.jump(r.id));
			return b;
		});
		if (links.length) facts.push(h("div", {}, h("dt", {}, "See also"), h("dd", { class: "rels" }, ...links)));
	}
	if (e.sources?.length) facts.push(h("div", {}, h("dt", {}, "Sources"), h("dd", { class: "srcs" }, ...e.sources.map((k) => SOURCES[k]).filter(Boolean).map((s) => h("a", {
		href: s.url,
		target: "_blank",
		rel: "noopener"
	}, s.name)))));
	parts.push(h("dl", { class: "d-facts" }, ...facts));
	return h("div", {
		class: "detail",
		id: `d-${e.id}`
	}, ...parts);
}
/**
* One line of the track sheet: what to do on the left, what you will hear on
* the right, the level at the end. Opening it shows steps, an example to copy,
* caveats and related entries.
*/
function entryRow(e, opt, on) {
	const toggle = h("button", {
		type: "button",
		class: "e-toggle",
		"aria-expanded": String(opt.open),
		"aria-controls": `d-${e.id}`,
		"data-key": `e-${e.id}`
	}, h("span", { class: "e-title" }, ...marked(e.title, opt.marks)));
	toggle.addEventListener("click", () => on.toggle(e.id));
	const meta = [];
	if (opt.showKind) meta.push(h("span", { class: "e-kind" }, KIND[e.kind]));
	if (opt.showStage) meta.push(h("span", { class: "e-stage" }, stageName(e.stage)));
	if (e.reliability) meta.push(reliabilityMark(e.reliability));
	return h("li", {
		class: `entry kind-${e.kind}${opt.open ? " is-open" : ""}`,
		id: `e-${e.id}`,
		"data-tape": e.stage
	}, h("div", { class: "e-line" }, h("div", { class: "e-what" }, h("h3", { class: "e-head" }, toggle), h("p", { class: "e-sum" }, ...marked(e.summary, opt.marks)), meta.length ? h("p", { class: "e-meta" }, ...meta) : null), h("p", { class: "e-hear" }, h("span", { class: "e-hear-label" }, "You hear"), " ", ...marked(e.hear, opt.marks)), levelMeter(e.level)), opt.open ? detail(e, on) : null);
}
//#endregion
//#region junkyard/ai-music-guide/data/forms.ts
/**
* Typical streaming-era song forms. Bars are 4/4 at the middle of the tempo
* range; energy is how full the arrangement is, 0 to 1. These are common
* shapes, not rules: the point is the early hook and the energy curve.
*/
var FORMS = [
	{
		id: "pop",
		genre: "Pop",
		bpm: "100–122",
		note: "Short intro, a chorus inside the first 45 seconds, a post-chorus hook that repeats the title, and a bridge that drops out before the last, biggest chorus.",
		sections: [
			{
				name: "Intro",
				bars: 4,
				energy: .35
			},
			{
				name: "Verse",
				bars: 8,
				energy: .45
			},
			{
				name: "Pre-Chorus",
				bars: 4,
				energy: .6
			},
			{
				name: "Chorus",
				bars: 8,
				energy: .9
			},
			{
				name: "Post-Chorus",
				bars: 4,
				energy: .8
			},
			{
				name: "Verse",
				bars: 8,
				energy: .5
			},
			{
				name: "Pre-Chorus",
				bars: 4,
				energy: .65
			},
			{
				name: "Chorus",
				bars: 8,
				energy: .92
			},
			{
				name: "Bridge",
				bars: 8,
				energy: .4
			},
			{
				name: "Final Chorus",
				bars: 8,
				energy: 1
			},
			{
				name: "Outro",
				bars: 4,
				energy: .3
			}
		]
	},
	{
		id: "hiphop",
		genre: "Hip-hop",
		bpm: "80–100",
		note: "Many tracks open on the hook. Verses run 16 bars, the hook 8. The beat carries energy, so changes come from drops and switch-ups rather than new instruments.",
		sections: [
			{
				name: "Intro",
				bars: 4,
				energy: .4
			},
			{
				name: "Hook",
				bars: 8,
				energy: .85
			},
			{
				name: "Verse",
				bars: 16,
				energy: .7
			},
			{
				name: "Hook",
				bars: 8,
				energy: .88
			},
			{
				name: "Verse",
				bars: 16,
				energy: .72
			},
			{
				name: "Hook",
				bars: 8,
				energy: .9
			},
			{
				name: "Outro",
				bars: 4,
				energy: .35
			}
		]
	},
	{
		id: "edm",
		genre: "EDM",
		bpm: "124–128",
		note: "The drop is the chorus. Builds rise into it; breakdowns strip back to vocal and pads. DJ edits add long intros, but streaming versions get to the first drop fast.",
		sections: [
			{
				name: "Intro",
				bars: 8,
				energy: .4
			},
			{
				name: "Verse",
				bars: 8,
				energy: .45
			},
			{
				name: "Build",
				bars: 8,
				energy: .7
			},
			{
				name: "Drop",
				bars: 16,
				energy: 1
			},
			{
				name: "Breakdown",
				bars: 8,
				energy: .3
			},
			{
				name: "Build",
				bars: 8,
				energy: .75
			},
			{
				name: "Drop",
				bars: 16,
				energy: 1
			},
			{
				name: "Outro",
				bars: 8,
				energy: .35
			}
		]
	},
	{
		id: "rnb",
		genre: "R&B",
		bpm: "65–95",
		note: "Slower and longer bars, so the chorus arrives later in seconds. Space and the vocal carry it: ad-libs and harmonies build through the last chorus.",
		sections: [
			{
				name: "Intro",
				bars: 4,
				energy: .3
			},
			{
				name: "Verse",
				bars: 8,
				energy: .4
			},
			{
				name: "Pre-Chorus",
				bars: 4,
				energy: .55
			},
			{
				name: "Chorus",
				bars: 8,
				energy: .8
			},
			{
				name: "Verse",
				bars: 8,
				energy: .45
			},
			{
				name: "Pre-Chorus",
				bars: 4,
				energy: .6
			},
			{
				name: "Chorus",
				bars: 8,
				energy: .85
			},
			{
				name: "Bridge",
				bars: 4,
				energy: .5
			},
			{
				name: "Final Chorus",
				bars: 8,
				energy: .95
			},
			{
				name: "Outro",
				bars: 4,
				energy: .3
			}
		]
	},
	{
		id: "country",
		genre: "Country",
		bpm: "90–120",
		note: "Story verses and a title line that lands on the chorus. The second verse moves the story on, and the bridge is often the twist.",
		sections: [
			{
				name: "Intro",
				bars: 4,
				energy: .35
			},
			{
				name: "Verse",
				bars: 8,
				energy: .45
			},
			{
				name: "Chorus",
				bars: 8,
				energy: .8
			},
			{
				name: "Verse",
				bars: 8,
				energy: .5
			},
			{
				name: "Chorus",
				bars: 8,
				energy: .85
			},
			{
				name: "Bridge",
				bars: 8,
				energy: .55
			},
			{
				name: "Final Chorus",
				bars: 8,
				energy: .95
			},
			{
				name: "Outro",
				bars: 4,
				energy: .3
			}
		]
	},
	{
		id: "rock",
		genre: "Rock",
		bpm: "110–140",
		note: "A riff intro, verses that hold back, a chorus that opens the guitars up, and a solo in place of, or after, the bridge.",
		sections: [
			{
				name: "Intro",
				bars: 4,
				energy: .6
			},
			{
				name: "Verse",
				bars: 8,
				energy: .55
			},
			{
				name: "Chorus",
				bars: 8,
				energy: .9
			},
			{
				name: "Verse",
				bars: 8,
				energy: .6
			},
			{
				name: "Chorus",
				bars: 8,
				energy: .92
			},
			{
				name: "Guitar Solo",
				bars: 8,
				energy: .85
			},
			{
				name: "Bridge",
				bars: 4,
				energy: .5
			},
			{
				name: "Final Chorus",
				bars: 8,
				energy: 1
			},
			{
				name: "Outro",
				bars: 4,
				energy: .5
			}
		]
	}
];
//#endregion
//#region junkyard/ai-music-guide/ui/forms.ts
var built$2;
var current = FORMS[0];
function clock(seconds) {
	const s = Math.round(seconds);
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
/** Seconds per bar at the middle of the form's tempo range, in 4/4. */
function barSeconds(f) {
	const [lo, hi = lo] = f.bpm.match(/\d+/g).map(Number);
	return 240 / ((lo + hi) / 2);
}
/** Lyric skeleton with one tag per section, ready to paste into a lyrics box. */
function skeleton(f) {
	const seen = /* @__PURE__ */ new Map();
	return f.sections.map((s) => {
		const n = (seen.get(s.name) ?? 0) + 1;
		seen.set(s.name, n);
		return `[${/^(Verse)$/.test(s.name) ? `${s.name} ${n}` : s.name}]${/Verse|Chorus|Pre-Chorus|Bridge|Hook|Post-Chorus/.test(s.name) ? "\n(lyrics)" : ""}`;
	}).join("\n\n");
}
function draw(f) {
	const per = barSeconds(f);
	const total = f.sections.reduce((t, s) => t + s.bars, 0);
	let at = 0;
	const firstChorus = f.sections.findIndex((s) => /^(Chorus|Hook|Drop)$/.test(s.name));
	const toChorus = f.sections.slice(0, firstChorus).reduce((t, s) => t + s.bars, 0) * per;
	const blocks = f.sections.map((s, i) => {
		const start = at;
		at += s.bars;
		const label = `${s.name}, ${s.bars} bars, from ${clock(start * per)}`;
		return h("li", {
			class: `blk${i === firstChorus ? " is-first" : ""}`,
			style: `--bars:${s.bars};--e:${s.energy}`,
			title: label
		}, h("span", {
			class: "blk-fill",
			"aria-hidden": "true"
		}), h("span", { class: "blk-name" }, s.name), h("span", { class: "blk-t" }, clock(start * per)), h("span", { class: "sr-only" }, `: ${s.bars} bars, starts at ${clock(start * per)}, energy ${Math.round(s.energy * 10)} of 10`));
	});
	return h("figure", { class: "form-fig" }, h("ol", {
		class: "form-strip",
		"aria-label": `${f.genre} song form, ${f.sections.length} sections`
	}, ...blocks), h("figcaption", { class: "form-cap" }, h("span", {}, h("b", {}, clock(total * per)), " long at ", f.bpm, " BPM"), firstChorus >= 0 ? h("span", {}, "First ", f.sections[firstChorus].name.toLowerCase(), " at ", h("b", {}, clock(toChorus))) : null, h("span", { class: "form-key" }, "Block height is how full the arrangement is")), h("p", { class: "form-note" }, f.note));
}
/** "Anatomy of a hit": a song form per genre drawn as a strip of tape, with the tag skeleton to copy. */
function renderForms() {
	if (built$2) return built$2;
	const picker = h("div", {
		class: "form-pick",
		role: "group",
		"aria-label": "Genre"
	});
	const stage = h("div", {
		class: "form-stage",
		"aria-live": "polite"
	});
	const copy = h("button", {
		type: "button",
		class: "copy"
	}, "Copy the tags");
	const pre = h("pre", { class: "form-skel" });
	copy.addEventListener("click", () => void copyText(skeleton(current), copy));
	function show() {
		for (const b of picker.querySelectorAll("button")) b.setAttribute("aria-pressed", String(b.dataset.id === current.id));
		stage.replaceChildren(draw(current));
		pre.textContent = skeleton(current);
	}
	for (const f of FORMS) {
		const b = h("button", {
			type: "button",
			class: "chip",
			"data-id": f.id
		}, f.genre);
		b.addEventListener("click", () => {
			current = f;
			show();
		});
		picker.append(b);
	}
	show();
	built$2 = h("section", {
		class: "feature forms",
		"aria-labelledby": "forms-h"
	}, h("div", { class: "feature-head" }, h("h3", {
		id: "forms-h",
		class: "feature-name"
	}, "Anatomy of a hit"), h("p", { class: "feature-dek" }, "Typical streaming-era song forms. Pick a genre, then copy its section tags into the lyrics box as a starting structure.")), picker, stage, h("details", { class: "form-tags" }, h("summary", {}, "Section tags for this form"), h("div", { class: "form-tags-body" }, copy, pre)));
	return built$2;
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
//#region junkyard/ai-music-guide/data/style-words.ts
/** Suno's style field holds up to 1,000 characters (read from the live v6 counter). */
var STYLE_LIMIT = 1e3;
/** In the order most guides recommend. Words are ones testers report the model responds to. */
var STYLE_SLOTS = [
	{
		id: "genre",
		label: "Genre",
		hint: "One main genre, at most one influence.",
		words: [
			"indie pop",
			"synth-pop",
			"neo-soul",
			"trap",
			"boom bap",
			"house",
			"drum and bass",
			"country",
			"americana",
			"alt rock",
			"grunge",
			"metalcore",
			"lo-fi hip hop",
			"cinematic"
		]
	},
	{
		id: "era",
		label: "Era and scene",
		hint: "A decade or a scene says more than \"retro\".",
		words: [
			"1970s",
			"1980s",
			"1990s",
			"2000s",
			"2010s",
			"modern",
			"UK garage",
			"Nashville",
			"West Coast",
			"Motown"
		]
	},
	{
		id: "tempo",
		label: "Tempo and key",
		hint: "An exact BPM beats \"fast\". Key is a weak hint.",
		words: [
			"70 BPM",
			"88 BPM",
			"96 BPM",
			"104 BPM",
			"120 BPM",
			"128 BPM",
			"140 BPM",
			"half-time",
			"minor key",
			"major key"
		]
	},
	{
		id: "instruments",
		label: "Instruments",
		hint: "Two or three, each with a job.",
		words: [
			"Rhodes piano",
			"fingerpicked acoustic guitar",
			"distorted guitars",
			"808 sub bass",
			"warm bass guitar",
			"brushed drums",
			"live drums",
			"analog synth arpeggio",
			"string section",
			"pedal steel"
		]
	},
	{
		id: "vocal",
		label: "Vocal",
		hint: "Register, texture, delivery.",
		words: [
			"breathy female alto",
			"raspy male baritone",
			"soulful female belt",
			"airy male falsetto",
			"gritty vocals",
			"close dry vocal",
			"stacked harmonies",
			"gospel choir",
			"instrumental"
		]
	},
	{
		id: "production",
		label: "Production",
		hint: "Describe the recording, not the quality.",
		words: [
			"radio-ready",
			"crisp mix",
			"punchy compression",
			"wide stereo",
			"controlled low end",
			"tape saturation",
			"close mic presence",
			"small room",
			"minimal reverb",
			"clean mix"
		]
	},
	{
		id: "mood",
		label: "Mood",
		hint: "One or two. \"Bittersweet\" works; \"epic\" does not.",
		words: [
			"bittersweet",
			"haunting",
			"anthemic",
			"driving",
			"building intensity",
			"warm",
			"melancholic",
			"euphoric",
			"defiant"
		]
	},
	{
		id: "exclude",
		label: "Exclude",
		hint: "Goes in the separate Exclude field. Two or three items.",
		words: [
			"pop",
			"humming",
			"spoken intro",
			"male vocal",
			"female vocal",
			"autotune",
			"reverb"
		]
	}
];
//#endregion
//#region junkyard/ai-music-guide/ui/style-builder.ts
var KEY = "ai-music-guide:style";
var built$1;
function compose(v) {
	return STYLE_SLOTS.filter((s) => s.id !== "exclude").map((s) => (v[s.id] ?? "").trim().replace(/,\s*$/, "")).filter(Boolean).join(", ");
}
/**
* The style-box formula as a form: one field per slot, in the order the model
* weighs them, with common words to click in. The result updates as you type.
*/
function renderStyleBuilder() {
	if (built$1) return built$1;
	const values = readJson(KEY, {});
	const out = h("output", {
		class: "sb-out",
		for: STYLE_SLOTS.map((s) => `sb-${s.id}`).join(" "),
		"aria-live": "polite"
	});
	const count = h("span", { class: "sb-count" });
	const excl = h("p", { class: "sb-excl" });
	const inputs = /* @__PURE__ */ new Map();
	function refresh() {
		const text = compose(values);
		out.textContent = text || "Fill in a slot or click a word to start.";
		out.classList.toggle("is-empty", !text);
		const over = text.length > STYLE_LIMIT;
		count.textContent = `${text.length} / ${STYLE_LIMIT} characters${over ? ", over the limit" : ""}`;
		count.classList.toggle("is-over", over);
		const ex = (values.exclude ?? "").trim();
		excl.replaceChildren(ex ? h("span", {}, h("span", { class: "label" }, "Exclude"), " ", ex) : "");
		writeJson(KEY, values);
	}
	const fields = STYLE_SLOTS.map((slot, i) => {
		const input = h("input", {
			type: "text",
			id: `sb-${slot.id}`,
			class: "sb-input",
			value: values[slot.id] ?? "",
			"aria-describedby": `sb-${slot.id}-hint`,
			autocomplete: "off"
		});
		inputs.set(slot.id, input);
		input.addEventListener("input", () => {
			values[slot.id] = input.value;
			refresh();
		});
		const chips = slot.words.map((w) => {
			const b = h("button", {
				type: "button",
				class: "word"
			}, w);
			b.addEventListener("click", () => {
				const parts = input.value.split(",").map((p) => p.trim()).filter(Boolean);
				const at = parts.indexOf(w);
				if (at >= 0) parts.splice(at, 1);
				else parts.push(w);
				input.value = parts.join(", ");
				values[slot.id] = input.value;
				refresh();
			});
			return b;
		});
		return h("div", { class: `sb-slot${slot.id === "exclude" ? " is-exclude" : ""}` }, h("label", {
			for: `sb-${slot.id}`,
			class: "sb-label"
		}, h("span", {
			class: "sb-n",
			"aria-hidden": "true"
		}, slot.id === "exclude" ? "–" : String(i + 1)), slot.label), h("p", {
			class: "sb-hint",
			id: `sb-${slot.id}-hint`
		}, slot.hint), input, h("div", {
			class: "sb-words",
			role: "group",
			"aria-label": `Common ${slot.label.toLowerCase()} words`
		}, ...chips));
	});
	const copy = h("button", {
		type: "button",
		class: "copy"
	}, "Copy style");
	copy.addEventListener("click", () => void copyText(compose(values), copy));
	const reset = h("button", {
		type: "button",
		class: "linkish"
	}, "Clear");
	reset.addEventListener("click", () => {
		for (const k of Object.keys(values)) delete values[k];
		for (const input of inputs.values()) input.value = "";
		refresh();
	});
	refresh();
	built$1 = h("section", {
		class: "feature builder",
		"aria-labelledby": "sb-h"
	}, h("div", { class: "feature-head" }, h("h3", {
		id: "sb-h",
		class: "feature-name"
	}, "Style line builder"), h("p", { class: "feature-dek" }, "The order most guides agree on: genre first, then era, tempo, instruments, vocal, production and mood. Earlier words weigh more. Describe a sound, never an artist name.")), h("div", { class: "sb-grid" }, ...fields), h("div", { class: "sb-result" }, h("div", { class: "sb-result-head" }, h("span", { class: "label" }, "Style line"), count, h("span", { class: "sb-actions" }, reset, copy)), out, excl));
	return built$1;
}
//#endregion
//#region junkyard/ai-music-guide/ui/tools.ts
var TOOL_KINDS = [
	{
		id: "separation",
		name: "Stem separation",
		note: "Splitting a finished song into vocals, drums, bass and the rest."
	},
	{
		id: "cleanup",
		name: "Repair and clean-up",
		note: "Removing shimmer, noise, harsh esses and bleed."
	},
	{
		id: "midi",
		name: "Audio to MIDI",
		note: "Turning a part into notes, so a real instrument or plugin can replay it."
	},
	{
		id: "mastering",
		name: "Mastering",
		note: "Final loudness and tone."
	}
];
var built;
/** Two reference tables: song generators, then the tools that work on their output. Static, so built once. */
function renderTools() {
	if (built) return built;
	built = h("div", { class: "tools" }, h("section", {
		class: "group",
		id: "group-generators",
		"aria-labelledby": "gen-h",
		"data-dock": "Song generators"
	}, h("header", { class: "group-head" }, h("h2", {
		class: "group-name",
		id: "gen-h"
	}, "Song generators"), h("p", { class: "group-note" }, "Prices and versions as checked on 31 Oct 2026. They change often; check before you subscribe.")), h("div", {
		class: "table-wrap",
		tabindex: "0",
		role: "region",
		"aria-label": "Song generators, scrolls sideways"
	}, h("table", { class: "ref" }, h("thead", {}, h("tr", {}, ...[
		"Generator",
		"Best at",
		"Model now",
		"Price",
		"Length",
		"Exports",
		"Rights",
		"Use it when"
	].map((t) => h("th", { scope: "col" }, t)))), h("tbody", {}, ...PLATFORMS.map((p) => h("tr", {}, h("th", { scope: "row" }, h("a", {
		href: p.url,
		target: "_blank",
		rel: "noopener"
	}, p.name), h("span", { class: "ref-sub" }, p.maker)), h("td", {}, p.best), h("td", {}, p.model), h("td", {}, p.price), h("td", {}, p.length), h("td", {}, p.exports), h("td", {}, p.rights), h("td", {}, p.use))))))), ...TOOL_KINDS.map((k) => {
		const rows = TOOLS.filter((t) => t.kind === k.id);
		return h("section", {
			class: "group",
			id: `group-${k.id}`,
			"aria-labelledby": `tk-${k.id}`,
			"data-dock": k.name
		}, h("header", { class: "group-head" }, h("h2", {
			class: "group-name",
			id: `tk-${k.id}`
		}, k.name), h("p", { class: "group-note" }, k.note)), h("div", {
			class: "table-wrap",
			tabindex: "0",
			role: "region",
			"aria-label": `${k.name} tools, scrolls sideways`
		}, h("table", { class: "ref ref-tools" }, h("thead", {}, h("tr", {}, ...[
			"Tool",
			"Runs",
			"Price",
			"Best at",
			"Notes"
		].map((t) => h("th", { scope: "col" }, t)))), h("tbody", {}, ...rows.map((t) => h("tr", {}, h("th", { scope: "row" }, h("a", {
			href: t.url,
			target: "_blank",
			rel: "noopener"
		}, t.name)), h("td", {}, t.runs), h("td", {}, t.price), h("td", {}, t.best), h("td", {}, t.note)))))));
	}));
	return built;
}
//#endregion
//#region junkyard/ai-music-guide/ui/views.ts
function list(entries, ctx, extra = {}) {
	return h("ol", { class: "sheet" }, ...entries.map((e) => entryRow(e, {
		open: ctx.open === e.id,
		...extra
	}, ctx.on)));
}
function empty(text) {
	return h("p", { class: "empty" }, text);
}
function stageHead(s, count) {
	return h("header", { class: "stage-head" }, h("span", {
		class: "stage-n",
		"aria-hidden": "true"
	}, String(s.n).padStart(2, "0")), h("div", { class: "stage-text" }, h("h2", {
		class: "stage-name",
		tabindex: "-1"
	}, h("span", { class: "sr-only" }, `Stage ${s.n}: `), s.name), h("p", { class: "stage-ask" }, s.ask)), h("p", { class: "stage-done" }, h("span", { class: "label" }, "Done when"), " ", s.done), h("span", { class: "stage-count" }, `${count} ${count === 1 ? "entry" : "entries"}`));
}
function renderBackwards(ctx) {
	return h("div", { class: "view view-backwards" }, ...STAGES.map((s) => {
		const rows = ctx.entries.filter((e) => e.stage === s.id);
		const extras = [];
		if (s.id === "release") extras.push(renderForms());
		if (s.id === "prompt") extras.push(renderStyleBuilder());
		return h("section", {
			class: "stage",
			id: `stage-${s.id}`,
			"data-stage": s.id,
			"data-tape": s.id,
			"data-dock": s.name,
			"data-dock-n": String(s.n).padStart(2, "0")
		}, stageHead(s, rows.length), ...extras, rows.length ? list(rows, ctx, { showKind: true }) : empty("No entries at this stage match the filters."));
	}));
}
function renderLadder(ctx) {
	return h("div", { class: "view view-ladder" }, ...LEVELS.map((l) => {
		const rows = ctx.entries.filter((e) => e.level === l.level).sort((a, b) => STAGES.findIndex((s) => s.id === b.stage) - STAGES.findIndex((s) => s.id === a.stage));
		return h("section", {
			class: "rung",
			id: `level-${l.level}`,
			"data-dock": l.name,
			"data-dock-n": String(l.level)
		}, h("header", { class: "rung-head" }, h("h2", { class: "rung-name" }, l.name), h("p", { class: "rung-note" }, l.note), h("span", { class: "stage-count" }, `${rows.length} entries`)), rows.length ? list(rows, ctx, {
			showStage: true,
			showKind: true
		}) : empty("Nothing at this level matches the filters."));
	}));
}
function grouped(kind, groups, ctx, cls) {
	const rows = ctx.entries.filter((e) => e.kind === kind);
	return h("div", { class: `view ${cls}` }, ...groups.map((g) => {
		const inGroup = rows.filter((e) => e.group === g.id);
		if (!inGroup.length) return null;
		return h("section", {
			class: "group",
			id: `group-${g.id}`,
			"data-dock": g.name
		}, h("header", { class: "group-head" }, h("h2", { class: "group-name" }, g.name), h("p", { class: "group-note" }, g.note)), list(inGroup, ctx));
	}), rows.length ? null : empty("Nothing here matches the filters."));
}
function renderTags(ctx) {
	return grouped("tag", TAG_GROUPS, ctx, "view-tags");
}
function renderFixes(ctx) {
	return grouped("fix", FIX_GROUPS, ctx, "view-fixes");
}
function renderToolsView(ctx) {
	const tools = ctx.entries.filter((e) => e.kind === "tool");
	return h("div", { class: "view view-tools" }, renderTools(), tools.length ? h("section", {
		class: "group",
		id: "group-using",
		"data-dock": "Using the tools"
	}, h("header", { class: "group-head" }, h("h2", { class: "group-name" }, "Using the tools"), h("p", { class: "group-note" }, "How to get the most out of each one.")), list(tools, ctx, { showStage: true })) : null);
}
function renderResults(ctx, query, marks, onClear, suggest) {
	if (ctx.entries.length === 0) {
		const clear = h("button", {
			type: "button",
			class: "linkish"
		}, "Clear the search");
		clear.addEventListener("click", onClear);
		return h("div", { class: "view view-results" }, h("div", { class: "no-results" }, h("p", {}, "Nothing matches ", h("q", {}, query), ". Try fewer words, or a word for the sound rather than the fix: \"harsh\", \"muddy\", \"quiet vocal\"."), h("p", {}, clear, " or try ", ...[
			"stems",
			"chorus",
			"mastering",
			"ending"
		].flatMap((s, i) => {
			const b = h("button", {
				type: "button",
				class: "linkish"
			}, s);
			b.addEventListener("click", () => suggest(s));
			return i ? [", ", b] : [b];
		}), ".")), h("p", { class: "empty-note" }, ENTRIES.length + " entries are searched: titles, alternate names, examples, steps and what you hear."));
	}
	return h("div", { class: "view view-results" }, h("ol", { class: "sheet" }, ...ctx.entries.map((e) => entryRow(e, {
		open: ctx.open === e.id,
		marks,
		showStage: true,
		showKind: true
	}, ctx.on))));
}
//#endregion
//#region junkyard/ai-music-guide/main.ts
var main = byId("main");
var index = buildIndex(ENTRIES);
var route = readRoute();
var updateFinder = mountFinder(byId("finder"), {
	query: (q) => update({
		q,
		open: void 0
	}),
	level: (level) => update({ level }),
	where: (where) => update({ where }),
	view: (view) => update({
		view,
		q: "",
		open: void 0
	}, { top: true }),
	clear: () => update({
		q: "",
		level: void 0,
		where: void 0
	})
});
function visible(r) {
	const base = r.q ? search(index, r.q) : ENTRIES;
	return {
		base,
		shown: base.filter((e) => (!r.level || e.level === r.level) && (!r.where || matchesWhere(e, r.where)))
	};
}
/** Entries the current view can show, before facets. */
function inView(r, e) {
	if (r.q) return true;
	if (r.view === "tags") return e.kind === "tag";
	if (r.view === "fixes") return e.kind === "fix";
	if (r.view === "tools") return e.kind === "tool";
	return true;
}
/**
* Rendering rebuilds the results, which would drop keyboard focus to <body>.
* Controls carry a data-key; focus returns to the same control, or to the
* entry just jumped to. The search box is never rebuilt.
*/
function update(patch, focus = {}) {
	const active = document.activeElement;
	const focused = active?.id === "q" ? void 0 : active?.dataset.key;
	route = {
		...route,
		...patch
	};
	writeRoute(route);
	render();
	const key = focus.entry ? `e-${focus.entry}` : focused;
	if (key) document.querySelector(`[data-key="${CSS.escape(key)}"]`)?.focus({ preventScroll: true });
	const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
	if (focus.entry) document.getElementById(`e-${focus.entry}`)?.scrollIntoView({
		block: "start",
		behavior
	});
	else if (focus.top) byId("finder").scrollIntoView({
		block: "start",
		behavior
	});
}
/** Opening a related entry the current view hides switches to the full backwards view first. */
function jump(id) {
	const target = findEntry(id);
	if (!target) return;
	const { shown } = visible(route);
	update(shown.includes(target) && inView(route, target) ? { open: id } : {
		view: "backwards",
		q: "",
		level: void 0,
		where: void 0,
		open: id
	}, { entry: id });
}
function render() {
	const { base, shown } = visible(route);
	const entries = shown.filter((e) => inView(route, e));
	const ctx = {
		entries,
		open: route.open,
		on: {
			toggle: (id) => update({ open: route.open === id ? void 0 : id }),
			jump
		}
	};
	updateFinder(route, base.filter((e) => inView(route, e)), entries.length);
	document.body.dataset.view = route.q ? "results" : route.view;
	const view = route.q ? renderResults(ctx, route.q, matchStems(route.q), () => update({ q: "" }), (q) => update({ q })) : route.view === "ladder" ? renderLadder(ctx) : route.view === "tags" ? renderTags(ctx) : route.view === "fixes" ? renderFixes(ctx) : route.view === "tools" ? renderToolsView(ctx) : renderBackwards(ctx);
	main.replaceChildren(view);
	renderDock(byId("dock"), main, route.q ? `${entries.length} matches` : VIEWS.find((v) => v.id === route.view).label);
}
window.addEventListener("hashchange", () => {
	route = readRoute();
	render();
});
render();
if (route.open) document.getElementById(`e-${route.open}`)?.scrollIntoView({ block: "start" });
//#endregion

//# sourceMappingURL=main.js.map