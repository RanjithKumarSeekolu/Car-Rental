import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../utils/api';
import { formatPrice } from '../../utils/format';
import Container from '../../components/ui/Container';
import Loader from '../../components/ui/Loader';
import DashboardProfile from '../dashboard/components/DashboardProfile';
import useCarStore from '../../store/useCarStore';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'kyc', label: 'KYC' },
  { id: 'hosts', label: 'Hosts' },
  { id: 'catalog', label: 'Catalog' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'profile', label: 'Profile' },
];

const AdminDashboard = ({ user, logout }) => {
  const [tab, setTab] = useState('overview');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError('');
      const res = await apiFetch('api/dashboard/admin');
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  const stats = data?.stats;
  const feePct = Math.round((stats?.feeRate ?? 0.15) * 100);
  const cards = [
    { label: 'Platform revenue', value: formatPrice(stats?.platformRevenue ?? 0) },
    { label: 'Catalog revenue', value: formatPrice(stats?.catalogRevenue ?? 0) },
    { label: `Commission (${feePct}%)`, value: formatPrice(stats?.commission ?? 0) },
    { label: 'Host payouts', value: formatPrice(stats?.hostPayouts ?? 0) },
    { label: 'GMV', value: formatPrice(stats?.gmv ?? 0) },
    { label: 'Hosts', value: stats?.hosts ?? 0 },
    { label: 'Bookings', value: stats?.bookingsTotal ?? 0 },
    { label: 'Live bookings', value: stats?.bookingsActive ?? 0 },
  ];

  return (
    <div className="bg-[var(--bg)] min-h-screen pb-12 pt-28">
      <Container>
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
            Platform
          </p>
          <h1 className="text-3xl font-bold text-[var(--ink)]">Admin dashboard</h1>
          <p className="text-[var(--muted)] mt-1">
            RentNHost overall — catalog keeps 100%, host bookings take {Math.round((data?.stats?.feeRate ?? 0.15) * 100)}%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-[var(--surface)] rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)] p-6 h-full min-h-[500px]">
              <div className="flex flex-col items-center mb-10">
                <img
                  src={user?.photoURL || 'https://ui-avatars.com/api/?name=RentNHost&background=0B1F3A&color=FF5C1A'}
                  alt=""
                  className="w-24 h-24 rounded-full border-4 border-[var(--bg)] mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-[var(--ink)] text-center">
                  {user?.displayName || 'RentNHost Admin'}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mt-1">
                  Admin
                </p>
                <p className="text-sm text-[var(--muted)] text-center break-all mt-1">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                {TABS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-[var(--radius-sm)] font-medium transition-all ${
                      tab === item.id
                        ? 'btn-navy'
                        : 'text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {item.label}
                    {item.id === 'hosts' && stats ? ` (${stats.hosts})` : ''}
                    {item.id === 'kyc' && data?.kycQueue?.length ? ` (${data.kycQueue.length})` : ''}
                  </button>
                ))}
              </nav>

              <div className="mt-10 pt-8 border-t border-[var(--line)]">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
            {loading && !data ? (
              <Loader label="Loading platform stats..." />
            ) : tab === 'profile' ? (
              <DashboardProfile user={user} />
            ) : tab === 'kyc' ? (
              <KycPanel
                queue={data?.kycQueue || []}
                onReviewed={() => load(true)}
              />
            ) : tab === 'hosts' ? (
              <HostsPanel hosts={data?.hosts || []} />
            ) : tab === 'catalog' ? (
              <CatalogPanel
                cars={data?.catalog || []}
                onToggled={(id, isActive) => {
                  setData((prev) => {
                    if (!prev) return prev;
                    const catalog = prev.catalog.map((c) => (c.id === id ? { ...c, isActive } : c));
                    const listedDelta = isActive ? 1 : -1;
                    return {
                      ...prev,
                      catalog,
                      stats: {
                        ...prev.stats,
                        listingsActive: Math.max(0, (prev.stats?.listingsActive ?? 0) + listedDelta),
                      },
                    };
                  });
                }}
              />
            ) : tab === 'bookings' ? (
              <BookingsPanel bookings={data?.recentBookings || []} />
            ) : (
              <OverviewPanel
                cards={cards}
                hosts={data?.hosts || []}
                bookings={data?.recentBookings || []}
                updatedAt={data?.updatedAt}
                onRefresh={() => load(true)}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

function KycPanel({ queue, onReviewed }) {
  const [saving, setSaving] = useState('');
  const [reason, setReason] = useState({});
  const [error, setError] = useState('');

  const review = async (uid, status) => {
    setSaving(uid + status);
    setError('');
    try {
      await apiFetch(`api/users/${uid}/kyc`, {
        method: 'PATCH',
        body: JSON.stringify({ status, reason: reason[uid] || '' }),
      });
      onReviewed?.();
    } catch (err) {
      setError(err.message || 'Could not update KYC');
    } finally {
      setSaving('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--ink)]">Licence verification</h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          Approve driving licences before a user can book or list.
        </p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!queue.length ? (
        <p className="text-[var(--muted)] text-sm py-10 text-center bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)]">
          No licences waiting.
        </p>
      ) : (
        <ul className="space-y-4">
          {queue.map((item) => (
            <li
              key={item.uid}
              className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] p-5 shadow-[var(--shadow)]"
            >
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="min-w-0">
                  <p className="font-bold text-[var(--ink)]">{item.displayName || 'User'}</p>
                  <p className="text-sm text-[var(--muted)] truncate">{item.email}</p>
                  <p className="text-sm text-[var(--ink)] mt-2">
                    Licence: <span className="font-semibold">{item.licenceNumber || '—'}</span>
                  </p>
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)] mt-1">{item.kycStatus}</p>
                </div>
                {item.licenceImage ? (
                  <a href={item.licenceImage} target="_blank" rel="noreferrer">
                    <img
                      src={item.licenceImage}
                      alt="Driving licence"
                      className="h-28 rounded-md object-cover border border-[var(--line)]"
                    />
                  </a>
                ) : (
                  <p className="text-sm text-[var(--muted)]">No photo</p>
                )}
              </div>
              {item.kycStatus !== 'verified' && (
                <div className="mt-4 flex flex-wrap items-end gap-3">
                  <input
                    value={reason[item.uid] || ''}
                    onChange={(e) => setReason((prev) => ({ ...prev, [item.uid]: e.target.value }))}
                    placeholder="Reject reason (optional)"
                    className="flex-1 min-w-[180px] px-3 py-2 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-sm"
                  />
                  <button
                    type="button"
                    disabled={!!saving}
                    onClick={() => review(item.uid, 'verified')}
                    className="px-4 py-2 rounded-[var(--radius-sm)] btn-navy text-sm font-semibold disabled:opacity-50"
                  >
                    {saving === `${item.uid}verified` ? 'Saving…' : 'Approve'}
                  </button>
                  <button
                    type="button"
                    disabled={!!saving}
                    onClick={() => review(item.uid, 'rejected')}
                    className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-semibold text-red-600 border border-red-200 disabled:opacity-50"
                  >
                    {saving === `${item.uid}rejected` ? 'Saving…' : 'Reject'}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OverviewPanel({ cards, hosts, bookings, updatedAt, onRefresh }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[var(--ink)]">Overall</h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Platform snapshot
            {updatedAt ? ` · ${new Date(updatedAt).toLocaleTimeString()}` : ''}
          </p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          Refresh now
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] p-6 shadow-[var(--shadow)]">
          <h3 className="text-lg font-bold text-[var(--ink)] mb-4">Hosts</h3>
          {!hosts.length ? (
            <p className="text-sm text-[var(--muted)]">No community hosts yet.</p>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {hosts.slice(0, 6).map((host) => (
                <li key={host.uid} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--ink)] truncate">{host.displayName}</p>
                    <p className="text-xs text-[var(--muted)] truncate">{host.email || host.uid}</p>
                  </div>
                  <p className="text-sm font-bold text-[var(--navy)] shrink-0">
                    {host.listings} {host.listings === 1 ? 'car' : 'cars'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] p-6 shadow-[var(--shadow)]">
          <h3 className="text-lg font-bold text-[var(--ink)] mb-4">Recent bookings</h3>
          {!bookings.length ? (
            <p className="text-sm text-[var(--muted)]">No bookings yet.</p>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {bookings.slice(0, 6).map((item) => (
                <li key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--ink)] truncate">{item.title}</p>
                    <p className="text-xs text-[var(--muted)] capitalize truncate">
                      {item.status} · {item.renterName}
                      {item.isCatalog ? ' · catalog' : ' · host'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-[var(--navy)]">{formatPrice(item.platformFee ?? item.totalPrice)}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {item.isCatalog ? 'kept' : 'commission'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function HostsPanel({ hosts }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--ink)]">Hosts</h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          People who listed cars on RentNHost. Catalog cars are not counted here.
        </p>
      </div>
      {!hosts.length ? (
        <p className="text-[var(--muted)] text-sm py-10 text-center bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)]">
          No hosts yet.
        </p>
      ) : (
        <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] shadow-[var(--shadow)] overflow-hidden">
          <ul className="divide-y divide-[var(--line)]">
            {hosts.map((host) => (
              <li key={host.uid} className="p-5 flex flex-wrap items-center gap-4">
                <img
                  src={host.photoURL || 'https://img.icons8.com/ios-filled/100/user-male-circle.png'}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border border-[var(--line)]"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[var(--ink)]">{host.displayName}</p>
                  <p className="text-sm text-[var(--muted)] truncate">{host.email || 'No email'}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <Stat label="Listings" value={host.listings} />
                  <Stat label="Commission" value={formatPrice(host.commission ?? 0)} />
                  <Stat label="Host payout" value={formatPrice(host.payout ?? 0)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CatalogPanel({ cars, onToggled }) {
  const toggleListingStatus = useCarStore((s) => s.toggleListingStatus);
  const [rows, setRows] = useState(cars);
  const [savingId, setSavingId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setRows(cars);
  }, [cars]);

  const listedCount = rows.filter((c) => c.isActive).length;

  const handleToggle = async (car) => {
    const next = !car.isActive;
    setSavingId(car.id);
    setError('');
    setRows((prev) => prev.map((c) => (c.id === car.id ? { ...c, isActive: next } : c)));
    try {
      await toggleListingStatus(car.id, next);
      onToggled?.(car.id, next);
    } catch (err) {
      setRows((prev) => prev.map((c) => (c.id === car.id ? { ...c, isActive: !next } : c)));
      setError(err.message || 'Could not update listing');
    } finally {
      setSavingId('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--ink)]">Platform catalog</h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          Unlist a car to hide it from Browse. {listedCount} of {rows.length} listed.
        </p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!rows.length ? (
        <p className="text-[var(--muted)] text-sm py-10 text-center bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)]">
          No catalog cars. Run <code>npm run seed:admin</code> on the backend.
        </p>
      ) : (
        <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] shadow-[var(--shadow)] overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase tracking-wider text-[var(--muted)] border-b border-[var(--line)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Car</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Rate</th>
                <th className="px-4 py-3 font-semibold">Views</th>
                <th className="px-4 py-3 font-semibold">Listed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {rows.map((car) => (
                <tr key={car.id} className="hover:bg-[var(--bg)]">
                  <td className="px-4 py-3">
                    <Link to={`/booking/${car.id}`} className="flex items-center gap-3 min-w-[180px]">
                      {car.image ? (
                        <img
                          src={car.image}
                          alt=""
                          className={`w-14 h-10 rounded-md object-cover ${car.isActive ? '' : 'opacity-50'}`}
                        />
                      ) : (
                        <div className="w-14 h-10 rounded-md bg-[var(--bg)]" />
                      )}
                      <span className="font-semibold text-[var(--ink)]">
                        {car.make} {car.model}
                        {car.year ? ` · ${car.year}` : ''}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{car.city || '—'}</td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(car.pricePerDay)}</td>
                  <td className="px-4 py-3">{car.views}</td>
                  <td className="px-4 py-3">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={!!car.isActive}
                        disabled={savingId === car.id}
                        onChange={() => handleToggle(car)}
                      />
                      <span
                        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                          car.isActive ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'
                        } ${savingId === car.id ? 'opacity-60' : ''}`}
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white shadow mt-0.5 transition-transform ${
                            car.isActive ? 'translate-x-[22px]' : 'translate-x-[2px]'
                          }`}
                        />
                      </span>
                      <span
                        className={`text-xs font-bold uppercase tracking-wide ${
                          car.isActive ? 'text-[var(--success)]' : 'text-[var(--muted)]'
                        }`}
                      >
                        {car.isActive ? 'Listed' : 'Unlisted'}
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function BookingsPanel({ bookings }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--ink)]">All bookings</h2>
        <p className="text-sm text-[var(--muted)] mt-1">Latest trips across catalog and host cars.</p>
      </div>
      {!bookings.length ? (
        <p className="text-[var(--muted)] text-sm py-10 text-center bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)]">
          No bookings yet.
        </p>
      ) : (
        <ul className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] shadow-[var(--shadow)] divide-y divide-[var(--line)]">
          {bookings.map((item) => (
            <li key={item.id} className="p-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-[var(--ink)]">{item.title}</p>
                <p className="text-xs text-[var(--muted)] capitalize">
                  {item.status} · {item.renterName}
                  {item.isCatalog ? ' · catalog 100%' : ' · host'}
                  {item.startDate ? ` · ${new Date(item.startDate).toLocaleDateString()}` : ''}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[var(--navy)]">{formatPrice(item.platformFee ?? 0)}</p>
                <p className="text-xs text-[var(--muted)]">
                  of {formatPrice(item.totalPrice)} guest total
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs text-[var(--muted)] uppercase tracking-wide">{label}</p>
      <p className="font-bold text-[var(--ink)]">{value}</p>
    </div>
  );
}

export default AdminDashboard;
