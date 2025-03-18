
import React, { useState } from 'react';
import SessionBlock from './SessionBlock';
import { sessions, updatePlayerRankings } from '../data/tournamentData';
import { Users } from 'lucide-react';

const PhaseGrid: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to trigger refresh of components that use player rankings
  const handleResultUpdate = () => {
    updatePlayerRankings();
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="mb-10 transform transition-all duration-500 hover:shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 text-center text-2xl rounded-t-lg flex items-center justify-center gap-2">
        <Users className="h-6 w-6" />
        <span>Phase de Groupes</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-gray-800/50 p-6 rounded-b-lg border border-gray-700">
        {sessions.map((session) => (
          <SessionBlock key={`${session.id}-${refreshKey}`} session={session} onResultUpdate={handleResultUpdate} />
        ))}
      </div>
    </div>
  );
};

export default PhaseGrid;
