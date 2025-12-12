const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

async function handleResp(res: Response) {
  const text = await res.text()
  try { return JSON.parse(text) } catch { return text }
}

export async function fetchShows() {
  const res = await fetch(`${BASE_URL}/shows`)
  if (!res.ok) throw new Error('Failed to fetch shows')
  return handleResp(res)
}

export async function createShow(payload: any) {
  const res = await fetch(`${BASE_URL}/shows`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  if (!res.ok) throw new Error('Failed to create show')
  return handleResp(res)
}

export async function fetchShowById(id: string) {
  const res = await fetch(`${BASE_URL}/shows/${id}`)
  if (!res.ok) throw new Error('Failed to fetch show')
  return handleResp(res)
}

export async function bookSeats(showId: string, seats: number[]) {
  const res = await fetch(`${BASE_URL}/shows/${showId}/book`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ seats }) })
  if (!res.ok) throw new Error('Failed to book seats')
  return handleResp(res)
}