import React, { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'

function pickChef(recipes){ return recipes.length? Math.floor(Math.random()*recipes.length) : -1 }

export default function App(){
  const [recipes, setRecipes] = useState([])
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('en')

  useEffect(()=>{ fetch('./recipes.json').then(r=>r.json()).then(setRecipes) },[])

  const filtered = useMemo(()=>{
    const t=q.toLowerCase()
    return recipes.filter(r=> r.title.toLowerCase().includes(t) || (r.title_hindi||'').includes(t))
  },[q,recipes])

  const chefIndex = useMemo(()=> pickChef(filtered), [filtered])

  return (
    <div className="container">
      <h1 className="title">Cook to Admire</h1>
      <p className="sub">100 iconic Indian dishes • HD images • @cooktoadmire</p>
      <div className="toolbar">
        <input className="search" placeholder="Search Paneer, Biryani, Dosa..." value={q} onChange={e=>setQ(e.target.value)} />
        <button className="lang" onClick={()=>setLang(l=> l==='en'?'hi':'en')}>{lang==='en'?'हिंदी':'English'}</button>
      </div>
      <div className="grid">
        {filtered.map((r,idx)=> <Card key={r.id||idx} recipe={r} lang={lang} chefPick={idx===chefIndex} /> )}
      </div>
      <div className="footer">© {new Date().getFullYear()} @cooktoadmire</div>
    </div>
  )
}
