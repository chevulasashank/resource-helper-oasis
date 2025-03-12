
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { ResourceSubmissionForm } from "@/components/ResourceSubmissionForm";
import { useToast } from "@/hooks/use-toast";

const SubmitResource = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    window.scrollTo(0, 0);
    toast({
      title: "Resource submitted",
      description: "Your resource has been submitted for review.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <NavBar />
      
      <main className="pt-24 container px-4 mx-auto max-w-3xl">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Submit a Resource</h1>
          <p className="text-gray-500">
            Share valuable learning resources with the LearnHub community
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center animate-scale-in">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your resource has been submitted for review. Our team will verify it before adding to the directory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Submit Another Resource
              </button>
              <a 
                href="/directory"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Directory
              </a>
            </div>
          </div>
        ) : (
          <ResourceSubmissionForm onSubmitSuccess={handleSubmitSuccess} />
        )}
      </main>
    </div>
  );
};

export default SubmitResource;
