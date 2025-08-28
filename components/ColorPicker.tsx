'use client'

export function ColorPicker({ label, value, onChange }: { label: string, value: string, onChange: (v:string)=>void }) {
  return (
    <label className="text-sm flex items-center gap-2">
      <span className="w-28 opacity-75">{label}</span>
      <input type="color" value={value} onChange={e=>onChange(e.target.value)}
        className="h-10 w-16 bg-neutral-900 border border-neutral-700 rounded" />
      <input value={value} onChange={e=>onChange(e.target.value)} className="px-2 py-1 text-xs bg-neutral-900 border border-neutral-700 rounded w-28" />
    </label>
  )
}
