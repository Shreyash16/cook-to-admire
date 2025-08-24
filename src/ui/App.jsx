import React, { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'

function pickChef(recipes){
  if(!recipes.length) return -1
  return Math.floor(Math.random()*recipes.length)
}

export default function App(){
  const [recipes, setRecipes] = useState([])
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('en')
  const [theme, setTheme] = useState('cosmic')

  useEffect(()=>{
    fetch('./recipes.json').then(r=>r.json()).then(setRecipes)
  }, [])

  const filtered = useMemo(()=>{
    const t = q.toLowerCase()
    return recipes.filter(r => r.title.toLowerCase().includes(t) || (r.title_hindi||'').includes(t))
  }, [q, recipes])

  const chefIndex = useMemo(()=> pickChef(filtered), [filtered])

  return (
    <div className="container">
      <h1 className="title">Cook to Admire</h1>
      <p className="sub">Out-of-this-world Indian food gallery • 100 recipes • HD visuals • @cooktoadmire</p>
      <div className="toolbar">
        <input className="search" placeholder="Search Paneer, Biryani, Dosa..." value={q} onChange={e=>setQ(e.target.value)} />
        <button className="lang" onClick={()=>setLang(l => l==='en' ? 'hi' : 'en')}>{lang==='en' ? 'हिंदी' : 'English'}</button>
        <button className="theme" onClick={()=>setTheme(t=> t==='cosmic'?'lux':'cosmic')}>{theme==='cosmic'?'Switch to Luxury 🖤':'Switch to Cosmic 🌈'}</button>
      </div>

      <div className="grid">
        {filtered.map((r,idx)=> (
          <Card key={r.id||idx} recipe={r} lang={lang} chefPick={idx===chefIndex} theme={theme} />
        ))}
      </div>

      <div className="footer">© {new Date().getFullYear()} @cooktoadmire • Built for Instagram aesthetics</div>
    </div>
  )
}
