import React from 'react';

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  selectedBrand,
  setSelectedBrand,
  brands
}) => {
  const selectClass =
    "block w-full pl-3 pr-10 py-2.5 text-sm border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded-[var(--radius-sm)] bg-[var(--surface)] text-[var(--ink)] h-[42px] min-w-[150px]";

  return (
    <div className="bg-[var(--surface)] p-4 rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)] mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-[var(--muted)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-[var(--line)] rounded-[var(--radius-sm)] bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-sm"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className={selectClass}
          >
            <option value="">All brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={selectClass}
          >
            <option value="">Sort by</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
