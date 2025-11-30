
import React from 'react';
import { ChatMessage } from '../../types';
import { Bot, User, ExternalLink, MapPin, Globe } from 'lucide-react';

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="flex flex-col gap-6 pb-4">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-purple-600 to-indigo-600'}`}>
            {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
          </div>
          
          <div className="flex flex-col max-w-[85%]">
            {/* Message Bubble */}
            <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-slate-200 rounded-tr-none' 
                : 'bg-purple-900/40 border border-purple-500/20 text-slate-100 rounded-tl-none'
            }`}>
              <div className="prose prose-invert prose-sm max-w-none">
                 {msg.text}
              </div>
            </div>

            {/* Sources / Grounding Chips */}
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {msg.sources.slice(0, 3).map((source, idx) => (
                  <a 
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-white/5 rounded-lg text-xs text-slate-400 hover:text-purple-300 transition-colors"
                  >
                    {source.sourceType === 'map' ? <MapPin className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                    <span className="truncate max-w-[150px]">{source.title}</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
