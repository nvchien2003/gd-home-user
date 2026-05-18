
import { Link } from "react-router-dom";
import { Home, Menu, X, MessageSquare, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { User } from "../../api/user/user.interface";

interface HeaderBarProps {
  user: User | null;
  isAuthenticated: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

export default function HeaderBar({
  user,
  isAuthenticated,
  isMenuOpen,
  setIsMenuOpen,
  handleLogout,
}: HeaderBarProps) {
  /* ================= CONFIG ================= */
  const NAV_ITEMS = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/explore" },
  ];

  const AUTH_DROPDOWN = [
    { label: "Profile", to: "/profile" },
    { label: "History", to: "/history" },
    // { label: "Owner Panel", to: "/admin" },
  ];

  const MOBILE_AUTH_ITEMS = [
    { label: "Profile", to: "/profile" },
    { label: "History", to: "/history" },
    { label: "Messages", to: "/chat" },

  ];

  /* ================= RENDER ================= */

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              GDHome
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.label}
                to={item.to}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">

                {/* Messages */}
                <Link to="/chat" className="p-2 text-gray-400 hover:text-indigo-600 relative">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white" />
                </Link>

                {/* Favorites */}
                <Link to="/favorites" className="p-2 text-gray-400 hover:text-red-500">
                  <Heart className="h-5 w-5" />
                </Link>

                {/* Avatar Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full overflow-hidden justify-center items-center flex border">
                      <img
                      src={user?.avatar}
                      alt={user?.firstName}
                      className="h-full w-full rounded-full"
                    />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {`${user?.firstName} ${user?.lastName}`}
                    </span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {AUTH_DROPDOWN.map(item => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="block px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        {item.label}
                      </Link>
                    ))}

                    <div className="h-px bg-gray-100 my-1" />

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2"
                >
                  Sign In
                </Link>

                <Link
                  to="/sign-up"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(v => !v)}
              className="p-2 text-gray-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">

              {NAV_ITEMS.map(item => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md font-medium hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  {MOBILE_AUTH_ITEMS.map(item => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md font-medium hover:bg-gray-50"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="pt-4 border-t flex flex-col gap-3">
                  <Link
                    to="/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center px-4 py-2 border rounded-lg"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/sign-up"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center px-4 py-2 bg-indigo-600 text-white rounded-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
