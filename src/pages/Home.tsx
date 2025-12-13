import ShowCard from "../Components/ShowCard";
import { useShows } from "../Contexts/ShowContext";
import HeroSearch from "../Components/HeroSearch";
import OffersCarousel from "../Components/OffersCarousel";

export default function Home() {
  const { shows, loading } = useShows();

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      {/* HERO SECTION */}
      <HeroSearch />
      <OffersCarousel />

      {/* SHOW LIST */}
      <div className="shows">
        {shows.map((s: any) => (
          <ShowCard key={s.id} show={s} />
        ))}
      </div>
    </>
  );
}
