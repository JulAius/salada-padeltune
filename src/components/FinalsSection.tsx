
import React, { useState } from 'react';
import FinalCard from './FinalCard';
import { finals } from '../data/tournamentData';
import { Trophy, ChevronDown, ChevronUp } from 'lucide-react';
import PodiumSection from './PodiumSection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const FinalsSection: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleResultUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  return (
    <div className="mb-10">
      <div className="transform transition-all duration-500 hover:shadow-xl rounded-lg overflow-hidden mb-8">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-t-lg">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between cursor-pointer group">
                <div className="text-center text-2xl flex items-center justify-center gap-2 group-hover:text-padel-blue transition-colors">
                  <Trophy className="h-6 w-6 text-padel-gold" />
                  <span>Finales • 11h40 - 12h30</span>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-800/50 p-8 rounded-b-lg border border-gray-700">
              {finals.map((final, index) => (
                <FinalCard key={`${index}-${refreshKey}`} final={final} onResultUpdate={handleResultUpdate} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <PodiumSection key={refreshKey} />
    </div>
  );
};

export default FinalsSection;
