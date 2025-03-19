
import React from 'react';
import TournamentList from '../components/TournamentList';
import { Trophy } from 'lucide-react';

const TournamentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-padel-blue to-padel-blue/60 mb-5 shadow-lg shadow-padel-blue/20">
            <Trophy className="h-9 w-9 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
            Gestion des Tournois de Padel
          </h1>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Créez et gérez vos tournois de padel facilement. Un outil complet pour organiser des compétitions de padel.
          </p>
        </div>
        
        <TournamentList />
      </div>
    </div>
  );
};

export default TournamentsPage;
