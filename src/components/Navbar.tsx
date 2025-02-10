import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, ShoppingCart, Heart } from "lucide-react";

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
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                className="h-8 w-8"
                alt="Logo"
              />
              <span className="ml-2 text-xl font-bold text-[#792099]">
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
                className="text-[#792099] hover:text-[#792099] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons (User, Favorites, Cart) */}
          <div className="flex items-center space-x-4">
            {/* User/Profile */}
            <button
              onClick={handleUserClick}
              className="text-[#792099] hover:text-[#792099] transition duration-200 cursor-pointer"
            >
              <User className="h-6 w-6" />
            </button>

            {/* Favorites */}
            <Link
              to="/favourites"
              className="text-[#792099] hover:text-[#792099] transition duration-200"
            >
              <Heart className="h-6 w-6" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="text-[#792099] hover:text-[#792099] transition duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#792099] hover:text-[#792099] hover:bg-[#f3ffc0] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#792099] transition duration-200"
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
                className="text-[#792099] hover:text-[#792099] block px-3 py-2 rounded-md text-base font-medium transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Favorites link in mobile menu */}
            <Link
              to="/favourites"
              className="text-[#792099] hover:text-[#792099] block px-3 py-2 rounded-md text-base font-medium transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              Favorites
            </Link>

            {/* Login in mobile menu */}
            <Link
              to="/login"
              className="bg-[#f3ffc0] text-[#792099] block px-3 py-2 rounded-md text-base font-medium hover:bg-[#e5ff8c] hover:text-[#792099] transition duration-200"
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
