
import React, { useState } from 'react';
import SessionBlock from './SessionBlock';
import { sessions, updatePlayerRankings } from '../data/tournamentData';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const PhaseGrid: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Function to trigger refresh of components that use player rankings
  const handleResultUpdate = () => {
    updatePlayerRankings();
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="mb-10 transform transition-all duration-500 hover:shadow-xl rounded-lg overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-t-lg">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between cursor-pointer group">
              <div className="text-center text-2xl flex items-center justify-center gap-2 group-hover:text-padel-blue transition-colors">
                <Users className="h-6 w-6" />
                <span>Phase de Groupes</span>
              </div>
              <div className="bg-gray-700 rounded-full p-1 group-hover:bg-padel-blue/20 transition-colors">
                {isOpen ? (
                  <ChevronUp className="text-padel-blue h-5 w-5" />
                ) : (
                  <ChevronDown className="text-padel-blue h-5 w-5" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="animate-accordion-down">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-gray-800/50 p-6 rounded-b-lg border border-gray-700">
            {sessions.map((session) => (
              <SessionBlock key={`${session.id}-${refreshKey}`} session={session} onResultUpdate={handleResultUpdate} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default PhaseGrid;
