'use client'
import { Team, League } from '../lib/store'

function buildSVG(league:string, week:number, home:Team, away:Team, mode:'matchups'|'recaps'|'pr'){
  const title = mode==='matchups' ? `WEEK ${week} SHOWDOWN` : mode==='recaps' ? `FINAL SCORE` : `POWER RANKINGS`
  const scoreLeft = mode==='recaps' ? 142 : ''
  const scoreRight = mode==='recaps' ? 85 : ''
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0%" stop-color="${home.primary}"/>
      <stop offset="100%" stop-color="${away.primary}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="20" y="20" width="1040" height="1040" fill="none" stroke="#FFD700" stroke-width="20" rx="30"/>
  <text x="540" y="120" fill="#FAFAFA" font-size="72" font-family="Bebas Neue, Oswald, Arial" text-anchor="middle">${title}</text>
  <text x="540" y="190" fill="#FAFAFA" font-size="28" text-anchor="middle">${league}</text>
  <text x="150" y="600" fill="#FAFAFA" font-size="56" text-anchor="middle">${home.name}</text>
  <text x="930" y="600" fill="#FAFAFA" font-size="56" text-anchor="middle">${away.name}</text>
  ${mode==='recaps' ? `<text x="360" y="700" fill="#FAFAFA" font-size="80" text-anchor="middle">${scoreLeft}</text>
  <text x="720" y="700" fill="#FAFAFA" font-size="80" text-anchor="middle">${scoreRight}</text>`:''}
</svg>`
}

export function PosterCard({ league, week, home, away, mode }:{ league:string, week:number, home:Team, away:Team, mode:'matchups'|'recaps'|'pr' }) {
  const svg = buildSVG(league, week, home, away, mode)
  const blob = new Blob([svg], {type:'image/svg+xml'})
  const url = URL.createObjectURL(blob)

  const downloadPNG = async ()=>{
    const img = new Image()
    img.src = url
    await new Promise(res=>{ img.onload = res })
    const canvas = document.createElement('canvas')
    canvas.width = 1080; canvas.height = 1080
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    const png = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = png
    a.download = `${home.name}_vs_${away.name}.png`.replace(/[^a-z0-9_\.-]+/gi,'_')
    a.click()
  }

  return (
    <div className="card border border-neutral-800">
      <div className="aspect-square bg-neutral-900 rounded-xl overflow-hidden">
        <img src={url} alt="poster" className="w-full h-full object-cover" />
      </div>
      <div className="mt-2 flex gap-2">
        <button className="btn" onClick={downloadPNG}>Download PNG</button>
        <a className="btn" href={url} target="_blank" rel="noreferrer">Open SVG</a>
      </div>
    </div>
  )
}
