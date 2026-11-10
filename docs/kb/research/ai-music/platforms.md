# AI music platforms other than Suno: research log

Checked: 2026-10-31

Scope: every notable AI music generator except Suno, as of late October 2026. Suno appears only where it's needed for context (leaderboards, lawsuits).

## Legend

- **[S]** Sourced from an official page or primary document. URL given.
- **[S3]** Sourced from a third party: trade press, a review, a blog, or an aggregator. URL given.
- **[E]** My inference from the sourced facts. Not stated by any source.
- **[U]** Unknown, unverified, or the sources conflict.

Prices are in USD per month unless marked otherwise. "Yearly" means the per-month price when billed annually.

---

## 0. Headline changes since 2025 (read first)

1. **Udio no longer exports anything.** Downloads of audio, video and stems have been off since 29 Oct 2025, apart from a 48-hour rescue window in Nov 2025. Udio is building a licensed, mobile-first, walled-garden app called **Starstruck**. In Starstruck, fans do not own what they make, and nothing can be exported. [S3] https://undetectr.com/blog/udio-download · [S3] https://www.musicbusinessworldwide.com/udios-licensed-ai-music-app-will-be-called-starstruck-with-four-creation-modes-for-fans-report/
2. **Riffusion → ProducerAI → Google Flow Music.** Google bought ProducerAI on 24 Feb 2026 and rebranded it Google Flow Music in April 2026. Flow Music now runs Lyria 3 Pro and Lyria 3.5. [S3] https://www.musicbusinessworldwide.com/google-acquires-ai-music-platform-and-suno-challenger-producerai · [S3] https://www.musicbusinessworldwide.com/googles-flow-music-adds-song-generation-editing-and-stem-splitting-to-spaces-its-vibe-coding-tool/
3. **Google Lyria jumped from clips to full songs.** Lyria 3 reached the Gemini app on 18 Feb 2026, as 30 s tracks. Lyria 3 Pro handles full songs. Lyria 3.5 followed: in Flow Music on 29 Jul 2026, then in the Gemini app and API on 4 Sep 2026, with songs up to about 3 min. [S] https://deepmind.google/models/lyria/ · [S] https://ai.google.dev/gemini-api/docs/music-generation · [S3] https://pasqualepillitteri.it/en/news/14486/lyria-3-5-gemini-app-api-en
4. **ElevenLabs moved fast.** Music v2 shipped 26 May 2026, and prices fell by up to 50% on the API and 40% on ElevenCreative. A UMG licensing deal followed on 10 Sep 2026, then Music v2.5 on 11 Sep 2026. The standalone ElevenMusic app has a $9.99 Pro plan. [S] https://elevenlabs.io/blog/introducing-music-v2 · [S3] https://musicbusinessworldwide.com/elevenlabs-launched-music-v2-5-shortly-after-announcing-its-umg-licensing-deal
5. **Stable Audio 3.0** shipped 20 May 2026. It is a family of four models trained only on licensed data. Three have open weights, and tracks run up to 6:20. It is still instrumental only. [S3] https://musicbusinessworldwide.com/stability-ai-launches-new-audio-models-that-can-generate-6-minute-music-tracks
6. **Open song models got good.** MiniMax Music 3.0 released open weights on 13 Aug 2026: 11.1B parameters, songs up to 5 min. ACE-Step 1.5 (Jan 2026, MIT licence) and its XL variant (Apr 2026) followed, as did YuE2-3B (Sep 2026). [S3] https://rits.shanghai.nyu.edu/ai/minimax-opens-music-3-0-weights-no-territorial-carve-out-this-time/ · [S] https://github.com/ace-step/ACE-Step-1.5 · [S] https://huggingface.co/m-a-p/YuE2-3B
7. **Sonauto is now Treblo.** Its model is Melodia v3. [S] https://sonauto.ai/developers · [S3] https://www.aichatdaily.com/ai-analysis/treblo-s-own-detector-flags-rubberz-tyga-tracks
8. **Mureka V9.5** was announced 31 Aug 2026. It ranks #3 on the Artificial Analysis vocal board, behind only Suno. [S] https://www.wboc.com/online_features/press_releases/mureka-introduces-next-generation-ai-music-model-v9-5-advancing-toward-more-human-like-song/article_44e5f165-1aca-53fb-8556-1983a9410fa8.html · [S3] https://alphasignal.ai/news/artificial-analysis-music-arena-v1-1-crowns-suno-v6-across-1-000-harder-prompts

---

## 1. Summary comparison table

"Vocals" means it can sing lyrics. Prices are the cheapest paid tier unless noted. See each section for sources.

| Platform | Current model (Oct 2026) | Best at | Entry price | Max length | Stems / WAV / MIDI | Editing | Voice / audio upload | Commercial use | Use it when |
|---|---|---|---|---|---|---|---|---|---|
| **Udio** (legacy app) | v1.5 / v1.5 Allegro | Full vocal songs, natural vocals | $10 Standard ($8 yearly) | 32 s or 130 s clips, extended | **No downloads at all** | Extend, remix, inpaint, Sessions timeline, Styles | Voices, upload audio, Styles reference | Moot: no export, and the ToS forbids copying output | You only need to sketch or listen inside Udio |
| **ElevenLabs Music / ElevenMusic** | Music v2.5 (v2, v1 still available) | Section-controlled vocal and instrumental songs, licensed commercial use | ElevenMusic Pro $9.99; ElevenLabs Starter ~$6 | API 3 s–10 min | 2/4/6 stems; PCM/WAV via API; no MIDI [U] | Section editor (Composer), inpainting, composition plans | Audio Reference (~30 s), Finetunes | "Cleared for nearly all commercial uses"; tier details conflict | You need structure control plus clean licensing for ads, video or games |
| **Google Lyria 3.5** (Gemini, API) | Lyria 3.5; Lyria 3 Clip; Lyria RealTime | Quick full songs from text or images; API at $0.08 per song | Free in Gemini (limited); API $0.08/song | ~3 min (API "a couple of minutes") | MP3; WAV on API | API is single-turn, no editing | Images (up to 10) | Not clearly stated for the Gemini app [U] | You want a cheap API song or a fast idea inside Gemini |
| **Google Flow Music** (ex-ProducerAI/Riffusion) | Lyria 3.5 / Lyria 3 Pro | Chat-driven songwriting, covers, section edits, stems | Starter $6 (site) | ~3 min [E] | MP3/WAV/M4A, stems [S], plan split unclear | Covers, replace sections, extend, Spaces | Upload beats/instrumentals | Commercial rights on paid tiers per a third-party guide [S3] | You want a Google-ecosystem studio with an agent and covers |
| **Stable Audio 3.0** | SA3 Small / Medium / Large | Instrumentals, loops, SFX, scoring, open weights | Free 50 credits; Solo $12 | 6 min (app); 6:20 (Medium) | Multi-track/stems in app; WAV | Inpainting, extend, audio-to-audio, DAW plugin | Audio-to-audio, LoRA fine-tune | Commercial licence on all plans; enterprise licence over $1M revenue | Instrumentals with clean licensing, or local/open use |
| **Mureka** | V9.5 (V9, V8, O2, V7.6) | Lyrics-first vocal songs, high vocal ranking | $8 yearly / $10 [E] | Unpublished; outputs run 2.5–4 min | WAV, 12 stems, MIDI, DAW session (top tier) | Extend, remix, area edit, Mureka Co agent | Reference track, voice cloning (top tier) | Full commercial rights (paid) | You want near-Suno vocals with MIDI/stems at a low price |
| **Treblo** (ex-Sonauto) | Melodia v3 | Fast, cheap vocal songs; API with 4,160 style tags | API Starter $11 | [U] | [U] | [U] | [U] | [U] | You're building an app that needs fast, streamable song generation |
| **MiniMax Music** | Music 3.0 (open weights), 2.6 | Long, coherent vocal songs; open weights | API $0.15/song | 5 min | WAV (open model 32 kHz); MP3/WAV/PCM via API | Cover model (separate) | Reference audio for covers | Community licence; deal needed above $20M revenue | You want an open-weight vocal model or a cheap API |
| **Tad AI** | "V3.0" own model + reportedly hosts Mureka v9 and Suno V5 | Cheap all-in-one: songs, covers, stems | Standard $7.99 (500 credits ≈ 50 songs) | Customisable [U] | Stem splitter, vocal remover | Basic/advanced editor | Covers, reference audio, voice models | Commercial licence download on paid plans | You want low-cost songs plus covers and stem tools in one place |
| **Boomy** | [U] | Instant generic tracks plus DSP distribution | Creator $9.99 | [U] | 25 WAV downloads/mo (Creator) | Basic editing | — | Commercial use and DSP release on paid plans | You want a quick track and built-in distribution |
| **Soundraw** | v2 (2025) | Royalty-free instrumentals you can tweak block by block | Creator $11.04 yearly | [U] | MP3/WAV/stems on Artist Pro and up | Block-based arrangement edits [S3/E] | — | Commercial use; DSP distribution allowed | You need background music or beats without vocals |
| **AIVA** | [U] | Orchestral/cinematic scoring with MIDI | Standard €11 yearly | 5:30 (Pro) | MIDI on all tiers; WAV on Pro | Piano-roll/track editor [S3/E] | Audio/MIDI influence upload | You own copyright only on Pro | You need editable MIDI scores |
| **Beatoven.ai** | Maestro | Licensed background music for video and podcasts | [U] ~$10–20 | [U] | MP3/WAV | Mood/section customisation [U] | — | Licence emailed with each download | You want "fairly trained" background music |
| **Loudly** | VEGA-2 (Mar 2026) | Royalty-free instrumentals and stems | [U] $10–15 | [U] | Stems [S3] | Remix/genre transfer [U] | — | Royalty-free; ownership disputed [S3] | You need quick royalty-free beds |
| **Mubert** | Render AI v2 / v1 | Long ambient/electronic streams and beds | Creator $14 (non-commercial); Pro $39 | 25 min (Render); API claims 2 h | WAV, stem regeneration | Section, stem, BPM and key editing (Pro) | Image-to-music | Pro/Business only; never DSP/Content ID | You need very long instrumental beds for streams or apps |
| **Leonardo.ai** | Music v1 (+ Seed Audio 1.0 voice) | Soundtracks next to Leonardo video | From $10 yearly | 1–10 min | [U] | [U] | — | [U] | You already make video in Leonardo |
| **ACE-Step 1.5 / XL** | 1.5, 1.5 XL (Apr 2026) | Local, very fast song generation; LoRA | Free (MIT) | 10 min | Local WAV | Cover, repaint, vocal-to-BGM | LoRA from a few songs | MIT code; training data undisclosed [U] | You want free local songs on a consumer GPU |
| **YuE2-3B** | YuE2 (Sep 2026) | Open songs with editable ABC scores | Free (open) | ~5 min demos | FLAC/score artifacts | Score editing, agentic editing | Covers | Licence [U] | You want symbolic, editable melody and chords |
| **MusicGen / AudioCraft** | (2023 lineage) | Research, short instrumental clips | Free | ~30 s | — | — | Melody conditioning | Weights CC-BY-NC (non-commercial) | Research only; lowest on the leaderboards |

---

## 2. Udio

### 2.1 What happened after the label deals (the main story)
- **29 Oct 2025:** UMG and Udio settled and agreed to build a licensed creation platform for 2026. The existing product stays up "within a walled garden", with fingerprinting and filtering added. [S3] https://www.musicbusinessworldwide.com/universal-music-settles-udio-lawsuit-strikes-deal-for-licensed-ai-music-platform/
- **Downloads cut the same day.** The CEO's blog post said: "Starting today, downloads from the platform will be unavailable." [S3] https://undetectr.com/blog/udio-download
- **48-hour window:** Downloads came back for 48 hours from 3 Nov 2025 so users could rescue their libraries, then went off again. [S3] https://undetectr.com/blog/udio-download · [S3] https://ppc.land/udio-settles-copyright-lawsuit-partners-with-universal-music-group/
- **Compensation for subscribers:** a one-time grant of 1,000 non-expiring credits. Standard rose from 1,200 to 2,400 credits a month and Pro from 4,800 to 6,000. Pro can run 5 sets (10 songs) at once. The Help Center states "downloading of audio, video, and stems has been disabled." [S3, quoting help.udio.com] https://undetectr.com/blog/udio-download. The current pricing page agrees: 2,400 and 6,000 credits, and no download feature listed. [S] https://www.udio.com/pricing
- **Further deals:** Warner settled on 19 Nov 2025 [S3] https://www.musicbusinessworldwide.com/warner-music-settles-udio-lawsuit-strikes-licensing-deal-with-ai-platform/. Then Merlin (Jan 2026) and Kobalt (Apr 2026) [S3] https://www.musicbusinessworldwide.com/after-universal-warner-and-merlin-deals-now-udio-inks-licensing-agreement-with-kobalt. Believe is also listed as a partner [S3] https://newindustryfocus.com/articles/udio-unveils-details-of-its-ai-music-app-starstruck
- **Terms of Service (revised 12 Nov 2025), §1.2** reportedly forbids downloading, reproducing or publishing output on any device or streaming platform, so recording the playback is also prohibited. [S3] https://undetectr.com/blog/udio-download
- **DRM:** On 14 Jul 2026, BuyDRM (KeyOS MultiKey: Widevine, FairPlay, PlayReady) was named to protect streaming on the new service. [S3] https://www.musicbusinessworldwide.com/udio-taps-content-security-buydrm-to-secure-its-ai-music-walled-garden/ · [S3] https://www.aimusicpreneur.com/ai-tools-news/udio-buydrm-drm-deal-licensed-platform-launch/
- **Starstruck:** the new app, revealed at an Apr 30 2026 Kobalt webinar and reported in May 2026.
  - It is mobile-first and has four modes. Cover performs an existing song "in the style of" another opted-in artist. Reimagine keeps the lyrics and rewrites the music. Remix applies a genre shift. Create pairs your own lyrics with a selected artist's voice.
  - You must always pick a specific artist and song, so no generic AI music.
  - The rights holder owns the output, not the fan.
  - There will be two tiers (Standard and Pro) with creation caps.
  - Every output is watermarked and fingerprinted, and nothing can be exported.
  - [S3] https://www.waterandmusic.com/a-scoop-on-udios-upcoming-app-starstruck/ · [S3] https://www.musicbusinessworldwide.com/udios-licensed-ai-music-app-will-be-called-starstruck-with-four-creation-modes-for-fans-report/ · [S3] https://musically.com/2026/05/22/udio-reveals-details-of-its-licensed-ai-music-app-starstruck/
- **Launch status as of 31 Oct 2026:** I found no confirmation that Starstruck has launched. One source said Q2 2026, and the April coverage said "later this year". [U] https://pract.is/blog/suno-and-udio-now-have-licensing-deals-what-does-that-actually-mean-for-musicians · https://www.musicinafrica.net/node/387355
- **Sony is still suing.** Its original 2024 case is in discovery. A second suit filed 20 Jul 2026 covers 30,117 recordings that Sony says it found in Udio's training data, alleges stream-ripping from YouTube with yt-dlp, and could reach ~$4.5B in statutory damages. Udio claims fair use. [S3] https://musicbusinessworldwide.com/sony-music-files-new-lawsuit-against-ai-platform-udio-asserting-over-30000-sound-recordings-a-judge-barred-it-from-adding-to-its-original-case · [S3] https://completemusicupdate.com/sony-music-sues-udio-for-a-second-time-with-the-extra-30-000-recordings-that-could-result-in-4-5-billion-damages/

### 2.2 The legacy product today
- **Models:** v1, v1.5 and v1.5 Allegro are kept during the transition (Allegro, launched Mar 2025, is faster). [S3] https://undetectr.com/blog/udio-download · [S] https://help.udio.com/en/articles/10748731-changelog-what-s-new-with-udio
- **Plans:**
  - Free: 10 credits a day and 100 a month, with three 130 s songs a day.
  - Standard: $10 ($8 yearly), 2,400 credits.
  - Pro: $30 ($24 yearly), 6,000 credits.
  - Top-ups: 100 credits for $3, 1,000 for $25.
  - [S] https://www.udio.com/pricing
- **Credits per song:** every Create, Extend, Remix, Inpaint or Edit makes 2 songs. A pair of 32 s clips costs 2 credits, and a pair of 130 s clips costs 4. Trimming is free. [S] https://help.udio.com/en/articles/10739134-credits-and-credit-limits
- **Length:** 32 s or 130 s per generation. Full songs are built by extending. [S] https://www.udio.com/pricing
- **Editing:**
  - Extend, with an adjustable context window from 1 s to 2:10 [S] https://www.udio.com/blog/introducing-subscriptions-and-inpainting
  - Remix [S] https://www.udio.com/pricing
  - Inpainting (desktop, Jan 2025) [S] https://help.udio.com/en/articles/10748731-changelog-what-s-new-with-udio
  - Trim [S] (same)
  - Sessions timeline editor (Jun 2025) [S] (same)
  - Styles reference (Mar 2025), plus Blend and Reduce Styles [S] https://www.udio.com/pricing
  - Voices (Sep 2025) [S] https://help.udio.com/en/articles/10748731-changelog-what-s-new-with-udio
- **Uploads:** paid plans can generate from uploaded audio and use existing songs as style references. [S] https://www.udio.com/pricing
- **Stems/WAV/MIDI:** none can be exported now. Stems used to exist. [S3] https://undetectr.com/blog/udio-download

### 2.3 Prompting differences (Udio vs Suno-style)
- **The prompt** is free text plus genre tags. You can reference an artist's style, but Udio "won't copy an artist's voice". Repeating a keyword adds emphasis. [S] https://help.udio.com/en/articles/10716541-prompt-like-a-master
- **Manual Mode** "uses only exact tags (no free text)", skips automatic prompt refinement, and suits custom lyrics. [S] (same)
- **Lyrics:** use the Custom Lyrics Editor with bracketed tags like `[Scream]`, `[Chorus]` and `[Guitar Solo]`, and `(parentheses)` for backing vocals. Fix pronunciation with syllable hyphenation (Un-be-liev-a-ble) and phonetic acronyms. [S] (same)
- **Advanced controls:**
  - seed (manual mode)
  - prompt strength and lyrics strength (higher prompt strength improves adherence but sounds less natural; lower lyrics strength sounds more natural but may skip lyrics)
  - clip start-time % (0% means an intro)
  - a generation-quality vs speed slider
  - [S] https://www.udio.com/blog/two-minute-model-new-controls
  - "Clarity" (added in v1.5) [S3] https://aichatonline.org/blog-udio-new-15-update-is-it-better-ai-udiomusic-advancedfeatures-44416
  - a negative prompt, which carries over between models [S] https://help.udio.com/en/articles/10748731-changelog-what-s-new-with-udio
  - Style Reduction [S] https://help.udio.com/en/articles/10716541-prompt-like-a-master
- **The key structural difference:** Udio builds songs clip by clip (extend from an intro or outro using the start-time %). It does not generate a whole song in one pass. [E]

### 2.4 Quality and iterations
- Reviewers still rate Udio's vocals and arrangements among the most natural, but "reaching a keeper is iterative". [S3] https://violetrecording.com/udio-v2-review/
- Anecdotes: "at least 10 generations, usually more, to find a starting point". One project took ~3,000–4,000 generations to get 15 songs it was happy with. [S3/U] https://pol1.lr.ggtyler.dev/r/udiomusic/comments/1joygtn/what_am_i_doing_wrong · https://greaterwrong.com/posts/YMo5PuXnZDwRjhHhE/the-story-of-i-have-been-a-good-bing/comment/XC9KNvj4ygLuCnvuA
- Udio does not appear on the Artificial Analysis v1.1 boards. [S] https://artificialanalysis.ai/music/leaderboard/instrumental

**Use it when:** you want to sketch ideas or listen inside the platform and don't need the files. If you need to release music, pick a generator that exports. [E]

---

## 3. ElevenLabs Music (Eleven Music / ElevenMusic / ElevenCreative)

- **Models:**
  - music_v1 (Aug 2025)
  - music_v2 (26 May 2026)
  - music_v2_5 (11 Sep 2026), now the default in ElevenMusic. v2 stays available.
  - [S] https://elevenlabs.io/docs/overview/capabilities/music · [S] https://elevenlabs.io/blog/introducing-music-v2 · [S3] https://musicbusinessworldwide.com/elevenlabs-launched-music-v2-5-shortly-after-announcing-its-umg-licensing-deal
- **Three surfaces:** ElevenMusic (a creator studio and listening app, with an iOS app since 1 Apr 2026), ElevenAPI (developers), and ElevenCreative (brands). [S] https://elevenlabs.io/blog/introducing-music-v2 · [S3] MBW above
- **What v2 and v2.5 add:**
  - section-by-section long-form composition
  - mid-track genre changes ("opera to heavy metal and back")
  - fast rap and dense lyrics
  - sound effects embedded in the track
  - better inpainting and better multilingual output
  - Audio Reference
  - v2.5: "better audio quality and prompt adherence". In a blind test of 47,885 pairs, v2.5 won the majority, with the biggest gains in R&B, soul, hip-hop, rock, metal, orchestral and cinematic.
  - [S] https://elevenlabs.io/docs/overview/capabilities/music · [S3] MBW above
- **Other recent features:** Composer, a section-by-section song editor (announced ~25 Aug 2026), and Muse, a conversational co-writer (27 Aug 2026). [S3] https://musicbusinessworldwide.com/elevenlabs-launched-music-v2-5-shortly-after-announcing-its-umg-licensing-deal
- **Pricing:**
  - ElevenMusic Free: 25 generations a day, 5 downloads a day, 5 stem splits a day, 1 custom style.
  - ElevenMusic Pro: $9.99 ($7.99 yearly), 1,000 generations a month, unlimited downloads, 500 stem splits, 5 custom styles.
  - [S] https://elevenmusic.io/pricing
  - ElevenLabs main plans: Music costs **900 credits per minute**. Starter is $6 (first month $1), Creator $22, Pro $99, Scale $299, Business $990. [S] https://elevenlabs.io/pricing · secondary: [S3] https://www.codaone.ai/blog/elevenlabs-pricing-guide-2026/
  - The API requires a paid plan. [S] https://elevenlabs.io/docs/overview/capabilities/music
  - Price cut alongside v2: up to 50% on the API and up to 40% on self-serve ElevenCreative, for both v1 and v2. [S] https://elevenlabs.io/blog/introducing-music-v2
  - Per-song credits: by length and variant count, shown before you generate. [S] https://elevenlabs.io/docs/help-center/product/core-capabilities/music/how-much-does-eleven-music-cost.md
- **Length:** the API takes `music_length_ms` from 3,000 to 600,000 (3 s to 10 min). [S] https://elevenlabs.io/docs/api-reference/music/compose.md
- **Formats:** v2 defaults to mp3_48000_192. You can also request MP3 up to 320 kbps, PCM up to 48 kHz, and Opus. Optional C2PA signing. [S] (same)
- **Free tier:** 5 lossless downloads a day. [S3] MBW v2.5 article
- **Stems:** 2 (vocals and instrumental), 4 (vocals, drums, bass, other) or 6. They cost 0.5× the generation cost for 2 stems and 1× for 4. There is also an API endpoint. [S] https://elevenlabs.io/blog/eleven-music-new-tools-for-exploring-editing-and-producing-music-with-ai
- **MIDI:** none found. [U]
- **Editing:**
  - Inpainting API: replace or regenerate sections, change lyrics, extend or shorten, make loops, remix (Dec 2025). [S] (same)
  - The UI lets you add, delete or reorder sections, edit each section's lyrics or prompt, and set per-section include and exclude styles, then regenerate. [S] https://elevenlabs.io/docs/help-center/product/core-capabilities/music/how-can-i-edit-my-track-add-or-remove-sections-or-change-the-style-of-a-specific-part-in-eleven-music.md
  - Every word gets a timestamp, which helps with video sync. [S] https://elevenlabs.io/blog/eleven-music-new-tools-for-exploring-editing-and-producing-music-with-ai
  - One blog says inpainting is Enterprise-only on the API. [S3/U] https://www.buildfastwithai.com/blogs/elevenlabs-music-v2-review-2026
- **Uploads:**
  - Audio Reference: a clip of about 30 s on paid plans, screened for copyright. It guides sound, production, instrumentation, tempo and mood, but is "not designed for genre transformation".
  - Music Finetunes: train on tracks you own in 5–10 minutes. Curated finetunes are also offered.
  - There is no voice cloning of singers for songs. Instead you get "custom styles/vocals" in ElevenMusic.
  - [S] https://elevenlabs.io/docs/overview/capabilities/music · [S] https://elevenmusic.io/pricing
- **Prompting differences:**
  - **Composition plans:** `POST /v1/music/plan` (free, rate-limited) drafts a JSON plan, which you then pass to `POST /v1/music`. [S3] https://dev.classmethod.jp/en/articles/elevenlabs-music-v2-composition-plan/
  - v1 plans use `positive_global_styles`, `negative_global_styles` and `sections`. [S] https://elevenlabs.io/docs/api-reference/music/compose.md
  - v2 plans are an ordered list of `chunks` (GenerationChunk or AudioRefChunk). Each chunk has `text` (a section tag like `[Intro]` plus lyrics), `duration_ms`, `positive_styles`, `negative_styles` and `context_adherence`. [S3] https://dev.classmethod.jp/en/articles/elevenlabs-music-v2-composition-plan/
  - v2 and v2.5 always enforce section durations, and `respect_sections_durations` applies only to v1. `prompt` and `composition_plan` can't be combined. `force_instrumental` works only with a plain prompt. [S] https://elevenlabs.io/docs/api-reference/music/compose.md
  - **Prompt guide:** settle genre, mood, instruments, tempo and era yourself. Use studio vocabulary such as sidechain, close-mic'd and tape saturation. Give a BPM and key. Narrate the arrangement in order ("start with… then bring in…"). Mark silences, because the model fills them otherwise. Use timing cues ("lyrics begin at 15 seconds"). "solo <instrument>" or "a cappella" isolate parts, and "instrumental only" removes vocals. [S] https://elevenlabs.io/docs/overview/capabilities/music/best-practices
- **Blocked prompts:** artist or songwriter names, song or album titles, label or publisher names, and recognisable lyrics. Downloads are blocked for tracks that "reference other artists' songs". [S3] https://musicbusinessworldwide.com/elevenlabs-launched-music-v2-5-shortly-after-announcing-its-umg-licensing-deal
- **Rights:**
  - "Cleared for nearly all commercial uses", per the music terms. [S] https://elevenlabs.io/docs/overview/capabilities/music
  - The v2.5 post says users "own what they make … on every plan, including Free", and Free users can use tracks commercially if they credit ElevenMusic. The ElevenMusic version of the same post says "rights and commercial use vary by subscription tier". [S3/U] MBW v2.5 article
  - The pricing page says Free allows commercial use with a "Made with ElevenMusic" credit, and Pro lets you release to Spotify and Apple Music. [S] https://elevenmusic.io/pricing
  - Rights attach when a track is created and survive a downgrade. [S3] MBW
- **Licensing deals:** Merlin, Kobalt, Believe, and UMG (10 Sep 2026; first major). The UMG deal is "separate from" v2.5, and "no UMG artist music was used to train this model". [S3] MBW above
- **Quality reputation:** in the AA instrumental v1.1 board, Eleven Music (v1) scores 1021, v2 1011 and v2.5 1001, in the middle of the pack and below Mureka and Lyria. [S] https://artificialanalysis.ai/music/leaderboard/instrumental. That conflicts with ElevenLabs' own blind test, where v2.5 beat v2. [U] See Conflicts.

**Use it when:** you need section-level control, exact durations, word timestamps for video, and licensing you can defend for ads, games or brand work. Also when you want an API with a composition plan you can edit. [E]

---

## 4. Google Lyria family (Gemini app, Gemini API, Flow Music, YouTube, MusicFX, Sandbox)

### 4.1 Models
- **Lyria 2** (2025) is the legacy model, scoring 926 on the AA instrumental board. [S] https://artificialanalysis.ai/music/leaderboard/instrumental
- **Lyria 3** reached the Gemini app on 18 Feb 2026 as a beta. It made 30 s tracks with lyrics from text, image or video for everyone 18+, in 8 languages, with higher limits for AI Plus, Pro and Ultra subscribers. Cover art comes from Nano Banana. [S3] https://www.techcrunch.com/2026/02/18/google-adds-music-generation-capabilities-to-the-gemini-app/ · [S3] https://9to5google.com/2026/02/18/gemini-app-music-lyria-3/
- **Lyria 3 Pro** handles full songs. It powers Flow Music and is in the API as `lyria-3-pro-preview` at $0.08 per song. [S] https://ai.google.dev/gemini-api/docs/pricing · [S3] https://www.musicbusinessworldwide.com/googles-flow-music-adds-song-generation-editing-and-stem-splitting-to-spaces-its-vibe-coding-tool/
- **Lyria 3 Clip** (`lyria-3-clip-preview`) always makes 30 s MP3s and costs $0.04 per song. [S] https://ai.google.dev/gemini-api/docs/music-generation · [S] https://ai.google.dev/gemini-api/docs/pricing
- **Lyria 3.5** (`lyria-3.5`) costs $0.08 per song.
  - It is better on musicality, lyrics, vocals and control (BPM, duration), and runs up to about 3 min.
  - It reached Flow Music on 29 Jul 2026, then the Gemini app, API, AI Studio and Google Vids on 4 Sep 2026.
  - [S] https://deepmind.google/models/lyria/ · [S] https://ai.google.dev/gemini-api/docs/pricing · [S3] https://pasqualepillitteri.it/en/news/9078/lyria-3-5-google-flow-music-en · [S3] https://pasqualepillitteri.it/en/news/14486/lyria-3-5-gemini-app-api-en
- **Lyria RealTime** (`lyria-realtime-exp`) streams over WebSocket using weighted prompts. Output is 48 kHz stereo 16-bit PCM. It powers MusicFX DJ. **Magenta RealTime** is the open-weight variant. [S] https://deepmind.google/models/lyria/ · [S] https://ai.google.dev/gemini-api/docs/realtime-music-generation?hl=ja

### 4.2 Gemini app
- **Requirements:** 18+ and Keep Activity on. Switch the model to "Pro" for full tracks. [S] https://support.google.com/gemini/answer/16901237?hl=en-gb
- **Options:** short (about 1 min) or full (about 2–3 min), vocals on or off, and a genre picker. You can add images or video as context. [S] (same)
- **Output:** MP4 with cover art, or MP3. Everything carries the SynthID watermark. [S] (same)
- **Limits:** caps exist but aren't published. [S] (same)
- **Commercial terms:** not stated for app output. [U] https://www.technerdiness.com/gemini/how-to-generate-song-google-gemini/

### 4.3 Gemini API
- **Output:** 44.1 kHz stereo, MP3 by default, WAV available on 3.5 via `response_format`. The docs' WAV example is unclear. [S/U] https://ai.google.dev/gemini-api/docs/music-generation
- **Inputs:** up to 10 images per request. [S] (same)
- **Limits:** single-turn only, with no multi-turn editing. Results aren't deterministic. Prompts asking for a specific artist's voice or copyrighted lyrics are blocked. [S] (same)
- **No free tier** for Lyria in the API. [S] https://ai.google.dev/gemini-api/docs/pricing

### 4.4 Prompting (Lyria-specific)
- **Lyria 3.5:**
  - Section tags `[Intro] -> [Verse 1] -> [Chorus] -> [Bridge] -> [Outro]` (arrow chains appear in the guide).
  - Timestamp lines such as `[0:00 - 0:10] Intro: …`.
  - Your own lyrics go under a `Lyrics:` header with tagged sections, and `(parentheses)` mark backing vocals or ad-libs.
  - Name a singer profile (Female Soprano, Female Alto, Male Tenor, Male Baritone, Weathered Rocker) plus BPM and key.
  - Prompt in the language you want sung.
  - Keep lyrics separate from musical direction.
  - Prototype on Clip, then render the final on 3.5.
  - [S] https://ai.google.dev/gemini-api/docs/lyria-prompt-guide · [S] https://ai.google.dev/gemini-api/docs/music-generation
- **Lyria RealTime (weighted prompts):**
  - Prompts are a list of `WeightedPrompt(text, weight)`. Any non-zero weight is allowed, and 1.0 is a typical start.
  - Blend styles by balancing weights, e.g. "ambient synth pads" at 0.8 and "lo-fi hip-hop drums" at 0.6.
  - Shift weights over time to transition between styles.
  - Keep instrument and mood tags as separate prompts so you can adjust each one.
  - [S] https://ai.google.dev/gemini-api/docs/lyria-prompt-guide
- The guide has no explicit negative-prompt syntax. [S] (same)

### 4.5 Google Flow Music (formerly Riffusion, then ProducerAI)
- **History:** Riffusion began as an open-source hobby project in Dec 2022. It relaunched as ProducerAI in Jul 2025 on its own model. Google acquired it on 24 Feb 2026 into Labs and DeepMind, then rebranded it Flow Music in Apr 2026. producer.ai redirects to flowmusic.app. [S3] https://www.musicbusinessworldwide.com/google-acquires-ai-music-platform-and-suno-challenger-producerai · [S3] https://fast.io/resources/producer-ai-review-2026/
- **Stack:** Lyria 3 Pro and now Lyria 3.5 for music, Gemini for the chat agent, Nano Banana for art, Veo and Gemini Omni for videos, with SynthID on everything. [S3] https://www.musicbusinessworldwide.com/googles-flow-music-adds-song-generation-editing-and-stem-splitting-to-spaces-its-vibe-coding-tool/ · [S3] https://pasqualepillitteri.it/en/news/9078/lyria-3-5-google-flow-music-en
- **Features:**
  - a conversational agent ("not … roll the slot machine")
  - Covers, which restyle a track while keeping its melody and structure (upgraded on Lyria 3.5)
  - section replace, extend, and rewriting or translating one section's lyrics
  - uploading your own beats and instrumentals (Jul 2026)
  - stem splitting
  - Spaces, a "vibe-coding" tool for custom instruments and music apps
  - lip-synced music videos (paid)
  - an iOS app (Android coming)
  - [S3] the MBW and pillitteri links above
- **Pricing:**
  - The site lists Free (daily top-up), Starter $6 (3,000 credits, ~600 songs), Plus $18 (10,000 credits) and Member $48 (30,000 credits), with 25% off yearly. That works out to roughly 5 credits per song [E from the ratio]. [S] https://flowmusic.app/pricing
  - The App Store listing shows tiers from $7.99 to $64 and credit packs at $5.99 per 1,000. [S3/U] https://pasqualepillitteri.it/en/news/9078/lyria-3-5-google-flow-music-en
  - One guide says the tiers map to Google AI Plus, Pro and Ultra. [S3] https://jackrighteous.com/blogs/music-creation-process-guide/google-flow-music-rights-commercial-use-2026
- **Downloads:** MP3, WAV and M4A, plus stem downloads. Which plan gets which is unclear. [S/U] https://flowmusic.app/pricing
- **Rights:** one guide says commercial rights come with paid tiers and that Google doesn't claim ownership of output. Free-tier rights are unclear. [S3/U] https://jackrighteous.com/blogs/music-creation-process-guide/google-flow-music-rights-commercial-use-2026
- **Distribution partner:** Believe offers Flow Music to its artists and to TuneCore users (May 2026). [S3] https://www.musicbusinessworldwide.com/googles-flow-music-adds-song-generation-editing-and-stem-splitting-to-spaces-its-vibe-coding-tool/

### 4.6 YouTube Dream Track, MusicFX, Music AI Sandbox
- **Dream Track** (Nov 2023) was a Shorts experiment with opted-in artist voices, built on Lyria. I found no 2026 status, though DeepMind's Lyria page still links to "Create an AI-generated soundtrack in Shorts". [S] https://blog.youtube/inside-youtube/ai-and-music-experiment/ · [S] https://deepmind.google/models/lyria/ · [U] whether the Dream Track brand still exists
- **MusicFX DJ** (Oct 2024) is a live, prompt-mixed generator, now powered by Lyria and Lyria RealTime. [S] https://deepmind.google/blog/new-generative-ai-tools-open-the-doors-of-music-creation/
- **Music AI Sandbox** is a set of tools for professionals. Google describes it as working with artist partners, and it is not publicly available. [S] (same) · [S3] https://www.musicbusinessworldwide.com/google-acquires-ai-music-platform-and-suno-challenger-producerai

### 4.7 Quality and legal
- **Leaderboard:** on the AA instrumental v1.1 board, Lyria 3 Pro scores 1080 and Lyria 3.5 1078, statistically tied with Mureka for 3rd–6th. [S] https://artificialanalysis.ai/music/leaderboard/instrumental
- **Lawsuit:** Kogon v. Google, a proposed class action by independent musicians filed 6 Mar 2026, says Lyria 3 was trained on YouTube uploads. Google moved to dismiss, arguing that YouTube's ToS license the use. A joint status report was filed 27 May 2026. [S3] https://www.musicbusinessworldwide.com/indie-artists-sue-google-claiming-it-used-youtubes-own-catalog-to-train-lyria-3-ai-music-tool · [S3] https://www.musicbusinessworldwide.com/google-moves-to-dismiss-indie-artists-lawsuit-over-lyria-3-ai-training-arguing-they-licensed-their-music-to-youtube/ · [S] https://chatgptiseatingtheworld.com/wp-content/uploads/2026/05/Joint-Initial-Status-Report-Kogon-v.-Google-May-27-2026.pdf
- **Google's position:** Lyria 3 Pro was built on materials Google and YouTube "have a right to use". [S3] MBW Flow Music article

**Use it when:** use Lyria API Clip or 3.5 for the cheapest full songs from an API at $0.04–0.08 each, or for image-to-song. Use Flow Music for agent-driven songwriting with covers, section replacement and stems. Use Lyria RealTime for live, interactive or adaptive music. [E]

---

## 5. Stability AI: Stable Audio

- **Models:**
  - Stable Audio 2.0 (Apr 2024, 3 min) and 2.5 (2025).
  - Stable Audio 3.0 (20 May 2026), a family of four:
    - Small SFX and Small: 459M parameters, up to 2 min, built for on-device use.
    - Medium: 1.4B parameters, up to 6:20.
    - Large: 2.7B parameters, API, fal.ai or enterprise only.
  - Small SFX, Small and Medium are open weights on Hugging Face.
  - [S3] https://musicbusinessworldwide.com/stability-ai-launches-new-audio-models-that-can-generate-6-minute-music-tracks · [S3] https://techcrunch.com/2026/05/20/stability-ai-release-a-new-audio-model-that-can-create-six-minute-songs/
- **Training data:** "fully licensed": 806,284 AudioSparx files plus Creative Commons audio from Freesound. [S3] MBW above. One blog reports an opt-out lawsuit over this. [U] https://blog.donweb.com/stable-audio-3-stability-ai-musica-ia/
- **Vocals:** "designed primarily for instrumental work… not intended to generate intelligible vocals". [S] https://stability.ai/guides/stable-audio-3-prompt-guide · [S3] https://blog.dubspot.com/stable-audio-3-review
- **Pricing (stableaudio.com):**

  | Plan | Price | Credits/month | Approx. full mixes |
  |---|---|---|---|
  | Free | $0 | 50 | ~12 (or ~8 multi-track) |
  | Solo | $12 | 660 | ~165 |
  | Session | $30 | 1,800 | ~450 |
  | Producer | $90 | 6,000 | ~1,500 |
  | Studio | $199 | 14,000 | ~3,500 |

  - That is about 4 credits per full mix and about 6 per multi-track generation [E from the ratios].
  - Paid plans allow any length up to 6 min.
  - Every plan, including Free, has a commercial licence.
  - Credits don't roll over.
  - Companies with more than $1M in revenue need an enterprise licence.
  - [S] https://stableaudio.com/pricing
- **Features:**
  - FULL MIX or MULTI-TRACK modes (multi-track is experimental) [S3] https://blog.dubspot.com/stable-audio-daw-plugin-2026
  - STEMS renders drums, bass, synth and so on for export to a DAW [S] https://kb.stability.ai/knowledge-base/getting-started-with-s
  - a DAW plugin [S] https://stableaudio.com/pricing
  - audio-to-audio [S] https://stableaudio.com/user-guide/audio-to-audio
  - inpainting and extend, plus LoRA fine-tuning for the open models [S3] MBW
- **Rights:** under the Community Licence "you own your outputs and can distribute and commercialize them freely". Above $1M ARR you need an enterprise licence, which includes indemnification. [S3] MBW
- **Label deals:** a UMG alliance (Oct 2025) and a WMG partnership (Nov 2025). [S3] MBW
- **Quality:** on the AA instrumental board, SA3 Large scores 1014, Medium 996, 2.5 984 and Small 946. [S] https://artificialanalysis.ai/music/leaderboard/instrumental

**Use it when:** you need instrumentals, loops, SFX or score beds with a commercial licence even on the free tier, or a licensed open-weight model you can run locally or fine-tune. Don't use it for sung songs. [E]

---

## 6. Mureka (Kunlun Tech / Skywork)

- **Models:**
  - API track: mureka-7 and o1 (29 Jul 2025, the "first thinking music reasoning model"), 7.5 (Sep 2025), 7.6 and o2 (Dec 2025), mureka-8 (2 Mar 2026), mureka-9 (9 Apr 2026). [S3, citing the official changelog] https://invideo.io/blog/mureka-ai-music-generator/
  - Consumer track: V8 (~Jan 2026), V9 (27 Mar 2026), **V9.5** (announced 31 Aug 2026, now the default). [S] https://www.wboc.com/online_features/press_releases/mureka-introduces-next-generation-ai-music-model-v9-5-advancing-toward-more-human-like-song/article_44e5f165-1aca-53fb-8556-1983a9410fa8.html · [S3] https://www.glbgpt.com/hub/mureka-ai-review/
  - V9.5 internal claims: lead vocals "convincing" in 61.0% of tests, 97.0% prompt adherence, 95.7% genre match. [S] press release
- **Reasoning approach:** MusiCoT ("Music Chain-of-Thought") plans the song structure before rendering audio. [S3] https://invideo.io/blog/mureka-ai-music-generator/
- **Pricing (subscribe page, yearly billing):**
  - Pro: $8 a month ($96 a year), 5,000 Gold, up to 500 songs. Includes V9.5, V9, V8, O2 and V7.6, unlimited MP3 downloads, full commercial rights (new and past songs), reference-track creation, remix, extend, editing a selected area of lyrics or melody, the Mureka Co agent, and music videos.
  - Premier: $24 a month ($288 a year), 20,000 Gold, up to 2,000 songs. Adds up to 12 stems, Mureka Studio, unlimited WAV, stem, MIDI and DAW-session downloads, "any voice can be the singer", and professional voice cloning.
  - That is about 10 Gold per song [E: 5,000 ÷ 500]. A third-party listing also says 10 credits per track and 330 s max for V7.6. [S3] https://www.tunee.ai/models/mureka-v7-6
  - [S] https://www.mureka.ai/subscribe (via r.jina.ai reader)
  - The August pricing quoted on invideo (Basic $8 for 400 songs, Pro $24 for 1,600) differs from the October page. [U] https://invideo.io/blog/mureka-ai-music-generator/
- **API:** 5- and 12-stem separation, a fine-tuning API, voice cloning, transcription, extend, remix, lyric videos, and image or video soundtracks. Instrumental generation has its own endpoint (`/v1/instrumental/generate`). [S3] https://invideo.io/blog/mureka-ai-music-generator/
- **Length:** no published maximum. In tests, V9 ignored a requested 90 s: songs ran 159–172 s and background music 189–241 s. [S3] https://www.glbgpt.com/hub/mureka-ai-review/
- **Lyrics syntax:** lyrics-first workflow with Suno-like bracket tags (`[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Bridge]`). [S3] https://hookgenius.app/learn/mureka-ai-review/
- **Rights:** "full commercial rights" on paid plans. Training provenance is undisclosed, and there are no rightsholder deals. [S] https://www.mureka.ai/subscribe · [S3] invideo above
- **Quality:**
  - AA vocal board: V9.5 is #3 at 1103 (+51 over V9). [S3] https://alphasignal.ai/news/artificial-analysis-music-arena-v1-1-crowns-suno-v6-across-1-000-harder-prompts
  - AA instrumental board: V9.5 scores 1084 and V9 1083. [S] https://artificialanalysis.ai/music/leaderboard/instrumental
  - One review rates the vocals 7.5/10, a bit artificial next to Suno. [S3] https://hookgenius.app/learn/mureka-ai-review/
  - Another found it produced "the greatest editing burden" because of length drift. [S3] glbgpt
- **Use it when:** you want the best non-Suno vocals on the blind leaderboards, MIDI and 12 stems for a DAW, and cheap volume. Avoid it when you need exact durations or licensed training provenance. [E]

---

## 7. Producer.ai (formerly Riffusion)

This is now Google Flow Music. See §4.5. The standalone Riffusion and ProducerAI brands are retired. [S3] https://fast.io/resources/producer-ai-review-2026/

---

## 8. Sonauto → Treblo (Melodia)

- **Rebrand:** Sonauto (YC-backed) is now called Treblo, and its developer site serves the "Melodia API". [S] https://sonauto.ai/developers · [S3] https://moge.ai/ja/product/treblo
- **Model:** Melodia v3, with an LLM-style architecture (v1 and v2 were latent diffusion). About 15 s to first audio, streaming output, 4,160 style tags, webhooks, several formats. [S] https://sonauto.ai/developers · [S3] https://aiwiki.ai/wiki/sonauto
- **API pricing:** 1,500 trial credits, Starter $11 (20,000 credits), Pro $88 (160,000), Scale from $330. [S] https://sonauto.ai/developers
- **Prompting:** a tag list plus a lyric box, Sonauto's long-standing pattern. [S3] https://www.hotnewhiphop.com/1004206-fenix-flexin-rubberz-exposed-ai-generated (cited only for the workflow description). Treblo also runs a public detector for its own output. [S3] https://www.aichatdaily.com/ai-analysis/treblo-s-own-detector-flags-rubberz-tyga-tracks
- **Quality:** Melodia v3 scores 986 on the AA instrumental board. [S] https://artificialanalysis.ai/music/leaderboard/instrumental
- **Unknown:** consumer plan prices, maximum length, rights and editing. [U]
- **Use it when:** you're building an app that needs fast, streaming vocal songs at low cost per generation. [E]

---

## 9. Tad AI

- **Pricing (monthly):**
  - Free: 21 credits (≈2 songs).
  - Standard: $7.99, 500 credits (≈50 songs, 3 at once).
  - Pro: $23.99, 2,000 credits (≈200 songs).
  - That is **10 credits per song**, and covers cost the same.
  - [S] https://tad.ai/pricing
- **Features:** music generation, AI covers, TTS, a vocal remover, a stem splitter, music videos, customisable duration, reference-audio upload (paid), lyric enhancement and premium voice models. All plans include a commercial-licence download. [S] (same)
- **Models:** its own "V3.0" with male or female vocal choice. [S3] https://www.toolmage.com/en/tool/tad-ai/. Reportedly it added Mureka v9 and Suno V5 on 30 May 2026, making it partly an aggregator. [S3/U] https://koubo.jp/article/83068
- **Maker:** HIX.AI. [S3] https://www.stork.ai/en/tad-ai
- **Quality:** no independent tests found. [U]
- **Use it when:** you want cheap songs plus covers, stems and video in one subscription. [E]

---

## 10. Boomy

- **Plans:**
  - Free: 25 saves, no downloads, no commercial use.
  - Creator: $9.99 (from $14.99), 500 saves, 25 WAV downloads a month, commercial use, DSP distribution.
  - Pro: $29.99 (from $39.99), unlimited saves, 250 WAV a month.
  - [S] https://boomy.com/pricing (via r.jina.ai)
- **Strength:** instant, low-effort tracks plus built-in distribution. The revenue split is unclear: 80/20 or a 20% fee. [S3/U] https://www.toolsforhumans.ai/ai-tools/boomy-ai · https://costbench.com/software/ai-music-generators/boomy
- **History:** Spotify pulled a batch of Boomy tracks in 2023 over artificial streaming. One source says it's resolved. [S3/U] https://www.toolsforhumans.ai/ai-tools/boomy-ai
- **Unknown:** the current model version and maximum length. [U]
- **Use it when:** you want a quick, generic track and one-click distribution, and fine control doesn't matter. [E]

---

## 11. SOUNDRAW

- **Plans:**
  - Creator: $16.99 ($11.04 yearly), for background-music use, unlimited downloads.
  - Artist Starter: $29.99 ($19.49 yearly), 10 downloads, DSP distribution.
  - Artist Pro: $35.99 ($23.39 yearly), 20 downloads, MP3, WAV and stems.
  - Artist Unlimited: $50 ($32.50 yearly).
  - Enterprise: for companies with 10+ employees.
  - All plans allow commercial use and "distribute & monetize songs".
  - [S] https://soundraw.io/pricing
- **Model:** v2 (Jan 2025), focused on genre mixing and quality. [S3] https://macaubusiness.com/soundraw-launches-v2-ushering-in-a-new-era-of-ai-driven-music-creation/
- **Vocals:** none. Instrumental only, with a "template-based approach". [S3] https://eesel.ai/blog/suno-alternatives
- **Editing:** block-by-block energy, instruments, length and tempo. This is known from past versions and not re-verified for 2026. [E/U]
- **Use it when:** you need beats or background beds you can tweak and release, with clear rights. [E]

---

## 12. AIVA

- **Plans:**

  | Plan | Price | Downloads/mo | Max length | Formats | Copyright |
  |---|---|---|---|---|---|
  | Free | €0 | 3 | 3 min | MP3, MIDI | AIVA owns; non-commercial; credit AIVA |
  | Standard | €11/mo yearly + VAT | 15 | 5 min | MP3, MIDI | AIVA owns; monetise only on YouTube, Twitch, TikTok, Instagram |
  | Pro | €33/mo yearly + VAT | 300 | 5:30 | All formats incl. WAV | You own it; full monetisation |

  [S] https://www.aiva.ai/pricing
- **Features:** 250+ styles, custom style models, audio or MIDI "influence" upload, track editing, "download in any file format". Stems aren't listed. [S] https://www.aiva.ai/pricing
- **Vocals:** none. [E]
- **Strength:** classical, orchestral and cinematic. [S3] https://eesel.ai/blog/suno-alternatives
- **Use it when:** you need an editable MIDI score for film or game work. [E]

---

## 13. Beatoven.ai

- **Model:** Maestro (Aug 2025), "fully licensed and fairly trained". It was trained with Rightsify, Soundtrack Loops, Symphonic, Pro Sound Effects and others, and artists get ongoing royalties via Musical AI attribution. It is instrumental at launch, with vocals and SFX planned. There is now a Maestro SFX model. [S3] https://www.musicbusinessworldwide.com/beatoven-ai-launches-fully-licensed-music-ai-model-with-artist-payouts · [S] https://www.beatoven.ai/
- **Output and licence:** MP3 or WAV, pay per track or subscribe, with a monetisation licence emailed with each download. [S] https://www.beatoven.ai/
- **Pricing:** the official page returned 404. Third parties disagree (Creator $10, Visionary $20, PAYG $3 per download-minute). [U] https://costbench.com/software/ai-music-apis/beatoven-ai/
- **API:** also offered via fal.ai. [S3] same
- **Use it when:** you want ethically licensed background music for video or podcasts. [E]

---

## 14. Loudly

- **Model:** VEGA-2, in-house, launched 12 Mar 2026. [S3] https://www.loudly.com/?p=7840
- **Positioning:** royalty-free and trained on a consent-based dataset (company claim). [S3] https://costbench.com/software/ai-music-generators/loudly/
- **Pricing:** conflicting. Personal $14.99 and Pro $39.99 per CostBench, or Basic $10 and Pro $25 per ToolRadar. [U] https://costbench.com/software/ai-music-generators/loudly/ · https://toolradar.com/tools/loudly/pricing
- **Rights:** a reviewer complains that paid plans don't grant ownership. [S3/U] costbench
- **Use it when:** you want royalty-free instrumental beds with stems and API access. [E]

---

## 15. Mubert

- **Plans:**
  - Ambassador (free): 25 tracks, MP3, watermark, attribution.
  - Creator: $14 ($11.69 yearly), **non-commercial**, 500 generations, up to 25 min, WAV.
  - Pro: $39 ($32.49 yearly), commercial use, monetised channels, digital ads.
  - Business: $199 ($149.29 yearly), client and agency work, apps, sub-licensing.
  - **No plan** allows DSP publishing or Content ID registration.
  - [S] https://mubert.com/render/pricing
- **Models and tools:** Render AI v2 (AI Music Chat) and AI v1 (text-to-music, image-to-music, mood/genre/BPM). Pro adds a full editor: structure, add or remove sections, regenerate sections, per-section stems, BPM and key. [S] same
- **API:** a new engine (Jul 2026) with stem swapping, streaming and tracks up to 2 h. That figure is vendor-submitted. [S3/U] https://hunted.space/product/mubert
- **Use it when:** you need long ambient or electronic beds for streams, apps or games. Not for releasing songs. [E]

---

## 16. MiniMax Music

- **Versions:** Music-1.5 (Jun 2025), Music 2.0, 2.5 (~28 Jan 2026), 2.6 (Apr 2026), **3.0** (API on 16 Jul 2026, open weights on 13 Aug 2026). [S3] https://rits.shanghai.nyu.edu/ai/minimax-opens-music-3-0-weights-no-territorial-carve-out-this-time/ · [S3] https://macaron.im/blog/minimax-music-2-5-guide
- **Music 3.0:**
  - ~11.1B parameters: an 8B global LLM initialised from Qwen3-8B, a 0.6B local LLM, 2.4B flow matching and a Flow-VAE.
  - Five-minute songs output as 32 kHz 16-bit stereo WAV.
  - Needs 24 GB+ of VRAM, or 8 GB with layer streaming.
  - On Hugging Face, GitHub and ModelScope, with ComfyUI support.
  - [S] https://huggingface.co/MiniMaxAI/MiniMax-Music3 · [S3] rits link above
- **Prompting:**
  - Lyrics take tags `[Intro] [Verse] [Pre-Chorus] [Chorus] [Post-Chorus] [Bridge] [Instrumental] [Solo] [Outro]` (plus `[Hook]` per one source).
  - The recommended "Structured Caption" has three parts. Global Metadata covers genre, BPM, key, emotional arc and production. Vocal Details covers gender, timbre, harmony and effects such as Auto-Tune. Arrangement covers which instruments enter and leave by section.
  - [S] https://huggingface.co/MiniMaxAI/MiniMax-Music3
- **Hosted API:**
  - Lyrics of 10–1,000 characters, an `is_instrumental` flag, and MP3 at 44.1 kHz.
  - $0.15 per generation of up to 5 min, at 120 RPM. A `music-3.0-free` variant runs at 3 RPM.
  - [S3] rits link · [S3] https://aireiter.com/blog/minimax-music-3-0-review-api-pricing-local-setup
  - Other sources give other lyric limits (up to 3,000 or 3,500 characters) and prices ($0.09–0.20). [U]
  - A separate cover model takes reference audio from 6 s to 6 min. [S3/U] https://aireiter.com/blog/minimax-music-3-0-review-api-pricing-local-setup
- **Licence:**
  - The MiniMax-Music3 Community License (6 Aug 2026) is permissive, but companies with more than $20M in yearly revenue need written authorisation.
  - No territorial carve-out, unlike MiniMax's H3 video licence.
  - The acceptable-use policy requires you to "clearly and prominently" disclose that publicly distributed content is AI-generated.
  - [S3] rits link
- **Quality:**
  - The 1000 anchor on both AA boards and the top open-weights model (#11 vocal, #13 instrumental).
  - MiniMax 2.5+ scores 1007 and 2.6 scores 1001.
  - No vendor listening test has been published.
  - [S3] https://alphasignal.ai/news/artificial-analysis-music-arena-v1-1-crowns-suno-v6-across-1-000-harder-prompts · [S] https://artificialanalysis.ai/music/leaderboard/instrumental
- **Use it when:** you want an open-weight model for full vocal songs that you can self-host, or a $0.15-per-song API. [E]

---

## 17. Open models (MusicGen/AudioCraft, YuE, ACE-Step, DiffRhythm, SongBloom, LeVo, HeartMuLa, YuE2)

- **Meta MusicGen / AudioCraft:** MIT code, but **CC-BY-NC 4.0 weights**, so non-commercial use only. No 2026 release. Lowest on the AA board (868). [S3] https://replicate.com/meta/musicgen/readme · [S] https://artificialanalysis.ai/music/leaderboard/instrumental
- **ACE-Step 1.5** (ACE Studio and StepFun, 28 Jan 2026):
  - MIT licence.
  - A Qwen-based planner LM (0.6B, 1.7B or 4B) plus a DiT.
  - 10 s to 10 min, under 2 s per song on an A100 and under 10 s on an RTX 3090, under 4 GB of VRAM.
  - LoRA from a few songs, cover, repaint, vocal-to-BGM, 50+ languages, up to 8 songs per batch.
  - The **XL** series with a 4B DiT arrived 2 Apr 2026 (12 GB+ VRAM).
  - Free hosted version at acemusic.ai.
  - [S] https://github.com/ace-step/ACE-Step-1.5
  - One wiki lists the licence as Apache-2.0. [U] https://comfyui-wiki.com/en/models/ace-step/ace-step-v1-5
- **YuE2-3B** (M-A-P, Sep 2026):
  - Generates an editable ABC score (melody and chords) and then renders it.
  - Agentic editing, covers, 48 kHz stereo on a 24 GB GPU.
  - Claims that best-of-8 beats Suno v5 and v6 on the WildSongBench SongBench average (6.96 vs 6.87 and 6.56). These are self-reported, and matching Suno v5 takes 8× the compute.
  - [S] https://huggingface.co/m-a-p/YuE2-3B · [S3] https://mer.vin/news/yue2-3b-claims-it-beats-suno-v6-on-open-music-generation/
  - Licence not captured. [U]
- **Vendor-run open-model benchmark (YuE2 card):**

  | Model | SongBench avg | Musicality | PER |
  |---|---|---|---|
  | YuE2 | 6.73 | 5.91 | 8.44% |
  | LeVo 2 | 6.32 | — | 26.1% |
  | HeartMuLa | 6.25 | — | 10.7% |
  | ACE-Step 1.5 | 6.01 | — | 7.5% |
  | DiffRhythm 2 | 5.24 | — | 18.4% |
  | YuE 1 | 4.92 | — | 36.4% |
  | SongBloom | 4.24 | — | 19.2% |

  [S3, vendor numbers] https://huggingface.co/M-A-P/YuE2-3B
  - PER is phoneme error rate, i.e. lyric intelligibility. Lower is better. [E]
- **HeartMuLa:** a family of music foundation models. Technical report on arXiv, Jan 2026. [S] https://arxiv.org/pdf/2601.10547v2
- **DiffRhythm 2 / SongBloom / LeVo 2:** only the benchmark rows above. Licences and status not verified. [U]
- **Stable Audio 3 (open variants)** and **MiniMax Music 3.0**: see §5 and §16.
- **Magenta RealTime:** Google's open-weight real-time model. [S] https://deepmind.google/models/lyria/

**Use it when:**
- ACE-Step: free, fast, local vocal songs.
- YuE2: editable melody and chords.
- MiniMax 3.0: best open quality per AA, if you have the VRAM.
- Stable Audio 3 Medium: licensed open instrumentals.
- MusicGen: research only.

[E]

---

## 18. Leonardo.ai audio (Music v1, Seed Audio 1.0)

- **Music v1** is text-to-music producing 1–10 minute tracks, with vocals or instrumental only. **Seed Audio 1.0** is text-to-speech for voiceover (pace, pitch, volume, and audio or image references). Both sit next to the video models (Seedance 2.5, Kling 3.0 Turbo, MiniMax H3, FLUX 3 Video). [S] https://leonardo.ai/ai-music-generator
- **API (per a third party):** whole-minute durations from 1 to 10, 1–4 outputs, prompts up to 9,999 characters, and `force_instrumental`. [S3] https://jackrighteous.com/pages/leonardo-ai-music-generation-guide
- **Pricing:** 150 daily free tokens, paid from $10 a month yearly. [S3] same
- **Who makes Music v1:** not disclosed. The 1–10 minute range and the `force_instrumental` flag match ElevenLabs' Music API (3 s–10 min, `force_instrumental`), so Music v1 may be a white-label ElevenLabs model. This is unconfirmed. [E/U]. "Seed Audio" naming suggests ByteDance Seed. [E/U]
- **Use it when:** you already make video in Leonardo and want a soundtrack in the same workspace. [E]

---

## 19. Aggregators and other 2026 entrants

- **Kling (Kuaishou):** Kling 2.6 (late 2025) and 3.0 (Feb 2026) generate native audio, including singing and rap, alongside video. There is no standalone music model. [S3] https://macaubusiness.com/kling-ai-launches-video-2-6-with-native-audio-generation-redefining-the-ai-video-creation-workflow/ · [S3] https://morphic.com/kr/ai-glossary/kling-26
- **Aggregators that host music models:**
  - invideo hosts Mureka 9, 9 Instrumental and 7.5 [S3] https://invideo.io/blog/mureka-ai-music-generator/
  - fal.ai hosts ElevenLabs Music, Stable Audio 3 Large and Beatoven [S3] https://fal.ai/learn/devs/elevenlabs-music-user-guide · MBW SA3
  - Higgsfield bills itself as an all-in-one image, video and music platform [S3] https://pasqualepillitteri.it/en/news/677/higgsfield-ai-video-guide
  - MindStudio, Pika's dev API, MuAPI and Tunee [S3] links in §16 and §6
  - Tad AI reportedly hosts Mureka and Suno [S3/U] §9
  - Freepik Tunes (Nov 2024) is a music and voiceover tool [S3] https://alternativeto.net/news/2024/11/freepik-launches-freepik-tunes-an-ai-music-and-voiceover-tool-to-compete-with-suno-ai
- **Napster AI** (relaunched 28 Jan 2026): you make songs by chatting with genre-specific virtual "producers" that remember your style. It runs on iOS, Android, Mac and web, reportedly for $19 a month. Since Sep 2026, Napster's focus has moved to its AI-agent and hardware products. [S3] https://www.digitalmusicnews.com/2026/01/28/napster-ai-music-creation-rollout/ · [S3] https://pasqualepillitteri.it/en/news/22601/how-napster-ai-works-ai-music-app · [U] pricing
- **ElevenMusic iOS app** (1 Apr 2026) and **Flow Music iOS** (Jul 2026): music generation is moving onto phones. [S3] MBW §3 · pillitteri §4.5

---

## 20. How prompting differs by platform

| Platform | Input model | Structure control | Lyrics syntax | Distinctive controls |
|---|---|---|---|---|
| Udio | Free-text prompt plus tags; **Manual Mode** = exact tags only | Clip-by-clip: generate 32/130 s, then Extend with **clip start %** (0% = intro) and a context window | `[Chorus]`, `[Scream]`, `[Guitar Solo]`; `(backing vocals)`; hyphenated syllables for pronunciation | Seed, prompt strength, lyrics strength, clarity, quality-speed slider, negative prompt, Style Reduction, Styles blend |
| ElevenLabs | Natural-language prompt **or** a JSON **composition plan** (never both) | Per-section `duration_ms` (always enforced in v2+), chunk order, `context_adherence` | Section tag plus lyrics in each chunk's `text`; time cues ("lyrics begin at 15 s") | `positive_styles` / `negative_styles` per section; a free `/music/plan` drafter; Audio Reference; finetunes; seed |
| Lyria 3.5 (API/Gemini) | One text prompt plus up to 10 images | Section tags in arrow chains; **timestamp lines** `[0:00 - 0:10] …`; length stated in the prompt | `Lyrics:` header, then `[Verse 1]` etc.; `(ad-libs)` | Singer profiles, BPM/key; single-turn only |
| Lyria RealTime | **Weighted prompts** `WeightedPrompt(text, weight)` | Change weights over time to transition | — (instrumental stream) | Live blending of several prompts |
| Flow Music | **Chat with an agent**, plus uploaded audio | Agent-guided section replace or extend; Covers | Lyria tags under the hood [E] | Spaces (custom instruments and apps) |
| Mureka | Lyrics-first; a style prompt or reference track | Model plans structure (MusiCoT); weak duration adherence | `[Verse]` `[Pre-Chorus]` `[Chorus]` `[Bridge]` | Edit a selected area, reference track, voice clone, Mureka Co agent |
| MiniMax 3.0 | Lyrics plus a **three-part structured caption** | Instruments entering and leaving per section, described in the caption | `[Intro]`…`[Post-Chorus]` `[Instrumental]` `[Solo]` `[Outro]` | Vocal effects (Auto-Tune, delay) and harmony set in the caption |
| Treblo (Sonauto) | Prompt plus a **tag vocabulary** (4,160 tags) plus a lyric box | [U] | [U] | Streaming output |
| Stable Audio 3 | Descriptive prompt (instrumental) | Length per second; inpainting | none (no vocals) | FULL MIX / MULTI-TRACK modes, audio-to-audio |
| Mubert / Soundraw / Beatoven / AIVA | Mood, genre, BPM pickers plus short text | Block or section editors | none | Key/BPM changes (Mubert), MIDI (AIVA) |

Sources: the per-platform sections above.

[E] **Practical rules of thumb:**
1. Udio rewards short, tag-like prompts and building songs in pieces.
2. ElevenLabs rewards treating a song as a timeline of sections, each with its own include and exclude styles.
3. Lyria rewards one rich prompt with timestamps and a vocal profile, since nothing can be edited afterwards through the API.
4. Mureka and MiniMax reward writing the lyrics first with full tag scaffolding.
5. Artist names are blocked or neutered on ElevenLabs, Lyria, and in Udio's voice copying. Describe sonic traits instead.

---

## 21. Public leaderboards and blind tests

1. **Artificial Analysis Music Arena v1.1** is the most current.
   - It uses 1,000 new prompts across 17 genres, split evenly between vocal and instrumental. Launch votes came only from a recruited blind panel (37k+ votes), and public votes no longer count. No lyrics are supplied, so models write their own.
   - [S3] https://alphasignal.ai/news/artificial-analysis-music-arena-v1-1-crowns-suno-v6-across-1-000-harder-prompts · [S] https://artificialanalysis.ai/music/methodology
   - **Instrumental (live page):**

     | Rank | Model | Elo |
     |---|---|---|
     | 1 | Suno v6 | 1148 |
     | 2 | Suno v6-mini | 1114 |
     | 3 | Mureka V9.5 | 1084 |
     | 4 | Mureka V9 | 1083 |
     | 5 | Lyria 3 Pro | 1080 |
     | 6 | Lyria 3.5 | 1078 |
     | 7 | Eleven Music | 1021 |
     | 8 | Stable Audio 3 Large | 1014 |
     | 9 | Eleven Music v2 | 1011 |
     | 10 | MiniMax 2.5+ | 1007 |
     | 11 | Eleven Music v2.5 | 1001 |
     | 12 | MiniMax 2.6 | 1001 |
     | 13 | MiniMax 3.0 (anchor) | 1000 |
     | 14 | Stable Audio 3 Medium | 996 |
     | 15 | Melodia v3 | 986 |
     | 16 | Stable Audio 2.5 | 984 |
     | 17 | Stable Audio 3 Small | 946 |
     | 18 | Lyria 2 | 926 |
     | 19 | MusicGen | 868 |

     [S] https://artificialanalysis.ai/music/leaderboard/instrumental
   - **Vocal (launch snapshot):** Suno v6 1142, Suno v6-mini 1116, Mureka V9.5 1103, and MiniMax 3.0 at #11 (1000). The full vocal page didn't load. [S3] alphasignal link · [U] full vocal ranks
   - **Caveats:** one Elo number mixes adherence, composition, performance, mix quality and taste. It leaves out price, editing, stems and licensing. Udio isn't ranked. [S3] alphasignal
2. **Music Arena** (CMU, LMArena and Sony AI; NeurIPS 2025) is a live, academic pairwise arena that releases its preference data. [S] https://arxiv.org/html/2507.20900v2
3. **Vendor and other benchmarks:** ElevenLabs' internal blind test (v2.5 vs v2, 47,885 pairs) [S3] MBW. WildSongBench / SongBench (YuE2) [S] HF card. A Pixazo board scored by an automatic-model ensemble ranks Lyria 3 first. It is weak evidence. [S3] https://www.pixazo.ai/blog/ai-audio-generation-models-comparison
4. **YuE2 blind listening arena:** an open call for votes. [S] https://huggingface.co/m-a-p/YuE2-3B

---

## 22. Legal and licensing landscape (2024–2026), by platform

| Platform | Litigation | Licensing deals | Training-data claim | Output rights |
|---|---|---|---|---|
| **Udio** | UMG settled 29 Oct 2025; WMG settled 19 Nov 2025; **Sony active**: 2024 case plus a second suit on 20 Jul 2026 over 30,117 works (~$4.5B) | UMG, WMG, Merlin (Jan 2026), Kobalt (Apr 2026), Believe | Next platform is "trained on licensed and authorized music" | Legacy app: no export; Starstruck: the rights holder owns output |
| **ElevenLabs** | None found | Merlin, Kobalt, Believe; **UMG (10 Sep 2026)** for a separate fan platform | "Built in partnership with artists, labels, and publishers"; no UMG data in v2.5 | Users own output (blog); tier caveats (ElevenMusic) |
| **Google Lyria / Flow** | **Kogon v. Google** (6 Mar 2026), motion to dismiss pending | Believe/TuneCore distribution partnership (Flow) | "Right to use" via YouTube ToS and partner agreements | Paid Flow tiers get commercial rights [S3]; Gemini app unclear |
| **Stability** | Music: an opt-out suit reported [U]. Images: Andersen trial Sep 2026; Getty UK largely lost by Getty | UMG (Oct 2025), WMG (Nov 2025); AudioSparx data | "Fully licensed" (AudioSparx plus Freesound CC) | You own outputs; enterprise licence over $1M with indemnity |
| **Mureka** | None found | None disclosed | Undisclosed | Full commercial rights (contractual) |
| **MiniMax** | None found (music) | — | Undisclosed | Community licence; disclosure duty in the AUP |
| **Beatoven** | — | Rightsify, Soundtrack Loops, Symphonic, Pro Sound Effects, etc.; Fairly Trained endorsement | Fully licensed, with royalty attribution | Licence per download |
| **Suno (context)** | WMG settled 25 Nov 2025; UMG and Sony still suing in Boston (Sony dispositive motions Apr 2027); **GEMA won in Munich on 31 Jul 2026** (injunction, damages, not yet final) | WMG (licensed models in 2026; free tier can't download), BMG, Believe | Licensed v6 (Sep 2026) | ToS: "no representation… that any copyright will vest" |

Sources:
- Udio: §2 links.
- ElevenLabs: https://musicbusinessworldwide.com/elevenlabs-launched-music-v2-5-shortly-after-announcing-its-umg-licensing-deal · https://elevenlabs.io/blog/introducing-music-v2
- Google: §4.7 links.
- Stability: https://musicbusinessworldwide.com/stability-ai-launches-new-audio-models-that-can-generate-6-minute-music-tracks · https://blog.donweb.com/stable-audio-3-stability-ai-musica-ia/
- Beatoven: https://www.musicbusinessworldwide.com/beatoven-ai-launches-fully-licensed-music-ai-model-with-artist-payouts
- Suno context: https://www.musicbusinessworldwide.com/warner-music-group-settles-with-suno/ · https://musicbusinessworldwide.com/suno-infringed-copyright-in-gema-case-german-court-rules · https://thenextweb.com/news/suno-v6-warner-bmg-believe-licensed-models · https://jackrighteous.com/es-us/blogs/guides-using-suno-ai-music-creation/suno-faces-a-major-july-31-court-ruling (Sony/Suno schedule) · MBW v2.5 article (Suno ToS quote).

[E] **Trends:**
1. Major labels now license some platforms and keep suing others. UMG licenses Udio, Stability and ElevenLabs while suing Suno. Sony has licensed none of the companies covered here and is suing both Udio and Suno.
2. Licensed products often trade away ownership or export (Udio Starstruck; Suno free tier).
3. Europe (the GEMA ruling) treats training as reproduction, which weakens the text-and-data-mining defence for models with EU exposure.
4. The cleanest-provenance options are Stable Audio 3, Beatoven Maestro and ElevenLabs. The strongest unlicensed-provenance performers are Mureka and the open Chinese models.

---

## 23. Typical iterations to a keeper (sparse data)

- **Udio:** "at least 10 generations, usually more" just to find a starting point. Extreme cases run to hundreds of generations per kept song. [S3/U] §2.4 links
- **Mureka:** length drift means you either pick from several takes or edit afterwards. [S3] https://www.glbgpt.com/hub/mureka-ai-review/
- **ElevenLabs:** reviewers frame section inpainting as "the difference between editing and gambling", so you need fewer full rerolls. [S3] https://www.buildfastwithai.com/blogs/elevenlabs-music-v2-review-2026 (via search snippet)
- **ElevenLabs v2.5:** users downloaded v2.5 tracks more often than v2 tracks, which suggests a higher keep rate. [S3] MBW v2.5 article
- **YuE2:** its headline results use best-of-8, a built-in 8× sampling budget. [S] https://huggingface.co/m-a-p/YuE2-3B
- No platform publishes a keep rate. [U]

---

## Conflicts

1. **ElevenLabs v2.5 vs v2 quality.** ElevenLabs' blind test says v2.5 beat v2. The AA instrumental board ranks v2.5 (1001) below v2 (1011) and v1 (1021), though within confidence intervals. Possible reasons: ElevenLabs' advantage was strongest on vocal genres, and AA uses unsupplied lyrics and harder prompts. [S3/S]
2. **ElevenLabs ownership wording.** The ElevenLabs blog says "you own what you make… including Free", with credit required for commercial use on Free. The ElevenMusic blog says "you have rights… vary by subscription tier". Pricing allows Free commercial use with credit. [S3/S]
3. **ElevenLabs inpainting on the API.** One blog says it's Enterprise-only. The docs describe `store_for_inpainting` and an Inpainting API without a tier restriction. [S3/S]
4. **Flow Music pricing.** The website lists $6, $18 and $48. The App Store lists $7.99 to $64 plus packs at $5.99 per 1,000 credits. Possibly different regions or AI-plan bundles. [S/S3]
5. **Mureka plans.** Invideo (Aug 2026) lists Basic $8 for 400 songs and Pro $24 for 1,600. The live subscribe page (Oct 2026) lists Pro $8 yearly with 5,000 Gold (≈500 songs) and Premier $24 yearly with 20,000 Gold (≈2,000 songs). The plans were probably renamed and resized. [S3/S]
6. **Mureka model naming.** Consumer V-numbers (V8 Jan, V9 Mar 27, V9.5 Aug) don't line up with API model dates (mureka-8 Mar 2, mureka-9 Apr 9). [S3]
7. **MiniMax 3.0 API.** Prices of $0.15 (most sources), $0.09 (Pika) and $0.20 (MuAPI). Lyric limits of 1,000, 3,000 or 3,500 characters. One source says the weights weren't present on day one. [S3]
8. **ACE-Step licence.** MIT per GitHub, Apache-2.0 per a ComfyUI wiki. [S/S3]
9. **Udio new-platform timing.** "Q2 2026" in one source, "later this year" in others. Not confirmed launched by 31 Oct 2026. [S3]
10. **Lyria length.** The API docs say "a couple of minutes". DeepMind and Gemini help say up to about 3 min or 2–3 min. [S]
11. **Loudly and Beatoven pricing.** Aggregators disagree, and the official pages couldn't be fetched. [S3]
12. **Mubert maximum length.** Render goes to 25 min. The API launch page claims 2 h. [S/S3]

## Gaps

- **Udio:** whether Starstruck launched in Sep or Oct 2026; whether legacy Udio will ever get new models (v2?) or be shut down; the exact Starstruck pricing.
- **AA vocal leaderboard:** full rankings beyond the top 3 and MiniMax (the page wouldn't load).
- **ElevenLabs:** dollar price per music minute on the API after the cut; whether the 6-stem split is priced like the others; MIDI export (none found).
- **Gemini app:** daily caps for Lyria 3.5 per plan; commercial-use terms for its output.
- **Flow Music:** which plans include WAV and stem downloads; maximum length; official commercial terms (only a third party read them).
- **Stable Audio:** whether the plugin and app outputs are WAV at 44.1 or 48 kHz.
- **Mureka:** official maximum length; the formal API changelog entry for V9.5.
- **Treblo/Sonauto:** consumer pricing, maximum length, rights, the exact rebrand date.
- **Tad AI:** independent quality tests; confirmation that it hosts Mureka and Suno models.
- **Boomy, Loudly, Beatoven, AIVA, Soundraw:** current model versions and maximum lengths; official 2026 pricing for Loudly and Beatoven.
- **Leonardo Music v1:** who makes the underlying model (I suspect ElevenLabs, unverified).
- **Open models:** licences and 2026 status for YuE2, DiffRhythm 2, SongBloom, LeVo 2 and HeartMuLa. There is no independent listening test of the open models beyond AA's MiniMax and Stable Audio entries.
- **YouTube Dream Track:** current status and branding in 2026.
- **Kling:** whether it offers standalone music generation (none found).
- **Keep rates:** no platform or study publishes a typical number of iterations to a keeper.
