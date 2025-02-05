import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function UnderConstruction() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 50) return oldProgress;
        return oldProgress + 5;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-50 bg-gray-100 text-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          We're Building Something Awesome!
        </h1>
        <p className="text-gray-600 mt-2">
          Our website is under construction. Stay tuned!
        </p>
        <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden mt-4">
          <motion.div
            className="h-full bg-[#f3ffc0]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="text-sm text-gray-700 mt-2">{progress}% completed</p>
        <button
          className="mt-6 px-6 py-3 text-gray-600 bg-[#f3ffc0] hover:bg-[#f3ffc0] hover:text-[#b1a249] focus:bg-[#e5ff8c] focus:text-[#8a7d2a] focus:font-semibold focus:shadow-lg transition duration-200"
          onClick={() => (window.location.href = "/shop")}
        >
          Visit Shop
        </button>
      </motion.div>
    </div>
  );
}
