import React, { useEffect, useState } from 'react';
import { fetchProducts } from './productsApi';

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      let filteredProducts = allProducts;

      if (category === 'new-arrivals') {
        // Example logic for filtering "new arrivals"
        filteredProducts = allProducts.slice(0, 4);
      } else if (category === 'top-selling') {
        // Example logic for filtering "top selling"
        filteredProducts = allProducts.slice(4, 8);
      }

      setProducts(filteredProducts);
    };

    loadProducts();
  }, [category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="text-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
          <p className="text-gray-900 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
