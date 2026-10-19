export interface Library {
  prefix: string;
  name: string;
  total: number;
  author: { name: string; url?: string };
  license: { title: string; spdx?: string; url?: string };
  icons: string[];
}
export interface Icon { id: string; name: string; library: Library }
const related: Record<string, string[]> = {
  interface: ['menu', 'settings', 'search', 'layout', 'toggle', 'cursor'],
  weather: ['sun', 'cloud', 'rain', 'snow', 'wind', 'thermometer'],
  music: ['music', 'headphone', 'audio', 'speaker', 'piano', 'guitar'],
  home: ['home', 'house'], house: ['house', 'home'],
  settings: ['settings', 'gear', 'cog'], user: ['user', 'person', 'account'],
  search: ['search', 'magnifying', 'magnify'], heart: ['heart', 'favorite'],
};
export function searchIcons(icons: Icon[], query: string, prefix: string, saved?: Set<string>): Icon[] {
  const terms = query.toLowerCase().trim().split(/[\s_-]+/).filter(Boolean);
  return icons.filter(icon => (!prefix || icon.library.prefix === prefix) && (!saved || saved.has(icon.id)))
    .map(icon => {
      let score = 0;
      for (const term of terms) {
        const matches = related[term] ?? [term];
        const best = Math.max(...matches.map(word => icon.name === word ? 100 : icon.name.startsWith(`${word}-`) ? 50 : icon.name.includes(word) ? 20 : 0));
        if (!best) return { icon, score: -1 };
        score += best;
      }
      return { icon, score };
    }).filter(hit => hit.score >= 0).sort((a, b) => b.score - a.score).map(hit => hit.icon);
}
