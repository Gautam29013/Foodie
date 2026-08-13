import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import QuantitySelector from '../ui/QuantitySelector';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-5 border-b border-gray-100 gap-4">
      {/* Image */}
      <Link to={`/product/${item._id}`} className="w-24 h-24 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 bg-gray-50">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </Link>
      
      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-900 hover:text-primary transition-colors line-clamp-1">
          {item.name}
        </Link>
        <div className="text-sm text-gray-500 mb-2">{item.weight} {item.unit}</div>
        <div className="text-lg font-bold text-gray-900">₹{item.price}</div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-6 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
        <QuantitySelector 
          quantity={item.qty} 
          setQuantity={(newQty) => updateQuantity(item, newQty)} 
          max={item.stock} 
        />
        <div className="w-24 text-right font-extrabold text-lg text-gray-900 hidden sm:block">
          ₹{(item.price * item.qty).toFixed(2)}
        </div>
        <button 
          onClick={() => removeItem(item._id)}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
          title="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
