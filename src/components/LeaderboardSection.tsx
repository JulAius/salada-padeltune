
import React, { useState, useEffect } from 'react';
import { players, updatePlayerRankings } from '../data/tournamentData';
import { TrendingUp, Trophy, Award, Medal } from 'lucide-react';

const LeaderboardSection: React.FC = () => {
  const [rankedPlayers, setRankedPlayers] = useState(updatePlayerRankings());

  useEffect(() => {
    // Update the ranked players when component mounts
    setRankedPlayers(updatePlayerRankings());
    
    // Setup an interval to periodically update rankings
    const interval = setInterval(() => {
      setRankedPlayers(updatePlayerRankings());
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const getQualificationBadge = (rank: number) => {
    if (rank <= 4) {
      return (
        <span className="bg-gradient-to-r from-padel-gold to-padel-orange text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
          <Trophy className="w-3 h-3 mr-1" />
          Champions
        </span>
      );
    } else if (rank <= 8) {
      return (
        <span className="bg-gradient-to-r from-padel-blue to-blue-400 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <Award className="w-3 h-3 mr-1" />
          Europa
        </span>
      );
    } else {
      return (
        <span className="bg-gradient-to-r from-padel-green to-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <Medal className="w-3 h-3 mr-1" />
          Conference
        </span>
      );
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-padel-gold to-padel-orange text-gray-800";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
    if (rank === 3) return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
    return "bg-gray-700 text-white";
  };

  // Calculate point differential
  const getPointDifferential = (player: typeof players[0]) => {
    const diff = player.pointsScored - player.pointsConceded;
    return diff > 0 ? `+${diff}` : diff;
  };

  return (
    <div className="mb-10 transform transition-all duration-500 hover:shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 text-center text-2xl rounded-t-lg flex items-center justify-center gap-2">
        <TrendingUp className="h-6 w-6" />
        <span>Classement</span>
      </div>
      <div className="bg-gray-800/50 p-6 rounded-b-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column headers */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-4 md:grid-cols-6 gap-4 mb-2 text-gray-400 font-bold text-center">
            <div>Rang</div>
            <div>Joueur</div>
            <div>V</div>
            <div>Diff</div>
            <div className="hidden md:block">Points</div>
            <div>Qualification</div>
          </div>
          
          {/* Player rows */}
          {rankedPlayers
            .sort((a, b) => (a.rank || 999) - (b.rank || 999))
            .map((player) => (
              <div key={player.id} className="col-span-1 md:col-span-3 grid grid-cols-4 md:grid-cols-6 gap-4 bg-gray-800 rounded-lg p-3 items-center text-center border border-gray-700 hover:border-padel-blue transition-colors">
                <div className={`flex justify-center items-center ${getRankStyle(player.rank || 999)} w-10 h-10 rounded-full mx-auto font-bold`}>
                  {player.rank}
                </div>
                <div className="flex justify-center">
                  <span className="relative inline-block bg-gradient-to-r from-lime-300 to-lime-400 text-gray-900 w-10 h-10 leading-10 text-center rounded-full font-bold shadow-md overflow-hidden">
                    <span className="absolute inset-0 border-2 border-dashed border-gray-800/20 rounded-full"></span>
                    <span className="absolute inset-0 border-t-2 border-gray-800/20 rounded-full transform rotate-45"></span>
                    <span className="relative z-10">{player.tag}</span>
                  </span>
                </div>
                <div className="font-bold text-white">{player.points}</div>
                <div className={`font-medium ${(player.pointsScored - player.pointsConceded) > 0 ? 'text-green-400' : (player.pointsScored - player.pointsConceded) < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                  {getPointDifferential(player)}
                </div>
                <div className="hidden md:block text-gray-300">
                  {player.pointsScored} / {player.pointsConceded}
                </div>
                <div className="flex justify-center">
                  {player.rank ? getQualificationBadge(player.rank) : '—'}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSection;
