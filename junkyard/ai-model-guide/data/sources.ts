import type { Score, Scores } from './types';

/** Shorthand for a ratings row: quality, adherence, craft, control, speed. */
export const rate = (quality: Score, adherence: Score, craft: Score, control: Score, speed: Score): Scores => ({
  quality,
  adherence,
  craft,
  control,
  speed,
});

/** Sources cited by more than one entry. Each was read on 2026-10-29. */
export const SRC = {
  leoModels: { label: 'Leonardo model list', url: 'https://leonardo.ai/models' },
  leoImageGuide: { label: 'Leonardo image model guide', url: 'https://leonardo.ai/news/ai-image-models' },
  leoVideoGuide: { label: 'Leonardo video model guide', url: 'https://leonardo.ai/news/ai-video-models' },
  leoTokens: { label: 'Leonardo tokens FAQ', url: 'https://intercom.help/leonardo-ai/en/articles/9044700-tokens-frequently-asked-questions' },
  leoDocs: { label: 'Leonardo API docs', url: 'https://docs.leonardo.ai/llms.txt' },
  leoDeprecations: { label: 'Leonardo deprecations', url: 'https://docs.leonardo.ai/docs/deprecations-changes' },
  scopeful: { label: 'Scopeful token table (third party)', url: 'https://www.scopeful.org/tools/leonardo' },
  aaImage: { label: 'Artificial Analysis image arena', url: 'https://artificialanalysis.ai/image/leaderboard/text-to-image' },
  aaVideo: { label: 'Artificial Analysis video arena', url: 'https://artificialanalysis.ai/video/leaderboard/text-to-video' },
  lmImage: { label: 'LMArena image leaderboard', url: 'https://arena.ai/leaderboard/text-to-image' },
  lmVideo: { label: 'LMArena video leaderboard', url: 'https://arena.ai/leaderboard/text-to-video' },
  openaiPricing: { label: 'OpenAI API pricing', url: 'https://developers.openai.com/api/docs/pricing' },
  geminiPricing: { label: 'Gemini API pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
  runwayApi: { label: 'Runway API rate card', url: 'https://docs.dev.runwayml.com/guides/pricing/' },
  screenrove: { label: 'Screenrove Leonardo capture', url: 'https://screenrove.com/leonardo/flows' },
} as const;
