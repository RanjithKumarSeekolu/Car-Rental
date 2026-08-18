import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocations } from "../../../services/locations.services";

const BookingForm = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const [locations, setLocations] = useState([]);
  const [cityId, setCityId] = useState("");
  const [dropoffId, setDropoffId] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    getLocations().then(setLocations).catch(() => setLocations([]));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const selected = locations.find((l) => l.id === cityId);
    const params = new URLSearchParams();
    if (cityId) params.set("cityId", cityId);
    if (selected?.name) params.set("city", selected.name);
    if (dropoffId) params.set("dropoff", dropoffId);
    if (startDate) params.set("from", startDate);
    if (endDate) params.set("to", endDate);
    navigate(`/allCars?${params.toString()}`);
  };

  const field =
    "w-full bg-transparent text-[var(--ink)] outline-none text-[15px] font-medium";

  return (
    <div className="relative z-30 px-5 md:px-8 -mt-14 md:-mt-16 mb-12">
      <form
        onSubmit={handleSearch}
        className="max-w-7xl mx-auto bg-[var(--surface)] rounded-[var(--radius)] shadow-[var(--shadow-lg)] border border-[var(--line)] p-3 md:p-4 grid grid-cols-1 md:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto] gap-2 md:gap-0 md:divide-x md:divide-[var(--line)] items-stretch"
      >
        <label className="flex flex-col justify-center px-3 md:px-5 py-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
            Location
          </span>
          <select
            className={field}
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a location
            </option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
                {loc.state ? `, ${loc.state}` : ""}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col justify-center px-3 md:px-5 py-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
            Drop-off
          </span>
          <select
            className={field}
            value={dropoffId}
            onChange={(e) => setDropoffId(e.target.value)}
          >
            <option value="">Same city</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col justify-center px-3 md:px-5 py-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
            Pick-up date
          </span>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
            className={field}
          />
        </label>

        <label className="flex flex-col justify-center px-3 md:px-5 py-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
            Return date
          </span>
          <input
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={(e) => setEndDate(e.target.value)}
            className={field}
          />
        </label>

        <div className="flex items-center md:pl-4">
          <button
            type="submit"
            className="btn-accent w-full md:w-auto px-8 py-3.5 rounded-[var(--radius-sm)] font-bold tracking-wide transition shadow-md shadow-orange-500/25"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
