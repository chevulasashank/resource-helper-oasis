
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resources, markResourceCompleted } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Lock, 
  Eye, 
  BellOff, 
  Volume2,
  VolumeX,
  Maximize,
  Minimize
} from 'lucide-react';

const FocusMode = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resource, setResource] = useState(resources.find(r => r.id === id));
  const [timeSpent, setTimeSpent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [originalTitle, setOriginalTitle] = useState('');
  const [visibilityEvents, setVisibilityEvents] = useState(0);
  
  // Set up focus mode effects
  useEffect(() => {
    if (!resource) {
      navigate('/dashboard');
      return;
    }

    // Save original document title
    setOriginalTitle(document.title);
    
    // Change document title to prevent distraction
    document.title = `Focus Mode | ${resource.title}`;
    
    // Set up timer
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    // Prevent tab switching with visibilitychange event
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User is trying to switch tabs or minimize
        setVisibilityEvents(prev => prev + 1);
        
        // Show notification to bring them back
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Focus Mode Active', {
            body: 'Please return to your learning session',
            icon: '/favicon.ico'
          });
        }
        
        toast({
          title: "Stay focused!",
          description: "Please return to your learning session",
          duration: 3000,
        });
      }
    };

    // Request notification permission
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // Add event listener for tab switching
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up effects
    return () => {
      document.title = originalTitle;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resource, navigate, toast, originalTitle]);

  if (!resource) {
    return null;
  }

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Parse duration string (e.g., "1h 30m") to seconds
  const parseDuration = (duration: string) => {
    const hours = duration.match(/(\d+)h/);
    const minutes = duration.match(/(\d+)m/);
    return (hours ? parseInt(hours[1]) * 3600 : 0) + (minutes ? parseInt(minutes[1]) * 60 : 0);
  };

  const totalDuration = parseDuration(resource.duration);
  const progressPercentage = Math.min((timeSpent / totalDuration) * 100, 100);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => {
        console.error(`Error attempting to enable fullscreen: ${e.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // This would mute the actual content if it had audio
  };

  const completeResource = () => {
    markResourceCompleted(resource.id);
    setIsComplete(true);
    
    toast({
      title: "Resource Completed!",
      description: `You've earned ${resource.points} points`,
      duration: 3000,
    });
    
    // Give the user a moment to see the completion message before redirecting
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const exitFocusMode = () => {
    if (timeSpent > 60 && !isComplete) {
      const confirmExit = window.confirm("You haven't completed this resource. Are you sure you want to exit focus mode?");
      if (!confirmExit) return;
    }
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      {/* Focus mode header */}
      <header className="px-6 py-4 bg-slate-900 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={exitFocusMode}
            className="text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="ml-4">
            <h1 className="font-medium text-lg">{resource.title}</h1>
            <div className="flex items-center text-xs text-slate-400">
              <Lock className="h-3 w-3 mr-1" />
              <span>Focus Mode</span>
              {visibilityEvents > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-900 rounded-full">
                  {visibilityEvents} distractions
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-800 rounded-full px-3 py-1 text-sm">
            <Clock className="h-4 w-4 mr-1 text-blue-400" />
            <span>{formatTime(timeSpent)}</span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon">
            <BellOff className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      {/* Progress bar */}
      <div className="h-1 bg-slate-800 w-full">
        <div 
          className="h-full bg-blue-600 transition-all duration-1000 ease-linear" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl p-8">
          {/* Resource content would go here */}
          <div className="mb-8">
            <img 
              src={resource.thumbnail} 
              alt={resource.title} 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <div className="prose prose-invert max-w-none">
              {resource.content ? (
                <div dangerouslySetInnerHTML={{ __html: resource.content.replace(/\n/g, '<br>') }} />
              ) : (
                <div className="text-center py-10">
                  <Eye className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Content Preview Not Available</h3>
                  <p className="text-slate-400 mb-6">
                    Please visit the original source to view the full content
                  </p>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
                  >
                    View Original Content
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer actions */}
      <footer className="bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="outline" onClick={exitFocusMode}>
            Exit Focus Mode
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={completeResource}
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Mark as Complete
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default FocusMode;
