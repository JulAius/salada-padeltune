
import React from 'react';
import PlayerTag from './PlayerTag';
import { Match } from '../data/tournamentData';
import { MapPin } from 'lucide-react';

interface MatchRowProps {
  match: Match;
}

const MatchRow: React.FC<MatchRowProps> = ({ match }) => {
  return (
    <div className="mb-6 transition-all duration-300 hover:bg-gray-700/40 p-2 rounded-lg">
      <div className="bg-gray-700 p-1.5 rounded font-bold mb-2 text-center text-gray-300 text-sm flex items-center justify-center">
        <MapPin className="w-4 h-4 mr-1 text-padel-blue" />
        {match.court}
      </div>
      <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-2 mb-1 w-full text-center flex justify-center items-center transition-all hover:shadow-md">
        {match.team1.map((player) => (
          <PlayerTag key={player.id} tag={player.tag} />
        ))}
      </div>
      <div className="text-center font-bold text-gray-400 my-1 relative flex items-center justify-center">
        <span className="absolute h-px w-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
        VS
        <span className="absolute h-px w-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
      </div>
      <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-2 w-full text-center flex justify-center items-center transition-all hover:shadow-md">
        {match.team2.map((player) => (
          <PlayerTag key={player.id} tag={player.tag} />
        ))}
      </div>
    </div>
  );
};

export default MatchRow;
