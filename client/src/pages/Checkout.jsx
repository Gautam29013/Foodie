import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, CreditCard, MapPin, Truck, ChevronRight } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Online Payment');
  
  // Mock Cart Data
  const cartItems = [
    { _id: '1', name: 'Fresh Red Apples', price: 149, qty: 2, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fb6c?auto=format&fit=crop&w=500&q=60' },
    { _id: '5', name: 'Whole Wheat Atta', price: 210, qty: 1, image: 'https://images.unsplash.com/photo-1627485937980-221c88ce04ea?auto=format&fit=crop&w=500&q=60' },
  ];
  
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = itemsPrice > 500 ? 0 : 40;
  const totalAmount = itemsPrice + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In real app, this dispatches createOrder action
    setStep(4); // Move to Success Step
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
          <div className="absolute left-0 top-1/2 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${(step - 1) * 33.33}%` }}></div>
          
          {[
            { num: 1, label: 'Address', icon: <MapPin size={18} /> },
            { num: 2, label: 'Delivery', icon: <Truck size={18} /> },
            { num: 3, label: 'Payment', icon: <CreditCard size={18} /> },
            { num: 4, label: 'Done', icon: <CheckCircle2 size={18} /> }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-background px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= s.num ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                {s.icon}
              </div>
              <span className={`text-xs font-bold ${step >= s.num ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {step === 4 ? (
        // SUCCESS STEP
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={48} className="text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8 max-w-md">Thank you for shopping with FOODIE. Your order #FD10948 has been confirmed and will be delivered shortly.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/orders')} className="btn-primary px-8">Track Order</button>
            <button onClick={() => navigate('/')} className="btn-secondary px-8 bg-gray-100 text-gray-900 hover:bg-gray-200">Continue Shopping</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left Side: Forms */}
          <div className="w-full lg:w-2/3">
            
            {/* STEP 1: ADDRESS */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none" defaultValue="Rahul Sharma" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none" defaultValue="+91 9876543210" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">House No. / Building Name</label>
                      <input type="text" required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none" defaultValue="A-102, Sunshine Apartments" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street / Area</label>
                      <input type="text" required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none" defaultValue="Andheri West" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input type="text" required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none" defaultValue="Mumbai" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input type="text" required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none" defaultValue="Maharashtra" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input type="text" required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none" defaultValue="400053" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                      <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none">
                        <option>Home</option>
                        <option>Work</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-8 border-t border-gray-100 pt-6">
                    <button type="submit" className="btn-primary flex items-center gap-2 px-8 py-3 text-lg">
                      Continue to Delivery <ChevronRight size={20} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2: DELIVERY */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Method</h2>
                
                <div className="space-y-4">
                  <label className="flex items-start p-4 border border-primary bg-green-50 rounded-lg cursor-pointer">
                    <input type="radio" name="delivery" defaultChecked className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300" />
                    <div className="ml-3">
                      <span className="block text-sm font-bold text-gray-900">Standard Delivery (30-45 mins)</span>
                      <span className="block text-sm text-gray-500 mt-1">Our delivery partner will bring your fresh groceries right to your door.</span>
                    </div>
                  </label>
                  
                  <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                    <input type="radio" name="delivery" disabled className="mt-1 w-4 h-4" />
                    <div className="ml-3">
                      <span className="block text-sm font-bold text-gray-900">Schedule Delivery (Coming Soon)</span>
                      <span className="block text-sm text-gray-500 mt-1">Pick a specific time slot for tomorrow.</span>
                    </div>
                  </label>
                </div>

                <div className="flex justify-between mt-8 border-t border-gray-100 pt-6">
                  <button onClick={() => setStep(1)} className="text-gray-600 font-medium hover:text-primary transition-colors">
                    Back to Address
                  </button>
                  <button onClick={() => setStep(3)} className="btn-primary flex items-center gap-2 px-8 py-3 text-lg">
                    Continue to Payment <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <form onSubmit={handlePlaceOrder}>
                  <div className="space-y-4 mb-8">
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Online Payment' ? 'border-primary bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="Online Payment"
                        checked={paymentMethod === 'Online Payment'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300" 
                      />
                      <span className="ml-3 text-sm font-bold text-gray-900">Credit / Debit Card / UPI</span>
                      <div className="ml-auto flex gap-2">
                        <div className="w-8 h-5 bg-blue-100 rounded flex items-center justify-center text-[10px] font-bold text-blue-800">UPI</div>
                        <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                      </div>
                    </label>

                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Cash on Delivery' ? 'border-primary bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="Cash on Delivery"
                        checked={paymentMethod === 'Cash on Delivery'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300" 
                      />
                      <span className="ml-3 text-sm font-bold text-gray-900">Cash on Delivery (COD)</span>
                    </label>
                  </div>

                  <div className="flex justify-between mt-8 border-t border-gray-100 pt-6">
                    <button type="button" onClick={() => setStep(2)} className="text-gray-600 font-medium hover:text-primary transition-colors">
                      Back to Delivery
                    </button>
                    <button type="submit" className="btn-primary flex items-center gap-2 px-8 py-3 text-lg shadow-lg shadow-primary/30">
                      Place Order <ChevronRight size={20} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-md bg-gray-50 border border-gray-200 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                      <div className="text-xs text-gray-500">Qty: {item.qty}</div>
                      <div className="text-sm font-bold text-gray-900 mt-1">₹{item.price * item.qty}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-900">₹{itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-bold text-gray-900">₹{deliveryFee.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-extrabold text-primary">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
