
import React from 'react';
import { ChatMessage } from '../../types';
import GlassCard from '../UI/GlassCard';
import { Bot, User, MapPin } from 'lucide-react';

interface ChatSidebarProps {
  messages: ChatMessage[];
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ messages, onClose }) => {
  return (
    <GlassCard className="absolute top-20 left-4 bottom-24 w-80 flex flex-col z-40 bg-slate-900/95 border-purple-500/20 shadow-2xl animate-slide-in-left">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-white font-bold flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-400" />
          Chat Assistant
        </h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 mt-10">
            <p>Ask me anything about the map or navigation.</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-purple-600'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
            </div>
            <div className={`p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-slate-800 text-slate-200' : 'bg-purple-900/40 border border-purple-500/20 text-slate-100'}`}>
              {msg.text}
              {msg.places && msg.places.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                  {msg.places.map((p, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-purple-300">
                      <MapPin className="w-3 h-3" /> {p.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ChatSidebar;
