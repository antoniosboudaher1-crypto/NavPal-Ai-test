
import React from 'react';
import { Place } from '../../types';
import GlassCard from '../UI/GlassCard';
import { MapPin, Navigation2 } from 'lucide-react';

interface SearchResultsProps {
  places: Place[];
  onSelect: (place: Place) => void;
  onHover: (place: Place) => void;
  onLeave: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ places, onSelect, onHover, onLeave }) => {
  if (places.length === 0) return null;

  return (
    <GlassCard className="absolute top-[72px] left-0 right-0 mx-auto w-full max-w-2xl overflow-hidden animate-slide-down max-h-[300px] overflow-y-auto custom-scrollbar">
      <div className="flex flex-col p-1">
        {places.map((place) => (
          <button
            key={place.id}
            onClick={() => onSelect(place)}
            onMouseEnter={() => onHover(place)}
            onMouseLeave={() => onLeave()}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all text-left group border border-transparent hover:border-purple-500/30"
          >
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-purple-600 transition-colors">
              <MapPin className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{place.name}</h3>
              <p className="text-sm text-slate-400 truncate">{place.address}</p>
            </div>
            <Navigation2 className="w-4 h-4 text-slate-600 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all" />
          </button>
        ))}
      </div>
    </GlassCard>
  );
};

export default SearchResults;
