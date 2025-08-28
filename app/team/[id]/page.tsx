'use client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useStore } from '../../../lib/store'
import { ColorPicker } from '../../../components/ColorPicker'
import { RotaryKnob } from '../../../components/RotaryKnob'
import { useState, useEffect } from 'react'

export default function TeamEditor(){
  const params = useParams<{id:string}>()
  const router = useRouter()
  const { teams, updateTeam, finalize, regenerate } = useStore()
  const team = teams.find(t=>t.id===params.id)
  const [dirty, setDirty] = useState(false)

  useEffect(()=>{ setDirty(false) }, [params.id])

  if(!team) return <div>Team not found.</div>

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card border border-neutral-800">
        <div className="relative w-full aspect-square bg-neutral-900 border border-neutral-800 rounded-xl">
          <Image src={team.logoUrl} alt={team.name} fill style={{objectFit:'contain', padding:'16px'}} />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{team.name}</h1>
        <RotaryKnob value={team.stylePack} onChange={(v)=>{ updateTeam(team.id,{stylePack:v}); setDirty(true) }} />
        <ColorPicker label="Primary" value={team.primary} onChange={(v)=>{ updateTeam(team.id,{primary:v}); setDirty(true) }} />
        <ColorPicker label="Secondary" value={team.secondary} onChange={(v)=>{ updateTeam(team.id,{secondary:v}); setDirty(true) }} />

        <div className="flex gap-2 pt-2">
          <button className="btn" onClick={()=>{ regenerate(team.id); setDirty(true) }}>Regenerate</button>
          <button className="btn" disabled={!dirty} onClick={()=>setDirty(false)}>Save Draft</button>
          <button className="btn" onClick={()=>{ finalize(team.id); router.push('/dashboard') }} disabled={team.status==='final'}>
            {team.status==='final' ? 'Finalized' : 'Finalize'}
          </button>
        </div>
      </div>
    </div>
  )
}
