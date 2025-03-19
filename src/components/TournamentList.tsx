
import React, { useEffect, useState } from 'react';
import { getUserTournaments } from '../utils/supabase/services/tournamentService';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Trophy, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  created_at: string;
}

const TournamentList: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await getUserTournaments();
        setTournaments(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tournois:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTournaments();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-padel-blue"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Mes Tournois</h2>
        <Link to="/create-tournament">
          <Button className="bg-padel-blue hover:bg-padel-blue/90">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Tournoi
          </Button>
        </Link>
      </div>
      
      {tournaments.length === 0 ? (
        <div className="bg-gray-800 rounded-lg shadow-md p-8 text-center border border-gray-700">
          <Trophy className="mx-auto h-16 w-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Aucun tournoi trouvé</h3>
          <p className="text-gray-400 mb-6">Commencez par créer votre premier tournoi de padel</p>
          <Link to="/create-tournament">
            <Button className="bg-padel-blue hover:bg-padel-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              Créer un tournoi
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tournaments.map((tournament) => (
            <Link 
              key={tournament.id} 
              to={`/tournament/${tournament.id}`}
              className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700 hover:border-padel-blue transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-white mb-3">{tournament.name}</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-padel-blue" />
                  <span>{format(parseISO(tournament.date), 'PPP', { locale: fr })}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-padel-blue" />
                  <span>{tournament.location}</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Créé le {format(parseISO(tournament.created_at), 'PPP', { locale: fr })}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentList;
