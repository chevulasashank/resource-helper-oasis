
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-50 blur-3xl opacity-70"></div>
        <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50 blur-3xl opacity-60"></div>
      </div>
      
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 mb-8 text-xs font-medium rounded-full bg-blue-50 text-blue-600 animate-slide-in">
            <span>Curated free learning resources</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl text-balance">
            Discover the best free resources to learn any skill
          </h1>
          
          <p className="text-xl text-gray-500 mb-10 max-w-2xl text-balance">
            Find curated YouTube videos, articles, and tutorials for tech and business skills. 
            All free, all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link 
              to="/directory" 
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium transition-all duration-300 hover:bg-blue-700 shadow-sm hover:shadow-md hover:shadow-blue-200"
            >
              Explore Directory
            </Link>
            <Link 
              to="/how-it-works" 
              className="px-6 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-1 group"
            >
              How it works 
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto animate-blur-in opacity-80">
            {['JavaScript', 'Python', 'Marketing', 'Design', 'Business', 'Data Science', 'UX/UI', 'Mobile Dev'].map((category) => (
              <div 
                key={category}
                className="px-3 py-1.5 rounded-md bg-white shadow-sm text-sm text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer border border-gray-100"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
