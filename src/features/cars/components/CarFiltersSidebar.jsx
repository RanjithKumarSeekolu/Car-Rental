import React from 'react';
import Button from '../../../components/ui/Button';

const CarFiltersSidebar = ({ filters, setFilters, clearFilters, isOpen, onClose }) => {
  const categories = ["Sedan", "SUV", "Luxury", "Hatchback", "Convertible", "Coupe", "Minivan", "Sports Car", "Truck"];
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
      setFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value) }));
  }

  return (
    <div className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex-shrink-0 custom-scrollbar transition-all
        ${isOpen ? 'fixed inset-0 z-50 w-full h-full overflow-y-auto' : 'hidden'} 
        lg:block lg:w-72 lg:sticky lg:top-24 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:inset-auto lg:z-0`}>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
        <div className="flex items-center gap-4">
            <button onClick={clearFilters} className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                Reset
            </button>
            {/* Mobile Close Button */}
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Price Range */}
        <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Price Range</h3>
            <div className="px-2">
                <input 
                    type="range" 
                    min="50" 
                    max="500" 
                    step="10" 
                    value={filters.priceRange || 500}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    <span>$50</span>
                    <span>${filters.priceRange || 500}</span>
                </div>
            </div>
        </div>

        {/* Category */}
        <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Category</h3>
            <div className="space-y-2">
                {categories.map(cat => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={filters.categories?.includes(cat) || false}
                            onChange={() => handleCheckboxChange('categories', cat)}
                            className="w-5 h-5 border-gray-300 dark:border-gray-600 rounded text-indigo-600 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 transition-colors"
                        />
                        <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{cat}</span>
                    </label>
                ))}
            </div>
        </div>

        {/* Transmission */}
        <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Transmission</h3>
            <div className="space-y-2">
                {transmissions.map(type => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={filters.transmissions?.includes(type) || false}
                            onChange={() => handleCheckboxChange('transmissions', type)}
                            className="w-5 h-5 border-gray-300 dark:border-gray-600 rounded text-indigo-600 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 transition-colors"
                        />
                        <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{type}</span>
                    </label>
                ))}
            </div>
        </div>

        {/* Fuel Type */}
        <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Fuel Type</h3>
            <div className="space-y-2">
                {fuels.map(type => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={filters.fuels?.includes(type) || false}
                            onChange={() => handleCheckboxChange('fuels', type)}
                            className="w-5 h-5 border-gray-300 dark:border-gray-600 rounded text-indigo-600 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 transition-colors"
                        />
                        <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{type}</span>
                    </label>
                ))}
            </div>
        </div>

         {/* Seats */}
         <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Seats</h3>
            <div className="space-y-2">
                {seats.map(opt => (
                    <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={filters.seats?.includes(opt) || false}
                            onChange={() => handleCheckboxChange('seats', opt)}
                            className="w-5 h-5 border-gray-300 dark:border-gray-600 rounded text-indigo-600 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 transition-colors"
                        />
                        <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{opt}</span>
                    </label>
                ))}
            </div>
        </div>

        {/* Mobile View: Apply Button (Optional but good UX) */}
        <div className="lg:hidden pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
             <Button variant="primary" className="w-full" onClick={onClose}>
                Show Results
             </Button>
        </div>
      </div>
    </div>
  );
};

export default CarFiltersSidebar;
