export default function Header({ totalLeads, hotCount, avgScore, onOpenLeft, onOpenRight }) {
  return (
    <header className="app-header">
      <div className="logo-wrap">
        <button type="button" className="header-menu-btn" onClick={onOpenLeft} aria-label="Abrir menú distribuidores">☰</button>
        <div className="logo-text">Profit<span>120</span></div>
        <div className="logo-divider" />
        <div className="logo-sub">Lead Intelligence</div>
      </div>
      <div className="header-right">
        <div className="h-stat">
          <div className="h-stat-num">{totalLeads}</div>
          <div className="h-stat-lbl">Leads</div>
        </div>
        <div className="h-stat">
          <div className="h-stat-num">{hotCount}</div>
          <div className="h-stat-lbl">Calientes</div>
        </div>
        <div className="h-stat">
          <div className="h-stat-num">{avgScore}</div>
          <div className="h-stat-lbl">Prom.</div>
        </div>
        <div className="live-badge">
          <div className="live-dot" />
          <span>Sistema activo</span>
        </div>
        <button type="button" className="header-menu-btn" onClick={onOpenRight} aria-label="Abrir panel detalle">📋</button>
      </div>
    </header>
  )
}
