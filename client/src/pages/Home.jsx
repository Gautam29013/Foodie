import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import ProductCard from '../components/ui/ProductCard';

const Home = () => {
  // Temporary mock data for UI visual check
  const mockProducts = [
    { _id: '1', name: 'Fresh Red Apples', category: { name: 'Fruits' }, weight: 1, unit: 'kg', price: 149, mrp: 199, discount: 25, averageRating: 4.5, numOfReviews: 128, images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Apples.jpg/512px-Apples.jpg' }] },
    { _id: '2', name: 'Organic Bananas', category: { name: 'Fruits' }, weight: 1, unit: 'dozen', price: 60, mrp: 80, discount: 25, averageRating: 4.8, numOfReviews: 245, images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/512px-Bananas_white_background_DS.jpg' }] },
    { _id: '3', name: 'Fresh Tomatoes', category: { name: 'Vegetables' }, weight: 500, unit: 'g', price: 40, mrp: 50, discount: 20, averageRating: 4.2, numOfReviews: 89, images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/512px-Tomato_je.jpg' }] },
    { _id: '4', name: 'Farm Eggs', category: { name: 'Dairy' }, weight: 6, unit: 'pieces', price: 55, mrp: 60, discount: 8, averageRating: 4.6, numOfReviews: 156, images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Chicken_egg_2009-06-04.jpg/512px-Chicken_egg_2009-06-04.jpg' }] },
    { _id: '5', name: 'Whole Wheat Atta', category: { name: 'Staples' }, weight: 5, unit: 'kg', price: 210, mrp: 250, discount: 16, averageRating: 4.7, numOfReviews: 512, images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flour_in_a_jar.jpg/512px-Flour_in_a_jar.jpg' }] },
    { _id: '6', name: 'Classic Potato Chips', category: { name: 'Snacks' }, weight: 150, unit: 'g', price: 50, mrp: 50, discount: 0, averageRating: 4.4, numOfReviews: 88, images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Potato-Chips.jpg/512px-Potato-Chips.jpg' }] },
    { _id: '7', name: 'Spicy Bombay Mix', category: { name: 'Snacks' }, weight: 400, unit: 'g', price: 85, mrp: 110, discount: 22, averageRating: 4.9, numOfReviews: 320, images: [{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bombay_mix.jpg/512px-Bombay_mix.jpg' }] },
  ];

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
          {mockProducts.map((product) => (
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
