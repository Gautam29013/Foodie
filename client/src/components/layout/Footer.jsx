import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">FOODIE</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Your one-stop destination for fresh groceries, delivered fast right to your doorstep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/products/fruits" className="hover:text-primary transition-colors">Fresh Fruits</Link></li>
              <li><Link to="/products/vegetables" className="hover:text-primary transition-colors">Vegetables</Link></li>
              <li><Link to="/products/dairy" className="hover:text-primary transition-colors">Dairy & Eggs</Link></li>
              <li><Link to="/products/staples" className="hover:text-primary transition-colors">Staples</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Download Our App</h3>
            <p className="text-gray-500 text-sm mb-4">Get access to exclusive offers and a better shopping experience.</p>
            <div className="space-y-2">
              <div className="bg-gray-900 text-white p-2 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                <span className="font-bold text-sm">App Store</span>
              </div>
              <div className="bg-gray-900 text-white p-2 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                <span className="font-bold text-sm">Google Play</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Foodie E-Commerce. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
