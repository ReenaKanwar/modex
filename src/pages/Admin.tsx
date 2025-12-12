import React, { useState } from 'react'
import { useShows } from '../contexts/ShowContext'
import { useAuth } from '../contexts/AuthContext'

export default function Admin(){
  const { user } = useAuth()
  const { shows, addShow } = useShows()
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [totalSeats, setTotalSeats] = useState<number | ''>(40)
  const [type, setType] = useState<'bus'|'show'|'doctor'>('bus')
  const [error, setError] = useState<string|undefined>()
  const [loading, setLoading] = useState(false)

  if (user?.role !== 'admin') return <div className="container"><div className="card">You must be admin to access this page. Toggle role in header to switch.</div></div>

  async function handleCreate(e: React.FormEvent){
    e.preventDefault(); setError(undefined)
    if (!name.trim()) return setError('Name required')
    if (!startTime) return setError('Start time required')
    if (type !== 'doctor' && (totalSeats === '' || totalSeats <= 0)) return setError('Total seats required for non-doctor')
    setLoading(true)
    try {
      await addShow({ name, startTime: new Date(startTime).toISOString(), totalSeats: type==='doctor' ? undefined : Number(totalSeats), type })
      setName(''); setStartTime(''); setTotalSeats(40)
    } catch (e:any) { setError(e.message || 'Failed') }
    setLoading(false)
  }

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="card">
        <h3>Create Show / Trip</h3>
        <form onSubmit={handleCreate} style={{display:'grid', gap:8}}>
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input type="datetime-local" value={startTime} onChange={e=>setStartTime(e.target.value)} />
          <select value={type} onChange={e=>setType(e.target.value as any)}>
            <option value="bus">Bus</option>
            <option value="show">Show</option>
            <option value="doctor">Doctor Appointment</option>
          </select>
          {type !== 'doctor' && <input type="number" value={totalSeats as any} onChange={e=>setTotalSeats(Number(e.target.value))} placeholder="Total Seats" />}
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-primary" disabled={loading} type="submit">{loading ? 'Creating...' : 'Create'}</button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </div>

      <div style={{marginTop:12}}>
        <h3>All Shows / Trips</h3>
        <div className="grid grid-3">
          {shows.map(s => (
            <div key={s.id} className="card">
              <div><strong>{s.name}</strong></div>
              <div className="small">{new Date(s.startTime).toLocaleString()}</div>
              <div className="small">Type: {s.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}