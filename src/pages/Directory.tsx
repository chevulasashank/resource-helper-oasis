
import { useState, useEffect } from 'react';
import { NavBar } from '@/components/NavBar';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ResourceCard } from '@/components/ResourceCard';
import { resources, categories } from '@/lib/data';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Directory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState(resources);
  
  useEffect(() => {
    // Filter resources based on category and search term
    let filtered = resources;
    
    if (selectedCategory) {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }
    
    if (searchTerm) {
      const lowercaseTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(lowercaseTerm) || 
        resource.description.toLowerCase().includes(lowercaseTerm) ||
        resource.category.toLowerCase().includes(lowercaseTerm)
      );
    }
    
    setFilteredResources(filtered);
  }, [selectedCategory, searchTerm]);
  
  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      
      <main className="pt-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resource Directory</h1>
              <p className="text-gray-500">
                Browse our curated collection of free learning resources
              </p>
            </div>
            
            <Link 
              to="/submit-resource"
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-start sm:self-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Submit Resource
            </Link>
          </div>
          
          <div className="mb-8 animate-slide-in">
            <SearchBar onSearch={setSearchTerm} placeholder="Search by title, description or category..." />
          </div>
          
          <div className="mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          
          {filteredResources.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="mb-4 text-gray-400">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No resources found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <div 
                  key={resource.id} 
                  className="animate-scale-in" 
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <ResourceCard {...resource} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Directory;
