export default function SeatGrid({ selected, toggle }: any) {
  return (
    <div className="seat-grid">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className={selected.includes(i) ? "seat selected" : "seat"}
          onClick={() => toggle(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
