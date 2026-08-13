import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import FilterSidebar from '../components/products/FilterSidebar';
import SortDropdown from '../components/products/SortDropdown';

const Products = () => {
  const { category } = useParams();
  const [currentSort, setCurrentSort] = useState('newest');

  // Temporary mock data
  const mockProducts = [
    { _id: '1', name: 'Fresh Red Apples', category: { name: 'Fruits' }, weight: 1, unit: 'kg', price: 149, mrp: 199, discount: 25, averageRating: 4.5, numOfReviews: 128, images: [{ url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fb6c?auto=format&fit=crop&w=500&q=60' }] },
    { _id: '2', name: 'Organic Bananas', category: { name: 'Fruits' }, weight: 1, unit: 'dozen', price: 60, mrp: 80, discount: 25, averageRating: 4.8, numOfReviews: 245, images: [{ url: 'https://images.unsplash.com/photo-1571501474588-5a210ff41dcb?auto=format&fit=crop&w=500&q=60' }] },
    { _id: '3', name: 'Fresh Tomatoes', category: { name: 'Vegetables' }, weight: 500, unit: 'g', price: 40, mrp: 50, discount: 20, averageRating: 4.2, numOfReviews: 89, images: [{ url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=60' }] },
    { _id: '4', name: 'Farm Eggs', category: { name: 'Dairy' }, weight: 6, unit: 'pieces', price: 55, mrp: 60, discount: 8, averageRating: 4.6, numOfReviews: 156, images: [{ url: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=500&q=60' }] },
    { _id: '5', name: 'Whole Wheat Atta', category: { name: 'Staples' }, weight: 5, unit: 'kg', price: 210, mrp: 250, discount: 16, averageRating: 4.7, numOfReviews: 512, images: [{ url: 'https://images.unsplash.com/photo-1627485937980-221c88ce04ea?auto=format&fit=crop&w=500&q=60' }] },
    { _id: '6', name: 'Green Cabbage', category: { name: 'Vegetables' }, weight: 1, unit: 'piece', price: 35, mrp: 45, discount: 22, averageRating: 4.1, numOfReviews: 54, images: [{ url: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=500&q=60' }] },
    { _id: '7', name: 'Fresh Milk', category: { name: 'Dairy' }, weight: 1, unit: 'L', price: 65, mrp: 70, discount: 7, averageRating: 4.9, numOfReviews: 840, images: [{ url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=60' }] },
    { _id: '8', name: 'Potato', category: { name: 'Vegetables' }, weight: 1, unit: 'kg', price: 30, mrp: 40, discount: 25, averageRating: 4.4, numOfReviews: 320, images: [{ url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=60' }] },
  ];

  // Simple mock filtering based on URL
  const displayedProducts = category 
    ? mockProducts.filter(p => p.category.name.toLowerCase() === category.toLowerCase())
    : mockProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home / Products {category ? `/ ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''}
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
              {category ? `${category} Products` : 'All Products'} 
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
