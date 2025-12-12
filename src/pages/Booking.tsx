import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as api from '../api'
import SeatGrid from '../components/SeatGrid'

export default function Booking(){
  const { id } = useParams()
  const [show, setShow] = useState<any|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|undefined>()
  const [selected, setSelected] = useState<number[]>([])
  const [bookingStatus, setBookingStatus] = useState<string|undefined>()
  const [taken, setTaken] = useState<number[]>([]) // seats already booked

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    api.fetchShowById(id!)
      .then((data)=>{ if (!mounted) return; setShow(data); setTaken(data.takenSeats || []) })
      .catch((e:any)=>{ if (!mounted) return; setError(e.message || 'Failed'); })
      .finally(()=>{ if (mounted) setLoading(false) })

    // basic polling for live seats every 8s (bonus)
    const t = setInterval(()=>{ api.fetchShowById(id!).then(d=>{ setTaken(d.takenSeats || []) }).catch(()=>{}) }, 8000)

    return ()=>{ mounted=false; clearInterval(t) }
  }, [id])

  async function handleBook(){
    setBookingStatus('PENDING')
    try {
      const res = await api.bookSeats(id!, selected)
      if (res.status === 'CONFIRMED'){
        setBookingStatus('CONFIRMED')
        // update taken locally
        setTaken(prev => [...prev, ...selected])
        setSelected([])
      } else {
        setBookingStatus('FAILED')
      }
    } catch (e:any){ setBookingStatus('FAILED'); setError(e.message || 'Booking failed') }
  }

  if (loading) return <div className="container"><div className="card loading">Loading booking details...</div></div>
  if (error) return <div className="container"><div className="card error">{error}</div></div>
  if (!show) return <div className="container"><div className="card">No show</div></div>

  return (
    <div className="container">
      <h1>Booking — {show.name}</h1>
      <div className="card">
        <div className="small">Starts: {new Date(show.startTime).toLocaleString()}</div>
        {show.type !== 'doctor' ? (
          <div style={{display:'flex', gap:16}}>
            <div style={{flex:1}}>
              <h4>Select Seats</h4>
              <SeatGrid totalSeats={show.totalSeats || 40} takenSeats={taken} onChange={setSelected} />
            </div>
            <div style={{width:260}}>
              <div className="card small">
                <div>Selected seats: {selected.length === 0 ? 'None' : selected.join(', ')}</div>
                <div style={{marginTop:12}}>
                  <button className="btn btn-primary" disabled={selected.length===0} onClick={handleBook}>Book</button>
                </div>
                {bookingStatus && <div style={{marginTop:8}}>Status: <strong>{bookingStatus}</strong></div>}
                {error && <div className="error">{error}</div>}
              </div>
            </div>
          </div>
        ) : (
          <div className="card">This is a doctor appointment slot — booking handled differently (no seats).</div>
        )}
      </div>
    </div>
  )
}