'use client'
import { create } from 'zustand'
import mock from '../data/mockLeague.json'

export type Team = {
  id: string
  name: string
  manager: string
  primary: string
  secondary: string
  stylePack: 'v1'|'v2'|'v3'
  status: 'draft'|'final'
  logoUrl: string
}

export type League = {
  id: string
  name: string
  season: number
}

type State = {
  league: League
  teams: Team[]
  finalized: number
  setTeams: (t: Team[]) => void
  finalize: (id: string) => void
  updateTeam: (id: string, patch: Partial<Team>) => void
  regenerate: (id: string) => void
}

const placeholders = ['/placeholders/logos/bandits.svg','/placeholders/logos/yeti.svg','/placeholders/logos/wizards.svg','/placeholders/logos/dragons.svg']

export const useStore = create<State>((set, get) => ({
  league: mock.league,
  teams: mock.teams as Team[],
  finalized: (mock.teams as Team[]).filter(t=>t.status==='final').length,
  setTeams: (t)=> set({ teams: t, finalized: t.filter(x=>x.status==='final').length }),
  finalize: (id)=> set(s=>{
    const teams = s.teams.map(t=> t.id===id ? {...t, status:'final'} : t)
    return { teams, finalized: teams.filter(x=>x.status==='final').length }
  }),
  updateTeam: (id, patch)=> set(s=>({ teams: s.teams.map(t=> t.id===id ? {...t, ...patch} : t) })),
  regenerate: (id)=> set(s=>{
    const idx = Math.floor(Math.random()*placeholders.length)
    return { teams: s.teams.map(t=> t.id===id ? {...t, logoUrl: placeholders[idx]} : t) }
  })
}))
