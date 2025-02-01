import React, { useState } from 'react';
import { User, Camera, FileText, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data for orders and user profile
const mockUserProfile = {
  name: 'John Doe',
  email: 'johndoe@example.com',
};

const mockOrders = [
  {
    id: '1',
    date: '2025-01-01',
    total: 299.99,
    status: 'Pending',
    paymentScreenshot: null,
  },
  {
    id: '2',
    date: '2025-01-10',
    total: 499.99,
    status: 'Completed',
    paymentScreenshot: 'https://via.placeholder.com/100', // Example screenshot URL
  },
];

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
    // Logic to update the profile data
  };

  const handlePaymentUpload = (orderId: string, file: File) => {
    toast.success(`Payment screenshot for Order #${orderId} uploaded successfully.`);
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, paymentScreenshot: URL.createObjectURL(file) } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h1>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Orders Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-800">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                  <p className="text-sm text-gray-500">Total: ${order.total}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {order.paymentScreenshot ? (
                  <img
                    src={order.paymentScreenshot}
                    alt="Payment Screenshot"
                    className="h-16 w-16 object-cover rounded-md"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedOrderId(order.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Upload Payment Screenshot
                  </button>
                )}
                {selectedOrderId === order.id && !order.paymentScreenshot && (
                  <div>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                          handlePaymentUpload(order.id, file);
                        }
                      }}
                      className="hidden"
                      id={`file-upload-${order.id}`}
                    />
                    <label
                      htmlFor={`file-upload-${order.id}`}
                      className="flex items-center text-blue-600 cursor-pointer"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Choose Screenshot
                    </label>
                  </div>
                )}
                {order.paymentScreenshot && (
                  <span className="text-green-600 text-sm flex items-center">
                    <CheckCircle className="h-5 w-5 mr-1" />
                    Screenshot Uploaded
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
