import type { Show } from "../types";
import { useNavigate } from "react-router-dom";

export default function ShowCard({ show }: { show: Show }) {
  const navigate = useNavigate();

  return (
    <div className="show-card" onClick={() => navigate(`/booking/${show.id}`)}>
      <h3>{show.name}</h3>
      <p>{show.from} → {show.to}</p>
      <p>Time: {show.time}</p>
    </div>
  );
}
