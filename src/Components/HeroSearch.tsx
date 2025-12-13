import { useState } from "react";
import { useShows } from "../Contexts/ShowContext";
import "./HeroSearch.css";

export default function HeroSearch() {
  const { filterShows } = useShows();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    console.log("Search clicked", { from, to, date });
    if (!from || !to) {
      alert("Please enter From and To");
      return;
    }

    // date abhi ignore (bug fix ke liye)
    filterShows(from, to);
  };

  return (
    <div className="hero">
      <div className="hero-overlay">
        <h1>
          India's No. 1 online <br /> bus ticket booking site
        </h1>

        <div className="search-box">
          <input
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={handleSearch}>Search buses</button>
        </div>
      </div>
    </div>
  );
}
