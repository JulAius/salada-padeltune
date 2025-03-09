
import React from 'react';
import MatchRow from './MatchRow';
import { Session } from '../data/tournamentData';

interface SessionBlockProps {
  session: Session;
}

const SessionBlock: React.FC<SessionBlockProps> = ({ session }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-padel-blue text-white p-3 text-center font-bold">
        {session.title}
      </div>
      <div className="bg-padel-lightBlue p-1.5 text-center font-bold text-gray-700 text-sm border-b border-blue-200">
        {session.time}
      </div>
      <div className="p-4">
        {session.matches.map((match, index) => (
          <MatchRow key={index} match={match} />
        ))}
      </div>
      {session.pause && (
        <div className="bg-gray-50 p-2 text-center italic text-gray-500 border-t border-dashed border-gray-200">
          {session.pause}
        </div>
      )}
    </div>
  );
};

export default SessionBlock;
