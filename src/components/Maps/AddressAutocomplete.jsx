import React, { useEffect, useRef, useState } from 'react';

function labelOf(props = {}) {
  return [
    [props.housenumber, props.street || props.name].filter(Boolean).join(' '),
    props.district || props.locality || props.suburb,
    props.city || props.town || props.county,
    props.state,
  ]
    .filter(Boolean)
    .filter((part, i, arr) => arr.indexOf(part) === i)
    .join(', ');
}

async function searchAddresses(query, city, signal) {
  const params = new URLSearchParams({
    q: `${query}${city?.name ? `, ${city.name}` : ''}`,
    limit: '7',
    lang: 'en',
  });
  if (city?.center) {
    params.set('lat', String(city.center.lat));
    params.set('lon', String(city.center.lng));
  }

  const res = await fetch(`https://photon.komoot.io/api/?${params}`, { signal });
  if (!res.ok) throw new Error('Address search failed');
  const data = await res.json();
  return (data.features || [])
    .map((f) => {
      const [lng, lat] = f.geometry?.coordinates || [];
      const props = f.properties || {};
      if (props.countrycode && props.countrycode !== 'IN') return null;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      const label = labelOf(props);
      if (!label) return null;
      return { label, lat, lng };
    })
    .filter(Boolean);
}

const AddressAutocomplete = ({ city, value, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef(null);
  const seq = useRef(0);

  useEffect(() => {
    const q = value.trim();
    if (q.length < 3 || !city?.center) {
      setHits([]);
      setLoading(false);
      return undefined;
    }

    const id = ++seq.current;
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const rows = await searchAddresses(q, city, ctrl.signal);
        if (id === seq.current) setHits(rows);
      } catch (err) {
        if (err.name !== 'AbortError' && id === seq.current) setHits([]);
      } finally {
        if (id === seq.current) setLoading(false);
      }
    }, 280);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [value, city?.id]);

  useEffect(() => {
    const close = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const pick = (hit) => {
    onChange({ address: hit.label, lat: hit.lat, lng: hit.lng });
    setOpen(false);
    setHits([]);
  };

  return (
    <div ref={wrapRef} className="relative flex flex-col gap-1 w-full">
      <label className="text-sm font-medium leading-5 text-start text-[var(--muted)]" htmlFor="pickup-address">
        Pickup address *
      </label>
      <input
        id="pickup-address"
        autoComplete="off"
        disabled={disabled || !city}
        value={value}
        placeholder={city ? 'Start typing street, area, landmark…' : 'Select a city first'}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange({ address: e.target.value });
          setOpen(true);
        }}
        className="w-full h-11 px-4 py-0 border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] text-base leading-none rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all placeholder:text-[var(--muted)]/60 disabled:bg-[var(--bg)] disabled:text-[var(--muted)] disabled:cursor-not-allowed"
      />
      {open && value.trim().length >= 3 && city && (
        <ul className="absolute top-full left-0 right-0 z-30 mt-1 max-h-60 overflow-auto rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
          {loading && !hits.length && (
            <li className="px-4 py-3 text-sm text-[var(--muted)]">Searching…</li>
          )}
          {!loading && !hits.length && (
            <li className="px-4 py-3 text-sm text-[var(--muted)]">No matches. Try a nearby landmark.</li>
          )}
          {hits.map((hit) => (
            <li key={`${hit.lat},${hit.lng},${hit.label}`}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(hit)}
                className="w-full text-left px-4 py-2.5 text-sm text-[var(--ink)] hover:bg-[var(--bg)]"
              >
                {hit.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
