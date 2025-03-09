
import React from 'react';

interface PlayerTagProps {
  tag: string;
}

const PlayerTag: React.FC<PlayerTagProps> = ({ tag }) => {
  return (
    <span className="inline-block bg-gradient-to-r from-padel-blue to-padel-blue/90 text-white w-8 h-8 leading-8 text-center rounded-full mx-1 font-bold shadow-md transform transition-transform hover:scale-110 hover:rotate-3">
      {tag}
    </span>
  );
};

export default PlayerTag;
