import React from 'react';
import { Link, useParams } from 'react-router-dom';

const FilterSidebar = () => {
  const { category: currentCategory } = useParams();

  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Staples', 'Snacks', 'Beverages'];
  const discounts = ['10% and above', '20% and above', '30% and above', '50% and above'];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit sticky top-20">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <h2 className="font-bold text-lg">Filters</h2>
        <button className="text-xs text-primary font-medium hover:underline">Clear All</button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Categories</h3>
        <div className="space-y-2">
          <Link 
            to="/products"
            className={`block text-sm ${!currentCategory ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link 
              key={cat} 
              to={`/products/${cat.toLowerCase()}`}
              className={`block text-sm ${currentCategory === cat.toLowerCase() ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Price Range</h3>
        <input type="range" className="w-full accent-primary" min="0" max="2000" />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>₹0</span>
          <span>₹2000+</span>
        </div>
      </div>

      {/* Customer Ratings */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Customer Ratings</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" />
              <span className="text-sm text-gray-600">{rating}★ & above</span>
            </label>
          ))}
        </div>
      </div>

      {/* Discount */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Discount</h3>
        <div className="space-y-2">
          {discounts.map((discount, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="discount" className="text-primary focus:ring-primary w-4 h-4" />
              <span className="text-sm text-gray-600">{discount}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Availability */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" />
          <span className="text-sm font-medium text-gray-700">Include Out of Stock</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
