import { generateLeads } from './constants';
import { bestDist, cls } from './scoring';

export { DISTRIBUTORS, RULES, BRANDS, generateLeads } from './constants';
export { scoreFor, bestDist, cls, clsLabel, clsColor } from './scoring';

export function buildLeads() {
  const raw = generateLeads();
  return raw.map(l => {
    const { dist, score } = bestDist(l);
    return { ...l, assignedDist: dist, score, cls: cls(score) };
  });
}
