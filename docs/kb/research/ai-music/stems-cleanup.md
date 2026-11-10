# Research log: clean stems from AI songs, and cleaning up AI audio artifacts

Checked: 2026-10-31

**Legend**
- **[S]** Sourced from an official, vendor, or primary page (URL given)
- **[S3]** Third-party or community source: blog, review, forum, Reddit snapshot, retailer (URL given)
- **[E]** Editorial inference or standard audio-engineering practice, not tied to a specific source
- **[U]** Unknown, unverified, or conflicting between sources

Scope: separating vocals and instruments from AI-generated songs (Suno, Udio and similar), workflow order, artifact repair, MIDI extraction for rebuilding parts, and mastering. Prices are snapshots and change often. Confirm them on vendor pages before you publish.

---

## 1. Key numbers at a glance

| Item | Value | Tag | Source |
|---|---|---|---|
| Best published single-model vocal SDR (MVSep Multisong) | 12.39 dB vocals / 18.70 dB instrumental, "BS Roformer 124 bands, 87% overlap" (2026.07) | [S] | https://mvsep.com/algorithms |
| Best published drum SDR (MVSep Multisong) | 14.35 dB (MelBand + SCNet XL + BS Roformer SW ensemble) | [S] | https://mvsep.com/algorithms |
| Best published bass SDR (MVSep Multisong) | 14.87 dB (SCNet XL + BS Roformer SW) | [S] | https://mvsep.com/algorithms |
| Demucs htdemucs_ft (MVSep Multisong) | vocals 8.33, drums 11.24, bass 12.05, other 5.74 | [S] | https://mvsep.com/algorithms |
| Demucs htdemucs (MUSDB HQ, different test set) | 9.00 dB average SDR | [S] | https://raw.githubusercontent.com/adefossez/demucs/main/README.md |
| Suno Auto Split | up to 12 stems, 50 credits, Pro/Premier | [S] | https://help.suno.com/en/articles/13925185 |
| Suno Split from Mix / Advanced Split | 10 credits per stem; Advanced Split (~100 instruments) Premier only | [S] | https://help.suno.com/en/articles/13925185 |
| Suno Get MIDI (Studio) | 10 credits per stem | [S] | https://help.suno.com/en/articles/13925249 |
| Spotify normalization target | -14 LUFS integrated (ITU-R BS.1770); Loud -11, Quiet -19 | [S] | https://support.spotify.com/us/artists/article/loudness-normalization/ |
| Spotify true peak guidance | below -1 dBTP; below -2 dBTP if the master is louder than -14 LUFS | [S] | https://support.spotify.com/us/artists/article/loudness-normalization/ |
| Apple Music (Sound Check) | about -16 LUFS integrated, about -1 dBTP | [S3] | https://www.masteringthemix.com/blogs/learn/76296773-mastering-audio-for-soundcloud-itunes-spotify-and-youtube |
| YouTube | about -14 LUFS, turns loud tracks down only | [S3] | https://www.masteringthemix.com/blogs/learn/76296773-mastering-audio-for-soundcloud-itunes-spotify-and-youtube |

**How to read SDR:** SDR (signal-to-distortion ratio) is in dB, and higher means closer to the true isolated stem. Scores are only comparable within one test set. MVSep "Multisong", MUSDB18-HQ and vendor-internal sets give different absolute numbers, so never compare a MUSDB figure with a Multisong figure [S] https://mvsep.com/algorithms. A gap of about 0.5 dB SDR is usually audible on hard material but not always. That is an [E] rule of thumb, so judge by ear.

**"Fullness" vs "bleedless":** MVSep publishes two extra metrics. "Fullness" measures how much of the target stem's content is kept, and "bleedless" measures how little of the other stems leaks in. Models labeled "high fullness" keep more air and detail but are noisier, with more bleed [S] https://mvsep.com/algorithms. Example: the "Ensemble High Instrumental Fullness" scores 17.69 dB instrumental SDR but 34.79 fullness, against 18.23 SDR for the standard ensemble [S] https://mvsep.com/algorithms. Choose a fullness model when the stem must sound full on its own (for example an instrumental you will release). Choose a bleedless or high-SDR model when the stem goes on to more processing, such as MIDI conversion or a further split [E].

---

## 2. Separation tools and models

### 2.1 Generator-native stems

| Tool | What you get | Cost / plan | Notes | Tag / source |
|---|---|---|---|---|
| **Suno Get Stems: Auto Split** | Up to 12 stems | 50 credits per extraction; Pro or Premier | From Workspace/Library (… > Get Stems) or Studio (right-click clip > Split Stems) | [S] https://help.suno.com/en/articles/13925185 |
| **Suno Split from Mix** | One chosen instrument or vocal plus a complement track (2-stem) | 10 credits per stem; Pro/Premier | Useful for a clean vocal plus instrumental pair | [S] https://help.suno.com/en/articles/13925185 |
| **Suno Advanced Split** | Pick from nearly 100 instruments | 10 credits per stem; Premier only | | [S] https://help.suno.com/en/articles/13925185 |
| **Suno Studio Multitrack export** | All tracks as stems, "high-quality WAV" | Studio (Premier) | Help page gives no bit depth or sample rate; a review reports 32-bit/48 kHz WAV | [S] https://help.suno.com/en/articles/13925249 ; [U] https://aireiter.com/blog/suno-studio-2-0-review |
| **Suno WAV download** | WAV on suno.com for Pro/Premier; mobile defaults to MP3; stems don't count as extra downloads | Pro/Premier | | [S] https://help.suno.com/en/articles/13926081 |
| **Udio stems** | Historically vocals/bass/drums/other ("Stem Separation 2.0") | — | 2026 sources say downloads, including stems, are disabled or locked for most users | [S3]/[U] https://blog.dubspot.com/turn-an-ai-track-into-a-real-arrangement-2026 ; https://aivideosensei.com/guides/udio-v3-guide ; https://www.soundverse.ai/blog/article/How-to-download-songs-from-Soundverse-and-Udio |

**Important caveat on native stems:** Suno's stems are separated from the finished mix and are not true multitrack renders. They carry bleed and smearing like any separator's output. Community and vendor guides consistently say stems taken from a finished mix have "bleed and smearing" and soft drum transients [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026 ; https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them. Whether Suno Studio's newer multitrack export is generated per-track rather than separated is [U]: no official spec has been published.

### 2.2 Open models (run in UVR5, audio-separator CLI, or on MVSep)

MVSep Multisong scores, dB [S] https://mvsep.com/algorithms

| Model | Vocals | Instrumental | Best for | Date |
|---|---|---|---|---|
| BS Roformer 124 bands, 87% overlap | **12.39** | **18.70** | Top vocal/instrumental split | 2026.07 |
| BS Roformer 124 bands, 50% overlap | 12.33 | 18.64 | Nearly as good, faster | 2026.07 |
| BS Roformer 124 bands "fullness duality" (becruily) | 12.25 | 18.47 | Fuller-sounding pair | n/a |
| BS PolarFormer 124 bands | 12.02 | 18.33 | | n/a |
| Ensemble (BS Roformer + MelBand Roformer + SCNet XL IHF) | 11.93 | 18.23 | Previous best | 2025.06 |
| BS Roformer (ver. 2025.07) | 11.89 | 18.20 | | 2025.07 |
| MelBand Roformer "becruily deux" | 11.35 | 17.66 | Popular free community model | n/a |
| MelBand Roformer (2024.10) | 11.28 | 17.59 | | 2024.10 |
| SCNet XL IHF | 11.11 | 17.41 | Fast, good ensemble partner | n/a |
| MDX23C 8K FFT Full Band v2 | 10.36 | 16.66 | Older; full-band | n/a |
| UVR-MDX-NET Voc_FT (MDX-B) | 9.64 | 15.95 | Legacy UVR default | n/a |
| Demucs4 Vocals 2023 | 9.04 | 15.35 | | n/a |
| Demucs htdemucs_ft | 8.33 | 14.63 | Multi-stem, not vocals | 2022 |

Multi-stem (Multisong SDR, dB) [S] https://mvsep.com/algorithms

| Stem | Best listed | Strong single model | Demucs htdemucs_ft |
|---|---|---|---|
| Drums | 14.35 (MelBand + SCNet XL + BS Roformer SW ensemble) | BS Roformer SW 14.11; SCNet XL 13.42 | 11.24 |
| Bass | 14.87 (SCNet XL + BS Roformer SW) | BS Roformer SW 14.62; SCNet XL 13.81 | 12.05 |
| Other | 18.31 (MelBand + SCNet XL ensemble, "other" of instrumental) | SCNet XL 18.00 | 5.74 (of full mix) |
| Piano (separate leaderboard) | BS Roformer SW 7.83 | SCNet Large 5.89 | Demucs 6s: 2.23 |
| Guitar (separate leaderboard) | BS Roformer SW 9.05 | — | 6s described as "so-so" |

Note: "Other" figures are measured on different targets (other-from-instrumental vs other-from-mix), so read them only within a row [U].

Lead vs backing vocals (karaoke) [S] https://mvsep.com/algorithms

| Model | Lead | Back | Back+Instrum |
|---|---|---|---|
| BS Roformer 124 bands (MVSep Team) | 10.77 | 7.03 | 16.10 |
| BS Roformer (MVSep Team) | 10.41 | 6.61 | — |
| MDX-B Karaoke (from vocals) | 8.28 | 4.46 | — |

Drum sub-separation (DrumSep, validation set) [S] https://mvsep.com/algorithms: kick 22.22 (MelBand Roformer 4-stem), snare 17.09 (MelBand Roformer 4-stem), hi-hat about 8.56 (SCNet XL 5-stem). The page's column alignment is ambiguous, so treat the hi-hat figure as [U]. Cymbals and hats are the weakest drum targets. Expect to replace them with samples rather than rely on them [E].

Specialty models on MVSep [S] https://mvsep.com/algorithms: crowd removal, Medley Vox (multi-singer), male/female split, choir/SATB, bass, synth, piano, keys, organ, Rhodes, multichannel 5.1/7.1, and "Ensemble All-In" (5-stem ensemble plus guitar, piano, wind, strings, lead/back vocals and 7-part drumsep; slow).

**De-reverb / de-echo models** (no SDR leaderboard on MVSep's algorithm page) [S] https://mvsep.com/algorithms
- **anvuew dereverb_room**: BS-Roformer, mono, trained on simulated rooms (pyroomacoustics). The card compares it against a `dereverb_mel_band_roformer_mono` reference at 7.67 SDR but gives no own score [S] https://huggingface.co/anvuew/dereverb_room
- **UVR-DeEcho-DeReverb (VR arch)**: about twice as slow as the other DeEcho models. It handles mono room reverb but leaves heavy, bright plate reverb behind [S3] https://huggingface.co/spaces/wsj1995/GPT-SoVITS-v2pro/blame/main/tools/uvr5/webui.py
- A community note in the same UVR5 wrapper code recommends running MDX-Net first, then DeEcho-Aggressive, as the cleanest chain [S3] https://huggingface.co/spaces/wsj1995/GPT-SoVITS-v2pro/blame/main/tools/uvr5/webui.py
- Community model names circulating include "BS-RoFormer de-reverb", "Mel-RoFormer denoise", unwa "Inst V1" and "InstVoc Duality V2" [S3] https://huggingface.co/spaces/theneos/audio-separator/blob/2cc588ee195d3b2743d118766ff991df57dfeb3b/separwator.py

### 2.3 Running the models locally

**Ultimate Vocal Remover 5 (UVR5)**: free, open source GUI. v5.6 builds are available for Windows, macOS arm64 and x86_64, plus a DirectML build for AMD/Intel GPUs [S] https://github.com/Anjok07/ultimatevocalremovergui. One tracker dates v5.6.0 to 2026-05-24 [S3]/[U] https://awesome.ecosyste.ms/projects/github.com%2Fanjok07%2Fultimatevocalremovergui. MusicRadar's January 2026 test placed it 5th of 11 (13/20). It called its MDX-Net vocal extraction "exceptional, lossless" and its Demucs bass weaker [S3] https://www.musicradar.com/music-tech/i-tested-11-of-the-best-stem-separation-tools-and-you-might-already-have-the-winner-in-your-daw. Settings: VR models expose window size and aggression (default 10). MDX-Net models expose segment size and overlap, so start at defaults [S3] https://techtactician.com/?p=26472. Roformer models live under the MDX-Net/"MDXC" model types in UVR's Download Center [E/U]. Higher overlap gives slightly better SDR at the cost of time: 87% vs 50% overlap gained 0.06 dB vocal SDR on MVSep's BS Roformer 124 [S] https://mvsep.com/algorithms.

**python-audio-separator (CLI, runs UVR model files)** [S] https://pypi.org/project/audio-separator/
```bash
pip install "audio-separator[gpu]"        # or [cpu] for CPU / Apple silicon, [dml] for AMD/Intel on Windows
audio-separator -l --list_filter=vocals --list_limit=5      # top vocal models by SDR
audio-separator song.wav --model_filename model_bs_roformer_ep_317_sdr_12.9755.ckpt --output_format=WAV
# Ensemble two models (default avg_wave; others: median_wave, max_fft, min_fft, uvr_max_spec)
audio-separator song.wav -m model1.ckpt --extra_models model2.ckpt --ensemble_algorithm avg_wave
audio-separator --list_presets          # curated ensemble presets, e.g. vocal_balanced
```
The SDR in a filename like `sdr_12.9755` comes from that model's own test set, so it does not compare with the MVSep tables above [E]. The docs disagree on the default model and output format (FLAC vs WAV), so set both explicitly [U] https://pypi.org/project/audio-separator/

**Demucs CLI** [S] https://raw.githubusercontent.com/adefossez/demucs/main/README.md
```bash
uvx demucs -n htdemucs_ft song.wav                 # 4 stems, fine-tuned, ~4x slower than htdemucs
uvx demucs -n htdemucs_6s song.wav                 # adds guitar + piano (piano is poor)
uvx demucs --two-stems=vocals song.wav             # vocals + no_vocals
uvx demucs --float32 --shifts=5 --overlap 0.5 -n htdemucs_ft song.wav   # higher quality, GPU recommended
```
Defaults: int16 WAV output (use `--int24` or `--float32` to avoid an extra quantization step), overlap 0.25, segment capped at 7.8 s for HT models. `--shifts=N` averages N shifted predictions and is N times slower [S] https://raw.githubusercontent.com/adefossez/demucs/main/README.md. The author no longer actively works on Demucs, so expect no new features [S] same URL. For vocals in 2026, Demucs is clearly behind Roformer models (8.33 vs 12.39 dB on Multisong) [S] https://mvsep.com/algorithms.

### 2.4 Commercial and DAW-integrated tools

| Tool | Stems | Price (snapshot) | Local/cloud | Strengths / notes | Tag / source |
|---|---|---|---|---|---|
| **MVSep.com** | All models above, ensembles, specialty | Free tier plus paid premium; limits and price not confirmed | Cloud | Hosts top leaderboard models | [S] https://mvsep.com/algorithms ; price [U] |
| **LALAL.AI** | Vocals, instrumental, drums, bass, guitar, synth, strings, wind; also Echo & Reverb Remover, Lead/Back Splitter, Voice Cleaner | Free 10 min; Lite $7.50/mo (annual) 90 fast-min; Pro $15/mo (annual) 250 fast-min, VST and API | Cloud (VST on Pro) | Minutes = file length × stem types selected. Andromeda model claims up to 10% SDR over Perseus (vendor claim). MusicRadar 3rd, 15/20: good on guitar/piano; clumsy UI, costly per-stem billing | [S] https://www.lalal.ai/pricing/ ; [S] https://www.lalal.ai/blog/andromeda-audio-transformer-neural-network/ ; [S3] https://www.musicradar.com/music-tech/i-tested-11-of-the-best-stem-separation-tools-and-you-might-already-have-the-winner-in-your-daw |
| **Moises / Music.ai** | Vocals, drums, bass, guitar, piano, more | Free; paid tiers about $3.99–$9.99/mo (sources conflict) | Cloud/app | MusicRadar: good drums/bass, but vocals warble and bleed. Ableton's Live 12.3 separation reportedly uses Music.ai tech | [S3]/[U] https://sunowatermark.com/blog/moises-ai-review-2026/ ; https://www.musicradar.com/music-tech/i-tested-11-of-the-best-stem-separation-tools-and-you-might-already-have-the-winner-in-your-daw ; https://www.editorskeys.com/blogs/news/stem-separation-in-2026-which-daw-does-it-best |
| **AudioShake** | Vocals, drums, bass, guitar, piano, strings, dialogue, etc. | Indie per-stem pricing, about $20/mo for 4 stems (reported Oct 2026); enterprise custom | Cloud | Says it placed first overall in Sony's SDX 2023 (music and film), though it withdrew from the music track. ByteDance had the top music-track SDR | [S3] https://dj.studio/blog/dj-stem-separation-price-guide ; [S] https://www.audioshake.ai/post/audioshake-sony-demixing-2023 |
| **iZotope RX 11 Music Rebalance** | Vocals, bass, percussion, other (gain sliders, or export as stems) | Standard about £312 ex VAT; Advanced about $1,349–1,399 new, $399 upgrade | Local | Also the repair toolkit (Spectral De-noise, Spectral Repair, De-ess, De-reverb). MusicRadar: very good recognition and lossless, but stems sound more processed than the leaders | [S] https://www.izotope.com/en/products/rx/features/music-rebalance ; [S3] https://www.sweetwater.com/store/detail/RX11AdvUp--izotope-rx-11-advanced-upgrade-from-any-previous-version-of-rx-advanced-or-rx-post-production-suite/reviews ; https://www.musicradar.com/music-tech/i-tested-11-of-the-best-stem-separation-tools-and-you-might-already-have-the-winner-in-your-daw |
| **RipX DAW 8 / PRO** | Unmix to editable "Rip" notes; audio and MIDI treated as one | $99 / $198 list | Local (Win/macOS) | Best for note-level editing of separated parts and MIDI extraction. PRO adds Audioshop, advanced stem cleanup, Python scripting | [S3] https://www.soundonsound.com/news/hitnmix-ripx-daw-8-now-available ; https://mixdownmag.com.au/news/ripx-daw-8-the-first-and-only-daw-to-treat-audio-and-midi-as-one/ |
| **Logic Pro Stem Splitter** | Vocals, drums, bass, other; guitar and piano since 11.2; presets for acapella / instrumental | £199.99 / $199.99 one-time | Local, Apple silicon (M1+) only | MusicRadar's winner (16/20, Logic 11.2.2): clean vocals, piano and guitar | [S] https://support.apple.com/en-is/guide/logicpro/lgcp61bae908/mac ; [S] https://www.apple.com/newsroom/2025/05/logic-pro-amplifies-beat-making-on-mac-and-ipad-with-advanced-new-capabilities/ ; [S3] https://www.musicradar.com/music-tech/i-tested-11-of-the-best-stem-separation-tools-and-you-might-already-have-the-winner-in-your-daw |
| **Ableton Live 12.3+** | Vocals, drums, bass, others; High Speed or High Quality mode | Suite (£529) per third parties | Local; GPU on Apple silicon, CPU-only on Intel Macs and older Windows | High Quality is a multi-step process with higher SDR. Choosing "Others" forces all stems to be computed. Low-bitrate MP3 or low sample rate gives worse stems | [S] https://www.ableton.com/en/live-manual/12/stem-separation ; [S] https://help.ableton.com/hc/en-us/articles/23730994755996 ; Suite requirement [S3]/[U] |
| **FL Studio (21.2+, 2025)** | Drums, bass, instruments, vocals | Producer Edition £199 | Local | MusicRadar: middle of the pack, near Ableton. Underlying algorithm not confirmed | [S3] https://musictech.com/news/gear/fl-studio-21-2-stem-separation-daw/ ; https://www.musicradar.com/music-tech/i-tested-11-of-the-best-stem-separation-tools-and-you-might-already-have-the-winner-in-your-daw |
| **Steinberg SpectraLayers Pro 12** | Vocals, drums, bass, guitar, piano, sax/brass | $349.99 (Elements $89.99); 30-day trial | Local | MusicRadar 2nd (15/20): lossless, strong bass-synth extraction. Pro 12 notes "subtle" guitar/piano gains. Also a spectral editor for manual repair | [S3] https://sonicstate.com/news/2025/07/04/steinberg-releases-spectralayers-12 ; [S] https://download.steinberg.net/downloads_software/SpectraLayers_12/help/Pro/_new_features.html |
| **Cubase Pro 15 / Studio One Pro 7** | 4–6 stems | £481 / £169.99 | Local | MusicRadar: Cubase stems sound heavily processed; Studio One misplaces instruments into wrong stems | [S3] https://www.musicradar.com/music-tech/i-tested-11-of-the-best-stem-separation-tools-and-you-might-already-have-the-winner-in-your-daw |
| **LANDR Stems** | Vocals, drums, bass, other | From $8.25/mo | Cloud | MusicRadar 4th: crisp drums and vocals | [S3] same MusicRadar URL |
| **Fadr** | Vocals, drums, bass, etc. plus MIDI | Free plan; paid from about $10/mo | Cloud | Free option with MIDI extraction | [S3] https://create.routenote.com/blog/fadr-could-this-be-the-ultimate-stem-seperator/ ; https://dj.studio/blog/dj-stem-separation-price-guide |
| **Serato (Studio / DJ Pro stems)** | Vocals, melody, bass, drums (real-time) | Studio about $199 or $9.99/mo; DJ Pro about $249 | Local, real-time | Built for DJ/real-time use, not mastering-grade stems [E] | [S3]/[U] https://dj.studio/blog/dj-stem-separation-price-guide |

**What each is best at (synthesis):**
- **Vocals / instrumental:** BS Roformer 124-band (MVSep) or the best Roformer in UVR, then optionally an ensemble [S] https://mvsep.com/algorithms
- **Drums / bass:** BS Roformer SW or the SCNet XL ensemble on MVSep. Logic is the best DAW-native option [S] https://mvsep.com/algorithms ; [S3] MusicRadar
- **Guitar / piano:** BS Roformer SW, Logic 11.2+ or LALAL.AI. Avoid Demucs 6s piano [S] https://mvsep.com/algorithms ; [S] Demucs README
- **Note-level editing / MIDI:** RipX, Melodyne [S3] https://mixdownmag.com.au/news/ripx-daw-8-the-first-and-only-daw-to-treat-audio-and-midi-as-one/

---

## 3. Workflow for the cleanest stems

### 3.1 Before you separate: get a better source

1. **Download lossless.** Get WAV from suno.com on Pro/Premier. Mobile defaults to MP3 [S] https://help.suno.com/en/articles/13926081. Ableton's FAQ warns that low-bitrate MP3s or low sample rates give poorer stems [S] https://help.ableton.com/hc/en-us/articles/23730994755996, and guides repeat "WAV not MP3" [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026.
2. **Inspect the spectrum.** Open the WAV in a spectrum viewer (Spek, Audacity Plot Spectrum, RX). A hard shelf around 16 kHz is the classic fingerprint of a lossy or band-limited source. 128 kbps MP3 cuts at about 15–16 kHz, 192 kbps at about 19 kHz, 256–320 kbps above 20 kHz [S3] https://hydrogenaudio.org/index.php?msg=683024 ; https://dev.library.kiwix.org/content/stackoverflow_en_nopic_2021-08/questions/3578615/mp3-bitrate-detection-through-frequency-spectrum-analysis. A German guide reports Suno stems often cut off around 16 kHz [S3] https://www.antwort.net/a/tutorial/how-to-remove-ai-artifacts-from-suno-ai-stems-der-ultimative-guide.html. Suno's true output bandwidth and sample rate are disputed (44.1 vs 48 kHz) [U] https://aiwiki.ai/wiki/suno_v5.
3. **Generate a source that is easier to separate** [E, consistent with the guides below]:
   - Prompt sparser arrangements (fewer layers, "dry vocal", "minimal reverb", "clean mix"). Long reverb and high-frequency noise are where shimmer and bleed concentrate [S3] https://reddit.sentinel-team.org/posts/1s52x7v/snapshots/2026-03-27T18%3A20%3A17.4177Z. Clean-mix cues and milder energy words ("powerful but clear" rather than "massive") are reported to reduce artifacts [S3] https://apipass.dev/blogs/suno-v5-common-issues-and-solutions.
   - Generate 3–4 takes and keep the cleanest. Generate in 1.5–2 minute sections, because artifacts reportedly compound after about 2 minutes [S3] https://apipass.dev/blogs/suno-v5-common-issues-and-solutions.
   - Make an "instrumental" version of the same song as a separate clean bed, or use Split from Mix for a vocal plus complement pair [S] https://help.suno.com/en/articles/13925185. Caveat: a separately generated instrumental is a different render, so it will not phase-null against the full song. Use it as a replacement bed, not for subtraction [E].
4. **Try Suno Remaster on the full song before separating if the source is shimmery.** Subtle stays close and suits "a cleaner mix or clearer pronunciation". Normal (default) adds slight variation. High can change music and vocals [S] https://help.suno.com/en/articles/8105281. One r/SunoAI user found a High remaster "drastically" reduced shimmer, but that is a single anecdote [S3] https://reddit.sentinel-team.org/posts/1s52x7v/snapshots/2026-03-27T18%3A20%3A17.4177Z. Repeated remasters drift further from the source [S3] https://jackrighteous.com/en-gb/blogs/guides-using-suno-ai-music-creation/suno-ai-remaster-guide-v4.

### 3.2 Order of operations (recommended chain)

| Step | Action | Tool / model | Why |
|---|---|---|---|
| 1 | Get stems from Suno (Auto Split, or Split from Mix for vocal + complement) **and** keep the full-mix WAV | Suno | Free-ish starting point; compare against your own separation [S] https://help.suno.com/en/articles/13925185 |
| 2 | Separate **vocals vs instrumental from the full mix** using the top vocal model | BS Roformer 124-band (MVSep) or best Roformer in UVR; optional ensemble | Highest SDR stage; every later step inherits its errors [S] https://mvsep.com/algorithms ; [E] |
| 3 | A/B Suno's vocal stem against your Roformer vocal; keep the better one per section | Ears, null/solo checks | Neither always wins [E] |
| 4 | Vocals: split **lead vs backing** if needed | BS Roformer karaoke 124-band (lead 10.77 dB) | [S] https://mvsep.com/algorithms |
| 5 | Vocals: **de-reverb / de-echo** | anvuew dereverb_room (mono room), UVR-DeEcho-DeReverb, LALAL Echo & Reverb Remover, RX De-reverb | Done after isolation, because reverb models are trained on isolated vocals [S] https://huggingface.co/anvuew/dereverb_room ; [E] |
| 6 | Vocals: optional denoise (Mel-Roformer denoise model, or RX Spectral De-noise) | | [S3] https://huggingface.co/spaces/theneos/audio-separator/blob/2cc588ee195d3b2743d118766ff991df57dfeb3b/separwator.py |
| 7 | Split the **instrumental** (not the full mix) into drums / bass / other | BS Roformer SW or SCNet XL ensemble; Demucs htdemucs_ft as a free local fallback | Vocal bleed is already gone, so the multi-stem model has an easier job [E]; scores at [S] https://mvsep.com/algorithms |
| 8 | Split "other" into guitar / piano / synth if needed | BS Roformer SW, Logic 11.2, LALAL.AI | [S] https://mvsep.com/algorithms |
| 9 | Drums into kick / snare / hats, or go straight to drum-to-MIDI | MVSep DrumSep | [S] https://mvsep.com/algorithms |
| 10 | Bleed check: solo each stem, sum to mono, null test | DAW | See 3.4 |

### 3.3 Ensembles, averaging and phase tricks

- **Ensembling:** average the waveforms (avg_wave) of 2–3 strong but different models (for example BS Roformer + MelBand Roformer + SCNet XL). MVSep's 2025.06 ensemble of those three beat each member [S] https://mvsep.com/algorithms. In audio-separator, use `--extra_models` and `--ensemble_algorithm` (avg_wave, median_wave, max_fft, min_fft). `max_fft` keeps more content (fuller, more bleed) and `min_fft` keeps less (cleaner, thinner). Those descriptions are [E] from the algorithm names; the algorithm list is [S] https://pypi.org/project/audio-separator/. In 2026, a single BS Roformer 124-band (12.39) beats the 2025 ensemble (11.93), so ensembling is no longer automatically better [S] https://mvsep.com/algorithms.
- **Phase-inversion residual trick:** if you have the vocal stem *from the same render*, invert it and sum it with the original mix to get an instrumental (or the reverse). That only works when the stem is sample-aligned and level-matched to that exact file [E]. Separators already do this internally to produce the "complement" stem, which is why Suno's Split from Mix returns stem plus complement [S] https://help.suno.com/en/articles/13925185.
- **Re-separating Suno stems:** running a Suno vocal stem through a Roformer vocal model can strip leftover instrument bleed, at the cost of more artifacts. Do it only once, and compare [E]. "Separation can add its own artifacts, so compare with the original" [S3] https://jackrighteous.com/en-gb/blogs/guides-using-suno-ai-music-creation/reduce-ai-music-noise-fix-shimmer-hiss-in-suno-ai.

### 3.4 Quality control: bleed, nulls, mono

1. **Align everything** to bar 1, beat 1 and check the waveforms [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026.
2. **Null test:** sum all stems, invert polarity and play against the original mix. The residual is what the stems lost or added. A quiet residual (for example below -30 dBFS RMS) suggests the stem set is complete. That threshold is an [E] rule of thumb.
3. **Solo each stem.** Listen for hi-hat ghosts in vocals, vocal "s" in the hats, and kick thump in the bass [E].
4. **Mono check:** sum to mono. If a part thins or drops out, nudge its timing, flip polarity or narrow its width [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026. A free phase-coherence checker (Mix Check Studio) is suggested in [S3] https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them.

### 3.5 Format hygiene, and not double-processing

- Export stems as 24-bit or 32-bit float WAV at the source sample rate. Demucs defaults to int16, so pass `--float32` or `--int24` [S] https://raw.githubusercontent.com/adefossez/demucs/main/README.md. Avoid MP3 between steps, because each lossy pass adds swirl [E]; lossy compression "can make pre-existing artifacts significantly worse" [S3] https://apipass.dev/blogs/suno-v5-common-issues-and-solutions.
- Do not resample back and forth (44.1 → 48 → 44.1). Pick one rate for the project [E].
- Do not stack separators: a stem passed through three different models accumulates "underwater" artifacts. Prefer one top model per stage, or a parallel ensemble, over serial chains [E].
- Repair conservatively and back off if transients, air or consonants start to disappear. "Stop when the artifact is minor" [S3] https://jackrighteous.com/en-gb/blogs/guides-using-suno-ai-music-creation/reduce-ai-music-noise-fix-shimmer-hiss-in-suno-ai.

---

## 4. AI artifact cleanup: symptom → cause → fix

General rule: fix artifacts at the stem level, before mastering. "Mastering won't fix source artifacts" [S3] https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them ; https://jackrighteous.com/en-gb/blogs/guides-using-suno-ai-music-creation/reduce-ai-music-noise-fix-shimmer-hiss-in-suno-ai.

| Symptom | Likely cause | Fix (with settings where sourced) | Tag / source |
|---|---|---|---|
| **"Suno shimmer" / metallic, swirly high end** | Generative-model artifacts concentrated in long reverb tails and HF noise (FX, vocals, drums). Reported stronger on v5.5. Root cause not documented: diffusion-from-noise theory is disputed | (1) Regenerate, or Remaster (High is anecdotally helpful). (2) Low-pass or high-shelf cut on the affected stems only. Stems often cut off around 16 kHz anyway, so a 12–16 kHz low-pass on vocals/FX loses little; reserve a 12–14 kHz mix-bus low-pass for severe cases (an Audacity guide calls it aggressive). (3) Dynamic EQ or multiband compression around 8–16 kHz that only engages when the shimmer flares [E]. (4) Spectral de-noise on the stem (RX Spectral De-noise; raise Smoothing to reduce "musical noise"). (5) Narrow notches on metallic ringing resonances. (6) Shorten or replace the reverb: de-reverb the vocal, then add your own clean reverb. Users say EQ or gating alone often does not fully fix it | [S3] https://reddit.sentinel-team.org/posts/1s52x7v/snapshots/2026-03-27T18%3A20%3A17.4177Z ; [S3] https://www.antwort.net/a/tutorial/how-to-remove-ai-artifacts-from-suno-ai-stems-der-ultimative-guide.html ; [S3] https://redlib.ssps.io/r/SunoAI/comments/1jejzk5/mastering_suno_songs_in_audacity ; [S] https://downloads.izotope.com/docs/rx6/34-spectral-de-noise/index.html ; [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026 |
| **Steady hiss / noise floor** | Constant HF noise baked into generation | Gentle high-cut or spectral de-noise (learn a noise profile in a quiet gap, or use adaptive mode). Higher threshold removes more noise but also low-level detail | [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026 ; [S] https://downloads.izotope.com/docs/rx6/34-spectral-de-noise/index.html |
| **Phasey / watery / underwater vocals** | Separation artifacts (spectral masks leaving holes); codec-like generation artifacts; over-processing | Use a higher-SDR or "fullness" vocal model; ensemble two models; avoid serial re-separation; light RX Spectral De-noise; Melodyne to smooth wobbly pitch; worst case re-sing or re-voice the part. Warble is a "source-generation problem, not background noise" | [S] https://mvsep.com/algorithms ; [S3] https://jackrighteous.com/en-gb/blogs/guides-using-suno-ai-music-creation/reduce-ai-music-noise-fix-shimmer-hiss-in-suno-ai ; [E] |
| **Smeared / soft drum transients** | Generator and separator both blur onsets | Transient shaper (raise attack); faster compressor attack/release on drums; best: drum-to-MIDI and replace or layer samples (Slate Trigger-style triggering, or program your own pattern following the groove) | [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026 ; https://blog.dubspot.com/turn-an-ai-track-into-a-real-arrangement-2026 |
| **Mono-ish / collapsed or unstable stereo** | Inconsistent stereo placement in generated stems | Re-pan stems: kick and bass centered and mono, guitars slightly L/R, lead vocal centered, then add depth with your own reverb. Use a stereo imager sparingly: widening phasey AI material makes mono collapse worse, so check in mono every time | [S3] https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them ; https://blog.dubspot.com/mixing-ai-generated-stems-2026 ; caution [E] |
| **Low-bit / codec swirl ("MP3-ness")** | Lossy download, or lossy-like generation | Re-download WAV. Do not stack lossy passes. Low-pass above the codec cutoff to hide swirling HF. An exciter can re-add some HF after the cleanup | [S] https://help.suno.com/en/articles/13926081 ; [S3] https://www.antwort.net/a/tutorial/how-to-remove-ai-artifacts-from-suno-ai-stems-der-ultimative-guide.html |
| **Muddy low mids / boomy low end** | Bass, kick and low-mid instruments stacked in one range | Per-stem EQ: high-pass 30–40 Hz on everything except kick/bass; vocal low cut about 80–100 Hz; cut boxiness at 200–400 Hz; carve kick vs bass. Remove sub-rumble clicks | [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026 ; https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them ; https://blog.dubspot.com/turn-an-ai-track-into-a-real-arrangement-2026 |
| **Harsh vocals / sibilance** | Harshness at 3–6 kHz; exaggerated "s" | Hunt harsh spots at 2–5 kHz with narrow cuts; de-ess at 5–8 kHz; RX De-ess spectral mode for targeted control. If it pumps or dulls, check speed and try Fast mode. Prefer small narrow cuts over big high shelves | [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026 ; https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them ; [S] https://s3.amazonaws.com/izotopedownloads/docs/rx9/en/de-ess/index.html ; [S3] https://jackrighteous.com/es-gb/blogs/guides-using-suno-ai-music-creation/suno-studio-new-eq-fix-vocals-add-clarity-balance-mix |
| **Over-even, too-loud AI vocal** | Generated vocals are heavily leveled | Vocal compression 2:1–4:1 with 2–4 dB gain reduction; automate rides rather than squashing | [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026 |
| **Noisy / crunchy fade tails, clicks, pops, crackle** | Generation errors at ends; Persona crackle reported | Draw your own fade; gate or expand the tail; RX De-click / Spectral Repair (attenuate the selected region) on isolated clicks | [S3] https://reddit.sentinel-team.org/posts/1s52x7v/snapshots/2026-03-27T18%3A20%3A17.4177Z ; [S] https://www.izotope.com/en/learn/de-essing-a-master-tools-tips-and-tricks.html ; [E] |
| **Random volume dips / level inconsistency** | Model loudness drift; sections overpowering others | Clip-gain or volume automation per section before compression; per-stem compression; light bus compression at 1–2 dB GR | [S3] https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them ; https://blog.dubspot.com/mixing-ai-generated-stems-2026 |
| **Quality degrades after about 2 min, mud "after 3 minutes"** | Autoregressive error buildup | Generate shorter sections; extend from the cleanest earlier point; replace bad sections in Studio | [S3] https://apipass.dev/blogs/suno-v5-common-issues-and-solutions ; https://reddit.sentinel-team.org/posts/1s52x7v/snapshots/2026-03-27T18%3A20%3A17.4177Z |
| **Sudden genre / tempo drift** | Under-specified prompt; genre competes with other cues | Put genre in section tags and the style field; one genre plus one modifier; give BPM and key; re-state genre on each extend. In the DAW: tempo-map, time-stretch, or cut the drifted section | [S3] https://apipass.dev/blogs/suno-v5-common-issues-and-solutions ; [E] |
| **Phase cancellation between stems** | Stems drift or misalign | Align to bar 1; nudge timing; flip polarity; narrow width; verify with a correlation meter | [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026 ; https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them |

**Concrete starter chain for an AI vocal stem** (from the ranges above; exact order [E]):
1. RX Spectral De-noise or a Roformer denoise model, light (watch for lost consonants)
2. De-reverb (only if you will add your own space)
3. HPF 80–100 Hz → cut 200–400 Hz boxiness → narrow cuts at 2–5 kHz harsh spots
4. Compressor 2:1–4:1, 2–4 dB GR
5. De-esser 5–8 kHz
6. Low-pass about 14–16 kHz if shimmer remains; high shelf above 10 kHz *only* if the top is clean
7. Your own reverb/delay send. Pitch and timing in Melodyne if wobbly.
Sources: [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026 ; https://www.antwort.net/a/tutorial/how-to-remove-ai-artifacts-from-suno-ai-stems-der-ultimative-guide.html

**Resampling through tape or saturation:** light saturation or tape emulation "to glue the parts together" is a standard finishing move [S3] https://blog.dubspot.com/turn-an-ai-track-into-a-real-arrangement-2026. It also softens brittle HF and masks low-level swirl, but it adds harmonics in the shimmer band, so low-pass first and saturate second [E].

**Mid/side EQ:** shimmer and reverb artifacts often sit in the side channel. A side-only high-shelf cut above about 8–10 kHz can tame them while leaving the centered vocal and snare intact. This is [E]; no source gives specific M/S numbers.

---

## 5. MIDI extraction for rebuilding parts

| Tool | Poly? | Cost | Notes | Tag / source |
|---|---|---|---|---|
| **Suno Studio Get MIDI** | Per stem | 10 credits per stem | Select a stem in the Stems panel > Get MIDI; imports into any DAW. One review calls it a rough sketch with no chords or notation | [S] https://help.suno.com/en/articles/13925249 ; [S3] https://roo.beehiiv.com/p/suno-midi-export-cost |
| **Spotify Basic Pitch** | Yes, instrument-agnostic | Free, open source (Python + TS) | Tune onset and frame thresholds and minimum note length. Defaults suit sparse piano; dense music needs lower thresholds | [S] https://engineering.atspotify.com/meet-basic-pitch/ ; [S3] https://derivative.ca/community-post/tutorial/basicpitch2midi-touchdesigner/74757 ; https://github.com/spotify/basic-pitch-ts/issues/10 |
| **Melodyne 5** | Editor/Studio (DNA) poly; Essential/Assistant mono | Essential ~$99, Editor $399, Studio $699 (list) | Export notes as MIDI; best for vocal pitch/timing correction on AI vocals | [S3] https://www.pluginboutique.com/meta_product/3-Studio-Tools/48-Audio-Editor/6461-Celemony-Melodyne-5-Editor |
| **RipX DAW** | Yes | $99 / $198 | Audio and MIDI "as one"; edit notes in the separated audio, export MIDI | [S3] https://mixdownmag.com.au/news/ripx-daw-8-the-first-and-only-daw-to-treat-audio-and-midi-as-one/ |
| **Logic Pro** | Flex Pitch → MIDI (mono-oriented); Drum Replacement / audio-to-MIDI for drums | Included | Logic's audio-to-MIDI paths are documented in Apple's Logic guide; details not verified this session | [U] |
| **Fadr** | Yes | Free tier | Stems plus MIDI in the browser | [S3] https://create.routenote.com/blog/fadr-could-this-be-the-ultimate-stem-seperator/ |

**Rebuild workflow** [S3] https://blog.dubspot.com/turn-an-ai-track-into-a-real-arrangement-2026, with [E] additions:
1. Export WAV stems and line them up at bar 1. Detect or tap the tempo and confirm the kick sits on the grid.
2. Mark sections and note what works and what doesn't.
3. **Drums first:** mute the AI drums and program a pattern following the groove with your own kit, or trigger samples from the separated kick and snare (DrumSep stems give clean triggers) [S] https://mvsep.com/algorithms.
4. **Bass:** extract MIDI from the separated bass. It is monophonic, so it converts most reliably. Quantize lightly and play it with a bass VST or synth. That removes low-end mud and phase problems outright [E].
5. **Chords and melody:** Get MIDI or Basic Pitch on the "other", piano or guitar stem, clean the notes by hand, then double or replace with your own synths. Keep the AI pad quiet underneath for texture.
6. **Vocals:** Melodyne for pitch and timing on the AI vocal, or use the a cappella as a guide track and re-sing [E].
7. Restructure: shorter intro, breakdowns, a varied last chorus, a real ending. Bounce, rest, and revise in 2–3 passes.

---

## 6. Mastering AI tracks

### 6.1 Loudness targets

| Platform | Normalization target | True peak | Behavior | Tag / source |
|---|---|---|---|---|
| Spotify | -14 LUFS integrated (Normal); Loud -11, Quiet -19 | < -1 dBTP; < -2 dBTP if the master is louder than -14 LUFS | Turns loud tracks down. Turns quiet tracks up only as far as headroom allows (keeps 1 dB for lossy encoding). The Loud setting uses a limiter at -1 dB (5 ms attack, 100 ms decay). Album mode keeps the gain fixed across the album | [S] https://support.spotify.com/us/artists/article/loudness-normalization/ |
| Apple Music | about -16 LUFS (Sound Check) | about -1 dBTP | Only when Sound Check is on | [S3] https://www.masteringthemix.com/blogs/learn/76296773-mastering-audio-for-soundcloud-itunes-spotify-and-youtube ; https://www.production-expert.com/production-expert-1/apple-choose-16lufs-loudness-level-for-apple-music-heres-why?format=amp |
| YouTube | about -14 LUFS | about -1 dBTP | Turns down only | [S3] https://www.masteringthemix.com/blogs/learn/76296773-mastering-audio-for-soundcloud-itunes-spotify-and-youtube |
| Amazon Music | about -14 LUFS (one source -13) | -1 to -2 dBTP (sources differ) | | [S3]/[U] https://faq.recordjet.com/en/articles/6959419-how-loud-should-my-master-be-what-are-the-store-requirements |

**Practical target** [E, derived from the above]: aim for about -14 to -10 LUFS integrated depending on genre, with a -1 dBTP ceiling, or -2 dBTP if you master louder than -14 LUFS. Mastering much louder than -14 only gets turned down on Spotify and YouTube, while costing transients and adding codec distortion [S] https://support.spotify.com/us/artists/article/loudness-normalization/.

### 6.2 Mastering tools

| Tool | Price (snapshot) | Notes | Tag / source |
|---|---|---|---|
| **Suno Remaster** | Credits; in-app | Subtle / Normal / High variation strengths. This is a re-generation, not a classic master, so it can change content | [S] https://help.suno.com/en/articles/8105281 |
| **iZotope Ozone 12** | Elements / Standard / Advanced | Master Assistant Custom flow: genre targets, or your own reference (tonal balance, width, impact). Match EQ learns a reference curve. Gain Match for honest A/B. Elements has no individual modules | [S] https://www.izotope.com/en/learn/how-to-use-master-assistant-in-ozone.html ; [S] https://www.izotope.com/en/products/ozone/features/track-referencing ; [S3] https://pluginerds.com/?p=14460 |
| **Mastering The Mix REFERENCE** | Paid plugin | Level-matched A/B against commercial references; often paired with EXPOSE for QA | [S3] https://mixinggpt.com/blog/izotope-ozone-vs-logic-pro-mastering-assistant ; feature detail [U] |
| **LANDR** | Free 2 masters/mo reported; subscriptions vary | Online AI mastering | [S3]/[U] https://producelikeapro.com/blog/are-online-mastering-services-worth-it/ |
| **eMastered** | ~$14–19/mo (sources differ) | Free preview, pay to download | [S3]/[U] https://whatplugin.ai/reviews/best-ai-for-music-mastering |
| **BandLab Mastering** | Free (16-bit WAV); Membership about $10/mo for 24-bit and more presets | Universal / Fire / Clarity, plus member presets | [S3] https://violetrecording.com/bandlab-mastering-review/ |
| **RoEx Mastering+** | Free preview; about $6.49 per download | Also offers Automix for Suno stems with genre and per-stem "Importance" | [S3] https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them |

### 6.3 Mastering workflow for AI tracks [E, built from the sources above]
1. **Measure first.** AI output is often already heavily limited. A forum user describes a "tin can" sound from an over-driven, too-loud master [S3] https://reddit.sentinel-team.org/posts/1s52x7v/snapshots/2026-03-27T18%3A20%3A17.4177Z. If the WAV already reads about -9 LUFS with flat-topped peaks, do **not** add more limiting. Remix from stems or turn it down instead.
2. **Prefer mastering a remix from cleaned stems** over mastering the original stereo file.
3. Use light bus compression (1–2 dB GR) and gentle broad EQ [S3] https://blog.dubspot.com/mixing-ai-generated-stems-2026. Low-pass or shelf the shimmer band if needed; don't boost air on a band-limited file.
4. Pick 1–3 commercial references in the genre. Level-match them (Ozone Gain Match or REFERENCE) and use Match EQ at a partial amount (for example 25–50% [E]) so you don't copy the reference's curve wholesale [S] https://www.izotope.com/en/products/ozone/features/track-referencing.
5. Set the limiter ceiling to -1 dBTP (true-peak mode), or -2 dBTP if louder than -14 LUFS [S] https://support.spotify.com/us/artists/article/loudness-normalization/.
6. Check in mono, on small speakers, and after an AAC/OGG encode preview [E].

**Common mistakes** [E, plus sources]
- Over-limiting already-loud AI output: it doubles the distortion and pumping, and streaming normalization turns it down anyway [S] https://support.spotify.com/us/artists/article/loudness-normalization/
- Using mastering to fix source artifacts [S3] https://www.roexaudio.com/blog/suno-stems-sound-bad-here-is-why-and-how-to-fix-them
- Boosting highs with an exciter or high shelf on a shimmery source, which amplifies the shimmer [E]
- Wide stereo enhancers on phasey AI mixes, which collapse in mono [E]
- Running several AI masters in series (for example Suno Remaster, then LANDR, then Ozone) [E]

---

## 7. Step-by-step recipe (for the guide)

1. Generate a sparse, dry-ish arrangement (clean-mix cues, minimal reverb). Make 3–4 takes and keep the best.
2. Download WAV. Check the spectrum for an HF cutoff.
3. Optional: Suno Remaster (Subtle/Normal) if it's shimmery.
4. Get Suno stems (Auto Split, 50 credits) **and** separately run BS Roformer (MVSep, or the best Roformer in UVR) for vocals vs instrumental.
5. Per section, keep the cleaner vocal. Optionally split lead/backing, then de-reverb.
6. Split the instrumental with BS Roformer SW / SCNet XL ensemble (or Demucs htdemucs_ft locally) into drums, bass and other. Split "other" further if needed.
7. Null test and mono check.
8. Replace drums (samples or MIDI), rebuild bass from MIDI, double chords and melody with your own instruments via Get MIDI or Basic Pitch.
9. Clean the vocal (de-noise → EQ → compress → de-ess → LPF), then Melodyne or re-sing.
10. Mix (HPF 30–40 Hz on non-bass parts, mono low end, your own reverbs).
11. Master to -14 to -10 LUFS with a -1 dBTP ceiling, referenced and level-matched.

Sources: steps compiled from the sections above.

---

## Conflicts

1. **Spotify true peak:** some regional Spotify pages say only -1 dBTP; the US page gives -1 dBTP generally and -2 dBTP for masters louder than -14 LUFS. Use -2 dBTP if in doubt. https://support.spotify.com/us/artists/article/loudness-normalization/ vs https://support.spotify.com/et-en/artists/article/loudness-normalization/
2. **Suno output sample rate and bandwidth:** sources claim 44.1 kHz, 48 kHz, or 32-bit/48 kHz for Studio. A German guide reports stems cut at about 16 kHz. No official spec. https://aiwiki.ai/wiki/suno_v5 ; https://aireiter.com/blog/suno-studio-2-0-review ; https://www.antwort.net/a/tutorial/how-to-remove-ai-artifacts-from-suno-ai-stems-der-ultimative-guide.html
3. **Suno stems plan access:** the official help says Get Stems needs Pro or Premier, but third-party blogs say Studio stem and MIDI export is Premier-only. Both can be true (Get Stems vs Studio). https://help.suno.com/en/articles/13925185 vs https://blog.dubspot.com/turn-an-ai-track-into-a-real-arrangement-2026
4. **Udio stems:** older reviews say paid stems are available; 2026 sources say downloads are disabled. https://musci.io/ru/blog/udio-review vs https://blog.dubspot.com/turn-an-ai-track-into-a-real-arrangement-2026
5. **Ensemble vs single model:** older guidance says "always ensemble". The 2026 MVSep data shows the single BS Roformer 124-band beating the 2025 ensemble. https://mvsep.com/algorithms
6. **Moises vocal quality:** MusicRadar reports warbling vocals, while Ableton reportedly licenses Music.ai separation and scores well. Different products or model versions are possible. https://www.musicradar.com/music-tech/i-tested-11-of-the-best-stem-separation-tools-and-you-might-already-have-the-winner-in-your-daw ; https://www.editorskeys.com/blogs/news/stem-separation-in-2026-which-daw-does-it-best
7. **Low-pass severity:** an Audacity guide suggests a 12–14 kHz LPF plus 80–100 Hz HPF on the whole mix, which others call too aggressive; the Dubspot guide suggests a "gentle high-cut" per stem. https://redlib.ssps.io/r/SunoAI/comments/1jejzk5/mastering_suno_songs_in_audacity vs https://blog.dubspot.com/mixing-ai-generated-stems-2026
8. **Price snapshots** (LALAL third-party vs official, Moises, eMastered, LANDR, RX Advanced) differ across sources. The official LALAL page is used above. https://www.lalal.ai/pricing/
9. **audio-separator defaults:** its docs disagree on the default model and output format (FLAC vs WAV). https://pypi.org/project/audio-separator/
10. **FL Studio native separation:** MusicTech and MusicRadar confirm it; a vendor blog claims there is none. https://musictech.com/news/gear/fl-studio-21-2-stem-separation-daw/ vs https://stemsplit.io/blog/fl-studio-stem-separation

## Gaps

- No official MVSep pricing or free-tier limits retrieved (the FAQ URL returned 404).
- No published SDR for de-reverb models (anvuew, UVR-DeEcho), LALAL Andromeda, AudioShake, Moises, Logic, Ableton or RX on a shared test set. Only MVSep's own models have comparable numbers.
- No official cause for "Suno shimmer"; the diffusion-from-noise explanation is a forum opinion. No published spectral analysis of Suno WAV exports.
- No sourced numeric settings for RX Spectral De-noise or Spectral Repair on AI music, dynamic EQ on shimmer, or mid/side cuts. The ranges given are [E].
- The community "deton24" separation guide (a widely shared Google Doc of UVR/Roformer model recommendations) could not be retrieved. Model naming in UVR's Download Center is not verified.
- Logic Pro audio-to-MIDI, Drum Replacement and Session Player details not verified; Ableton edition requirement (Suite) not confirmed from Ableton's own page.
- Basic Pitch default threshold values not confirmed.
- Serato stem-separation version and quality not confirmed.
- No r/audioengineering threads retrieved; community evidence is mostly r/SunoAI snapshots and vendor blogs.
- AES/streaming loudness recommendations (for example AES TD1008) and Apple's official Sound Check documentation not retrieved.
