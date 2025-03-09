
import React from 'react';
import PlayerTag from './PlayerTag';
import { Final } from '../data/tournamentData';
import { Trophy, Award, Medal, Clock, MapPin } from 'lucide-react';

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
      return 'bg-gradient-to-r from-gray-700 to-gray-600 text-white';
  }
};

const getIcon = (type: Final['type']) => {
  switch (type) {
    case 'champions':
      return <Trophy className="h-5 w-5" />;
    case 'europa':
      return <Award className="h-5 w-5" />;
    case 'conference':
      return <Medal className="h-5 w-5" />;
    default:
      return null;
  }
};

const FinalCard: React.FC<FinalCardProps> = ({ final }) => {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl bg-gray-800">
      <div className={`p-4 text-center font-bold text-xl ${getHeaderClass(final.type)} flex items-center justify-center gap-2`}>
        {getIcon(final.type)}
        {final.title}
      </div>
      <div className="p-5 text-center bg-gradient-to-b from-gray-800 to-gray-900 relative">
        {/* Tennis/Padel court pattern in background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 border border-white/20 rounded"></div>
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/20"></div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/20"></div>
          <div className="absolute w-16 h-16 border-2 border-white/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="font-bold text-gray-300 mb-2 flex items-center justify-center relative z-10">
          <Clock className="w-4 h-4 mr-1 text-padel-blue" />
          {final.time}
        </div>
        <div className="text-gray-400 mb-4 text-sm bg-gray-700 py-1 px-3 rounded-full inline-block relative z-10">
          {final.participants}
        </div>
        <div className="bg-gray-700 p-2 rounded-lg font-bold mb-4 text-gray-300 text-sm flex items-center justify-center relative z-10">
          <MapPin className="w-4 h-4 mr-1 text-padel-blue" />
          {final.court}
        </div>
        <div className="flex justify-center items-center bg-gray-900 p-3 rounded-lg relative z-10">
          {final.players.team1.map((playerId) => (
            <PlayerTag key={playerId} tag={playerId.toString()} />
          ))}
          <span className="mx-2 text-gray-400 text-sm font-bold">vs</span>
          {final.players.team2.map((playerId) => (
            <PlayerTag key={playerId} tag={playerId.toString()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalCard;
