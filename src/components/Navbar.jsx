// src/components/Navbar.jsx
import React, { useState } from 'react';

const Navbar = () => {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <header>
      {/* Notification Bar */}
      {showNotification && (
        <div className="bg-gray-900 text-white py-2 px-4 flex justify-between items-center">
          <p className="text-sm">
            Sign up and get 20% off your first order.{' '}
            <a href="#" className="underline hover:text-gray-300">
              Sign Up Now
            </a>
          </p>
          <button
            className="text-white hover:text-gray-300"
            onClick={() => setShowNotification(false)}
          >
            ✖
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">SHOP.CO</div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Shop
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              On Sale
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              New Arrivals
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Brands
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block flex-grow max-w-lg mx-6">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-gray-200"
            />
          </div>

          {/* Icons */}
          <div className="flex space-x-4 text-gray-700">
            <button className="hover:text-gray-900">👤</button>
            <button className="hover:text-gray-900">❤️</button>
            <button className="hover:text-gray-900">🛒</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
