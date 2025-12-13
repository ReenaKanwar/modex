import { createContext, useContext, useEffect, useState } from "react";
import { fetchShows } from "../api";

const ShowContext = createContext<any>(null);

export const ShowProvider = ({ children }: { children: React.ReactNode }) => {
  const [shows, setShows] = useState<any[]>([]);
  const [filteredShows, setFilteredShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // ✅ start with true

  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = async () => {
    try {
      setLoading(true);
      const data = await fetchShows();
      setShows(data);
      setFilteredShows(data);
    } catch (error) {
      console.error("Failed to load shows", error);
      setShows([]);
      setFilteredShows([]);
    } finally {
      setLoading(false); // ✅ always false
    }
  };

  // 🔍 redBus-style filter (date optional)
  const filterShows = (from: string, to: string, date?: string) => {
     console.log("Filtering with:", from, to, date);
    const result = shows.filter((s) => {
      const matchFrom = s.from
        ?.toLowerCase()
        .includes(from.toLowerCase());

      const matchTo = s.to
        ?.toLowerCase()
        .includes(to.toLowerCase());

      // date filter OPTIONAL (bug fix)
      const matchDate = date
        ? s.startTime?.includes(date)
        : true;

      return matchFrom && matchTo && matchDate;
    });

    setFilteredShows(result);
  };

  return (
    <ShowContext.Provider
      value={{
        shows: filteredShows,
        loading,
        filterShows,
      }}
    >
      {children}
    </ShowContext.Provider>
  );
};

export const useShows = () => useContext(ShowContext);
