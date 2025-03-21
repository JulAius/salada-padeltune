
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { fetchTournamentByCode } from '../utils/supabase/services/tournamentCodeService';
import { KeyRound, ArrowRight } from 'lucide-react';

interface TournamentAccessFormProps {
  onAccessSuccess?: (tournamentData: any) => void;
}

const TournamentAccessForm: React.FC<TournamentAccessFormProps> = ({ onAccessSuccess }) => {
  const [tournamentCode, setTournamentCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tournamentCode.trim()) {
      toast.error('Veuillez saisir un code de tournoi');
      return;
    }

    setLoading(true);
    try {
      const result = await fetchTournamentByCode(tournamentCode.trim().toUpperCase());
      
      if (result.success) {
        toast.success('Tournoi trouvé!');
        if (onAccessSuccess) {
          onAccessSuccess(result);
        }
      } else {
        toast.error('Code de tournoi invalide ou tournoi non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors de l\'accès au tournoi:', error);
      toast.error('Une erreur est survenue lors de l\'accès au tournoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3 text-white">Accéder à un tournoi existant</h2>
      <form onSubmit={handleCodeSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Entrez le code du tournoi"
            value={tournamentCode}
            onChange={(e) => setTournamentCode(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white pr-10"
          />
          <KeyRound className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button 
          type="submit" 
          disabled={loading || !tournamentCode.trim()}
          className="bg-padel-blue hover:bg-padel-blue/90"
        >
          {loading ? 'Chargement...' : (
            <>
              Accéder <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default TournamentAccessForm;
