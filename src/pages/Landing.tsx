import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: 'auth' | 'dashboard') => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl tracking-tight text-slate-800">ContentFlow AI</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('auth')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => onNavigate('auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <div 
          className={`transform transition-all duration-1000 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Enterprise content <br className="hidden sm:block" />
            <span className="text-blue-600">automated</span> at scale.
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Draft, review, localize, and distribute your content seamlessly across multiple channels using our intelligent multi-agent AI pipeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('auth')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-transform hover:-translate-y-0.5 shadow-md"
            >
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-sm"
            >
              Try Demo Pipeline
            </button>
          </div>
        </div>

        <div className={`mt-32 grid md:grid-cols-3 gap-8 transform transition-all duration-1000 delay-300 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-amber-500" />}
            title="Lightning Fast"
            desc="Generate complete workflows in seconds powered by Groq and Gemini."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-emerald-500" />}
            title="Brand Compliant"
            desc="Automated review gates ensure your tone and terminology stay pristine."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6 text-indigo-500" />}
            title="Multi-Channel"
            desc="Instantly adapt content for LinkedIn, Twitter, blogs, and FAQs."
          />
        </div>
      </main>
    </div>
  );
};

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-left hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

export default Landing;
