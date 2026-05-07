import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          NewsHub
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/sources"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
            >
              Sources
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
            >
              Latest News
            </NavLink>
          </li>

          {/* Auth Section */}
          {isAuthenticated ? (
            <>
              <li className="text-gray-700">
                Welcome, <span className="font-semibold">{user?.name}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-600">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white shadow">
          <NavLink to="/" onClick={() => setOpen(false)} className="block">
            Home
          </NavLink>
          <NavLink to="/sources" onClick={() => setOpen(false)} className="block">
            Sources
          </NavLink>
          <NavLink to="/articles" onClick={() => setOpen(false)} className="block">
            Latest News
          </NavLink>

          {/* Mobile Auth Section */}
          {isAuthenticated ? (
            <>
              <div className="text-gray-700 py-2">
                Welcome, <span className="font-semibold">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)} className="block">
                Login
              </NavLink>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}