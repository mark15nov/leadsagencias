import { DISTRIBUTORS, BRANDS } from '../data'
import { scoreFor, clsLabel, clsColor } from '../data/scoring'

export default function DetailPanel({ lead }) {
  if (!lead) {
    return (
      <div className="detail-panel active">
        <div className="detail-placeholder">
          <div style={{ fontSize: 36, opacity: 0.2 }}>📋</div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Selecciona un lead</div>
          <div style={{ fontSize: 11, maxWidth: 180, lineHeight: 1.6, marginTop: 4 }}>Haz click en cualquier fila para ver el análisis completo y desglose de score</div>
        </div>
      </div>
    )
  }
  const l = lead
  const allS = DISTRIBUTORS.map(d => ({ dist: d, ...scoreFor(l, d) })).sort((a, b) => b.score - a.score)
  const best = allS[0]
  const cc = clsColor(l.cls)
  return (
    <div className="detail-panel active">
      <div className="dp-name">{l.name}</div>
      <div className="dp-sub">{l.email || 'sin email'} · {l.phone || 'sin teléfono'} · {l.fuente}</div>
      <div className="score-hero">
        <div className="sh-num">{l.score}</div>
        <div className="sh-info">
          <div className="sh-cls" style={{ color: cc }}>{clsLabel(l.cls)}</div>
          <div className="sh-desc">{l.marca} {l.modelo} · {l.zona}<br />{l.financiamiento} · {l.diasCompra <= 30 ? l.diasCompra + ' días para compra' : 'Más de un mes'}</div>
        </div>
      </div>
      <div className="detail-grid">
        <div className="df"><div className="df-lbl">Zona</div><div className="df-val">📍 {l.zona}</div></div>
        <div className="df"><div className="df-lbl">Vehículo</div><div className="df-val">{BRANDS[l.marca]?.icon} {l.marca} {l.modelo}</div></div>
        <div className="df"><div className="df-lbl">Presupuesto</div><div className="df-val" style={{ color: 'var(--green)' }}>${l.presupuesto.toLocaleString()}</div></div>
        <div className="df"><div className="df-lbl">Urgencia</div><div className="df-val">{l.diasCompra} días</div></div>
        <div className="df"><div className="df-lbl">Enganche</div><div className="df-val">{l.enganche ? '✅ Listo' : '❌ No'}</div></div>
        <div className="df"><div className="df-lbl">Historial</div><div className="df-val">{l.previoCliente ? '⭐ Previo' : 'Nuevo'}</div></div>
      </div>
      <div className="sec-title">Desglose — {best.dist.name}</div>
      <div className="breakdown">
        {best.breakdown.map((b, i) => (
          <div key={i} className="bd-row">
            <span className="bd-lbl">{b.l}</span>
            <span className={`bd-pts ${b.v > 0 ? 'bd-p' : 'bd-n'}`}>{b.v > 0 ? '+' : ''}{b.v}</span>
          </div>
        ))}
        <div className="bd-row bd-total">
          <span className="bd-lbl">SCORE FINAL</span>
          <span className="bd-pts bd-p">{l.score}/100</span>
        </div>
      </div>
      <div className="sec-title">Score por distribuidor</div>
      <div className="dist-cmp">
        {allS.map((s, i) => (
          <div key={s.dist.id} className={`dc-row ${i === 0 ? 'best' : ''}`}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="dc-name" style={{ color: s.dist.color }}>{s.dist.name}{i === 0 ? ' ⭐' : ''}</div>
              <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 1 }}>{s.zoneMatch ? '📍✓' : '⚠️'} {s.brandMatch ? '· Marca ✓' : '· Marca ~'}</div>
            </div>
            <div className="dc-bar-wrap"><div className="dc-bar" style={{ width: `${s.score}%`, background: s.dist.color }} /></div>
            <div className="dc-score" style={{ color: s.dist.color }}>{s.score}</div>
          </div>
        ))}
      </div>
      <button type="button" className="assign-btn" disabled={!l.email && !l.phone}>ASIGNAR A {best.dist.name.toUpperCase()}</button>
    </div>
  )
}
