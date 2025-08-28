'use client'
import Link from 'next/link'
import { useStore } from '../../lib/store'
import { ProgressPill } from '../../components/ProgressPill'
import { TeamCard } from '../../components/TeamCard'

export default function Dashboard() {
  const { teams, finalized } = useStore()
  const total = teams.length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">League Dashboard</h1>
        <ProgressPill finalized={finalized} total={total} />
      </div>
      <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-900/40">
        <p className="text-sm opacity-80">Finalize all logos to unlock Weekly Content.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
      {finalized === total && (
        <div className="mt-4">
          <Link href="/complete" className="btn shadow-glow">All set → Continue</Link>
        </div>
      )}
    </div>
  )
}
