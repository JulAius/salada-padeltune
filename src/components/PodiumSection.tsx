
import React from 'react';
import { getFinalWinners, players } from '../data/tournamentData';
import { Trophy, Award, Medal } from 'lucide-react';
import PlayerTag from './PlayerTag';

const PodiumSection: React.FC = () => {
  const winners = getFinalWinners();
  
  // Check if we have any winners defined
  const hasAnyWinners = Object.values(winners).some(
    category => category.winners.length > 0
  );
  
  if (!hasAnyWinners) {
    return null;
  }

  return (
    <div className="transform transition-all duration-500 hover:shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-padel-gold to-padel-orange text-gray-900 p-4 text-center text-2xl rounded-t-lg flex items-center justify-center gap-2 font-bold">
        <Trophy className="h-6 w-6" />
        <span>Podium du Tournoi</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-800/50 p-8 rounded-b-lg border border-gray-700">
        {/* Champions League podium */}
        {winners.champions.winners.length > 0 && (
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-padel-gold/50 p-5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rotate-45 bg-padel-gold/20"></div>
            <div className="absolute top-2 right-2 transform rotate-12">
              <Trophy className="h-8 w-8 text-padel-gold" />
            </div>
            
            <h3 className="text-lg font-bold text-padel-gold mb-4 flex items-center justify-center">
              <Trophy className="h-5 w-5 mr-2" />
              Champions League
            </h3>
            
            <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 mb-4 relative z-10">
              <div className="text-padel-gold text-sm font-semibold mb-2">🥇 CHAMPIONS</div>
              <div className="flex justify-center">
                {winners.champions.winners.map(id => {
                  const player = players.find(p => p.id === id);
                  return player ? <PlayerTag key={id} tag={player.tag} /> : null;
                })}
              </div>
            </div>
            
            <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 relative z-10">
              <div className="text-gray-300 text-sm font-semibold mb-2">🥈 FINALISTES</div>
              <div className="flex justify-center">
                {winners.champions.runners.map(id => {
                  const player = players.find(p => p.id === id);
                  return player ? <PlayerTag key={id} tag={player.tag} /> : null;
                })}
              </div>
            </div>
          </div>
        )}
        
        {/* Europa League podium */}
        {winners.europa.winners.length > 0 && (
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-padel-blue/50 p-5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rotate-45 bg-padel-blue/20"></div>
            <div className="absolute top-2 right-2 transform rotate-12">
              <Award className="h-8 w-8 text-padel-blue" />
            </div>
            
            <h3 className="text-lg font-bold text-padel-blue mb-4 flex items-center justify-center">
              <Award className="h-5 w-5 mr-2" />
              Europa League
            </h3>
            
            <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 mb-4 relative z-10">
              <div className="text-padel-blue text-sm font-semibold mb-2">🥇 CHAMPIONS</div>
              <div className="flex justify-center">
                {winners.europa.winners.map(id => {
                  const player = players.find(p => p.id === id);
                  return player ? <PlayerTag key={id} tag={player.tag} /> : null;
                })}
              </div>
            </div>
            
            <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 relative z-10">
              <div className="text-gray-300 text-sm font-semibold mb-2">🥈 FINALISTES</div>
              <div className="flex justify-center">
                {winners.europa.runners.map(id => {
                  const player = players.find(p => p.id === id);
                  return player ? <PlayerTag key={id} tag={player.tag} /> : null;
                })}
              </div>
            </div>
          </div>
        )}
        
        {/* Conference League podium */}
        {winners.conference.winners.length > 0 && (
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-padel-green/50 p-5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rotate-45 bg-padel-green/20"></div>
            <div className="absolute top-2 right-2 transform rotate-12">
              <Medal className="h-8 w-8 text-padel-green" />
            </div>
            
            <h3 className="text-lg font-bold text-padel-green mb-4 flex items-center justify-center">
              <Medal className="h-5 w-5 mr-2" />
              Conference League
            </h3>
            
            <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 mb-4 relative z-10">
              <div className="text-padel-green text-sm font-semibold mb-2">🥇 CHAMPIONS</div>
              <div className="flex justify-center">
                {winners.conference.winners.map(id => {
                  const player = players.find(p => p.id === id);
                  return player ? <PlayerTag key={id} tag={player.tag} /> : null;
                })}
              </div>
            </div>
            
            <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 relative z-10">
              <div className="text-gray-300 text-sm font-semibold mb-2">🥈 FINALISTES</div>
              <div className="flex justify-center">
                {winners.conference.runners.map(id => {
                  const player = players.find(p => p.id === id);
                  return player ? <PlayerTag key={id} tag={player.tag} /> : null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodiumSection;
