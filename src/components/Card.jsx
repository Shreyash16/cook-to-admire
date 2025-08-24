import React, { useState, useMemo } from 'react'

const proxy = (url)=> `https://images.weserv.nl/?url=${encodeURIComponent(url)}`
const buildAuto = (q, sig)=> proxy(`https://source.unsplash.com/1600x1200/?${encodeURIComponent(q)}&sig=${sig}`)
const buildPicsum = (seed)=> `https://picsum.photos/seed/${encodeURIComponent(seed)}/1080/1080`

function imagesFor(recipe){
  // Prefer curated CDN links if provided
  if (Array.isArray(recipe.images) && recipe.images.length) return recipe.images
  const q = `${recipe.title},indian food`
  // Fallback: reliable proxied Unsplash Source
  return [buildAuto(q,1), buildAuto(q,2), buildAuto(q,3)]
}

export default function Card({ recipe, lang, chefPick }){
  const [i, setI] = useState(0)
  const imgs = useMemo(()=> imagesFor(recipe), [recipe])
  const title = lang==='en'? recipe.title : (recipe.title_hindi || recipe.title)
  const capEn = recipe.caption_en || ''
  const capHi = recipe.caption_hi || ''

  const [errMap, setErrMap] = useState({})
  const shown = (idx)=> errMap[idx] ? buildPicsum(`${recipe.title}-${idx}`) : imgs[idx]
  const onErr = (idx)=> setErrMap(m=> ({...m, [idx]: true}))

  return (
    <div className="card">
      <div className="shot">
        <img src={shown(i)} onError={()=>onErr(i)} alt={recipe.title}/>
        <span className="wm">@cooktoadmire</span>
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
          <div className="bubble">{capEn}</div>
          <div className="bubble">{capHi}</div>
        </div>
        <div className="tags">
          {(recipe.tags||[]).slice(0,8).map((t,idx)=>(<span key={idx} className="tag">{t}</span>))}
        </div>
      </div>
    </div>
  )
}
