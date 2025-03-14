
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { getCurrentUser, resources, categories, initializeUserFromStorage, saveUserPreferences } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  BookOpen, 
  Clock, 
  Award, 
  Calendar,
  ArrowLeft,
  Edit,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StudentProfile = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedWeeklyHours, setEditedWeeklyHours] = useState(5);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    initializeUserFromStorage();
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    setEditedName(currentUser.name);
    setEditedWeeklyHours(currentUser.weeklyHours);
  }, [navigate]);
  
  const handleSaveProfile = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      name: editedName,
      weeklyHours: editedWeeklyHours
    };
    
    saveUserPreferences(updatedUser);
    setUser(updatedUser);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
      duration: 2000,
    });
  };
  
  const goBack = () => {
    navigate('/dashboard');
  };
  
  if (!user) return null;
  
  const completedResources = resources.filter(res => 
    user.completedResources.includes(res.id)
  );
  
  const inProgressResources = resources.filter(res => 
    user.inProgressResources.includes(res.id)
  );
  
  // Calculate statistics
  const totalCompletedPoints = completedResources.reduce((total, resource) => total + resource.points, 0);
  const completionRate = (completedResources.length / resources.length) * 100;
  
  // Mock data for charts
  const categoryData = categories.map(category => {
    const completed = completedResources.filter(r => r.category === category).length;
    const inProgress = inProgressResources.filter(r => r.category === category).length;
    return {
      name: category,
      completed,
      inProgress
    };
  }).filter(d => d.completed > 0 || d.inProgress > 0).slice(0, 5);
  
  const activityData = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 0.5 },
    { day: 'Wed', hours: 2 },
    { day: 'Thu', hours: 0 },
    { day: 'Fri', hours: 1 },
    { day: 'Sat', hours: 0.5 },
    { day: 'Sun', hours: 0 }
  ];
  
  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      
      <main className="pt-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <Button 
            variant="ghost" 
            onClick={goBack} 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Summary */}
            <div className="w-full md:w-1/3">
              <Card className="mb-6">
                <CardHeader className="relative pb-0">
                  {!isEditing ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-4 right-4" 
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-4 right-4" 
                      onClick={handleSaveProfile}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    {isEditing ? (
                      <Input 
                        value={editedName} 
                        onChange={(e) => setEditedName(e.target.value)}
                        className="max-w-[200px] text-center mb-1"
                      />
                    ) : (
                      <CardTitle className="text-2xl">{user.name}</CardTitle>
                    )}
                    
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Skill Level</span>
                        <span className="font-medium capitalize">{user.skillLevel}</span>
                      </div>
                      <Progress value={user.skillLevel === 'beginner' ? 33 : user.skillLevel === 'intermediate' ? 66 : 100} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Weekly Hours Goal</span>
                        {isEditing ? (
                          <Input 
                            type="number"
                            value={editedWeeklyHours} 
                            onChange={(e) => setEditedWeeklyHours(parseInt(e.target.value) || 1)}
                            className="w-16 h-6 text-center"
                            min={1}
                            max={40}
                          />
                        ) : (
                          <span className="font-medium">{user.weeklyHours} hours</span>
                        )}
                      </div>
                      <Progress value={(2 / user.weeklyHours) * 100} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Points</span>
                        <span className="font-medium">{user.points} / 500</span>
                      </div>
                      <Progress value={(user.points / 500) * 100} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start">
                  <h4 className="font-medium mb-2">Preferred Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.preferredCategories.length > 0 ? (
                      user.preferredCategories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No preferences set</p>
                    )}
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.learningGoals.length > 0 ? (
                    <ul className="space-y-2">
                      {user.learningGoals.map((goal, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5">
                            <span className="text-xs">{index + 1}</span>
                          </div>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No learning goals set</p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Progress and Stats */}
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="progress">
                <TabsList className="mb-6">
                  <TabsTrigger value="progress">Learning Progress</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="progress" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Learning by Category</CardTitle>
                      <CardDescription>Your progress across different learning categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ChartContainer 
                          config={{
                            completed: { color: '#8B5CF6' },
                            inProgress: { color: '#D6BCFA' },
                          }}
                        >
                          <BarChart data={categoryData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="completed" name="Completed" fill="var(--color-completed)" />
                            <Bar dataKey="inProgress" name="In Progress" fill="var(--color-inProgress)" />
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resource Completion</CardTitle>
                      <CardDescription>Resources completed vs. in progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 text-purple-600 mb-2">
                            <BookOpen className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-bold">{completedResources.length}</h3>
                          <p className="text-gray-500 text-sm">Completed</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 text-yellow-600 mb-2">
                            <Clock className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-bold">{inProgressResources.length}</h3>
                          <p className="text-gray-500 text-sm">In Progress</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-2">
                            <Award className="h-6 w-6" />
                          </div>
                          <h3 className="text-2xl font-bold">{totalCompletedPoints}</h3>
                          <p className="text-gray-500 text-sm">Points Earned</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Overall Progress</span>
                          <span className="text-sm font-medium">{completionRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Weekly Activity</CardTitle>
                      <CardDescription>Hours spent learning this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ChartContainer 
                          config={{
                            hours: { color: '#0EA5E9' },
                          }}
                        >
                          <BarChart data={activityData}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="hours" name="Hours" fill="var(--color-hours)" />
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Resource</TableHead>
                            <TableHead className="text-right">Points</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">{new Date().toLocaleDateString()}</TableCell>
                            <TableCell>Completed resource</TableCell>
                            <TableCell>JavaScript Crash Course</TableCell>
                            <TableCell className="text-right">30</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">{new Date(Date.now() - 86400000).toLocaleDateString()}</TableCell>
                            <TableCell>Started resource</TableCell>
                            <TableCell>Python for Data Science</TableCell>
                            <TableCell className="text-right">—</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">{new Date(Date.now() - 86400000 * 2).toLocaleDateString()}</TableCell>
                            <TableCell>Completed resource</TableCell>
                            <TableCell>UI/UX Design Essentials</TableCell>
                            <TableCell className="text-right">45</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Achievements</CardTitle>
                      <CardDescription>Your learning milestones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4 flex items-center">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                            <Award className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">First Steps</h3>
                            <p className="text-sm text-gray-500">Completed your first resource</p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 flex items-center">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                            <Flame className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">On Fire</h3>
                            <p className="text-sm text-gray-500">Maintained a 3-day streak</p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 flex items-center opacity-50">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mr-4">
                            <Award className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">100 Points Club</h3>
                            <p className="text-sm text-gray-500">Earn 100 points total</p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 flex items-center opacity-50">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mr-4">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">Weekly Warrior</h3>
                            <p className="text-sm text-gray-500">Complete weekly hour goal</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
