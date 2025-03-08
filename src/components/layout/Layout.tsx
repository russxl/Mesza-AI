import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConvexAiChat } from '../../aiChat';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = useCallback((open: boolean) => {
    setIsChatOpen(open);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-2xl font-bold text-gray-800">MESZA</Link>
              <span className="text-sm text-gray-500">Standing Desks</span>
            </div>
            <nav className="hidden md:flex space-x-8 items-center justify-center">
              <Link to="/" className={`font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Home</Link>
              <Link to="/tables" className={`font-medium ${isActive('/tables') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Tables</Link>
              <Link to="/accessories" className={`font-medium ${isActive('/accessories') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Accessories</Link>
              <Link to="/about" className={`font-medium ${isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>About</Link>
              <Link to="/contact" className={`font-medium ${isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button 
                className="md:hidden text-gray-600 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className={`${isActive('/') ? 'text-blue-600' : 'text-gray-600'} font-medium px-2 py-1`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/tables" 
                  className={`${isActive('/tables') ? 'text-blue-600' : 'text-gray-600'} font-medium px-2 py-1`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tables
                </Link>
                <Link 
                  to="/accessories" 
                  className={`${isActive('/accessories') ? 'text-blue-600' : 'text-gray-600'} font-medium px-2 py-1`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accessories
                </Link>
                <Link 
                  to="/about" 
                  className={`${isActive('/about') ? 'text-blue-600' : 'text-gray-600'} font-medium px-2 py-1`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className={`${isActive('/contact') ? 'text-blue-600' : 'text-gray-600'} font-medium px-2 py-1`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Mesza</h3>
              <p className="text-gray-400">Premium standing desks designed for comfort, productivity, and well-being.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link to="/tables" className="text-gray-400 hover:text-white">Standing Desks</Link></li>
                <li><Link to="/accessories" className="text-gray-400 hover:text-white">Desk Accessories</Link></li>
                <li><Link to="/office-chairs" className="text-gray-400 hover:text-white">Office Chairs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/warranty" className="text-gray-400 hover:text-white">Warranty</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Mesza. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Component with proper renderTrigger */}
      <ConvexAiChat 
        convexUrl={import.meta.env.VITE_CONVEX_URL || ''}
        name="Mesza Support"
        infoMessage="Our AI assistant can help with questions about our standing desks, accessories, and services."
        welcomeMessage="Hello! I'm your Mesza Assistant. How can I help you choose the perfect standing desk today?"
        renderTrigger={(onClick) => (
          <button 
            onClick={() => {
              onClick();
              handleChatToggle(true);
            }}
            className={`fixed z-[200] bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
              isChatOpen ? 'hidden' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        )}
        onHideChat={() => handleChatToggle(false)}
      />
    </div>
  );
};

export default Layout;
