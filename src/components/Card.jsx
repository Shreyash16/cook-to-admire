import React, { useState } from 'react'

function Watermark({color='white'}){
  return <span className="wm" style={{color, filter:'drop-shadow(0 2px 6px #0008)'}}>@cooktoadmire</span>
}

export default function Card({ recipe, lang, chefPick, theme }){
  const [i, setI] = useState(0)
  const imgs = recipe.images || []
  const title = lang==='en' ? recipe.title : (recipe.title_hindi || recipe.title)
  const caption = lang==='en' ? (recipe.caption_en || '') : (recipe.caption_hi || '')

  const neon = theme==='lux' ? '0 0 24px #f59e0b' : '0 0 24px #a78bfa'

  return (
    <div className="card">
      <div className="shot">
        {!!imgs.length && <img src={imgs[i]} alt={recipe.title} />}
        <div className="neon" style={{boxShadow:neon}} />
        <Watermark color="white" />
        {imgs.length>1 && <>
          <button className="navbtn left" onClick={()=>setI((i-1+imgs.length)%imgs.length)}>‹</button>
          <button className="navbtn right" onClick={()=>setI((i+1)%imgs.length)}>›</button>
        </>}
        {chefPick && <span className="badge">✨ Chef’s Pick</span>}
      </div>
      <div className="content">
        <h3>{title}</h3>
        <div className="meta">{recipe.region} • {recipe.category}</div>
        <div className="caps">
          <div className="bubble">{recipe.caption_en}</div>
          <div className="bubble">{recipe.caption_hi}</div>
        </div>
        <div className="tags">
          {(recipe.tags||[]).slice(0,8).map((t,idx)=>(<span key={idx} className="tag">{t}</span>))}
        </div>
      </div>
    </div>
  )
}
