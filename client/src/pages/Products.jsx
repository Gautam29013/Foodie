import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import FilterSidebar from '../components/products/FilterSidebar';
import SortDropdown from '../components/products/SortDropdown';
import { mockProducts } from '../data/mockProducts';

const Products = () => {
  const { category } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const isOffersOnly = searchParams.get('offers') === 'true';
  
  const [currentSort, setCurrentSort] = useState('newest');

  // Filtering based on URL parameters and search query
  let displayedProducts = category 
    ? mockProducts.filter(p => p.category.name.toLowerCase() === category.toLowerCase())
    : mockProducts;
    
  if (isOffersOnly) {
    displayedProducts = displayedProducts.filter(p => p.discount > 0);
  }
    
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    displayedProducts = displayedProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.name.toLowerCase().includes(query)
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home / Products {category ? `/ ${category.charAt(0).toUpperCase() + category.slice(1)}` : isOffersOnly ? '/ Offers' : ''}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4 hidden md:block">
          <FilterSidebar />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {isOffersOnly ? 'Special Offers' : category ? `${category} Products` : 'All Products'} 
              <span className="text-sm font-normal text-gray-500 ml-2">({displayedProducts.length} items)</span>
            </h1>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-gray-500 hidden sm:inline">Sort By:</span>
              <SortDropdown currentSort={currentSort} onSortChange={setCurrentSort} />
            </div>
          </div>

          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl py-20 border border-gray-100">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 text-center max-w-md">
                We couldn't find any products matching your current filters. Try adjusting them or browsing other categories.
              </p>
            </div>
          )}

          {/* Simple Pagination Placeholder */}
          {displayedProducts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex gap-1">
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">«</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-primary bg-primary text-white font-bold">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">3</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">»</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
