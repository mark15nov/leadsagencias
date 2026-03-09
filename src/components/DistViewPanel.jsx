import { DISTRIBUTORS, BRANDS } from '../data'
import { clsLabel, clsColor } from '../data/scoring'

export default function DistViewPanel({ leads, onSelectLead }) {
  const totalHot = leads.filter(l => l.cls === 'hot').length
  const totalAvg = Math.round(leads.reduce((a, l) => a + l.score, 0) / leads.length) || 0
  return (
    <div className="dist-view-panel active">
      <div className="dv-header">
        <div className="dv-title">Vista por Distribuidor</div>
        <div className="dv-sub">Lista completa de leads asignados a cada distribuidor</div>
      </div>
      <div className="dv-stats">
        <div className="dv-stat"><div className="dv-stat-num">{leads.length}</div><div className="dv-stat-lbl">Total leads</div></div>
        <div className="dv-stat"><div className="dv-stat-num" style={{ color: 'var(--green)' }}>{totalHot}</div><div className="dv-stat-lbl">Calientes</div></div>
        <div className="dv-stat"><div className="dv-stat-num">{totalAvg}</div><div className="dv-stat-lbl">Score prom.</div></div>
        <div className="dv-stat"><div className="dv-stat-num">{DISTRIBUTORS.length}</div><div className="dv-stat-lbl">Distribuidores</div></div>
      </div>
      {DISTRIBUTORS.map(d => {
        const dLeads = leads.filter(l => l.assignedDist?.id === d.id).sort((a, b) => b.score - a.score)
        const hot = dLeads.filter(l => l.cls === 'hot').length
        const avg = dLeads.length ? Math.round(dLeads.reduce((a, l) => a + l.score, 0) / dLeads.length) : 0
        return (
          <div key={d.id} className="dv-dist-section">
            <div className="dv-dist-header" style={{ background: `${d.color}18`, border: `1px solid ${d.color}30`, borderBottom: 'none', borderRadius: '8px 8px 0 0' }}>
              <div>
                <div className="dv-dist-name" style={{ color: d.color }}>{d.name}</div>
                <div className="dv-dist-meta" style={{ color: d.color + '99' }}>{d.zones.join(' · ')} · Marcas: {d.brands.join(', ')}</div>
              </div>
              <div className="dv-dist-pills">
                <span className="pill pill-g">{hot} 🔥</span>
                <span className="pill" style={{ color: d.color, borderColor: d.color + '50' }}>{dLeads.length} leads</span>
                <span className="pill" style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>Avg {avg}</span>
              </div>
            </div>
            <div style={{ border: `1px solid ${d.color}30`, borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden', marginBottom: 16 }}>
              {dLeads.length === 0 ? (
                <div style={{ padding: 20, textAlign: 'center', color: 'var(--muted)', fontSize: 12, background: 'var(--card)' }}>Sin leads asignados</div>
              ) : dLeads.map(l => {
                const rc = `r-${l.cls === 'discard' ? 'discard' : l.cls}`
                return (
                  <div key={l.id} className={`dv-lead-row ${l.cls}`} onClick={() => onSelectLead(l.id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onSelectLead(l.id)}>
                    <div><div className={`score-ring ${rc}`} style={{ width: 34, height: 34, fontSize: 11 }}>{l.score}</div></div>
                    <div className="cell-lead">
                      <div className="ln" style={{ fontSize: 11 }}>{l.name}</div>
                      <div className="le">{l.email || l.phone || 'Sin contacto'}</div>
                    </div>
                    <div className="cell"><div className="cv">{BRANDS[l.marca]?.icon} {l.marca} {l.modelo}</div><div className="cs">📍 {l.zona}</div></div>
                    <div className="cell"><div className="budget-amt">${(l.presupuesto / 1000).toFixed(0)}k MXN</div><div className="cs">{l.diasCompra <= 7 ? '⚡ Urgente' : l.diasCompra <= 30 ? 'Este mes' : l.diasCompra + 'd'}</div></div>
                    <div className="cell"><div className="cv">{l.enganche ? '✅ Eng.' : '—'}</div><div className="cs">{l.fuente}</div></div>
                    <div className="cell">
                      <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: clsColor(l.cls) + '15', color: clsColor(l.cls), fontWeight: 600, border: `1px solid ${clsColor(l.cls)}30` }}>{clsLabel(l.cls)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
