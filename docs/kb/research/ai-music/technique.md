# Research log: technique to output — how successful AI-assisted music gets "radio-ready", working backwards from the hit

Checked: 2026-10-31

**Legend**
- **[S]** sourced: primary or first-party source (platform help page, official statement, court/agency doc, or the creator's own words as reported by a named outlet), URL given
- **[S3]** third-party: secondary coverage, blog, tutorial or vendor guide, URL given
- **[E]** inference / editorial synthesis by the researcher (no single source; reasoned from the sourced items)
- **[U]** unknown or conflicting: sources disagree or the claim could not be verified

**Naming rule:** acts and creators are referred to as "Act A", "Act B" and so on. URLs may contain names; prose does not. The act key is internal to this log only.

| Key | Description used in this log |
|---|---|
| Act A | Chart-entering AI R&B/gospel act; human poet writes lyrics, Suno makes the music; signed a multimillion-dollar deal |
| Act B | Faceless AI R&B act; lyrics drafted by ChatGPT from the creator's old diaries; top-3 on R&B digital sales; signed to an AI roster |
| Act C | AI country act; No. 1 on Country Digital Song Sales; creator never interviewed |
| Act D | AI "psych-rock band" that reached 1M+ Spotify monthly listeners in mid-2025, later admitted Suno use |
| Act E | Self-described "music designer", most-streamed creator on Suno, first Suno creator to sign a label deal |
| Act F | AI artist launched by a hit producer's AI company; producer demos run through Suno; voice derived from a Suno Persona |
| Act G | Viral dance track; the male writer's own vocal processed through Suno into a female-sounding voice; pulled for impersonation, re-released with a human singer; top-10 UK/AU |
| Acts H, I | Producers on the same label as Act G who sing their own songs and run the voice through Suno, then mix themselves |
| Act J | German parody track; human lyrics fed to Udio; first AI song in the German Top 100 (2024) |
| Act K | Comedian's Udio-generated soul parody that a major hip-hop producer sampled; later cleared and paid as a sample (2024) |
| Act L | Australian DJ/producer whose AI-assisted dance cover of a 1980s pop classic topped Australian radio airplay; added AI vocal/drum credits after an investigation |
| Act M | Long-running voice-model parody channel; creator sings the impression first, then converts it |
| Act N | AI R&B persona that hit No. 1 on US iTunes (April 2026) with a Suno single |
| Act O | Outlaw-country AI act past 1M monthly listeners; an expert report concluded Suno |
| Acts P1–P3 | AI-assisted rock, blues and Christian acts with human songwriter credits that entered Billboard sales/Emerging Artists charts (late 2025) |

---

## 1. Executive summary

1. **Every AI act that crossed into charts, radio or label deals kept at least one human-made pillar**, most often the lyrics (Acts A, J, K, P), the vocal performance (Acts G, H, I, M) or the composition and demo (Act F). Fully prompt-only projects did reach large stream counts (Act D, Act O, Act C), but they are also the ones that ran into takedowns, "AI Persona" labels, chart-eligibility rules and press backlash. [E, built from the items in section 2]
2. **Curation is the main skill.** Reported keeper ratios range from "2–4 candidates per song" in finishing guides to "500+ songs per album cycle" and "~10,000 songs in the account" for a charting act. [S3: https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/how-to-finish-one-suno-song-without-wasting-generations ; S3: https://www.aimusicpreneur.com/ai-music-news/china-styles-i-love-me-loud-billboard/]
3. **The hit template in the streaming era is front-loaded.** Intros fell from about 20 s (mid-1980s) to about 5 s (2015) in top-10 singles, tempo rose about 8%, and the title arrives sooner. Average year-end Hot 100 length is about 3:13–3:24 in 2024–2025. [S: https://news.osu.edu/has-music-streaming-killed-the-instrumental-intro/ ; S3: https://dev.to/tonywangca/are-songs-really-getting-shorter-6618-hot-100-hits-1959-2025-4cdg]
4. **The release environment changed sharply in 2025–2026.** The changes include Spotify's spam filter, impersonation policy and AI Credits (DDEX), Spotify "AI Persona" badges with default exclusion from recommendations (from mid-September 2026), Apple Music Transparency Tags, Deezer tagging (over 50% of daily uploads are AI), a Bandcamp ban, ARIA and IFPI chart-eligibility rules ("substantially human made"), and an industry "AI-Generated" vs "AI-Assisted" label standard (July 2026). [S: URLs in section 8]
5. **Copyright follows the human contribution.** The US Copyright Office's position is that prompts alone are not authorship. Human lyrics, human melody or performance, and human selection, arrangement and modification of AI output can be protected, but AI-generated portions must be disclaimed. The Supreme Court declined review of the human-authorship rule in March 2026. [S: https://copyrightalliance.org/ai-report-part-2-copyrightability/ ; S3: https://www.hklaw.com/en/insights/publications/2026/03/the-final-word-supreme-court-refuses-to-hear-case-on-ai-authorship]

---

## 2. Part A — what the successful AI acts actually did (technique extraction)

### 2.1 Technique matrix

| Act | Lyrics | Music engine | Vocal | Post-production / DAW | Volume / curation | Result | Source |
|---|---|---|---|---|---|---|---|
| A | Human poet writes them (reported ~90% hers, other humans help) [S3] | Suno, varied prompts generating vocals and instrumentation [S3] | AI (Suno) | Manager says Suno is mixed with "live elements"; plan to add human producers [S3]; live-action music video [S3] | Three albums between Aug 2025 and Jan 2026 [S3] | No. 1 Adult R&B Airplay; No. 20 Hot R&B Songs; No. 1 R&B Digital Song Sales; No. 3 Hot Gospel Songs; ~$3M label deal [S3] | https://en.wikipedia.org/wiki/Xania_Monet ; https://billboard.substack.com/p/how-many-ai-artists-have-debuted ; https://www.cnn.com/2025/11/01/entertainment/xania-monet-billboard-ai |
| B | Creator's own 1990s diary entries fed to ChatGPT, which writes the lyrics [S3] | Suno | AI | Not reported | "500+ songs per album cycle"; ~10,000 songs in the Suno account [S3] | No. 2 R&B Digital Song Sales; ~22M independent streams; ~900k monthly listeners; distributed via DistroKid; then signed to an AI roster [S3] | https://www.aimusicpreneur.com/ai-music-news/china-styles-i-love-me-loud-billboard/ |
| C | Credited to one songwriter, also tied to another AI act [S3] | Unknown generator; associate tied to an AI app [S3] | AI; phrasing reportedly modeled on a real country artist, who was not notified [S3] | Not reported | Several singles | No. 1 Country Digital Song Sales (two weeks); 3M+ Spotify streams in under a month [S3] | https://www.wfae.org/npr-arts-life/2025-11-10/breaking-rust-is-a-hot-new-country-act-on-the-billboard-charts-its-powered-by-ai ; https://www.denvergazette.com/?p=353923 ; https://abcnews.go.com/culture/story/ai-generated-country-song-topping-billboards-country-digital-127445549 |
| D | Unknown | Suno, per a spokesperson who later called himself a hoaxer [U] | AI; Suno **Persona** used to keep one "lead singer" voice consistent [S3] | Not reported | Two albums 15 days apart (June 2025), third announced, then output stalled [S3] | Peak ~1.0–1.4M monthly listeners, mostly via algorithmic playlists; Deezer flagged it as AI [S3] | https://au.rollingstone.com/music/music-news/velvet-sundown-ai-band-suno-79399 ; https://www.digitalmusicnews.com/2025/07/07/velvet-sundown-one-million-spotify-monthly-listeners/ ; https://www.thefader.com/2025/07/07/the-velvet-sundown-ai-band-story-explained |
| E | Writes his own lyrics (one report) [S3] | Suno (some reports also say Udio) [U] | AI | Refines prompts and layers generated instrumentals with own adjustments (blog claim) [S3] | Top-streamed creator on Suno itself (3M+ on-platform plays) before release [S3] | First Suno-creator label deal; single plus album [S3] | https://www.thefader.com/2025/07/25/imoliver-human-ai-music-designer-signed-record-deal ; https://the-decoder.com/hallwood-has-signed-imoliver-sunos-most-streamed-ai-music-creator/ |
| F | Human writers | Producer uploads conventional **demos** to Suno, which reworks them [S3] | AI voice taken from a Suno generation he liked, saved as a Persona [S3] | Human producer curation | Producer claims "three months" of work now takes "two days" [S3] | Launch drew heavy criticism, including a demo that closely copied another producer's beat [S3] | https://www.npr.org/2025/06/17/nx-s1-5431544/timbaland-ai-music-suno-stage-zero-tata-generative ; https://www.musicbusinessworldwide.com/timbaland-launches-ai-music-company-stage-zero-with-first-ai-artist-tata |
| G | Human writer | Human-produced in Pro Tools [S3] | Writer's **own vocal**, "run through layers of processing and filtering" with Suno to sound female [S3] | Full DAW production | Promoted with another singer's name as a hashtag [S3] | No. 8 ARIA, No. 8 US Hot Dance/Electronic; pulled from Spotify for impersonation; re-released with a human singer, which reached No. 9 UK [S3] | https://en.wikipedia.org/wiki/I_Run |
| H, I | Human | Human beats and top lines [S3] | "I sing the songs, bring it over into Suno to change the voice, and then mix it myself." Generation-only attempts: listeners "could notice" [S3] | Self-mixed | Anonymous persona; an actor plays the artist on social media [S3] | Strong TikTok and streaming traction [S3] | https://www.dazeddigital.com/music/article/71134/1/suno-is-the-new-auto-tune-meet-the-artists-using-ai-to-go-viral |
| J | Human-written parody lyrics [S3] | Udio for melody and vocals; AI artwork [S3] | AI | Started as a TikTok chorus only, then expanded into a full track after demand [S3] | 1 track | No. 48 German Top 100 (Aug 2024) [S3] | https://en.wikipedia.org/wiki/Butterbro |
| K | Human (comedy writer) [S3] | Udio; "more than a dozen versions in different genres" before choosing 1970s soul [S3] | AI | Became a sample in a major producer's beat [S3] | 1 track | Human lyrics are what got cleared and paid when the sample was used commercially [S3] | https://en.wikipedia.org/wiki/BBL_Drizzy ; https://www.fortune.com/2024/06/06/metro-boomin-bbl-drizzy-drake-kendrick-ai-beats-pay/ |
| L | Cover (original writers keep publishing) [S3] | Accused of Suno; later credited **AI vocals and AI drums** [S3] | AI | DJ/producer arrangement | 14-track album [S3] | No. 1 Australian radio airplay for weeks; ~35–48M Spotify streams; triggered ARIA rule change [S3] | https://mixmag.asia/read/madonna-like-a-prayer-cover-generative-ai-credits-update-josh-fawaz-news ; https://www.techspot.com/news/113609-wholly-ai-generated-music-excluded-australian-charts.html |
| M | Human | Human arrangement and instruments | Sings the impression himself, then converts it with a voice model trained on the target singer [S3] | Credits read "vocal performance ... with A.I. assistance" [S3] | Regular parody videos | Large viral reach; the creator says imitating a voice is moral only in "very limited" cases [S3] | https://loudwire.com/interview-there-i-ruined-it-song-mashup/ ; https://ultimateclassicrock.com/there-i-ruined-it-interview/ |
| N | Unknown | Suno [S3] | AI | Not reported | TikTok traction first, then digital sales [S3] | No. 1 US iTunes (April 2026) [S3] | https://www.techloy.com/10-ai-music-acts-that-have-officially-topped-the-global-charts/ |
| O | Unknown | Suno, per an expert report [S3] | AI | Not reported | Large catalog | 1M+ monthly listeners [S3] | https://www.musicbusinessworldwide.com/that-ai-artist-with-over-1m-listeners-on-spotify-his-music-was-created-with-suno-says-expert-report |
| P1–P3 | Human songwriter credited on each | AI-assisted; involvement "varies by release" | AI | Bios state human + AI | — | Billboard Rock/Blues/Christian digital sales and Emerging Artists entries [S3] | https://billboard.substack.com/p/how-many-ai-artists-have-debuted |

### 2.2 Techniques that recur across successful acts

| # | Technique | Who used it | Observed result | Tag |
|---|---|---|---|---|
| A1 | **Human-written lyrics** pasted into a custom-lyrics mode | Acts A, J, K, P, and E (reported) | The only AI-era songs with a clear commercial copyright and sample-clearance claim were the human-lyric ones (Act K); human lyrics were also the main defense in public disputes (Act A) | [S3] https://www.fortune.com/2024/06/06/metro-boomin-bbl-drizzy-drake-kendrick-ai-beats-pay/ |
| A2 | **Personal or biographical source material** (diaries, grief, faith) | Acts A, B | Emotionally specific lyrics in adult R&B and gospel, the genres where these acts charted | [S3] https://www.cbsnews.com/entertainment/31 ; https://www.aimusicpreneur.com/ai-music-news/china-styles-i-love-me-loud-billboard/ |
| A3 | **Sing it yourself, then convert the voice** (Suno voice processing or an RVC-style voice model) | Acts G, H, I, M | Keeps human phrasing, timing and emotion, which is the most "real"-sounding route. Risk: if the result resembles a specific star, expect a takedown (Act G) | [S3] https://www.dazeddigital.com/music/article/71134/1/suno-is-the-new-auto-tune-meet-the-artists-using-ai-to-go-viral ; https://en.wikipedia.org/wiki/I_Run |
| A4 | **Upload a human demo** (beat, chords, top line) and let the model re-render it | Act F | Speed: the producer claims weeks become days. Risk: close copies of the input or of other works | [S3] https://www.npr.org/2025/06/17/nx-s1-5431544/timbaland-ai-music-suno-stage-zero-tata-generative |
| A5 | **Lock one voice** with Persona/Voices across an album | Acts D, F | A consistent "artist" identity across releases, which brand-building needs | [S3] https://au.rollingstone.com/music/music-news/velvet-sundown-ai-band-suno-79399 ; [S] https://about.suno.com/blog/v5-5 |
| A6 | **Massive over-generation, ruthless curation** | Act B (500+ per album cycle); Act K (12+ genre passes for one song) | A keeper ratio of 1 in many; genre exploration finds the "joke-lands" or "emotion-lands" version | [S3] https://www.aimusicpreneur.com/ai-music-news/china-styles-i-love-me-loud-billboard/ ; https://en.wikipedia.org/wiki/BBL_Drizzy |
| A7 | **Test the hook on TikTok before finishing the song** | Acts J, N, and the Act G label | Demand-led expansion: only finish what already has traction | [S3] https://en.wikipedia.org/wiki/Butterbro ; https://www.techloy.com/10-ai-music-acts-that-have-officially-topped-the-global-charts/ |
| A8 | **Human producer finishing**: Pro Tools production, self-mix, live-action video | Acts G, H, I, A | Reads as a "real" record and gets radio and editorial pickup | [S3] https://en.wikipedia.org/wiki/I_Run ; https://en.wikipedia.org/wiki/Xania_Monet |
| A9 | **Fast album cadence** (albums weeks apart) | Act D | Short-term algorithmic lift, then a stall and press scrutiny; one outlet infers that Spotify throttles volume | [S3] https://www.digitalmusicnews.com/?p=327133 [U on throttling] |
| A10 | **Anonymous or AI visual persona** (AI photos, an actor playing the artist) | Acts D, H, B | Works until it is exposed; exposure brought backlash in each documented case | [S3] https://www.techradar.com/computing/artificial-intelligence/spotifys-latest-breakout-band-the-velvet-sundown-appears-to-be-ai-generated-and-fans-arent-happy |
| A11 | **Familiar material**: covers, parodies, well-known songs | Acts L, M, J, K | Fastest route to virality. Publishing stays with the original writers (Act L), and voice imitation carries the most legal and ethical risk | [S3] https://mixmag.asia/read/madonna-like-a-prayer-cover-generative-ai-credits-update-josh-fawaz-news |
| A12 | **Distribute through a permissive distributor** with disclosure | Act B used DistroKid | Reached charts without a label; the label deal came after traction | [S3] https://www.aimusicpreneur.com/ai-music-news/china-styles-i-love-me-loud-billboard/ |

### 2.3 Disclosure and platform-policy handling (what happened)

| Pattern | Example | Outcome | Source |
|---|---|---|---|
| Denied AI, then admitted it | Act D: the X account said "not AI-generated in any capacity" on 29 June 2025; a spokesperson later admitted Suno; the bio later said "synthetic music project guided by human creative direction" | Credibility collapse; became the case study for labeling | [S3] https://musictech.com/news/industry/the-velvet-sundown-ai-band-suno/ ; https://aimusic.substack.com/p/ghost-musicians-and-the-era-of-perfect |
| Not upfront early, then explained publicly in interviews | Act A | The deal went through; peer-artist backlash followed; critics called for labels | [S3] https://www.songfacts.com/facts/xania-monet ; https://thehub.news/kehlani-and-sza-lead-backlash-against-ai-record-deal/?amp=1 |
| Silent / unreachable creator | Act C | Press framed it around the real artist whose sound it resembled | [S3] https://abcnews.go.com/culture/story/ai-generated-country-song-topping-billboards-country-digital-127445549 |
| Vocal resembling a real star, plus that star's name as a hashtag | Act G | Removed by Spotify ("strictly prohibits artist impersonation"); RIAA takedowns; withheld from Hot 100; royalty claim; re-recorded with a human singer, and that version charted higher in the UK | [S3] https://en.wikipedia.org/wiki/I_Run |
| Credits updated after an investigation | Act L | Added "generative AI vocals" and "AI drums" credits; the case triggered ARIA's rule change | [S3] https://mixmag.asia/read/madonna-like-a-prayer-cover-generative-ai-credits-update-josh-fawaz-news |
| Open "AI-assisted" bio from day one | Acts P1–P3 | Charted without notable controversy | [S3] https://billboard.substack.com/p/how-many-ai-artists-have-debuted |
| Credited the AI in the byline | Act M ("with A.I. assistance") | Long-running channel; framed as parody | [S3] https://loudwire.com/interview-there-i-ruined-it-song-mashup/ |
| AI tracks uploaded to dead artists' profiles (spam/fraud) | Unnamed uploader via a TikTok-owned distributor | Removed under Spotify's Deceptive Content policy | [S3] https://consequence.net/2025/07/spotify-ai-generated-songs-dead-artists |

**Takeaway [E]:** the acts that disclosed early (P1–P3, M) had the fewest problems. The acts that hid AI use (D, G, L) each hit a takedown, a credit change or a rule change. Disclosure systems (Spotify AI Credits, Apple Transparency Tags, the IFPI labels) became standard during 2026, so hiding AI use now carries more risk.

---

## 3. Part B.1 — anatomy of a modern hit (the target you are working backwards to)

### 3.1 Timing and length

| Metric | Value | Era / sample | Tag | Source |
|---|---|---|---|---|
| Intro length, top-10 singles | ~20 s (mid-1980s) to ~5 s (2015) | 303 top-10 singles, 1986–2015 | [S] | https://news.osu.edu/has-music-streaming-killed-the-instrumental-intro/ |
| Tempo change | about +8% over the same period | same | [S] | same |
| Time to title/hook once lyrics start | about 18% sooner | same | [S] | same |
| Did attention-grabbing songs stream better within an artist's catalog? | No evidence | Spotify follow-up in the same study | [S] | same |
| Average top-10 intro | ~9 s; first chorus at ~0:33 | Hit Songs Deconstructed quarterly (2014) | [S3] | https://reports.hitsongsdeconstructed.com/articles/the-hit-songs-deconstructed-trend-report/ |
| Time to first chorus, pop vs hip-hop | ~39 s pop / ~30 s hip-hop | HSD (2017) | [S3] | https://reports.hitsongsdeconstructed.com/articles/hip-hop-vs-pop-which-hooks-you-faster/ |
| Time to first chorus, Hot 100 No. 1s 2020–23 | ~38 s | Unsourced blog claim | [U] | https://djwillgill.com/how-to-write-band-music-in-2026/ |
| Year-end Hot 100 mean length | 3:16 (2020), 3:24 (2025); median 3:09–3:13 (2024–25); peak ~4:37 (~1990) | 6,618 songs, 1959–2025 | [S3] | https://dev.to/tonywangca/are-songs-really-getting-shorter-6618-hot-100-hits-1959-2025-4cdg |
| Songs with 10+ weeks on chart (2025) | average 3:17; shorter songs more common among long-runners | HSD 2025 Staying Power | [S3] | https://www.hitsongsdeconstructed.com/wp-content/uploads/2026/03/2025-Staying-Power-Highlights-from-the-Report.pdf (via search summary; PDF is image-only) |
| Spotify charting songs | ~3:00 average in 2024, 30 s shorter than in 2019 | Chartmetric | [S3] | https://www.hypebot.com/songs-are-getting-shorter-and-the-surprising-truth-behind-it/ |
| Most common pop form | ABABCB (verse-chorus-verse-chorus-bridge-chorus), then BABABCB (chorus-first) | HSD editor via a secondary blog | [S3] | https://vakseen.com/site/?p=2873 |
| Chorus repetition and No. 1 odds | each extra chorus repeat: +14.5% likelihood of reaching No. 1 (+17% for top 40) | ~2,400 songs over ~54 years | [S3] | https://www.npr.org/2015/01/11/376496332/the-more-the-better-repetition-propels-songs-up-the-charts |
| Post-chorus | widespread in recent pop; usually 8 bars (4 also common); also in country | BMI / Top40 Theory | [S3] | https://www.top40theory.com/blog/everything-you-need-to-know-about-the-postchorus ; https://bmi.com/news/entry/the-power-of-post-choruses |

**Working targets for an AI prompt or edit [E]:**
- First vocal by 0:05–0:10.
- First chorus or hook by 0:30–0:45, or open with the chorus (BABABCB).
- Total length 2:30–3:30.
- At least three chorus passes.
- A post-chorus or tag hook after choruses 2 and 3.
- Verse 2 shorter than verse 1 (a common modern edit).

### 3.2 Structure templates by genre [E unless tagged]

| Genre | Template (sections) | Notes |
|---|---|---|
| Mainstream pop | [Intro 0–4 bars] V1 – Pre – **Chorus** – Post – V2 (half) – Pre – **Chorus** – Post – Bridge – **Final chorus (lift)** – Post/Outro | ABABCB is the most common form [S3: https://vakseen.com/site/?p=2873] |
| Chorus-first pop / TikTok-first | **Hook** – V1 – Chorus – V2 – Chorus – Bridge – Chorus | The hook doubles as the 15–30 s social clip (cf. Acts J, N) |
| Hip-hop / rap | Hook – Verse (16) – Hook – Verse (16 or 12) – Hook – [Outro] | Faster to the hook than pop [S3: https://reports.hitsongsdeconstructed.com/articles/hip-hop-vs-pop-which-hooks-you-faster/] |
| Country | V1 – Chorus – V2 – Chorus – Bridge – Chorus (often a final chorus "turn" in the lyric) | Story-driven; the title often lands as the last line of the chorus. Post-choruses now appear too [S3: https://bmi.com/news/entry/the-power-of-post-choruses] |
| R&B / adult R&B | Intro – V1 – Pre – Chorus – V2 – Pre – Chorus – Bridge – Chorus – ad-lib vamp outro | The ad-lib vamp is where vocal "richness" sells |
| EDM / dance | Intro (DJ-friendly in the club edit; short in the radio edit) – Verse/Build – **Drop** (instrumental or vocal-chop hook) – Breakdown – Build – Drop 2 – Outro | Radio/streaming edits cut intros to a few seconds |
| Rock / alt | Riff intro (short) – V – Chorus – V – Chorus – Bridge/solo – Double chorus | The riff acts as the instrumental hook |
| Gospel / CCM | V – Chorus – V – Chorus – **Bridge repeated with build** – Chorus | The repeated bridge works as the energy peak (Act A charted in gospel) |

### 3.3 Lyric craft

| Principle | Practice | Tag / source |
|---|---|---|
| Prosody | Stressed syllables fall on strong beats and long notes. Lines are "stable" or "unstable" depending on line length, line count and stress pattern, and that should match the emotion. Use contrast (different line lengths and counts) between verse and chorus | [S3] https://www.coursera.org/learn/songwriting-lyrics ; https://online.berklee.edu/courses/lyric-writing-tools-and-strategies |
| Syllable budget | Keep the matching lines of verse 1 and verse 2 to the same syllable count (±1) so the melody repeats cleanly. Pop chorus lines tend to be short (about 5–9 syllables); verses can be denser | [E] |
| Title in the chorus | Put the title in the first and/or last line of the chorus. Shorter, often one-word titles have become more common | [S] https://news.osu.edu/has-music-streaming-killed-the-instrumental-intro/ (title length); placement [E] |
| Repetition | Repeat the chorus more, repeat words within it, keep it simpler | [S3] https://www.npr.org/2015/01/11/376496332/the-more-the-better-repetition-propels-songs-up-the-charts |
| Rhyme schemes | Verses AABB or ABAB with perfect plus slant rhyme; chorus with a strong end-rhyme on the title line. Avoid forced "AI rhymes" (fire/desire, heart/apart, soul/whole) | [E] |
| Concrete imagery | Specific objects, places, times ("the porch light", "2 a.m.", a street name) instead of abstractions. The charting acts drew on diaries and real life (A2) | [E] built on [S3] https://www.cbsnews.com/entertainment/31 |
| Conversational language | Write lines a person would say out loud; use second person ("you") in the chorus | [E] |
| Section labels for the model | Use `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Post-Chorus]`, `[Bridge]`, `[Outro]` tags, plus ad-lib cues in parentheses | [S3] https://www.peak-studios.de/en/suno-tutorial/ |

### 3.4 Melody and hook

- Use **one** core melodic hook and repeat it at least three times. The chorus melody should sit higher, or use longer notes, than the verse (contrast). [E]
- Use **multiple hook layers**: lyric hook, melodic hook, rhythmic hook (a drum or synth riff) and a post-chorus vocal-chop or "oh-oh" hook. The post-chorus is in effect a second hook after the chorus. [S3: https://www.top40theory.com/blog/everything-you-need-to-know-about-the-postchorus]
- With AI generators, hook quality varies most between generations. The finishing guide ranks "hook strength" first of six scoring criteria. [S3: https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/how-to-finish-one-suno-song-without-wasting-generations]

### 3.5 Arrangement and energy curve [E]

| Section | Energy (1–10) | Typical adds or subtractions |
|---|---|---|
| Intro (≤ 8 s) | 3–4 | Hook motif or chorus preview; filtered |
| Verse 1 | 4 | Drums thinned or half-time; bass simple; lead vocal dry and close |
| Pre-chorus | 5–6 | Riser, snare build, harmonic lift, drop the kick for the last bar |
| Chorus 1 | 7–8 | Full drums, wider synths/guitars, vocal doubles and harmonies, bass octave |
| Post-chorus | 7–8 | Vocal chop or chant hook, rhythmic focus |
| Verse 2 | 5 | Keep one new element from the chorus so energy doesn't fall back to zero |
| Chorus 2 | 8 | As chorus 1, plus one extra layer |
| Bridge | 4–6 | Strip back (contrast), new chord or melody, or a breakdown into a build |
| Final chorus | 9–10 | Key change, extra harmonies, ad-libs, drums at full |
| Outro | 3–5 | Tag the hook and end cleanly (avoid AI "fade into noise" endings) |

The rule behind it: every 8–16 bars something enters or leaves, and the loudest moment is earned by the quiet moment before it. AI generators often flatten this curve, so fix it with Replace Section / Extend or in the DAW. [E; editing tools: S3 https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/how-to-finish-one-suno-song-without-wasting-generations]

### 3.6 Production qualities that read as "expensive"

| Quality | What it is | How to get it with AI | Tag / source |
|---|---|---|---|
| Vocal up front | Lead vocal loud, intelligible, mostly dry, with effects on sends kept separate from the dry signal | Prompt "vocal-forward", "intimate close-mic vocal"; in the DAW, use a dry lead plus a short plate and a tempo delay on separate sends | [S3] https://themixreview.org/reviews/what-about-us/ ; https://www.roexaudio.com/blog/how-to-mix-and-master-your-suno-tracks-(and-actually-sound-professional) |
| Doubles and harmonies | Doubles add weight to the lead; stacks and harmonies widen the chorus | Generate, or sing and convert, doubles; mute the AI vocal stem and rebuild stacks (A3) | [S3] https://www.sweetwater.com/insync/?p=234398 ; https://nailthemix.com/kane-churko-papa-roach-vocal-mix-tips |
| Clean low end | Kick and bass don't fight; mono below ~100 Hz | High-pass the bass slightly above the kick fundamental or notch one of them | [S3] https://cryo-mix.com/blog/posts/mixing-suno-stems |
| Width | Mono-compatible center (kick, bass, vocal), wide sides (pads, doubles, guitars) | Pan stems apart | [S3] https://cryo-mix.com/blog/posts/mixing-suno-stems |
| Contrast | Sparse verses, full choruses (see 3.5) | Section-level regeneration | [E] |
| Absence of artifacts | No "Suno sheen" (washy reverb on vocals), warble, phasey stems, hiss or ghost vocals in drum stems | Start from the cleanest generation; spectral repair (RX); gentle low-pass on ringing stems; gate quiet passages | [S3] https://cryo-mix.com/blog/posts/mixing-suno-stems ; https://www.roexaudio.com/blog/how-to-mix-and-master-your-suno-tracks-(and-actually-sound-professional) |
| Genre choice | Cleaner vocal output in acoustic, folk and singer-songwriter styles than in dense metal, EDM or trap | Pick genres where the model is clean, or plan to replace stems | [S3] https://www.roexaudio.com/blog/how-to-mix-and-master-your-suno-tracks-(and-actually-sound-professional) |

### 3.7 Mix and master targets

| Platform | Normalization reference | True peak | Tag | Source |
|---|---|---|---|---|
| Spotify | −14 LUFS integrated (Loud mode −11; Quiet −19); quiet tracks are only partly raised | ≤ −1 dBTP (≤ −2 dBTP if the master is louder than −14) | [S] | https://support.spotify.com/artists/article/loudness-normalization/ |
| Apple Music (Sound Check) | ~−16 LUFS | −1 dBTP | [S3] | https://masteringthemix.com/blogs/learn/76296773-mastering-audio-for-soundcloud-itunes-spotify-and-youtube |
| YouTube | ~−14 LUFS (turns loud tracks down only) | −1 dBTP | [S3] | https://masteringthemix.com/blogs/learn/76296773-mastering-audio-for-soundcloud-itunes-spotify-and-youtube |
| Genre practice | Pop, EDM and hip-hop masters often around −11 to −8 LUFS; they get turned down, so punch matters more than loudness | — | [S3] | https://www.musicguymixing.com/what-lufs-to-master-to/ |

Mastering practice:
- Export WAV, not MP3. Mix and master at 44.1 kHz/24-bit or higher. [S3: https://cryo-mix.com/blog/posts/mixing-suno-stems]
- Raw Suno output is quieter and less dense than commercial records, so it needs mastering. [S3: https://www.roexaudio.com/blog/how-to-mix-and-master-your-suno-tracks-(and-actually-sound-professional)]
- Reference-match tonal balance to a released track in the same genre. [S3: same]
- Gentle compression: vocals about 3:1–4:1. "If you can hear it working, you've gone too far." [S3: https://cryo-mix.com/blog/posts/mixing-suno-stems]

---

## 4. Part B.2 — the release side (platform, distributor, chart and legal rules, 2025–2026)

### 4.1 Streaming platforms

| Platform | Rule / feature | Date | Tag | Source |
|---|---|---|---|---|
| Spotify | Removed 75M+ "spammy" tracks in the prior year. New music spam filter (mass uploads, duplicates, SEO hacks, artificially short tracks), rolled out gradually. Impersonation policy: vocal clones only with the artist's authorization; "profile mismatch" enforcement with distributors | Sept 2025 | [S3] | https://musicbusinessworldwide.com/spotify-has-deleted-75m-spammy-tracks-as-it-unveils-new-ai-music-policies ; https://techcrunch.com/2025/09/25/spotify-updates-ai-policy-to-label-tracks-cut-down-on-spam |
| Spotify | **AI Credits** (beta): per-element disclosure (vocals, instrumentation, composition, post-production, lyrics) shown in Song Credits, built on DDEX. Disclosure must come through the distributor (DistroKid first). Spotify says it does not down-rank tracks for being AI-assisted | 16 Apr 2026 | [S3] | https://interspacemusic.com/blog/spotify-ai-credits-live-disclosure-only-travels-through-your-distributor/ |
| Spotify | **"AI Persona" badge** on AI-generated artist profiles (self-declared or Spotify-determined, appealable). Music excluded from personalized/algorithmic recommendations by default unless the listener follows the artist | Announced 11 Aug 2026, live mid-Sept 2026 | [S3] | https://musictech.com/news/industry/spotify-label-ai-generated-artists-exclude-recommendations-default/ ; https://ca.billboard.com/business/streaming/spotify-to-label-ai-artists-on-the-platform-with-new-ai-persona-badge |
| Spotify | Asks creators to label AI-generated songs | Aug 2026 | [S3] | https://fortune.com/2026/08/11/spotify-asks-creators-to-label-songs-when-theyre-ai-generated/ |
| Apple Music | **Transparency Tags** for Artwork, Track, Composition and Music Video, self-reported by labels and distributors. Whether they are mandatory is [U]; a visible "Made With AI" label is reported for late 2026 [U] | Mar 2026 | [S3] | https://musictech.com/news/industry/apple-music-transparency-tags-ai/ ; https://www.digitalmusicnews.com/2026/03/05/apple-music-ai-transparency-tags-requirement/ |
| Deezer | Detects, tags and excludes fully AI tracks from algorithmic recommendations (2025); 13.4M tracks tagged in 2025; visible listener labels from June 2026. AI share of daily uploads: 10% (Jan 2025), 39% (Jan 2026), 44% (Apr 2026), over 50% (~90k/day, Jun 2026). Fully AI music is only ~1–3% of listening | 2025–2026 | [S] | https://newsroom-deezer.com/2026/07/ai-music-exceeds-50-percent-daily-uploads-deezer/ |
| YouTube | "Inauthentic content" (formerly "repetitious content") YPP rule: mass-produced or repetitive channels are demonetized at channel level, not removed | 15 Jul 2025 | [S3] | https://techcrunch.com/2025/07/09/youtube-prepares-crackdown-on-mass-produced-and-repetitive-videos-as-concern-over-ai-slop-grows |
| YouTube Content ID | Matches fingerprints, not AI origin; AI tracks can be falsely matched or claimed. Dispute with creation evidence (prompts, dates, stems, project files). Some distributors reportedly stopped registering AI tracks in Content ID [U] | 2026 | [S3] | https://sunowatermark.com/youtube-content-id-ai-music/ ; https://jackrighteous.com/blogs/ai-music-distribution-guide/stolen-ai-music-content-id-claim-recovery |
| Bandcamp | Bans music "generated wholly or in substantial part by AI"; bans AI imitation of artists or styles; enforced by user reports | 13 Jan 2026 | [S3] | https://techcrunch.com/2026/01/14/bandcamp-takes-a-stand-against-ai-music-banning-it-from-the-platform/ |

### 4.2 Distributors

| Distributor | Position | Tag | Source |
|---|---|---|---|
| DistroKid | Accepts AI-assisted music; AI disclosure step at upload (2026) for vocals, lyrics, melody and instrumentation; first to deliver Spotify AI Credits. Historically "comply with each streaming service" | [S3] | https://interspacemusic.com/blog/spotify-ai-credits-live-disclosure-only-travels-through-your-distributor/ ; https://www.hypebot.com/are-tunecore-cd-baby-distrokid-symphonic-blocking-ai-music.md |
| TuneCore / Believe | Parent company (2023): "we aim not to distribute any content that is 100% created by AI." 2026 reports conflict on whether fully AI tracks are accepted with disclosure | [S3] [U] | https://www.hypebot.com/are-tunecore-cd-baby-distrokid-symphonic-blocking-ai-music.md ; https://dynamoi.com/learn/lists/distributors-that-accept-ai-music |
| CD Baby | Help Center: "You will not be able to distribute A.I.-generated content"; the most restrictive. Treatment of AI-assisted content was later clarified per reports [U] | [S3] | https://www.hypebot.com/are-tunecore-cd-baby-distrokid-symphonic-blocking-ai-music.md |
| Symphonic | AI is "a tool"; rejects impersonation and infringement; pre-delivery audio scanning | [S3] | same |

### 4.3 Charts, awards and labeling standards

| Body | Rule | Date | Tag | Source |
|---|---|---|---|---|
| Industry coalition (IFPI, RIAA, A2IM, IMPALA, Recording Academy, SAG-AFTRA and others) | Voluntary track labels. **AI-Generated**: AI produced all or the primary creative elements (AI lead vocal, AI key instrumental, or prompt-only). **AI-Assisted**: substantially human, main performances human, some AI expressive elements | 10 Jul 2026 | [S] | https://www.aria.com.au/industry/news/aria-welcomes-global-music-industrys-new-standard-for-ai-labelling-in-recordings ; https://www.fimi.it/en/news/music-community-introduces-labeling-program-distinguish-genai-sound-recordings/ |
| IFPI chart network | Labels' AI chart-eligibility principles rolled out across official charts | 2026 | [S3] | https://www.musicbusinessworldwide.com/ifpi-rolls-out-labels-ai-chart-eligibility-principles-across-its-global-network-of-official-music-charts/ |
| ARIA (Australia) | Wholly AI-generated recordings ineligible from the chart dated 31 Aug 2026. Must be "substantially human made"; AI-use declaration required; albums assessed track by track; retroactive removal possible | Aug 2026 | [S3] | https://au.variety.com/2026/music/news/aria-introduces-new-rules-for-ai-generated-music-39662/ ; https://www.techspot.com/news/113609-wholly-ai-generated-music-excluded-australian-charts.html |
| Billboard (US) | AI songs still chart. Majors proposed a "substantially human made" requirement; Luminate plans AI labels. No formal blanket exclusion found [U] | 2026 | [S3] [U] | https://stereogum.com/2509333/australia-bans-ai-generated-songs-from-music-charts/news ; https://billboard.com/lists/ai-artists-on-billboard-charts |
| Recording Academy (Grammys) | Fully AI music ineligible; works with AI elements considered if human authorship is meaningful | 2023– | [S3] | https://www.thefader.com/2025/07/25/imoliver-human-ai-music-designer-signed-record-deal |

### 4.4 US copyright: what human contribution makes an AI-assisted song protectable

| Point | Detail | Tag | Source |
|---|---|---|---|
| Prompts are not authorship | Even detailed prompts don't give enough control; re-prompting is "re-rolling the dice" | [S3] | https://ipwatchdog.com/2025/01/29/part-two-copyright-office-ai-report-says-creative-prompting-doesnt-constitute-authorship/ |
| Purely AI material is unprotectable | Fully AI songs are effectively public domain: you can't stop others copying or remixing them | [S3] | https://copyrightalliance.org/ai-report-part-2-copyrightability/ ; https://www.rimonlaw.com/how-copyright-office-guidance-applies-to-music-that-includes-ai-generated-material/ |
| What is protectable | Human-authored expression perceptible in the output (your lyrics, your melody or recording uploaded as input), plus human creative selection, coordination, arrangement or modification of AI output. Decided case by case | [S3] | https://copyrightalliance.org/ai-report-part-2-copyrightability/ |
| Registration practice | Disclose and disclaim the AI-generated parts; 1,000+ such registrations | [S3] | https://www.wipo.int/en/web/wipo-magazine/articles/us-copyright-office-on-ai-human-creativity-still-matters-legally-73696 |
| Music examples | An AI-cloned-voice recording by a legacy country artist was registered as assistive AI use. An opera sound recording was registered covering "story, lyrics, spoken words, and selection, coordination, and arrangement," with the AI music and voices excluded | [S] / [S3] | https://blogs.loc.gov/copyright/2025/05/a-i-art-and-copyright-the-human-element-that-makes-all-the-difference/ ; https://chatgptiseatingtheworld.com/2025/03/05/us-copyright-office-registers-sound-recording-of-opera-with-ai-generated-music-and-singing-voices/ |
| Courts | D.C. Circuit affirmed the human-authorship requirement (2025); Supreme Court denied cert on 2 Mar 2026. How much human input is enough remains open (a separate Colorado case is pending) | [S3] | https://www.hklaw.com/en/insights/publications/2026/03/the-final-word-supreme-court-refuses-to-hear-case-on-ai-authorship |
| Practical consequence | Human lyrics were what a sample user had to clear and pay for (Act K) | [S3] | https://www.fortune.com/2024/06/06/metro-boomin-bbl-drizzy-drake-kendrick-ai-beats-pay/ |

**Protectability ladder [E, built on the above]:**
- Prompt-only: none.
- Human lyrics: lyrics protected.
- Human lyrics plus a human melody or demo uploaded as input: composition is largely protected.
- Plus human vocal or instrument re-recording: sound-recording elements protected.
- Plus human arrangement and edit of AI stems in a DAW: selection and arrangement protected, with AI stems disclaimed.

### 4.5 Label deals with AI platforms

| Deal | Terms reported | Tag | Source |
|---|---|---|---|
| UMG–Udio | Settled Oct 2025; licensed "walled garden" platform in 2026; brief 48-hour download window after backlash | [S3] | https://www.musicbusinessworldwide.com/universal-music-settles-udio-lawsuit-strikes-deal-for-licensed-ai-music-platform |
| WMG–Suno | Settled Nov 2025; licensed models in 2026, current models to be deprecated; free-tier songs not downloadable; paid tiers get download caps (reported 20/month Pro, 60/month Premier [U]) | [S3] | https://www.thedeepview.com/articles/suno-wmg-settle-lawsuit ; https://camposthomaz.com/en/conhecimento-ct/warner-music-ends-u-s-lawsuit-and-reaches-deal-with-suno-for-licensed-ai-models-starting-in-2026/ |
| UMG/Sony–Suno | Settlement talks at an impasse (Apr 2026) | [S3] | https://www.digitalmusicnews.com/2026/04/09/suno-universal-music-lawsuit-settlement-impasse/ |
| BMG–Suno | Revenue share in exchange for no claims (Aug 2026, headline only) | [S3] [U] | https://www.bostonglobe.com/2026/09/01/business/ai-music-industry-suno/ |
| Labels signing AI acts | A mid-size label built an AI roster (Acts A, B, E); six labels including a major approached Act B | [S3] | https://www.aimusicpreneur.com/ai-music-news/china-styles-i-love-me-loud-billboard/ |

---

## 5. Tool capabilities relevant to the ladder (for context)

| Capability | Note | Tag | Source |
|---|---|---|---|
| Custom lyrics + section tags | Basic control | [S3] | https://www.peak-studios.de/en/suno-tutorial/ |
| Extend / Crop / Replace Section / Remaster | Fix one section without regenerating the whole song | [S3] | https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/how-to-finish-one-suno-song-without-wasting-generations |
| Studio timeline + multitrack stem export | Stems for a DAW; plan tier gates vary [U] | [S3] | https://www.slstudio.pro/blog/suno-studio-guide-2026 ; https://artifactr.net/suno-stems-guide/ |
| Personas, which became **Voices** in v5.5 | Consistent or own voice | [S] | https://about.suno.com/blog/v5-5 ; https://help.suno.com/en/articles/11362305 |
| **Custom Models** (v5.5) | Tune the model on your own catalog (reported 6+ tracks needed [U]) | [S] / [S3] | https://about.suno.com/blog/v5-5 ; https://apipass.dev/blogs/suno-v5-5-guide-voices-custom-models-and-my-taste |
| Scale | ~7M songs/day generated on Suno (company or leaked figure) | [S3] | https://www.implicator.ai/suno-found-paying-users-the-labels-still-control-the-exit/ |

---

## 6. Part C — the ladder (technique → what you will hear)

### 6.1 Beginner

| Technique | What you will hear | Tag / source |
|---|---|---|
| Write a style prompt with genre + era + mood + 1–2 instruments + vocal type, with the vocal descriptor first | Fewer genre-mush results; the voice matches the song | [S3] https://www.roexaudio.com/blog/how-to-mix-and-master-your-suno-tracks-(and-actually-sound-professional) |
| Paste your **own lyrics** in custom mode with `[Verse]`/`[Chorus]` tags | The song has an actual structure and repeats the chorus; words sound personal rather than generic | [S3] https://www.peak-studios.de/en/suno-tutorial/ |
| Put the title in the chorus and repeat the chorus at least 3 times | A memorable, nameable song | [S3] https://www.npr.org/2015/01/11/376496332/the-more-the-better-repetition-propels-songs-up-the-charts |
| Generate 2–4 candidates, listen 3 times, score hook, clarity, structure, emotion, replay and fixability (1–5) | You pick on the hook, not on first impressions | [S3] https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/how-to-finish-one-suno-song-without-wasting-generations |
| Export WAV and run a basic AI master to about −14 LUFS / −1 dBTP | Plays as loud as other tracks on Spotify without distortion | [S] https://support.spotify.com/artists/article/loudness-normalization/ |

### 6.2 Intermediate

| Technique | What you will hear | Tag / source |
|---|---|---|
| Hook-first editing: crop the intro to ≤ 8 s; first chorus by about 0:45 or open on the chorus | Lower skip risk; the song "starts" immediately | [S] https://news.osu.edu/has-music-streaming-killed-the-instrumental-intro/ |
| Prosody pass on lyrics: match syllable counts across verses, stresses on downbeats, short chorus lines | Words land on the beat; fewer garbled or rushed AI phrasings | [S3] https://www.coursera.org/learn/songwriting-lyrics ; [E] |
| Replace Section / Extend for one weak part instead of re-rolling the whole song | Keeps the great chorus while fixing a bad verse or ending | [S3] https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/how-to-finish-one-suno-song-without-wasting-generations |
| Add explicit `[Post-Chorus]`, `[Breakdown]` and `[Final Chorus]` tags with energy cues | Sections rise and fall rather than staying flat | [S3] https://www.top40theory.com/blog/everything-you-need-to-know-about-the-postchorus ; [E] |
| Lock a voice with Personas/Voices across a project | An artist identity across a whole EP | [S] https://about.suno.com/blog/v5-5 |
| Generate the intro/hook 4 times first, then build the song from the best one | A consistent sonic signature from bar 1 | [S3] https://www.frankx.ai/blog/suno-music-production-workflow |
| Test the 15–30 s hook on short-form video before finishing the song | Demand data before you invest more time | [S3] https://en.wikipedia.org/wiki/Butterbro |

### 6.3 Advanced

| Technique | What you will hear | Tag / source |
|---|---|---|
| Export stems and mix in a DAW: EQ the kick/bass relationship, pan for width, gentle 3–4:1 vocal compression, separate dry and wet vocal | Clean low end, a clear vocal, a wider and "expensive" image | [S3] https://cryo-mix.com/blog/posts/mixing-suno-stems |
| Artifact cleanup: spectral repair, low-pass on ringing stems, gates on quiet sections, de-sheen the vocal | The "AI shimmer" and warble that give AI tracks away are gone | [S3] https://cryo-mix.com/blog/posts/mixing-suno-stems ; https://www.roexaudio.com/blog/how-to-mix-and-master-your-suno-tracks-(and-actually-sound-professional) |
| **Replace one or two stems with real playing** (bass, guitar, live drums, or a re-sung chorus double) | Groove and human micro-timing; earns AI-Assisted rather than AI-Generated status | [S3] https://jackrighteous.com/blogs/music-creation-process-guide/enhance-your-suno-ai-music-tips-for-beginners ; [S] https://www.fimi.it/en/news/music-community-introduces-labeling-program-distinguish-genai-sound-recordings/ |
| Reference-match the master to a commercial track in the same genre | Tonal balance sits next to label releases on a playlist | [S3] https://www.roexaudio.com/blog/how-to-mix-and-master-your-suno-tracks-(and-actually-sound-professional) |
| Upload your own demo, hum or chord sketch as the seed (A4) | The composition is yours, so melody and harmony carry intent; more protectable | [S3] https://www.npr.org/2025/06/17/nx-s1-5431544/timbaland-ai-music-suno-stage-zero-tata-generative ; https://copyrightalliance.org/ai-report-part-2-copyrightability/ |
| Disclose via distributor AI credits; avoid real-artist names in prompts, tags and hashtags | No takedowns; listeners see a transparent credit | [S3] https://interspacemusic.com/blog/spotify-ai-credits-live-disclosure-only-travels-through-your-distributor/ ; https://en.wikipedia.org/wiki/I_Run |

### 6.4 Pro

| Technique | What you will hear / get | Tag / source |
|---|---|---|
| **Human lead vocal**: sing it yourself (optionally converting it with your own licensed voice model), or hire a singer to re-record the AI guide | The single biggest realism jump: real breath, phrasing and emotion. Act G's human re-record charted higher in the UK than the original | [S3] https://en.wikipedia.org/wiki/I_Run ; https://www.dazeddigital.com/music/article/71134/1/suno-is-the-new-auto-tune-meet-the-artists-using-ai-to-go-viral |
| Use the AI output as a **demo or blueprint**: re-produce the arrangement in the DAW with your own sounds and use AI stems only as texture | Indistinguishable from a conventional production; strongest copyright position | [S3] https://www.slstudio.pro/blog/suno-studio-guide-2026 ; [E] |
| Custom Model trained on your own catalog | A signature sound that isn't the generic model sound | [S] https://about.suno.com/blog/v5-5 |
| External mastering engineer; stem mastering | Translation across car, earbuds and club; competitive density | [E] |
| Release system: consistent persona and visuals (real or clearly declared), steady single cadence instead of album dumps, TikTok-first hook tests, register composition and lyrics with AI parts disclaimed | Brand building without spam flags; a protectable catalog; label interest (Acts A, B, E were signed after traction) | [S3] https://www.digitalmusicnews.com/?p=327133 ; https://www.wipo.int/en/web/wipo-magazine/articles/us-copyright-office-on-ai-human-creativity-still-matters-legally-73696 |

### 6.5 Curation and iteration economics (as reported)

| Metric | Value | Context | Tag | Source |
|---|---|---|---|---|
| Candidates per decision | 2–4 | Finishing guide; "10 causes decision fatigue" | [S3] | https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/how-to-finish-one-suno-song-without-wasting-generations |
| Generations per keeper | 3–5 | Targeted work, review site | [S3] | https://fast.io/resources/suno-ai-review-2026/ |
| Generations to a "golden seed" / per finished track | 5–15 / 30–50 including tests | Production workflow guide | [S3] | https://www.frankx.ai/blog/suno-music-production-workflow |
| Versions before choosing a direction | 12+ genre variations | Act K | [S3] | https://en.wikipedia.org/wiki/BBL_Drizzy |
| Songs per album cycle | 500+ (about 10,000 in the account) | Act B, charting | [S3] | https://www.aimusicpreneur.com/ai-music-news/china-styles-i-love-me-loud-billboard/ |
| Time per song | "Three months" of work became "two days" | Act F's producer | [S3] | https://www.npr.org/2025/06/17/nx-s1-5431544/timbaland-ai-music-suno-stage-zero-tata-generative |
| Cost model | Credits per generation, not per usable output; downloads capped on paid tiers post-WMG deal [U] | — | [S3] | https://fast.io/resources/suno-ai-review-2026/ ; https://www.thedeepview.com/articles/suno-wmg-settle-lawsuit |
| Market odds | Over 50% of Deezer uploads are AI, but fully AI music is only 1–3% of listening | Discovery is the bottleneck, not supply | [S] | https://newsroom-deezer.com/2026/07/ai-music-exceeds-50-percent-daily-uploads-deezer/ |

**Estimated time budget per release-ready song by level [E]:**

| Level | Time | Workflow |
|---|---|---|
| Beginner | 0.5–2 h | Prompt, curate, AI master |
| Intermediate | 2–6 h | Lyric rewrite, section fixes, hook edits |
| Advanced | 1–3 days | Stem mix, artifact repair, one or two live replacements |
| Pro | 3–10 days | Human vocal session, full re-production, external master, release plan |

These are estimates; no source measured them.

---

## 7. Working backwards: a checklist from "finished hit" to "first prompt" [E]

1. **Release target:** what label will it carry (AI-Assisted or AI-Generated)? Is it chart-eligible under ARIA/IFPI-style "substantially human" rules? Does it need to be protectable? Decide which human pillars to keep (lyrics, melody, vocal, arrangement).
2. **Master target:** −14 LUFS / −1 dBTP, referenced against two genre hits.
3. **Mix target:** dry, forward vocal; doubles and harmonies in the choruses; mono low end; wide sides; no artifacts.
4. **Arrangement target:** energy curve as in 3.5; post-chorus hook; final-chorus lift.
5. **Song target:** under 8 s to the vocal; chorus by about 0:45; 2:30–3:30 long; 3+ choruses; title in the chorus.
6. **Lyric target:** prosody-matched, concrete, conversational, personal source material.
7. **Generation plan:** 2–4 candidates per pass; section-level fixes; stems out.
8. **Disclosure plan:** distributor AI credits; no real-artist names; consistent, honest persona.

---

## 8. Conflicts

1. **The account behind Act D's Suno admission is disputed.** The spokesperson who admitted Suno use later claimed he had hoaxed the media and was disavowed. The band's own bio says "AI support." [U] https://au.rollingstone.com/music/music-news/velvet-sundown-ai-band-suno-79399 ; https://aimusic.substack.com/p/ghost-musicians-and-the-era-of-perfect
2. **Act A's human share:** "writes the lyrics" vs "about 90% of lyrics with other humans helping" vs critics' "doing none of the work". [U] https://billboard.substack.com/p/how-many-ai-artists-have-debuted ; https://thehub.news/kehlani-and-sza-lead-backlash-against-ai-record-deal/?amp=1
3. **Act E's tools:** Suno only, or Suno plus Udio. [U] https://the-decoder.com/hallwood-has-signed-imoliver-sunos-most-streamed-ai-music-creator/
4. **Act L's ARIA peak:** No. 2 overall vs No. 4. Streams reported anywhere from 35M to 48.5M. [U] https://mixmag.asia/read/madonna-like-a-prayer-cover-generative-ai-credits-update-josh-fawaz-news
5. **TuneCore and CD Baby AI policies:** 2026 secondary sources contradict each other and the 2023 statements. [U] https://dynamoi.com/learn/lists/distributors-that-accept-ai-music
6. **Apple Transparency Tags:** mandatory vs optional. [U] https://www.digitalmusicnews.com/2026/03/05/apple-music-ai-transparency-tags-requirement/ vs https://lede-v2.stereogum.com/2491256/apple-music-introduces-ai-transparency-tags/news
7. **Spotify true-peak guidance:** −1 dBTP vs −2 dBTP for loud masters (both on Spotify's own page). [S] https://support.spotify.com/artists/article/loudness-normalization/
8. **Time to first chorus:** about 33 s (2014 HSD), about 39 s pop / 30 s rap (2017 HSD), about 38 s (an unsourced 2020–23 blog claim). No recent primary figure was found.
9. **Does front-loading help streams?** The Ohio State follow-up found no within-artist stream advantage for front-loaded songs, even though the chart-wide trend toward short intros is clear. https://news.osu.edu/has-music-streaming-killed-the-instrumental-intro/
10. **Suno stem and Studio tier gates** (Pro vs Premier) and download caps differ by source. [U] https://artifactr.net/suno-stems-guide/
11. **Generations per keeper:** 2–4 (finishing guide) vs 5–15 (production guide) vs hundreds (Act B). These likely reflect different goals: one song vs signature sound vs album catalog. [E]
12. **Billboard eligibility:** no adopted exclusion found, despite the majors' proposal and IFPI principles. [U]

## 9. Gaps

1. **No first-person, step-by-step workflow interview** with Acts A, B, C, D, E or N was retrievable. Billboard Pro, People, Tamron Hall and the full CBS transcript were paywalled or not fetched. Details such as generation counts and mastering chain are missing for most charting acts.
2. **Act C's generator and production process** are unknown; the creator never responded to press.
3. **No recent (2024–2026) primary figures** for average intro length, time to first chorus or post-chorus share in top-10 hits. Hit Songs Deconstructed reports are paywalled, and the 2025 Staying Power PDF is image-only.
4. **Official Apple Music and YouTube loudness documentation** was not retrieved; −16/−14 LUFS are from third-party guides.
5. **Syllables-per-line norms and rhyme-scheme frequencies** in current hits: no quantitative source found; guidance in 3.3 is [E].
6. **Energy-curve and arrangement norms** (3.5) and the "expensive mix" list are practitioner consensus and [E]; no engineer interview was retrieved.
7. **Status of WMG-licensed Suno models and the UMG–Udio platform** as of Oct 2026 was not confirmed; v5.5 launched in March 2026, but its licensing basis is unclear.
8. **Billboard's formal 2026 chart policy** on AI was not found in a primary document.
9. **YouTube music-specific AI policy** (labels for altered or synthetic content in music, Content ID eligibility for AI tracks) was not verified from official pages.
10. **Earnings and royalty economics** for AI acts (per-stream income, label-deal splits beyond headline figures) were not researched in depth.
11. **Time-per-song figures** by level (6.5) are estimates; no survey data was found.
