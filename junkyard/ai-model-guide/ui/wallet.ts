import { h } from '@lib/dom';
import { readJson, writeJson } from '@lib/local-store';
import { findPlan, PLANS } from '../data/plans';
import type { Plan } from '../data/types';

const KEY = 'ai-model-guide:plan';

/**
 * Where you pay. The default prices every model at its maker's API rate;
 * the Leonardo plans show the same models inside one app subscription, as a
 * worked example. Changing it reprices the whole guide.
 */
export function mountWallet(container: HTMLElement, onChange: (plan: Plan) => void): Plan {
  let plan = findPlan(readJson<string | null>(KEY, null));

  const option = (p: Plan) => h('option', { value: p.id, selected: p.id === plan.id }, p.kind === 'api' ? p.label : `${p.label.replace('Leonardo ', '')} · ${p.price}`);
  const select = h(
    'select',
    { id: 'plan' },
    ...PLANS.filter((p) => p.kind === 'api').map(option),
    h('optgroup', { label: 'Leonardo.ai plan (example app)' }, ...PLANS.filter((p) => p.kind === 'leonardo').map(option)),
  );
  const rate = h('b', { class: 'wallet-rate' });
  const unit = h('span', {});
  const detail = h('span', { class: 'wallet-detail' });
  const formula = h('span', {});

  function paint() {
    if (plan.kind === 'api') {
      rate.textContent = 'Pay per run';
      unit.textContent = '';
      detail.textContent = "each model at its maker's API rate, where you can run it directly";
      formula.textContent = 'price per run × typical tries';
    } else {
      rate.textContent = `$${plan.per1k.toFixed(2)}`;
      unit.textContent = ' per 1,000 tokens';
      detail.textContent = `${plan.tokens} · free reruns: ${plan.relaxed}`;
      formula.textContent = 'tokens per run × typical tries × your price per token';
    }
  }

  select.addEventListener('change', () => {
    plan = findPlan(select.value);
    writeJson(KEY, plan.id);
    paint();
    onChange(plan);
  });

  container.append(
    h('label', { class: 'wallet-plan', for: 'plan' }, h('span', { class: 'label' }, 'Prices on'), select),
    h('p', { class: 'wallet-sum' }, rate, unit, detail),
    h('p', { class: 'wallet-formula' }, h('span', { class: 'label' }, 'Cost per good result'), formula),
  );
  paint();
  return plan;
}
