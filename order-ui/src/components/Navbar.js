import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="group flex items-center space-x-4 text-white hover:text-white/90 transition-all duration-300"
          >
            <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-3 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:from-blue-100 group-hover:to-white transition-all duration-300">
                OrderMS
              </h1>
              <p className="text-xs text-white/80 font-medium tracking-wider uppercase">Management System</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`relative group px-6 py-3 rounded-xl font-semibold transition-all duration-500 overflow-hidden ${
                isActive('/') 
                  ? 'bg-white/20 backdrop-blur-lg text-white shadow-lg' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="flex items-center space-x-2 relative z-10">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0H8v0z" />
                </svg>
                <span>Dashboard</span>
              </div>
            </Link>

            <Link
              to="/create"
              className={`relative group px-6 py-3 rounded-xl font-semibold transition-all duration-500 overflow-hidden ${
                isActive('/create') 
                  ? 'bg-white/20 backdrop-blur-lg text-white shadow-lg' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="flex items-center space-x-2 relative z-10">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Order</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
