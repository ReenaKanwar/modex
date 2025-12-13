import { useParams } from "react-router-dom";
import { useState } from "react";
import SeatGrid from "../Components/SeatGrid";
import { bookSeats } from "../api";

export default function Booking() {
  const { id } = useParams();
  const [selected, setSelected] = useState<number[]>([]);
  const [status, setStatus] = useState("");

  const toggle = (seat: number) => {
    setSelected(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const confirm = async () => {
    setStatus("PENDING");
    try {
      await bookSeats(Number(id), selected);
      setStatus("CONFIRMED");
    } catch {
      setStatus("FAILED");
    }
  };

  return (
    <>
      <SeatGrid selected={selected} toggle={toggle} />
      <button onClick={confirm}>Confirm Booking</button>
      <p>Status: {status}</p>
    </>
  );
}
