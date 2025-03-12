
import { useState } from "react";
import { Upload, X, Plus, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/lib/data";

interface ResourceSubmissionFormProps {
  onSubmitSuccess: () => void;
}

export function ResourceSubmissionForm({ onSubmitSuccess }: ResourceSubmissionFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    source: "",
    url: "",
    duration: "",
    thumbnailUrl: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 30) {
      newErrors.description = "Description should be at least 30 characters";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    if (!formData.source.trim()) {
      newErrors.source = "Source is required";
    }
    
    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    } else {
      try {
        new URL(formData.url);
      } catch (e) {
        newErrors.url = "Please enter a valid URL";
      }
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }
    
    if (!formData.thumbnailUrl.trim()) {
      newErrors.thumbnailUrl = "Thumbnail URL is required";
    } else {
      try {
        new URL(formData.thumbnailUrl);
      } catch (e) {
        newErrors.thumbnailUrl = "Please enter a valid URL";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Resource submitted:", formData);
        
        // In a real implementation, you would send this data to your backend
        // const response = await fetch('/api/resources', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        
        onSubmitSuccess();
      } catch (error) {
        console.error("Error submitting resource:", error);
        toast({
          title: "Submission failed",
          description: "There was an error submitting your resource. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Resource Information</h2>
        
        <div className="space-y-6">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Resource Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., JavaScript Crash Course for Beginners"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-2 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Provide a comprehensive description of what users will learn from this resource..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
          
          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.category ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>
          
          {/* Source */}
          <div className="form-group">
            <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
              Source <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="source"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.source ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., YouTube, Udemy, Medium, etc."
            />
            {errors.source && <p className="mt-1 text-sm text-red-500">{errors.source}</p>}
          </div>
          
          {/* URL */}
          <div className="form-group">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Resource URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.url ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="https://example.com/resource"
            />
            {errors.url && <p className="mt-1 text-sm text-red-500">{errors.url}</p>}
          </div>
          
          {/* Duration */}
          <div className="form-group">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.duration ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., 1h 20m, 45m, 2h 30m"
            />
            {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
          </div>
          
          {/* Thumbnail URL */}
          <div className="form-group">
            <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="thumbnailUrl"
              name="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.thumbnailUrl ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.thumbnailUrl && <p className="mt-1 text-sm text-red-500">{errors.thumbnailUrl}</p>}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Submission Guidelines</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>All submissions are reviewed by our team before being added to the directory</li>
                <li>Resources should be high-quality, educational content</li>
                <li>Ensure the resource URL is correct and accessible</li>
                <li>Provide an accurate description that helps learners understand what they'll gain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Submit Resource
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
