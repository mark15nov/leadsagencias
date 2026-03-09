import DetailPanel from './DetailPanel'
import DistViewPanel from './DistViewPanel'
import AIPanel from './AIPanel'

export default function SidebarRight({ panelTab, setPanelTab, selectedLead, leads, onSelectLead, open, onClose }) {
  const setDetail = () => { setPanelTab('detail') }
  const setDistView = () => { setPanelTab('dist-view') }
  const setAI = () => { setPanelTab('ai') }

  return (
    <>
      <div className={`sidebar-right ${open ? 'open' : ''} ${open && (panelTab === 'detail' || panelTab === 'dist-view' || panelTab === 'ai') ? 'has-content' : ''}`}>
        <div className="panel-tabs">
          <button type="button" className={`panel-tab ${panelTab === 'detail' ? 'active' : ''}`} onClick={setDetail}>📋 Detalle</button>
          <button type="button" className={`panel-tab ${panelTab === 'dist-view' ? 'active' : ''}`} onClick={setDistView}>🏢 Distribuidores</button>
          <button type="button" className={`panel-tab ${panelTab === 'ai' ? 'active' : ''}`} onClick={setAI}>🤖 IA</button>
        </div>
        {panelTab === 'detail' && (
          <DetailPanel lead={selectedLead} />
        )}
        {panelTab === 'dist-view' && (
          <DistViewPanel leads={leads} onSelectLead={id => { onSelectLead(id); setPanelTab('detail') }} />
        )}
        {panelTab === 'ai' && (
          <AIPanel leads={leads} />
        )}
      </div>
      {open && <div className="sidebar-overlay open" onClick={onClose} role="presentation" aria-hidden />}
    </>
  )
}
