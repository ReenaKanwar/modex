// import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Header(){
  const { user, setRole } = useAuth()
  return (
    <header className="header">
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <Link to="/" style={{textDecoration:'none'}}><h2>Ticket-Book</h2></Link>
        <nav style={{display:'flex', gap:8}}>
          <Link to="/" className="small">Shows</Link>
          <Link to="/admin" className="small">Admin</Link>
        </nav>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:8}}>
        <div className="small">Role: <strong>{user?.role}</strong></div>
        <button className="btn btn-ghost small" onClick={() => setRole(user?.role === 'admin' ? 'user' : 'admin')}>Toggle Role</button>
      </div>
    </header>
  )
}