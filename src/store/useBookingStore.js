import { create } from 'zustand';
import { apiFetch } from '../utils/api';

const useBookingStore = create((set, get) => ({
  bookings: [],
  hostBookings: [],
  loading: false,
  error: null,

  createBooking: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetch('api/bookings', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      set({ loading: false });
      return { success: true, ...data };
    } catch (error) {
      set({ loading: false, error: error.message });
      return { success: false, error: error.message };
    }
  },

  initiatePayment: async (bookingId) => {
    const data = await apiFetch('api/payments/initiate', {
      method: 'POST',
      body: JSON.stringify({ bookingId }),
    });
    return data;
  },

  verifyPayment: async ({ bookingId, orderId, paymentId, signature }) => {
    const data = await apiFetch('api/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ bookingId, orderId, paymentId, signature }),
    });
    return data;
  },

  fetchMyBookings: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetch('api/bookings/mine');
      set({ bookings: data.bookings || [], loading: false });
      return data.bookings || [];
    } catch (error) {
      set({ loading: false, error: error.message, bookings: [] });
      return [];
    }
  },

  fetchDashboardBookings: async () => {
    set({ loading: true, error: null });
    try {
      const [renter, host] = await Promise.all([
        apiFetch('api/bookings/mine'),
        apiFetch('api/bookings/mine?as=host'),
      ]);
      set({
        bookings: renter.bookings || [],
        hostBookings: host.bookings || [],
        loading: false,
      });
    } catch (error) {
      set({ loading: false, error: error.message, bookings: [], hostBookings: [] });
    }
  },

  cancelBooking: async (bookingId) => {
    await apiFetch(`api/bookings/${bookingId}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({}),
    });
    const { bookings, hostBookings } = get();
    const mark = (list) =>
      list.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    set({ bookings: mark(bookings), hostBookings: mark(hostBookings) });
  },
}));

export default useBookingStore;
