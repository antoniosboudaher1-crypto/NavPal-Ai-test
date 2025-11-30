
import React from 'react';
import { ReportType } from '../../types';
import GlassCard from '../UI/GlassCard';
import { Siren, CarFront, TriangleAlert, OctagonAlert } from 'lucide-react';

interface ReportMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: (type: ReportType) => void;
}

const ReportMenu: React.FC<ReportMenuProps> = ({ isOpen, onClose, onReport }) => {
  if (!isOpen) return null;

  const reportOptions = [
    {
      type: ReportType.POLICE,
      label: 'Police',
      icon: <Siren className="w-8 h-8 text-white" />,
      color: 'bg-blue-600',
      shadow: 'shadow-blue-500/40'
    },
    {
      type: ReportType.ACCIDENT,
      label: 'Accident',
      icon: <CarFront className="w-8 h-8 text-white" />,
      color: 'bg-red-600',
      shadow: 'shadow-red-500/40'
    },
    {
      type: ReportType.HAZARD,
      label: 'Hazard',
      icon: <TriangleAlert className="w-8 h-8 text-white" />,
      color: 'bg-orange-500',
      shadow: 'shadow-orange-500/40'
    },
    {
      type: ReportType.TRAFFIC,
      label: 'Traffic',
      icon: <OctagonAlert className="w-8 h-8 text-white" />,
      color: 'bg-yellow-500',
      shadow: 'shadow-yellow-500/40'
    }
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />
      
      <GlassCard className="w-full max-w-md p-6 relative animate-slide-up border-t border-white/20 bg-slate-900/95">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Report Incident</h3>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {reportOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => onReport(option.type)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-transform active:scale-95 ${option.color} shadow-lg ${option.shadow} hover:brightness-110`}
            >
              <div className="mb-2 drop-shadow-md">
                {option.icon}
              </div>
              <span className="text-white font-bold tracking-wide">{option.label}</span>
            </button>
          ))}
        </div>
        
        <p className="text-center text-slate-500 text-xs mt-6 font-medium uppercase tracking-wider">
          Thank you for keeping the community safe
        </p>
      </GlassCard>
    </div>
  );
};

export default ReportMenu;
