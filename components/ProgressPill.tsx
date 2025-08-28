export function ProgressPill({ finalized, total }: { finalized: number, total: number }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs bg-neutral-800 border border-neutral-700">
      {finalized}/{total} Finalized
    </span>
  )
}
