import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="relative bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 shadow-2xl border-b border-indigo-500/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur group-hover:blur-lg transition-all duration-300"></div>
              <div className="relative bg-white/15 backdrop-blur-lg p-3 rounded-2xl group-hover:bg-white/25 transition-all duration-300 group-hover:scale-110 border border-white/20">
                <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <Link 
              to="/" 
              className="group text-white text-2xl font-extrabold hover:text-blue-100 transition-all duration-300"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg group-hover:from-blue-100 group-hover:to-white transition-all duration-300">
                Order Management System
              </span>
            </Link>
          </div>
          
          <div className="flex space-x-3">
            <Link
              to="/"
              className={`group relative px-8 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 transform hover:scale-110 overflow-hidden ${
                isActive('/') 
                  ? 'bg-white/25 text-white shadow-2xl backdrop-blur-lg border border-white/40' 
                  : 'text-indigo-100 hover:bg-white/15 hover:text-white hover:shadow-xl'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-base">Dashboard</span>
              </div>
            </Link>
            
            <Link
              to="/create"
              className={`group relative px-8 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 transform hover:scale-110 overflow-hidden ${
                isActive('/create') 
                  ? 'bg-white/25 text-white shadow-2xl backdrop-blur-lg border border-white/40' 
                  : 'text-indigo-100 hover:bg-white/15 hover:text-white hover:shadow-xl'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-base">Create Order</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
