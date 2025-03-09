
import React from 'react';
import SessionBlock from './SessionBlock';
import { sessions } from '../data/tournamentData';

const PhaseGrid: React.FC = () => {
  return (
    <div className="mb-10">
      <div className="bg-gray-800 text-white p-4 text-center text-2xl rounded-t-lg">
        Phase de Groupes
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-gray-100 p-4 rounded-b-lg">
        {sessions.map((session) => (
          <SessionBlock key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default PhaseGrid;
