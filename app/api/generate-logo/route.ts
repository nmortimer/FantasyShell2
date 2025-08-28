import { NextResponse } from 'next/server'

const pool = ['/placeholders/logos/bandits.svg','/placeholders/logos/yeti.svg','/placeholders/logos/wizards.svg','/placeholders/logos/dragons.svg']

export async function POST() {
  const url = pool[Math.floor(Math.random()*pool.length)]
  return NextResponse.json({ url })
}
