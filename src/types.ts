export type ID = string

export type ShowType = {
  id: ID
  name: string
  startTime: string // ISO string
  totalSeats?: number // undefined for doctor (not applicable)
  type: 'bus' | 'show' | 'doctor'
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'

export type Booking = {
  id: ID
  showId: ID
  seats: number[]
  status: BookingStatus
}