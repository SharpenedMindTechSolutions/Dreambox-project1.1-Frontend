import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrolledEnough, setIsScrolledEnough] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);
      setIsScrolledEnough(scrollY > 650);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-transparent backdrop-blur-xl' : 'bg-transparent'
        }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10" />
            <span
              className={`text-xl font-bold font-special-gothic transition-colors duration-300 ${isScrolledEnough ? 'text-black' : 'text-white'
                }`}
            >
              DreamBox AI
            </span>
          </Link>

          {/* Right - Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/login">
              <button className="px-7 py-2 rounded-full btn-gradient hover:opacity-90 transition">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-7 py-2 rounded-full btn-gradient hover:opacity-90 transition">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white focus:outline-none"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Left Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-10"
          onClick={() => setMobileOpen(false)}
        ></div>

        {/* Drawer Panel */}
        <div className="absolute left-0 top-0 h-full w-64 bg-white p-4 space-y-4">
          <Link to="/" className="flex items-center space-x-2 pb-5">
            <img src={logo} alt="Logo" className="h-10" />
            <span
              className="text-xl font-bold font-special-gothic transition-colors duration-300  text-black"
            >
              DreamBox AI
            </span>
          </Link>
          <Link to="/login" onClick={() => setMobileOpen(false)}>
            <button className="w-full text-center px-4 py-2 rounded-full btn-gradient hover:opacity-90 transition">
              Login
            </button>
          </Link>
          <Link to="/register" onClick={() => setMobileOpen(false)}>
            <button className="w-full text-center mt-2 px-4 py-2 rounded-full btn-gradient hover:opacity-90 transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
