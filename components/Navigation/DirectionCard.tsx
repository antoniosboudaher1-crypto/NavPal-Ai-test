
import React from 'react';
import { RouteStep } from '../../types';
import GlassCard from '../UI/GlassCard';
import { ArrowRight, ArrowLeft, ArrowUp, MapPin, Clock, Flag } from 'lucide-react';

interface DirectionCardProps {
  step: RouteStep;
  remainingDuration: number; // in seconds
  remainingDistance: number; // in meters
  isNearDestination?: boolean;
  onEndNavigation: () => void;
  showSpeedLimit?: boolean;
  currentSpeed?: number | null; // in meters per second
}

const getIconForManeuver = (type: string, modifier?: string) => {
  if (type === 'turn') {
    if (modifier?.includes('left')) return <ArrowLeft className="w-12 h-12 text-white" />;
    if (modifier?.includes('right')) return <ArrowRight className="w-12 h-12 text-white" />;
  }
  return <ArrowUp className="w-12 h-12 text-white" />;
};

const DirectionCard: React.FC<DirectionCardProps> = ({ 
  step, 
  remainingDuration, 
  remainingDistance, 
  isNearDestination = false,
  onEndNavigation,
  showSpeedLimit = true,
  currentSpeed
}) => {
  const minutes = Math.floor(remainingDuration / 60);
  const km = (remainingDistance / 1000).toFixed(1);
  
  // Convert current speed to km/h (1 m/s = 3.6 km/h)
  const currentSpeedKmh = currentSpeed !== undefined && currentSpeed !== null 
    ? Math.round(currentSpeed * 3.6) 
    : 0;

  // Calculate ETA based on current time + remaining seconds
  const now = new Date();
  const arrivalTime = new Date(now.getTime() + remainingDuration * 1000);
  const etaString = arrivalTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="absolute top-4 left-4 right-4 z-40 flex flex-col items-center gap-2 animate-slide-down">
      <GlassCard className={`w-full max-w-md bg-slate-900/90 p-0 overflow-hidden border-t-4 shadow-2xl shadow-black/50 relative transition-colors duration-500 ${isNearDestination ? 'border-t-purple-500 shadow-purple-900/40' : 'border-t-green-500'}`}>
        
        {/* Arriving Soon Alert Banner */}
        {isNearDestination && (
          <div className="bg-purple-600/90 w-full py-1 flex items-center justify-center gap-2 animate-pulse" role="alert">
            <Flag className="w-3 h-3 text-white fill-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Arriving Soon</span>
          </div>
        )}

        {/* Speed Information Container (Absolute Positioned) */}
        <div className="absolute top-8 right-4 z-20 flex flex-col items-end gap-2">
           
           {/* Current Speed Display (Digital Style) */}
           <div className="flex flex-col items-center justify-center bg-black/40 backdrop-blur-md rounded-lg border border-white/10 px-2 py-1 shadow-lg" aria-label={`Current speed ${currentSpeedKmh} kilometers per hour`}>
             <span className="text-[10px] font-bold text-slate-400 uppercase leading-none" aria-hidden="true">Current</span>
             <div className="flex items-baseline gap-0.5">
                <span className={`text-2xl font-black leading-none ${currentSpeedKmh > (step.speedLimit || 120) ? 'text-red-400' : 'text-white'}`}>
                  {currentSpeedKmh}
                </span>
                <span className="text-[10px] font-bold text-slate-500" aria-hidden="true">km/h</span>
             </div>
           </div>

           {/* Regulatory Speed Limit Sign */}
           {showSpeedLimit && step.speedLimit !== undefined && (
            <div 
              className="flex flex-col items-center justify-center w-14 h-16 bg-white border-[3px] border-slate-900 rounded-md shadow-lg"
              role="img"
              aria-label={`Speed limit ${step.speedLimit}`}
            >
              <span className="text-[8px] font-extrabold text-slate-900 uppercase leading-none mt-1" aria-hidden="true">SPEED</span>
              <span className="text-[8px] font-extrabold text-slate-900 uppercase leading-none mb-0.5" aria-hidden="true">LIMIT</span>
              <span className="text-2xl font-black text-slate-900 leading-none -mt-0.5">{step.speedLimit}</span>
            </div>
           )}
        </div>

        <div className="p-6 flex items-center gap-6">
          <div 
            className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-colors duration-500 ${isNearDestination ? 'bg-purple-600 shadow-purple-900/30' : 'bg-green-600 shadow-green-900/30'}`}
            role="img"
            aria-label={isNearDestination ? "Arriving at destination" : `Maneuver: ${step.maneuver.type} ${step.maneuver.modifier || ''}`}
          >
            {isNearDestination ? <Flag className="w-10 h-10 text-white" aria-hidden="true" /> : getIconForManeuver(step.maneuver.type, step.maneuver.modifier)}
          </div>
          <div className="flex-1 min-w-0 pr-16"> {/* Added more padding right to avoid overlapping speed displays */}
            <h2 className="text-4xl font-bold text-white mb-1 tracking-tight" aria-label={`In ${Math.round(step.distance)} meters`}>
              {Math.round(step.distance)}<span className="text-2xl text-slate-400 ml-1" aria-hidden="true">m</span>
            </h2>
            <p className="text-slate-300 text-lg leading-tight font-medium truncate">{step.instruction}</p>
          </div>
        </div>
        
        <div className="bg-black/20 p-4 flex justify-between items-center border-t border-white/5">
          <div className="flex gap-6">
             <div className="flex flex-col">
               <span className="text-xs text-slate-500 uppercase font-bold tracking-wider" aria-hidden="true">Arrival</span>
               <div className="flex items-center gap-2 text-white" aria-label={`Estimated arrival time ${etaString}`}>
                 <span className="font-bold text-lg">{etaString}</span>
               </div>
             </div>
             <div className="flex flex-col">
               <span className="text-xs text-slate-500 uppercase font-bold tracking-wider" aria-hidden="true">Time</span>
               <div className={`flex items-center gap-2 ${isNearDestination ? 'text-purple-400' : 'text-green-400'}`} aria-label={`${minutes} minutes remaining`}>
                 <Clock className="w-4 h-4" aria-hidden="true" />
                 <span className="font-bold text-lg">{minutes} min</span>
               </div>
             </div>
             <div className="flex flex-col">
               <span className="text-xs text-slate-500 uppercase font-bold tracking-wider" aria-hidden="true">Distance</span>
               <div className="flex items-center gap-2 text-slate-300" aria-label={`${km} kilometers remaining`}>
                 <MapPin className="w-4 h-4" aria-hidden="true" />
                 <span className="font-bold text-lg">{km} km</span>
               </div>
             </div>
          </div>
          <button 
            onClick={onEndNavigation}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl font-bold transition-all active:scale-95"
            aria-label="Exit Navigation"
          >
            Exit
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default DirectionCard;
