# Multi-model AI aggregator platforms and model-level facts (excluding Leonardo.ai)

Research log for the "choosing a generative model" field guide. Covers image, video and audio. Leonardo.ai is in the sibling `leonardo.md`.

- **Checked:** 2026-10-29 for every URL unless a row says otherwise.
- **Labels:** `(3P)` = third-party source. `(derived)` = my arithmetic. **ESTIMATE** = my own unsourced estimate.
- **Volatility:** every platform below changed pricing at least once in 2026. Re-check before publishing.

## 0. Key takeaways

1. **Image quality, late Oct 2026: OpenAI holds the top 3 on both public arenas.** GPT Image 2.5 Sunburst, GPT Image 2.5 Flare and GPT Image 2 lead. Next come Nano Banana 2.1 (Google), MAI-Image-2.6 (Microsoft) and Grok Imagine Image 2.0 (xAI).
2. **Video has no single leader.**
   - Artificial Analysis (AA) puts Wan 3.0 at #1.
   - LMArena (now arena.ai) puts Gemini Omni 1.1 Flash at #1.
   - Seedance 2.0/2.5, MiniMax H3 and FLUX 3 video are close on both boards.
3. **Aggregators usually cost more per output than the raw API, except on "unlimited" tiers.**
   - Runway's API charges $0.20 for a Nano Banana Pro image. Google charges $0.134.
   - Magnific charges about $1.10/s for Seedance 2.5 at 1080p. AA's API benchmark is about $0.57/s.
4. **"Unlimited" always means a curated list of models.** Flagship models such as Seedance 2.5 and Kling 4.0 always draw credits.
5. **Settings swing price up to 36x.** GPT Image 2.5 costs $0.0059 per image at low quality and $0.21 at max. AA ranks the max setting.
6. **No vendor publishes first-try success rates.** Proxy benchmarks show the best models satisfy every constraint in only about 24–45% of hard prompts (§5).
7. **Dead or degraded products:**
   - Sora 2 API: shut down 2026-09-24. Sora app: closed 2026-04-26.
   - Udio: downloads disabled.
   - Freepik AI: now branded **Magnific** (since 2026-04-28).

## 1. Platforms

### 1.1 Krea

Source: <https://www.krea.ai/pricing>. The page offers 40% off yearly.

| Plan | List $/mo | Yearly $/mo | Compute units (CU) |
|---|---|---|---|
| Free | 0 | 0 | 100/day |
| Basic | 9 | 5 | 5,000/mo |
| Pro | 35 | 21 | 20,000/mo |
| Max | 105 | 63 | 60,000/mo |
| Business | 200 | 160 | 80,000/mo |
| Enterprise | custom | custom | custom |

- **Rejected:** a $70 Max price from dailyaifixs (3P). Krea's own page says $105.
- **Credit rules (3P):** no rollover; top-up packs last 90 days. Source: <https://www.hooked.so/compare/krea-ai-pricing>.
- **Krea 3** entered beta on 2026-10-15 (3P). Source: <https://www.usagepricing.com/blueprint/activity/krea-ai-2026-10-15-krea-3-model-launch>.
- **Krea 2 Large** is #24 on AA (Elo 1034, $0.06 per image).

**Cost per generation (derived).** CU = 20,000 ÷ Krea's Pro-plan generation count. Dollars use the Pro list rate, $0.00175 per CU.

| Model / setting | ≈CU | ≈$ |
|---|---|---|
| Krea 3 | 18 | 0.03 |
| Krea 1 | 5.6 | 0.01 |
| Flux 2 Klein | 3.9 | 0.007 |
| Nano Banana 2 1K | 44 | 0.08 |
| Nano Banana Pro 1K | 78 | 0.14 |
| Seedream 4.5 | 30 | 0.05 |
| Veo 3.1 Fast (4s, 720p, no audio) | 238 | 0.42 |
| Kling 3.0 (3s, standard) | 187 | 0.33 |
| Seedance 2.0 (4s, 480p) | 241 | 0.42 |
| Wan 2.6 (5s, 720p) | 370 | 0.65 |

Krea's own page is internally inconsistent: Nano Banana 2 shows 450 generations in one place and 900 in another. Treat these as ±2x.

### 1.2 Freepik AI, now Magnific

- **Rebrand:** Freepik AI became Magnific on 2026-04-28 (3P, updated 2026-08-02). Source: <https://vantaige.io/blog/freepik-ai-is-now-magnific-pricing-changes-2026>.
- **Plans:** <https://www.magnific.com/pricing>. Credits are annual: "valid for 1 year, no monthly resets".

| Plan | $/mo monthly | $/mo annual | Credits/yr |
|---|---|---|---|
| Premium | 20 | 14.50 | 240K |
| Premium+ | 45 | 33.75 | 600K + "UNLIMITED" tagged models |
| Pro Starter | 110 | 82.50 | 1.5M or 4M |

- **Business (3P, vantaige):** $55 per seat per month.
- **Rejected:** $16/$37/$90 from renderahouse and $280/300K from recurdash. Both conflict with the official page.
- **Value (derived):** about $0.001 per credit on Premium monthly.
- **"Unlimited" tags:** Nano Banana 2, Nano Banana Pro 1K/2K, Nano Banana 2 Lite, Flux.2 Pro 1K, Flux.2 Max 1K, Recraft V4.1 Mid, Grok, Kling 2.5 720p and Hailuo 2.3 Fast. The page does not say which plan unlocks which model.

**Image credits.** Dollars at $0.001 per credit (derived).

| Model | Credits | ≈$ |
|---|---|---|
| Nano Banana 2 1K/2K | 75 | 0.075 |
| Nano Banana 2 4K | 150 | 0.15 |
| Nano Banana 2 Lite 1K | 60 | 0.06 |
| Nano Banana Pro 1K/2K | 75 | 0.075 |
| Nano Banana Pro 4K | 150 | 0.15 |
| GPT Image 2.5 Medium 2K | 180 | 0.18 |
| Flux.2 Pro 1K | 50 | 0.05 |
| Flux.2 Max 1K | 130 | 0.13 |
| Recraft V4.1 Mid | 60 | 0.06 |
| Grok | 70 | 0.07 |
| P-image Ideogram 2K High | 44 | 0.044 |
| Magnific One High 2K/4K | 180/250 | 0.18/0.25 |

**Video credits.**

| Model | Credits / clip | ≈$/s (derived) |
|---|---|---|
| Kling 4.0 1080p | 840 / 3s | 0.28 |
| Kling 3.0 Pro 1080p | 450 / 5s | 0.09 |
| Kling 2.5 720p | 140 / 5s | 0.028 |
| Seedance 2.5 1080p | 4,400 / 4s | 1.10 |
| Seedance 2.5 720p | 1,760 / 4s | 0.44 |
| Seedance 2.5 480p draft | 800 / 4s | 0.20 |
| Seedance 2 Pro 720p | 1,120 / 4s | 0.28 |
| Gemini Omni 1.1 | 720 / 3s | 0.24 |
| Veo 3.1 4K with audio | 2,080 / 4s | 0.52 |
| MiniMax H3 Max Turbo 768p | 200 / 5s | 0.04 |
| Hailuo 2.3 Fast 768p | 150 / 6s | 0.025 |

**Audio credits:** Lyria 3 is 160 per song. ElevenLabs Music is 600 per 30s. SFX is 15 per 3s.

### 1.3 OpenArt

Source: <https://openart.ai/pricing>.

| Plan | $/mo monthly | $/mo annual | Credits/mo | ≈Images | ≈Videos |
|---|---|---|---|---|---|
| Starter | 14 | 13 | 4,000 | 4,000 | 50 |
| Plus | 34 | 27 | 12,000 | 12,000 | 150 |
| Pro | 56 | 44 | 24,000 | 24,000 | 300 |
| Wonder | 240 | 175 | 106,000 | 106,000 | 1,300 |

- **Derived:** about 1 credit per image (cheapest model) and about 80 credits per video.
- **Commercial use:** Plus and above only.
- **Not found:** per-model credit costs. The help-center answers did not render.
- **Models:** "100+" image, video and audio models.
- **Promos:**
  - Unlimited FLUX 3 720p video on Wonder until 2026-10-31.
  - Kling 4.0 at 50% off on Pro and Wonder until 2026-11-20.
- **Rejected:** the Essential/Advanced/Infinite tier names. They are pre-2026.

### 1.4 Higgsfield

The official page is JS-only. The data below comes from Krea's blog, captured from Higgsfield's pages on 2026-08-31 and updated 2026-10-23 (3P, competitor): <https://www.krea.ai/blog/higgsfield-pricing-explained-2026-unlimited-credits-and-real-monthly-costs>.

| Plan | $/mo monthly | $/mo annual | Credits/mo | Unlimited (7 days, website only) |
|---|---|---|---|---|
| Free | 0 | 0 | 0 | — |
| Starter | 19 | — | 270 | — |
| Plus | 59 | 47 | 1,200 | Nano Banana 2 2K, Kling 3.0 |
| Ultra | 129 | 99 | 3,000 | Plus models + Nano Banana Pro 2K |

**Credit costs.** $0.049 per credit on Plus monthly (derived).

| Model | Credits | ≈$ |
|---|---|---|
| Kling 3.0, 5s 1080p | 12.5 | 0.61 |
| Seedance 2.0, 5s 1080p | 45 | 2.21 |
| Wan 2.7, 5s 1080p | 13 | 0.64 |
| Seedance 2.5, 8s 720p | 52 | 2.55 |
| Nano Banana Pro image | ~2 | 0.10 |

**Conflicts:** Novoads lists $15/$49 tiers, and other sites list Basic/Pro/Max tiers. All are flagged as stale.

### 1.5 Adobe Firefly

Source: <https://www.adobe.com/products/firefly/plans.html>.

| Plan | $/mo | Credits/mo |
|---|---|---|
| Standard | 9.99 | 2,000 |
| Pro | 19.99 | 4,000 |
| Pro Plus | 49.99 | 10,000 |
| Premium | 199.99 | 50,000 (Firefly Video unlimited) |

- **Unlimited:** Adobe-model image features and Firefly Boards.
- **Partner models draw credits.** They include Google, OpenAI and Flux. Third-party sources add Kling, Runway, Luma, ElevenLabs, Ideogram and Topaz.
- **Not retrieved:** the partner-model credit table. The helpx page returned 403.
- **Unverified (3P):** "first-year unlimited partner models". Source: <https://design-offset.com/en/20260319-adobe-firefly-pro-plus/>.
- **Value (derived):** about $0.005 per credit on Pro.

### 1.6 Canva

- **Canva Craft:** Canva's own model, released 2026-10-22. It plans the layout first, renders up to 2K and supports precise edits. It is in Dream Lab and the API, and Leonardo researchers contributed. Source: <https://techcrunch.com/2026/10/22/canva-releases-its-first-image-generation-model>.
- **Credits are unclear.** Third-party figures conflict, roughly 500/mo on Pro. Source: <https://www.eesel.ai/en/blog/canva-ai-pricing>.
- **Guide treatment:** "bundled AI", not a model-picker.

### 1.7 Poe

- **Price:** $19.99/mo. The points allowance conflicts: 1M (Zemith, 2026-10-19) vs 660K (aiproductivity, June 2026). Sources: <https://www.zemith.com/en/learn/poe-pricing>, <https://aiproductivity.ai/pricing/poe/>.
- **Not retrievable:** per-bot point rates.
- **Guide treatment:** chat-first. Readers should check each bot's rate card.

### 1.8 Runway

**App plans.** Source: <https://runway.com/pricing>.

| Plan | $/mo monthly | $/mo annual | Credits/mo |
|---|---|---|---|
| Free | 0 | 0 | 125 one-time |
| Standard | 15 | 12 | 625 |
| Pro | 35 | 28 | 2,250 |
| Max | 95 | 76 | 9,500 |

**Models in the app:**

- Video: Gen-4.5, Gen-4 Turbo, Aleph 2.0, Kling 4.0, Seedance 2.0 Pro and Seedance 2.5.
- Image: Gen-4 Image and Nano Banana Pro.
- Audio: Lyria 3 and Seed Audio.

**API rate card: the best cross-vendor price list found.** Source: <https://docs.dev.runwayml.com/guides/pricing/>. 1 credit = $0.01, so the $ column is credits ÷ 100.

| Model | Unit | $ |
|---|---|---|
| Veo 3.1 (audio / no audio) | per s | 0.40 / 0.20 |
| Veo 3.1 Fast (audio / no audio) | per s | 0.15 / 0.10 |
| Gemini Omni Flash 1.1 (720p / 1080p / 4K) | per s | 0.10 / 0.15 / 0.30 |
| Kling 4 list price (720p / 1080p) | per s | 0.157 / 0.235 |
| Kling 3.0 Pro (no audio / audio) | per s | 0.12 / 0.17 |
| Seedance 2.5 (480p / 720p / 1080p) | per s | 0.20 / 0.30 / 0.68 |
| Seedance 2 (480p / 720p / 1080p / 4K) | per s | 0.14 / 0.30 / 0.40 / 1.50 |
| Wan 3 (480p / 720p / 1080p) | per s | 0.05 / 0.10 / 0.20 |
| MiniMax H3 Max (480p / 768p) | per s | 0.05 / 0.08 |
| Grok Imagine 1.5 (480p / 720p / 1080p) | per s | 0.10 / 0.16 / 0.29 |
| Runway Gen-4.5 | per s | 0.12 |
| Runway Aleph 2 | per s | 0.28 |
| Nano Banana 2.1 (1K / 2K / 4K) | per image | 0.04 / 0.06 / 0.12 |
| Nano Banana Pro (1K–2K / 4K) | per image | 0.20 / 0.40 |
| GPT Image 2.5 | per image | 0.01–0.75 |
| Seedream 5 Pro (1K / 2K) | per image | 0.05 / 0.09 |
| Ideogram 4.5 | per image | 0.01–0.25 |
| Muse Image | per image | 0.01 |

- **App credits cost more** than API credits: about $0.012–0.024 each. It is not confirmed that app per-model costs match the API table.
- **Conflict (3P):** one source puts Gen-4.5 in the app at 25 credits/s. Source: <https://www.eesel.ai/en/blog/runway-ai-pricing>.

### 1.9 Artlist

- **Plans:**
  - From 7,500 credits/mo, voiceover only.
  - From 16,500 credits/mo for video, image and music.
  - Sources: Artlist blog search snippet (the fetch returned 403) and help.artlist.io.
- **Own model:** Original 1.0 costs 80 credits at 720p and 160 at 1080p.
- **Prices (3P, FitGap, low confidence):** $15.99 for 7,500 credits, and $19.99 ($14.99 annual) for 16,500.
- **Models:** Veo, Kling, Seedance, GPT Image 2 and Nano Banana Pro.

### 1.10 Luma

- **Plans (3P):** Luma Agents launched in March 2026 with Plus at $30 (10K credits), Pro at $90 and Ultra at $300. Source: <https://eesel.ai/blog/luma-ai-pricing>.
- **Ray3 costs:** 720p SDR is 320 credits per 5s, and HDR is 1,280. Source: <https://lumalabs.ai/learning-hub/dream-machine-credit-system> (snippet).
- **Rank:** not in either arena's top 20.

### 1.11 Midjourney (single vendor, for comparison)

- **Plans (3P, consistent across sources):** Basic $10 (3.3 fast hours), Standard $30 (15 h + Relax), Pro $60 (30 h), Mega $120 (60 h). Source: <https://eesel.ai/blog/midjourney-pricing>.
- **Access:** no API and no free tier.
- **Versions:** V8 launched 2026-03-17. V8.1 is now the default. Source: <https://updates.midjourney.com/v8-1-is-now-the-default-model>.

### 1.12 API baselines

**fal** (<https://fal.ai/pricing>):

| Model | fal price | Google direct |
|---|---|---|
| Nano Banana 2 | $0.08 per image | $0.067 |
| Nano Banana Pro | $0.15 per image | $0.134 |
| Kling v3 Pro | $0.14/s | — |
| MiniMax H3 Max | $0.03/s | — |
| MiniMax H3 Max Turbo | $0.015/s | — |
| FLUX.1 schnell | $0.003/MP | — |

- **Conflict:** AA lists MiniMax H3 Max at $0.16/s. Unresolved.
- **Rejected:** fal's "GPT Image 2 $1 per unit". The unit is undefined.

**Replicate** (<https://replicate.com/pricing>): the page shows only legacy examples (flux-1.1-pro $0.04, ideogram-v3-quality $0.09, recraft-v3 $0.04). Historical baseline only.

## 2. Image models

### 2.1 Leaderboards

**AA-Image-T2I v2.1.** Source: <https://artificialanalysis.ai/image/leaderboard/text-to-image>. The page has no as-of date. $ is per image at 1024², default settings.

| # | Model | Maker | Elo | $ | Released |
|---|---|---|---|---|---|
| 1 | GPT Image 2.5 Sunburst (max) | OpenAI | 1222 | 0.2107 | Sep 2026 |
| 2 | GPT Image 2.5 Flare (max) | OpenAI | 1207 | 0.2107 | Sep 2026 |
| 3 | GPT Image 2 (high) | OpenAI | 1186 | 0.211 | Apr 2026 |
| 4 | Nano Banana 2.1 | Google | 1176 | 0.0336 | Oct 2026 |
| 5 | MAI-Image-2.6 | Microsoft | 1166 | 0.0389 | Aug 2026 |
| 6 | Grok Imagine Image 2.0 | xAI | 1166 | 0.06 | Aug 2026 |
| 7 | Nano Banana 2 | Google | 1140 | 0.067 | Feb 2026 |
| 8 | Muse Image | Meta | 1127 | 0.01 | Jul 2026 |
| 9 | GPT Image 1.5 (high) | OpenAI | 1123 | 0.133 | Dec 2025 |
| 10 | MAI-Image-2.6-Flash | Microsoft | 1119 | 0.0195 | Sep 2026 |
| 11 | Nano Banana Pro | Google | 1118 | 0.134 | Nov 2025 |
| 13 | FLUX 3 Image | BFL | 1117 | 0.048 | Oct 2026 |
| 16 | Seedream 5.0 Pro | ByteDance | 1100 | 0.09 | Jul 2026 |
| 17 | Qwen-Image-3.0-Pro | Alibaba | 1095 | 0.04 | Jul 2026 |
| 21 | FLUX 3 Klein | BFL | 1043 | 0.009 | Oct 2026 |
| 24 | Krea 2 Large | Krea | 1034 | 0.06 | May 2026 |

**LMArena T2I.** Source: <https://arena.ai/leaderboard/text-to-image>, dated 2026-10-26.

| # | Model | Score | Votes |
|---|---|---|---|
| 1 | GPT-Image-2.5 Sunburst (prelim.) | 1427 | 40k |
| 2 | GPT-Image-2.5 Flare (prelim.) | 1401 | 39k |
| 3 | GPT-Image-2 (Medium) | 1381 | 103k |
| 4 | MAI-Image-2.6 | 1329 | 35k |
| 5 | Nano Banana 2.1 (prelim.) | 1325 | 5k |
| 6 | Grok Imagine Image 2.0 (prelim.) | 1317 | 11k |
| 7 | Reve 2.1 | 1300 | 8k |
| 9 | Muse Image | 1269 | 53k |
| 14 | Seedream 5.0 Pro | 1250 | 106k |
| 16 | Nano Banana Pro 2K | 1246 | 188k |
| 20 | Ideogram 4.0 Quality | 1200 | 73k |

- **Absent from both boards:** Midjourney (no API), Recraft, FLUX 2 and Ideogram 4.5.
- **Rejected:**
  - A stale AA search snippet showing GPT Image 2 at 1369 and Reve 2.1 at 1324.
  - BudgetPixel's "arena", which is not comparable.

### 2.2 Image model cards

| Model | Maker | Released | Best at | Weak at | API price | Source |
|---|---|---|---|---|---|---|
| GPT Image 2.5 Flare / Sunburst | OpenAI | 2026-09-08 | Arena #1–2. Flare is the fast default. Sunburst is for editing precision | Costly at max quality | Per 1024² image: low $0.0059, medium $0.0132, high $0.0527, xhigh $0.0937, max $0.2107. Tokens: $30/1M image output | <https://developers.openai.com/api/docs/pricing>, <https://tokencost.app/blog/gpt-image-2-5-pricing-cost-per-image> (3P reconstruction) |
| GPT Image 2 | OpenAI | Apr 2026 | Text, instruction following | Top setting is "high" at $0.21 | low $0.0059, medium $0.0527, high $0.2107. Batch is −50% | same |
| Nano Banana 2.1 | Google | 2026-10-06 | Best quality per dollar. Better text, mask edits, multi-turn consistency | Preliminary arena score | 1K $0.0336, 2K $0.0504, 4K $0.113. Batch is −50% | <https://ai.google.dev/gemini-api/docs/pricing>, <https://letsdatascience.com/news/google-rolls-out-nano-banana-21-image-model-c6ac3b89> |
| Nano Banana 2 (Gemini 3.1 Flash Image) | Google | Feb 2026 | Fast general use | Superseded. Retirement date disputed | 1K $0.067, 2K $0.101, 4K $0.151 | Gemini pricing |
| Nano Banana 2 Lite | Google | Jun 2026 | Cheap; about 4s per image (3P) | Lower ceiling | 1K $0.0336 | Gemini pricing |
| Nano Banana Pro | Google | Nov 2025 | Hard reasoning prompts; GenOlympiad #1 | 4x the price of 2.1 | 1K/2K $0.134, 4K $0.24 | Gemini pricing, <https://arxiv.org/abs/2610.26850> |
| MAI-Image-2.6 / Flash | Microsoft | 2026-08-10 | Arena #4; cheap | Mostly Azure-only | $0.0389 / $0.0195 (AA) | <https://windowsreport.com/microsoft-releases-mai-image-2-6-surges-to-no-2-on-arena/> |
| Grok Imagine Image 2.0 | xAI | 2026-08-07 | Top 6 on both boards | — | $0.06 (AA) | <https://llmgateway.io/models/grok-imagine-image-2-0> |
| Muse Image | Meta | 2026-07-07 | $0.01, top 10 | Single source for API pricing | $0.01 | <https://qz.com/meta-muse-image-generator-consumers-advertisers-070726> |
| FLUX 3 Image / Klein | BFL | ~2026-10-01 | Native 4K, 10 reference images. Klein has open weights | Mid Elo; 4K is expensive | 768 $0.041, 1K $0.048, 2K $0.10, 4K $0.607. Klein $0.009 | <https://www.llmreference.com/model/flux-3-image> (3P). The BFL docs price cells were blank |
| Seedream 5.0 Pro | ByteDance | 2026-07-08 | Most-voted arena model | — | BytePlus $0.045 (≤2.36 MP) or $0.09. fal $0.0675–0.135 | <https://www.heyuan110.com/posts/ai/2026-07-09-seedream-5-pro/> (3P) |
| Ideogram 4.5 | Ideogram | ~Oct 2026 | Typography | Price of the High tier varies by route | Own API $0.03 / $0.06 / $0.10. fal High $0.22 | <https://www.usagepricing.com/blueprint/activity/ideogram-2026-10-05-api-45-nano-banana> (3P) |
| Recraft V4.1 / Flash | Recraft | May / Sep 2026 | Native SVG, design work | Not in the arena top 20 | Raster from $0.035, vector $0.08, Pro vector $0.30, Flash $0.007 | <https://www.recraft.ai/docs/api-reference/models/overview.md> |
| Midjourney V8.1 | Midjourney | V8 2026-03-17 | Aesthetics, people | Literal adherence, long text; no API | Subscription only | <https://www.mindstudio.ai/blog/what-is-midjourney-v8-alpha-strengths-weaknesses> (3P) |
| Canva Craft | Canva | 2026-10-22 | Template-style designs, text | Unbenchmarked | n/a | TechCrunch |
| Imagen 4 | Google | 2025 | — | Absent from the boards and from the Gemini pricing page. Status unverified | — | — |

**Speed.** No sourced timings were retrievable; AA charts render client-side. **ESTIMATE:** 3–20s per image, with max or "thinking" settings slowest.

## 3. Video models

### 3.1 Leaderboards

**AA T2V v2.1, with audio.** Source: <https://artificialanalysis.ai/video/leaderboard/text-to-video>. $/s is derived from AA's $/min.

| # | Model | Maker | Elo | $/s | Released |
|---|---|---|---|---|---|
| 1 | Wan 3.0 | Alibaba | 1174 | 0.20 | Aug 2026 |
| 2 | Utopai X | Utopai | 1166 | no API | Sep 2026 |
| 3 | MiniMax H3 768p | MiniMax | 1160 | 0.08 | Jul 2026 |
| 4 | Seedance 2.5 | ByteDance | 1156 | 0.569 | Jul 2026 |
| 5 | FLUX 3 Max | BFL | 1156 | 0.0725 | Oct 2026 |
| 6 | HeyGen Video 1 | HeyGen | 1156 | 0.04 | Oct 2026 |
| 7 | MiniMax H3 Max | MiniMax | 1150 | 0.16 | Aug 2026 |
| 8 | FLUX 3 | BFL | 1143 | 0.29 | Jul 2026 |
| 9 | Seedance 2.0 | ByteDance | 1135 | 0.374 | Mar 2026 |
| 10 | Gemini Omni Flash 1.1 | Google | 1128 | 0.152 | Aug 2026 |
| 12 | Grok Imagine Video 1.5 | xAI | 1058 | 0.25 | May 2026 |
| 18 | Kling 3.0 Pro (Elo anchor) | Kuaishou | 1000 | 0.168 | Feb 2026 |
| 21 | Veo 3.1 | Google | 962 | 0.40 | Jan 2026 |
| 22 | Veo 3.1 Fast | Google | 957 | 0.12 | Jan 2026 |
| 23 | Veo 3.1 Lite | Google | 953 | 0.08 | Mar 2026 |

**AA silent top 5:** HeyGen Video 1, MiniMax H3 Max, FLUX 3 Max, Wan 3.0, MiniMax H3.

**LMArena T2V.** Source: <https://arena.ai/leaderboard/text-to-video>, updated 2026-09-21.

| # | Model | Score |
|---|---|---|
| 1 | Gemini Omni 1.1 Flash | 1516 |
| 2 | Gemini Omni Flash | 1513 |
| 3 | FLUX 3 Video (prelim.) | 1493 |
| 4 | Grok Imagine Video 1.5 (prelim.) | 1492 |
| 5 | Seedance 2.0 | 1479 |
| 6 | Wan 3.0 | 1476 |
| 7 | Seedance 2.5 | 1474 |
| 8 | MiniMax H3 | 1460 |
| 9 | Muse Video | 1456 |
| 11 | Sora 2 Pro (dead) | 1368 |
| 12–15 | Veo 3.1 variants | ~1360 |

- **The two boards disagree on #1.** Recommend a "top tier" group in the guide instead of naming one winner.
- **Rejected:** older Benchmarklist and Tech-Insider AA snapshots.
- **Not yet ranked:** Kling 4.0.

### 3.2 Video model cards

| Model | Maker | Released | Notes | Price | Source |
|---|---|---|---|---|---|
| Veo 3.1 / Fast / Lite | Google | Jan/Jan/Mar 2026 | Reliable, native audio. Now mid-table | 3.1: $0.40/s at 720p–1080p, $0.60/s at 4K. Fast: $0.10 / $0.12 / $0.30. Lite: $0.05 / $0.08 | <https://benchlm.ai/md/media-pricing/veo.md> (3P record of Google's page, 2026-10-13). AA agrees |
| Gemini Omni Flash / 1.1 | Google | 2026-05-19 / 2026-08-27 | Video reference input, reframing, extension, 360p drafts, 4K | About $0.10/s at 720p (token-billed) | Gemini pricing, <https://datanorth.ai/news/google-releases-gemini-omni-1-1-flash> |
| Seedance 2.0 / 2.5 | ByteDance | Mar 2026 / 2026-07-31 | Top-tier motion, multi-shot | Token-billed; resellers charge $0.10–0.75/s. Runway API: 2.5 is $0.30/s (720p) or $0.68/s (1080p) | <https://www.atlascloud.ai/blog/guides/seedance-2.5-pricing-guide> (3P) |
| Wan 3.0 | Alibaba | Aug 2026 | AA #1 | $0.20/s at 1080p | AA, Runway |
| MiniMax H3 / H3 Max | MiniMax | Jul/Aug 2026 | Cheapest model in the top tier | $0.08/s (AA). fal $0.03/s (conflict) | AA, fal |
| FLUX 3 video / Max | BFL | Jul/Oct 2026 | Strong on both boards | $0.29 / $0.0725 per second (AA) | AA |
| Kling 3.0 / 4.0 | Kuaishou | 3.0: Feb 2026. 4.0: Flash 2026-09-28, full 2026-10-15 | 4.0: 30s clips, 4K, 15 references + 10 keyframes | 3.0 Pro: fal $0.14/s. 4.0: no official API price; Runway list price $0.157/s (720p), $0.235/s (1080p) | <https://www.nocode.mba/ai-release-tracker/releases/kling-4-0>, <https://bernama.com/en/press/news.php?id=2622471> |
| Grok Imagine Video 1.5 | xAI | May 2026 | Arena #4 | $0.25/s | AA |
| Runway Gen-4.5 / Aleph 2 | Runway | — | Generation / video editing | $0.12 / $0.28 per second | Runway docs |
| Sora 2 / Pro | OpenAI | — | API removed 2026-09-24; app closed 2026-04-26 | Was $0.10/s; Pro $0.30–0.70/s | <https://zilliz.com/ai-faq/what-is-the-sora-shutdown-timeline> |

- **Rejected:** Veo3Gen's "$0.75/s Veo 3.1". It is a reseller and internally inconsistent.
- **Speed ESTIMATE (unsourced):** 30s to several minutes per clip. Fast, Lite and draft tiers exist to cut time and cost.

## 4. Audio

**TTS: AA leaderboard.** Source: <https://artificialanalysis.ai/text-to-speech/leaderboard>.

| # | Model | Elo | $ per 1M characters |
|---|---|---|---|
| 1 | Eleven v4 Turbo | 1336 | 40 |
| 2 | Eleven v4 | 1334 | 80 |
| 3 | Qwen-Audio-3.1-TTS-Plus | 1305 | 19.3 |
| 4 | Cartesia Sonic 3.6 | 1296 | 49 |
| 5 | Gemini 3.8 Flash TTS | 1283 | 16.5 |

**Music:**

- **Suno v6:** released 2026-09-09. Reported to top both rebuilt AA music boards (3P): <https://digg.com/ai/g8egglmo>. The AA page itself 404'd.
- **Suno plans (3P):** Pro $10 ($8 annual), Premier $30 ($24 annual), Free 50 credits/day.
- **Udio:** downloads disabled per a 2026-10-02 report (3P). Do not recommend it for downloadable output.
- **Lyria 3.5 API:** $0.08 per song. Lyria 3 Clip: $0.04 per 30s. Source: Gemini pricing.

**ElevenLabs** (<https://elevenlabs.io/pricing>):

| Plan | $/mo | Credits/mo |
|---|---|---|
| Free | 0 | 10k |
| Starter | ~6 (with a first-month discount) | 30k |
| Creator | 22 (discounted first month) | 121k |
| Pro | 99 | 600k |
| Scale | 299 | 1.8M |
| Business | 990 | 6M |

- TTS: 1 credit per character.
- Music: 900 credits per minute.
- SFX: 200 credits each.
- Re-check the Starter price; the fetch looked swapped.

## 5. How many attempts?

**No vendor publishes first-try or keep rates.** I found no citable platform data. The best proxies:

| Evidence | Finding | Source |
|---|---|---|
| GenEval 2 (Meta FAIR et al., Dec 2025) | Best tested model, Gemini 2.5 Flash Image, meets every constraint in **44.6%** of prompts (Soft-TIFA). Human-judged: **31.0%**. Per-element (atom-level): 82.8% | <https://arxiv.org/html/2512.16853v1> |
| GenEval 2, same paper | The original GenEval is saturated (~0.90) and drifts up to 17.7 points from human judgment. **Don't cite old GenEval scores** | same |
| GenOlympiad (2026-10-19) | On extreme prompts, the best model (Nano Banana Pro) scores **23.9/100** strict. GPT-Image-2.5 Sunburst is #2 | <https://arxiv.org/abs/2610.26850> |
| MagicCraft user study | **3.3 ± 2.7** attempts on a simple task; **5.2 ± 5.1** on a complex task | <https://arxiv.org/pdf/2504.21332> |

**Rejected:**

- "41% of prompts fail first try (Anthropic study)". I found no such study.
- "40–60% higher satisfaction" from Midjourney V-button rerolls. Its own source calls it anecdotal.

**ESTIMATE (unsourced):** expected attempts ≈ 1/p, where p is the chance a single try succeeds.

| Prompt type | p | Expected attempts |
|---|---|---|
| Simple prompt, top-5 model | 0.5–0.8 | 1.3–2 |
| Multi-constraint prompt (exact text, counts, layout) | 0.25–0.45 | 2–4 |
| Video shot | — | 3–5 |

## 6. Open gaps

- Per-model credit tables for Firefly partner models, OpenArt, Poe and Canva.
- Official per-image prices from BFL and BytePlus.
- Per-model speed numbers.
- Imagen 4 status.
- Official plan pages for Midjourney and Kling. Kling figures are 3P only: Standard $10 for 660 credits, Pro $37 for 3,000, Premier $92 for 8,000, Ultra $180 for 26,000. Source: <https://eesel.ai/blog/kling-ai-pricing>.
