
import React from 'react';
import { Place } from '../../types';
import { Navigation, Star, MapPin, Share2, Clock, TriangleAlert, Globe, Phone } from 'lucide-react';
import GlassCard from '../UI/GlassCard';

interface LocationCardProps {
  place: Place;
  onClose: () => void;
  onNavigate?: () => void;
  onReport?: () => void; // Now opens the menu
}

const LocationCard: React.FC<LocationCardProps> = ({ place, onClose, onNavigate, onReport }) => {
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: place.name,
          text: `Check out ${place.name} on NavPal`,
          url: place.sourceUrl || `https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${place.name} - ${place.address}`);
      alert("Copied to clipboard!");
    }
  };

  return (
    <GlassCard className="p-6 animate-slide-up shadow-2xl border-white/10 w-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white leading-tight">{place.name}</h2>
          {place.distance && <p className="text-sm text-purple-300 font-medium mt-1">{place.distance} away</p>}
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">&times;</button>
      </div>

      {/* Rating Section - Only show if real data exists */}
      {place.rating ? (
        <div className="flex items-center gap-2 mb-4 text-yellow-400">
          <Star className="w-5 h-5 fill-current" />
          <span className="font-bold text-lg">{place.rating}</span>
          <span className="text-slate-400 text-sm">({place.userRatingsTotal || '10+'} reviews)</span>
        </div>
      ) : (
        <div className="mb-2"></div>
      )}

      <div className="space-y-3 text-slate-300 mb-6">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed text-slate-200">{place.address}</p>
        </div>
        
        {/* Hours - Only show if data exists */}
        {(place.isOpen !== undefined || place.closesAt) && (
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-400 shrink-0" />
            <p className="text-sm">
              {place.isOpen ? <span className="text-green-400 font-bold">Open Now</span> : <span className="text-red-400 font-bold">Closed</span>}
              {place.closesAt && <span className="text-slate-400"> • Closes {place.closesAt}</span>}
            </p>
          </div>
        )}

        {place.phone && (
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-purple-400 shrink-0" />
            <p className="text-sm text-slate-300">{place.phone}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button 
          onClick={onNavigate}
          className="col-span-2 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-lg shadow-purple-900/30"
        >
          <Navigation className="w-5 h-5" />
          Go Now
        </button>
        
        <button 
          onClick={handleShare}
          className="col-span-1 flex flex-col items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-slate-300 py-2 rounded-xl font-medium transition-all active:scale-95 border border-white/5"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-[10px] uppercase">Share</span>
        </button>
        
        <button 
          onClick={onReport}
          className="col-span-1 flex flex-col items-center justify-center gap-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 py-2 rounded-xl font-medium transition-all active:scale-95"
        >
          <TriangleAlert className="w-5 h-5" />
          <span className="text-[10px] uppercase">Report</span>
        </button>
      </div>
    </GlassCard>
  );
};

export default LocationCard;
