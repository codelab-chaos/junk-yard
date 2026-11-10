# Leonardo.ai model inventory (research log)

Checked: 2026-10-29. Scope: every generation model in the Leonardo.ai app (Image, Video, Audio, 3D tabs) and API, plus plan prices, token costs and the features that change cost or iteration count. This is a research log for the AI-model field guide, not finished copy.

Legend: **[S]** sourced (URL given). **[S3]** sourced from a third party only, not confirmed on a Leonardo page. **[E]** my estimate or arithmetic. **[U]** unsourced or unknown.

## 0. How this was gathered, and the limits

- `leonardo.ai` pages return HTTP 403 (Cloudflare) to plain fetches. I read them through the Chaos Atlas `web.fetch` reader and through the `r.jina.ai` reader proxy. Some pages (`/models`, `/lucid-origin`) only came through on the first route.
- `docs.leonardo.ai` (the API docs) is open. I downloaded `https://docs.leonardo.ai/llms.txt` and all 78 linked `.md` doc pages. They are the most complete model list, including some models not yet on the app's public models page.
- **The main gap is per-model token costs.** Leonardo no longer publishes a per-model token table. Its help centre says the cost "is shown on the button" before you generate, and every model landing page says the same. API dollar prices sit behind a logged-in calculator. The only official per-model figures are Nano Banana (40 tokens), Flow State (1 token per image), Pro Upscaler (73 to 1,211) and 3D (from 400). Everything else below is third-party, observed in screenshots, or estimated, and is labelled as such.
- I did not log in or generate anything, so no button costs were read first-hand.

## 1. Plans (individual and team), checked 2026-10-29

Source: https://leonardo.ai/pricing (via the reader, 2026-10-29). The yearly prices come from https://soku.ai/alternatives/leonardo-ai/pricing (read 2026-10-14) and https://screenrove.com/leonardo/flows (plan modal captured 2026-10-22). **[S]**

| Plan | $/mo monthly | $/mo yearly | Fast tokens | Rollover bank cap | Concurrency / queue | Relaxed ("Unlimited") | Notes |
|---|---|---|---|---|---|---|---|
| Free | 0 | n/a | 150 per day (no carry-over) | none | n/a | none | **Model access: "Auto only"**. Third-party models listed as "-" in the comparison table. Generations are public. "Basic" quality settings. Ultra, Blueprints and refs are "Limited". |
| Essential | 12 | 10 | 8,500 per month | 25,500 | 2 / 5 | none | 80+ models, private, top-ups, 10 trainings per month, 6 image refs |
| Premium | 30 | 24 | 25,000 per month | 75,000 | 3 / 10 | images on selected first-party models | 20 trainings per month |
| Ultimate | 60 | 48 | 60,000 per month | 180,000 | 6 / 20 | images, plus video on selected models | 50 trainings per month |
| Team Starter | $24 per seat (min 3 = $72) | same | 25,000 per seat (shared pool) | 3x | 6 / 20 | images and video | no top-ups on team plans |
| Team Growth | $48 per seat (min 3 = $144) | same | 60,000 per seat | 3x | 6 / 20 | images and video | team training |
| API PAYG | usage, in $ | n/a | n/a | n/a | 10 concurrent | n/a | $5 starter credit, credit never expires. Per-model $ rates only in the logged-in calculator. Docs say "API credits and app tokens are not directly comparable" (https://docs.leonardo.ai/docs/legacy-faq, https://docs.leonardo.ai/docs/pricing-and-plans-faq) |

Old plan names (Apprentice $10 / Artisan $24 / Maestro $48) are gone. https://theproofdesk.com/leonardo-ai-review (2026-10-06): "Those names no longer appear on any current Leonardo page." **[S3]**

### Dollars per token **[E]** (plan price ÷ fast tokens; assumes the whole allowance is used)

| Plan | $/1k tokens, monthly | $/1k tokens, yearly |
|---|---|---|
| Essential | 1.41 | 1.18 |
| Premium | 1.20 | 0.96 |
| Ultimate | 1.00 | 0.80 |
| Team Starter | 0.96 | n/a |
| Team Growth | 0.80 | n/a |

The Proof Desk independently gives the same monthly figures ($1.41 / $1.20 / $1.00). **[S3]** Top-up pack prices are not public; no source found them. **[U]**

### Relaxed / "Unlimited" eligibility **[S]**

This matters most for iteration cost, because rerolls on eligible models become free once your tokens run out.

- Image, on Premium, Ultimate and Team: Lucid Origin, Lucid Realism, Phoenix 1.0, Phoenix 0.9, FLUX Dev, FLUX Schnell, and the preset fine-tunes Anime, Cinematic Kino, Concept Art, Graphic Design, Illustrative Albedo, Lifelike Vision, Leonardo Lightning, Portrait Perfect and Stock Photography.
- Video, on Ultimate and Team only: MiniMax H3 (480p, Accelerated or Turbo only), Wan 2.6, Hailuo 2.3, Hailuo 2.3 Fast, Motion 2.0, Motion 2.0 Fast.
- Relaxed mode starts **only after all tokens are gone** and "cannot be manually enabled". It runs at lower priority and lower concurrency.
- Never eligible: all other third-party models (Nano Banana family, GPT Image, Veo, Kling, Seedance, Seedream and so on) and Flow State.
- Sources: https://intercom.help/leonardo-ai/en/articles/9044700-tokens-frequently-asked-questions (updated 2026-09-24) and https://leonardo.ai/pricing.
- Conflict: soku.ai (2026-10-14) read the Ultimate relaxed-video list as including "Motion 1.0". Motion 1.0 was retired on 2026-06-17 (see §6), so the current page and the help centre win.
- Rejected: https://pricepertoken.com/leonardo-ai-pricing says Essential includes "unlimited 1st-party". The official pricing page shows "-" for Essential. Rejected.

Token spend order: rollover, then this month's fast tokens, then top-ups (The Proof Desk). soku.ai notes the help articles disagree on whether rollover or fast tokens go first. **[S3]**

## 2. Image tab: full inventory

The model list is from https://leonardo.ai/models (read 2026-10-29). The "Featured" picker order is from the user's screenshot and https://screenrove.com/leonardo/flows (captured 2026-10-22: "Auto Image, GPT Image 2.5 Flare and Sunburst (New), GPT Image 2, FLUX 3 Image, Nano Banana 2.1, Nano Banana 2 Lite, Ideogram 4.5"). API IDs and parameters are from the docs.leonardo.ai pages (updatedAt dates noted).

"Relaxed" means eligible for unlimited relaxed generation.

| Model (Leonardo label) | Maker | API id | Added / released | Refs and limits on Leonardo | Max res | Relaxed | Quality modes |
|---|---|---|---|---|---|---|---|
| **Auto Image** | Leonardo (router) | n/a | n/a | n/a | n/a | depends | "An intelligent Preset that selects the best model for your prompt". It is the only option on the Free plan. In Screenrove's capture, Auto produced a **Lucid Origin** batch. |
| GPT Image 2.5 Flare | OpenAI | `openai/gpt-image-2.5-flare` | OpenAI 2026-09-08; Leonardo 2026-09-09 | up to 16 image refs, 1–8 imgs, transparent PNG, prompt ≤9,999 chars | 2880² (1:1), 3808×1632 (21:9) | no | LOW / MEDIUM (default) / HIGH / XHIGH / MAX |
| GPT Image 2.5 Sunburst | OpenAI | `openai/gpt-image-2.5-sunburst` | same | same; "same controls and same cost" as Flare | same | no | same |
| GPT Image 2 | OpenAI | `gpt-image-2` | on Leonardo by mid-2026 (doc 2026-07-29) | image refs | n/a | no | LOW / MEDIUM / HIGH |
| GPT Image-1.5 | OpenAI | `gpt-image-1.5` | early 2026 | image refs | no native 4K (Leonardo guide) | no | LOW / MEDIUM / HIGH (replaced `mode` on 2026-05-04) |
| GPT Image-1 | OpenAI | n/a | 2025 | n/a | n/a | no | legacy |
| FLUX 3 Image | Black Forest Labs | not in API docs as of 2026-10-29 (app only?) | BFL launch ~2026-10-01 (see §8); Leonardo date not found | multi-reference editing (BFL: up to 10 refs, bounding-box layout) | native 4K | no | n/a |
| FLUX.2 Pro | BFL | `flux-pro-2.0` | early 2026 | image refs | 1440 per side | no | n/a |
| FLUX.1 Kontext Max / Kontext [pro] | BFL | `flux-kontext-max` / `flux-kontext-pro` | 2025 | edit refs | 2048 | no | n/a |
| FLUX Dev | BFL (open weights) | `flux-dev` | 2024–25 | 1 style + 1 content ref; base for Elements/LoRA training | 2048 | **yes** | n/a |
| FLUX Schnell | BFL | `flux-schnell` | 2024–25 | 1 style + 1 content ref | 2048 | **yes** | n/a |
| Nano Banana 2.1 | Google | `google/nano-banana-2.1` | Google GA 2026-10-06; Leonardo **2026-10-09** | **14 image refs + 1 video ref**, ≤8 imgs, 10 aspect ratios | 1K / 2K / 4K (4096² max) | no | size tiers (S/M/L) |
| Nano Banana 2 | Google (Gemini 3.1 Flash Image) | `nano-banana-2` | early 2026 (doc 2026-03-09) | **6 image refs + 1 video ref** | up to 4K | no | size tiers |
| Nano Banana 2 Lite | Google (Gemini 3.1 Flash-Lite Image) | `nano-banana-2-lite` | Google GA 2026-06-30; Leonardo doc 2026-07-07 | 6 image refs | ~1584 px max side (1K-class) | no | n/a |
| Nano Banana Pro | Google (Gemini 3 Pro Image) | `gemini-image-2` | late 2025 | up to 14 refs (per the NB 2.1 FAQ) | native 4K | no | n/a |
| Nano Banana | Google (Gemini 2.5 Flash Image) | `gemini-2.5-flash-image` | Leonardo 2025-09-11 | 6 refs paid, 1 ref free | ~1K | no | flat price |
| Ideogram 4.5 | Ideogram | `ideogram/ideogram-4.5` | Ideogram 2026-09-30; Leonardo **2026-10-01** (in-app What's New v1.6.9) | image refs | native 2K (sizes up to 3328) | no | VERY_LOW / LOW / MEDIUM / HIGH |
| P-Image-Ideogram | Ideogram (the "P-Image" maker is unverified) | `ideogram/p-image-ideogram` | doc 2026-08-05 | n/a | up to 3456 | no | VERY_LOW to HIGH |
| Ideogram 4.0 | Ideogram | n/a | 2026 (open weights June 2026, per search) | n/a | 2K | no | n/a |
| Ideogram 3.0 | Ideogram | `ideogram-v3.0` | 2025 | n/a | n/a | no | TURBO / BALANCED / QUALITY |
| Seedream 5.0 Pro | ByteDance | `seedream-5.0-pro` | ByteDance 2026-07-08 | image refs | 2048 | no | n/a |
| Seedream 5.0 Flash | ByteDance | `bytedance/seedream-5.0-flash` | doc 2026-10-07 | multilingual text + refs | 3008 | no | n/a |
| Seedream 4.5 / 4.0 | ByteDance | `seedream-4.5` / `seedream-4.0` | 2025 | n/a | 4K native (per Leonardo guide for 4.0) | no | n/a |
| Recraft V4 / V4 Pro | Recraft | not in API docs | 2026 | n/a | V4 Pro "high-resolution" | no | n/a |
| Krea 2 / Krea 2 Turbo | Krea | `krea-2-turbo` | Krea 2 launched 2026-05-12 | n/a | Turbo up to 4096 | no | n/a |
| *Krea 3* (API docs only) | Krea | `krea/krea-3` | doc 2026-10-28 (not yet on /models) | 8 refs | 3200 | no | LOW / MEDIUM / HIGH (HIGH needs a ref and costs more); `thinking_mode` slow/fast |
| Lucid Origin | Leonardo | `lucid-origin` | Aug 2025 (https://modelmenu.dev/labs/leonardo.ai) | 1 style + 1 content ref | 3840×3616; app tiles 1024 / 1200 / 1440 | **yes** | FAST / ULTRA |
| Lucid Realism | Leonardo | `lucid-realism` | mid-2025 | 1 style + 1 content ref | 2496 | **yes** | FAST / ULTRA |
| Phoenix 1.0 | Leonardo | `phoenix-v1.0` | Dec 2024 | 4 style + 1 content + 1 character + img2img | 2048 | **yes** | FAST / QUALITY / ULTRA |
| Phoenix 0.9 | Leonardo | `phoenix-v0.9` | Jun 2024 | same | 2048 | **yes** | same |
| Preset fine-tunes: Anime, Cinematic Kino, Concept Art, Graphic Design, Illustrative Albedo, Lifelike Vision, Leonardo Lightning, Portrait Perfect, Stock Photography | Leonardo (legacy SDXL-era Kino XL / Albedo / Vision XL / Lightning XL, now presets) | n/a | legacy | n/a | n/a | **yes** | n/a |

The image API docs share these common parameters: `prompt_enhance` (AUTO / ON / OFF, default AUTO), `style_ids` (1 preset; default "Dynamic"), `quantity` (1–8; default 4 for most models, 1 for Nano Banana / Seedream). Sources: https://docs.leonardo.ai/docs/phoenix, https://docs.leonardo.ai/docs/lucid-origin, https://docs.leonardo.ai/docs/gpt-image-25-sunburst and the other pages listed in https://docs.leonardo.ai/llms.txt. **[S]**

### 2a. Image token costs on the Leonardo app

| Model / setting | Tokens | $ per image at $1.41/1k → $0.80/1k **[E]** | Status / source |
|---|---|---|---|
| Nano Banana (2.5 Flash Image), any gen | **40 per image**; extra refs free | $0.056 → $0.032 | **[S]** https://intercom.help/leonardo-ai/en/articles/12143945-nano-banana-gemini-2-5-flash-image (2026-08-25) |
| Lucid Origin, Fast, 1024², 4 images | **34 for 4** (~8.5 each) | ~$0.012 → $0.007 | **[S3]** observed Generate button, https://screenrove.com/leonardo/flows (2026-10-22). On the Free plan, an Auto run dropped the balance 150 → 116 (34 tokens) for a 4-image batch. |
| Nano Banana 2: 1K / 2K / 4K | 80 / 120 / 160 | $0.11 / 0.17 / 0.23 at Essential | **[S3]** https://www.scopeful.org/tools/leonardo ("verified July 2026"; unclear provenance, see §9) |
| Nano Banana Pro: 1K / 2K / 4K | 140 / 140 / 250 | $0.20 / 0.20 / 0.35 at Essential | **[S3]** Scopeful. Conflicts with imagine.art's "80 credits" (different platform's credits, rejected). |
| GPT Image 2: 1K / 2K / 4K | 259 / 1,033 / 2,042 | $0.37 / 1.46 / 2.88 at Essential | **[S3]** Scopeful. Conflicts with vibecoding.tech's "6.97 tokens" (implausible, rejected). |
| FLUX.2 Pro 1K | 62 | $0.09 | **[S3]** Scopeful |
| Recraft V4 1K | 40 | $0.06 | **[S3]** Scopeful |
| GPT Image 2.5 Flare / Sunburst | not found; officially "same cost" for both, scaling with size, quality, count and refs | n/a | **[U]** https://leonardo.ai/gpt-image-2-5 |
| Nano Banana 2.1 | not found; scales with 1K/2K/4K and count | n/a | **[U]** https://leonardo.ai/nano-banana-2-1 FAQ |
| FLUX 3 Image, NB2 Lite, Ideogram 4.5, Seedream 5.0, Krea 2 | not found | n/a | **[U]** |
| Lucid Origin cost drivers | mode (Fast/Ultra), size, count, style/content refs | n/a | **[S]** https://leonardo.ai/lucid-origin FAQ (via reader) |

Legacy feature table, still published (help centre "Token Usage", updated 2026-08-25, https://intercom.help/leonardo-ai/en/articles/8044033-token-usage). This is the old SDXL pipeline and does not cover current models. **[S]**

- Default 768² image: 1 per image (4 for 4).
- Elements: 1 / 4.
- Prompt Magic V2: 2 / 8.
- Remove background: 2.
- Unzoom: 5.
- Upscaler (legacy): 5.
- Alchemy, PMv3 off: 8 / 18. Alchemy, PMv3 on: 16 / 26. Alchemy V2: 16 / 26. Alchemy V2 on Lightning XL: 12.
- Alchemy Upscaler: 8.
- Image guidance: free tier 4; 2 refs 6; 3 refs 5 / 8; 4 refs 7.
- 3D texture preview: 5. Full 3D texture generation: 30 (aisouk.net reading).

Reference: dollar prices for Leonardo's own models on third-party APIs. These are not Leonardo tokens; use them to sanity-check. **[S3]**

- Phoenix 1.0 on Replicate (https://replicate.com/leonardoai/phoenix-1.0), per batch:

  | Mode | 1 image | 4 images | 8 images |
  |---|---|---|---|
  | Fast | $0.018 | $0.032 | $0.050 |
  | Quality | $0.038 | $0.116 | $0.230 |
  | Ultra | $0.075 | $0.260 | $0.506 |

  So Ultra costs about 4x Fast per image, and batches are cheaper per image in Fast mode.
- Lucid Origin on Replicate: Standard $0.0167, Ultra $0.0765 per image (https://whatmodel.sh/model/lucid-origin, observed 2026-09-26).
- Leonardo API (Scopeful "API pricing"), per image at 1K / 2K / 4K:
  - Lucid Origin and Lucid Realism: $0.01 / 0.05 / 0.19
  - Phoenix: $0.02 / 0.07 / 0.26
  - FLUX Dev: $0.01 / 0.05 / 0.19
  - FLUX Schnell: ~$0.00 / 0.01 / 0.05

Underlying provider list prices, for context **[S3]**:

- Nano Banana 2.1: ~$0.0336 per 1K image (aggregator, via https://letsdatascience.com/news/google-rolls-out-nano-banana-21-image-model-c6ac3b89).
- NB2 Lite: $0.034 per image at 1K (https://www.kittl.com/blogs/kittl-review-nano-banana-2-lite/).
- NB Pro: $0.134 at 1K/2K, $0.24 at 4K (pollinations registry comments, https://github.com/pollinations/pollinations/blob/a80a96f3/shared/registry/image.ts).
- FLUX 3 Image: $0.041–$0.607 by resolution, $0.048 at 1K (https://www.layer3labs.io/guides/flux-3-image-pricing).
- Seedream 5.0 Pro: $0.075 up to 2.36 MP (openart / imagine.art, conflicting with $0.045–0.09).
- Krea 2 Large: $0.06. Ideogram 4.5 via fal: $0.03–0.22 (https://promptowy.com/krea-2-vs-ideogram/).

Implication **[E]**: on Leonardo, a third-party image costs the same order of magnitude as the provider's API price. Leonardo's own models (Lucid, Phoenix, FLUX Dev/Schnell) are roughly 5–20x cheaper per image in tokens, and become free (relaxed) on Premium and above once tokens run out.

### 2b. Strengths, weaknesses and best uses (image)

Leonardo's own guide is the main source: https://leonardo.ai/news/ai-image-models (published 2025-12-04, updated 2026-03-09). Leonardo is writing about models it sells, so treat it as vendor opinion. Its blindspot notes are unusually candid.

- **Auto Image.** Routes the prompt to a model. Good for beginners. You give up control of cost and look. It is the only choice on the Free plan.
- **GPT Image 2.5 Flare.**
  - Leonardo: "fast, everyday work with strong prompt following". Picker text: "Fast everyday image generation with strong prompt following".
  - OpenAI claims up to 50% lower latency than GPT Image 2. One API benchmark measured 19.7 s vs 37.3 s (https://www.pixmax.ai/blog/gpt-image-2-5-review-flare-sunburst.html).
  - Weaknesses: text "improved but still imperfect on precise placement"; recurring characters can drift across separate generations (https://wavespeed.ai/blog/ai-comparisons/gpt-image-2-5-review/, https://www.eesel.ai/blog/chatgpt-images-2-5-review). One reviewer says GPT Image 2 still wins on dense multilingual text (https://picsart.com/blog/gpt-image-2-vs-gpt-image-2-5/). **[S3]**
- **GPT Image 2.5 Sunburst.**
  - Leonardo: choose it "when fine line work and small labels must hold up to a close look, and for precise edits". Picker text: "Highest-precision image generation and editing".
  - About 1.5–2x slower than Flare (pixmax). **[S3]**
  - Ideogram's own launch post says GPT Image 2.5 Sunburst and the Nano Banana models "become unusable within a few edits" in multi-turn editing, unlike Ideogram 4.5. That is competitor marketing (https://linkedin.com/company/ideogram-ai post, 2026-09-30).
  - In a Polish-text test, GPT Image 2.5 "did not miss any requested caption" where Krea 2 and Ideogram 4.5 failed on small text (https://promptowy.com/krea-2-vs-ideogram/). **[S3]**
- **GPT Image 2.** Picker text: "polished visuals with strong composition and creative direction from simple prompts". A side-by-side review found it clean on 6 of 7 reruns of a text prompt and "tends to need fewer rerolls despite being slower" (magicshot.ai via search, https://magicshot.ai/blog/gpt-image-2-vs-nano-banana-2). **[S3]**
- **GPT Image 1.5** (Leonardo guide).
  - Strengths: advanced editing, spatial logic, UI mockups; understands Markdown.
  - Weaknesses: "over-polished magazine aesthetic", slow, no native 4K, weak on non-Latin scripts.
- **GPT Image 1** (Leonardo guide). Style mimicry (Ghibli), charts. Weaknesses: yellow tint, alters faces from refs, slow. "Not recommended as a daily driver."
- **FLUX 3 Image.**
  - Picker text: "Native 4K detail, precise multi-reference editing and sharp text".
  - Third-party: native 2K/4K, up to 10 refs, bounding-box layout, good long-prompt adherence and multilingual text.
  - Slow: 20–30 s typical, 23–65 s measured (https://fuser.studio/articles/flux-3-klein-vs-flux-3-image, https://runware.ai/blog/flux-3-image-four-generations). One unconfirmed claim says it does a web lookup by default. **[S3]**
- **FLUX.2 Pro** (Leonardo guide). Cinematic realism, exact colour via hex codes. Typography is weaker than NB Pro on long phrases.
- **FLUX Kontext / Max.** Instruction edits and style transfer. Weak semantic and 3D understanding; quality degrades over repeated edits. Use Max for text.
- **FLUX Dev.** The training base for Elements/LoRA. Can look "plastic"; trained subjects can "stick" to their backgrounds.
- **FLUX Schnell.** Fastest and cheapest "digital sketchpad"; low fidelity.
- **Nano Banana 2.1.**
  - Picker text: "Follows complex prompts closely, with consistent characters across edits". Leonardo: built for consistent people and products, 14 image refs + 1 video ref. The video ref produces an image (thumbnail/poster), not a video.
  - Prompt Enhance turns off when a ref is attached (https://leonardo.ai/news/nano-banana-2-1-now-on-leonardo).
  - Choose it over NB Pro when you need a video ref (https://leonardo.ai/nano-banana-2-1 FAQ).
- **Nano Banana 2** (Leonardo guide).
  - Strengths: editing, infographics, text-heavy visuals; up to 5 characters and 14 objects consistent.
  - Weaknesses: **30–60 s per generation**, "flat aesthetic", occasional "extra hands". Tip: "try Nano Banana 2 first before spending extra … on the Pro version".
- **Nano Banana 2 Lite.**
  - Picker text: "Faster, lighter generation with sharper details and simpler editing".
  - Third-party: about 4 s per 1K image, 1K only, weaker editing (Google Elo ~954–983 vs NB2 ~1062), softer prompt adherence on complex briefs.
  - Kittl's 132-prompt test (115 scored on first-try output) rates first-try reliability 4.5/5 and prompt adherence 4.1/5 (https://www.kittl.com/blogs/kittl-review-nano-banana-2-lite/). **[S3]**
- **Nano Banana Pro** (Leonardo guide).
  - Strengths: infographics, accurate text, native 4K, translating text in images.
  - Weaknesses: "significantly slower and more expensive"; can hallucinate facts in charts.
- **Nano Banana.**
  - Strengths: the "fixer" for conversational edits (remove a person, change time of day) and storyboarding.
  - Weaknesses: flat, stock-photo aesthetic; no transparent PNG; low resolution (needs an upscale). The first reference image is prioritised.
- **Ideogram 4.5.**
  - Picker text: "Sharp text rendering and faithful image references at up to 2K".
  - Maker's claim: no artifact build-up over multi-turn edits.
  - Third-party: Artificial Analysis Elo 1013 (High); 11/13 on Polish text, with errors in fine print (https://promptowy.com/krea-2-vs-ideogram/). **[S3]**
- **Ideogram 3.0** (Leonardo guide). Typography, logos, POD; weaker photorealism.
- **Seedream 4.0** (Leonardo guide; 4.5 is listed by Leonardo as "Best for posters, logos, and text-heavy designs").
  - Strengths: native 4K, ad/product polish.
  - Weaknesses: "too perfect", AI-looking; struggles with mid-distance depth; text spelling degrades.
- **Seedream 5.0 Pro / Flash.** Pro: "High-fidelity text-to-image with strong typography and layout control". Flash: "Fast text-to-image with multilingual text and reference images" (/models). No Leonardo-specific review found.
- **Krea 2.** Aesthetics and style transfer; Elo 1026; 1K output (promptowy). **[S3]**
- **Recraft V4 / V4 Pro.** "Polished, production-ready visuals with precise text rendering" (/models). No review collected. **[U]**
- **Lucid Origin.**
  - Strengths: Leonardo's "aesthetic generalist" default; strong cinematic and photo looks; good text. Fast generation: Screenrove shows a ~6.5 s countdown for a 4-image batch.
  - Weaknesses: can be over-detailed (Fast mode helps); weaker on complex multi-subject and spatial prompts than Nano Banana.
- **Lucid Realism.**
  - Strengths: hyper-photoreal, filmic texture; good for products, scenery, and stills to feed into video.
  - Weaknesses: **facial-structure bias** (similar faces across seeds); grain is a poor fit for clean graphic work.
- **Phoenix 1.0.**
  - Strengths: strict prompt adherence; stylised assets, stickers, restyling from sketches. Use **Quality** mode.
  - Weaknesses: "logically rigid" (it will "correct" a six-legged scorpion to eight legs); less photoreal than Lucid.

## 3. Video tab: full inventory

Sources:

- Model list: https://leonardo.ai/models (2026-10-29).
- Descriptions: https://leonardo.ai/news/ai-video-models (last updated 2026-08-10).
- Durations and resolutions: each docs.leonardo.ai page (updatedAt dates noted). **[S]**

| Model | Maker | API id | Release / added | Duration (s) | Resolution | Audio | Relaxed (Ultimate) | Notes |
|---|---|---|---|---|---|---|---|---|
| Seedance 2.5 | ByteDance | `bytedance/seedance-2.5` | ByteDance 2026-07-31; on Leonardo by 2026-08-10 | 4–30 | up to 4K (Leonardo guide) | yes | no | "Our most popular video model family". Motion transfer, editing, camera control. Accepts audio refs. |
| Seedance 2.0 / 2.0 Fast / 2.0 Mini | ByteDance | `seedance-2.0`, `-fast`, `-mini` | 2026 | 4–15 | 480 / 720 / 1080 (Fast: 480 / 720) | yes | no | Mini: "cost-effective … fast daily output" |
| Seedance 1.0 Pro / Pro Fast | ByteDance | `seedance-1.0-pro` | 2025 | 4, 6, 8, 10 | up to 1080 | silent | no | 1.0 Lite retired 2026-05-13 |
| FLUX 3 Video | BFL | `bfl/flux-3-video` | on Leonardo by 2026-08-10 (doc 2026-08-19) | 5–20 | 720p / 1080p | yes | no | Multi-scene; **the only model that can continue an existing clip** |
| MiniMax H3 ("MiniMax Hailuo 03" in the API) | MiniMax | `hailuo-03` | MiniMax 2026-07-31 | 5–15 | 480p / 768p / 2K / 4K | always on, stereo | **yes, at 480p Accelerated or Turbo only** | 9 image refs, 3 video refs, 3 audio refs; speed tiers STANDARD / ACCELERATED / TURBO |
| Hailuo 2.3 / 2.3 Fast | MiniMax | `hailuo-2_3` | 2025 | 6 / 10 | 768p / 1080p | none | **yes** | "Default for video on Leonardo". Physics and dance. "3D bias". |
| Veo 3.1 / 3.1 Fast / 3.1 Lite | Google DeepMind | `veo-3.1-generate-001`, `veo-3.1-fast-generate-001`, `veo-3.1-lite` | 3.1 since late 2025; Lite 2026 | 4, 6, 8 | up to 4K (Lite ≤1080p) | yes | no | Image refs on full Veo 3.1 only. Paid plans only. Veo 3 / 3 Fast retired 2026-06-29. |
| Kling 4.0 (API docs only, as of today) | Kuaishou | `kling-4.0` | doc updated **2026-10-29**; Kuaishou global launch ~2026-10-15/16 (conflicting) | 3–30 | n/a | yes | no | 10 image refs, video edit base. Not yet on /models. |
| Kling 3.0 / Kling Video 3.0 | Kuaishou | `kling-3.0` | early 2026 | 3–15 | 720 (Std) / 1080 (Pro) | yes, bilingual | no | Multi-shot, up to 6 cuts |
| Kling 3.0 Turbo | Kuaishou | `kling-3.0-turbo` | 2026 | 3–15 | 720 / 1080 | yes | no | "up to 20x faster" |
| Kling O3 Omni / O1 | Kuaishou | `kling-video-o-3` / `-o-1` | early 2026 | 3–15 (≤10 with a video ref) | 720 / 1080 | O3 yes | no | Create and edit video; strict character consistency |
| Kling 2.6 / 2.5 Turbo / 2.5 Turbo Std / 2.1 Pro | Kuaishou | `kling-2.6`, `Kling2_5`, `KLING2_1` | 2025 | 5 / 10 | 1080 | 2.6 only | no | 2.1 Pro: start + end frames |
| LTX-2 Ultra / LTX-2.3 Pro / LTX-2.3 Fast | Lightricks | recipes only (`ltx-2` pro/fast) | 2025–26 | 6 / 8 (recipes) | 2K (Ultra; "4K coming") / 1080 | 2.3 yes | no | Long, stable takes; weak at fast action |
| Gemini Omni 1.1 Flash / Omni Flash | Google | `google/gemini-omni-1.1-flash-preview`, `gemini-omni-flash` | announced I/O 2026-05-19; GA 2026-08-27 (third-party) | 3–10 | n/a | n/a | no | "real-world physics" |
| Grok Imagine 1.5 | xAI | `grok-imagine-1.5` | GA June 2026 (third-party) | 3–15 | n/a | yes | no | image-to-video with sound |
| Wan 3.0 | Alibaba | `alibaba/wan-3.0` | doc 2026-08-24 | 2–30 | 480 (default) / 720 / 1080 | yes | no | mixed image, video and audio refs |
| Wan 2.7 | Alibaba | `wan-2.7` | 2026 | 2–10 | 720 / 1080 | n/a | no | edit mode |
| Wan 2.6 | Alibaba | `wan-2.6` | 2026 | 5, 10, 15 | 720 / 1080 ("determines cost tier") | optional | **yes** | multi-shot |
| Happy Horse 1.0 / 1.1 | Alibaba (per Alibaba Cloud docs listing `happyhorse-1.1-*`) | `happy-horse-1.1` | 2026 | 3–15 | up to 1080 | multilingual | no | character scenes |
| Motion 2.0 / 2.0 Fast | Leonardo | `motion_2.0`, `motion_2.0-fast` | 2025 | ~5 | 480 / 720 | none | **yes** | camera sliders; image-to-video. Motion 1.0 retired 2026-06-17. |
| Sora 2 / Sora 2 Pro | OpenAI | n/a | **removed July 2026** (API retired 2026-07-09) | n/a | n/a | n/a | n/a | historical only |

Sources for removals and deprecations: https://docs.leonardo.ai/docs/deprecations-changes (updated 2026-07-09) and the note at the top of https://leonardo.ai/news/ai-video-models. **[S]**

### 3a. Video token costs

Officially, cost "scales with your video's duration and whether audio is enabled" (Veo 3.1 page, https://leonardo.ai/veo-3). No per-model numbers are published. **[S]**

| Model / setting | Tokens | $ at Essential → Ultimate yearly **[E]** | Source / status |
|---|---|---|---|
| Veo 3 (2025), 8 s | 2,500 (Fast 2,000) | $3.53 → $2.00 | **[S3]** https://www.aiartkingdom.com/post/ai-video-creation-veo-3-guide (2025-06-18) and https://www.octopusintelligence.com/top-ai-video-generation-platforms-2025/. Veo 3 is retired, so this is historical. |
| Veo 3.1: 720p / 1080p / 4K | 800 / 800 / 1,600 (duration not stated) | $1.13 / 1.13 / 2.26 at Essential | **[S3]** Scopeful (July 2026). Conflicts with the Veo 3 figure of 2,500; possibly the price changed or the duration differs. Unresolved. |
| Seedance 2.0: 480p / 720p / 1080p | 1,124 / 2,419 / 5,443 (duration not stated; likely the 8 s default) | $1.59 / 3.42 / 7.68 at Essential | **[S3]** Scopeful |
| Sora 2, 720p | 400 | $0.56 | **[S3]** Scopeful (model now removed) |
| Motion 2.0 (2025) | 250 per clip (Motion 1.0 was 25) | $0.35 → $0.20 | **[S3]** aiartkingdom (2025) |
| Kling, Hailuo, MiniMax H3, FLUX 3 Video, Wan, Seedance 2.5, Gemini Omni, Grok | not found | n/a | **[U]** |

Rejected:

- Octopus Intelligence's "Help Center estimates that cost at about USD 0.30 per clip" and "1 ¢ per token" are internally inconsistent (2,500 tokens at 1¢ is $25) and do not match any Leonardo page.
- hooked.so's credit numbers are Hooked's own credits, not Leonardo's.
- uisato.studio's credits belong to another platform.

### 3b. Strengths and weaknesses (video)

Leonardo guide (https://leonardo.ai/news/ai-video-models) unless noted.

- **Veo 3.1.**
  - Strengths: polished ads and product shots, strict adherence, native audio.
  - Weaknesses: start-to-end frame transitions between very different frames morph; struggles with gritty textures. Use a start frame only.
- **Kling 3.0.**
  - Strengths: multi-shot, 15 s, bilingual audio.
  - Weaknesses: defaults to photorealism even when animation is requested; "very slow" at peak hours. Negative camera prompts fail; phrase constraints positively.
- **Kling O1 / O3.** Strengths: edit existing generated footage; consistency from 3–5 refs. Weaknesses: slightly less photoreal; O3 is slow.
- **Kling 2.x.** Cost-effective action workhorse. 2.1 Pro offers start + end frames; 2.6 adds audio.
- **Seedance 1.0.** Strengths: multi-shot and vertical formats. Weaknesses: silent; weak physics.
- **Seedance 2.5.** "Most popular" on Leonardo; motion transfer, editing, camera control. ByteDance: 30 s per pass, extendable, up to 30 image + 10 video + 10 audio refs (https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5).
- **FLUX 3 Video.** Up to 20 s, multi-scene with dialogue; can extend a clip across the seam.
- **MiniMax H3.** 2K video plus stereo audio in one pass; text, image or audio refs; start/end frames. MiniMax claims 2K costs less than a third of mainstream rivals (https://www.marktechpost.com/2026/08/01/minimax-releases-minimax-h3-an-omni-modal-video-model-that-generates-15-second-2k-clips-with-native-stereo-audio/). **[S3]**
- **Hailuo 2.3.** Strengths: dance, flips, anime and stylised 3D. Weaknesses: "3D bias" (use a start frame for realism); no audio.
- **LTX-2.** Strengths: 4K-class, stable slow establishing shots. Weaknesses: poor at fast action.
- **Motion 2.0.** Strengths: fast loops, camera controls. Weaknesses: ~5 s, no physics, not for narrative. Use fewer sliders and a start frame.
- **Speed.** Kling 3.0 Turbo renders "up to 20x faster" than Kling 3.0. Few absolute timings were found. **[U]**

## 4. Audio tab

Sources: https://leonardo.ai/ai-music-generator, https://leonardo.ai/news/how-to-add-ai-music-to-videos (2026-08-11) and API docs. **[S]**

| Model | Maker | API id | What it does | Limits | Cost |
|---|---|---|---|---|---|
| Music v1 | Probably ElevenLabs (Eleven Music) **[E]**: the name matches ElevenLabs' `music_v1`; not stated by Leonardo | `music-v1` | text-to-music, with vocals or instrumental | 1–10 whole minutes; 1–4 outputs; prompt ≤9,999 chars | **[U]** |
| Seed Audio 1.0 | ByteDance Seed | `seed-audio-1.0` | text-to-speech / voiceover (on Leonardo); accepts audio and image refs | speed 0.5–2; 1–4 outputs | **[U]** |
| Dialogue v3 | Very likely ElevenLabs (Eleven v3) **[E]**: default voice id `JBFqnCBsd6RMkjVDRZzb` "George" and the other voice ids are ElevenLabs preset ids | `dialogue-v3` | multi-voice spoken dialogue; language code; prompt_influence | 1–4 outputs | **[U]** |
| Sound Effects v2 | Very likely ElevenLabs (SFX v2) **[E]** | `sound-effects-v2` | sound effects | 1–22 s; 1–4 outputs | **[U]** |

Dialogue v3 and Sound Effects v2 are in the API docs (updated 2026-07-28). I could not confirm whether they appear in the app's Audio tab. Leonardo's marketing pages name only Music v1 and Seed Audio 1.0. Native audio also comes from video models (Seedance 2.5, Kling 3.0 Turbo, MiniMax H3, FLUX 3 Video, Veo 3.1, Kling 2.6, Wan).

Note: Leonardo's own how-to page still contains "[REVIEW: verify …]" editor placeholders, so its UI steps are unverified.

## 5. 3D tab

| Model | Maker | API id | Input | Output | Cost |
|---|---|---|---|---|---|
| Rodin V2 (Gen-2) | Hyper3D (Deemos) | `rodin-v2` | 1–5 reference views (use the "3D Reference View Creator" Blueprint first) | .glb; Triangle mesh 2k / 20k / 150k / 500k or Quad 4k / 8k / 18k / 50k; PBR, Shaded or All; T/A-pose | **from 400 tokens**, scaling with quality. Above the Free daily allowance, so it needs a paid plan in practice. **[S]** https://intercom.help/leonardo-ai/en/articles/16022939-3d-generation-by-leonardo-ai (2026-08-19) |
| Meshy 7 | Meshy | `meshy/meshy-7` | text (≤600 chars) or up to 4 image refs | .glb; polycount 1k–300k; optional texture, PBR, rigging, animation | **[U]** (doc 2026-10-08; app availability unconfirmed) |

At $1.41 → $0.80 per 1k tokens, 400 tokens is about **$0.56 → $0.32 per 3D asset** at the minimum setting **[E]**. Guide: https://leonardo.ai/news/how-to-turn-an-image-into-3d-model. Its advice is to draft at 20k Triangle or 18k Quad, then go up to 150–500k (Triangle) or 50k (Quad) for the final.

## 6. Retired or removed (do not list as current)

All from https://docs.leonardo.ai/docs/deprecations-changes. **[S]**

- Sora 2 / Sora 2 Pro: retired 2026-07-09 (provider-driven).
- Motion 1.0 (SVD): retired 2026-06-17.
- Veo 3 / Veo 3 Fast: retired 2026-06-29.
- Veo preview aliases: removed 2026-05-13.
- Seedance 1.0 Lite: retired 2026-05-13.
- `mode` parameter for GPT Image 1.5 and Ideogram 3.0: replaced by `quality` on 2026-05-04.
- The legacy SDXL-era model names (Kino XL, Vision XL, Albedo, Lightning XL, Anime XL, PhotoReal v2, Alchemy pipeline) now survive only as Style presets and legacy API recipes. Their token table is still published (§2a).

## 7. Features that change cost or iteration count

- **Prompt Enhance** (AUTO / ON / OFF, default AUTO). Expands short prompts and leaves long ones alone. Auto-disables when an image or video ref is attached (NB 2.1 page). No separate token cost found. The legacy "Prompt Magic V2" cost 2 tokens per image. **[S]**
- **Styles / presets.** One preset per generation; the default is "Dynamic". GPT Image 2.5 and NB 2.1 also take style presets (NB 2.1 has 18). No extra cost found. **[S]**
- **Generation mode.**
  - Leonardo's own models have Fast / Quality (Phoenix only) / Ultra. Free gets "Basic" quality only; Ultra is "Limited" on Free.
  - Ultra costs roughly 4x Fast per image (Replicate: Phoenix $0.018 vs $0.075; Lucid Origin $0.0167 vs $0.0765) **[S3]**.
  - Third-party models use `quality` tiers instead (GPT 2.5 has five tiers; Ideogram has four).
- **Alchemy.** A legacy SDXL pipeline (8–16 tokens per image). Superseded by Phoenix and Lucid Ultra. Claims of an "Alchemy v4" (aitoolsdevpro.com) are rejected; nothing official supports them.
- **Private Mode.** Paid plans only. Free output is public, and Leonardo may use public images (including for training) per its Terms (soku.ai / theproofdesk). It has no token cost; it is a plan feature. **[S]**
- **Relaxed generation.** See §1. This is the biggest lever on reroll cost: unlimited rerolls on Lucid, Phoenix and FLUX Dev/Schnell (Premium+), and on Motion 2.0, Hailuo 2.3, Wan 2.6 and MiniMax H3 480p (Ultimate), but only after tokens are exhausted.
- **Image Ref / Video Ref.**
  - Paid plans get 6 image refs as the platform default. Per-model maxima are higher: GPT 2.5 has 16, NB 2.1 and NB Pro have 14, NB2 has 6. NB 2.1 and NB2 take 1 video ref, used to make an image.
  - Refs can change cost. Nano Banana refs are free. GPT 2.5 cost depends on "the number of image references". Lucid cost includes style/content refs.
  - Free gets 1 ref ("Limited").
- **Upscalers.**
  - Pro Upscaler (Precise / Creative, up to 105 MP, paid only): **73–1,211 tokens** depending on mode, multiplier, "Fix AI Image Artifacts" and creativity strength (https://intercom.help/leonardo-ai/en/articles/14698341-how-to-use-pro-upscaler, 2026-08-25). **[S]**
  - Legacy Universal Upscaler: 5 tokens. Alchemy Upscaler: 8 tokens.
  - Implication **[E]**: upscale only the keeper. One Pro upscale can cost more than the generations that produced it.
- **Flow State.**
  - A scrolling stream of variations at **1 token per image displayed**. "Scroll to Generate" off limits batches to 8. "More Like This" regenerates.
  - It has its own style presets, available to all plans. Not eligible for relaxed mode.
  - Source: https://intercom.help/leonardo-ai/en/articles/10002805-flow-state (2026-02-18). **[S]**
  - Implication **[E]**: the cheapest way to explore compositions before committing tokens to a premium model.
- **Blueprints.**
  - One-click templates: Product in Scene, Instant Brand Kit, Bulk Resize, Consistent Character, Logo Creator, 3D Reference View Creator, Old Photo Restoration, Instant Translate.
  - Concurrency 1/2/3/6 and queue 5/5/10/20 by plan. "Limited" on Free. Token cost per Blueprint not found. **[U]**
- **Omni / inline editor.** Click an image and describe a change. It runs on "Omni models" (Nano Banana, FLUX and GPT families) at those models' token costs (help centre and theproofdesk). Editing in place avoids full rerolls. **[S3]**
- **Elements / personal model training.** 10 / 20 / 50 trainings per month by plan. The legacy Elements cost is 1 token per image. FLUX Dev is the training base.
- **Leo Agent** (Beta, paid). Not researched. **[U]**
- **Moderation.** Blocked generations "can still consume tokens" (https://agentsapis.com/leonardo-api/). API failed generations are refunded (legacy FAQ, per soku.ai). **[S3]**

## 8. Release / added dates (conflicts noted)

| Model | Date | Source | Conflict |
|---|---|---|---|
| GPT Image 2.5 (OpenAI) | 2026-09-08 | search summaries citing OpenAI; carat.im / apiyi | n/a |
| GPT Image 2.5 on Leonardo | 2026-09-09 | https://leonardo.ai/news/gpt-image-2-5-now-on-leonardo | n/a |
| Ideogram 4.5 (maker / Leonardo) | 2026-09-30 / 2026-10-01 | Ideogram LinkedIn; screenrove What's New "v1.6.9 – 1 Oct 2026" | n/a |
| FLUX 3 Image (BFL) | 2026-10-01 (most sources) | kingy.ai, kompozy, the-decoder 2026-10-02 | 2026-10-05 in one listing (OpenRouter snapshot id `flux-3-image-20261001` supports Oct 1). Klein variant 2026-10-15 (https://bfl.ai/blog/flux-3-image-klein). Leonardo add date unknown. |
| Nano Banana 2.1 (Google / Leonardo) | 2026-10-06 GA / 2026-10-09 | aggregators; https://leonardo.ai/news/nano-banana-2-1-now-on-leonardo | Rejected: tech-insider "added Oct 9 in a tutorial updated September 2026" is an impossible date pairing (Leonardo's own date is Oct 9). |
| Nano Banana 2 Lite (Google) | 2026-06-30 GA | Google Cloud docs via search; Kittl | n/a |
| Seedream 5.0 Pro | 2026-07-08 | Krea blog, openart | n/a |
| Seedance 2.5 | 2026-07-31 | ByteDance Seed blog | n/a |
| MiniMax H3 | 2026-07-31 | marktechpost, datanorth | open-weights date disputed (Aug 3 vs "not shipped") |
| Krea 2 | 2026-05-12 | Krea release notes | n/a |
| Kling 4.0 | ~2026-10-15/16 | orcarouter and others | unconfirmed; Leonardo doc dated 2026-10-29 |
| Gemini Omni Flash | I/O 2026-05-19; GA 2026-08-27 (as 1.1 Flash) | gradually.ai / teamday | third-party only |
| Lucid Origin / Phoenix 1.0 / Phoenix 0.9 | Aug 2025 / Dec 2024 / Jun 2024 | https://modelmenu.dev/labs/leonardo.ai | n/a |

## 9. Rejected or down-weighted claims

- **"Phoenix 2.0 (Feb 2026, native 2048²)" and "Phoenix 1.1 flagship"** (aiunpacking.com, tech-insider via search). Not on https://leonardo.ai/models or in the API docs, which list only Phoenix 1.0 and 0.9. Rejected.
- **"Alchemy v4" and "Motion v3"** (aitoolsdevpro.com). No official trace. Rejected.
- **Scopeful's per-model token table.** Kept, but marked [S3]. The same page contains clear errors: "Apprentice tier at $10", "8500 tokens per day", and "each 1024² image costs around 2 tokens". Its credit column is labelled against "Essential monthly at $0.0014/cr", which matches $12/8,500, so it is probably Leonardo app tokens, but I cannot confirm that.
- **imagine.art "Nano Banana Pro 80 credits"**, and the 50/75/100 credits for NB2. Unclear which platform these credits belong to. Rejected for Leonardo.
- **vibecoding.tech "6.97 tokens per GPT Image 2 image".** Implausible against every other figure. Rejected.
- **pricepertoken.com.** "Essential includes unlimited first-party" contradicts the official page; its "~10 tokens per image" is an assumption. Rejected.
- **Octopus Intelligence Veo math.** Internally inconsistent; see §3a. Rejected.
- **"Ideogram 4.5 not released"** (one search summary). Contradicted by Ideogram's LinkedIn launch post (2026-09-30) and Leonardo's changelog. Rejected.
- **Free plan "can use third-party models / Phoenix / Lucid".**
  - theproofdesk says every plan "can use … third-party models", and agentsapis lists Free with Phoenix, Lucid and FLUX.
  - The current official pricing page says Free is "Auto only" and marks third-party models "-".
  - The Nano Banana help article (2026-08-25) still says free users can use Nano Banana.
  - Treat the official pricing page (2026-10-29) as current: Free = Auto only. This is flagged as a conflict.

## 10. Iterations / rerolls per keeper

No source gives a measured "rerolls per keeper" figure for any model on Leonardo. **[U]** The closest data:

- **Kittl, Nano Banana 2 Lite.** 132 prompts, 115 scored on first-try output. First-try reliability rated 4.5/5. That is a quality score, not a hit rate. **[S3]**
- **magicshot.ai, GPT Image 2 vs Nano Banana 2.**
  - Portrait: NB2 got it right first try; GPT Image 2 needed a 2nd try.
  - Text prompt rerun 7x: GPT Image 2 was clean 6/7. "Tends to need fewer rerolls despite being slower." **[S3]** n=1 prompt.
- **Lucid Origin and Nano Banana Pro.** Leonardo's own advice is to try NB2 first and only escalate to Pro, and to draft in Flux Schnell or Flow State before switching to a high-fidelity model. That is vendor guidance, not data.
- **Ideogram on multi-turn editing.** It claims GPT 2.5 Sunburst and the NB models degrade "within a few edits". Competitor marketing, not measured hit rate.

A field-guide estimate should be labelled as such. Suggested default **[E]**: 2–4 generations per keeper for prompt-following third-party models on simple briefs, and more for text-heavy or multi-subject briefs. Leonardo's default batch of 4 (Lucid, Phoenix, FLUX) gives several candidates per click, which lowers clicks per keeper but not tokens per keeper.

## 11. Worked cost examples **[E]**

All figures use the token numbers above. Each line notes which numbers are third-party.

- **Free plan** (150 per day, Auto only): about 4 Auto/Lucid Fast batches of 4 per day (34 tokens each), or about 3 Nano Banana images if allowed (40 each).
- **Essential** ($12, 8,500 tokens):
  - About 1,000 Lucid Origin Fast images (8.5 each), roughly $0.012 per image.
  - About 212 Nano Banana images ($0.056 each).
  - About 106 NB2 1K images ($0.11) [S3].
  - About 60 NB Pro images ($0.20) [S3].
  - About 32 GPT Image 2 1K images ($0.37) [S3].
  - About 10 Veo 3.1 clips at 800 [S3].
  - About 3 Seedance 2.0 720p clips at 2,419 [S3].
- **Ultimate yearly** ($48, 60,000 tokens, $0.80/1k): Nano Banana $0.032; NB Pro 1K ~$0.11; GPT Image 2 1K ~$0.21; Veo 3.1 ~$0.64 per clip; Seedance 2.0 720p ~$1.94.
- **At 3 tries per keeper**, multiply these by 3. On Premium or Ultimate, first-party image retries (and Ultimate's eligible video retries) cost $0 after tokens run out, at relaxed speed.

## 12. Source index (all checked 2026-10-29 unless dated)

Official Leonardo:

- https://leonardo.ai/models
- https://leonardo.ai/pricing
- https://leonardo.ai/news
- https://leonardo.ai/news/gpt-image-2-5-now-on-leonardo
- https://leonardo.ai/gpt-image-2-5
- https://leonardo.ai/news/nano-banana-2-1-now-on-leonardo
- https://leonardo.ai/nano-banana-2-1
- https://leonardo.ai/news/ai-image-models
- https://leonardo.ai/news/ai-video-models
- https://leonardo.ai/veo-3
- https://leonardo.ai/lucid-origin
- https://leonardo.ai/ai-music-generator
- https://leonardo.ai/news/how-to-add-ai-music-to-videos
- https://leonardo.ai/news/how-to-turn-an-image-into-3d-model

Help centre:

- https://intercom.help/leonardo-ai/en/articles/9044700-tokens-frequently-asked-questions
- https://intercom.help/leonardo-ai/en/articles/8044033-token-usage
- https://intercom.help/leonardo-ai/en/articles/12143945-nano-banana-gemini-2-5-flash-image
- https://intercom.help/leonardo-ai/en/articles/14698341-how-to-use-pro-upscaler
- https://intercom.help/leonardo-ai/en/articles/10002805-flow-state
- https://intercom.help/leonardo-ai/en/articles/16022939-3d-generation-by-leonardo-ai

API docs: https://docs.leonardo.ai/llms.txt and every model page it lists, notably `/docs/deprecations-changes`, `/docs/pricing-and-plans-faq`, `/docs/legacy-faq`, `/docs/veo-31`, `/docs/kling-40`, `/docs/krea-3`, `/docs/meshy-7`, `/docs/rodin-v2`, `/docs/music-v1`, `/docs/dialogue-v3`, `/docs/sound-effects-v2`, `/docs/seed-audio-10`, `/docs/minimax-hailuo-03`, `/docs/flux-3-video`, `/docs/seedance-25`, `/docs/wan-30`, `/docs/phoenix`, `/docs/lucid-origin`, `/docs/gpt-image-25-flare`, `/docs/gpt-image-25-sunburst`, `/docs/nano-banana-21`, `/docs/nano-banana-2-lite`, `/docs/ideogram-45`.

Third-party:

- Leonardo pricing and app: https://soku.ai/alternatives/leonardo-ai/pricing, https://theproofdesk.com/leonardo-ai-review, https://screenrove.com/leonardo/flows, https://www.scopeful.org/tools/leonardo, https://replicate.com/leonardoai/phoenix-1.0, https://whatmodel.sh/model/lucid-origin, https://modelmenu.dev/labs/leonardo.ai, https://www.aiartkingdom.com/post/ai-video-creation-veo-3-guide, https://www.octopusintelligence.com/top-ai-video-generation-platforms-2025/, https://pricepertoken.com/leonardo-ai-pricing, https://agentsapis.com/leonardo-api/
- Model reviews: https://www.kittl.com/blogs/kittl-review-nano-banana-2-lite/, https://www.pixmax.ai/blog/gpt-image-2-5-review-flare-sunburst.html, https://wavespeed.ai/blog/ai-comparisons/gpt-image-2-5-review/, https://picsart.com/blog/gpt-image-2-vs-gpt-image-2-5/, https://www.eesel.ai/blog/chatgpt-images-2-5-review, https://fuser.studio/articles/flux-3-klein-vs-flux-3-image, https://runware.ai/blog/flux-3-image-four-generations, https://promptowy.com/krea-2-vs-ideogram/, https://magicshot.ai/blog/gpt-image-2-vs-nano-banana-2
- Model makers and launches: https://bfl.ai/blog/flux-3-image-klein, https://www.layer3labs.io/guides/flux-3-image-pricing, https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5, https://www.marktechpost.com/2026/08/01/minimax-releases-minimax-h3-an-omni-modal-video-model-that-generates-15-second-2k-clips-with-native-stereo-audio/, https://www.alibabacloud.com/help/en/model-studio/video-generate-edit-model/, https://ideogram.ai/models/4.5/, https://letsdatascience.com/news/google-rolls-out-nano-banana-21-image-model-c6ac3b89
