import React, { useEffect, useRef, useState } from 'react';
import { haversineKm, MAX_KM_FROM_CITY } from '../../utils/geo';

let leafletPromise;

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve, reject) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error('Could not load map'));
    document.body.appendChild(script);
  });
  return leafletPromise;
}

function pinIcon(L) {
  return L.divIcon({
    className: 'pickup-pin',
    iconSize: [36, 48],
    iconAnchor: [18, 46],
    html: `<span class="pickup-pin__dot"></span>
      <svg width="36" height="48" viewBox="0 0 36 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#FF5C1A" stroke="#0B1F3A" stroke-width="1.5" d="M18 1.8c-8.3 0-15 6.7-15 15 0 11.2 15 29.4 15 29.4S33 28 33 16.8c0-8.3-6.7-15-15-15z"/>
        <circle cx="18" cy="17" r="6" fill="#fff"/>
      </svg>`,
  });
}

async function geocodeInCity(address, city) {
  const q = [address, city?.name, city?.state, 'India'].filter(Boolean).join(', ');
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('Address lookup failed');
  const rows = await res.json();
  if (!rows?.[0]) throw new Error('Could not find that address');
  return { lat: Number(rows[0].lat), lng: Number(rows[0].lon) };
}

function getGps() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      reject,
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60_000 }
    );
  });
}

async function reverseAddress(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) return '';
  const data = await res.json();
  const a = data.address || {};
  const line = [a.house_number, a.road, a.suburb || a.neighbourhood || a.village, a.city || a.town || a.state_district]
    .filter(Boolean)
    .join(', ');
  return line || data.display_name || '';
}

const PickupMap = ({ city, lat, lng, address, onPin, onAddress }) => {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const onPinRef = useRef(onPin);
  const onAddressRef = useRef(onAddress);
  const [finding, setFinding] = useState(false);
  const [geoError, setGeoError] = useState('');
  onPinRef.current = onPin;
  onAddressRef.current = onAddress;

  useEffect(() => {
    if (!city?.center || !elRef.current) return undefined;
    let cancelled = false;

    loadLeaflet().then((L) => {
      if (cancelled || !elRef.current) return;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }

      const startLat = Number.isFinite(lat) ? lat : city.center.lat;
      const startLng = Number.isFinite(lng) ? lng : city.center.lng;
      const map = L.map(elRef.current, { zoomControl: true }).setView([startLat, startLng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const icon = pinIcon(L);
      const setMarker = (nextLat, nextLng, notify) => {
        const pos = [nextLat, nextLng];
        if (!markerRef.current) {
          markerRef.current = L.marker(pos, { icon, draggable: true, zIndexOffset: 1000 }).addTo(map);
          markerRef.current.on('dragend', () => {
            const p = markerRef.current.getLatLng();
            onPinRef.current?.({ lat: p.lat, lng: p.lng });
          });
        } else {
          markerRef.current.setLatLng(pos);
        }
        map.panTo(pos);
        if (notify) onPinRef.current?.({ lat: nextLat, lng: nextLng });
      };

      map.on('click', (e) => setMarker(e.latlng.lat, e.latlng.lng, true));
      mapRef.current = map;
      map.setMarker = setMarker;

      setMarker(startLat, startLng, !Number.isFinite(lat) || !Number.isFinite(lng));
      setTimeout(() => map.invalidateSize(), 80);

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        getGps()
          .then(async (gps) => {
            if (cancelled || !mapRef.current) return;
            const km = haversineKm(gps, { lat: city.center.lat, lng: city.center.lng });
            if (km > MAX_KM_FROM_CITY) {
              setGeoError(`GPS is outside ${city.name}. Pin stays in this city — drag it, or change city.`);
              return;
            }
            setGeoError('');
            setMarker(gps.lat, gps.lng, true);
            map.setView([gps.lat, gps.lng], 16);
            const line = await reverseAddress(gps.lat, gps.lng);
            if (!cancelled && line) onAddressRef.current?.(line);
          })
          .catch(() => {});
      }
    }).catch(() => {
      if (!cancelled) setGeoError('Map failed to load. Try refresh.');
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [city?.id]);

  useEffect(() => {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    mapRef.current?.setMarker?.(lat, lng, false);
  }, [lat, lng]);

  const findAddress = async () => {
    if (!address?.trim()) {
      setGeoError('Enter the pickup address first');
      return;
    }
    setFinding(true);
    setGeoError('');
    try {
      const pin = await geocodeInCity(address, city);
      if (mapRef.current?.setMarker) mapRef.current.setMarker(pin.lat, pin.lng, true);
      else onPin?.(pin);
    } catch (err) {
      setGeoError(err.message || 'Could not find that address');
    } finally {
      setFinding(false);
    }
  };

  if (!city?.center) {
    return (
      <p className="text-sm text-[var(--muted)]">Select a city to place the pickup pin.</p>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-[var(--muted)]">Pickup pin *</p>
        <button
          type="button"
          onClick={findAddress}
          disabled={finding}
          className="text-sm font-semibold text-[var(--accent)] hover:underline disabled:opacity-50"
        >
          {finding ? 'Finding…' : 'Place pin from address'}
        </button>
      </div>
      <div className="pickup-map relative isolate h-72 w-full overflow-hidden rounded-[var(--radius-sm)] border border-[var(--line)]">
        <div ref={elRef} className="absolute inset-0" />
      </div>
      <p className="text-xs text-[var(--muted)]">
        Allow location when asked — the pin defaults to where you are. Drag it if GPS is a little off.
        {Number.isFinite(lat) && Number.isFinite(lng) ? ` Pin: ${lat.toFixed(5)}, ${lng.toFixed(5)}` : ''}
      </p>
      {geoError && <p className="text-sm text-red-600">{geoError}</p>}
    </div>
  );
};

export default PickupMap;
