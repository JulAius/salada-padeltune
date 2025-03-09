
import React from 'react';

interface PlayerTagProps {
  tag: string;
}

const PlayerTag: React.FC<PlayerTagProps> = ({ tag }) => {
  return (
    <span className="relative inline-block bg-gradient-to-r from-lime-300 to-lime-400 text-gray-900 w-8 h-8 leading-8 text-center rounded-full mx-1 font-bold shadow-md transform transition-transform hover:scale-110 hover:rotate-3 overflow-hidden">
      {/* Tennis/Padel ball pattern */}
      <span className="absolute inset-0 border-2 border-dashed border-gray-800/20 rounded-full"></span>
      <span className="absolute inset-0 border-t-2 border-gray-800/20 rounded-full transform rotate-45"></span>
      <span className="relative z-10 text-sm">{tag}</span>
    </span>
  );
};

export default PlayerTag;
