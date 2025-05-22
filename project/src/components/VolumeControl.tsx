import React from 'react';
import { Volume1, Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onChange }) => {
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5 text-gray-300" />;
    if (volume < 0.5) return <Volume1 className="h-5 w-5 text-gray-300" />;
    return <Volume2 className="h-5 w-5 text-gray-300" />;
  };

  return (
    <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg">
      <button 
        className="hover:text-indigo-400 transition-colors"
        onClick={() => onChange(0)}
      >
        {getVolumeIcon()}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #818cf8 0%, #818cf8 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
        }}
      />
    </div>
  );
};

export default VolumeControl;