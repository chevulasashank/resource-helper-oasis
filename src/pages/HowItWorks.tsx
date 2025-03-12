
import { NavBar } from '@/components/NavBar';
import { Layers, CircuitBoard, Workflow } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Hero section */}
          <section className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How LearnHub Works</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              LearnHub makes learning accessible to everyone by curating the best free resources
              from across the web and organizing them into learning paths.
            </p>
          </section>
          
          {/* Steps section */}
          <section className="mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Layers className="w-10 h-10 text-blue-600" />,
                  title: "Curated Content",
                  description: "We carefully select the best free learning resources for each topic, saving you hours of searching and filtering."
                },
                {
                  icon: <Workflow className="w-10 h-10 text-blue-600" />,
                  title: "Track Your Progress",
                  description: "Mark resources as completed, earn points, and visualize your learning journey through our dashboard."
                },
                {
                  icon: <CircuitBoard className="w-10 h-10 text-blue-600" />,
                  title: "Community Driven",
                  description: "Resources are rated by our community to ensure quality, relevance, and up-to-date content."
                }
              ].map((step, index) => (
                <div key={index} className="glass p-8 rounded-xl text-center transition-all duration-300 hover:shadow-lg">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-50 mb-5">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* How to use section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Getting Started is Easy</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Follow these simple steps to begin your learning journey with LearnHub
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-8">
                  {[
                    {
                      number: "01",
                      title: "Create a Free Account",
                      description: "Sign up with your email to personalize your learning experience and track your progress."
                    },
                    {
                      number: "02",
                      title: "Explore the Directory",
                      description: "Browse through our curated collections of resources filtered by category, difficulty, and format."
                    },
                    {
                      number: "03",
                      title: "Start Learning",
                      description: "Select resources that match your goals and start learning at your own pace."
                    },
                    {
                      number: "04",
                      title: "Track Your Progress",
                      description: "Mark resources as completed and see your progress in your personal dashboard."
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="glass p-6 rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Person learning on LearnHub" 
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about LearnHub
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Is LearnHub completely free?",
                  answer: "Yes, LearnHub is 100% free. We curate free learning resources from across the web to make education accessible to everyone."
                },
                {
                  question: "How are resources selected?",
                  answer: "Our team of experts reviews content based on accuracy, clarity, production quality, and user reviews. We only include the best free resources."
                },
                {
                  question: "Can I suggest a resource?",
                  answer: "Absolutely! We welcome community suggestions. You can submit resources through the feedback form in your dashboard."
                },
                {
                  question: "What do points mean on LearnHub?",
                  answer: "Points represent your learning progress. You earn points by completing resources, participating in discussions, and contributing to the community."
                },
                {
                  question: "How do I track my progress?",
                  answer: "Once you create an account, you can mark resources as completed. Your dashboard will show your learning statistics and progress over time."
                }
              ].map((faq, index) => (
                <div key={index} className="glass p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* CTA section */}
          <section className="text-center py-12 px-4 glass rounded-3xl">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are building their skills for free on LearnHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/signup" 
                className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Create Free Account
              </a>
              <a 
                href="/directory" 
                className="px-8 py-3 rounded-lg border border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                Explore Resources
              </a>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">LH</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">LearnHub</span>
            </div>
            
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LearnHub. All resources are free and curated for learning.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;
