import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useBookingStore from '../../../store/useBookingStore';
import Loader from '../../../components/ui/Loader';
import Button from '../../../components/ui/Button';
import { formatPrice } from '../../../utils/format';

const formatDay = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString();
};

const renterOf = (booking) => booking.renter || {
  displayName: booking.renterName || (booking.renterEmail || '').split('@')[0] || 'Guest',
  email: booking.renterEmail || '',
  photoURL: booking.renterPhotoURL || '',
  phoneNumber: booking.renterPhone || '',
};

const BookingCard = ({ booking, asHost, expanded, onToggle, onCancel, cancelling }) => {
  const renter = renterOf(booking);
  const canCancel = ['confirmed', 'pending', 'ongoing'].includes(booking.status);

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl shadow-[var(--shadow)] overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-4 flex flex-col md:flex-row gap-6"
      >
        <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--bg)]">
          {booking.carImage ? (
            <img src={booking.carImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--muted)] text-sm">No image</div>
          )}
        </div>
        <div className="flex-grow flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-[var(--ink)] truncate">
                {booking.carMake} {booking.carModel}
              </h3>
              {asHost ? (
                <p className="text-[var(--muted)] text-sm mt-1 truncate">
                  Guest: {renter.displayName}
                </p>
              ) : (
                <p className="text-[var(--muted)] text-sm mt-1 truncate">
                  {booking.pickupLocation || '—'}
                </p>
              )}
            </div>
            <span className={`shrink-0 px-3 py-1 rounded-md text-xs font-semibold capitalize ${
              booking.status === 'cancelled'
                ? 'bg-[var(--bg)] text-[var(--muted)]'
                : 'bg-[var(--accent-soft)] text-[var(--accent)]'
            }`}>
              {booking.status}
            </span>
          </div>
          <div className="flex justify-between items-end mt-4 text-sm gap-3">
            <div className="text-[var(--muted)] space-y-0.5">
              <p className="font-medium text-[var(--ink)]">
                {formatDay(booking.startDate)} <span className="text-[var(--muted)]">→</span> {formatDay(booking.endDate)}
              </p>
              <p className="text-xs">{booking.days || 1} day{booking.days !== 1 ? 's' : ''} · {booking.pickupLocation || '—'}</p>
            </div>
            <div className="text-right shrink-0">
              {asHost ? (
                <>
                  <p className="text-xs text-[var(--muted)]">Payout</p>
                  <p className="text-lg font-bold text-[var(--navy)]">
                    {formatPrice(booking.hostPayout ?? booking.totalPrice)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-[var(--muted)]">Total</p>
                  <p className="text-lg font-bold text-[var(--navy)]">{formatPrice(booking.totalPrice)}</p>
                </>
              )}
              <p className="text-xs text-[var(--accent)] font-semibold mt-0.5">
                {expanded ? 'Hide details ↑' : 'View details ↓'}
              </p>
            </div>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-[var(--line)]">
          {/* Trip details — always full width */}
          <dl className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm">
            <div>
              <dt className="text-[var(--muted)] text-xs">Dates</dt>
              <dd className="font-medium text-[var(--ink)]">{formatDay(booking.startDate)} → {formatDay(booking.endDate)}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)] text-xs">Duration</dt>
              <dd className="font-medium text-[var(--ink)]">{booking.days || 1} day{booking.days !== 1 ? 's' : ''}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)] text-xs">Payment</dt>
              <dd className="font-medium text-[var(--ink)] capitalize">{booking.paymentStatus || 'unpaid'}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)] text-xs">Pickup</dt>
              <dd className="font-medium text-[var(--ink)]">{booking.pickupLocation || '—'}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)] text-xs">Drop-off</dt>
              <dd className="font-medium text-[var(--ink)]">{booking.dropLocation || '—'}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)] text-xs">Total</dt>
              <dd className="font-medium text-[var(--ink)]">{formatPrice(booking.totalPrice)}</dd>
            </div>
            {asHost && (
              <>
                <div>
                  <dt className="text-[var(--muted)] text-xs">Platform fee</dt>
                  <dd className="font-medium text-[var(--ink)]">{formatPrice(booking.platformFee ?? 0)}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)] text-xs">Your payout</dt>
                  <dd className="font-bold text-[var(--accent)]">{formatPrice(booking.hostPayout ?? booking.totalPrice)}</dd>
                </div>
              </>
            )}
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-[var(--muted)] text-xs">Ref</dt>
              <dd className="font-medium text-[var(--ink)] break-all text-xs">{booking.id}</dd>
            </div>
          </dl>

          {/* Contact strip — host info for renter, guest info for host */}
          {(!asHost && booking.host) && (
            <div className="mt-4 pt-4 border-t border-[var(--line)] flex flex-wrap items-center gap-4">
              <img
                src={booking.host.photoURL || 'https://img.icons8.com/ios-filled/100/user-male-circle.png'}
                alt=""
                className="w-10 h-10 rounded-full object-cover border border-[var(--line)] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-semibold">Host · pickup contact</p>
                <p className="font-bold text-[var(--ink)]">{booking.host.name}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                {booking.host.phone && (
                  <a href={`tel:${booking.host.phone}`} className="font-semibold text-[var(--accent)] hover:underline">
                    📞 {booking.host.phone}
                  </a>
                )}
                {booking.host.email && (
                  <a href={`mailto:${booking.host.email}`} className="font-semibold text-[var(--accent)] hover:underline break-all">
                    ✉ {booking.host.email}
                  </a>
                )}
                {!booking.host.phone && !booking.host.email && (
                  <span className="text-[var(--muted)] text-xs">Host hasn't added contact details yet.</span>
                )}
              </div>
            </div>
          )}

          {asHost && (
            <div className="mt-4 pt-4 border-t border-[var(--line)] flex flex-wrap items-center gap-4">
              <img
                src={renter.photoURL || 'https://img.icons8.com/ios-filled/100/user-male-circle.png'}
                alt=""
                className="w-10 h-10 rounded-full object-cover border border-[var(--line)] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-semibold">Guest</p>
                <p className="font-bold text-[var(--ink)]">{renter.displayName}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                {renter.email && (
                  <a href={`mailto:${renter.email}`} className="font-semibold text-[var(--accent)] hover:underline break-all">
                    ✉ {renter.email}
                  </a>
                )}
                {renter.phoneNumber && (
                  <a href={`tel:${renter.phoneNumber}`} className="font-semibold text-[var(--accent)] hover:underline">
                    📞 {renter.phoneNumber}
                  </a>
                )}
              </div>
            </div>
          )}


          {(canCancel || (!asHost && booking.paymentStatus === 'paid')) && (
            <div className="mt-4 flex justify-between items-center gap-3">
              <div>
                {!asHost && booking.paymentStatus === 'paid' && (
                  <Link
                    to={`/booking/${booking.carId}`}
                    className="text-sm font-semibold text-[var(--accent)] hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Write a review →
                  </Link>
                )}
              </div>
              {canCancel && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={cancelling}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel(booking.id);
                  }}
                >
                  {cancelling ? 'Cancelling…' : 'Cancel booking'}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DashboardBookings = () => {
  const { bookings, hostBookings, loading, fetchDashboardBookings, cancelBooking } = useBookingStore();
  const [segment, setSegment] = useState('trips');
  const [openId, setOpenId] = useState(null);
  const [cancellingId, setCancellingId] = useState('');

  useEffect(() => {
    fetchDashboardBookings();
  }, [fetchDashboardBookings]);

  const list = segment === 'host' ? hostBookings : bookings;
  const asHost = segment === 'host';

  const handleCancel = async (id) => {
    setCancellingId(id);
    try {
      await cancelBooking(id);
    } catch (_) {
      /* keep list; status unchanged */
    } finally {
      setCancellingId('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--ink)]">Bookings</h2>
        <p className="text-sm text-[var(--muted)] mt-1">Your trips and guests who booked your cars.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => { setSegment('trips'); setOpenId(null); }}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            segment === 'trips'
              ? 'btn-navy'
              : 'bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)]'
          }`}
        >
          Your trips ({bookings.length})
        </button>
        <button
          type="button"
          onClick={() => { setSegment('host'); setOpenId(null); }}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            segment === 'host'
              ? 'btn-navy'
              : 'bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)]'
          }`}
        >
          Guest bookings ({hostBookings.length})
        </button>
      </div>

      {loading ? (
        <Loader label="Loading bookings..." />
      ) : !list.length ? (
        <div className="text-center py-16 border border-dashed border-[var(--line)] rounded-[var(--radius)] px-4">
          {asHost ? (
            <>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-2">No guest bookings yet</h3>
              <p className="text-[var(--muted)]">When someone books your car, the trip and guest details show up here.</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-2">No trips yet</h3>
              <p className="text-[var(--muted)] mb-6">Browse cars and reserve your first trip.</p>
              <Link
                to="/allCars"
                className="btn-accent inline-flex px-5 py-2.5 rounded-[var(--radius-sm)] font-semibold"
              >
                Browse cars
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              asHost={asHost}
              expanded={openId === booking.id}
              onToggle={() => setOpenId((id) => (id === booking.id ? null : booking.id))}
              onCancel={handleCancel}
              cancelling={cancellingId === booking.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardBookings;
