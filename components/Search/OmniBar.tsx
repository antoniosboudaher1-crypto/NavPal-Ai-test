
import React, { useState, useRef } from 'react';
import { Search, Mic, Navigation, Loader2, Send, MicOff, AudioLines, User as UserIcon } from 'lucide-react';
import GlassCard from '../UI/GlassCard';

interface OmniBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  isListening: boolean;
  onMicClick: () => void;
  onProfileClick?: () => void;
  userAvatar?: string;
}

const OmniBar: React.FC<OmniBarProps> = ({ 
  onSearch, 
  isLoading, 
  isListening, 
  onMicClick,
  onProfileClick,
  userAvatar 
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
      // Note: We DO NOT clear the query here. 
      // In a map app, the search term usually stays visible so the user knows what they are looking at.
      inputRef.current?.blur(); // Dismiss keyboard/focus
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <GlassCard className="relative z-20 w-full max-w-2xl mx-auto mt-4 p-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-within:border-purple-500/40 focus-within:shadow-[0_0_30px_rgba(168,85,247,0.15)] focus-within:bg-slate-900/80 focus-within:scale-[1.01]">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        
        {/* Left Icon / Profile Toggle */}
        {onProfileClick ? (
          <button 
            type="button"
            onClick={onProfileClick}
            className="relative group shrink-0 transition-transform duration-300 active:scale-95"
          >
             <div className={`w-10 h-10 rounded-2xl overflow-hidden border transition-all duration-300 ${isListening ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10 group-hover:border-purple-500/50'}`}>
               {userAvatar ? (
                 <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                 </div>
               )}
             </div>
             {/* Status Indicator */}
             <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 transition-all duration-300 ${isLoading ? 'bg-yellow-400 animate-pulse scale-110' : isListening ? 'bg-red-500 animate-pulse scale-110' : 'bg-green-500'}`}></div>
          </button>
        ) : (
           <div className={`p-3 rounded-2xl transition-all duration-500 ${isListening ? 'bg-red-500/20 text-red-400' : 'bg-purple-600/20 text-purple-300'}`}>
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isListening ? (
              <AudioLines className="w-6 h-6 animate-pulse" />
            ) : (
              <Navigation className="w-6 h-6" />
            )}
          </div>
        )}
        
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isListening ? "Listening (Live)..." : "Search maps..."}
            className="w-full bg-transparent border-none outline-none text-lg font-medium text-white placeholder-slate-400/70 min-w-0 transition-all duration-300 placeholder:transition-opacity focus:placeholder:opacity-50"
          />
          {/* Subtle Typing Indicator / Loader inside input area */}
          {isLoading && query && (
             <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <span className="flex gap-1">
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                </span>
             </div>
          )}
        </div>

        <div className="flex items-center gap-2 pr-2 shrink-0">
          {query.length > 0 ? (
            <div className="flex items-center gap-2 animate-zoom-in">
                {/* Clear Button */}
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span className="text-xs font-bold">&times;</span>
                </button>
                
                {/* Send Button */}
                <button 
                  type="submit"
                  className="p-2.5 rounded-full bg-purple-600 text-white hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-900/20 hover:scale-110 active:scale-95 hover:shadow-purple-500/30"
                >
                  <Send className="w-4 h-4 translate-x-0.5 translate-y-0.5" />
                </button>
            </div>
          ) : (
            <button 
              type="button" 
              onClick={onMicClick}
              className={`p-2.5 rounded-full transition-all duration-500 ease-out ${
                isListening 
                  ? 'bg-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] scale-110 rotate-6' 
                  : 'hover:bg-white/5 text-slate-400 hover:text-white hover:scale-110 hover:rotate-6'
              }`}
              title={isListening ? "Stop Live Conversation" : "Start Live Conversation"}
            >
              {isListening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
            </button>
          )}
        </div>
      </form>
    </GlassCard>
  );
};

export default OmniBar;
