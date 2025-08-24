import React, { useEffect, useMemo, useState } from 'react'
import recipes from './data/recipes.json'
import RecipeCard from './components/RecipeCard'

export default function App(){
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('en')

  const filtered = useMemo(() => {
    const term = q.toLowerCase()
    return recipes.filter(r => r.name.toLowerCase().includes(term))
  }, [q])

  return (
    <div className="container">
      <h1 style={{textAlign:'center', marginBottom: 4}}>Cook to Admire 🍽️</h1>
      <p style={{textAlign:'center', marginTop: 0, color:'#666'}}>100 Indian recipes with bilingual captions & Insta-ready exports</p>
      <div className="toolbar">
        <input placeholder="Search recipes..." value={q} onChange={e=>setQ(e.target.value)} />
        <button className="lang" onClick={()=>setLang(l=> l==='en'?'hi':'en')}>{lang==='en'?'हिंदी':'English'}</button>
      </div>
      <div className="grid">
        {filtered.map(r => <RecipeCard key={r.id} recipe={r} lang={lang} />)}
      </div>
    </div>
  )
}
