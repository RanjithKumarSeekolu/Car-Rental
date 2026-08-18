import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../../utils/api';
import { formatPrice } from '../../../utils/format';
import Loader from '../../../components/ui/Loader';

const POLL_MS = 20000;

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const load = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError('');
      const [statsRes, activityRes] = await Promise.all([
        apiFetch('api/dashboard/stats'),
        apiFetch('api/dashboard/activity?limit=8'),
      ]);
      setStats(statsRes.stats);
      setActivity(activityRes.activity || []);
      setLastUpdated(statsRes.stats?.updatedAt || new Date().toISOString());
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(false);

    let timer;
    const startPoll = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        if (document.visibilityState === 'visible') load(true);
      }, POLL_MS);
    };

    startPoll();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        load(true);
        startPoll();
      } else {
        clearInterval(timer);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [load]);

  if (loading && !stats) return <Loader label="Loading overview..." />;

  const cards = [
    { label: 'Active listings', value: stats?.listings?.active ?? 0 },
    { label: 'Total views', value: stats?.listings?.views ?? 0 },
    { label: 'Host bookings', value: stats?.host?.bookingsActive ?? 0 },
    { label: 'Your earnings', value: formatPrice(stats?.host?.estimatedEarnings ?? 0) },
    { label: 'Upcoming trips (host)', value: stats?.host?.bookingsUpcoming ?? 0 },
    { label: 'Your rentals', value: stats?.renter?.bookingsActive ?? 0 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[var(--ink)]">Overview</h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Live snapshot — earnings are after the {Math.round((stats?.host?.feeRate ?? 0.15) * 100)}% platform fee
            {lastUpdated ? ` · ${new Date(lastUpdated).toLocaleTimeString()}` : ''}
          </p>
        </div>
        <button
          type="button"
          onClick={() => load(true)}
          className="text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          Refresh now
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] p-5 shadow-[var(--shadow)]"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
              {card.label}
            </p>
            <p className="text-2xl font-bold text-[var(--ink)]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] p-6 shadow-[var(--shadow)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[var(--ink)]">Recent activity</h3>
          <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">
            Auto-updates
          </span>
        </div>

        {!activity.length ? (
          <p className="text-[var(--muted)] text-sm py-6 text-center">
            No bookings yet.{' '}
            <Link to="/allCars" className="text-[var(--accent)] font-semibold hover:underline">
              Browse cars
            </Link>
            {' '}or{' '}
            <Link to="/carHost" className="text-[var(--accent)] font-semibold hover:underline">
              list your car
            </Link>
            .
          </p>
        ) : (
          <ul className="divide-y divide-[var(--line)]">
            {activity.map((item) => (
              <li key={item.id} className="py-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-[var(--ink)]">{item.title}</p>
                  <p className="text-xs text-[var(--muted)] capitalize">
                    {item.role} · {item.status}
                    {item.startDate ? ` · ${new Date(item.startDate).toLocaleDateString()}` : ''}
                  </p>
                </div>
                <p className="font-bold text-[var(--navy)]">
                  {formatPrice(item.role === 'host' ? (item.hostPayout ?? item.totalPrice) : item.totalPrice)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
