import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCarStore from '../../../store/useCarStore';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadCarImage } from '../../../utils/uploadImage';
import { getLocations } from '../../../services/locations.services';
import PickupMap from '../../../components/Maps/PickupMap';
import AddressAutocomplete from '../../../components/Maps/AddressAutocomplete';
import { haversineKm, MAX_KM_FROM_CITY } from '../../../utils/geo';

const selectClass =
  'w-full h-11 pl-4 pr-10 py-0 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-sm)] text-base leading-[2.75rem] text-[var(--ink)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all disabled:bg-[var(--bg)] disabled:text-[var(--muted)] disabled:cursor-not-allowed';

const SelectChevron = () => (
  <svg
    aria-hidden
    viewBox="0 0 20 20"
    fill="currentColor"
    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const HostCarForm = () => {
  const { addCar, loading: storeLoading } = useCarStore();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [listedCarId, setListedCarId] = useState(null);
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    category: 'Sports',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: '5',
    price_per_day: '',
    address: '',
    cityId: '',
    city: '',
    state: '',
    lat: null,
    lng: null,
    image_url: '',
    description: ''
  });

  useEffect(() => {
    getLocations().then(setLocations).catch(() => setLocations([]));
  }, []);

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    const loc = locations.find((l) => l.id === cityId);
    setFormData((prev) => ({
      ...prev,
      cityId,
      city: loc?.name || '',
      state: loc?.state || prev.state,
      lat: null,
      lng: null,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image_url;
    return await uploadCarImage(imageFile);
  };

  const validateStep = (step) => {
    setError('');

    if (step === 1) {
      if (!formData.make || !formData.model || !formData.year || !formData.category || !formData.transmission || !formData.fuel || !formData.seats) {
        setError('Please fill in all car details.');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.price_per_day || !formData.address || !formData.cityId) {
        setError('Please fill in price, address, and city.');
        return false;
      }
      if (!Number.isFinite(formData.lat) || !Number.isFinite(formData.lng)) {
        setError('Click the map to set the exact pickup pin.');
        return false;
      }
      const loc = locations.find((l) => l.id === formData.cityId);
      if (loc?.center) {
        const km = haversineKm(
          { lat: formData.lat, lng: formData.lng },
          { lat: loc.center.lat, lng: loc.center.lng }
        );
        if (km > MAX_KM_FROM_CITY) {
          setError(`That pin is too far from ${loc.name}. Stay in this city, or pick another city.`);
          return false;
        }
      }
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.description || (!formData.image_url && !imageFile)) {
        setError('Please provide a description and an image.');
        setLoading(false);
        return;
      }

      let imageUrl = formData.image_url;
      if (imageFile) {
        imageUrl = await uploadImage();
      }
      if (!imageUrl || imageUrl.startsWith('blob:')) {
        setError('Could not save the photo. Try a JPEG or PNG and list again.');
        setLoading(false);
        return;
      }

      const selected = locations.find((l) => l.id === formData.cityId);
      const carData = {
        ...formData,
        image_url: imageUrl,
        available: true,
        rating: 4.5,
        totalReviews: 0,
        createdAt: new Date().toISOString(),
        brand: formData.make,
        cityId: formData.cityId,
        city: formData.city,
        state: formData.state || selected?.state || '',
        location: { latitude: formData.lat, longitude: formData.lng },
        placeId: null,
        isActive: true,
      };

      const result = await addCar(carData);

      if (result.success) {
        setSuccess('Your car has been successfully listed!');
        setListedCarId(result.car?.id || null);
        setFormData({
          make: '', model: '', year: '', category: 'Sports', transmission: 'Automatic',
          fuel: 'Petrol', seats: '5', price_per_day: '', address: '', cityId: '',
          city: '', state: '', lat: null, lng: null, image_url: '', description: ''
        });
        setImageFile(null);
        setCurrentStep(1);
      } else {
        setError(result.error || 'Failed to list car. Please try again.');
      }
    } catch (err) {
      setError('Failed to upload image or submit form: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const SelectInput = ({ label, name, value, options, disabled }) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium leading-5 text-start text-[var(--muted)]" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={selectClass}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <SelectChevron />
      </div>
    </div>
  );

  const stepTitle = ['Car details', 'Location & pricing', 'Photos & description'][currentStep - 1];

  return (
    <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)]">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 gap-3">
          <h2 className="text-lg font-semibold text-[var(--ink)]">{stepTitle}</h2>
          <span className="text-sm font-medium text-[var(--muted)]">Step {currentStep} of 3</span>
        </div>
        <div className="w-full bg-[var(--bg)] rounded-full h-2">
          <motion.div
            className="bg-[var(--accent)] h-2 rounded-full"
            initial={{ width: '33%' }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-[var(--radius-sm)] mb-6 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-100 text-[var(--success)] px-4 py-3 rounded-[var(--radius-sm)] mb-6 text-sm space-y-2">
          <p className="font-semibold">{success}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/dashboard" className="font-semibold underline hover:no-underline">
              View in dashboard
            </Link>
            {listedCarId && (
              <Link to={`/booking/${listedCarId}`} className="font-semibold underline hover:no-underline">
                Preview listing
              </Link>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="min-h-[400px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Make *" name="make" placeholder="e.g. Toyota" value={formData.make} onChange={handleChange} disabled={loading || storeLoading} />
                <Input label="Model *" name="model" placeholder="e.g. Camry" value={formData.model} onChange={handleChange} disabled={loading || storeLoading} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Year *" name="year" type="number" placeholder="e.g. 2023" value={formData.year} onChange={handleChange} disabled={loading || storeLoading} />
                <SelectInput
                  label="Category *"
                  name="category"
                  value={formData.category}
                  options={['Sports', 'SUV', 'Sedan', 'Luxury', 'Hatchback', 'Electric', 'Convertible']}
                  disabled={loading || storeLoading}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectInput
                  label="Transmission *"
                  name="transmission"
                  value={formData.transmission}
                  options={['Automatic', 'Manual']}
                  disabled={loading || storeLoading}
                />
                <SelectInput
                  label="Fuel type *"
                  name="fuel"
                  value={formData.fuel}
                  options={['Petrol', 'Diesel', 'Electric', 'Hybrid']}
                  disabled={loading || storeLoading}
                />
                <Input label="Seats *" name="seats" type="number" placeholder="e.g. 5" value={formData.seats} onChange={handleChange} disabled={loading || storeLoading} />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input label="Price per day (₹) *" name="price_per_day" type="number" placeholder="e.g. 2500" value={formData.price_per_day} onChange={handleChange} disabled={loading || storeLoading} />
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Guests pay this rate. RentNHost keeps 15% of each booking; you receive the rest.
                  </p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-sm font-medium leading-5 text-start text-[var(--muted)]" htmlFor="cityId">
                    City *
                  </label>
                  <div className="relative">
                    <select
                      id="cityId"
                      name="cityId"
                      value={formData.cityId}
                      onChange={handleCityChange}
                      disabled={loading || storeLoading}
                      className={selectClass}
                      required
                    >
                      <option value="" disabled>Select city</option>
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name}{loc.state ? `, ${loc.state}` : ''}
                        </option>
                      ))}
                    </select>
                    <SelectChevron />
                  </div>
                </div>
              </div>
              {formData.state && (
                <p className="text-sm text-[var(--muted)]">State: <span className="font-medium text-[var(--ink)]">{formData.state}</span></p>
              )}
              <AddressAutocomplete
                city={locations.find((l) => l.id === formData.cityId)}
                value={formData.address}
                disabled={loading || storeLoading}
                onChange={({ address, lat, lng }) =>
                  setFormData((prev) => ({
                    ...prev,
                    address,
                    ...(Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : {}),
                  }))
                }
              />
              <PickupMap
                city={locations.find((l) => l.id === formData.cityId)}
                lat={formData.lat}
                lng={formData.lng}
                address={formData.address}
                onPin={({ lat, lng }) => setFormData((prev) => ({ ...prev, lat, lng }))}
                onAddress={(line) =>
                  setFormData((prev) => (prev.address?.trim() ? prev : { ...prev, address: line }))
                }
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-start text-[var(--muted)]">Car image *</label>
                <div className="border-2 border-dashed border-[var(--line)] rounded-[var(--radius)] p-6 text-center hover:bg-[var(--bg)] transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={loading || storeLoading}
                  />
                  {imageFile ? (
                    <div className="text-[var(--success)] font-medium flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      {imageFile.name}
                    </div>
                  ) : (
                    <div className="text-[var(--muted)]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <p>Click to upload or drag and drop</p>
                      <p className="text-xs mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-start text-[var(--muted)]">Description *</label>
                <textarea
                  name="description"
                  className="w-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] rounded-[var(--radius-sm)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all placeholder:text-[var(--muted)]/60"
                  placeholder="Tell renters why they should choose your car..."
                  value={formData.description}
                  onChange={handleChange}
                  disabled={loading || storeLoading}
                  rows={4}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between gap-4 mt-8 pt-4 border-t border-[var(--line)]">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={loading || storeLoading}
              className="w-full"
            >
              Back
            </Button>
          ) : (
            <div className="w-full" />
          )}

          {currentStep < 3 ? (
            <Button type="button" variant="accent" onClick={nextStep} className="w-full">
              Next step
            </Button>
          ) : (
            <Button
              type="submit"
              variant="accent"
              className="w-full"
              disabled={loading || storeLoading}
            >
              {loading || storeLoading ? 'Listing car...' : 'Complete listing'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HostCarForm;
