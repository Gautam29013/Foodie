import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Grid, ShoppingBag, Users, Tag, MessageSquare, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/products', name: 'Products', icon: <Package size={20} /> },
    { path: '/categories', name: 'Categories', icon: <Grid size={20} /> },
    { path: '/orders', name: 'Orders', icon: <ShoppingBag size={20} /> },
    { path: '/customers', name: 'Customers', icon: <Users size={20} /> },
    { path: '/coupons', name: 'Coupons', icon: <Tag size={20} /> },
    { path: '/reviews', name: 'Reviews', icon: <MessageSquare size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-20">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 flex-shrink-0">
        <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center mr-2">
          <span className="text-white font-bold text-xl">F</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">FOODIE Admin</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-primary' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <button className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
