import { useEffect, useState } from "react";
import { Camera, FileText, CheckCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useUSers } from "./useHook";
import { UserDto } from "../../types/index";

export default function UserProfile() {
  const { getUser, getOrder } = useUSers();
  const [orders, setOrders] = useState<any>([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [getUserData, setUserData] = useState<UserDto | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    address: "",
    city: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    getUser(setUserData);
  }, []);

  useEffect(() => {
    if (getUserData) {
      getOrder(getUserData?.id, setOrders);
    }
  }, [getUserData]);

  useEffect(() => {
    if (getUserData) {
      setProfileFormData({
        firstName: getUserData.firstName || "",
        lastName: getUserData.lastName || "",
        email: getUserData.email || "",
        contactNo: getUserData.contactNo || "",
        address: getUserData.address || "",
        city: getUserData.city || "",
        dateOfBirth: getUserData.dateOfBirth?.split("T")[0] || "",
      });
    }
  }, [getUserData]);

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handlePaymentUpload = (orderId: string, file: File) => {
    toast.success(
      `Payment screenshot for Order #${orderId} uploaded successfully.`
    );
    const updatedOrders = orders.map((order: any) =>
      order.id === orderId
        ? { ...order, paymentScreenshot: URL.createObjectURL(file) }
        : order
    );
    setOrders(updatedOrders);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileFormData),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      const updatedUser = await response.json();
      setUserData(updatedUser);
      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (error: any) {
      toast.error(error.message);
    }
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
          <button
            className="bg-[#b1a249] text-white py-2 px-4 rounded"
            onClick={() => setIsEditingProfile(true)}
          >
            Edit Profile
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
          {orders?.map((order: any) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-800">
                    Order #{order.orderId}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {order.createdAt.split("T")[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: ${order.totalAmount}
                  </p>
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

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold text-[#b1a249] mb-6">
              Edit Profile
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <input
                type="text"
                value={profileFormData.firstName}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    firstName: e.target.value,
                  })
                }
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={profileFormData.lastName}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    lastName: e.target.value,
                  })
                }
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                value={profileFormData.email}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={profileFormData.contactNo}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    contactNo: e.target.value,
                  })
                }
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={profileFormData.address}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    address: e.target.value,
                  })
                }
                placeholder="Address"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={profileFormData.city}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    city: e.target.value,
                  })
                }
                placeholder="City"
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={profileFormData.dateOfBirth}
                onChange={(e) =>
                  setProfileFormData({
                    ...profileFormData,
                    dateOfBirth: e.target.value,
                  })
                }
                placeholder="Date of Birth"
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-[#b1a249] text-white py-2 px-4 rounded w-full"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
