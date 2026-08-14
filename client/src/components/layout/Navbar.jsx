import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, MapPin, Menu, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="bg-background shadow-sm sticky top-0 z-50 border-b border-border transition-colors duration-200">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-xs text-center py-1.5 font-medium">
        Fresh groceries delivered to your doorstep in 30 minutes!
      </div>
      
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-foreground">FOODIE</span>
            </Link>
          </div>

          {/* Location - Desktop Only */}
          <div className="hidden md:flex items-center gap-1 text-sm text-gray-600 ml-6 cursor-pointer hover:text-primary transition-colors">
            <MapPin size={18} />
            <span>Deliver to <b className="text-foreground">Mumbai 400001</b></span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-6 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                placeholder="Search for fresh fruits, vegetables and more..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6 text-foreground">
            <button 
              onClick={toggleTheme} 
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex flex-col items-center gap-1"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
              <span className="text-[10px] font-medium hidden md:block">Theme</span>
            </button>

            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex flex-col items-center gap-1">
              <User size={22} />
              <span className="text-[10px] font-medium hidden md:block">Login</span>
            </Link>
            
            <Link to="/wishlist" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex flex-col items-center gap-1 relative">
              <Heart size={22} />
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
              <span className="text-[10px] font-medium hidden md:block">Wishlist</span>
            </Link>
            
            <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex flex-col items-center gap-1 relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
              <span className="text-[10px] font-medium hidden md:block">Cart</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search groceries..."
            />
          </div>
        </div>
      </div>
      
      {/* Category Nav - Desktop */}
      <div className="bg-gray-50 dark:bg-card border-y border-gray-100 dark:border-border hidden md:block transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
          <button className="flex items-center gap-2 bg-primary text-white px-4 h-full">
            <Menu size={18} />
            All Categories
          </button>
          <div className="flex gap-6">
            <Link to="/products/fruits" className="hover:text-primary transition-colors">Fresh Fruits</Link>
            <Link to="/products/vegetables" className="hover:text-primary transition-colors">Vegetables</Link>
            <Link to="/products/dairy" className="hover:text-primary transition-colors">Dairy & Eggs</Link>
            <Link to="/products/staples" className="hover:text-primary transition-colors">Grocery & Staples</Link>
            <Link to="/products/snacks" className="hover:text-primary transition-colors">Snacks</Link>
            <Link to="/products/beverages" className="hover:text-primary transition-colors">Beverages</Link>
          </div>
          <div className="text-secondary font-bold">
            Offers zone
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
