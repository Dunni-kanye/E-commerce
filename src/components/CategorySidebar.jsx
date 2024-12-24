import React from 'react';

const CategorySidebar = ({ 
  selectedFilters, 
  onFilterChange, 
  priceRange, 
  onPriceRangeChange 
}) => {
  const colors = [
    { name: 'Red', class: 'bg-red-500' },
    { name: 'Green', class: 'bg-green-500' },
    { name: 'Blue', class: 'bg-blue-500' },
    { name: 'Yellow', class: 'bg-yellow-500' },
    { name: 'Orange', class: 'bg-orange-500' },
    { name: 'Purple', class: 'bg-purple-500' },
    { name: 'Pink', class: 'bg-pink-500' },
    { name: 'Gray', class: 'bg-gray-500' },
    { name: 'White', class: 'bg-white border border-gray-200' },
    { name: 'Black', class: 'bg-black' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
  
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  return (
    <div className="w-64 pr-8">
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
          Filters
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </h3>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Categories</h4>
        <div className="space-y-2">
          {['T-shirts', 'Jeans', 'Shirts', 'Shorts'].map((category) => (
            <label key={category} className="flex items-center justify-between text-sm">
              <span>{category}</span>
              <input
                type="checkbox"
                checked={selectedFilters.categories?.includes(category)}
                onChange={() => onFilterChange('categories', category)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Price</h4>
        <input
          type="range"
          min="0"
          max="500"
          value={priceRange}
          onChange={(e) => onPriceRangeChange(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>$0</span>
          <span>${priceRange}</span>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Colors</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              className={`w-6 h-6 rounded-full ${color.class} ${
                selectedFilters.colors?.includes(color.name)
                  ? 'ring-2 ring-offset-2 ring-black'
                  : ''
              }`}
              onClick={() => onFilterChange('colors', color.name)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 border rounded-md text-sm ${
                selectedFilters.sizes?.includes(size)
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onFilterChange('sizes', size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Dress Style</h4>
        <div className="space-y-2">
          {dressStyles.map((style) => (
            <label key={style} className="flex items-center justify-between text-sm">
              <span>{style}</span>
              <input
                type="checkbox"
                checked={selectedFilters.styles?.includes(style)}
                onChange={() => onFilterChange('styles', style)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => {/* Handle apply filters */}}
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default CategorySidebar;

