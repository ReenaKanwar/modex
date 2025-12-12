import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Booking from './pages/Booking'

export default function App(){
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
    </div>
  )
}