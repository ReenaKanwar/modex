import React, { useEffect, useRef, useState } from 'react'

export default function SeatGrid({ totalSeats=40, takenSeats = [], onChange }:{ totalSeats?: number; takenSeats?: number[]; onChange?: (sel:number[])=>void }){
  // We'll use direct DOM updates for visual selection as requested
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    // cleanup when unmount
    return () => setSelected([])
  }, [])

  useEffect(() => { if (onChange) onChange(selected) }, [selected])

  function isTaken(i:number){ return takenSeats.includes(i) }
  function toggleSeat(i:number, el?:HTMLElement){
    if (isTaken(i)) return
    setSelected(prev => prev.includes(i) ? prev.filter(x=>x!==i) : [...prev, i])
    // direct DOM manipulation for animation/class toggles
    if (el) el.classList.toggle('selected')
  }

  return (
    <div ref={containerRef} style={{display:'flex', flexDirection:'column', gap:8}}>
      {Array.from({length: Math.ceil(totalSeats/8)}).map((_, rowIdx)=> (
        <div key={rowIdx} style={{display:'flex'}}>
          {Array.from({length:8}).map((__, colIdx)=>{
            const idx = rowIdx*8 + colIdx + 1
            if (idx > totalSeats) return null
            const taken = isTaken(idx)
            return (
              <div
                key={idx}
                className={`seat ${taken ? 'taken' : 'available'} ${selected.includes(idx) ? 'selected' : ''}`}
                onClick={(e)=>{ toggleSeat(idx, e.currentTarget) }}
                title={`Seat ${idx}`}
                role="button"
                aria-pressed={selected.includes(idx)}
              >{idx}</div>
            )
          })}
        </div>
      ))}
    </div>
  )
}