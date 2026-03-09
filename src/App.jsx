import { useMemo, useState, useCallback } from 'react'
import { buildLeads } from './data'
import Header from './components/Header'
import SidebarLeft from './components/SidebarLeft'
import TopBar from './components/TopBar'
import StatsRow from './components/StatsRow'
import LeadsTable from './components/LeadsTable'
import SidebarRight from './components/SidebarRight'

const INITIAL_LEADS = buildLeads()
const ZONAS = [...new Set(INITIAL_LEADS.map(l => l.zona))].sort()
const MARCAS = [...new Set(INITIAL_LEADS.map(l => l.marca))].sort()

export default function App() {
  const [leads] = useState(INITIAL_LEADS)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeDist, setActiveDist] = useState(null)
  const [selectedLeadId, setSelectedLeadId] = useState(null)
  const [panelTab, setPanelTab] = useState('detail')
  const [leftPane, setLeftPane] = useState('dists')
  const [zonaFilter, setZonaFilter] = useState('all')
  const [marcaFilter, setMarcaFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      if (activeFilter !== 'all' && l.cls !== activeFilter) return false
      if (activeDist && l.assignedDist?.id !== activeDist) return false
      if (zonaFilter !== 'all' && l.zona !== zonaFilter) return false
      if (marcaFilter !== 'all' && l.marca !== marcaFilter) return false
      const q = search.toLowerCase().trim()
      if (q && !l.name.toLowerCase().includes(q) && !(l.email || '').toLowerCase().includes(q)) return false
      return true
    }).sort((a, b) => b.score - a.score)
  }, [leads, activeFilter, activeDist, zonaFilter, marcaFilter, search])

  const selectedLead = selectedLeadId ? leads.find(l => l.id === selectedLeadId) ?? null : null

  const onSelectLead = useCallback((id) => {
    setSelectedLeadId(id)
    setPanelTab('detail')
    setRightOpen(true)
  }, [])

  const hotCount = useMemo(() => leads.filter(l => l.cls === 'hot').length, [leads])
  const avgScore = useMemo(() => Math.round(leads.reduce((a, l) => a + l.score, 0) / leads.length), [leads])

  return (
    <>
      <Header
        totalLeads={leads.length}
        hotCount={hotCount}
        avgScore={avgScore}
        onOpenLeft={() => setLeftOpen(true)}
        onOpenRight={() => setRightOpen(true)}
      />
      <div className="shell">
        <SidebarLeft
          leftPane={leftPane}
          setLeftPane={setLeftPane}
          activeDist={activeDist}
          setActiveDist={setActiveDist}
          leads={leads}
          open={leftOpen}
          onClose={() => setLeftOpen(false)}
        />
        <div className="main-area">
          <TopBar
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            zonaFilter={zonaFilter}
            setZonaFilter={setZonaFilter}
            marcaFilter={marcaFilter}
            setMarcaFilter={setMarcaFilter}
            search={search}
            setSearch={setSearch}
            zonas={ZONAS}
            marcas={MARCAS}
          />
          <StatsRow leads={filteredLeads} />
          <div className="table-wrap">
            <div className="table-scroll">
              <div className="table-head">
                <div className="th">Score</div>
                <div className="th">Lead</div>
                <div className="th">Marca / Modelo</div>
                <div className="th">Zona</div>
                <div className="th">Presupuesto</div>
                <div className="th">Urgencia</div>
                <div className="th">Calidad</div>
                <div className="th">Distribuidor</div>
              </div>
              <LeadsTable leads={filteredLeads} onSelectLead={onSelectLead} />
            </div>
          </div>
        </div>
        <SidebarRight
          panelTab={panelTab}
          setPanelTab={setPanelTab}
          selectedLead={selectedLead}
          leads={leads}
          onSelectLead={onSelectLead}
          open={rightOpen}
          onClose={() => setRightOpen(false)}
        />
      </div>
    </>
  )
}
