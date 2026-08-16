import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import ProductCard from '../components/ui/ProductCard';
import { mockProducts } from '../data/mockProducts';

const Home = () => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <HeroBanner />
      
      {/* Category Quick Links */}
      <section className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Fruits', 'Vegetables', 'Dairy', 'Staples', 'Snacks', 'Beverages'].map((cat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group hover-float">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <span className="text-primary text-xl font-bold">{cat[0]}</span>
              </div>
              <span className="font-medium text-gray-700 group-hover:text-primary transition-colors text-sm">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Deals / Fresh Produce */}
      <section className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Fresh Deals of the Day</h2>
          <a href="#" className="text-primary font-medium hover:underline text-sm">View All</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {mockProducts.slice(0, 10).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Foodie Banner */}
      <section className="bg-white rounded-2xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {[
          { title: 'Fresh Products', desc: 'Direct from farms' },
          { title: 'Fast Delivery', desc: 'Under 30 minutes' },
          { title: 'Secure Payments', desc: '100% safe checkout' },
          { title: 'Easy Returns', desc: 'No questions asked' },
        ].map((feat, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
              <span className="text-primary text-lg font-bold">✓</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{feat.title}</h3>
            <p className="text-sm text-gray-500">{feat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
