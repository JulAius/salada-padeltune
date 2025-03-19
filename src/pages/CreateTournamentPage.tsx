
import React from 'react';
import TournamentForm from '../components/TournamentForm';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Button } from '../components/ui/button';

const CreateTournamentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/tournaments">
            <Button variant="ghost" className="text-gray-400 hover:text-white group transition-all">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-3px] transition-transform" />
              Retour aux tournois
            </Button>
          </Link>
        </div>
        
        <div className="mb-12 text-center">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-padel-blue to-padel-blue/60 mb-5 shadow-lg shadow-padel-blue/20">
            <Trophy className="h-9 w-9 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
            Créer un Nouveau Tournoi
          </h1>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Remplissez les informations ci-dessous pour configurer votre tournoi de padel. Vous pourrez ensuite inviter les joueurs.
          </p>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl p-6 md:p-8 backdrop-blur-sm">
          <TournamentForm />
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentPage;
