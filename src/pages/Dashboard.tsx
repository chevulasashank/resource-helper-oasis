
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { ResourceCard } from '@/components/ResourceCard';
import { FocusBarGraph } from '@/components/FocusBarGraph';
import { getCurrentUser, resources, logoutUser, initializeUserFromStorage, getPersonalizedResources } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, 
  CheckCheck, 
  Clock, 
  BookOpen, 
  LogOut, 
  Sparkles,
  Flame,
  Target,
  Calendar,
  ArrowRight,
  Lock,
  User,
  BarChart4
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Dashboard = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [personalizedResources, setPersonalizedResources] = useState<typeof resources>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastActive, setLastActive] = useState<Date | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    initializeUserFromStorage();
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Check if onboarding is complete
    if (!currentUser.hasCompletedOnboarding) {
      navigate('/onboarding');
      return;
    }
    
    setUser(currentUser);
    
    // Get personalized resources
    const personalized = getPersonalizedResources();
    setPersonalizedResources(personalized);

    // Calculate streak (mock data for now)
    const storedStreak = localStorage.getItem('userStreak');
    const storedLastActive = localStorage.getItem('lastActiveDate');
    
    if (storedStreak && storedLastActive) {
      const streak = parseInt(storedStreak);
      const lastDate = new Date(storedLastActive);
      const today = new Date();
      
      // Check if user was active yesterday or today
      const dayDifference = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      
      if (dayDifference <= 1) {
        setCurrentStreak(streak);
        setLastActive(lastDate);
      } else {
        // Reset streak if more than 1 day has passed
        localStorage.setItem('userStreak', '1');
        localStorage.setItem('lastActiveDate', today.toISOString());
        setCurrentStreak(1);
        setLastActive(today);
      }
    } else {
      // Initialize streak
      const today = new Date();
      localStorage.setItem('userStreak', '1');
      localStorage.setItem('lastActiveDate', today.toISOString());
      setCurrentStreak(1);
      setLastActive(today);
    }
  }, [navigate]);
  
  const completedResources = resources.filter(res => 
    user?.completedResources.includes(res.id)
  );
  
  const inProgressResources = resources.filter(res => 
    user?.inProgressResources.includes(res.id)
  );

  const startFocusMode = (resourceId: string) => {
    navigate(`/focus/${resourceId}`);
  };
  
  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
      duration: 2000,
    });
    navigate('/');
  };
  
  const navigateToProfile = () => {
    navigate('/profile');
  };
  
  if (!user) {
    return null; // Will redirect in the useEffect
  }

  // Calculate progress percentage
  const totalResources = resources.length;
  const completedPercentage = Math.round((completedResources.length / totalResources) * 100);
  
  return (
    <div className="min-h-screen pb-20 bg-white">
      <NavBar />
      
      <main className="pt-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-wrap items-start justify-between mb-10 animate-fade-in">
            <div>
              <div className="flex items-center mb-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-50 text-blue-600 mr-3">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
              </div>
              <p className="text-gray-500">
                Track your progress and continue your learning journey
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <button
                onClick={navigateToProfile}
                className="flex items-center px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <User className="mr-2 h-4 w-4" />
                My Profile
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="glass p-6 rounded-xl shadow-sm border-2 border-gray-100 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Total Points</h3>
                  <p className="text-2xl font-bold text-gray-900">{user.points}</p>
                </div>
              </div>
              <Progress value={(user.points / 500) * 100} className="h-2 bg-blue-100" />
              <div className="mt-2 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  {500 - user.points} points until next level
                </p>
                <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                  {Math.round((user.points / 500) * 100)}% Complete
                </span>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl shadow-sm border-2 border-gray-100 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <CheckCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Completed</h3>
                  <p className="text-2xl font-bold text-gray-900">{completedResources.length}</p>
                </div>
              </div>
              <Progress value={completedPercentage} className="h-2 bg-green-100" />
              <div className="mt-2 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Total resources
                </p>
                <span className="text-xs font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                  {completedPercentage}% Complete
                </span>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl shadow-sm border-2 border-gray-100 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">In Progress</h3>
                  <p className="text-2xl font-bold text-gray-900">{inProgressResources.length}</p>
                </div>
              </div>
              <Link 
                to="/directory"
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center"
              >
                Explore more resources
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            <div className="glass p-6 rounded-xl shadow-sm border-2 border-gray-100 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 mr-3">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Current Streak</h3>
                  <p className="text-2xl font-bold text-gray-900">{currentStreak} days</p>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                {[...Array(7)].map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                      index < currentStreak % 7 
                        ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-sm' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Last active: {lastActive ? new Date(lastActive).toLocaleDateString() : 'Today'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Focus Bar Graph - Left Column */}
            <div className="md:col-span-1 animate-fade-in">
              <FocusBarGraph className="h-full" />
            </div>

            {/* Learning Plan - Right Column (spans 2) */}
            <div className="md:col-span-2 animate-fade-in">
              <div className="flex flex-col h-full">
                <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 text-blue-600 mr-2">
                    <Target className="h-4 w-4" />
                  </div>
                  Your Learning Plan
                </h2>
                
                <div className="glass rounded-xl p-6 mb-4 border-2 border-gray-100 shadow-sm flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">Weekly Learning Goals</h3>
                      <p className="text-gray-500 text-sm">Based on your preferences ({user.weeklyHours} hours/week)</p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <div className="inline-flex items-center px-3 py-1 bg-blue-50 rounded-full">
                        <BarChart4 className="text-blue-600 h-3 w-3 mr-1" />
                        <p className="text-sm font-medium text-gray-700">Progress this week</p>
                      </div>
                      <p className="text-lg font-bold text-blue-600 mt-1">
                        <span className="text-2xl">2</span>/{user.weeklyHours} hours
                      </p>
                    </div>
                  </div>
                  
                  <Progress 
                    value={(2 / user.weeklyHours) * 100} 
                    className="h-3 mb-6 bg-blue-100" 
                  />
                  
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs font-medium text-gray-700">{day}</div>
                        <div className={`h-10 w-10 mx-auto rounded-lg flex items-center justify-center text-sm shadow-sm ${
                          index < 2 
                            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {index < 2 ? <CheckCheck className="h-5 w-5" /> : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-700">This Week's Focus</h4>
                      <p className="text-sm text-gray-500">Web Development Fundamentals</p>
                    </div>
                    <Link 
                      to="/calendar" 
                      className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      View Calendar
                    </Link>
                  </div>
                </div>
                
                <div className="glass rounded-xl p-5 border-2 border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">Upcoming Sessions</h3>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">This Week</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { day: 'Thursday', time: '3:00 PM', topic: 'JavaScript Basics' },
                      { day: 'Friday', time: '4:30 PM', topic: 'CSS Layouts' }
                    ].map((session, idx) => (
                      <div key={idx} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{session.topic}</p>
                          <p className="text-xs text-gray-500">{session.day} at {session.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="px-2 h-8">
                          <Lock className="h-3.5 w-3.5 mr-1" />
                          Focus
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="recommended" className="mb-10 animate-fade-in">
            <TabsList className="mb-6 bg-gray-100 p-1 border border-gray-200">
              <TabsTrigger 
                value="recommended" 
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                Recommended
              </TabsTrigger>
              <TabsTrigger 
                value="in-progress"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger 
                value="completed"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                Completed
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended">
              {personalizedResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {personalizedResources.slice(0, 6).map((resource, index) => (
                    <div 
                      key={resource.id} 
                      className="animate-scale-in relative" 
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      <ResourceCard {...resource} />
                      <Button 
                        onClick={() => startFocusMode(resource.id)}
                        className="mt-2 w-full flex items-center justify-center"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        Start Focus Mode
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Sparkles className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No recommendations yet</h3>
                  <p className="text-gray-500 mb-6">
                    Complete your profile preferences to get personalized recommendations
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="in-progress">
              {inProgressResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {inProgressResources.map((resource, index) => (
                    <div 
                      key={resource.id} 
                      className="animate-scale-in relative"
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      <ResourceCard {...resource} />
                      <Button 
                        onClick={() => startFocusMode(resource.id)}
                        className="mt-2 w-full flex items-center justify-center"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        Continue in Focus Mode
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No in-progress resources</h3>
                  <p className="text-gray-500 mb-6">
                    Start learning by marking resources as "In Progress"
                  </p>
                  <Link
                    to="/directory"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Resources <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {completedResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {completedResources.map((resource, index) => (
                    <div 
                      key={resource.id} 
                      className="animate-scale-in"
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      <ResourceCard {...resource} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <CheckCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No completed resources yet</h3>
                  <p className="text-gray-500 mb-6">
                    Mark resources as completed to track your progress
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
