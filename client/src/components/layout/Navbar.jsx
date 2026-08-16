import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, MapPin, Menu, Sun, Moon, Loader2, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const wishlistItemsCount = useSelector(state => state.wishlist?.items?.length || 0);
  const cartItemsCount = useSelector(state => state.cart?.cartItems?.reduce((acc, item) => acc + (item.qty || 1), 0) || 0);

  // Location states
  const [locationName, setLocationName] = useState('Mumbai 400001');
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Load saved location if any
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setLocationName(savedLocation);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Using OpenStreetMap's free Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          
          const data = await response.json();
          
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.suburb || 'Unknown Location';
            const postcode = data.address.postcode || '';
            const newLocation = postcode ? `${city} ${postcode}` : city;
            
            setLocationName(newLocation);
            localStorage.setItem('userLocation', newLocation);
            toast.success(`Location updated to ${newLocation}`);
          } else {
            toast.error('Could not determine city from location');
          }
        } catch (error) {
          console.error('Error fetching location details:', error);
          toast.error('Failed to get location name');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error('Location permission denied');
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error('Location information is unavailable');
            break;
          case error.TIMEOUT:
            toast.error('Location request timed out');
            break;
          default:
            toast.error('An unknown error occurred getting location');
            break;
        }
      },
      { timeout: 10000 }
    );
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5001/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      });
      localStorage.removeItem('userInfo');
      toast.success('Logged out successfully');
      navigate('/login');
      setTimeout(() => window.location.reload(), 100);
    } catch (error) {
      console.error(error);
      toast.error('Failed to logout');
    }
  };

  // Safely get user info from local storage
  let userInfo = null;
  try {
    const storedInfo = localStorage.getItem('userInfo');
    if (storedInfo && storedInfo !== 'undefined') {
      userInfo = JSON.parse(storedInfo);
    }
  } catch (e) {
    console.error('Failed to parse userInfo', e);
  }

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
          <div 
            onClick={handleGetLocation}
            className="hidden md:flex items-center gap-1 text-sm text-gray-600 ml-6 cursor-pointer hover:text-primary transition-colors group"
            title="Click to fetch current location"
          >
            {isLocating ? (
              <Loader2 size={18} className="animate-spin text-primary" />
            ) : (
              <MapPin size={18} className="group-hover:animate-bounce" />
            )}
            <span>Deliver to <b className="text-foreground">{isLocating ? 'Locating...' : locationName}</b></span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-6 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center focus:outline-none">
                <Search size={18} className="text-gray-400 hover:text-primary transition-colors" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                placeholder="Search for fresh fruits, vegetables and more..."
              />
            </form>
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

            {userInfo ? (
              <>
                <Link to="/settings" className="flex flex-col items-center gap-1">
                  <div className="w-[22px] h-[22px] bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold uppercase overflow-hidden">
                    {userInfo?.profilePicture ? (
                      <img src={userInfo.profilePicture} alt={userInfo.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      userInfo?.name ? userInfo.name.charAt(0) : 'U'
                    )}
                  </div>
                  <span className="text-[10px] font-medium hidden md:block text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Profile</span>
                </Link>
                <button onClick={handleLogout} className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors flex flex-col items-center gap-1 cursor-pointer">
                  <LogOut size={22} />
                  <span className="text-[10px] font-medium hidden md:block">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex flex-col items-center gap-1">
                <User size={22} />
                <span className="text-[10px] font-medium hidden md:block">Login</span>
              </Link>
            )}
            
            <Link to="/wishlist" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex flex-col items-center gap-1 relative">
              <Heart size={22} />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistItemsCount}
                </span>
              )}
              <span className="text-[10px] font-medium hidden md:block">Wishlist</span>
            </Link>
            
            <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex flex-col items-center gap-1 relative">
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
              <span className="text-[10px] font-medium hidden md:block">Cart</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center focus:outline-none">
              <Search size={18} className="text-gray-400 hover:text-primary transition-colors" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search groceries..."
            />
          </form>
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
          <Link to="/products?offers=true" className="text-secondary font-bold hover:underline transition-all cursor-pointer">
            Offers zone
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
