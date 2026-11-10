# AI Model Usage Guide

`junkyard/ai-model-guide/`, shipped 2026-10-29. A point-in-time usage guide to which AI generation model (image, video, audio, 3D) to use for each job: how to get a good result, how many tries to expect, and what it costs. Leonardo.ai's lineup is the reference set and its plans are the worked example of an app subscription; notable models it does not carry are included. Research: [research/ai-models/](../research/ai-models/).

Screens: `docs/screens/ai-model-guide-*.png`.

## Concept

A dated tool manual with a selection chart. The reader starts from the job ("What are you making?") and gets a top pick, a runner-up and a cheap way to draft, plus how to get it right. The model reference below works like a selection chart: each row says what the model is for, rating balls compare it, and opening a row gives when to use it, when not to, and how to get it right. The dated masthead ("October 2026 edition, prices checked 29 Oct") makes the point-in-time nature part of the design.

- **Cost per good result** supports the choice rather than leading it: tokens per run × typical tries × the reader's plan price per token. The plan picker reprices the whole page.
- **One green, for picks only**: the job's picks, their row marker and labels. Everything else is ink.
- **Every token figure carries its source**: L (Leonardo published it), 3 (third party), E (estimated from the maker's API price). Leonardo no longer publishes a per-model token table, so most figures are E.

## Key decisions

- **Started as a "Buyer's Guide", reframed the same day.** The owner wanted usage, not buying: when to use each model and how to get it right. Title, masthead, section names and copy changed; the chart now shows each model's purpose in its row. Cost stayed, as one input to the decision.
- **Generalised beyond Leonardo (2026-10-31).** The owner wanted "what model for what job", with Leonardo as a sample reference.
  - Prices now default to each maker's API rate (a published `usd`, or Leonardo tokens ÷ 1,200). The plan picker became "Prices on", with the Leonardo plans as an optional example subscription.
  - Rows are marked "Leonardo only" (Leonardo's own models) or "Not on Leonardo".
  - Eight models Leonardo does not carry became full rows and can be picks: Midjourney V8.1, MAI-Image-2.6, Grok Imagine Image 2.0, Muse Image, Runway Gen-4.5 and Aleph 2, Suno v6 and ElevenLabs v4. Release dates for Aleph 2 and ElevenLabs v4 were not found and are left blank.
  - The levers, the platform table (maker APIs first) and the method notes were rewritten so they are not tied to one platform.
- **Estimate rule: about 1,200 tokens per API dollar.** The three published pairs (Nano Banana 2, GPT Image 2, FLUX.2 Pro) agree on it. Video fits less cleanly (Veo 3 in 2025 was ~420 per dollar), so video costs are the least certain.
- **Video basis is an 8 s clip at 720p with audio**, unless `per` says otherwise. Mixed bases would make the cost column meaningless.
- **Picks are "Top pick / Runner-up / Cheapest drafts"**, not "Best value". GPT Image 2.5 at Medium is so cheap (~16 tokens) that a "best value" pick often cost more than the top pick.
- **Variants fold into one row** (Seedance 2.0 covers Fast and Mini) so the chart stays scannable while every model is still named.
- **Tries are editor's estimates.** No one publishes measured rates; the best proxies (GenEval 2, GenOlympiad, a MagicCraft study) are in the research log.
- Route state (tab, job, sort, open entry) in the hash; the plan in local storage, because it is a personal setting, not part of a shared link.

## Type and color

Libre Franklin (variable, 300 to 900) from the 900-weight masthead down to table cells. DM Mono for numbers and small caps labels. Paper `oklch(0.972 0.005 95)`, ink `oklch(0.19 0.012 160)`, pick green `oklch(0.5 0.13 155)`; dark mode keeps hue and moves lightness.

## Skills review (2026-10-29)

Against [design/ui-skills.md](../design/ui-skills.md). The first version shipped without it; the review found and fixed:

- **Focus lost on every click** (a11y, interaction). Job, sort, tab and row clicks rebuilt the DOM and dropped focus to `body`. Controls now carry `data-key` and focus is restored; opening a pick moves focus to that model's row.
- **Jargon in labels** (writing). "Keeper", "relaxed", "n/p" and "tk" became "good result", "free reruns", "Not published" and "tokens".
- **Hover-only meaning** (usability). "Free reruns" was explained only by a `title`; it now has a visible legend, as do the token-source badges.
- **Row headers** (a11y). Model names are `th scope="row"`, so screen readers announce the model with every cell.
- **Skip link** to `main`; **live regions** for the picks and the model count; **40px targets** on touch screens for tabs, jobs and sort.
- **Purpose in the row** (usability, IA). Each row now shows the model's one-line use, so the chart answers "what is it for" without opening it.
- **Overall score explained** in "How to read this guide" (quality weighs most, speed least).

Checked with Playwright: tab order starts at the skip link, focus survives job, pick, sort, row and tab changes, no console errors, no horizontal overflow at 390px, light and dark.

## Learned

- **Harvey balls in one CSS rule**: a bordered circle with `conic-gradient(ink calc(var(--f) * 1turn), transparent 0)`, `--f` in quarters.
- **Rotated axis headers** (`writing-mode: vertical-rl; transform: rotate(180deg)`) keep a five-axis chart narrow.
- **Descendant selectors leak into nested tables.** The phone layout's `.chart tbody { display: block }` also hit the per-plan table inside an expanded row; `.chart > tbody` fixed it.
- On phones each row becomes a five-column grid: name and score, the five balls labelled from `data-axis`, then run cost, tries and cost per good result.

## Refreshing

Lineups change monthly. Re-check leonardo.ai/models, the pricing page, docs.leonardo.ai/llms.txt (new models appear there first) and the two arenas, then edit `data/models-*.ts`, `data/plans.ts` and the dates in `index.html`.
