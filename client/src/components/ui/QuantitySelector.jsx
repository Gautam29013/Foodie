import React from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = ({ quantity, setQuantity, max = 10 }) => {
  const increment = () => {
    if (quantity < max) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md h-12 w-36">
      <button 
        onClick={decrement}
        className="w-12 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l-md disabled:opacity-30"
        disabled={quantity <= 1}
      >
        <Minus size={18} />
      </button>
      <div className="flex-1 h-full flex items-center justify-center font-bold text-gray-900 border-x border-gray-300 bg-gray-50">
        {quantity}
      </div>
      <button 
        onClick={increment}
        className="w-12 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-r-md disabled:opacity-30"
        disabled={quantity >= max}
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default QuantitySelector;
