import apiUrl from './Constants';
import { auth } from '../config/firebase';

export function normalizeCar(car) {
  if (!car) return null;
  const make = car.make || car.brand || 'Car';
  const price = car.price_per_day ?? car.pricePerDay ?? 0;
  const rawImage = car.image_url || (typeof car.images?.[0] === 'string' ? car.images[0] : car.images?.[0]?.url) || '';
  const image = rawImage.startsWith('blob:') ? '' : rawImage;
  const cityId =
    car.cityId ||
    (car.city ? String(car.city).toLowerCase().replace(/\s+/g, '-') : '');
  return {
    ...car,
    id: car.id || car._id,
    make,
    brand: car.brand || make,
    model: car.model || '',
    price_per_day: price,
    pricePerDay: price,
    image_url: image,
    transmission: car.transmission || car.specifications?.transmission || 'Automatic',
    fuel: car.fuel || car.fuelType || 'Petrol',
    seats: car.seats || car.seatingCapacity || 5,
    address: car.address || car.city || '',
    cityId,
    placeId: car.placeId || null,
    geohash: car.geohash || '',
    rating: car.rating || 4.5,
    totalReviews: car.totalReviews || 0,
  };
}

export async function apiFetch(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (options.auth !== false) {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${apiUrl}${path.replace(/^\//, '')}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed (${res.status})`);
  }
  return data;
}
