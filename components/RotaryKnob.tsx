'use client'
import { useState, useEffect, useRef } from 'react'

const labels = ['v1','v2','v3'] as const
type StylePack = typeof labels[number]

export function RotaryKnob({ value, onChange }:{ value:StylePack, onChange:(v:StylePack)=>void }){
  const [idx, setIdx] = useState(labels.indexOf(value))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(()=> setIdx(labels.indexOf(value)), [value])

  const setIndex = (i:number)=>{
    const clamped = Math.max(0, Math.min(2, i))
    setIdx(clamped)
    onChange(labels[clamped])
  }

  const onKey = (e: React.KeyboardEvent)=>{
    if(e.key==='ArrowLeft') setIndex(idx-1)
    if(e.key==='ArrowRight') setIndex(idx+1)
  }

  const angle = [-60, 0, 60][idx]

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div
        role="slider"
        aria-valuemin={0}
        aria-valuemax={2}
        aria-valuenow={idx}
        tabIndex={0}
        onKeyDown={onKey}
        ref={ref}
        className="relative w-28 h-28 rounded-full bg-neutral-900 border border-neutral-700 shadow-glow grid place-items-center select-none"
      >
        <div className="absolute inset-2 rounded-full border border-neutral-700" />
        <div className="w-2 h-10 bg-neon rounded-sm origin-bottom"
             style={{ transform:`rotate(${angle}deg)`}} />
        <div className="absolute -bottom-6 flex gap-6 text-xs">
          {labels.map((l,i)=>(
            <button key={l} className={"px-2 py-1 rounded " + (i===idx?'bg-neon/20 border border-neon':'bg-neutral-800 border border-neutral-700')}
              onClick={()=>setIndex(i)}>{l}</button>
          ))}
        </div>
      </div>
      <div className="text-xs opacity-75">Style: {labels[idx]}</div>
    </div>
  )
}
