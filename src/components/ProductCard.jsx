import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const discountedPrice = Math.floor(product.price * (1 - product.discountPercentage / 100));
  
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-2">
                ({Math.floor(Math.random() * 500 + 100)})
              </span>
            </div>
          </div>
          <h3 className="font-medium mb-2">{product.title}</h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold">${discountedPrice}</span>
            <span className="text-gray-500 line-through text-sm">
              ${product.price}
            </span>
            <span className="text-pink-500 text-sm">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

