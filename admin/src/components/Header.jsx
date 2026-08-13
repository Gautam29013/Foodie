import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center w-full max-w-md relative">
        <Search size={18} className="absolute left-3 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search products, orders, customers..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>
      
      <div className="flex items-center gap-6 ml-4">
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer hover:bg-gray-50 p-1 pr-3 rounded-full transition-colors">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900 leading-none">Admin User</p>
            <p className="text-xs text-gray-500 mt-1">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
