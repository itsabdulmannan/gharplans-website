import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { Product } from '../../../types';

// Mock data - replace with actual API call
const mockProduct: Product = {
  id: '1',
  name: 'Premium Construction Toolkit',
  category: 'Tools',
  price: 299.99,
  image: 'https://source.unsplash.com/featured/800x600/?construction,tools',
  description: 'Professional-grade construction toolkit with everything you need for your building projects. Includes high-quality tools made from durable materials.',
  specifications: [
    'Material: High-grade steel and rubber grips',
    'Number of pieces: 45',
    'Weight: 12 kg',
    'Dimensions: 45 x 30 x 20 cm',
    'Warranty: 2 years'
  ],
  features: [
    'Ergonomic design for comfortable use',
    'Rust-resistant coating',
    'Heavy-duty carrying case included',
    'Professional-grade quality',
    'Meets international safety standards'
  ],
  rating: 4.8,
  reviews: 128,
  stock: 15
};

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState(0);

  // Additional product images (mock data)
  const productImages = [
    mockProduct.image,
    'https://source.unsplash.com/featured/800x600/?construction,work',
    'https://source.unsplash.com/featured/800x600/?tools,workshop',
    'https://source.unsplash.com/featured/800x600/?construction,equipment'
  ];

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
  };

  const handleWishlist = () => {
    toast.success('Added to wishlist');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link
        to="/shop"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Shop
      </Link>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Images */}
        <div className="mb-8 lg:mb-0">
          <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={productImages[selectedImage]}
              alt={mockProduct.name}
              className="w-full h-96 object-cover object-center"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? 'ring-2 ring-blue-500'
                    : 'ring-1 ring-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-20 object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:pl-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockProduct.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < Math.floor(mockProduct?.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {mockProduct.rating} ({mockProduct.reviews} reviews)
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-4">${mockProduct.price}</p>
            <p className="text-gray-600 mb-6">{mockProduct.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border-t border-b border-gray-300 focus:ring-0 focus:outline-none"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className="p-3 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-3 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Shipping & Warranty */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center text-gray-600">
              <Truck className="h-5 w-5 mr-2" />
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Shield className="h-5 w-5 mr-2" />
              <span>2-year warranty included</span>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Specifications</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {mockProduct.specifications?.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {mockProduct?.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}