
import React from 'react';
import PlayerTag from './PlayerTag';
import { Final } from '../data/tournamentData';

interface FinalCardProps {
  final: Final;
}

const getHeaderClass = (type: Final['type']) => {
  switch (type) {
    case 'champions':
      return 'bg-gradient-to-r from-padel-gold to-padel-orange text-gray-800';
    case 'europa':
      return 'bg-gradient-to-r from-padel-blue to-blue-400 text-white';
    case 'conference':
      return 'bg-gradient-to-r from-padel-green to-green-600 text-white';
    default:
      return 'bg-gray-700 text-white';
  }
};

const FinalCard: React.FC<FinalCardProps> = ({ final }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className={`p-4 text-center font-bold text-xl ${getHeaderClass(final.type)}`}>
        {final.title}
      </div>
      <div className="p-5 text-center">
        <div className="font-bold text-gray-600 mb-2">{final.time}</div>
        <div className="text-gray-500 mb-4 text-sm">{final.participants}</div>
        <div className="bg-gray-100 p-1.5 rounded font-bold mb-4 text-gray-700 text-sm">
          {final.court}
        </div>
        <div className="flex justify-center items-center">
          {final.players.team1.map((playerId) => (
            <PlayerTag key={playerId} tag={playerId.toString()} />
          ))}
          <span className="mx-2 text-gray-500 text-sm">vs</span>
          {final.players.team2.map((playerId) => (
            <PlayerTag key={playerId} tag={playerId.toString()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalCard;
