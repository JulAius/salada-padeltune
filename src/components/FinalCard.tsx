
import React, { useState } from 'react';
import PlayerTag from './PlayerTag';
import { Final, players } from '../data/tournamentData';
import { Trophy, Award, Medal, Clock, MapPin, Check, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface FinalCardProps {
  final: Final;
  onResultUpdate?: () => void;
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

const FinalCard: React.FC<FinalCardProps> = ({ final, onResultUpdate }) => {
  const [team1Score, setTeam1Score] = useState<number>(final.score?.team1 || 0);
  const [team2Score, setTeam2Score] = useState<number>(final.score?.team2 || 0);
  const [submitted, setSubmitted] = useState<boolean>(!!final.score);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = () => {
    if (team1Score === team2Score) {
      toast.error("Le score ne peut pas être égal pour une finale");
      return;
    }

    // Update final score
    final.score = {
      team1: team1Score,
      team2: team2Score
    };

    // Update UI
    setSubmitted(true);
    setIsEditing(false);
    
    // Notify parent component
    if (onResultUpdate) {
      onResultUpdate();
    }

    toast.success("Résultat de la finale enregistré!");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Get players by their ranking position instead of player number
  const getPlayersByRank = (rankRange: number[]) => {
    // Get sorted players by rank
    const sortedPlayers = [...players].sort((a, b) => (a.rank || 99) - (b.rank || 99));
    
    // Get players in the specified rank range
    return rankRange.map(position => {
      const index = position - 1; // Convert 1-based position to 0-based index
      return (index >= 0 && index < sortedPlayers.length) ? sortedPlayers[index] : null;
    }).filter(p => p !== null) as typeof players;
  };

  // Get team players based on final type
  const getTeamPlayers = () => {
    switch (final.type) {
      case 'champions':
        return {
          team1: getPlayersByRank([1, 4]), // 1st and 4th ranked players
          team2: getPlayersByRank([2, 3])  // 2nd and 3rd ranked players
        };
      case 'europa':
        return {
          team1: getPlayersByRank([5, 8]), // 5th and 8th ranked players
          team2: getPlayersByRank([6, 7])  // 6th and 7th ranked players
        };
      case 'conference':
        return {
          team1: getPlayersByRank([9, 12]), // 9th and 12th ranked players
          team2: getPlayersByRank([10, 11]) // 10th and 11th ranked players
        };
      default:
        return { team1: [], team2: [] };
    }
  };

  const teamPlayers = getTeamPlayers();
  const team1Players = teamPlayers.team1;
  const team2Players = teamPlayers.team2;

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
        <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 mb-2 relative z-10">
          <div className="flex justify-center items-center">
            {team1Players.map((player) => (
              <PlayerTag key={player.id} tag={player.tag} />
            ))}
            
            <div className="ml-2">
              <input
                type="number"
                min="0"
                max="9"
                value={team1Score}
                onChange={(e) => setTeam1Score(parseInt(e.target.value) || 0)}
                className="w-10 h-8 bg-gray-800 border border-gray-600 rounded text-center text-white"
                disabled={submitted && !isEditing}
              />
            </div>
          </div>
        </div>
        <div className="text-center font-bold text-gray-400 my-1 relative flex items-center justify-center">
          <span className="absolute h-px w-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
          VS
          <span className="absolute h-px w-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
        </div>
        <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 mb-4 relative z-10">
          <div className="flex justify-center items-center">
            {team2Players.map((player) => (
              <PlayerTag key={player.id} tag={player.tag} />
            ))}
            
            <div className="ml-2">
              <input
                type="number"
                min="0"
                max="9"
                value={team2Score}
                onChange={(e) => setTeam2Score(parseInt(e.target.value) || 0)}
                className="w-10 h-8 bg-gray-800 border border-gray-600 rounded text-center text-white"
                disabled={submitted && !isEditing}
              />
            </div>
          </div>
        </div>
        
        {(!submitted || isEditing) && (
          <button 
            onClick={handleSubmit}
            className="w-full bg-padel-blue text-white py-2 px-3 rounded flex items-center justify-center hover:bg-padel-blue/80 transition-colors"
          >
            <Check className="w-4 h-4 mr-1" />
            {isEditing ? "Mettre à jour" : "Valider le résultat"}
          </button>
        )}
        
        {submitted && !isEditing && (
          <div className="w-full flex gap-2">
            <div className="flex-1 bg-green-600/30 text-green-400 py-2 px-3 rounded flex items-center justify-center border border-green-600/50">
              <Check className="w-4 h-4 mr-1" />
              Résultat enregistré
            </div>
            <button 
              onClick={handleEdit}
              className="bg-amber-600/30 text-amber-400 py-2 px-3 rounded flex items-center justify-center border border-amber-600/50 hover:bg-amber-600/40 transition-colors"
            >
              <Edit className="w-4 h-4 mr-1" />
              Modifier
            </button>
          </div>
        )}

        {submitted && (
          <div className="mt-4 text-center">
            <div className={`text-sm font-bold ${team1Score > team2Score ? 'text-padel-gold' : 'text-gray-400'}`}>
              {team1Score > team2Score && <Trophy className="w-4 h-4 inline-block mr-1 text-padel-gold" />}
              {team1Score > team2Score ? "GAGNANTS" : "FINALISTES"}
            </div>
            <div className={`text-sm font-bold ${team2Score > team1Score ? 'text-padel-gold' : 'text-gray-400'}`}>
              {team2Score > team1Score && <Trophy className="w-4 h-4 inline-block mr-1 text-padel-gold" />}
              {team2Score > team1Score ? "GAGNANTS" : "FINALISTES"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalCard;
