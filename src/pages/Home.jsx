import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import models from "../assets/models.png";
import population from "../assets/population.png";
import casual from "../assets/casual.png";
import party from "../assets/party.png";
import formal from "../assets/formal.png";

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const [loadingTopSelling, setLoadingTopSelling] = useState(true);
  const [errorNewArrivals, setErrorNewArrivals] = useState(null);
  const [errorTopSelling, setErrorTopSelling] = useState(null);
  const [viewMoreNewArrivals, setViewMoreNewArrivals] = useState(false);
  const [viewMoreTopSelling, setViewMoreTopSelling] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setNewArrivals(shuffled.slice(0, 4));
        setTopSelling(shuffled.slice(5, 9));
        setLoadingNewArrivals(false);
        setLoadingTopSelling(false);
      })
      .catch((err) => {
        setErrorNewArrivals(err.message);
        setErrorTopSelling(err.message);
        setLoadingNewArrivals(false);
        setLoadingTopSelling(false);
      });
  }, []);

  const fetchAllProducts = (setter, loadingSetter, errorSetter) => {
    loadingSetter(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load more products.");
        return res.json();
      })
      .then((data) => {
        setter(data);
        loadingSetter(false);
      })
      .catch((err) => {
        errorSetter(err.message);
        loadingSetter(false);
      });
  };

  const handleViewMoreNewArrivals = () => {
    if (!viewMoreNewArrivals) {
      fetchAllProducts(setNewArrivals, setLoadingNewArrivals, setErrorNewArrivals);
    }
    setViewMoreNewArrivals(!viewMoreNewArrivals);
  };

  const handleViewMoreTopSelling = () => {
    if (!viewMoreTopSelling) {
      fetchAllProducts(setTopSelling, setLoadingTopSelling, setErrorTopSelling);
    }
    setViewMoreTopSelling(!viewMoreTopSelling);
  };

  return (
    <div className="bg-gray-100">
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen flex items-center px-6 lg:px-20"
        style={{ backgroundImage: `url(${models})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-6">
            FIND CLOTHES <br /> THAT MATCH <br /> YOUR STYLE
          </h1>
          <button className="px-12 py-2 bg-white text-black rounded-3xl hover:bg-gray-300">
            Shop Now
          </button>
          <img className="px-10 py-20" src={population} alt="numbers" />
        </div>
      </div>

      {/* New Arrivals */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          NEW ARRIVALS
        </h2>
        {loadingNewArrivals ? (
          <div>Loading...</div>
        ) : errorNewArrivals ? (
          <div className="text-red-500">{errorNewArrivals}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="text-center">
                <div className="transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-900 font-bold">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <button
            className="px-8 py-2 bg-black text-white rounded-3xl hover:bg-gray-800"
            onClick={handleViewMoreNewArrivals}
          >
            {viewMoreNewArrivals ? "Show Less" : "View More"}
          </button>
        </div>
      </section>

      {/* Top Selling */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          TOP SELLING
        </h2>
        {loadingTopSelling ? (
          <div>Loading...</div>
        ) : errorTopSelling ? (
          <div className="text-red-500">{errorTopSelling}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {topSelling.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="text-center">
                <div className="transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-900 font-bold">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <button
            className="px-8 py-2 bg-black text-white rounded-3xl hover:bg-gray-800"
            onClick={handleViewMoreTopSelling}
          >
            {viewMoreTopSelling ? "Show Less" : "View More"}
          </button>
        </div>
      </section>

      {/* Dress Styles Section */}
      <section className="flex justify-center items-center p-8 bg-gray-100">
        <div className="w-small max-w-screen-lg bg-white rounded-lg shadow-md p-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
            BROWSE BY DRESS STYLE
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-2">
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={casual}
                alt="Casual"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative h-48 md:h-54 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={formal}
                alt="Formal"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative h-48 md:h-54 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={party}
                alt="Party"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <div className="bg-gray-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-8">OUR HAPPY CUSTOMERS</h2>
        <div className="flex justify-around flex-wrap gap-6">
          <div className="bg-white shadow-lg p-6 w-80 rounded-lg">
            <p className="text-yellow-500 mb-2">★★★★★</p>
            <h3 className="font-bold text-gray-700">
              Sarah M. <span className="text-green-500">●</span>
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              "I'm blown away by the quality and style of the clothes I received from ShopCo."
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 w-80 rounded-lg">
            <p className="text-yellow-500 mb-2">★★★★★</p>
            <h3 className="font-bold text-gray-700">
              Alex K. <span className="text-green-500">●</span>
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              "Finding clothes that align with my personal style used to be a challenge until I discovered ShopCo."
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 w-80 rounded-lg">
            <p className="text-yellow-500 mb-2">★★★★★</p>
            <h3 className="font-bold text-gray-700">
              James L. <span className="text-green-500">●</span>
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              "The selection of clothes is not only diverse but also on-point with the latest trends."
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

