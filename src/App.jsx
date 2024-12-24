import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart"
import { CartProvider } from './context/CartContext';
import CategoryPage from './pages/CategoryPage';


function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/shop/:category?" element={<CategoryPage />} />


      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;

