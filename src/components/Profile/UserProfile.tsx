import { useEffect, useState } from "react";
import { Camera, FileText, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useUSers } from "./useHook";
import { UserDto } from "../../types/index";

const mockOrders = [
  {
    id: "1",
    date: "2025-01-01",
    total: 299.99,
    status: "Pending",
    paymentScreenshot: null,
  },
  {
    id: "2",
    date: "2025-01-10",
    total: 499.99,
    status: "Completed",
    paymentScreenshot: "https://via.placeholder.com/100",
  },
];

export default function UserProfile() {
  const { getUser } = useUSers();
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [getUserData, setUserData] = useState<UserDto | null>(null);

  useEffect(() => {
    getUser(setUserData);
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handlePaymentUpload = (orderId: string, file: File) => {
    toast.success(
      `Payment screenshot for Order #${orderId} uploaded successfully.`
    );
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, paymentScreenshot: URL.createObjectURL(file) }
        : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h1>

      {/* Profile Section */}
      <div className="mx-auto bg-white p-8 rounded-lg shadow-lg max-w-8xl">
        <div className="flex items-center space-x-6 mb-8">
          <div className="flex-shrink-0">
            <img
              className="w-32 h-32 rounded-full border-4 border-[#b1a249]"
              src={getUserData?.profileImage || "default-profile.jpg"}
              alt="Profile"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-[#b1a249]">
              {getUserData?.firstName} {getUserData?.lastName}
            </h2>
            <div className="mt-4 space-y-2">
              <p className="text-black font-semibold">
                Email:{" "}
                <span className="text-[#b1a249]">{getUserData?.email}</span>
              </p>
              <p className="text-black font-semibold">
                Phone:{" "}
                <span className="text-[#b1a249]">{getUserData?.contactNo}</span>
              </p>
              <p className="text-black font-semibold">
                Address:{" "}
                <span className="text-[#b1a249]">{getUserData?.address}</span>
              </p>
              <p className="text-black font-semibold">
                City:{" "}
                <span className="text-[#b1a249]">{getUserData?.city}</span>
              </p>
              <p className="text-black font-semibold">
                Date Of Birth:{" "}
                <span className="text-[#b1a249]">
                  {getUserData?.dateOfBirth?.split("T")[0]}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 justify-end">
          <button className="bg-[#b1a249] text-white py-2 px-4 rounded">
            Edit Profile
          </button>
          <button className="bg-[#b1a249] text-white py-2 px-4 rounded">
            Update Password
          </button>
          <button
            className="bg-[#b1a249] text-white py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Orders Section */}
      <div className="mt-5 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-800">
                    Order #{order.id}
                  </p>
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
                    className="text-black hover:text-[#b1a249] cursor-pointer"
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
                      className="flex items-center text-black cursor-pointer"
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
