export default function TopBar({ activeFilter, setActiveFilter, zonaFilter, setZonaFilter, marcaFilter, setMarcaFilter, search, setSearch, zonas, marcas }) {
  return (
    <div className="top-bar">
      <button type="button" className={`fb ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Todos</button>
      <button type="button" className={`fb ${activeFilter === 'hot' ? 'active' : ''}`} onClick={() => setActiveFilter('hot')}>🔥 Calientes</button>
      <button type="button" className={`fb ${activeFilter === 'warm' ? 'active' : ''}`} onClick={() => setActiveFilter('warm')}>☀️ Tibios</button>
      <button type="button" className={`fb ${activeFilter === 'cold' ? 'active' : ''}`} onClick={() => setActiveFilter('cold')}>🧊 Fríos</button>
      <button type="button" className={`fb ${activeFilter === 'discard' ? 'active' : ''}`} onClick={() => setActiveFilter('discard')}>✕ Descartar</button>
      <select className="top-sel" value={zonaFilter} onChange={e => setZonaFilter(e.target.value)}>
        <option value="all">Zona</option>
        {zonas.map(z => <option key={z} value={z}>{z}</option>)}
      </select>
      <select className="top-sel" value={marcaFilter} onChange={e => setMarcaFilter(e.target.value)}>
        <option value="all">Marca</option>
        {marcas.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <div className="search-wrap">
        <span className="search-icon">⌕</span>
        <input className="search-inp" placeholder="Buscar lead..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
    </div>
  )
}
