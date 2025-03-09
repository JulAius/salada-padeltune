
import React from 'react';
import FinalCard from './FinalCard';
import { finals } from '../data/tournamentData';

const FinalsSection: React.FC = () => {
  return (
    <div className="mb-10">
      <div className="bg-gray-800 text-white p-4 text-center text-2xl rounded-t-lg">
        Finales • 11h45 - 12h30
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-b-lg shadow-md">
        {finals.map((final, index) => (
          <FinalCard key={index} final={final} />
        ))}
      </div>
    </div>
  );
};

export default FinalsSection;
