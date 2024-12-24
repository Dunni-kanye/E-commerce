import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty. <Link to="/" className="text-blue-500 hover:underline">Continue shopping</Link></p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.map(item => (
        <div key={item.id} className="flex items-center border-b py-4">
          <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
          <div className="flex-grow">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600">
              Size: {item.size}, Color: {item.color}
            </p>
            <p className="text-gray-800 font-bold">${item.price}</p>
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-8">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <button className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

