
import React, { useState } from 'react';
import PlayerTag from './PlayerTag';
import { Match, calculatePoints } from '../data/tournamentData';
import { MapPin, Check, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface MatchRowProps {
  match: Match;
  onResultUpdate?: () => void;
}

const MatchRow: React.FC<MatchRowProps> = ({ match, onResultUpdate }) => {
  const [team1Score, setTeam1Score] = useState<number>(match.score?.team1 || 0);
  const [team2Score, setTeam2Score] = useState<number>(match.score?.team2 || 0);
  const [submitted, setSubmitted] = useState<boolean>(!!match.score);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = () => {
    if (team1Score === team2Score) {
      toast.error("Le score ne peut pas être égal pour un match de padel");
      return;
    }

    // Update match score
    match.score = {
      team1: team1Score,
      team2: team2Score
    };

    // Calculate points
    calculatePoints(match);

    // Update UI
    setSubmitted(true);
    setIsEditing(false);
    
    // Notify parent component
    if (onResultUpdate) {
      onResultUpdate();
    }

    toast.success("Résultat enregistré avec succès!");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

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
      <div className="text-center font-bold text-gray-400 my-1 relative flex items-center justify-center">
        <span className="absolute h-px w-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
        VS
        <span className="absolute h-px w-10 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
      </div>
      <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-2 w-full text-center flex justify-center items-center transition-all hover:shadow-md">
        {match.team2.map((player) => (
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
      
      {(!submitted || isEditing) && (
        <button 
          onClick={handleSubmit}
          className="mt-2 w-full bg-padel-blue text-white py-1 px-2 rounded flex items-center justify-center hover:bg-padel-blue/80 transition-colors"
        >
          <Check className="w-4 h-4 mr-1" />
          {isEditing ? "Mettre à jour" : "Valider"}
        </button>
      )}
      
      {submitted && !isEditing && (
        <div className="mt-2 w-full flex gap-2">
          <div className="flex-1 bg-green-600/30 text-green-400 py-1 px-2 rounded flex items-center justify-center border border-green-600/50">
            <Check className="w-4 h-4 mr-1" />
            Résultat enregistré
          </div>
          <button 
            onClick={handleEdit}
            className="bg-amber-600/30 text-amber-400 py-1 px-2 rounded flex items-center justify-center border border-amber-600/50 hover:bg-amber-600/40 transition-colors"
          >
            <Edit className="w-4 h-4 mr-1" />
            Modifier
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchRow;
