import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

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
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // This is crucial to send the HTTP-only jwt cookie
        });

        if (res.ok) {
          const data = await res.json();
          if (data.role === 'ADMIN') {
            setIsAuthenticated(true);
          } else {
            // Logged in but not admin
            window.location.href = 'http://localhost:5173/login';
          }
        } else {
          // Not logged in
          window.location.href = 'http://localhost:5173/login';
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.href = 'http://localhost:5173/login';
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
              <Route path="/products" element={<Placeholder title="Products" />} />
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
