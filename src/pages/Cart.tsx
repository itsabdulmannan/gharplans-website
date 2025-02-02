import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Mock cart data - replace with actual state management
const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Premium Construction Toolkit",
    price: 299.99,
    image: "https://source.unsplash.com/featured/400x300/?construction,tools",
    quantity: 1,
  },
  {
    id: "2",
    name: "Safety Helmet Pro",
    price: 89.99,
    image: "https://source.unsplash.com/featured/400x300/?safety,helmet",
    quantity: 2,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] =
    React.useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Start shopping to add items to your cart
          </p>
          <div className="mt-6">
            <Link
              to="/shop"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex py-6 border-b border-gray-200 last:border-b-0"
            >
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link to={`/shop/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="ml-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="font-medium text-[#b1a249] hover:text-[#8a7d2a] transition duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 lg:mt-0 lg:col-span-5">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-medium text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Free shipping on orders over $500
                </p>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#b1a249] hover:bg-[#f3ffc0] hover:text-[#b1a249] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b1a249] transition duration-200"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <div className="mt-6 text-center">
              <Link
                to="/shop"
                className="text-sm font-medium text-[#b1a249] hover:text-[#8a7d2a] transition duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
