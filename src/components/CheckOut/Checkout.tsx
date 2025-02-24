import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "./useHook";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { getBankAccountDetails, getUser } = useCart();
  const [bankAccountDetails, setBankAccountDetails] = useState<any>({});
  const [userData, setUserData] = useState<any>({});

  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  });

  // Retrieve the state passed from the Cart component
  const location = useLocation();
  const { subtotal, shipping, total } = location.state || {
    subtotal: 0,
    shipping: 0,
    total: 0,
  };

  useEffect(() => {
    getBankAccountDetails(setBankAccountDetails);
    getUser((data: any) => {
      setUserData(data);
      // Pre-fill shipping info with user data
      setShippingInfo({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        address: data.address || "",
        city: data.city || "",
        email: data.email || "",
      });
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingUpdate = () => {
    // Implement your update logic here (for example, via an API call)
    toast.success("Shipping information updated");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <h1 className="text-3xl font-bold text-[#792099] mb-8">Checkout</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Shipping Information Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-medium text-[#792099] mb-6">
              Shipping Information
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#792099] focus:border-[#792099]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#792099] focus:border-[#792099]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#792099] focus:border-[#792099]"
                  rows={3}
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#792099] focus:border-[#792099]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#792099] focus:border-[#792099]"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleShippingUpdate}
                className="mt-4 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#792099] focus:outline-none focus:ring-2 cursor-pointer"
              >
                Update Shipping Information
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary and Bank Account Details */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-medium text-[#792099] mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {Number(subtotal).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {Number(shipping) === 0
                    ? "Free"
                    : Number(shipping).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-medium text-gray-900">
                    {Number(total).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-medium text-[#792099] mb-6">
              Bank Account Details
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Account Holder Name
                </h3>
                <p className="mt-1 text-gray-900">
                  {bankAccountDetails[0]?.accountHolderName || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Bank Name</h3>
                <p className="mt-1 text-gray-900">
                  {bankAccountDetails[0].bankName || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Account Number
                </h3>
                <p className="mt-1 text-gray-900">
                  {bankAccountDetails[0].accountNumber || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  IFSC Code (IBAN)
                </h3>
                <p className="mt-1 text-gray-900">
                  {bankAccountDetails[0].ifscCode || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Branch Code
                </h3>
                <p className="mt-1 text-gray-900">
                  {bankAccountDetails[0].branchCode || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <Link
            to="/shop"
            onClick={() => toast.success("Order submitted successfully!")}
            className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#792099] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#792099] transition duration-200"
          >
            Submit Order
            <CreditCard className="ml-2 h-5 w-5" />
          </Link>
          <div className="mt-6 text-center">
            <Link
              to="/cart"
              className="text-sm font-medium text-[#792099] transition duration-200 flex items-center justify-center"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
