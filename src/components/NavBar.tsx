
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
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
          <div className="glass py-1 px-3 rounded-full text-xs font-medium flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>120 points</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
