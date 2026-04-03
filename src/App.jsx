import { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, FileCode, Wand2 } from 'lucide-react'
import { prompts, skills, CATEGORIES } from './data'
import './App.css'

function Card({ item, type }) {
  const [expanded, setExpanded] = useState(false)
  const cat = CATEGORIES[item.category]
  const ItemIcon = item.Icon

  return (
    <div className={`card ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)} style={{ '--card-accent': cat?.color }}>
      <div className="card-accent-line" style={{ background: `linear-gradient(90deg, ${cat?.color}, ${cat?.color}66)` }} />
      <div className="card-header">
        <div className="card-top-row">
          <div className="card-badge" style={{ background: cat?.color + '18', color: cat?.color }}>
            {type === 'prompt' ? <FileCode size={12} /> : <Wand2 size={12} />}
            <span>{type === 'prompt' ? 'Prompt' : 'Skill'}</span>
          </div>
          {item.mode && <span className="mode-chip">{item.mode}</span>}
        </div>
        <div className="card-title-row">
          <div className="card-icon-wrap" style={{ background: cat?.color + '15', color: cat?.color }}>
            <ItemIcon size={20} />
          </div>
          <div>
            <h3 className="card-title">
              {item.name}
              {item.alias && <span className="card-alias">{item.alias}</span>}
            </h3>
            <p className="card-desc">{item.description}</p>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="card-body">
          <div className="card-section">
            <h4><span className="section-dot" style={{ background: cat?.color }} />Purpose</h4>
            <p>{item.purpose}</p>
          </div>
          <div className="card-section highlight-section">
            <h4><span className="section-dot" style={{ background: '#a78bfa' }} />When to Use</h4>
            <p>{item.whenToUse}</p>
          </div>
          {item.useCases && (
            <div className="card-section">
              <h4><span className="section-dot" style={{ background: '#34d399' }} />Use Cases</h4>
              <ul>
                {item.useCases.map((uc, i) => <li key={i}>{uc}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="card-footer">
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        <span>{expanded ? 'Collapse' : 'Details'}</span>
      </div>
    </div>
  )
}

function StatsBar({ filteredCount }) {
  const stats = [
    { value: prompts.length, label: 'Prompts', color: '#818cf8' },
    { value: skills.length, label: 'Skills', color: '#34d399' },
    { value: Object.keys(CATEGORIES).length, label: 'Categories', color: '#fbbf24' },
    { value: filteredCount, label: 'Showing', color: '#f472b6' },
  ]
  return (
    <div className="stats-bar">
      {stats.map(s => (
        <div className="stat" key={s.label}>
          <span className="stat-num" style={{ color: s.color }}>{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [activeType, setActiveType] = useState('ALL')

  const allItems = useMemo(() => [
    ...prompts.map(p => ({ ...p, _type: 'prompt' })),
    ...skills.map(s => ({ ...s, _type: 'skill' })),
  ], [])

  const filtered = useMemo(() => {
    return allItems.filter(item => {
      const q = search.toLowerCase()
      const matchSearch = !q || item.name.includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.purpose.toLowerCase().includes(q) ||
        (item.alias && item.alias.toLowerCase().includes(q)) ||
        (item.whenToUse && item.whenToUse.toLowerCase().includes(q))
      const matchCat = activeCategory === 'ALL' || item.category === activeCategory
      const matchType = activeType === 'ALL' || item._type === activeType
      return matchSearch && matchCat && matchType
    })
  }, [allItems, search, activeCategory, activeType])

  const groupedByCategory = useMemo(() => {
    const groups = {}
    filtered.forEach(item => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })
    return groups
  }, [filtered])

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-content">
          <div className="hero-pill">Interactive Reference Guide</div>
          <h1><span className="gradient-text">oh-my-codex</span></h1>
          <p className="subtitle">The complete guide to <strong>{prompts.length} Agent Prompts</strong> and <strong>{skills.length} Workflow Skills</strong></p>
        </div>
      </header>

      <div className="controls">
        <div className="search-wrap">
          <Search size={18} className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search prompts, skills, categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="search-clear" onClick={() => setSearch('')}>&times;</button>}
        </div>

        <div className="filter-bar">
          <div className="type-toggles">
            {[['ALL', 'All'], ['prompt', 'Prompts'], ['skill', 'Skills']].map(([val, label]) => (
              <button key={val} className={`type-btn ${activeType === val ? 'active' : ''}`} onClick={() => setActiveType(val)}>
                {val === 'prompt' && <FileCode size={14} />}
                {val === 'skill' && <Wand2 size={14} />}
                {label}
              </button>
            ))}
          </div>
          <div className="category-pills">
            <button className={`pill ${activeCategory === 'ALL' ? 'active' : ''}`} onClick={() => setActiveCategory('ALL')}>All</button>
            {Object.entries(CATEGORIES).map(([key, cat]) => {
              const CatIcon = cat.Icon
              return (
                <button
                  key={key}
                  className={`pill ${activeCategory === key ? 'active' : ''}`}
                  style={activeCategory === key ? { background: cat.color + '20', color: cat.color, borderColor: cat.color + '66' } : {}}
                  onClick={() => setActiveCategory(key)}
                >
                  <CatIcon size={13} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <StatsBar filteredCount={filtered.length} />

      <main className="content">
        {Object.entries(groupedByCategory).sort(([a], [b]) => a.localeCompare(b)).map(([catKey, items]) => {
          const cat = CATEGORIES[catKey]
          const CatIcon = cat?.Icon
          return (
            <section key={catKey} className="category-section">
              <h2 className="category-heading">
                <div className="cat-heading-icon" style={{ background: cat?.color + '18', color: cat?.color }}>
                  {CatIcon && <CatIcon size={18} />}
                </div>
                <span style={{ color: cat?.color }}>{cat?.label}</span>
                <span className="category-count">{items.length}</span>
              </h2>
              <div className="card-grid">
                {items.sort((a, b) => a.name.localeCompare(b.name)).map(item => (
                  <Card key={item._type + item.name} item={item} type={item._type} />
                ))}
              </div>
            </section>
          )
        })}
        {filtered.length === 0 && (
          <div className="empty-state">
            <Search size={48} />
            <p>No results for &ldquo;{search}&rdquo;</p>
            <button onClick={() => { setSearch(''); setActiveCategory('ALL'); setActiveType('ALL') }}>Clear all filters</button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>oh-my-codex Reference &middot; {prompts.length} Prompts &middot; {skills.length} Skills &middot; Built with React + Vite + Lucide</p>
      </footer>
    </div>
  )
}
