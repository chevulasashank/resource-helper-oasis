
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { ResourceCard } from '@/components/ResourceCard';
import { getCurrentUser, resources, logoutUser, initializeUserFromStorage, getPersonalizedResources } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { LayoutDashboard, CheckCheck, Clock, BookOpen, LogOut, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [personalizedResources, setPersonalizedResources] = useState<typeof resources>([]);
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
  }, [navigate]);
  
  const completedResources = resources.filter(res => 
    user?.completedResources.includes(res.id)
  );
  
  const inProgressResources = resources.filter(res => 
    user?.inProgressResources.includes(res.id)
  );
  
  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
      duration: 2000,
    });
    navigate('/');
  };
  
  if (!user) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      
      <main className="pt-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-wrap items-start justify-between mb-10 animate-fade-in">
            <div>
              <div className="flex items-center mb-2">
                <LayoutDashboard className="mr-2 h-6 w-6 text-blue-600" />
                <h1 className="text-3xl font-bold">Learning Dashboard</h1>
              </div>
              <p className="text-gray-500">
                Track your progress and continue your learning journey
              </p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="mt-4 sm:mt-0 flex items-center px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass p-6 rounded-xl animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Total Points</h3>
                  <p className="text-2xl font-bold">{user.points}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${Math.min((user.points / 500) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {500 - user.points} points until next level
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <CheckCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Completed</h3>
                  <p className="text-2xl font-bold">{completedResources.length}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600 rounded-full" 
                  style={{ width: `${(completedResources.length / resources.length) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {((completedResources.length / resources.length) * 100).toFixed(0)}% of all resources
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">In Progress</h3>
                  <p className="text-2xl font-bold">{inProgressResources.length}</p>
                </div>
              </div>
              <Link 
                to="/directory"
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center"
              >
                Explore more resources
              </Link>
            </div>
          </div>
          
          {personalizedResources.length > 0 && (
            <div className="mb-10 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                Recommended for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {personalizedResources.slice(0, 3).map((resource, index) => (
                  <div 
                    key={resource.id} 
                    className="animate-scale-in" 
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <ResourceCard {...resource} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {inProgressResources.length > 0 && (
            <div className="mb-10 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-yellow-600" />
                Continue Learning
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {inProgressResources.map((resource, index) => (
                  <div 
                    key={resource.id} 
                    className="animate-scale-in" 
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <ResourceCard {...resource} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {completedResources.length > 0 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <CheckCheck className="mr-2 h-5 w-5 text-green-600" />
                Completed Resources
              </h2>
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
            </div>
          )}
          
          {completedResources.length === 0 && inProgressResources.length === 0 && personalizedResources.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="mb-4 text-gray-400">
                <BookOpen className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-2">No resources yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start exploring our directory and begin your learning journey by marking resources as "In Progress" or "Completed".
              </p>
              <Link
                to="/directory"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Browse Resources
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
