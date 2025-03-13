
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, LogIn, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/lib/data';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    // Update user state when navigating between pages
    setUser(getCurrentUser());
  }, [location.pathname]);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out", 
        scrolled 
          ? "glass frosted-blur border-b border-gray-200/30 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-opacity duration-300 hover:opacity-80"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">LH</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">LearnHub</span>
        </Link>
        
        <div className="hidden sm:flex items-center space-x-8">
          {[
            { path: '/', label: 'Home' },
            { path: '/directory', label: 'Directory' },
            { path: '/how-it-works', label: 'How It Works' },
            { path: '/submit-resource', label: 'Submit Resource' },
            ...(user ? [{ path: '/dashboard', label: 'My Learning' }] : []),
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-blue-600 py-1",
                location.pathname === item.path 
                  ? "text-blue-600" 
                  : "text-gray-800"
              )}
            >
              {item.label}
              {location.pathname === item.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-scale-in" />
              )}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full transition-colors hover:bg-gray-100"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {user ? (
            <div className="flex items-center space-x-3">
              <Link 
                to="/dashboard" 
                className="glass py-1 px-3 rounded-full text-xs font-medium flex items-center space-x-2"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User className="w-3 h-3" />
                </div>
                <span>{user.points} points</span>
              </Link>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
