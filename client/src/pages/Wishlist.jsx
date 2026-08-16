import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ui/ProductCard';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items) || [];

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Heart size={48} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Save items you want to buy later by clicking the heart icon on any product.</p>
        <Link to="/products" className="btn-primary flex items-center gap-2 px-8 py-3 text-lg">
          Browse Products <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Heart className="text-secondary fill-secondary" /> My Wishlist 
          <span className="text-gray-500 text-lg font-normal">({wishlistItems.length} items)</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
