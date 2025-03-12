
import { Hero } from '@/components/Hero';
import { FeaturedSection } from '@/components/FeaturedSection';
import { NavBar } from '@/components/NavBar';

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-16">
        <Hero />
        <FeaturedSection />
        
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in">
                <div className="inline-flex items-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                  <span>How it works</span>
                </div>
                
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Learn any skill with curated free resources
                </h2>
                
                <p className="text-gray-500 mb-8">
                  LearnHub aggregates the best free learning resources from across the web so you don't have to waste time searching. We've done the hard work for you.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: 'Curated Content', description: 'Every resource is hand-picked and reviewed by our team of experts.' },
                    { title: 'Earn Points', description: 'Track your progress and earn points as you complete resources.' },
                    { title: 'Community Driven', description: 'Our community helps identify the best content for real learning outcomes.' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{feature.title}</h3>
                        <p className="text-gray-500 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass p-8 rounded-2xl shadow-lg border border-white/50 animate-slide-in">
                <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                    alt="People learning together" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">1,293 learning right now</span>
                    </div>
                    <div className="glass py-1 px-3 rounded-full text-xs font-medium">
                      100% Free
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-blue-50">
                      <div className="text-3xl font-bold text-blue-600">500+</div>
                      <div className="text-sm text-gray-500">Resources</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-blue-50">
                      <div className="text-3xl font-bold text-blue-600">10+</div>
                      <div className="text-sm text-gray-500">Categories</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-blue-50/50">
          <div className="container px-4 mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-10">
              Ready to start learning?
            </h2>
            
            <a 
              href="/directory" 
              className="inline-block px-8 py-4 rounded-lg bg-blue-600 text-white font-medium transition-all duration-300 hover:bg-blue-700 shadow-md hover:shadow-lg"
            >
              Explore the Directory
            </a>
          </div>
        </section>
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

export default Index;
