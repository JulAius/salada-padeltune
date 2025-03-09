
import React from 'react';
import MatchRow from './MatchRow';
import { Session } from '../data/tournamentData';
import { Clock } from 'lucide-react';

interface SessionBlockProps {
  session: Session;
}

const SessionBlock: React.FC<SessionBlockProps> = ({ session }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform border border-gray-700">
      <div className="bg-gradient-to-r from-padel-blue to-padel-blue/80 text-white p-3 text-center font-bold">
        {session.title}
      </div>
      <div className="bg-gray-700 p-2 text-center font-bold text-gray-300 text-sm border-b border-gray-600 flex items-center justify-center">
        <Clock className="w-4 h-4 mr-1 text-padel-blue" />
        {session.time}
      </div>
      <div className="p-4">
        {session.matches.map((match, index) => (
          <MatchRow key={index} match={match} />
        ))}
      </div>
      {session.pause && (
        <div className="bg-gray-700/50 p-2 text-center italic text-gray-400 border-t border-dashed border-gray-600">
          {session.pause}
        </div>
      )}
    </div>
  );
};

export default SessionBlock;
