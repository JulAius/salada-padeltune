
import React from 'react';
import TournamentForm from '../components/TournamentForm';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Button } from '../components/ui/button';

const CreateTournamentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/tournaments">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux tournois
            </Button>
          </Link>
        </div>
        
        <div className="mb-8 text-center">
          <div className="inline-block p-3 rounded-full bg-padel-blue/10 mb-4">
            <Trophy className="h-8 w-8 text-padel-blue" />
          </div>
          <h1 className="text-3xl font-bold text-white">Créer un Nouveau Tournoi</h1>
          <p className="text-gray-400 mt-2">Remplissez les informations pour démarrer votre tournoi de padel</p>
        </div>
        
        <TournamentForm />
      </div>
    </div>
  );
};

export default CreateTournamentPage;
