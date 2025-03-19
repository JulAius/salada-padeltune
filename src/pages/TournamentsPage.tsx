
import React from 'react';
import TournamentList from '../components/TournamentList';
import { Trophy } from 'lucide-react';

const TournamentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-block p-3 rounded-full bg-padel-blue/10 mb-4">
            <Trophy className="h-8 w-8 text-padel-blue" />
          </div>
          <h1 className="text-3xl font-bold text-white">Gestion des Tournois de Padel</h1>
          <p className="text-gray-400 mt-2">Créez et gérez vos tournois de padel facilement</p>
        </div>
        
        <TournamentList />
      </div>
    </div>
  );
};

export default TournamentsPage;
