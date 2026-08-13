import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  // Using local state to mock Redux state for UI demonstration
  const [cartItems, setCartItems] = useState([
    { _id: '1', name: 'Fresh Red Apples', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fb6c?auto=format&fit=crop&w=500&q=60', price: 149, weight: 1, unit: 'kg', qty: 2, stock: 10 },
    { _id: '5', name: 'Whole Wheat Atta', image: 'https://images.unsplash.com/photo-1627485937980-221c88ce04ea?auto=format&fit=crop&w=500&q=60', price: 210, weight: 5, unit: 'kg', qty: 1, stock: 5 },
  ]);

  const updateQuantity = (item, newQty) => {
    setCartItems(cartItems.map(x => x._id === item._id ? { ...x, qty: newQty } : x));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(x => x._id !== id));
  };

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = itemsPrice > 500 || itemsPrice === 0 ? 0 : 40;
  const discount = 50; // Mock discount
  const totalAmount = itemsPrice + deliveryFee - discount;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty!</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Looks like you haven't added anything to your cart yet. Discover fresh groceries and daily essentials.</p>
        <Link to="/products" className="btn-primary flex items-center gap-2 px-8 py-3 text-lg">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart <span className="text-gray-500 text-lg font-normal">({cartItems.length} items)</span></h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="hidden sm:grid grid-cols-12 text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 pb-4 border-b border-gray-100">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>
            
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center pt-4">
              <Link to="/products" className="text-primary font-bold hover:underline text-sm flex items-center gap-1">
                ← Continue Shopping
              </Link>
              <button 
                onClick={() => setCartItems([])}
                className="text-red-500 text-sm font-bold hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                <span className="font-bold text-gray-900">₹{itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className={deliveryFee === 0 ? "font-bold text-primary" : "font-bold text-gray-900"}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Discount</span>
                <span className="font-bold">-₹{discount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-extrabold text-primary">₹{totalAmount.toFixed(2)}</span>
              </div>
              <p className="text-xs text-green-600 font-medium text-right mt-1">You will save ₹{discount.toFixed(2)} on this order</p>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary py-3.5 text-lg font-bold shadow-lg shadow-primary/30 flex justify-center items-center gap-2 mb-4"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
              <ShieldCheck size={16} className="text-gray-400" />
              <span>Safe and Secure Payments. 100% Authentic products.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
