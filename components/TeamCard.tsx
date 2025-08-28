'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useStore, Team } from '../lib/store'
import clsx from 'clsx'

export function TeamCard({ team }: { team: Team }) {
  const { finalize, regenerate } = useStore()

  return (
    <div className={clsx('card border border-neutral-800 hover:shadow-glow transition', team.status==='final' && 'border-gold')}>
      <div className="flex items-start gap-3">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
          <Image src={team.logoUrl} alt={`${team.name} logo`} fill style={{objectFit:'contain', padding:'8px'}} />
        </div>
        <div className="flex-1">
          <div className="font-bold">{team.name}</div>
          <div className="text-xs opacity-70">Manager: {team.manager}</div>
          <div className="mt-2 flex gap-2">
            <Link href={`/team/${team.id}`} className="btn">Edit</Link>
            <button className="btn" onClick={()=>regenerate(team.id)}>Regenerate</button>
            <button className="btn" disabled={team.status==='final'} onClick={()=>finalize(team.id)}>
              {team.status==='final' ? 'Finalized' : 'Finalize'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
