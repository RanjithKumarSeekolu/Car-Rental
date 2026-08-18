import { create } from 'zustand';
import { apiFetch, normalizeCar } from '../utils/api';

const collectionKey = (category, limit) => `${category}|${limit}`;

const useCarStore = create((set, get) => ({
  cars: [],
  collectionCars: [],
  collectionCache: {},
  collectionCategory: 'Sports',
  collectionReqId: 0,
  loading: false,
  error: null,

  fetchCars: async ({ limit = 6, category = 'Sports', prefetch = false } = {}) => {
    const key = collectionKey(category, limit);
    const cached = get().collectionCache[key];

    if (prefetch && cached) return;

    const reqId = prefetch ? get().collectionReqId : get().collectionReqId + 1;
    if (!prefetch) {
      set({
        collectionReqId: reqId,
        collectionCategory: category,
        error: null,
        ...(cached
          ? { collectionCars: cached, loading: false }
          : { collectionCars: [], loading: true }),
      });
    }

    try {
      const qs = new URLSearchParams({ limit: String(limit) });
      if (category) qs.set('category', category);
      const data = await apiFetch(`api/cars?${qs}`, { auth: false });
      const cars = (data.cars || []).map(normalizeCar);

      set((state) => {
        const next = {
          collectionCache: { ...state.collectionCache, [key]: cars },
          pagination: data.pagination,
        };
        if (!prefetch && state.collectionReqId === reqId) {
          next.collectionCars = cars;
          next.loading = false;
        }
        return next;
      });
    } catch (error) {
      if (!prefetch) {
        set((state) => (
          state.collectionReqId === reqId
            ? { error: error.message, loading: false }
            : state
        ));
      }
    }
  },

  getAllCars: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const qs = new URLSearchParams({ limit: '100', ...params });
      const data = await apiFetch(`api/cars?${qs}`, { auth: false });
      set({ cars: (data.cars || []).map(normalizeCar), loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getCarById: async (carId, { recordView = true } = {}) => {
    const qs = recordView ? '' : '?view=0';
    const data = await apiFetch(`api/cars/${carId}${qs}`, { auth: false });
    return normalizeCar(data.car || data);
  },

  addCar: async (carData) => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetch('api/cars', {
        method: 'POST',
        body: JSON.stringify(carData),
      });
      const car = normalizeCar(data.car || { id: data.carId, ...carData });
      set((state) => ({
        cars: [...state.cars, car],
        collectionCache: {},
        loading: false,
      }));
      return { success: true, car };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  getHostCars: async () => {
    const data = await apiFetch('api/cars/host/my-cars');
    return (data.cars || []).map(normalizeCar);
  },

  toggleListingStatus: async (carId, isActive) => {
    const data = await apiFetch(`api/cars/${carId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
    set({ collectionCache: {} });
    return data;
  },
}));

export default useCarStore;
