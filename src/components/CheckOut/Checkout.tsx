import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "./useHook";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { getBankAccountDetails } = useCart();
  const [bankAccountDetails, setBankAccountDetails] = useState<any>({});
  useEffect(() => {
    getBankAccountDetails(setBankAccountDetails);
  }, []);
  console.log(bankAccountDetails);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Bank Account Details
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Account Holder Name
                </h3>
                <p className="mt-1 text-gray-900">Wynter Santiago</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700">Bank Name</h3>
                <p className="mt-1 text-gray-900">Shaeleigh Martin</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Account Number
                </h3>
                <p className="mt-1 text-gray-900">1</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  IFSC Code (IBAN)
                </h3>
                <p className="mt-1 text-gray-900">Tempor illum nihil</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Branch Code
                </h3>
                <p className="mt-1 text-gray-900">Laboris dolores dolo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:col-span-5">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">$XXX.XX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$XX.XX</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-medium text-gray-900">
                    $XXX.XX
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/shop"
              onClick={() => toast.success("Order submitted successfully!")}
              className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#b1a249] hover:bg-[#f3ffc0] hover:text-[#b1a249] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b1a249] transition duration-200"
            >
              Submit Order
              <CreditCard className="ml-2 h-5 w-5" />
            </Link>

            <div className="mt-6 text-center">
              <Link
                to="/cart"
                className="text-sm font-medium text-[#b1a249] hover:text-[#8a7d2a] flex items-center justify-center transition duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
