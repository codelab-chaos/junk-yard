# Suno: research log

Checked: 2026-10-31

Scope: Suno as it stands at the end of October 2026: models, plans, every creation and editing feature, lyric meta tags, style prompting, failure modes, iteration workflow, stems, rights and distribution.

## Legend

- **[S]**: sourced from Suno itself (suno.com, help.suno.com, the Suno blog or release notes), with a URL.
- **[S3]**: third-party source (press, a community guide, a creator blog or a Reddit report via a secondary page), with a URL.
- **[E]**: my inference, from combining sources or from long-standing behaviour.
- **[U]**: unknown, or the sources conflict.

Note on sourcing: Reddit itself could not be fetched directly. Reddit claims below come through secondary pages that quote or link the threads, and are marked [S3]. Several guide sites sell prompt tools. They are marked as such where it matters.

---

## 1. Models, plans, credits and pricing

### 1.1 Model timeline

| Date | Model / event | Notes | Source |
|---|---|---|---|
| 2024-11-19 | v4 | Better audio, lyrics and structure | [S] https://suno.com/blog |
| 2025-05-01 | v4.5 | Pro/Premier. Better genres and mashups, songs up to 8 minutes, a prompt-enhancement helper, better Covers and Personas, "reduces both audio degradation and shimmer effects" | [S] https://suno.com/blog/introducing-v4-5 |
| 2025-06-03 | Song Editor, 12-stem split, 8-minute uploads, creative sliders | Pro/Premier | [S] https://suno.com/release-notes |
| 2025-09-23 | v5 | "Clearer audio, more natural vocals, more control"; Remaster with a variation setting | [S] https://suno.com/release-notes |
| 2025-09-25 | Suno Studio (DAW) | Premier only | [S] https://suno.com/release-notes |
| 2025-10-21 | v4.5-all | Free model for all users | [S] https://suno.com/release-notes |
| 2025-11-25 | Warner Music Group settlement and partnership | | [S] https://suno.com/blog (post "A new chapter in music creation"); [S3] https://www.musicweek.com/labels/read/warner-music-group-settles-lawsuit-and-signs-ai-licensing-deal-with-suno/093129 |
| 2026-01-20 / 01-27 | Mashup, Sample; Sounds (one-shots and loops, Pro/Premier) | | [S] https://suno.com/release-notes |
| 2026-03-26 | v5.5, plus Voices, Custom Models and My Taste | | [S] https://suno.com/blog/v5-5 |
| 2026-06-11 | Rebuilt stem separation (Auto Split, Split from Mix, Advanced Split) | | [S] https://suno.com/blog/stem-separation-updates |
| 2026-08-12 | BMG partnership | | [S] https://suno.com/blog (post "Announcing a Landmark Global Partnership with BMG") |
| 2026-08-13 | Studio 2.0 (MIDI, effects, wavetable synth, chat bar) | Premier | [S] https://help.suno.com/en/articles/13670529 |
| 2026-09-03 | Download caps and new Terms of Service take effect | | [S] https://suno.com/blog/suno-updates-tos |
| 2026-09-08 | Believe and TuneCore partnership | | [S] https://suno.com/blog/believe-partnership |
| **2026-09-09** | **v6 family: v6, v6-wild, v6-mini. All earlier models retired.** | Built with WMG, BMG and Believe | [S] https://suno.com/blog/introducing-v6 |
| 2026-09-17 | Studio MIDI improvements | | [S] https://suno.com/release-notes |
| 2026-10-01 | Speech (beta): spoken voice and music generated together | Open to everyone | [S] https://suno.com/blog/introducing-speech-beta |
| 2026-10-05 | Albums | | [S] https://suno.com/release-notes |
| 2026-10-15 | Shareable Workspaces (Pro/Premier); shareable custom models (Premier) | | [S] https://suno.com/release-notes |
| 2026-10-28 | Suno MCP (beta): create from Claude, ChatGPT and other MCP clients | All plans, uses credits | [S] https://suno.com/release-notes |
| 2026-10-29 | Studio: Clip Settings sidebar, auto-stretch, fine pitch, show/hide tracks | | [S] https://suno.com/release-notes |

### 1.2 The v6 family (current)

| Model | Who gets it | Suno's description | Source |
|---|---|---|---|
| v6 | Pro and Premier | Flagship: "reliable, precise and consistently delivers polished music across every genre and style" | [S] https://help.suno.com/en/articles/13924481 |
| v6-wild | Pro and Premier | "Built for exploration… less predictable and more varied"; for ideas you then refine in v6 | [S] same |
| v6-mini | Everyone, including Free | "A faster, more efficient version"; Free's best model | [S] https://help.suno.com/en/articles/13924737 |
| Custom Models | Pro and Premier | Fine-tuned on your own uploads; v5.5 custom models were upgraded to v6 automatically | [S] https://help.suno.com/en/articles/11362497, https://help.suno.com/en/articles/13924481 |

- All three variants generate up to **8 minutes** in one go [S] https://help.suno.com/en/articles/13924929.
- **Every model before v6 is retired for new generations.** Old songs stay playable and can be shared, remastered and covered, but any new output uses v6 [S] https://help.suno.com/en/articles/13924481. A tester confirmed the picker shows only the v6 models, and that the "Create Custom Model (Beta)" entry costs 100 credits [S3] https://hookgenius.app/learn/suno-v6-guide/.
- **What v6 adds** [S] https://suno.com/blog/introducing-v6:
  - Edit one section in plain language ("Change the chorus so it's sung by a gospel choir").
  - Mashups from several sources in one request.
  - "Sample the riff at 0:45, isolate the guitar, build a beat around it."
  - Create from text, audio, images and video.
  - Change a single lyric without rebuilding the song.
  - Simple mode "figures out the workflow" (Cover, Extend and so on) for you.
- **Training data:** Suno says v6 was "not trained using the data it used to train previous versions" [S3] https://techcrunch.com/2026/09/09/suno-replaces-its-ai-models-with-a-new-one-trained-on-licensed-music-as-copyright-suits-pile-up/. Its CPO said it was "trained entirely from scratch" on data that excludes Universal and Sony [S3] https://www.musicbusinessworldwide.com/universal-and-sony-sue-suno-for-a-second-time-claiming-platforms-v6-models-are-the-fruit-of-the-same-poisoned-tree/. The labels dispute this (see section 7).
- **New v6 controls** under More Options [S3] https://hookgenius.app/learn/suno-v6-guide/:
  - Vocal Gender
  - Duration (Custom/Auto)
  - Max Mode
  - Weirdness
  - Style Influence
  - Variety
  - Personalize / My Taste
- **Variety** "is designed to introduce variety in your outputs by adjusting and updating your style prompts. If you'd like to retain full control of your style tags, reduce the Variety slider to 0" [S] https://help.suno.com/en/articles/13924481.
  - One tester found that at Variety "Normal", the stored style was rewritten on every take, sometimes adding instructions that contradicted the prompt.
  - At Off, the style was kept word for word on 52 of 54 takes [S3] https://hookgenius.app/learn/suno-v6-guide/.
- **Max Mode** costs more credits. Suno says it is best for songs longer than two minutes, covers that should stay close to the original, transferring one song's style onto another, and keeping vocals and style consistent through a whole track [S] https://help.suno.com/en/articles/13924481.
  - The exact cost is not published. Blogs say "roughly double" [U] https://myclaw.ai/blog/suno-v6-vs-5-5.
- **v5.5 vs v6, one tester, one prompt:** v6 returned longer songs (3:08 and 3:16 against v5.5's 2:42 and 2:47) and the tester judged its vocal flow better. This is one test, judged by ear [S3] https://hookgenius.app/learn/suno-v6-guide/.

### 1.3 Plans, prices and allowances

| | Free | Pro | Premier | Source |
|---|---|---|---|---|
| Price | $0 | $10/mo monthly; about $8/mo billed yearly | $30/mo monthly; about $24/mo billed yearly | [S] https://suno.com/pricing shows $8/$24 with "save by billing yearly"; [S3] MBW gives "$8–$10" and "$24–$30" https://www.musicbusinessworldwide.com/suno-limits-pro-subscribers-to-20-song-downloads-per-month |
| Credits | 50/day (reset daily, UTC) | 2,500/month | 10,000/month | [S] https://suno.com/pricing, https://help.suno.com/en/articles/9601601 |
| Songs per allowance at 10 credits per 2 songs [E] | about 10 songs/day | about 500/month | about 2,000/month | [E] from the credit cost |
| Models | v6-mini | v6, v6-wild, v6-mini, Custom | same as Pro | [S] https://suno.com/pricing |
| Downloads | 7 lifetime trial downloads, personal use only | 20/month | 60/month, unlimited from inside Studio | [S] https://suno.com/blog/suno-updates-tos |
| Commercial rights | No | Yes, on downloaded songs | Yes | [S] https://help.suno.com/en/articles/9601665 |
| Queue | 4 concurrent, shared | 10, priority | 10, priority | [S] https://suno.com/pricing |
| Upload length | 8 min (pricing page) or 60 s (older help article) [U] | 30 min (pricing page) or 8 min (older help article) [U] | same as Pro | [S] https://suno.com/pricing vs https://help.suno.com/en/articles/6141569 |
| Stem separation | None | Auto Split and Split from Mix | plus Advanced Split | [S] https://help.suno.com/en/articles/12702337 |
| Suno Studio | No | No | Yes | [S] https://suno.com/pricing |
| Add-on credits | No | Yes | Yes | [S] https://suno.com/pricing |

- **Rollover:** subscription credits "do not carry over from day to day or month to month". Bought top-up credits don't expire, but you need an active subscription to use them [S] https://suno.com/pricing. Monthly downloads don't roll over either [S] https://help.suno.com/en/categories/550145-rights-ownership.
- **UK pricing** in one review: Pro £6/mo and Premier £18/mo, which looks like the annual-equivalent rate [S3] https://musictech.com/reviews/music-production/suno-studio-review/.
- **Free tier, Oct 2026:**
  - v6-mini only, 50 credits a day, no commercial use.
  - Free-plan songs are owned by Suno; you get a personal, non-commercial licence [S] https://help.suno.com/en/articles/2416769.
  - Accounts created on or after 3 Sep 2026 get no guaranteed trial downloads ("may occasionally receive trial downloads"), but can buy downloads [S] https://suno.com/blog/suno-updates-tos.

### 1.4 Credit costs

| Action | Cost | Source |
|---|---|---|
| Standard generation (2 songs) on any v6 model | 10 credits | [S] https://help.suno.com/en/articles/13924481 |
| Many image or video inputs | More (not quantified) | [S] same |
| Max Mode | More (not quantified; "about double" per blogs) | [S] same; [U] |
| Auto Split (up to 12 stems) | 50 credits | [S] https://help.suno.com/en/articles/12702337 |
| Split from Mix | 10 per stem, so 20 for stem plus complement | [S] same |
| Advanced Split | 10 per stem (Premier) | [S] same |
| MIDI from a stem in Studio ("Get MIDI") | 10 credits | [S] https://help.suno.com/en/articles/13925249 |
| Create Custom Model | 100 credits | [S3] https://hookgenius.app/learn/suno-v6-guide/ |
| Cover (when introduced) | First batch free | [S] https://help.suno.com/en/articles/2872257. Likely outdated [E] |

---

## 2. Creation and editing features

### 2.1 Create modes

- The Create page has **Simple, Advanced (formerly "Custom") and Sounds** tabs [S] https://help.suno.com/en/articles/10625537. Older help text and the iOS app still say "Custom" [S3] https://undetectr.com/blog/write-lyrics-for-suno-ai.
- **Simple:**
  - You write a description; Suno writes the lyrics, style and structure.
  - In v6 it accepts multiple inputs at once: Suno songs, playlists, uploads, images and video [S] https://help.suno.com/en/articles/13924481.
  - Say "male" or "female" in the description to steer the vocal [S] https://help.suno.com/en/articles/10153473.
- **Custom/Advanced:**
  - Fields: Lyrics, Style of Music, Title.
  - Under Advanced Options / More Options: Exclude Styles, Vocal Gender, Weirdness, Style Influence, Audio Influence (when audio is attached), Variety, Duration, Max Mode, Personalize [S] https://help.suno.com/en/articles/3161921; [S3] https://hookgenius.app/learn/suno-v6-guide/.
- **Field limits:** lyrics 5,000 characters and style 1,000 characters, read from the live v6 counters and unchanged from v5.5 [S3] https://hookgenius.app/learn/suno-v6-guide/.
  - One guide says there is "no strict" style limit, with diminishing returns after about 120 characters. That contradicts the counter reading [U] https://aimusicdaily.com/suno-prompt-tags.
- **Duration slider:** added in Jul 2026 on v5.5 (web). It appears in v6 as Duration Custom/Auto [S] https://suno.com/release-notes; [S3] hookgenius.
- **Sounds:**
  - One-shots or loops, with BPM and Key fields. It returns two samples.
  - Tips: concise, recognisable sound vocabulary. Loops "may include full musical arrangements" [S] https://help.suno.com/en/articles/10625537.
- **Speech (beta):** spoken voice over generated music in one track, on web and mobile. Suno warns that "British accents can wander off to Australia and back" [S] https://suno.com/blog/introducing-speech-beta.
- **Lyrics tools:**
  - "Write with Suno" generates lyrics, with a choice of the ReMi model (edgier) or a classic style [S3] https://undetectr.com/blog/write-lyrics-for-suno-ai.
  - The Jul 2026 lyrics redesign added:
    - a Lyricist that learns from your example lyrics
    - natural-language edits
    - word and line variations
    - a full-screen editor
    - section labels
    - autosave [S] https://suno.com/release-notes
  - You own original lyrics you type in, on any plan [S] https://help.suno.com/en/articles/2415873.

### 2.2 Advanced sliders

| Slider | What Suno says | Community starting points | Source |
|---|---|---|---|
| Weirdness | Safe to Chaos; 50% is the "normal" expected result | Covers and safe work 10–30%; balanced 40–60%; experimental 70–100% | [S] https://help.suno.com/en/articles/6141377; [S3] https://github.com/mttkllr/suno-field-guide |
| Style Influence | How closely to follow the style input, Loose to Strong | Vague tags like "pop" 70–90%; specific prompts 40–60%; default 50% | [S] same; [S3] field guide, hookgenius |
| Audio Influence (or "Audio Strength") | How closely output follows the uploaded or source audio | Replace, Sample and Cover lyric fixes about 70–80%; Voices "fairly high" | [S] https://help.suno.com/en/articles/6882817, https://help.suno.com/en/articles/11362369; [S3] field guide |
| Variety (v6) | Rewrites your style prompt; 0 keeps your tags verbatim | Off when testing; mid when exploring | [S] https://help.suno.com/en/articles/13924481; [S3] hookgenius |

- Typing "weirdness 20%" into the style box does nothing. The sliders live in the UI [S3] https://undetectr.com/blog/suno-v6-changing-your-prompt.
- Older official v5 advice, as relayed by a community guide: move one slider at a time and don't push past 50% early [S3] https://github.com/mttkllr/suno-field-guide.

### 2.3 Exclude Styles (negative prompt)

- Found in Advanced Options. Enter the instruments or voice types you don't want [S] https://help.suno.com/en/articles/3161921.
- After a v6 generation, the style view shows your exclusions appended with minus signs (", -male lead vocal"). This is a display of the Exclude field, not Suno rewriting your prompt [S3] https://hookgenius.app/learn/suno-v6-guide/.
- Put negatives in Exclude, never in the style box: typing "male lead vocal" in the style box asks for one [S3] same.
- An inline "no X" at the end of the style text is an unofficial fallback. Use "no", not "don't" [S3] https://github.com/mttkllr/suno-field-guide.
- Keep exclusions to about 2–3, or arrangements become unstable [S3] same. This is community lore [E].

### 2.4 Personas, Voices, Custom Models, My Taste and Inspire

- **Personas** save a song's "essence" (vocals and style) for reuse. They are public by default and can be toggled private; using one fills in its style [S] https://help.suno.com/en/articles/3484161.
- Since v5.5, the Create button for Personas is **Voices**, and "Style Personas" live inside the Voices menu [S] https://help.suno.com/en/articles/11362433.
- **Voices** (your own singing voice):
  - Input: 15 seconds to 4 minutes, from which you choose the best 2 minutes.
  - Source: an a cappella recording is best; backing music is auto-stripped with stem splitting.
  - Verification: you read a displayed phrase aloud, which is matched against the singing.
  - Profiles are private and only you can create with them, though others can cover or remix songs you publish with remixing on.
  - 18+ only, and not available in some regions [S] https://help.suno.com/en/articles/11362369, https://help.suno.com/en/articles/11362433.
  - Suno's tips:
    - a quiet room
    - at least a minute of audio
    - a voice suited to the genre [S] https://suno.com/blog/6-tips-for-voices
  - Keep Audio Influence high [S] https://help.suno.com/en/articles/11362369.
  - Free plans can try Voices since mobile launched in Aug 2026 ("more on paid plans") [S] https://suno.com/release-notes. Launch coverage said Pro/Premier only [S3] https://www.digitalmusicnews.com/2026/03/26/suno-launches-version-5-5/. The rules changed over time [E].
  - The Voices FAQ still says "Confirm that model v5.5 is selected", which is stale after v6 [U]. Users report that 5.5-era voices sound different on v6 [S3] https://www.gearnews.com/suno-v6-problems-tech/.
- **Custom Models:**
  - Pro/Premier, up to 3 per account, from at least 6 of your own tracks (bulk upload available).
  - Training takes about 2–5 minutes, and you must own the rights to every track [S] https://help.suno.com/en/articles/11362497.
  - The help page says they are private, but since 15 Oct 2026 Premier can share custom models with collaborators [S] https://suno.com/release-notes. The help page lags [U].
- **My Taste:** for all users. It learns your genres and moods for personalisation (the Magic Wand) [S] https://help.suno.com/en/articles/11362561 (title); https://suno.com/blog/v5-5.
- **Inspire / +Inspo:**
  - Use a playlist of your own songs as style inspiration. Suno infers mood, tempo and instrumentation.
  - Best with short playlists of 3–5 songs [S] https://help.suno.com/en/articles/6882753.
  - A community note says 1–4 references work best [S3] https://github.com/mttkllr/suno-field-guide.

### 2.5 Remix and edit tools

| Tool | What it does | Plan | Source |
|---|---|---|---|
| Extend | Continue from a chosen point with new lyrics or style; "Get Whole Song" stitches the result | All | [S] https://help.suno.com/en/articles/2409601 |
| Cover | Restyle a song and keep the melody. Originally limited to your own songs; v6 Cover works on your songs and on others that allow remixing | Paid | [S] https://help.suno.com/en/articles/2872257, https://suno.com/release-notes |
| Reuse Prompt | Prefill a new generation with the same lyrics and style | All | [S] https://help.suno.com/en/articles/2417409 |
| Replace Section | Highlight a region, edit its lyrics or prompt, get 2 versions, then a new "Full Song" | Pro/Premier | [S] https://help.suno.com/en/articles/3271873 |
| Crop, Fade | Trim and fade in/out | Pro/Premier ("basic editing") | [S] https://help.suno.com/en/articles/3166529 (title), https://suno.com/pricing |
| Song Editor | Waveform timeline: drag sections to reorder, insert a section (+ with beat count), Quick Replace, Edit Lyrics, Extend, Remove, Fades | Pro/Premier | [S] https://help.suno.com/en/articles/6141505 |
| Remaster | Subtle variations of an existing clip, with model choice and variation Subtle/Normal/High. For mix, balance and pronunciation, not lyrics or style. Works on songs from retired models | Paid [E] | [S] https://help.suno.com/en/articles/8105281 |
| Add Vocals | Put a new vocal on an uploaded or generated instrumental; tune Audio Strength; describe the instrumental plus the vocal in the style box | Pro/Premier (beta) | [S] https://help.suno.com/en/articles/6882817 |
| Add Instrumental | Pricing page lists "adding vocals or instrumentals to existing songs" | Premier per pricing page | [S] https://suno.com/pricing [U]: older help listed Pro+Premier |
| Mashup / Sample | Combine two songs / use a section as a seed | | [S] https://suno.com/release-notes |
| Plain-language edit (v6) | "Change the chorus…", "Change the lyric from 'love' to 'light'" | v6 users | [S] https://help.suno.com/en/articles/13924481 |
| Upload Audio | Record or upload any sound (hums, voice memos, loops, full songs) as a base for Extend or Cover | All; length depends on plan, see 1.3 [U] | [S] https://help.suno.com/en/articles/6141569 |

- **Upload screening:** Suno checks uploaded audio and lyrics with Audible Magic, Musixmatch and other providers [S] https://suno.com/blog/building-the-future-of-music-responsibly. Commercial songs you don't own will likely be blocked [E].
- **Hums and voice memos:** an uploaded hum of the melody is the strongest single fix for v6 phrasing, according to launch-week threads ("A sung reference beats every adjective") [S3] https://undetectr.com/blog/suno-v6-vocal-prompts.
- **Covers and audio-fed workflows** got some of the best v6 reviews, even from users who disliked fresh generations [S3] https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/suno-v6-reviews-problems-whats-next.

### 2.6 Suno Studio (Premier)

- A browser DAW, best in Chrome; Safari lacks Web MIDI. VST and AU plugins are not supported [S] https://help.suno.com/en/articles/13670529.
- Studio 2.0 (Aug 2026) adds:
  - **Chat bar** (beta): "make the drums punchier", "give me three alternate takes". It edits through the normal undo stack, asks a poll question when your request is ambiguous, and keeps a history per project [S] https://help.suno.com/en/articles/13670721.
  - **MIDI tracks:**
    - piano roll (quantize with Shift+Q, velocity, scale assist)
    - musical typing (A–; white keys, Z/X octave)
    - arpeggiator and chord modes
    - external controllers and MIDI Learn
    - every new MIDI track loads the wavetable synth [S] https://help.suno.com/en/articles/13670593
  - **Effects:**
    - Compressor, Convolution, Delay, Distortion, EQ, Gate, Reverb
    - sidechain
    - automation
    - "design your own plugin" by describing it [S] https://help.suno.com/en/articles/13670529
  - **Take Lanes:**
    - Every generation gives 2 takes; audition, rate and commit them.
    - A down-vote asks what was wrong ("Sound quality, Bad timing or Multiple stems").
    - Replace-section keeps the original in a lane [S] https://help.suno.com/en/articles/13670913.
  - **Remove FX (Get Dry):** AI removes baked-in reverb and delay [S] https://help.suno.com/en/articles/13671105. This directly addresses the review complaint that it is "hard to generate vocals without reverb and effects" [S3] https://musictech.com/reviews/music-production/suno-studio-review/.
  - From earlier versions:
    - Warp markers, time signatures and Alternates (1.2) [S] https://suno.com/release-notes
    - Studio 1.0 had per-track stem generation, BPM/volume/pitch per clip, and audio/MIDI stem export [S] https://suno.com/release-notes
  - Recent additions:
    - better downbeat detection
    - shift-drag time-stretch and auto-stretch to project tempo
    - exponential/log fade curves
    - pitch in semitones and cents (enter 2.38)
    - grid density [S] https://suno.com/release-notes
- **Export:**
  - Full Song, Selected Time Range, or Multitrack (all tracks as stems).
  - Any clip can be right-clicked and downloaded as .WAV.
  - All Studio audio exports are WAV.
  - MIDI: extract a stem, then "Get MIDI" for 10 credits [S] https://help.suno.com/en/articles/13925249.
- **Downloads from Studio are unlimited for Premier** [S] https://suno.com/blog/suno-updates-tos. This is the practical way around the 60-a-month cap [E].
- **Review verdict (Jan 2026):** praised for musicality, stems and MIDI, and ideas. Criticised for inconsistent results, artefacts, a steep learning curve and Persona results that "take all of the edge off" [S3] https://musictech.com/reviews/music-production/suno-studio-review/.

### 2.7 File types

| Format | Who | Source |
|---|---|---|
| MP3 | All plans, web and mobile | [S] https://help.suno.com/en/articles/13926081 |
| WAV | Pro/Premier, web only (mobile defaults to MP3) | [S] same |
| Video | Available | [S] same |
| Stems | Included in the song's single download count | [S] https://help.suno.com/en/articles/13926145 |
| MIDI | Studio songs, Premier | [S] https://help.suno.com/en/articles/13926081 |

- One song counts as one download, whatever the formats, re-downloads or stems. Failed downloads don't count [S] https://help.suno.com/en/articles/13926145.

---

## 3. Meta tags and lyric formatting

**Key fact:** Suno has never published an official list of meta tags. The help centre's glossary defines structure terms (Verse, Chorus, Bridge, Pre-Chorus, Intro, Outro, Hook, Refrain, Break, Drop) as prompt vocabulary, but documents no bracket syntax [S] https://help.suno.com/en/articles/9010177; [S3] https://undetectr.com/blog/write-lyrics-for-suno-ai. Everything below is community practice. Treat tags as strong hints, not commands [S3] same.

### 3.1 Structure tags

| Tag | Reliability (v6 and earlier) | Notes | Source |
|---|---|---|---|
| [Verse], [Chorus], [Pre-Chorus], [Bridge], [Intro], [Outro] | High on all versions [S3] | On their own line. In v6 they also give plain-language edits ("change the chorus") a target, so keep them tidy and consistently spelled | [S3] https://aimusicdaily.com/suno-prompt-tags, https://sunobuilder.com/guides/suno-v6-prompt-guide.html |
| [Hook], [Refrain], [Post-Chorus] | Medium | [Hook] = a shorter, sharper line; [Refrain] = a repeated end-of-verse line | [S3] aimusicdaily |
| [Instrumental], [Instrumental Break], [Break], [Interlude] | Medium | [Melodic Interlude] and [Instrumental Bridge] work better than bare forms | [S3] https://github.com/mttkllr/suno-field-guide |
| [Drop], [Build] | Good in electronic and cinematic genres; may confuse others (use [Instrumental Break] there) | | [S3] aimusicdaily |
| [Fade Out], [Fade In] | Low to medium; unverified on v6 | Use the editor's Fade tool for a guaranteed fade | [S3] https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/understanding-suno-ai-a-comprehensive-guide-to-metatags; [S] https://help.suno.com/en/articles/6141505 |
| [End] | Community says about 85–90% effective (pre-v6 testing) | On its own last line | [S3] https://github.com/mttkllr/suno-field-guide |
| Modifiers inside the brackets: [Long Mellow Intro], [Short Instrumental Intro], [Explosive Chorus], [Stripped Back] | Medium | [Chorus] modifiers are often overridden; lyric content matters more | [S3] field guide |

### 3.2 Vocal and performance tags

- **Lists in circulation:**
  - [Male Vocal], [Female Vocal], [Duet], [Choir], [Spoken Word], [Harmonies], [Whisper], [Vulnerable Vocals]
  - from the field guide: [Baritone Vocal], [Massive Choir], [Call and Response] [S3] https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/understanding-suno-ai-a-comprehensive-guide-to-metatags; https://github.com/mttkllr/suno-field-guide
  - [Rap], [Falsetto] and [Belting] are used the same way [E]
- **Reliability:**
  - Vocal-type tags in the lyrics box are less reliable than putting the vocal description in the style field, plus the Vocal Gender control [S3] field guide; [S] https://help.suno.com/en/articles/10153473.
  - On v6, per-section performance cues are read. One tester's v6 caption described "intimate chest-led Italian verses and a whispered French bridge", and all three of those details came only from section cues in the lyrics [S3] https://hookgenius.app/learn/suno-v6-guide/.
- **Duet control (lore, pre-v6):** [DUET_START_ON], [MALE_START_ON], [FEMALE_START_ON] [S3] field guide [U].
- **v6 duets:** prompt misses on duet roles are a recurring complaint [S3] https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/suno-v6-reviews-problems-whats-next.

### 3.3 Instrument cue tags

- [Guitar Solo], [Piano Solo], [Drum Solo], [Bass Solo], [Sax Solo], [Percussion Break], [Orchestral Break], and instrument tags such as [808 sub bass] or [pedal steel guitar] [S3] jackrighteous metatags; field guide.
- Put instrument cues in square brackets. Writing "(Guitar Solo)" in parentheses can get the words sung [S3] https://trustnodelogic.com/suno6.html.
- **Rhythm-dot notation** in instrumental sections (". . . ! . ." melodic, "!! . ! !!" intense) is fringe lore [S3] field guide [U].

### 3.4 Combined tags (colon and pipe)

- **Pipe stacking:** `[Chorus | anthemic chorus | stacked harmonies | modern pop polish]`. It overrides the global style for that section. Keep it to at most 7 elements, most important first [S3] https://github.com/mttkllr/suno-field-guide.
- **Colon form:** `[Chorus: anthemic, female vocal]`, the same idea [E]. It works as a soft hint.
- **Bracket plus parenthetical direction:** `[Chorus] (full arrangement, choir harmonies)`, `[Bridge] (strip down to piano and vocal only)`, `[Outro] (fade over 8 bars)`.
  - One v6 guide claims these are "treated as style hints, not sung text" [S3] https://aimusicdaily.com/suno-prompt-tags.
  - This **conflicts** with the widely held rule that parentheses are sung (see 3.5) [U].
  - Safer: put the direction inside the brackets [E].
- **Old v3.5-era "Mood: X | Genre: Y" structured strings** were superseded by natural sentences from v4 onward [S3] jackrighteous metatags.

### 3.5 Parentheses, punctuation and spelling tricks

| Device | Effect | Reliability | Source |
|---|---|---|---|
| (parentheses) | Sung, usually as backing vocals or ad-libs. 1–2 per line at most; dense or fast lines collapse them into unison | High; the long-standing rule. v6 reportedly no longer doubles ad-libs or repeats lines | [S3] https://undetectr.com/blog/write-lyrics-for-suno-ai, https://undetectr.com/blog/suno-v6-vocal-prompts, field guide |
| [square brackets] | Read, not sung | High | [S3] undetectr |
| ALL CAPS | Louder, more intense delivery. Use only at climaxes; all-caps lyrics lose the effect | Medium | [S3] field guide |
| Stretched vowels: lo-o-ove, "write the held vowel" | Longer held notes. On v6, one launch-week tester said this was the only change that produced a sustained note | Medium-high on v6 for ballads | [S3] https://undetectr.com/blog/suno-v6-vocal-prompts |
| Stutters: B-b-baby | Stutter effect (trap, electronic pop) | Medium | [S3] field guide |
| Ellipses ... | Slow or drag the delivery | Medium | [S3] field guide |
| Commas | Micro-breaths; roughly every 6–9 syllables for rap clarity | Medium | [S3] field guide |
| Periods | A hard reset | Medium | [S3] field guide |
| Hyphen runs | Tighter flow; overuse smears words | Medium | [S3] field guide |
| Blank lines | Separate sections. On v5.5, removing blank lines within a section helped verse-ending drift | Lore | [S3] field guide |
| Phonetic respelling ("reed" for read), syllable hyphenation, IPA as a last resort | Fixes mispronunciation; fix one word at a time | High | [S3] field guide, undetectr |

### 3.6 Stopping tag-singing, forcing endings, taming intros

- **Tags being sung:**
  - Keep cues short, on their own line, inside [brackets], with no descriptive prose [S3] https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/understanding-suno-ai-a-comprehensive-guide-to-metatags.
  - Move vocal or style descriptions to the style field.
  - A dense, technical style prompt reduces "lyric bleed" [S3] field guide.
  - In Simple mode the description can leak into lyrics, so use Custom/Advanced for exact words [E].
- **Forcing an ending:**
  - Use [Outro] once, then [End] on the last line.
  - Shorten the final section and close every section tag [S3] field guide.
  - Use the Duration control (v6) [S3] hookgenius.
  - After generation, Crop or Fade in the editor, or Extend from a chosen point for a new ending [S] https://help.suno.com/en/articles/2409601, https://help.suno.com/en/articles/6141505.
- **Runaway or hummed intros:**
  - Fill the Exclude field with "humming, ooh/ahh vocals, spoken intro, ambient intro".
  - Use [Short Instrumental Intro] instead of [Intro], or skip straight to [Verse].
  - The lore tag [START_ON: TRUE] [S3] field guide [U].
  - "Insists on weird intro vocals" was a known v5 quirk [S3] field guide.
  - Or crop the intro afterwards [S] https://help.suno.com/en/articles/6141505.

### 3.7 Lyric-writing rules that matter more on v6

- v6 "doesn't sing. It reads" was the top launch-week complaint (r/SunoAI via a secondary page). v6 sings every syllable you give it, so dense lines come out rushed and flat [S3] https://undetectr.com/blog/suno-v6-vocal-prompts.
- **Syllables:**
  - Ballads: 6–8 syllables per verse line and 4–6 per chorus line, ending chorus lines on open vowels (ay, oh, oo, ah) [S3] same.
  - General: 6–10 syllables per line, with lines in the same position within ±1–2 [S3] field guide.
- **Section lengths:** verse 4–8 lines, chorus 4–6, bridge 2–4. Longer sections risk rushed or slurred delivery [S3] https://aimusicdaily.com/suno-prompt-tags.
- **Make the chorus differ on paper** (line length, instructions). Otherwise v6 sings verse and chorus the same way [S3] undetectr.
- **Separate identity from performance:** put the singer's identity in one clause and the per-section pacing, holds and energy in others [S3] undetectr.
- **Version reliability:**
  - Bracket structure tags and parenthesis backing vocals are stable across versions.
  - Stacked tag lists inside brackets and exotic tags (START_ON, rhythm dots, Movement) were tested on v3.5–v5.5 and are unverified on v6 [E].
  - Old v4/v5 tag lists describe "behaviour you cannot reproduce" now that those models are gone [S3] https://hookgenius.app/learn/suno-v6-guide/.

---

## 4. Getting a specific sound (style box)

### 4.1 Formulas in use

| Formula | Source |
|---|---|
| Genre + Tempo + Mood + Instrument + Vocal style + Era (+ reference) | [S3] https://github.com/mttkllr/suno-field-guide |
| Base genre + dominant mood + lead instrument + vocal style + atmosphere + production + structure + personal touch | [S3] field guide |
| v6 "brief": 2–4 sentences (about 60–90 words): (1) genre foundation + tempo, (2) vocal, (3) instruments with roles, (4) structure + production. One primary genre plus at most one secondary influence | [S3] https://sunobuilder.com/guides/suno-v6-prompt-guide.html |
| Comma-separated descriptors are "most reliable" (sub-genre, BPM, primary instruments, vocal or "instrumental", production; optional key/mode, era, region, density) | [S3] https://aimusicdaily.com/suno-prompt-tags |
| Labelled categories ("genre: … vocal: … instrumentation: … production: … mood: …") | [S3] field guide |

- **Prose vs comma lists:** v6 guides favour natural-language briefs in which each phrase has a job, e.g. "bağlama carrying the melody over a low cello drone". Arrangement verbs (enters, drops out, doubles, widens, strips back) add more than another adjective [S3] sunobuilder. Other guides still favour comma lists [S3] aimusicdaily. Suno's own line is that v6 "understands more of the language… musicians use", and the official examples are natural language [S] https://help.suno.com/en/articles/13924481. Both are workable [E].
- **Order:** several guides claim genre-first works better, without a stated method [S3] https://roo.beehiiv.com/p/suno-ai-prompt-guide-2026-copy-paste-templates-the-formula-that-actually-works. Front-load whatever you need guaranteed, because adherence is strongest in the first 30–60 seconds [S3] field guide.
- **Period vs comma lore:** periods mark required concepts and commas optional ones; "with"/"and" make items required [S3] field guide [U].
- **Pop gravity well:** most genres drift toward pop.
  - Strong tags that dominate: pop, rock, electronic.
  - Weak tags that need reinforcing: grunge, math rock, swing.
  - Excluding "pop" helps. The "billions of links" figures in that guide are unverifiable [S3] field guide [U].
- **Words that carry weight vs filler:**
  - Reliable: "anthemic chorus", "building intensity", "gritty vocals", "driving rhythm", "haunting", "bittersweet".
  - Unreliable or ignored: "ethereal", "lush", "shimmering", "realistic", and "crescendo" (use "building intensity") [S3] field guide.
  - Quality words ("epic, amazing, masterpiece") carry no musical decision; replace them [S3] sunobuilder.

### 4.2 Artist names

- **Official:** "we've never allowed prompts for specific artists or copyrighted songs… when a prompt references a specific artist, we remove the artist's name and redirect the request toward descriptive musical characteristics." Artist names were deliberately left out of the training metadata [S] https://suno.com/blog/building-the-future-of-music-responsibly.
- Songs may fail to generate with "names of well known artists or people", copyrighted or trademarked terms, or excessive profanity [S] https://help.suno.com/en/articles/3198209.
- **False positives:** "capo" (as in a guitar capo) was read as the rapper Capo. The style was swapped for "German Rap, Hip Hop" and lowercased. If a style comes back strange, look for a word that is also a name [S3] https://hookgenius.app/learn/suno-v6-guide/.
- **Workaround:** break the sound into describable parts:
  - era/decade
  - 2–3 defining instruments
  - vocal timbre, register and delivery
  - production and space
  - mood
  e.g. "distorted downtuned guitars, loose heavy drums, melodic bass, angsty and raw" for 1990s grunge [S3] https://violetrecording.com/how-to-write-suno-prompts/, https://roo.beehiiv.com/p/suno-artist-style-prompts.
- Describing timbre "beats naming a singer" and stays consistent between generations [S3] sunobuilder.
- v6 can also take a reference by feel ("feels like midnight on a rooftop") or by uploaded audio, images or playlists [S] https://suno.com/blog/introducing-v6.

### 4.3 BPM, key, mono/stereo, production words

- **BPM** is a target, not a lock. An exact number beats vague tempo words; groove, drum pattern and lyric density also change perceived speed [S3] https://jackrighteous.com/en-gb/blogs/guides-using-suno-ai-music-creation/master-tempo-in-music-comprehensive-guide-to-tempo-tags.
  - No rigorous measured test was found [U].
  - The v6 Studio chat bar "understands BPM and tempo changes" [S] https://suno.com/release-notes.
  - Sounds has explicit BPM and Key fields [S] https://help.suno.com/en/articles/10625537.
  - For assembling parts, lock the BPM and key at the start of the style and reuse them for every generation [S3] field guide.
- **Key/mode:** "minor key", "dorian" and named keys are used. No reliability data was found [U]. Treat key as a weak hint, and check with a key detector or retune in Studio, which has fine pitch [E]; [S] https://suno.com/release-notes.
- **Mono/stereo:**
  - "narrow stereo image", "limited stereo" and "wide stereo / wide cinematic mix" appear in community prompts [S3] field guide, sunobuilder.
  - Suno outputs are stereo [E].
  - Stem phase incoherence can thin out the mono sum [S3] https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them.
- **Production vocabulary:**
  - Polished: "radio-ready", "crisp mix", "clean transients", "punchy compression", "wide stereo", "bright modern mix", "soft clip on the drums", "controlled low end" [S3] field guide, sunobuilder.
  - Lo-fi / analog:
    - "tape saturation", "slight wow and flutter", "gentle preamp drive", "vinyl crackle"
    - "close mic presence", "small room acoustics", "room tone", "breath detail"
    - "one-take performance", "natural timing drift"
    - "fret squeak", "pick attack" [S3] field guide
  - "Realistic" on its own is weak; describe the physical recording conditions instead [S3] field guide.
  - **Default sawtooth synth:** name the synthesis type (FM, wavetable, granular), describe motion (LFO-driven) or name a bass archetype (Reese) [S3] field guide.

### 4.4 Known failure modes and fixes

| Failure | Typical fix | Source |
|---|---|---|
| **v6 "muffled" mixes, buried vocals, missing air** (the most repeated v6 complaint; 175 upvotes and 263 comments in 48 hours on one thread) | Post-EQ: +2–3 dB high shelf from about 8 kHz; cut 2–4 dB at 200–400 Hz; +1.5–3 dB presence at 2–5 kHz. Prompt explicit production and mix language. Remaster. Covers/audio-fed workflows | [S3] https://erasy.co/blog/suno-v6-sounds-muffled, https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/suno-v6-reviews-problems-whats-next, https://www.gearnews.com/suno-v6-problems-tech/ |
| Shimmer / metallic haze / warble (classic pre-v5 artefact; v4.5 claimed reductions) | Pick a cleaner take first; regenerate the section locally; conservative repair only; avoid "ethereal/shimmering" | [S] https://suno.com/blog/introducing-v4-5; [S3] https://jackrighteous.com/en-gb/blogs/guides-using-suno-ai-music-creation/reduce-ai-music-noise-fix-shimmer-hiss-in-suno-ai, field guide |
| Muddy low end (kick and bass collide) | Fix at stem level (EQ carving), not in mastering | [S3] https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them |
| Harsh 3–6 kHz in vocals | De-ess / EQ the vocal stem | [S3] roexaudio |
| Genre drift / pop reversion mid-track (notably v5.5) | Exclude pop; reinforce weak genre tags; Variety 0; raise Style Influence; Extend section by section | [S3] field guide, hookgenius |
| Quality decay in the back half of long songs (v5.5 and v6) | Max Mode for songs over 2 minutes; regenerate or replace the late section; build with Extend | [S] https://help.suno.com/en/articles/13924481; [S3] https://erasy.co/blog/suno-v6-sounds-muffled |
| Mispronounced lyrics | Respell phonetically; hyphenate syllables; v6 single-lyric edit; Remaster Subtle for clarity | [S] https://help.suno.com/en/articles/8105281; [S3] undetectr |
| Lyrics changed or dropped by the model | Custom mode; v6 "sings every syllable", so trim dense lines | [S3] gearnews comments, undetectr |
| Repeated or looped choruses / chord loops after about 1 minute | Write the final chorus differently; Replace Section; assemble from multiple takes | [S3] field guide |
| Prompt rewritten / style ignored (v6) | Variety to 0; check the stored style on the song page | [S] v6 FAQ; [S3] hookgenius |
| Voice gender flips (v6-wild) | Set Vocal Gender; exclude the opposite voice type | [S3] gearnews comments |
| Song ends early or late | Duration control; [End]; Crop / Extend | [S3] hookgenius, field guide |
| Baked-in reverb on vocals | Studio Remove FX | [S] https://help.suno.com/en/articles/13671105 |
| Homogenised, samey ideas across takes (v6) | v6-wild for ideation, then refine in v6; raise Variety while exploring | [S] https://help.suno.com/en/articles/13924481; [S3] jackrighteous v6 report |

---

## 5. Iteration and curation

- **No hard data exists on keeper rates** [U]. Community estimates [S3] https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/how-to-finish-one-suno-song-without-wasting-generations; search summary of creator guides:
  - 5–15 generations to find a strong "seed"
  - then 3–5 extensions
  - 30–50 generations for a finished track including tests
  - another plan budgets 4–6 generations per variant, about 24 clips
- **Noise floor:** on v6, the gap between the two takes of one generation can exceed the effect of a deliberate prompt change. Lower Variety when testing, change one variable at a time, and run 2–3 generations before judging [S3] https://hookgenius.app/learn/suno-v6-guide/, field guide.
- **Credit math [E]:**
  - At 10 credits per generation (2 songs), 40 generations = 400 credits.
  - Pro's 2,500 credits gives about 6 such finished songs a month. Premier's 10,000 gives about 25.
  - Auto Split (50) and Max Mode raise the cost.
  - **The real constraint since 3 Sep 2026 is downloads:** Pro gets 20 a month, which is about 20 releasable songs, whatever the credits. Premier gets 60, plus unlimited from Studio [S] https://suno.com/blog/suno-updates-tos.
- **Typical workflow** [S3] field guide, jackrighteous v6 workflow; [S] help articles:
  1. Generate a batch in v6 (or v6-wild for ideas, v6-mini for fast drafts) with Variety at 0 once the prompt is set [S] https://help.suno.com/en/articles/13924801.
  2. Thumbs up/down and pick a keeper. Always A/B new versions against the keeper, not just against each other.
  3. Extend from a point of momentum (mid-verse, not after a natural ending), then Get Whole Song.
  4. Replace Section for weak parts. Use the v6 plain-language section or lyric edit.
  5. Crop and fade the head and tail.
  6. Remaster (Subtle) for mix and pronunciation.
  7. Get Stems (Pro/Premier) or open in Studio (Premier) for a final mix. Export, then master externally.
- **"Assemble from parts":** lock BPM and key, generate 4–6 candidates, treat each as a source of sections, and cut on downbeats in Studio or a DAW [S3] field guide.
- **"Extend method":** generate only an intro of about 15–20 seconds, then extend section by section with explicit direction. One popular creator's version runs the best prompt about 20 times [S3] field guide.
- **The pre-v6 "hybrid" (compose on v4.5/v5, then Cover on v5.5) no longer works:** those models are gone [S] https://help.suno.com/en/articles/13924481.
- **Workspaces** organise projects. Shareable team workspaces are on Pro/Premier [S] https://suno.com/release-notes.

---

## 6. Stems

- **Modes** [S] https://help.suno.com/en/articles/12702337:
  - **Auto Split:** up to 12 stems (drums, bass, guitar, keys, woodwinds…). 50 credits. Pro and Premier. "Doesn't always label them correctly."
  - **Split from Mix:** one chosen instrument or vocal plus its complement (the old "Vocal + Instrumental" 2-stem mode, generalised). 10 credits per stem.
  - **Advanced Split:** choose from about 100 instruments (e.g. cello vs violin, theremin). 10 credits per stem. Premier only. "A few of the most granular options are still in development."
  - Asking for an instrument that isn't present may still cost credits [S] same.
- **How Suno makes stems:** "Instead of cutting your song apart, Suno listens to it and regenerates each stem from scratch using our latest model… a freshly generated guitar that matches what was there." Suno claims they are "punchy, crisp, free of spill" [S] https://suno.com/blog/stem-separation-updates.
  - **Implication [E]:** the stems are re-renders, not slices. They may not null against the mix or sum back to exactly the original, and phase may be incoherent between stems, which matches third-party reports of phase and mono-thinning issues [S3] https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them.
- **Reported quality (mostly before the Jun 2026 rebuild):**
  - ghost vocals in the drum stem and instrument artefacts in the vocal stem
  - the v5-era 12-stem split had "noticeably more bleed" than v4.5
  - harsh sibilance, dropouts, stray fragments [S3] roexaudio; https://vi-control.net/community/threads/suno-audio-quality-vs-sample-libraries.172526/
  - Several of these sources sell mixing tools [S3].
  - No independent benchmark of the new modes against external separators was found [U].
- **Formats:** stems download inside the song's single download count. Studio exports are WAV. Multitrack export puts all tracks out as stems [S] https://help.suno.com/en/articles/13926145, https://help.suno.com/en/articles/13925249.
- **MIDI:** from a stem in Studio (10 credits), or from MIDI clips you made in Studio [S] https://help.suno.com/en/articles/13925249.
  - Since Sep 2026, transcription is "faster, more musical context, more accurate" [S] https://suno.com/release-notes.
  - Earlier, MIDI export had known gap bugs and stuck notes, fixed on 2 Sep 2026 [S] https://suno.com/release-notes.
- **Best practice [E plus S3]:**
  1. Generate sparse arrangements when you plan to split. Fewer overlapping instruments means cleaner stems [E].
  2. Use Split from Mix for the one element you need (e.g. vocal plus instrumental) rather than Auto Split's 12, which wastes credits and mislabels.
  3. Use Studio's "Multiple stems" downvote route and the Stem Separator for clips that contain two instruments [S] https://help.suno.com/en/articles/13670913.
  4. Use Remove FX before re-processing a vocal [S].
  5. If the stems are poor, export the full WAV and re-separate with an external separator, then compare against the original. One user found an external model "works much better than Suno's stems" (single anecdote) [S3] search summary of r/SunoAI via https://reddit.sentinel-team.org/.
  6. Fix the low end and the 3–6 kHz harshness per stem before mastering; mastering alone won't separate kick from bass [S3] roexaudio.

---

## 7. Rights, distribution and policy

### 7.1 Ownership and commercial use

- **Paid plans:**
  - If you were subscribed (Pro/Premier) when a song was made, you own it and keep commercial rights after cancelling [S] https://help.suno.com/en/articles/2416769.
  - Since 3 Sep 2026, commercial rights attach to songs you download through Suno's channels while subscribed [S] https://help.suno.com/en/articles/9601665.
  - A song in a paid library "cannot be released, sold, or licensed until a download has been 'spent' on it" [S3] https://www.musicbusinessworldwide.com/suno-limits-pro-subscribers-to-20-song-downloads-per-month.
  - You may distribute to Spotify and Apple Music, use the songs in film, TV, games and YouTube, and sell on Bandcamp. No attribution to Suno is required [S] https://help.suno.com/en/articles/2410177, https://help.suno.com/en/articles/9601665.
- **Free:**
  - Suno owns the songs; you get personal, non-commercial use only.
  - Trial downloads are never commercial [S] https://help.suno.com/en/articles/2416769, https://help.suno.com/en/articles/13926401.
- **Retroactive rights:**
  - The older help says subscribing does not give rights to songs made earlier [S] https://help.suno.com/en/articles/2425729.
  - **New (6 Oct 2026):** songs you made while not subscribed "can now qualify by using one of your paid download credits" [S] https://help.suno.com/en/articles/9604993.
  - So the two help articles conflict; the newer one is more permissive [U].
- **Remixes and covers of other people's songs** are never monetisable, even when the creator allows remixing [S] https://help.suno.com/en/articles/9604993.
  - Extensions of other people's songs: don't assume ownership [S] https://help.suno.com/en/articles/2871105.
- **Copyright:** commercial rights from Suno are not the same as copyright. Registration depends on the country (in the US, human authorship is needed) [S] https://help.suno.com/en/articles/2746945, https://help.suno.com/en/articles/2430081; [E].
- **Lyrics** you wrote are yours on any plan [S] https://help.suno.com/en/articles/2478401.

### 7.2 Download caps and the new Terms (3 Sep 2026)

- **Caps:**
  - Free: 7 lifetime trial downloads (only for accounts that existed before 3 Sep)
  - Pro: 20 a month
  - Premier: 60 a month, unlimited via Studio
  - More can be bought.
  - The caps also apply to songs made before 3 Sep [S] https://suno.com/blog/suno-updates-tos.
- **Before the change:** paid plans had unlimited downloads [S3] MBW.
- **Rationale:** stopping "bad actors" who mass-export music for streaming fraud [S] https://suno.com/blog/suno-updates-tos.
- **The new ToS:**
  - Prohibits getting outputs "by any means other than a download channel made available by Suno (for example, recording or stream ripping are prohibited)".
  - Reserves the right to add fingerprints, watermarks or metadata showing the tier and download status.
  - Bans removing them [S3] https://www.musicbusinessworldwide.com/suno-limits-pro-subscribers-to-20-song-downloads-per-month.
  - **[E] Do not recommend tools that "remove generator metadata"** (some guide sites sell these, e.g. https://undetectr.com/blog/suno-v6-vocal-prompts). They break Suno's ToS and platform disclosure rules.
- **How this traces to the WMG deal:** the Nov 2025 WMG release said downloads would require a paid account, with caps. Suno kept 7 free trial downloads instead of none. Udio, after its UMG settlement, disabled downloads entirely [S3] MBW.

### 7.3 Label deals and litigation

| Party | Status (Oct 2026) | Source |
|---|---|---|
| Warner Music Group | Settled and partnered, Nov 2025; partner in v6 | [S] https://suno.com/blog/introducing-v6 |
| BMG | Partnership, 12 Aug 2026; partner in v6 | [S] https://suno.com/blog |
| Believe / TuneCore | Partnership, 8 Sep 2026. Tracks made on the "industry partner model" are eligible to distribute through Believe and TuneCore, which earlier in 2026 had refused Suno content | [S] https://suno.com/blog/believe-partnership |
| Universal + Sony | Original 2024 suit continues. **Second suit filed 18 Sep 2026** (Boston) over 60,202 recordings, alleging v6 was distilled from earlier models and trained on "user interactions"/preference data, i.e. "fruit of the same poisoned tree"; adds YouTube stream-ripping (DMCA circumvention) claims. Suno calls it "fundamentally flawed" | [S3] https://www.musicbusinessworldwide.com/universal-and-sony-sue-suno-for-a-second-time-claiming-platforms-v6-models-are-the-fruit-of-the-same-poisoned-tree/, https://www.digitalmusicnews.com/2026/09/22/suno-comments-umg-sony-lawsuit/ |
| Others | Artist suits and a user class action reported. Suno admitted training on YouTube videos the day before the v6 launch | [S3] https://techcrunch.com/2026/09/09/suno-replaces-its-ai-models-with-a-new-one-trained-on-licensed-music-as-copyright-suits-pile-up/ |

- **Coming next:** opt-in artist experiences in which artists get paid, and remixing of label artists' songs if they opt in [S] https://suno.com/blog/introducing-v6; [S3] TechCrunch.

### 7.4 AI labelling and transparency

- **Suno's side:** it is rolling out transparency tools aligned with industry standards, plus audio watermarking and fingerprinting that are "durable and resistant to tampering". Whether to disclose AI use is left to artists and platforms [S] https://suno.com/blog/building-the-future-of-music-responsibly.
  - Watermarks also apply to music distributed via Believe and TuneCore [S] https://suno.com/blog/believe-partnership.
  - EU AI Act marking duties apply from 2 Dec 2026 for services already on the market [S3] MBW.
- **Platforms** (secondary sources; verify on each platform before relying on them):
  - **DistroKid:** AI disclosure toggle since 14 May 2026. It accepts AI-made music if you hold the rights; it bans impersonation and spam.
  - **Spotify:** AI Credits via DDEX since Apr 2026. It says it does not down-rank AI-assisted music. A separate AI Persona badge exists.
  - **Deezer:** auto-tags fully AI tracks and excludes them from recommendations (about 90k AI uploads a day by Jun 2026).
  - **Apple Music:** Transparency Tags since Mar 2026.
  - **TIDAL:** blocks royalties for detected fully-AI tracks since Jun 2026.
  - Sources: [S3] https://www.digitalmusicnews.com/2026/05/14/distrokid-ai-credit-disclosure-what-it-looks-like/, https://labelgrid.com/blog/content-distribution/ai-music-distribution-policy-how-every-platform-treats-ai-in-2026/, https://jackrighteous.com/en-gb/blogs/ai-music-distribution-guide/ai-music-distribution-rules-distrokid-spotify-apple-deezer
- **Content ID:** YouTube Content ID and similar tools have stricter exclusivity tests. They are risky for AI tracks that others could have similar outputs of [S3] https://jackrighteous.com/de/blogs/ai-music-distribution-guide/distribute-suno-music-after-september-3-spotify-distrokid-youtube.
- **Keep a release record:**
  - the source song link
  - your plan at creation
  - generation date and model
  - the downloaded file [S3] same.

### 7.5 Moderation

- Prompts and lyrics are screened for artist or person names, trademarks, slurs, excessive profanity and other inappropriate content.
- Songs are Link Only by default.
- DMCA takedowns are honoured [S] https://help.suno.com/en/articles/3198209.
- Community Guidelines updated Aug 2026: they ban recreating existing songs, unlicensed uploads, voice or likeness without permission, fake engagement and bots [S] https://suno.com/blog/building-the-future-of-music-responsibly.

---

## 8. Conflicts and myths

1. **"Parentheses are style directions, not sung."**
   - One v6 tag reference says parenthetical notes after a section tag are hints [S3] aimusicdaily.
   - The long-standing and better-supported rule is that parentheses are sung, as backing vocals [S3] undetectr, field guide.
   - **Verdict [E]:** treat (text) as sung. Put directions inside [brackets].
2. **Style box limit.**
   - Live counter: 1,000 characters [S3] hookgenius.
   - Another guide: "no strict limit, diminishing returns after about 120 characters" [S3] aimusicdaily.
   - Older v3-era lore said 120/200 characters.
   - **Verdict:** 1,000 is the field limit. Shorter is often better, and v6 guides suggest about 60–90 words.
3. **Upload length.**
   - Pricing page: Free 8 min, paid 30 min.
   - Help (May 2025): Free 60 s, paid 8 min.
   - **Unresolved [U]:** the pricing page is newer.
4. **Price.**
   - Pricing page shows $8 / $24. These are annual-equivalent rates; monthly billing is $10 / $30 [S3] MBW.
   - Many blogs quote one or the other without saying which.
5. **"Older models are still available."**
   - False since 9 Sep 2026 [S] v6 FAQ.
   - Any guide recommending v4.5+, v5 or v5.5, or the "compose on v4.5, cover on v5.5" hybrid, is outdated.
6. **Voices on v6.**
   - The help page still tells users to select v5.5 [S]. That model is retired.
   - Users report that 5.5-era voices sound different on v6 [S3].
   - Free-tier access changed over time.
7. **Retroactive commercial rights.**
   - One help article says no [S] 2425729.
   - A newer one (Oct 2026) says free-era songs can qualify by spending a paid download [S] 9604993.
   - **Verdict:** the newer one likely reflects the current terms [U].
8. **"Suno stems are separated from the mix."**
   - Suno says its stems are regenerated, not cut [S].
   - So "bleed" in the classic sense should drop, but the stems are not sample-identical to the mix [E].
9. **"Typing slider values or percentages into the prompt sets them."** Myth [S3] undetectr.
10. **"Max Mode is required past 2 minutes."**
    - One review claims so [S3].
    - Suno only recommends it for longer songs [S].
11. **"All three majors licensed Suno."**
    - False. Only WMG. UMG and Sony are suing [S3] https://erasy.co/blog/suno-v6-sounds-muffled, MBW.
12. **"v6 is universally worse."**
    - The backlash is real (muffled mixes, "reads not sings").
    - Positive reports exist too: Covers, audio-fed workflows, v6-mini keepers, cleaner vocals for some.
    - No benchmark exists, and none can be run, because the old models were withdrawn [S3] jackrighteous v6 report, erasy.
13. **"Billions of statistical links" in pop-gravity claims.**
    - Unverifiable numbers [U].
    - The direction (drift toward pop) is widely reported.
14. **"[End] works 85–90% of the time."** A community figure from pre-v6 testing, with no published method [U].
15. **"Covers are free."** Only true at the 2024 beta launch [S] 2872257. Likely outdated [E].

## 9. Gaps

- The exact credit cost of Max Mode, and of image or video inputs.
- The current official per-song cost of extra downloads, and add-on credit pack prices. Neither is published.
- How reliable BPM and key are on v6: no measured test found.
- Whether the tag set ([Fade Out], [End], pipe stacking, [START_ON]) still works on v6. Only anecdotes exist. The research-grade data are all from v3.5–v5.5.
- An independent benchmark of the Jun 2026 stem modes against external separators.
- Whether "Add Instrumental" is Premier-only or Pro too (sources disagree).
- Upload length limits per plan (conflict).
- Technical details of the watermark (what survives transcoding or stem export) and which DSPs read it.
- Output format specs (sample rate / bit depth of WAVs): not published in the pages checked.
- The voice/"your own voice" rules on v6: whether Voices runs on v6 or v6-mini, and the free limits.
- Suno MCP (beta) limits and pricing beyond "uses your credits".
- Reddit could not be fetched directly. The community sentiment figures (thread sizes, quotes) are secondhand.
