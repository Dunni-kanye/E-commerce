import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('medium')
  const [selectedColor, setSelectedColor] = useState('olive')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { id } = useParams()
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) return <div>Loading...</div>

  const images = [
    product.image,
    product.image,
    product.image,
    product.image
  ]

  const colors = [
    { name: 'Olive', value: 'olive', class: 'bg-[#5B5B3F]' },
    { name: 'Forest', value: 'forest', class: 'bg-[#1B4B36]' },
    { name: 'Navy', value: 'navy', class: 'bg-[#1B2B4B]' }
  ]

  const sizes = ['Small', 'Medium', 'Large', 'X-Large']

  const discountedPrice = Math.floor(product.price * 0.6)

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, color: selectedColor }, quantity);
    alert('Product added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-gray-900">Home</a>
        <span>&gt;</span>
        <a href="/shop" className="hover:text-gray-900">Shop</a>
        <span>&gt;</span>
        <a href="/shop/men" className="hover:text-gray-900">Men</a>
        <span>&gt;</span>
        <span className="text-gray-900">T-shirts</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex gap-4">
          {/* Thumbnail Gallery */}
          <div className="flex flex-col gap-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 border rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-black' : 'border-gray-200'
                }`}
              >
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.title.toUpperCase()}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-2xl ${
                  i < Math.floor(product.rating.rate)
                    ? 'text-yellow-400'
                    : 'text-gray-200'
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-sm text-gray-600">
              {product.rating.rate}/5
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">${discountedPrice}</span>
            <span className="text-2xl text-gray-400 line-through">${product.price}</span>
            <span className="px-2 py-1 bg-red-100 text-red-600 rounded">-40%</span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Color Selection */}
          <div className="space-y-4">
            <h3 className="font-medium">Select Color</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded-full ${color.class} ${
                    selectedColor === color.value
                      ? 'ring-2 ring-offset-2 ring-black'
                      : ''
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <h3 className="font-medium">Choose Size</h3>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <button
                  key={size.toLowerCase()}
                  onClick={() => setSelectedSize(size.toLowerCase())}
                  className={`min-w-[80px] cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium ${
                    selectedSize === size.toLowerCase()
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button 
              className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

