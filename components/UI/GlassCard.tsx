import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;