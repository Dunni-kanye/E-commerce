import React from "react";

const ProductSection = ({
  title,
  products,
  loading,
  error,
  onViewMore,
  viewMore,
}) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        {title}
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="text-center">
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
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <button
          className="px-8 py-2 bg-black text-white rounded-3xl hover:bg-gray-800"
          onClick={onViewMore}
        >
          {viewMore ? "Show Less" : "View More"}
        </button>
      </div>
    </section>
  );
};

export default ProductSection;
