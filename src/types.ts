export interface Show {
  id: number;
  name: string;
  from: string;
  to: string;
  time: string;
  totalSeats: number;
  bookedSeats: number[];
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "FAILED";
