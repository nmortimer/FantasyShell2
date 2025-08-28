'use client'
import { useStore } from '../../lib/store'
import { PosterCard } from '../../components/PosterCard'
import { useState } from 'react'

export default function ContentPage(){
  const { league, teams } = useStore()
  const [tab, setTab] = useState<'matchups'|'recaps'|'pr'>('matchups')

  // make 6 mock pairings
  const pairs = []
  for(let i=0;i<teams.length;i+=2){
    if(teams[i+1]) pairs.push([teams[i], teams[i+1]])
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Weekly Content</h1>
      <div className="flex gap-2">
        <button onClick={()=>setTab('matchups')} className={'btn ' + (tab==='matchups'?'border-neon':'')}>Matchups</button>
        <button onClick={()=>setTab('recaps')} className={'btn ' + (tab==='recaps'?'border-neon':'')}>Recaps</button>
        <button onClick={()=>setTab('pr')} className={'btn ' + (tab==='pr'?'border-neon':'')}>Power Rankings</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {pairs.map(([home, away], idx)=>(
          <PosterCard key={idx} league={league.name} week={1} home={home} away={away} mode={tab} />
        ))}
      </div>
    </div>
  )
}
