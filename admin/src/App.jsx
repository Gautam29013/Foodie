import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

// Placeholders for inner pages
const Placeholder = ({ title }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
    <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center h-64 text-gray-400">
      <div className="text-4xl mb-4">🚧</div>
      <p className="font-medium text-gray-600">{title} Management Interface</p>
      <p className="text-sm text-gray-400 mt-2">This section will be fully implemented when connected to the backend APIs.</p>
    </div>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // FIX: The old approach used a cross-origin fetch('/api/auth/me') with cookie
    // credentials. This ALWAYS fails between different ports (5173 client →
    // 5174 admin → 5001 server) because browsers block SameSite=lax cookies
    // in cross-origin redirects.
    //
    // Solution: read from localStorage['userInfo'], which the Login page already
    // stores on successful login. This is instant and works across ports.
    try {
      // Check for userInfo in URL (from cross-origin login redirect)
      const params = new URLSearchParams(window.location.search);
      const urlUserInfo = params.get('userInfo');
      if (urlUserInfo) {
        localStorage.setItem('userInfo', urlUserInfo);
        // Remove from URL without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      const stored = localStorage.getItem('userInfo');
      if (stored) {
        const user = JSON.parse(stored);
        if (user && user.role === 'ADMIN') {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      // Corrupt localStorage — fall through to redirect
    }

    // Not logged in or not an admin → send them to the login page
    setIsLoading(false);
    window.location.href = 'http://localhost:5173/login';
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null; // Prevent flash before redirect

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="ml-64 flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Placeholder title="Categories" />} />
              <Route path="/orders" element={<Placeholder title="Orders" />} />
              <Route path="/customers" element={<Placeholder title="Customers" />} />
              <Route path="/coupons" element={<Placeholder title="Coupons" />} />
              <Route path="/reviews" element={<Placeholder title="Reviews" />} />
              <Route path="/settings" element={<Placeholder title="Settings" />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
