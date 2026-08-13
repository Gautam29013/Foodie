import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, MapPin } from 'lucide-react';
import QuantitySelector from '../components/ui/QuantitySelector';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Temporary mock data
  const product = {
    _id: id || '1',
    name: 'Fresh Red Apples - Premium Quality',
    description: 'Crisp, sweet, and juicy red apples sourced directly from the finest orchards in Kashmir. Perfect for healthy snacking, baking, or adding to your daily fruit bowl. High in fiber and Vitamin C.',
    category: { name: 'Fruits' },
    weight: 1,
    unit: 'kg',
    price: 149,
    mrp: 199,
    discount: 25,
    stock: 50,
    averageRating: 4.5,
    numOfReviews: 128,
    images: [
      { url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fb6c?auto=format&fit=crop&w=800&q=80' },
      { url: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80' },
      { url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80' }
    ],
    specifications: [
      { key: 'Brand', value: 'Foodie Fresh' },
      { key: 'Type', value: 'Red Delicious' },
      { key: 'Origin', value: 'Kashmir, India' },
      { key: 'Shelf Life', value: '7-10 days' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary">Home</Link> / 
        <Link to="/products" className="hover:text-primary"> Products</Link> / 
        <Link to={`/products/${product.category.name.toLowerCase()}`} className="hover:text-primary"> {product.category.name}</Link> / 
        <span className="text-gray-900"> {product.name}</span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 mb-12 shadow-sm flex flex-col md:flex-row gap-12">
        
        {/* LEFT: Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-secondary text-white text-sm font-bold px-3 py-1 rounded-md z-10 shadow-md">
                {product.discount}% OFF
              </div>
            )}
            <img 
              src={product.images[activeImage]?.url} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-colors ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
              >
                <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Ratings */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
              <span className="text-sm font-bold text-primary">{product.averageRating}</span>
              <Star size={14} className="fill-primary text-primary" />
            </div>
            <span className="text-sm text-primary font-medium hover:underline cursor-pointer">
              {product.numOfReviews} Ratings & Reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
            <span className="text-4xl font-extrabold text-gray-900">₹{product.price}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-lg text-gray-500 line-through mb-1">₹{product.mrp}</span>
                <span className="text-sm font-bold text-secondary mb-1">Save ₹{product.mrp - product.price}</span>
              </>
            )}
          </div>

          {/* Variant / Weight */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Quantity Selection</h3>
            <div className="inline-block border-2 border-primary bg-green-50 text-primary px-4 py-2 rounded-lg font-bold shadow-sm">
              {product.weight} {product.unit}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={product.stock} />
            <button className="flex-1 btn-primary flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/30 h-12">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="h-12 w-12 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors flex-shrink-0">
              <Heart size={24} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 mt-auto">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary">
                <ShieldCheck size={20} />
              </div>
              <span className="text-xs font-medium text-gray-600">Top Quality</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary">
                <Truck size={20} />
              </div>
              <span className="text-xs font-medium text-gray-600">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-primary">
                <RotateCcw size={20} />
              </div>
              <span className="text-xs font-medium text-gray-600">Easy Returns</span>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM: Description & Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Product Description</h2>
            <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>
            
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {product.specifications.map((spec, idx) => (
                <div key={idx} className="flex flex-col border-b border-gray-50 pb-2">
                  <span className="text-sm text-gray-500 mb-1">{spec.key}</span>
                  <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar for Delivery Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Delivery & Services</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Check Delivery Availability</p>
                  <div className="flex mt-2 w-full">
                    <input type="text" placeholder="Enter Pincode" className="text-sm border border-gray-300 rounded-l-md px-3 py-2 flex-1 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full" />
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md text-sm font-bold hover:bg-black transition-colors">Check</button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-4 border-t border-gray-200">
                <Truck size={20} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Standard Delivery</p>
                  <p className="text-xs text-gray-500">Delivered within 30-45 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
