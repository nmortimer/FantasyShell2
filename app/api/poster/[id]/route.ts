import { NextResponse } from 'next/server'
export async function GET(_: Request, { params }: { params: { id: string }}) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1080' height='1080'><rect width='100%' height='100%' fill='#222'/><text x='540' y='540' fill='#fff' font-size='48' dominant-baseline='middle' text-anchor='middle'>Poster ${params.id}</text></svg>`
  return new NextResponse(svg, { headers: { 'Content-Type': 'image/svg+xml' } })
}
