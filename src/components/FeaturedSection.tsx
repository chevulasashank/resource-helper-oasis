
import { ResourceCard } from './ResourceCard';
import { resources } from '@/lib/data';

export function FeaturedSection() {
  // Get the top 3 featured resources
  const featuredResources = resources
    .filter(resource => resource.featured)
    .slice(0, 3);
    
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-blue-50/50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Resources</h2>
            <p className="text-gray-500 max-w-2xl">
              Handpicked by our team to help you get started with the most popular skills
            </p>
          </div>
          <a 
            href="/directory" 
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View all resources
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredResources.map((resource) => (
            <div key={resource.id} className="animate-scale-in">
              <ResourceCard {...resource} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
