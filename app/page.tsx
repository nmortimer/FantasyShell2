'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const [leagueId, setLeagueId] = useState('12345')
  const router = useRouter()

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Bring Your Fantasy League to Life</h1>
        <p className="mt-4 opacity-80">Funny team logos, custom designs, and weekly content. UI-first build — mock data now, integrations later.</p>
        <div className="mt-6 flex gap-2">
          <input
            value={leagueId}
            onChange={e=>setLeagueId(e.target.value)}
            placeholder="Enter Sleeper League ID"
            className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 w-64"
          />
          <button className="btn" onClick={()=>router.push(`/dashboard?leagueId=${leagueId}`)}>Load League</button>
        </div>
      </div>
      <div className="card">
        <div className="aspect-video rounded-xl bg-neutral-900 grid place-items-center border border-neutral-800">
          <span className="opacity-70">Preview screenshots will live here</span>
        </div>
      </div>
    </div>
  )
}
