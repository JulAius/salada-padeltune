
import React, { useState } from 'react';
import { players } from '../data/tournamentData';
import PlayerRegistration from '../components/PlayerRegistration';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Dices } from 'lucide-react';
import { Button } from '../components/ui/button';

const DrawPage: React.FC = () => {
  const [playersRegistered, setPlayersRegistered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au Tournoi
        </Link>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Dices className="text-padel-blue h-6 w-6" />
            Tirage au Sort des Joueurs
          </h1>
          
          <div className="mb-6">
            <p className="text-gray-300 mb-4">
              Cette page permet d'enregistrer les 12 joueurs du tournoi et d'effectuer un tirage au sort 
              pour attribuer aléatoirement les numéros de 1 à 12 à chaque joueur.
            </p>
            
            <div className="bg-amber-800/30 border border-amber-700/50 rounded-lg p-4 text-amber-300 mb-6">
              <h3 className="font-bold flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                Instructions:
              </h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Cliquez sur le bouton "Inscription des Joueurs"</li>
                <li>Saisissez les noms des 12 participants</li>
                <li>Cliquez sur "Tirage au Sort des Numéros" pour attribuer aléatoirement les numéros</li>
                <li>Vérifiez les résultats et validez avec "Confirmer l'Inscription"</li>
              </ol>
            </div>
            
            <div className="mb-6">
              <PlayerRegistration onPlayersRegistered={() => setPlayersRegistered(true)} />
            </div>
          </div>
          
          {playersRegistered && (
            <div className="mt-6 bg-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4">Résultats du Tirage au Sort</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="bg-gray-800 border border-gray-600 rounded-lg p-3 flex items-center space-x-3"
                  >
                    <div className="bg-padel-blue text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg">
                      {player.tag}
                    </div>
                    <span className="font-medium">{player.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Link to="/">
                  <Button className="bg-padel-blue hover:bg-padel-blue/80 text-white">
                    Commencer le Tournoi
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawPage;
