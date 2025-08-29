'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, MouseEvent } from 'react'
import clsx from 'clsx'
import { useStore, Team } from '../lib/store'

export function TeamCard({ team }: { team: Team }) {
  const { finalize, regenerate } = useStore()
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const innerRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent) => {
    if (!innerRef.current) return
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width - 0.5
    const py = y / rect.height - 0.5
    // gentle tilt
    setTilt({ rx: -(py * 8), ry: px * 10 })
  }

  const onLeave = () => setTilt({ rx: 0, ry: 0 })

  // dynamic accent colors for foil + glow
  const styleVars = {
    // fallback if someone saved invalid color
    ['--accent' as any]: team.primary || '#00E0FF',
    ['--accent2' as any]: team.secondary || '#9B30FF',
  }

  return (
    <div
      className={clsx(
        'group relative rounded-3xl p-[2px]',
        'foil-frame',                     // custom foil border (see CSS below)
        team.status === 'final' ? 'foil-gold' : 'foil-accent'
      )}
      style={styleVars}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Holo shimmer overlay (subtle, stronger when finalized) */}
      <div
        className={clsx(
          'pointer-events-none absolute inset-0 rounded-3xl overflow-hidden',
          'holo-shine',
          team.status === 'final' ? 'opacity-40' : 'opacity-20',
          'group-hover:opacity-40'
        )}
      />

      {/* Card body */}
      <div
        ref={innerRef}
        className={clsx(
          'relative rounded-[22px] bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a]',
          'shadow-[0_10px_40px_rgba(0,0,0,0.35)]',
          'transition-transform will-change-transform',
          'border border-neutral-800/70 overflow-hidden'
        )}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {/* Finalized badge */}
        {team.status === 'final' && (
          <div className="absolute right-3 top-3 z-10">
            <div className="psa-badge">FINALIZED</div>
          </div>
        )}

        {/* card glow on hover */}
        <div className="absolute inset-0 rounded-[22px] ring-0 group-hover:ring-2 ring-[var(--accent)]/60 transition" />

        {/* Top section — logo hero */}
        <div className="relative pt-6 px-6">
          {/* subtle radial highlight */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)]" />
          <div className="mx-auto w-32 h-32 rounded-2xl bg-black/60 border border-neutral-700 overflow-hidden shadow-inner">
            <Image
              src={team.logoUrl}
              alt={`${team.name} logo`}
              width={128}
              height={128}
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>

        {/* Middle — team name + manager */}
        <div className="px-6 text-center mt-3">
          <div className="text-lg font-extrabold tracking-wide leading-tight">
            {team.name}
          </div>
          <div className="text-[11px] uppercase tracking-wider text-neutral-400 mt-1">
            Manager: {team.manager}
          </div>
        </div>

        {/* Style chip */}
        <div className="mt-3 flex justify-center">
          <span className="style-chip">
            {team.stylePack === 'v1' ? 'Mascot Badge' : team.stylePack === 'v2' ? 'Minimal Crest' : 'Retro Foil'}
          </span>
        </div>

        {/* Divider with neon nodes */}
        <div className="relative mt-4 mx-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />
          <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-[var(--accent)]/70 blur-[1px]" />
          <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[var(--accent)]/70 blur-[1px]" />
        </div>

        {/* Footer actions */}
        <div className="mt-3 grid grid-cols-3 text-sm">
          <Link
            href={`/team/${team.id}`}
            className="card-btn-l"
            aria-label={`Edit ${team.name}`}
            title="Edit"
          >
            <PencilIcon />
            <span className="hidden sm:inline">Edit</span>
          </Link>
          <button
            className="card-btn-m"
            onClick={() => regenerate(team.id)}
            aria-label={`Regenerate logo for ${team.name}`}
            title="Regenerate"
          >
            <ShuffleIcon />
            <span className="hidden sm:inline">Regenerate</span>
          </button>
          <button
            className={clsx(
              'card-btn-r',
              team.status === 'final'
                ? 'opacity-40 cursor-not-allowed'
                : 'text-gold hover:bg-gold/10'
            )}
            onClick={() => finalize(team.id)}
            disabled={team.status === 'final'}
            aria-label={`Finalize ${team.name}`}
            title="Finalize"
          >
            <CheckIcon />
            <span className="hidden sm:inline">
              {team.status === 'final' ? 'Finalized' : 'Finalize'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* === Inline icons (lucide-style, no extra deps) === */
function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...props} className="inline-block mr-1">
      <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"/>
    </svg>
  )
}
function ShuffleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...props} className="inline-block mr-1">
      <path fill="currentColor" d="M14.59 7.41L16 6l4 4l-4 4l-1.41-1.41L16.17 12l-1.58-1.59zM2 6h6v2H4v4H2zm0 10h6v2H2zM9 9h2.59l1.7 1.7l-1.41 1.41z"/>
    </svg>
  )
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...props} className="inline-block mr-1">
      <path fill="currentColor" d="M9 16.17L4.83 12L3.41 13.41L9 19l12-12l-1.41-1.41z"/>
    </svg>
  )
}
