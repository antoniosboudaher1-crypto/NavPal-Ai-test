import React from 'react';

interface VoiceWaveProps {
  isActive: boolean;
}

const VoiceWave: React.FC<VoiceWaveProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="flex items-center gap-1 h-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-1 bg-purple-400 rounded-full animate-wave"
          style={{
            height: '100%',
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWave;