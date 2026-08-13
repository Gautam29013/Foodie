import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-green-50 mb-12">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3" 
          alt="Fresh Groceries" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/90 to-transparent"></div>
      </div>
      
      <div className="relative z-10 p-8 md:p-16 max-w-2xl">
        <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs font-bold rounded-full mb-4">
          WEEKEND SPECIAL
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Freshness Delivered <br/>
          <span className="text-primary">Right to Your Door</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-lg">
          Get up to 30% OFF on all fresh fruits and vegetables. Farm-fresh quality guaranteed.
        </p>
        <Link to="/products" className="inline-flex items-center gap-2 btn-primary text-lg px-6 py-3 shadow-lg shadow-primary/30">
          Shop Now <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
