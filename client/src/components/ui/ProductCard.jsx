import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../redux/wishlistSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items) || [];
  
  // Demo placeholder data if product prop is missing
  const data = product || {
    _id: '1',
    name: 'Fresh Red Apples',
    category: { name: 'Fruits' },
    weight: 1,
    unit: 'kg',
    price: 149,
    mrp: 199,
    discount: 25,
    averageRating: 4.5,
    numOfReviews: 128,
    images: [{ url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fb6c?auto=format&fit=crop&w=500&q=80' }]
  };

  const isInWishlist = wishlistItems.some(item => item._id === data._id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(data));
    if (isInWishlist) {
      toast.error('Removed from wishlist', { icon: '💔' });
    } else {
      toast.success('Added to wishlist', { icon: '❤️' });
    }
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-100 p-4 transition-all duration-300 relative flex flex-col h-full hover-float">
      {/* Discount Badge */}
      {data.discount > 0 && (
        <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          {data.discount}% OFF
        </div>
      )}
      
      {/* Wishlist Button */}
      <button 
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-10 transition-colors p-1.5 rounded-full hover:bg-white 
        ${isInWishlist ? 'text-red-500 bg-white shadow-sm' : 'text-gray-300 bg-white/80 hover:text-red-500'}`}
      >
        <Heart size={18} className={isInWishlist ? 'fill-red-500' : ''} />
      </button>
      
      {/* Image */}
      <Link to={`/product/${data._id}`} className="block relative aspect-square overflow-hidden rounded-lg mb-4 flex-shrink-0 bg-gray-50">
        <img 
          src={data.images[0]?.url} 
          alt={data.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1">{data.category.name}</div>
        <Link to={`/product/${data._id}`}>
          <h3 className="font-bold text-gray-900 leading-tight mb-1 line-clamp-2 hover:text-primary transition-colors">
            {data.name}
          </h3>
        </Link>
        <div className="text-sm text-gray-500 mb-2">
          {data.weight} {data.unit}
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-gray-700">{data.averageRating}</span>
          <span className="text-xs text-gray-400">({data.numOfReviews})</span>
        </div>
        
        {/* Bottom Section (Price & Action) */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-gray-900">₹{data.price}</span>
              {data.mrp > data.price && (
                <span className="text-sm text-gray-400 line-through">₹{data.mrp}</span>
              )}
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: 'cart/addToCart', payload: { ...data, qty: 1 } });
              toast.success('Added to cart');
            }}
            className="bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
