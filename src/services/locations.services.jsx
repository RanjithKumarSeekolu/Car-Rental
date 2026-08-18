import apiUrl from "../utils/Constants";

const FALLBACK = [
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", center: { lat: 17.385, lng: 78.4867 } },
  { id: "bangalore", name: "Bangalore", state: "Karnataka", center: { lat: 12.9716, lng: 77.5946 } },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", center: { lat: 13.0827, lng: 80.2707 } },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", center: { lat: 19.076, lng: 72.8777 } },
  { id: "delhi", name: "Delhi", state: "Delhi", center: { lat: 28.6139, lng: 77.209 } },
  { id: "pune", name: "Pune", state: "Maharashtra", center: { lat: 18.5204, lng: 73.8567 } },
];

function normalizeLocation(loc) {
  if (!loc) return null;
  if (typeof loc === "string") {
    const id = loc.toLowerCase().replace(/\s+/g, "-");
    return { id, name: loc, state: "", center: null };
  }
  const name = loc.name || loc.city || "";
  const id = loc.id || name.toLowerCase().replace(/\s+/g, "-");
  return {
    id,
    name,
    state: loc.state || "",
    country: loc.country || "IN",
    center: loc.center || null,
    bounds: loc.bounds || null,
  };
}

export const getLocations = async () => {
  try {
    const res = await fetch(`${apiUrl}api/locations`);
    if (!res.ok) throw new Error("locations failed");
    const data = await res.json();
    const list = data.locations || [];
    if (!Array.isArray(list) || !list.length) return FALLBACK;
    return list.map(normalizeLocation).filter(Boolean);
  } catch {
    return FALLBACK;
  }
};

export const searchLocations = async (q) => {
  try {
    const res = await fetch(`${apiUrl}api/locations/search?q=${encodeURIComponent(q || "")}`);
    if (!res.ok) throw new Error("search failed");
    const data = await res.json();
    return (data.locations || []).map(normalizeLocation).filter(Boolean);
  } catch {
    const term = String(q || "").toLowerCase();
    return FALLBACK.filter((l) => l.name.toLowerCase().includes(term));
  }
};
