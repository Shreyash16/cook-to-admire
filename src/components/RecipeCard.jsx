import React, { useMemo, useState } from 'react'
import { Download } from 'lucide-react'

function buildImages(query){
  const q = encodeURIComponent(query + ',indian food')
  return [
    `https://source.unsplash.com/1200x900/?${q}`,
    `https://source.unsplash.com/1200x900/?${q},closeup`,
    `https://source.unsplash.com/1200x900/?${q},plating`
  ]
}

// Draw watermark on exported image
async function exportWithWatermark(imageUrl, caption){
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = imageUrl
  await new Promise(res => { img.onload = res })

  // Instagram square
  const size = 1080
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // cover-fit
  const ratio = Math.max(size / img.width, size / img.height)
  const newW = img.width * ratio
  const newH = img.height * ratio
  const dx = (size - newW) / 2
  const dy = (size - newH) / 2
  ctx.drawImage(img, dx, dy, newW, newH)

  // determine text color by sampling bottom-right
  const sample = ctx.getImageData(size-5, size-5, 1, 1).data
  const brightness = sample[0]*0.299 + sample[1]*0.587 + sample[2]*0.114
  ctx.fillStyle = brightness < 128 ? '#ffffff' : '#000000'

  // scale font relative to size
  const fontSize = Math.round(size * 0.033) // ~36px for 1080
  ctx.globalAlpha = 0.6
  ctx.font = `${fontSize}px "Brush Script MT", "Comic Sans MS", cursive`
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'
  ctx.fillText('@cooktoadmire', size-24, size-24)
  ctx.globalAlpha = 1

  // trigger download
  const link = document.createElement('a')
  link.download = 'cooktoadmire-post.jpg'
  link.href = canvas.toDataURL('image/jpeg', 0.92)
  link.click()
}

export default function RecipeCard({ recipe, lang }){
  const [i, setI] = useState(0)
  const imgs = useMemo(()=>buildImages(recipe.name), [recipe.name])

  const next = () => setI((i+1)%imgs.length)
  const prev = () => setI((i-1+imgs.length)%imgs.length)

  const caption = lang==='en' ? recipe.caption_en : recipe.caption_hi

  return (
    <div className="card">
      <div className="carousel">
        <img src={imgs[i]} alt={recipe.name} />
        {imgs.length>1 && <>
          <button className="nav left" onClick={prev} aria-label="Previous">‹</button>
          <button className="nav right" onClick={next} aria-label="Next">›</button>
        </>}
      </div>
      <h2>{recipe.name}</h2>
      <p className="muted">{recipe.region} · {recipe.category}</p>

      <div style={{padding:'0 16px'}}>
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((x,idx)=>(<li key={idx}>{x}</li>))}
        </ul>

        <h3>Steps</h3>
        <ol>
          {recipe.steps.map((x,idx)=>(<li key={idx}>{x}</li>))}
        </ol>
      </div>

      <div className="caption">{caption}</div>
      <div className="hash">{(recipe.hashtags||[]).slice(0,10).join(' ')}</div>

      <button className="btn" onClick={()=>exportWithWatermark(imgs[0], caption)}>
        <Download size={16} style={{verticalAlign:'text-bottom', marginRight:6}}/> Download Post
      </button>
    </div>
  )
}
