import { DISTRIBUTORS } from './constants';

export function scoreFor(lead, dist) {
  let s = 0;
  const bd = [];
  const zm = dist.zones.includes(lead.zona);
  const bm = dist.brands.includes(lead.marca);
  if (zm) { s += 25; bd.push({ l: 'Zona coincide', v: 25 }); }
  if (bm) { s += 20; bd.push({ l: 'Marca en portafolio', v: 20 }); }
  if (lead.presupuesto >= 350000) { s += 20; bd.push({ l: 'Presupuesto alto', v: 20 }); }
  if (lead.diasCompra <= 30) { s += 15; bd.push({ l: 'Urgencia alta', v: 15 }); }
  else if (lead.diasCompra > 180) { s -= 15; bd.push({ l: 'Sin urgencia', v: -15 }); }
  if (lead.enganche) { s += 10; bd.push({ l: 'Enganche listo', v: 10 }); }
  if (lead.fuente === 'Showroom' || lead.fuente === 'Referido') { s += 10; bd.push({ l: 'Fuente premium', v: 10 }); }
  if (!lead.email && !lead.phone) { s -= 20; bd.push({ l: 'Sin contacto', v: -20 }); }
  if (lead.presupuesto < 150000) { s -= 10; bd.push({ l: 'Presupuesto bajo', v: -10 }); }
  if (lead.previoCliente) { s += 5; bd.push({ l: 'Cliente previo', v: 5 }); }
  return { score: Math.max(0, Math.min(100, s)), breakdown: bd, zoneMatch: zm, brandMatch: bm };
}

export function bestDist(lead) {
  let best = null, bs = -1;
  DISTRIBUTORS.forEach(d => {
    const { score } = scoreFor(lead, d);
    if (score > bs) { bs = score; best = d; }
  });
  return { dist: best, score: bs };
}

export function cls(s) {
  if (s >= 70) return 'hot';
  if (s >= 45) return 'warm';
  if (s >= 20) return 'cold';
  return 'discard';
}

export function clsLabel(c) {
  return { hot: '🔥 Caliente', warm: '☀️ Tibio', cold: '🧊 Frío', discard: '✕ Descartar' }[c];
}

export function clsColor(c) {
  return { hot: 'var(--green)', warm: 'var(--amber)', cold: '#aaa', discard: 'var(--red)' }[c];
}
