
import React from 'react';

interface PlayerTagProps {
  tag: string;
}

const PlayerTag: React.FC<PlayerTagProps> = ({ tag }) => {
  return (
    <span className="inline-block bg-padel-blue text-white w-7 h-7 leading-7 text-center rounded-full mx-0.5 font-bold shadow-sm">
      {tag}
    </span>
  );
};

export default PlayerTag;
