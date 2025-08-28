import { NextResponse } from 'next/server'
import mock from '../../../data/mockLeague.json'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') || '12345'
  // ignore id for now; return mock
  return NextResponse.json(mock)
}
