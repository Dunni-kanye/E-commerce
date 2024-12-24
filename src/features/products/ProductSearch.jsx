import React, { useState } from 'react';

const ProductSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-full"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-black text-white rounded-full">
        Search
      </button>
    </div>
  );
};

export default ProductSearch;
