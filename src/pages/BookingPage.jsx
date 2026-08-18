import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link, useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import useAuthStore from "../store/useAuthStore";
import useCarStore from "../store/useCarStore";
import useBookingStore from "../store/useBookingStore";
import { formatPrice } from "../utils/format";
import { pickupCoords } from "../utils/geo";
import { openRazorpayCheckout } from "../utils/razorpay";
import DemoCheckout from "../features/booking/components/DemoCheckout";
import { apiFetch } from "../utils/api";
import { isKycVerified } from "../utils/kyc";
import appIcon from "../assets/app-icon.png";

const BookingPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, profile } = useAuthStore();
  const { getCarById } = useCarStore();
  const { createBooking, initiatePayment, verifyPayment, fetchMyBookings } = useBookingStore();
  const kycOk = !user || !profile || isKycVerified(profile);

  const [car, setCar] = useState(location.state?.car || null);
  const [loadingCar, setLoadingCar] = useState(!location.state?.car);
  const [startDate, setStartDate] = useState(searchParams.get("from") || "");
  const [endDate, setEndDate] = useState(searchParams.get("to") || "");
  const [totalCost, setTotalCost] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [demoOrder, setDemoOrder] = useState(null);
  const [bookedRanges, setBookedRanges] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewable, setReviewable] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSaving, setReviewSaving] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const fromState = location.state?.car;
      if (fromState) {
        setCar(fromState);
        setLoadingCar(false);
      } else {
        setLoadingCar(true);
      }

      const isHostLooking =
        Boolean(user?.uid) &&
        Boolean(fromState?.hostId) &&
        fromState.hostId === user.uid;

      try {
        const fetched = await getCarById(carId, { recordView: !isHostLooking });
        if (!cancelled && fetched) setCar(fetched);
      } catch (err) {
        if (!cancelled && !fromState) setError(err.message);
      } finally {
        if (!cancelled) setLoadingCar(false);
      }
    })();
    return () => { cancelled = true; };
  }, [carId, getCarById, location.state, user?.uid]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24));
      const price = Number(car.price_per_day) || 0;
      setTotalCost(days > 0 ? days * price : 0);
    } else {
      setTotalCost(0);
    }
  }, [startDate, endDate, car]);

  // Fetch booked date ranges for this car (public, no auth needed)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch(`api/cars/${carId}/booked-dates`, { auth: false });
        if (!cancelled) {
          setBookedRanges(
            (data.booked || []).map((r) => ({
              start: new Date(r.start),
              end: new Date(r.end),
            }))
          );
        }
      } catch {
        if (!cancelled) setBookedRanges([]);
      }
    })();
    return () => { cancelled = true; };
  }, [carId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiFetch(`api/cars/${carId}/reviews`, { auth: false });
        if (!cancelled) setReviews(data.reviews || []);
      } catch {
        if (!cancelled) setReviews([]);
      }
    })();
    return () => { cancelled = true; };
  }, [carId]);

  useEffect(() => {
    if (!user || !carId) {
      setReviewable(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const mine = await fetchMyBookings();
      if (cancelled) return;
      const reviewed = new Set(
        reviews.filter((r) => r.renterId === user.uid).map((r) => r.bookingId)
      );
      const next = (mine || []).find(
        (b) => b.carId === carId && b.paymentStatus === "paid" && !reviewed.has(b.id)
      );
      setReviewable(next || null);
    })();
    return () => { cancelled = true; };
  }, [user, carId, reviews, fetchMyBookings]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!reviewable) return;
    setReviewSaving(true);
    setReviewError("");
    try {
      await apiFetch(`api/cars/${carId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
          bookingId: reviewable.id,
          rating: reviewRating,
          comment: reviewComment.trim(),
        }),
      });
      setReviews((prev) => [
        {
          id: `local-${Date.now()}`,
          renterName: user.displayName || profile?.displayName || "You",
          renterId: user.uid,
          bookingId: reviewable.id,
          rating: reviewRating,
          comment: reviewComment.trim(),
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setReviewable(null);
      setReviewComment("");
      setReviewRating(5);
    } catch (err) {
      setReviewError(err.message || "Could not save review");
    } finally {
      setReviewSaving(false);
    }
  };

  /** Returns true if a YYYY-MM-DD string falls inside any booked range */
  const isDateUnavailable = (dateStr) => {
    const d = new Date(dateStr);
    return bookedRanges.some((r) => d >= r.start && d < r.end);
  };

  /** True if the selected [startDate, endDate) overlaps any booked window */
  const rangeConflict = (() => {
    if (!startDate || !endDate) return false;
    const s = new Date(startDate);
    const e = new Date(endDate);
    return bookedRanges.some((r) => s < r.end && e > r.start);
  })();

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    if (!user) {
      navigate("/carHost", { state: { from: location.pathname + location.search } });
      return;
    }
    if (!kycOk) {
      navigate("/dashboard?tab=profile");
      return;
    }
    if (totalCost <= 0) return;

    setSubmitting(true);
    const result = await createBooking({
      carId: car.id || carId,
      startDate,
      endDate,
      pickupLocation: car.city || car.address || "",
      dropLocation: car.city || car.address || "",
    });

    if (!result.success) {
      setSubmitting(false);
      setError(result.error || "Booking failed");
      return;
    }

    try {
      const order = await initiatePayment(result.bookingId);
      if (order.demo) {
        setDemoOrder({ ...order, bookingId: result.bookingId });
        setSubmitting(false);
        return;
      }
      const payment = await openRazorpayCheckout({
        key: order.keyId,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "RentNHost",
        description: order.description,
        prefill: { email: user.email || "", name: user.displayName || "" },
        notes: { bookingId: result.bookingId },
      });
      await verifyPayment({
        bookingId: result.bookingId,
        orderId: payment.razorpay_order_id,
        paymentId: payment.razorpay_payment_id,
        signature: payment.razorpay_signature,
      });
      setBookingId(result.bookingId);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || "Payment failed. Your dates are held as pending until you pay.");
    } finally {
      setSubmitting(false);
    }
  };

  const finishDemoPay = async () => {
    if (!demoOrder || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await verifyPayment({
        bookingId: demoOrder.bookingId,
        orderId: demoOrder.orderId,
        paymentId: demoOrder.paymentId,
        signature: demoOrder.signature,
      });
      setBookingId(demoOrder.bookingId);
      setDemoOrder(null);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "mt-2 w-full px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--accent)]";

  if (loadingCar) {
    return (
      <div className="pt-28 min-h-screen bg-[var(--bg)]">
        <Loader label="Loading car details..." />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[var(--bg)] text-center px-4">
        <h1 className="text-2xl font-bold text-[var(--ink)] mb-2">Car not found</h1>
        <p className="text-[var(--muted)] mb-6">{error || "This listing may have been removed."}</p>
        <Button variant="accent" onClick={() => navigate("/allCars")}>Browse cars</Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <Container className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="bg-[var(--surface)] p-10 rounded-[var(--radius)] shadow-[var(--shadow)] text-center max-w-lg border border-[var(--line)]">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-[var(--success)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[var(--ink)] mb-4">Payment received</h2>
          <p className="text-[var(--muted)] mb-2">
            {car.make} {car.model} · {formatPrice(totalCost)} paid
          </p>
          {bookingId && <p className="text-xs text-[var(--muted)] mb-8">Ref: {bookingId}</p>}
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>View bookings</Button>
            <Button variant="accent" onClick={() => navigate("/allCars")}>Browse more</Button>
          </div>
        </div>
      </Container>
    );
  }

  const days = totalCost > 0 ? totalCost / (Number(car.price_per_day) || 1) : 0;
  const pin = pickupCoords(car);
  const host = car.host || {};
  const isCatalogHost = car.isPlatformListing === true || host.isCatalog === true;
  const hostName = isCatalogHost
    ? "RentNHost"
    : host.name || car.hostName || "Host";
  const hostPhoto = isCatalogHost
    ? appIcon
    : host.photoURL || car.hostPhotoURL || appIcon;
  const mapsUrl = pin
    ? `https://www.google.com/maps?q=${pin.lat},${pin.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(car.address || car.city || '')}`;
  const osmEmbed = pin
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${pin.lng - 0.012},${pin.lat - 0.008},${pin.lng + 0.012},${pin.lat + 0.008}&layer=mapnik&marker=${pin.lat},${pin.lng}`
    : '';

  return (
    <div className="bg-[var(--bg)] min-h-screen pt-28 pb-20">
      <Container>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 text-[var(--muted)] hover:text-[var(--accent)] font-medium transition-colors"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] overflow-hidden shadow-[var(--shadow)]">
            {car.image_url ? (
              <img
                src={car.image_url}
                alt={`${car.make} ${car.model}`}
                className="w-full h-80 object-cover bg-[var(--bg)]"
              />
            ) : (
              <div className="w-full h-80 bg-[var(--bg)] flex items-center justify-center text-[var(--muted)]">
                No photo available
              </div>
            )}
            <div className="p-8">
              <div className="flex justify-between items-start mb-4 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-[var(--ink)]">{car.make} {car.model}</h1>
                  <p className="text-[var(--muted)] mt-1">
                    {car.address || `${car.city || ""} ${car.state || ""}`.trim() || "Available for pickup"}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-bold text-[var(--accent)]">{formatPrice(car.price_per_day)}</p>
                  <p className="text-sm text-[var(--muted)]">per day</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-[var(--line)]">
                {[
                  ["Transmission", car.transmission],
                  ["Seats", car.seats],
                  ["Fuel", car.fuel],
                  ["Rating", car.rating ? `${car.rating}★` : "—"],
                ].map(([label, value]) => (
                  <div key={label} className="text-center p-3 bg-[var(--bg)] rounded-[var(--radius-sm)]">
                    <p className="text-xs text-[var(--muted)] mb-1">{label}</p>
                    <p className="font-semibold text-[var(--ink)]">{value ?? "—"}</p>
                  </div>
                ))}
              </div>
              {car.description && (
                <p className="mt-6 text-[var(--muted)] leading-relaxed">{car.description}</p>
              )}

              <div className="mt-8 pt-6 border-t border-[var(--line)] flex items-center gap-4">
                <img
                  src={hostPhoto}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover border border-[var(--line)] bg-[var(--bg)]"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                    {isCatalogHost ? "Listed by" : "Host"}
                  </p>
                  <p className="text-lg font-bold text-[var(--ink)] truncate">{hostName}</p>
                  <p className="text-sm text-[var(--muted)]">
                    {isCatalogHost
                      ? "Platform catalog · pickup at the pin"
                      : [
                          host.rating ? `${host.rating}★` : null,
                          host.totalListings
                            ? `${host.totalListings} ${host.totalListings === 1 ? "listing" : "listings"}`
                            : null,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "Community host"}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--line)]">
                <h2 className="text-xl font-bold text-[var(--ink)] mb-2">Pickup</h2>
                <p className="text-sm text-[var(--muted)] mb-3">
                  Collect the car at the host’s pin
                  {car.address ? ` — ${car.address}` : ''}
                  {car.city ? `, ${car.city}` : ''}.
                </p>
                {osmEmbed && (
                  <iframe
                    title="Pickup location"
                    src={osmEmbed}
                    className="w-full h-56 rounded-[var(--radius-sm)] border border-[var(--line)] mb-3"
                  />
                )}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--line)]">
                <h2 className="text-xl font-bold text-[var(--ink)] mb-4">
                  Reviews {reviews.length ? `(${reviews.length})` : ""}
                </h2>
                {reviewable && (
                  <form onSubmit={submitReview} className="mb-6 p-4 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--line)] space-y-3">
                    <p className="text-sm font-semibold text-[var(--ink)]">Rate this trip</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setReviewRating(n)}
                          className={`text-xl ${n <= reviewRating ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}
                          aria-label={`${n} stars`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="How was the car?"
                      className="w-full px-3 py-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                    {reviewError && <p className="text-sm text-red-600">{reviewError}</p>}
                    <Button type="submit" variant="accent" size="sm" disabled={reviewSaving}>
                      {reviewSaving ? "Posting…" : "Post review"}
                    </Button>
                  </form>
                )}
                {!reviews.length ? (
                  <p className="text-sm text-[var(--muted)]">No reviews yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {reviews.map((review) => (
                      <li key={review.id} className="text-sm">
                        <p className="font-semibold text-[var(--ink)]">
                          {review.renterName || "Guest"} · {review.rating}★
                        </p>
                        {review.comment && (
                          <p className="text-[var(--muted)] mt-1">{review.comment}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] p-6 sticky top-28 shadow-[var(--shadow)] h-fit">
            <h2 className="text-xl font-bold text-[var(--ink)] mb-6">Book this car</h2>
            <form onSubmit={handleBooking} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[var(--muted)]">Pick-up date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    // Clear end date if it's now before the new start
                    if (endDate && e.target.value >= endDate) setEndDate("");
                  }}
                  className={`${fieldClass} ${startDate && isDateUnavailable(startDate) ? "border-red-400" : ""}`}
                />
                {startDate && isDateUnavailable(startDate) && (
                  <p className="text-xs text-red-500 mt-1">This date is already booked.</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--muted)]">Drop-off date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`${fieldClass} ${endDate && isDateUnavailable(endDate) ? "border-red-400" : ""}`}
                />
                {endDate && isDateUnavailable(endDate) && (
                  <p className="text-xs text-red-500 mt-1">This date is already booked.</p>
                )}
              </div>

              {rangeConflict && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  <strong>Not available.</strong> This car is already booked for part of the selected period. Please pick different dates.
                  <ul className="mt-2 space-y-0.5 text-xs text-red-500">
                    {bookedRanges.map((r, i) => (
                      <li key={i}>Booked: {r.start.toLocaleDateString()} – {r.end.toLocaleDateString()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {totalCost > 0 && (
                <div className="py-4 border-y border-[var(--line)] space-y-2 text-[var(--muted)] text-sm">
                  <div className="flex justify-between"><span>Rate</span><span>{formatPrice(car.price_per_day)}/day</span></div>
                  <div className="flex justify-between"><span>Duration</span><span>{days} days</span></div>
                  <div className="flex justify-between font-bold text-[var(--ink)] pt-2 text-base">
                    <span>Total</span>
                    <span className="text-[var(--accent)]">{formatPrice(totalCost)}</span>
                  </div>
                </div>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

              {!user && (
                <p className="text-sm text-[var(--muted)]">
                  Need an account?{" "}
                  <Link to="/carHost" className="text-[var(--accent)] font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              )}

              {user && !kycOk && (
                <p className="text-sm text-[var(--muted)]">
                  Verify your driving licence in{" "}
                  <Link to="/dashboard?tab=profile" className="text-[var(--accent)] font-semibold hover:underline">
                    Profile
                  </Link>{" "}
                  before booking.
                </p>
              )}

              <Button
                type="submit"
                variant="accent"
                className="w-full"
                disabled={submitting || rangeConflict || (user && (totalCost <= 0 || !kycOk))}
              >
                {!user
                  ? "Sign in to book"
                  : !kycOk
                    ? "Verify licence to book"
                    : rangeConflict
                      ? "Dates unavailable"
                      : submitting
                      ? "Opening payment..."
                      : totalCost > 0
                        ? `Pay ${formatPrice(totalCost)}`
                        : "Select dates"}
              </Button>
              <p className="text-xs text-center text-[var(--muted)]">
                Secure payment powered by Razorpay.
              </p>
            </form>
          </div>
        </div>
      </Container>
      {demoOrder && (
        <DemoCheckout
          amountPaise={demoOrder.amount}
          description={demoOrder.description}
          onConfirm={finishDemoPay}
          onCancel={() => setDemoOrder(null)}
        />
      )}
    </div>
  );
};

export default BookingPage;
