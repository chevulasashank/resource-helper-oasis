import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { loginUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const user = await loginUser(email, password);
      toast({
        title: "Logged in successfully",
        description: "Welcome back to LearnHub!",
        duration: 3000,
      });
      
      // Skip onboarding for existing users who have already completed it
      // or are returning users (checking by completed resources)
      if (!user.hasCompletedOnboarding && user.completedResources.length === 0) {
        navigate('/onboarding');
      } else {
        // Always redirect to dashboard for returning users
        navigate('/dashboard');
      }
    } catch (err) {
      setError((err as Error).message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-24">
        <div className="container px-4 mx-auto max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex h-12 w-12 rounded-lg bg-blue-500/10 items-center justify-center mb-4">
              <LogIn className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-500">
              Log in to your LearnHub account to continue your learning journey
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-scale-in">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <Mail className="h-5 w-5" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <Lock className="h-5 w-5" />
                    </span>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Log In <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
