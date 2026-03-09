export default function StatsRow({ leads }) {
  const hot = leads.filter(l => l.cls === 'hot').length
  const warm = leads.filter(l => l.cls === 'warm').length
  const nc = leads.filter(l => !l.email && !l.phone).length
  const avg = leads.length ? Math.round(leads.reduce((a, l) => a + l.score, 0) / leads.length) : 0
  return (
    <div className="stats-row">
      <div className="stat-block">
        <div className="stat-num">{leads.length}</div>
        <div className="stat-sub">Total leads</div>
        <div className="stat-trend" style={{ color: 'var(--muted)' }}>En vista actual</div>
      </div>
      <div className="stat-block">
        <div className="stat-num" style={{ color: 'var(--green)' }}>{hot}</div>
        <div className="stat-sub">🔥 Calientes</div>
        <div className="stat-trend" style={{ color: 'var(--green)' }}>{leads.length ? Math.round(hot / leads.length * 100) : 0}%</div>
      </div>
      <div className="stat-block">
        <div className="stat-num" style={{ color: 'var(--amber)' }}>{warm}</div>
        <div className="stat-sub">☀️ Tibios</div>
        <div className="stat-trend" style={{ color: 'var(--amber)' }}>Potencial</div>
      </div>
      <div className="stat-block">
        <div className="stat-num">{avg}</div>
        <div className="stat-sub">Score prom.</div>
        <div className="stat-trend" style={{ color: 'var(--muted)' }}>/100</div>
      </div>
      <div className="stat-block">
        <div className="stat-num" style={{ color: 'var(--red)' }}>{nc}</div>
        <div className="stat-sub">Sin contacto</div>
        <div className="stat-trend" style={{ color: 'var(--red)' }}>Atención req.</div>
      </div>
    </div>
  )
}
