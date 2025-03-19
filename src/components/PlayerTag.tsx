import React from 'react';
import { players } from '../data/tournamentData';

interface PlayerTagProps {
  tag: string;
}

const PlayerTag: React.FC<PlayerTagProps> = ({ tag }) => {
  const player = players.find(p => p.tag === tag);
  const hasName = player?.name && player.name.trim() !== '';
  
  return (
    <div className="flex items-center group">
      <div className="bg-padel-blue text-white font-bold w-7 h-7 rounded-full flex items-center justify-center text-sm mr-1">
        {tag}
      </div>
      
      {hasName && (
        <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
          {player.name.split(' ')[0]}
        </span>
      )}
    </div>
  );
};

export default PlayerTag;
