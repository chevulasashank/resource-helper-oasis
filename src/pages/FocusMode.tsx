
import { useEffect, useState, useRef } from 'react';
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
  Minimize,
  Play,
  MessageCircle,
  PauseCircle
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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
  const [focusDuration, setFocusDuration] = useState(15 * 60); // Default: 15 minutes in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSetupScreen, setShowSetupScreen] = useState(true);
  const [question, setQuestion] = useState('');
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  
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
    
    // Set up timer only when playing
    let timer: number | undefined;
    if (isPlaying && !showSetupScreen) {
      timer = window.setInterval(() => {
        setTimeSpent(prev => {
          // Check if focus session is complete
          if (prev + 1 >= focusDuration) {
            clearInterval(timer);
            toast({
              title: "Focus Session Complete!",
              description: "Great job staying focused for the entire session.",
              duration: 5000,
            });
            return focusDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }

    // Prevent tab switching with visibilitychange event
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        // User is trying to switch tabs or minimize
        setVisibilityEvents(prev => prev + 1);
        
        // Pause video if playing
        setIsPlaying(false);
        
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
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resource, navigate, toast, originalTitle, isPlaying, showSetupScreen, focusDuration]);

  if (!resource) {
    return null;
  }

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = Math.min((timeSpent / focusDuration) * 100, 100);

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

  const startFocusMode = () => {
    setShowSetupScreen(false);
    setIsPlaying(true);
    
    toast({
      title: "Focus Mode Started",
      description: `Your ${focusDuration / 60} minute session has begun. Stay focused!`,
      duration: 3000,
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // In a real app, you'd send this question to a backend
    toast({
      title: "Question Submitted",
      description: "Your question has been submitted for review.",
      duration: 3000,
    });
    
    setQuestion('');
    setIsAskingQuestion(false);
  };

  // For the YouTube URL, extract video ID if resource.url contains a full YouTube URL
  const getYouTubeEmbedUrl = () => {
    if (!resource.url) return '';
    
    // Extract video ID from YouTube URL
    const videoIdMatch = resource.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    
    // Create embed URL with parameters for better focus (hide related videos, etc.)
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autohide=1&showinfo=0`;
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
            <span className="mx-1 text-slate-500">/</span>
            <span>{formatTime(focusDuration)}</span>
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
      
      {/* Setup screen */}
      {showSetupScreen ? (
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="max-w-md w-full bg-slate-900 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Set Up Your Focus Session</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">How long would you like to focus?</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>15 min</span>
                    <span>30 min</span>
                    <span>45 min</span>
                    <span>60 min</span>
                  </div>
                  <Slider 
                    defaultValue={[15]} 
                    min={15}
                    max={60}
                    step={15}
                    onValueChange={(value) => setFocusDuration(value[0] * 60)}
                  />
                </div>
                
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <p className="text-3xl font-bold text-blue-400">{focusDuration / 60} minutes</p>
                  <p className="text-sm text-slate-400 mt-1">Selected focus duration</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={startFocusMode}
              >
                Start Focus Session
              </Button>
              
              <p className="text-xs text-slate-400 text-center">
                You won't be able to switch tabs during this session.
                We'll keep track of your focus time.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Main content area */
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl p-8">
            {/* Video player and controls */}
            <div className="mb-8">
              <div className="rounded-lg overflow-hidden bg-black mb-4 relative">
                {resource.url && resource.url.includes('youtube') ? (
                  <iframe 
                    ref={videoRef}
                    src={getYouTubeEmbedUrl()}
                    title={resource.title}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-slate-800">
                    <Eye className="h-16 w-16 text-slate-600" />
                    <p className="mt-4 text-slate-400">Video content unavailable</p>
                  </div>
                )}
                
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Button 
                      size="icon" 
                      className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700"
                      onClick={togglePlayPause}
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={togglePlayPause}
                  className="text-white"
                >
                  {isPlaying ? (
                    <>
                      <PauseCircle className="mr-2 h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Resume
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsAskingQuestion(true)}
                  className="text-white"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Ask a Question
                </Button>
              </div>
              
              {isAskingQuestion && (
                <div className="mb-6 bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Ask a Question</h3>
                  <form onSubmit={handleAskQuestion}>
                    <textarea 
                      className="w-full p-3 bg-slate-700 rounded-md text-white mb-3"
                      placeholder="What would you like to know about this topic?"
                      rows={3}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="ghost"
                        onClick={() => setIsAskingQuestion(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Submit Question</Button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="prose prose-invert max-w-none">
                {resource.content ? (
                  <div dangerouslySetInnerHTML={{ __html: resource.content.replace(/\n/g, '<br>') }} />
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-xl font-medium mb-2">Focus on the video content</h3>
                    <p className="text-slate-400 mb-6">
                      Watch the entire video to earn points and complete this resource
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer actions */}
      <footer className="bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="outline" onClick={exitFocusMode}>
            Exit Focus Mode
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={completeResource}
            disabled={timeSpent < focusDuration * 0.7} // Require 70% completion before marking as complete
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
