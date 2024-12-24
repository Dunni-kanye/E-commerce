import React, { useState, useEffect } from 'react';
import { Star, MoreHorizontal } from 'lucide-react';

const ProductReviews = ({ productId }) => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [sortBy, setSortBy] = useState('latest');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    fetchReviews();
  }, [page, sortBy]);

  const fetchReviews = async () => {
    if (page === 1) setLoading(true);
    try {
      //  DummyJSON comments API 
      const response = await fetch(
        `https://dummyjson.com/comments?limit=${ITEMS_PER_PAGE}&skip=${(page - 1) * ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      
      // Transform comments into review format
      const transformedReviews = data.comments.map(comment => ({
        id: comment.id,
        name: comment.user.username,
        rating: Math.floor(Math.random() * 2) + 4,
        date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
        verified: Math.random() > 0.3,
        content: comment.body
      }));

      if (page === 1) {
        setReviews(transformedReviews);
      } else {
        setReviews(prev => [...prev, ...transformedReviews]);
      }
      
      setHasMore(reviews.length < data.total);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 px-4">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Product Information">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-4 px-1 ${
              activeTab === 'details'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 ${
              activeTab === 'reviews'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Rating & Reviews
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-4 px-1 ${
              activeTab === 'faqs'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            FAQs
          </button>
        </nav>
      </div>

      {/* Reviews Content */}
      {activeTab === 'reviews' && (
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">
              All Reviews <span className="text-gray-500 text-sm">({reviews.length})</span>
            </h2>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="border rounded-md px-3 py-1.5 text-sm"
              >
                <option value="latest">Latest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
              <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
                Write a Review
              </button>
            </div>
          </div>

          {loading && page === 1 ? (
            <div className="text-center py-8">Loading reviews...</div>
          ) : (
            <>
              <div className="space-y-8">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm font-medium">{review.name}</span>
                          {review.verified && (
                            <span className="text-green-500 text-sm">●</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{review.content}</p>
                        <p className="text-gray-400 text-sm">
                          Posted on {review.date}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="w-full mt-8 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More Reviews'}
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Product Details Content */}
      {activeTab === 'details' && (
        <div className="py-8">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Material: Premium cotton blend
            </p>
            <p className="text-gray-600">
              Care Instructions: Machine wash cold, tumble dry low
            </p>
            <p className="text-gray-600">
              Sizing: True to size. Model is 6'0" and wearing size M
            </p>
          </div>
        </div>
      )}

      {/* FAQs Content */}
      {activeTab === 'faqs' && (
        <div className="py-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">What is the shipping time?</h3>
              <p className="text-gray-600">Standard shipping takes 3-5 business days.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Do you offer returns?</h3>
              <p className="text-gray-600">Yes, we offer free returns within 30 days of purchase.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How do I care for this item?</h3>
              <p className="text-gray-600">Machine wash cold, tumble dry low. Do not bleach.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;

