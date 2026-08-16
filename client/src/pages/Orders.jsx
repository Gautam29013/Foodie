import React from 'react';
import { Package, Clock, CheckCircle2, ChevronRight, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  // Mock recent order data
  const recentOrders = [
    {
      id: 'FD10948',
      date: 'Aug 16, 2026, 03:45 PM',
      total: 508,
      status: 'Out for Delivery',
      items: [
        { name: 'Fresh Red Apples', qty: 2 },
        { name: 'Whole Wheat Atta', qty: 1 }
      ],
      progress: 3 // 1: Placed, 2: Packed, 3: Out for Delivery, 4: Delivered
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <h1 className="text-2xl font-bold text-foreground mb-8">My Orders</h1>

      {recentOrders.length > 0 ? (
        <div className="space-y-6">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 pb-6 border-b border-border gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-foreground text-lg">Order #{order.id}</span>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs font-bold">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock size={14} /> Placed on {order.date}
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                  <div className="font-bold text-foreground text-xl">₹{order.total}</div>
                </div>
              </div>

              {/* Status Tracking */}
              <div className="mb-8 px-2 sm:px-8">
                <div className="relative">
                  <div className="absolute left-0 top-1/2 w-full h-1 bg-muted -z-10 -translate-y-1/2"></div>
                  <div className="absolute left-0 top-1/2 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${(order.progress - 1) * 33.33}%` }}></div>
                  
                  <div className="flex justify-between">
                    {[
                      { step: 1, label: 'Order Placed', icon: <Package size={16} /> },
                      { step: 2, label: 'Packed', icon: <CheckCircle2 size={16} /> },
                      { step: 3, label: 'Out for Delivery', icon: <Truck size={16} /> },
                      { step: 4, label: 'Delivered', icon: <CheckCircle2 size={16} /> }
                    ].map((s) => (
                      <div key={s.step} className="flex flex-col items-center gap-2 bg-card px-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${order.progress >= s.step ? 'bg-primary border-primary text-white' : 'bg-background border-border text-muted-foreground'}`}>
                          {s.icon}
                        </div>
                        <span className={`text-[10px] sm:text-xs font-bold hidden sm:block ${order.progress >= s.step ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-muted/30 rounded-xl p-4">
                <h4 className="text-sm font-bold text-foreground mb-3">Items in this order:</h4>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {order.items.map((item, i) => (
                    <span key={i} className="bg-background px-3 py-1 rounded-md border border-border">
                      {item.qty}x {item.name}
                    </span>
                  ))}
                  <span className="bg-background px-3 py-1 rounded-md border border-border font-medium cursor-pointer hover:text-primary hover:border-primary transition-colors">
                    + View Details
                  </span>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border border-border">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={40} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">No active orders</h2>
          <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
          <Link to="/" className="btn-primary px-8">Start Shopping</Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
