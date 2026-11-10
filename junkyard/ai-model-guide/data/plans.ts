import type { Plan } from './types';

/**
 * Where it can, the guide prices each model at its maker's API rate, so the
 * numbers hold wherever you run it. Leonardo.ai plans are the worked example
 * of an app subscription: per1k = plan price / monthly fast tokens, assuming
 * you use the whole allowance. Checked 2026-10-29 on leonardo.ai/pricing.
 */
export const PLANS: Plan[] = [
  { id: 'api', kind: 'api', label: 'Maker API price', price: 'pay per use', per1k: 0, tokens: 'Pay per run', relaxed: 'None' },
  { id: 'essential', kind: 'leonardo', label: 'Leonardo Essential, monthly', price: '$12 / mo', per1k: 1.41, tokens: '8,500 tokens / mo', relaxed: 'None' },
  { id: 'essential-y', kind: 'leonardo', label: 'Leonardo Essential, yearly', price: '$10 / mo', per1k: 1.18, tokens: '8,500 tokens / mo', relaxed: 'None' },
  { id: 'premium', kind: 'leonardo', label: 'Leonardo Premium, monthly', price: '$30 / mo', per1k: 1.2, tokens: '25,000 tokens / mo', relaxed: 'Leonardo image models' },
  { id: 'premium-y', kind: 'leonardo', label: 'Leonardo Premium, yearly', price: '$24 / mo', per1k: 0.96, tokens: '25,000 tokens / mo', relaxed: 'Leonardo image models' },
  { id: 'ultimate', kind: 'leonardo', label: 'Leonardo Ultimate, monthly', price: '$60 / mo', per1k: 1.0, tokens: '60,000 tokens / mo', relaxed: 'Images, plus some video' },
  { id: 'ultimate-y', kind: 'leonardo', label: 'Leonardo Ultimate, yearly', price: '$48 / mo', per1k: 0.8, tokens: '60,000 tokens / mo', relaxed: 'Images, plus some video' },
];

export const DEFAULT_PLAN = 'api';
export const findPlan = (id: string | null | undefined): Plan => PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.id === DEFAULT_PLAN)!;

/**
 * Leonardo's published token costs and makers' API prices meet at about
 * 1,200 tokens per API dollar (Nano Banana 2, GPT Image 2, FLUX.2 Pro). The
 * guide uses that rate both ways: to estimate tokens from an API price, and
 * an API price from tokens when only the Leonardo cost is known.
 */
export const TOKENS_PER_API_DOLLAR = 1200;
