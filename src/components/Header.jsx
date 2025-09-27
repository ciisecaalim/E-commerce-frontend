import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function HeaderBookStore() {
  const GetCustomer = localStorage.getItem("customer");
  const customer = GetCustomer ? JSON.parse(GetCustomer) : null;

  const handleLogOut = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("admin");
    window.location.reload(); // refresh header state
  };

  const location = useLocation(); // to highlight active link

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="text-3xl font-extrabold text-green-600">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Book<span className="text-green-600">Haven</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {[
            { name: "Home", link: "/" },
            { name: "Categories", link: "/categories" },
            { name: "Best Sellers", link: "/bestsellers" },
            { name: "Contact", link: "/contact" },
          ].map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className={`relative transition ${
                location.pathname === item.link
                  ? "text-green-600 font-semibold"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              {item.name}
              {location.pathname === item.link && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600 rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-5">
          {customer ? (
            <div className="flex gap-4 items-center">
              {/* Avatar */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg">
                {customer?.name ? customer.name[0].toUpperCase() : "U"}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogOut}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/CustomerLogin">
                <button className="hidden md:flex items-center gap-2 text-sm text-gray-700 hover:text-green-600 transition">
                  <FaUser />
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition">
                  Register
                </button>
              </Link>
            </div>
          )}

          {/* Cart */}
          <Link to="/CartPage">
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-green-700 transition">
              <FaShoppingCart />
              Cart
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderBookStore;
