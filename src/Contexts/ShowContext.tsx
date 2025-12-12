import React, { createContext, useContext, useEffect, useState } from 'react'
import  type  { ShowType } from '../types'
import * as api from '../api'

type ShowCtx = { shows: ShowType[]; loading: boolean; error?: string; refresh: () => Promise<void>; addShow: (s: Partial<ShowType>) => Promise<void> }
const ShowContext = createContext<ShowCtx | undefined>(undefined)

export const ShowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<ShowType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|undefined>(undefined)

  async function refresh() {
    setLoading(true); setError(undefined)
    try {
      const data = await api.fetchShows()
      setShows(data)
    } catch (e: any) { setError(e.message || 'Unknown'); }
    setLoading(false)
  }

  useEffect(() => { refresh() }, [])

  async function addShow(s: Partial<ShowType>) {
    try {
      const created = await api.createShow(s)
      // push locally to avoid re-fetch all
      setShows(prev => [created, ...prev])
    } catch (e: any) { throw e }
  }

  return (
    <ShowContext.Provider value={{ shows, loading, error, refresh, addShow }}>
      {children}
    </ShowContext.Provider>
  )
}

export function useShows() { const c = useContext(ShowContext); if (!c) throw new Error('useShows must be used inside ShowProvider'); return c }