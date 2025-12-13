import type { Show } from "./types";

const API_BASE = "http://localhost:4000";

export const fetchShows = async (): Promise<Show[]> => {
  const res = await fetch(`${API_BASE}/shows`);
  if (!res.ok) throw new Error("Failed to load shows");
  return res.json();
};

export const createShow = async (data: any) => {
  const res = await fetch(`${API_BASE}/shows`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Create failed");
};

export const bookSeats = async (showId: number, seats: number[]) => {
  const res = await fetch(`${API_BASE}/booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ showId, seats }),
  });
  if (!res.ok) throw new Error("Booking failed");
  return res.json();
};
