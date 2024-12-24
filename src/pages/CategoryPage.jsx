import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    colors: [],
    sizes: [],
    styles: [],
  });
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState('Most Popular');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          categoryName
            ? `https://dummyjson.com/products/category/${categoryName}`
            : 'https://dummyjson.com/products'
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType]?.includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...(prev[filterType] || []), value],
    }));
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, color: selectedColor }, quantity);
    alert('Product added to cart!');
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <CategorySidebar
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          priceRange={priceRange}
          onPriceRangeChange={handlePriceRangeChange}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold capitalize">
              {categoryName
                ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                : 'All Products'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Showing {products.length} of {products.length} Products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md px-3 py-1.5 text-sm"
              >
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex items-center justify-center mt-8 gap-2">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-md ${
                  page === 1
                    ? 'bg-black text-white'
                    : 'border hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

