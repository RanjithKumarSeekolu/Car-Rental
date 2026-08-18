import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/ui/Loader';
import useCarStore from '../../../store/useCarStore';
import { formatPrice } from '../../../utils/format';

const isListed = (car) => car.isActive !== false && car.available !== false;

const DashboardListings = () => {
  const { getHostCars, toggleListingStatus } = useCarStore();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const cars = await getHostCars();
        setListings(cars);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [getHostCars]);

  const handleToggle = async (car) => {
    const next = !isListed(car);
    setSavingId(car.id);
    setError('');
    setListings((prev) =>
      prev.map((c) => (c.id === car.id ? { ...c, isActive: next, available: next } : c))
    );
    try {
      await toggleListingStatus(car.id, next);
    } catch (err) {
      setListings((prev) =>
        prev.map((c) => (c.id === car.id ? { ...c, isActive: !next, available: !next } : c))
      );
      setError(err.message || 'Could not update listing status');
    } finally {
      setSavingId('');
    }
  };

  if (loading) return <Loader label="Loading listings..." />;

  return (
    <div className="space-y-6">
      <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--ink)]">My Listings</h2>
          <p className="text-sm text-[var(--muted)] mt-1">Unlisted cars stay in your garage but hide from Browse.</p>
        </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((car) => {
          const listed = isListed(car);
          return (
          <div key={car.id} className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] overflow-hidden shadow-[var(--shadow)]">
            <div className="relative h-48 overflow-hidden bg-[var(--bg)]">
              {car.image_url ? (
                <img
                  src={car.image_url}
                  alt={`${car.make} ${car.model}`}
                  className={`w-full h-full object-cover ${listed ? '' : 'opacity-50'}`}
                />
              ) : null}
              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                listed
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                  : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--line)]'
              }`}>
                {listed ? 'Listed' : 'Unlisted'}
              </span>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-[var(--ink)]">{car.make} {car.model}</h3>
                  <p className="text-[var(--muted)] text-sm">{car.year}</p>
                </div>
                <p className="text-[var(--accent)] font-bold">
                  {formatPrice(car.price_per_day)}
                  <span className="text-xs text-[var(--muted)] font-normal">/day</span>
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--ink)] cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={listed}
                    disabled={savingId === car.id}
                    onChange={() => handleToggle(car)}
                  />
                  <span
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                      listed ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'
                    } ${savingId === car.id ? 'opacity-60' : ''}`}
                  >
                    <span
                      className={`inline-block h-5 w-5 rounded-full bg-white shadow mt-0.5 transition-transform ${
                        listed ? 'translate-x-[22px]' : 'translate-x-[2px]'
                      }`}
                    />
                  </span>
                  {listed ? 'Shown on Browse' : 'Hidden from Browse'}
                </label>
              </div>

              <Link to={`/booking/${car.id}`} state={{ car }} className="inline-block mt-4 text-sm font-semibold text-[var(--accent)] hover:underline">
                View listing →
              </Link>
            </div>
          </div>
          );
        })}

        <Link
          to="/carHost"
          className="border-2 border-dashed border-[var(--line)] rounded-[var(--radius)] flex flex-col items-center justify-center text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] min-h-[300px] transition-colors"
        >
          <span className="text-3xl mb-2">+</span>
          <span className="font-medium">{listings.length ? 'List another car' : 'List your first car'}</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardListings;
