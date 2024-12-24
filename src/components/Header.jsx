import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import shopping from "../assets/shopping.png";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedQuery.trim() !== "") {
        setIsLoading(true);
        try {
          const response = await fetch("https://dummyjson.com/products");
          const data = await response.json();

          const filteredResults = data.products.filter((product) =>
            product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
          );

          setSearchResults(filteredResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery]);

  // Navigate to categories page
  const handleShopClick = async () => {
    navigate("/categories");
  };

  // Navigate to on-sale products page
  const handleOnSaleClick = async () => {
    navigate("/on-sale");
  };

  return (
    <div className="bg-white shadow">
      <div className="bg-gray-900 text-white py-2 px-4 flex justify-between items-center">
        <p className="text-sm">
          Sign up and get 20% off your first order. {" "}
          <a href="#" className="underline hover:text-gray-300">
            Sign Up Now
          </a>
        </p>
        <button className="text-white hover:text-gray-300">✖</button>
      </div>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900 mr-10">SHOP.CO</div>

        <ul className="flex space-x-5 text-gray-700">
        <li>
          <Link to="/shop" className="hover:text-gray-900">
              Shop
           </Link>
        </li>

          <li>
            <button
              onClick={handleOnSaleClick}
              className="hover:text-gray-900"
            >
              On Sale
            </button>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900">
              New Arrivals
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900">
              Brands
            </a>
          </li>
        </ul>

        <div className="relative mx-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />

          {isLoading && (
            <div className="absolute right-2 top-2 text-sm text-gray-400">
              Loading...
            </div>
          )}

          {searchInput && !isLoading && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto z-10">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-12 h-12 object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>

        <div className="flex space-x-4 text-gray-700">
          <button className="hover:text-gray-900">
            <img
              src={user}
              alt="user"
              className="w-[24px] h-[24px] object-contain"
            />
          </button>

          <Link to="/cart" className="hover:text-gray-900 relative">
            <img
              src={shopping}
              alt="shopping"
              className="w-[24px] h-[24px] object-contain"
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
