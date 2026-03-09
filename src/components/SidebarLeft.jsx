import { DISTRIBUTORS, RULES } from '../data'

export default function SidebarLeft({ leftPane, setLeftPane, activeDist, setActiveDist, leads, open, onClose }) {
  return (
    <>
      <div className={`sidebar-left ${open ? 'open' : ''}`}>
        <div className="sl-tabs">
          <button type="button" className={`sl-tab ${leftPane === 'dists' ? 'active' : ''}`} onClick={() => setLeftPane('dists')}>Distribuidores</button>
          <button type="button" className={`sl-tab ${leftPane === 'rules' ? 'active' : ''}`} onClick={() => setLeftPane('rules')}>Scoring</button>
        </div>
        <div className={`sl-pane ${leftPane === 'dists' ? 'active' : ''}`}>
          <div className="sl-label">Seleccionar</div>
          <div>
            {DISTRIBUTORS.map(d => {
              const dl = leads.filter(l => l.assignedDist?.id === d.id)
              const hot = dl.filter(l => l.cls === 'hot').length
              const isA = activeDist === d.id ? 'active' : ''
              return (
                <div key={d.id} className={`dist-card ${isA}`} onClick={() => setActiveDist(activeDist === d.id ? null : d.id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setActiveDist(activeDist === d.id ? null : d.id)}>
                  <div className="dist-name" style={{ color: d.color }}>{d.name}</div>
                  <div className="dist-zone">{d.zones.join(' · ')}</div>
                  <div className="dist-pills">
                    <span className="pill pill-g">{hot} 🔥</span>
                    <span className="pill pill-w">{dl.length} leads</span>
                    {d.brands.slice(0, 3).map(b => <span key={b} className="pill pill-w">{b}</span>)}
                  </div>
                  <div className="dist-row-stats">
                    <span className="drs">Hot: <strong>{hot}</strong></span>
                    <span className="drs">Tibios: <strong>{dl.filter(l => l.cls === 'warm').length}</strong></span>
                    <span className="drs">Avg: <strong>{dl.length ? Math.round(dl.reduce((a, l) => a + l.score, 0) / dl.length) : 0}</strong></span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`sl-pane ${leftPane === 'rules' ? 'active' : ''}`}>
          <div className="sl-label">Criterios</div>
          <div>
            {RULES.map((r, i) => (
              <div key={i} className="rule-item">
                <span className="rule-icon">{r.icon}</span>
                <span className="rule-name">{r.label}</span>
                <span className={`rule-pts ${r.pts > 0 ? 'pts-p' : 'pts-n'}`}>{r.pts > 0 ? '+' : ''}{r.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {open && <div className="sidebar-overlay open" onClick={onClose} role="presentation" aria-hidden />}
    </>
  )
}
