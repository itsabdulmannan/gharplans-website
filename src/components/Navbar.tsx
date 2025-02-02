import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { Menu, X, User, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const navLinks = [
    { name: "House Designs", path: "/house-designs" },
    { name: "Shop", path: "/shop" },
    { name: "Interior Designs", path: "/interior-designs" },
    { name: "Front Elevations", path: "/front-elevations" },
    { name: "Drawings", path: "/drawings" },
    { name: "Blog", path: "/blog" },
    { name: "Estimations", path: "/estimations" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/src/assets/logo.png"
                className="h-8 w-8 text-[#b1a249]"
              />
              <span className="ml-2 text-xl font-bold text-[#b1a249]">
                GharPlans
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#b1a249] hover:text-[#8a7d2a] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right icons (Profile and Cart) */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleUserClick}
              className="text-[#b1a249] hover:text-[#8a7d2a] transition duration-200"
            >
              <User className="h-6 w-6" />
            </button>
            <Link
              to="/cart"
              className="text-[#b1a249] hover:text-[#8a7d2a] transition duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#b1a249] hover:text-[#8a7d2a] hover:bg-[#f3ffc0] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#b1a249] transition duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#b1a249] hover:text-[#8a7d2a] block px-3 py-2 rounded-md text-base font-medium transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-[#f3ffc0] text-[#b1a249] block px-3 py-2 rounded-md text-base font-medium hover:bg-[#e5ff8c] hover:text-[#8a7d2a] transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
