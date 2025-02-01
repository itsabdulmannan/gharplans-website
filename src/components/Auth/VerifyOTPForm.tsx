import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthHook } from "./useHook";

export default function VerifyOTPForm() {
  const { veriftOtp } = useAuthHook();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const isPasswordReset = location.state?.isPasswordReset;

  const [otp, setOtp] = React.useState(["", "", "", ""]);
  const inputRefs = Array(4)
    .fill(0)
    .map(() => React.useRef<HTMLInputElement>(null));

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      const response = await veriftOtp(email, otpValue);
      if (response?.status === 200) {
        toast.success("OTP verified successfully!");

        if (isPasswordReset) {
          navigate("/reset-password");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  if (!email) {
    navigate("/login");
    return null;
  }

  return (
    <div className="mt-3 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification code to
          <br />
          <span className="font-medium text-blue-600">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter verification code
              </label>
              <div className="mt-2 flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl border-2 border-blue-500 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify OTP
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={() => {
                toast.success("New OTP sent successfully!");
              }}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
