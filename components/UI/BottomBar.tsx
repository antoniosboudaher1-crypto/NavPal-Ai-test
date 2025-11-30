
import React from 'react';
import { AppView } from '../../types';
import GlassCard from './GlassCard';
import { Map, User, AlertTriangle } from 'lucide-react';

interface BottomBarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onReportClick: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ 
  currentView, 
  onViewChange, 
  onReportClick
}) => {
  return (
    <div className="absolute bottom-6 left-0 right-0 z-40 flex justify-center animate-slide-up pointer-events-none">
      <div className="pointer-events-auto">
        <GlassCard className="flex items-center gap-6 px-6 py-3 bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 rounded-full">
          
          {/* Map / Home */}
          <button
            onClick={() => onViewChange(AppView.MAP)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 group ${
              currentView === AppView.MAP 
                ? 'bg-white/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Map className="w-6 h-6 mb-1 transition-transform group-active:scale-90" />
            <span className="text-[9px] font-bold tracking-wide uppercase opacity-80">Map</span>
          </button>

          {/* Primary Action: Report (Center Floating) */}
          <div className="relative -mt-12 mx-2">
            <button
              onClick={onReportClick}
              className="w-16 h-16 bg-gradient-to-b from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(234,88,12,0.5)] border-4 border-slate-950 hover:scale-110 hover:-translate-y-1 transition-all duration-300 active:scale-95 active:translate-y-0 group"
            >
              <AlertTriangle className="w-7 h-7 text-white fill-white/20 transition-transform group-hover:rotate-12" />
            </button>
          </div>

          {/* Profile */}
          <button
            onClick={() => onViewChange(AppView.PROFILE)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 group ${
              currentView === AppView.PROFILE 
                ? 'bg-white/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-6 h-6 mb-1 transition-transform group-active:scale-90" />
            <span className="text-[9px] font-bold tracking-wide uppercase opacity-80">Profile</span>
          </button>

        </GlassCard>
      </div>
    </div>
  );
};

export default BottomBar;
