import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Home, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthHook } from "./useHook";

export default function SignupForm() {
  const { registerUser } = useAuthHook();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNo: "",
    address: "",
    city: "",
    dob: "",
    profileImage: null as File | null,
  });
  const [loading, setLoading] = React.useState(false); // Add loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({ ...formData, profileImage: e.target.files[0] });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      console.log(formData);
      const response = await registerUser(formData);

      if (response?.status === 201) {
        toast.success(
          "Account created successfully! An OTP has been sent. Please check your email."
        );
        navigate("/verify-otp", { state: { email: formData.email } });
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#792099] focus:border-[#792099] text-[#792099]"
                    placeholder="John"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#792099] focus:border-[#792099] text-[#792099]"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#792099] focus:border-[#792099] text-[#792099]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contactNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="contactNo"
                    name="contactNo"
                    type="text"
                    required
                    value={formData.contactNo}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#792099] focus:border-[#792099] text-[#792099]"
                    placeholder="(+123) 456-7890"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#792099] focus:border-[#792099] text-[#792099]"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#792099] focus:border-[#792099] text-[#792099]"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#792099] focus:border-[#792099] text-[#792099]"
                    placeholder="123 Street Name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#792099] focus:border-[#792099] text-[#792099]"
                    placeholder="City Name"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#792099] focus:border-[#792099] text-[#792099]"
                  />
                </div>
              </div>

              {/*
              The Profile Image section is commented out for now.
              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full p-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#b1a249] focus:border-[#b1a249] text-[#8a7d2a]"
                  />
                </div>
              </div>
              */}
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? "bg-[#792099] text-[#792099]"
                    : "bg-[#792099] hover:bg-[#792099] hover:text-white focus:ring-[#792099]"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200`}
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
