
import React, { useState } from 'react';
import FinalCard from './FinalCard';
import { finals } from '../data/tournamentData';
import { Trophy, Users } from 'lucide-react';
import PodiumSection from './PodiumSection';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const FinalsSection: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleResultUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  return (
    <div className="mb-10">
      <div className="mb-6">
        <Link to="/tirage">
          <Button variant="outline" className="w-full bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white hover:from-amber-500 hover:to-amber-600 border-none">
            <Users className="mr-2 h-4 w-4" />
            Tirage au Sort des Joueurs
          </Button>
        </Link>
      </div>

      <div className="transform transition-all duration-500 hover:shadow-xl rounded-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 text-center text-2xl rounded-t-lg flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-padel-gold" />
          <span>Finales • 11h40 - 12h30</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-800/50 p-8 rounded-b-lg border border-gray-700">
          {finals.map((final, index) => (
            <FinalCard key={`${index}-${refreshKey}`} final={final} onResultUpdate={handleResultUpdate} />
          ))}
        </div>
      </div>
      
      <PodiumSection key={refreshKey} />
    </div>
  );
};

export default FinalsSection;
