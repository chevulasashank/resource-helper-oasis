
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { resources, markResourceCompleted, markResourceInProgress, getCurrentUser } from '@/lib/data';
import { Star, ArrowLeft, Clock, ExternalLink, Bookmark, CheckCircle, Lock, Focus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResourceCard } from '@/components/ResourceCard';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const Resource = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState(resources.find(r => r.id === id));
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(getCurrentUser());
  const [focusDuration, setFocusDuration] = useState(15);
  const [showFocusDialog, setShowFocusDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const isCompleted = user?.completedResources.includes(id || '');
  const isInProgress = user?.inProgressResources.includes(id || '');
  const isVideoResource = resource?.url && (resource.url.includes('youtube') || resource.url.includes('vimeo'));
  
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
    
    // Auto-mark as in progress when viewing a resource (if logged in and not already marked)
    if (user && id && !isCompleted && !isInProgress) {
      markResourceInProgress(id);
      setUser(getCurrentUser());
    }
  }, [id, isCompleted, isInProgress, user]);
  
  const handleMarkAsCompleted = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to track your progress",
        duration: 3000,
      });
      return;
    }
    
    if (id) {
      markResourceCompleted(id);
      setUser(getCurrentUser());
    }
    
    toast({
      title: "Resource Completed",
      description: `You've earned ${resource?.points} points!`,
      duration: 3000,
    });
  };

  const startFocusMode = () => {
    if (id) {
      navigate(`/focus/${id}`);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    if (isVideoResource) {
      e.preventDefault();
      setShowFocusDialog(true);
    }
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
          
          <div className="rounded-xl overflow-hidden mb-10 bg-gray-100 relative animate-scale-in" onClick={handleVideoClick}>
            {loading ? (
              <div className="aspect-video animate-pulse bg-gray-200 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"></div>
              </div>
            ) : isVideoResource ? (
              <>
                <div className="aspect-video relative">
                  <img 
                    src={resource.thumbnail || `https://img.youtube.com/vi/${resource.url.split('v=')[1]}/maxresdefault.jpg`}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Button 
                      size="lg" 
                      className="bg-purple-600 hover:bg-purple-700 rounded-full h-16 w-16 flex items-center justify-center"
                    >
                      <Lock className="h-8 w-8" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                    <p className="font-medium">Click to enter Focus Mode and start learning</p>
                  </div>
                </div>
              </>
            ) : (
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${resource.url?.split('v=')[1]}`}
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
            
            <Button 
              onClick={() => setShowFocusDialog(true)}
              className="flex-1 px-6 py-3 rounded-lg bg-purple-600 text-white font-medium transition-all duration-300 hover:bg-purple-700 text-center shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Start Focus Mode
            </Button>
            
            {isCompleted ? (
              <div className="flex-1 px-6 py-3 rounded-lg border border-green-200 bg-green-50 text-green-700 font-medium flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed
              </div>
            ) : (
              <button 
                onClick={handleMarkAsCompleted}
                className="flex-1 px-6 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                Mark as Completed
              </button>
            )}
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

      {/* Focus Mode Setup Dialog */}
      <Dialog open={showFocusDialog} onOpenChange={setShowFocusDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Prepare for Focus Mode</DialogTitle>
            <DialogDescription>
              Set up your focus session before starting the video. This helps you stay engaged and get the most out of your learning.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Focus duration</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>15 min</span>
                  <span>30 min</span>
                  <span>45 min</span>
                  <span>60 min</span>
                </div>
                <Slider
                  min={15}
                  max={60}
                  step={15}
                  defaultValue={[15]}
                  onValueChange={(value) => setFocusDuration(value[0])}
                />
              </div>
              <div className="mt-4 text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{focusDuration} minutes</p>
                <p className="text-sm text-gray-500">Selected focus duration</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> During focus mode, you won't be able to switch tabs. This helps you stay focused on your learning.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFocusDialog(false)}>
              Cancel
            </Button>
            <Button onClick={startFocusMode} className="bg-purple-600 hover:bg-purple-700">
              Enter Focus Mode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resource;
