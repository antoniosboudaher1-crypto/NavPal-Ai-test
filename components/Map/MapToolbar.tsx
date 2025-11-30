
import React, { useState } from 'react';
import { MapStyle } from '../../types';
import { Layers, List, CarFront, Moon, Satellite, Map as MapIcon, Sparkles, Crosshair } from 'lucide-react';

interface MapToolbarProps {
  showRouteList: boolean;
  onToggleRouteList: () => void;
  showTraffic: boolean;
  onToggleTraffic: () => void;
  currentStyle: MapStyle;
  onStyleChange: (style: MapStyle) => void;
  isNavigating: boolean;
  onRecenter: () => void;
}

const MapToolbar: React.FC<MapToolbarProps> = ({
  showRouteList,
  onToggleRouteList,
  showTraffic,
  onToggleTraffic,
  currentStyle,
  onStyleChange,
  isNavigating,
  onRecenter
}) => {
  const [isLayersOpen, setIsLayersOpen] = useState(false);

  const styles = [
    { id: MapStyle.NAVPAL, label: 'Luxury', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { id: MapStyle.DARK, label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { id: MapStyle.STREET, label: 'Street', icon: <MapIcon className="w-4 h-4" /> },
    { id: MapStyle.SATELLITE, label: 'Live Map', icon: <Satellite className="w-4 h-4" /> },
  ];

  return (
    <div className="absolute bottom-32 right-6 z-20 flex flex-col gap-3 pointer-events-auto items-end">
      
      {/* Toggle Route List (Nav Mode Only) */}
      {isNavigating && (
        <button 
          onClick={onToggleRouteList}
          className={`w-12 h-12 rounded-full backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-center transition-all active:scale-90 duration-200 ${showRouteList ? 'bg-purple-600 text-white' : 'bg-slate-900/90 text-white hover:bg-slate-800'}`}
          title="Route List"
        >
          <List className="w-6 h-6" />
        </button>
      )}

      {/* Recenter / Locate Me Button */}
      <button 
        onClick={onRecenter}
        className="w-12 h-12 rounded-full backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-center transition-all active:scale-90 duration-200 bg-slate-900/90 text-white hover:bg-slate-800 group"
        title="Center Map"
      >
        <Crosshair className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
      </button>

      {/* Layer Menu (Expanded) */}
      {isLayersOpen && (
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl animate-slide-in-right mb-2 flex flex-col gap-2 min-w-[140px]">
           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-2 py-1">Map Style</span>
           
           {styles.map((style) => (
             <button
               key={style.id}
               onClick={() => {
                 onStyleChange(style.id);
                 setIsLayersOpen(false);
               }}
               className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors text-sm font-medium ${currentStyle === style.id ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-300 hover:bg-white/5'}`}
             >
               {style.icon}
               {style.label}
             </button>
           ))}
           
           <div className="h-px bg-white/10 my-1" />
           
           <button
             onClick={onToggleTraffic}
             className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors text-sm font-medium ${showTraffic ? 'bg-green-600 text-white shadow-lg' : 'text-slate-300 hover:bg-white/5'}`}
           >
             <CarFront className="w-4 h-4" />
             Traffic
           </button>
        </div>
      )}

      {/* Layers Toggle Button */}
      <button 
        onClick={() => setIsLayersOpen(!isLayersOpen)}
        className={`w-12 h-12 rounded-full backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-center transition-all active:scale-90 duration-200 ${isLayersOpen || showTraffic ? 'bg-purple-600 text-white' : 'bg-slate-900/90 text-white hover:bg-slate-800'}`}
        title="Map Layers"
      >
        <Layers className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MapToolbar;
