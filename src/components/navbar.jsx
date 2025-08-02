import { memo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <NavLink to={user ? "/passwords" : "/"} className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-white font-bold text-xl">SecureVault</span>
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <NavItem to="/passwords" label="Passwords" />
                <NavItem to="/security" label="Security" />
                <NavItem to="/profile" label="Profile" />
                <NavItem to="/features" label="Features" />
                <NavItem to="/pricing" label="Pricing" />
                <NavItem to="/about" label="About" />
                <button onClick={handleLogout} className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md hover:bg-red-500 font-bold italic cursor-pointer">
                  Logout
                </button>
                <div className="h-8 w-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold">
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </>
            ) : (
              <>
                <NavItem to="/features" label="Features" />
                <NavItem to="/pricing" label="Pricing" />
                <NavItem to="/about" label="About" />
                <NavItem to="/login" label="Login" />
              </>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-1 mt-2">
            {user ? (
              <>
                <NavItem to="/passwords" label="Passwords" mobile />
                <NavItem to="/security" label="Security" mobile />
                <NavItem to="/profile" label="Profile" mobile />
                <NavItem to="/features" label="Features" mobile />
                <NavItem to="/pricing" label="Pricing" mobile />
                <NavItem to="/about" label="About" mobile />
                <button onClick={handleLogout} className="text-white hover:text-blue-200 px-3 py-2 text-left rounded-md hover:bg-red-500 font-bold italic cursor-pointer">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavItem to="/features" label="Features" mobile />
                <NavItem to="/pricing" label="Pricing" mobile />
                <NavItem to="/about" label="About" mobile />
                <NavItem to="/login" label="Login" mobile />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItem({ to, label, mobile = false }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${mobile ? 'block' : ''} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-900 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-700'
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default memo(Navbar);
