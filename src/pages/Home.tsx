// import React from 'react'
import { useShows } from '../contexts/ShowContext'
import ShowCard from '../Components/ShowCard'

export default function Home(){
  const { shows, loading, error, refresh } = useShows()

  return (
    <div className="container">
      <h1>Available Shows / Trips</h1>
      <div style={{marginBottom:12}}>
        <button className="btn btn-ghost small" onClick={refresh}>Refresh</button>
      </div>
      {loading && <div className="card loading">Loading shows...</div>}
      {error && <div className="card error">{error}</div>}
      <div className="grid grid-3">
        {shows.length === 0 && !loading ? <div className="card">No shows found</div> : shows.map(s => <ShowCard key={s.id} s={s} />)}
      </div>
    </div>
  )
}
