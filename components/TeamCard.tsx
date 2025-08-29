'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useStore, Team } from '../lib/store'
import clsx from 'clsx'

export function TeamCard({ team }: { team: Team }) {
  const { finalize, regenerate } = useStore()

  return (
    <div
      className={clsx(
        'relative flex flex-col items-center justify-between rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-[1.03]',
        'bg-gradient-to-b from-neutral-900 to-neutral-800',
        'border-4',
        team.status === 'final'
          ? 'border-gold'
          : `border-[${team.primary}]`
      )}
      style={{
        borderColor: team.primary, // dynamic team color border
      }}
    >
      {/* Finalized Badge */}
      {team.status === 'final' && (
        <div className="absolute top-2 right-2 bg-gold text-black text-xs font-bold px-2 py-1 rounded shadow-md animate-pulse">
          FINALIZED
        </div>
      )}

      {/* Logo */}
      <div className="w-full flex-1 flex items-center justify-center p-4">
        <div className="relative w-28 h-28 rounded-xl bg-neutral-950 border border-neutral-700 overflow-hidden shadow-inner">
          <Image
            src={team.logoUrl}
            alt={`${team.name} logo`}
            fill
            style={{ objectFit: 'contain', padding: '8px' }}
          />
        </div>
      </div>

      {/* Team Info */}
      <div className="text-center px-3 pb-2">
        <div className="font-extrabold text-lg tracking-wide">{team.name}</div>
        <div className="text-xs opacity-70">Mgr: {team.manager}</div>
      </div>

      {/* Footer Buttons */}
      <div className="w-full flex gap-1 border-t border-neutral-700 bg-neutral-900/70 text-sm">
        <Link
          href={`/team/${team.id}`}
          className="flex-1 py-2 text-center hover:bg-neutral-800 transition"
        >
          ✏️ Edit
        </Link>
        <button
          className="flex-1 py-2 hover:bg-neutral-800 transition"
          onClick={() => regenerate(team.id)}
        >
          🔄
        </button>
        <button
          className={clsx(
            'flex-1 py-2 font-bold transition',
            team.status === 'final'
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gold/20 text-gold'
          )}
          onClick={() => finalize(team.id)}
          disabled={team.status === 'final'}
        >
          ✅
        </button>
      </div>
    </div>
  )
}
