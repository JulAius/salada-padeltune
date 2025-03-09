
import React from 'react';
import { players } from '../data/tournamentData';
import PlayerTag from './PlayerTag';
import { TrendingUp, Award, Medal } from 'lucide-react';

const LeaderboardSection: React.FC = () => {
  // Sort players by rank (which is already done in tournamentData, but ensuring it here)
  const sortedPlayers = [...players].sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const getRowColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-padel-gold/20 to-padel-gold/5 border-l-4 border-padel-gold';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300/20 to-gray-300/5 border-l-4 border-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-amber-700/20 to-amber-700/5 border-l-4 border-amber-700';
    if (rank <= 4) return 'bg-gray-800/80 border-l-4 border-padel-blue';
    if (rank <= 8) return 'bg-gray-800/60 border-l-4 border-padel-blue/70';
    return 'bg-gray-800/40';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Award className="h-5 w-5 text-padel-gold" />;
    if (rank === 2) return <Award className="h-5 w-5 text-gray-300" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return null;
  };

  const getPositionLabel = (rank: number) => {
    if (rank <= 4) return 'Champions League';
    if (rank <= 8) return 'Europa League';
    return 'Conference League';
  };

  const getPositionColor = (rank: number) => {
    if (rank <= 4) return 'text-padel-gold';
    if (rank <= 8) return 'text-padel-blue';
    return 'text-padel-green';
  };

  return (
    <div className="mb-10 transform transition-all duration-500 hover:shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 text-center text-2xl rounded-t-lg flex items-center justify-center gap-2">
        <TrendingUp className="h-6 w-6" />
        <span>Classement des Joueurs</span>
      </div>
      <div className="bg-gray-800/50 p-6 rounded-b-lg border border-gray-700">
        <div className="grid grid-cols-12 gap-2 font-bold text-gray-400 mb-2 px-4 text-sm">
          <div className="col-span-1">Rang</div>
          <div className="col-span-2">Joueur</div>
          <div className="col-span-2">Points</div>
          <div className="col-span-7">Tournoi</div>
        </div>
        <div className="space-y-2">
          {sortedPlayers.map((player) => (
            <div 
              key={player.id} 
              className={`grid grid-cols-12 gap-2 p-3 rounded-md items-center ${getRowColor(player.rank || 0)}`}
            >
              <div className="col-span-1 font-bold text-xl flex items-center">
                {getRankIcon(player.rank || 0) || player.rank}
              </div>
              <div className="col-span-2">
                <PlayerTag tag={player.tag} />
              </div>
              <div className="col-span-2 font-mono bg-gray-900/30 py-1 px-3 rounded-full text-center">
                {player.points} pts
              </div>
              <div className={`col-span-7 ${getPositionColor(player.rank || 0)} font-semibold`}>
                {getPositionLabel(player.rank || 0)}
                {player.rank === 1 && <span className="ml-2">🏆</span>}
                {player.rank === 2 && <span className="ml-2">🥈</span>}
                {player.rank === 3 && <span className="ml-2">🥉</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSection;
