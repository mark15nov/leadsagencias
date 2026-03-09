import { BRANDS } from '../data'
import { scoreFor, clsColor } from '../data/scoring'

export default function LeadsTable({ leads, onSelectLead }) {
  if (!leads.length) {
    return (
      <div className="empty">
        <div className="empty-icon">📭</div>
        <div style={{ fontWeight: 600, fontSize: 13 }}>Sin leads</div>
        <div style={{ marginTop: 4, fontSize: 11 }}>Ajusta los filtros</div>
      </div>
    )
  }
  const bMax = Math.max(...leads.map(l => l.presupuesto))
  return (
    <div className="leads-list">
      {leads.map((l, i) => {
        const rc = `r-${l.cls === 'discard' ? 'discard' : l.cls}`
        const bc = clsColor(l.cls)
        const bPct = Math.round(l.presupuesto / bMax * 100)
        const hasC = l.email || l.phone
        const qS = Math.min(5, Math.round(l.score / 20))
        const zm = l.assignedDist ? scoreFor(l, l.assignedDist).zoneMatch : false
        const bm = l.assignedDist ? scoreFor(l, l.assignedDist).brandMatch : false
        const urg = l.diasCompra <= 7 ? '⚡ Urgente' : l.diasCompra <= 30 ? 'Alta' : l.diasCompra <= 90 ? 'Media' : 'Baja'
        const urgTime = l.diasCompra <= 30 ? l.diasCompra + ' días' : Math.round(l.diasCompra / 30) + ' meses'
        return (
          <div
            key={l.id}
            className={`lead-row ${l.cls}`}
            onClick={() => onSelectLead(l.id)}
            style={{ animationDelay: `${Math.min(i, 0.3) * 0.03}s` }}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onSelectLead(l.id)}
          >
            <div>
              <div className={`score-ring ${rc}`}>{l.score}</div>
            </div>
            <div className="cell-lead">
              <div className="ln">{l.name}</div>
              <div className={hasC ? 'le' : 'no-contact'}>{hasC ? (l.email || l.phone) : 'Sin contacto'}</div>
            </div>
            <div className="cell">
              <div className="cv">{BRANDS[l.marca]?.icon} {l.marca}</div>
              <div className="cs">{l.modelo}</div>
            </div>
            <div className="cell">
              <div className="cv">📍 {l.zona}</div>
              <div className="cs">{l.financiamiento}</div>
            </div>
            <div className="cell">
              <div className="budget-amt">${(l.presupuesto / 1000).toFixed(0)}k</div>
              <div className="budget-bar"><div className="budget-fill" style={{ width: `${bPct}%`, background: bc }} /></div>
            </div>
            <div className="cell">
              <div className="cv">{urg}</div>
              <div className="cs">{urgTime}</div>
            </div>
            <div className="cell">
              <div className="cv">{hasC ? '✅ Completo' : '⚠️ Incompleto'}</div>
              <div className="qdots">
                {Array.from({ length: 5 }, (_, j) => <div key={j} className={`qdot ${j < qS ? 'on' : ''}`} />)}
              </div>
            </div>
            <div className="cell">
              {l.assignedDist ? (
                <>
                  <div className="match-name" style={{ color: l.assignedDist.color }}>{l.assignedDist.name}</div>
                  <div className="match-chips">
                    <span className={`mchip ${zm ? 'mc-ok' : 'mc-warn'}`}>{zm ? 'ZONA ✓' : 'ZONA ~'}</span>
                    <span className={`mchip ${bm ? 'mc-ok' : 'mc-warn'}`}>{bm ? 'MCA ✓' : 'MCA ~'}</span>
                  </div>
                </>
              ) : <span style={{ color: 'var(--muted)', fontSize: 10 }}>Sin asignar</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
