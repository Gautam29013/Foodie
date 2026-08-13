import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'popularity', label: 'Popularity' },
  ];

  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort By';

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-between"
      >
        {currentLabel}
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-1 w-full sm:w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${currentSort === option.value ? 'bg-green-50 text-primary font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;
