
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
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
      <div className={`p-4 text-center font-bold text-xl ${getHeaderClass(final.type)} flex items-center justify-center gap-2`}>
        {getIcon(final.type)}
        {final.title}
      </div>
      <div className="p-5 text-center bg-gradient-to-b from-white to-gray-50">
        <div className="font-bold text-gray-600 mb-2 flex items-center justify-center">
          <Clock className="w-4 h-4 mr-1 text-padel-blue" />
          {final.time}
        </div>
        <div className="text-gray-500 mb-4 text-sm bg-gray-50 py-1 px-3 rounded-full inline-block">
          {final.participants}
        </div>
        <div className="bg-gray-100 p-2 rounded-lg font-bold mb-4 text-gray-700 text-sm flex items-center justify-center">
          <MapPin className="w-4 h-4 mr-1 text-padel-blue" />
          {final.court}
        </div>
        <div className="flex justify-center items-center bg-padel-lightBlue p-3 rounded-lg">
          {final.players.team1.map((playerId) => (
            <PlayerTag key={playerId} tag={playerId.toString()} />
          ))}
          <span className="mx-2 text-gray-500 text-sm font-bold">vs</span>
          {final.players.team2.map((playerId) => (
            <PlayerTag key={playerId} tag={playerId.toString()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalCard;
