
import React from 'react';
import PlayerTag from './PlayerTag';
import { Match } from '../data/tournamentData';

interface MatchRowProps {
  match: Match;
}

const MatchRow: React.FC<MatchRowProps> = ({ match }) => {
  return (
    <div className="mb-6">
      <div className="bg-gray-100 p-1.5 rounded font-bold mb-2 text-center text-gray-700 text-sm">
        {match.court}
      </div>
      <div className="bg-padel-lightBlue border border-blue-200 rounded p-2 mb-1 w-full text-center flex justify-center items-center">
        {match.team1.map((player) => (
          <PlayerTag key={player.id} tag={player.tag} />
        ))}
      </div>
      <div className="text-center font-bold text-gray-500 my-1">VS</div>
      <div className="bg-padel-lightBlue border border-blue-200 rounded p-2 w-full text-center flex justify-center items-center">
        {match.team2.map((player) => (
          <PlayerTag key={player.id} tag={player.tag} />
        ))}
      </div>
    </div>
  );
};

export default MatchRow;
