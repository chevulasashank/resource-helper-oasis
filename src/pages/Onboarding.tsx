
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { saveUserPreferences, getCurrentUser, categories } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, ArrowRight, ArrowLeft, ChevronRight, 
  Clock, BarChart, Layers, CheckCircle2, ListChecks 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const learningGoals = [
  { id: 'career', label: 'Career advancement' },
  { id: 'skills', label: 'Learn new skills' },
  { id: 'specific', label: 'Master a specific technology' },
  { id: 'hobby', label: 'Personal hobby' },
  { id: 'school', label: 'School/academic requirements' }
];

const formats = [
  { id: 'video', label: 'Video tutorials' },
  { id: 'reading', label: 'Reading materials' },
  { id: 'interactive', label: 'Interactive exercises' },
  { id: 'project', label: 'Project-based learning' },
  { id: 'community', label: 'Community discussions' }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  
  // Form state
  const [learningGoalSelections, setLearningGoalSelections] = useState<string[]>([]);
  const [categorySelections, setCategorySelections] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [weeklyHours, setWeeklyHours] = useState<number>(5);
  const [formatSelections, setFormatSelections] = useState<string[]>([]);
  
  useEffect(() => {
    // Redirect if user is not logged in
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Redirect if user has already completed onboarding
    if (user.hasCompletedOnboarding) {
      navigate('/dashboard');
      return;
    }
    
    // Update progress based on current step
    setProgress(step * 20);
  }, [step, navigate]);
  
  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleComplete = () => {
    // Save all preferences
    saveUserPreferences({
      learningGoals: learningGoalSelections,
      preferredCategories: categorySelections,
      skillLevel,
      weeklyHours,
      preferredFormats: formatSelections,
      hasCompletedOnboarding: true
    });
    
    toast({
      title: "Onboarding complete!",
      description: "We've personalized your learning experience based on your preferences.",
      duration: 3000,
    });
    
    navigate('/dashboard');
  };
  
  const toggleLearningGoal = (id: string) => {
    setLearningGoalSelections(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };
  
  const toggleCategory = (id: string) => {
    setCategorySelections(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };
  
  const toggleFormat = (id: string) => {
    setFormatSelections(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };
  
  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-24 pb-20">
        <div className="container px-4 mx-auto max-w-3xl">
          <div className="mb-10 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">Personalize Your Experience</h1>
              <div className="text-sm font-medium text-gray-500">
                Step {step} of 5
              </div>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Getting Started</span>
              <span>Preferences</span>
              <span>Completed</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-scale-in">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <ListChecks className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">What are your learning goals?</h2>
                </div>
                <p className="text-gray-500">
                  Select all that apply to help us understand what you're looking to achieve.
                </p>
                
                <div className="space-y-4 mt-6">
                  {learningGoals.map(goal => (
                    <div key={goal.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={`goal-${goal.id}`} 
                        checked={learningGoalSelections.includes(goal.id)}
                        onCheckedChange={() => toggleLearningGoal(goal.id)}
                      />
                      <Label htmlFor={`goal-${goal.id}`} className="text-base cursor-pointer">
                        {goal.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <Layers className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Which topics interest you?</h2>
                </div>
                <p className="text-gray-500">
                  Select categories that you'd like to explore in your learning journey.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-3">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={categorySelections.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-base cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <BarChart className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">What's your current skill level?</h2>
                </div>
                <p className="text-gray-500">
                  Tell us about your experience so we can recommend appropriate resources.
                </p>
                
                <RadioGroup value={skillLevel} onValueChange={(v) => setSkillLevel(v as any)} className="space-y-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="beginner" id="skill-beginner" />
                    <div className="space-y-1">
                      <Label htmlFor="skill-beginner" className="text-base font-medium">Beginner</Label>
                      <p className="text-gray-500 text-sm">New to these topics, looking for introductory content</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="intermediate" id="skill-intermediate" />
                    <div className="space-y-1">
                      <Label htmlFor="skill-intermediate" className="text-base font-medium">Intermediate</Label>
                      <p className="text-gray-500 text-sm">Familiar with basics, seeking to deepen knowledge</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="advanced" id="skill-advanced" />
                    <div className="space-y-1">
                      <Label htmlFor="skill-advanced" className="text-base font-medium">Advanced</Label>
                      <p className="text-gray-500 text-sm">Experienced, looking for expert-level content</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <Clock className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">How much time can you commit weekly?</h2>
                </div>
                <p className="text-gray-500">
                  We'll recommend resources that fit your schedule.
                </p>
                
                <RadioGroup value={weeklyHours.toString()} onValueChange={(v) => setWeeklyHours(parseInt(v))} className="space-y-4 mt-6">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="2" id="hours-2" />
                    <Label htmlFor="hours-2" className="text-base">1-2 hours per week</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="5" id="hours-5" />
                    <Label htmlFor="hours-5" className="text-base">3-5 hours per week</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="10" id="hours-10" />
                    <Label htmlFor="hours-10" className="text-base">5-10 hours per week</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="20" id="hours-20" />
                    <Label htmlFor="hours-20" className="text-base">10+ hours per week</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {step === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <BookOpen className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">What learning formats do you prefer?</h2>
                </div>
                <p className="text-gray-500">
                  Select all the formats that work best for your learning style.
                </p>
                
                <div className="space-y-4 mt-6">
                  {formats.map(format => (
                    <div key={format.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={`format-${format.id}`} 
                        checked={formatSelections.includes(format.id)}
                        onCheckedChange={() => toggleFormat(format.id)}
                      />
                      <Label htmlFor={`format-${format.id}`} className="text-base cursor-pointer">
                        {format.label}
                      </Label>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-gray-100 mt-6">
                  <div className="rounded-lg bg-blue-50 p-4 text-blue-800 flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      You're all set! We'll use your preferences to create a personalized learning experience. 
                      You can always update these preferences later from your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-10">
              {step > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 5 ? (
                <Button 
                  onClick={handleNext}
                  className="flex items-center ml-auto"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleComplete}
                  className="flex items-center ml-auto bg-green-600 hover:bg-green-700"
                >
                  Complete
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
