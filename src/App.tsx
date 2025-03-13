
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import Resource from "./pages/Resource";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import SubmitResource from "./pages/SubmitResource";
import Onboarding from "./pages/Onboarding";
import FocusMode from "./pages/FocusMode";
import { initializeUserFromStorage } from "./lib/data";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize user from localStorage if available
    initializeUserFromStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/resource/:id" element={<Resource />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/submit-resource" element={<SubmitResource />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/focus/:id" element={<FocusMode />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
