
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { resources } from '@/lib/data';
import { Star, ArrowLeft, Clock, ExternalLink, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Resource = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState(resources.find(r => r.id === id));
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleMarkAsCompleted = () => {
    toast({
      title: "Resource Completed",
      description: `You've earned ${resource?.points} points!`,
      duration: 3000,
    });
  };
  
  if (!resource) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="container px-4 mx-auto max-w-7xl py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Resource Not Found</h1>
          <p className="text-gray-500 mb-8">The resource you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/directory"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      
      <main className="pt-24">
        <div className="container px-4 mx-auto max-w-3xl">
          <Link 
            to="/directory"
            className="inline-flex items-center text-sm font-medium text-gray-600 mb-6 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Directory
          </Link>
          
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
              <span>{resource.category}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{resource.duration}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{resource.rating}</span>
              </div>
              <div className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-1" />
                <span>{resource.source}</span>
              </div>
              <div className="flex items-center glass py-1 px-3 rounded-full text-xs font-medium">
                <span>+{resource.points} points</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 mb-8">
              {resource.description}
            </p>
          </div>
          
          <div className="rounded-xl overflow-hidden mb-10 bg-gray-100 relative animate-scale-in">
            {loading ? (
              <div className="aspect-video animate-pulse bg-gray-200 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${resource.url.split('v=')[1]}`}
                title={resource.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
            <a 
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium transition-all duration-300 hover:bg-blue-700 text-center shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open Original
            </a>
            <button 
              onClick={handleMarkAsCompleted}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              Mark as Completed
            </button>
          </div>
          
          {resource.content && (
            <div className="glass p-8 rounded-xl mb-12 animate-fade-in">
              <div className="prose prose-blue max-w-none">
                <h2 className="text-2xl font-bold mb-4">About This Resource</h2>
                <div className="whitespace-pre-line">
                  {resource.content}
                </div>
              </div>
            </div>
          )}
          
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Similar Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {resources
                .filter(r => r.category === resource.category && r.id !== resource.id)
                .slice(0, 2)
                .map((relatedResource) => (
                  <div key={relatedResource.id} className="animate-scale-in">
                    <ResourceCard {...relatedResource} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resource;
