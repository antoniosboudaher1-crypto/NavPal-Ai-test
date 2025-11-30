import React, { useEffect, useState } from 'react';
import { Navigation, Map } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate system initialization progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment for realism
        return prev + Math.floor(Math.random() * 5) + 1; 
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950"></div>
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Composition */}
        <div className="relative mb-12 group scale-110">
           {/* Glow Effect */}
           <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
           
           {/* Main Icon Container */}
           <div className="relative w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl shadow-black/50 transform rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
             <div className="absolute inset-0 bg-white/5 rounded-2xl"></div>
             <Navigation className="w-12 h-12 text-purple-400 fill-purple-500/10 drop-shadow-lg" />
           </div>
           
           {/* Decorative Floating Element */}
           <div className="absolute -right-4 -bottom-4 w-10 h-10 bg-slate-800/90 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Map className="w-5 h-5 text-indigo-400" />
           </div>
        </div>

        {/* Typography */}
        <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            NavPal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">AI</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
            Next Gen Navigation System
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-16 w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 transition-all duration-200 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-3 text-[10px] text-slate-500 font-mono tracking-wider">
          INITIALIZING SYSTEMS... {progress}%
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;