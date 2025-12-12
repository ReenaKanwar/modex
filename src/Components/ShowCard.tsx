import React from 'react'
import { ShowType } from '../types'
import { Link } from 'react-router-dom'

export default function ShowCard({ s }: { s: ShowType }){
  return (
    <div className="card">
      <h3>{s.name}</h3>
      <div className="small">Starts: {new Date(s.startTime).toLocaleString()}</div>
      <div className="small">Type: {s.type}</div>
      {s.totalSeats !== undefined && <div className="small">Seats: {s.totalSeats}</div>}
      <div style={{marginTop:12}}>
        <Link to={`/booking/${s.id}`} className="btn btn-primary small">Open Booking</Link>
      </div>
    </div>
  )
}
