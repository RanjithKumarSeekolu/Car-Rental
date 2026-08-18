import React from 'react';
import Button from '../../../components/ui/Button';

const CarFiltersSidebar = ({ filters, setFilters, clearFilters, isOpen, onClose }) => {
  const categories = ["Sedan", "SUV", "Luxury", "Hatchback", "Convertible", "Coupe", "Minivan", "Sports", "Sports Car", "Truck"];
  const transmissions = ["Manual", "Automatic"];
  const fuels = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const seats = ["2-4 seats", "5 seats", "7+ seats"];

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const currentValues = prev[category] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value, 10) }));
  };

  const checkboxClass =
    "w-5 h-5 rounded border-[var(--line)] text-[var(--accent)] focus:ring-[var(--accent)] bg-[var(--surface)] accent-[var(--accent)]";

  return (
    <div
      className={`bg-[var(--surface)] p-6 rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)] flex-shrink-0 custom-scrollbar transition-all
        ${isOpen ? 'fixed inset-0 z-50 w-full h-full overflow-y-auto' : 'hidden'}
        lg:block lg:w-72 lg:sticky lg:top-24 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:inset-auto lg:z-0`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-[var(--ink)]">Filters</h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-[var(--accent)] font-semibold hover:underline"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-[var(--muted)] hover:text-[var(--ink)]"
            aria-label="Close filters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="font-semibold text-[var(--ink)] mb-4">Price range</h3>
          <div className="px-1">
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={filters.priceRange || 20000}
              onChange={handlePriceChange}
              className="w-full h-2 bg-[var(--bg)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
            />
            <div className="flex justify-between mt-2 text-sm text-[var(--muted)] font-medium">
              <span>₹500</span>
              <span>Up to ₹{(filters.priceRange || 20000).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--ink)] mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(cat) || false}
                  onChange={() => handleCheckboxChange('categories', cat)}
                  className={checkboxClass}
                />
                <span className="text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--ink)] mb-3">Transmission</h3>
          <div className="space-y-2">
            {transmissions.map((type) => (
              <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.transmissions?.includes(type) || false}
                  onChange={() => handleCheckboxChange('transmissions', type)}
                  className={checkboxClass}
                />
                <span className="text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--ink)] mb-3">Fuel type</h3>
          <div className="space-y-2">
            {fuels.map((type) => (
              <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.fuels?.includes(type) || false}
                  onChange={() => handleCheckboxChange('fuels', type)}
                  className={checkboxClass}
                />
                <span className="text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--ink)] mb-3">Seats</h3>
          <div className="space-y-2">
            {seats.map((opt) => (
              <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.seats?.includes(opt) || false}
                  onChange={() => handleCheckboxChange('seats', opt)}
                  className={checkboxClass}
                />
                <span className="text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="lg:hidden pt-6 mt-6 border-t border-[var(--line)]">
          <Button variant="accent" className="w-full" onClick={onClose}>
            Show results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarFiltersSidebar;
