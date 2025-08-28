'use client'
import { useStore } from '../../lib/store'
import JSZip from 'jszip'

export default function Complete(){
  const { teams } = useStore()

  const downloadAll = async ()=>{
    const zip = new JSZip()
    const folder = zip.folder('logos')!
    for(const t of teams){
      const resp = await fetch(t.logoUrl)
      const blob = await resp.blob()
      const arrayBuff = await blob.arrayBuffer()
      const filename = `${t.name.replace(/[^a-z0-9]+/gi,'_').toLowerCase()}_logo.svg`
      folder.file(filename, arrayBuff)
    }
    const content = await zip.generateAsync({type:'blob'})
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = 'league_logos.zip'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">League Created 🎉</h1>
      <p className="opacity-80">Download your finalized logos, then head to Weekly Content.</p>
      <div className="flex gap-2">
        <button className="btn" onClick={downloadAll}>Download All Logos (ZIP)</button>
        <a className="btn" href="/content">Go to Weekly Content →</a>
      </div>
    </div>
  )
}
