import { useRef } from "react";
import "./OffersCarousel.css";

const offers = [
  {
    tag: "Bus",
    title: "Save up to Rs 300 on bus tickets",
    valid: "Valid till 03 Jan",
    code: "FESTIVE300",
    img: "https://i.imgur.com/8ZQZQZB.png",
  },
  {
    tag: "Bus",
    title: "Save up to Rs 300 on Bus tickets",
    valid: "Valid till 31 Dec",
    code: "SHAADI300",
    img: "https://i.imgur.com/XR4JqZC.png",
  },
  {
    tag: "Bus",
    title: "Save up to Rs 500 on bus tickets",
    valid: "Valid till 31 Dec",
    code: "RED500",
    img: "https://i.imgur.com/1N9Z1ZJ.png",
  },
  {
    tag: "Bus",
    title: "Save up to Rs 250 on bus tickets",
    valid: "Valid till 31 Dec",
    code: "FIRST",
    img: "https://i.imgur.com/6cQhQqE.png",
  },
];

export default function OffersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="offers-section">
      <div className="offers-header">
        <h2>Offers for you</h2>
        <span className="view-more">View more</span>
      </div>

      <div className="offers-tabs">
        <button className="active">All</button>
        <button>Bus</button>
        <button>Train</button>
      </div>

      <div className="carousel-wrapper">
        <button className="nav left" onClick={() => scroll("left")}>
          ‹
        </button>

        <div className="carousel" ref={scrollRef}>
          {offers.map((offer, i) => (
            <div className="offer-card" key={i}>
              <span className="tag">{offer.tag}</span>
              <h3>{offer.title}</h3>
              <p>{offer.valid}</p>
              <div className="code">{offer.code}</div>
              <img src={offer.img} alt="offer" />
            </div>
          ))}
        </div>

        <button className="nav right" onClick={() => scroll("right")}>
          ›
        </button>
      </div>
    </section>
  );
}
