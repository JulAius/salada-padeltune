
import React, { useState } from 'react';
import { players } from '../data/tournamentData';
import PlayerRegistration from '../components/PlayerRegistration';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Dices, Calendar, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import TournamentAccessForm from '../components/TournamentAccessForm';

const DrawPage: React.FC = () => {
  const [playersRegistered, setPlayersRegistered] = useState(false);
  const [tournamentName, setTournamentName] = useState('Tournoi de Padel');
  const [tournamentLocation, setTournamentLocation] = useState('');
  const [tournamentDate, setTournamentDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 group transition-all">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-3px] transition-transform" />
          Retour au Tournoi
        </Link>
        
        <div className="bg-gray-800/80 rounded-xl p-8 shadow-2xl border border-gray-700 mb-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
            <div className="inline-block p-2 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg">
              <Dices className="text-white h-7 w-7" />
            </div>
            Tirage au Sort des Joueurs
          </h1>
          
          <div className="mb-8">
            <p className="text-gray-300 mb-6 leading-relaxed">
              Cette page permet d'enregistrer les 12 joueurs du tournoi et d'effectuer un tirage au sort 
              pour attribuer aléatoirement les numéros de 1 à 12 à chaque joueur.
            </p>
            
            <TournamentAccessForm />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="tournamentName">Nom du tournoi</Label>
                <div className="relative">
                  <Input
                    id="tournamentName"
                    value={tournamentName}
                    onChange={(e) => setTournamentName(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Nom du tournoi"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tournamentDate">Date</Label>
                <div className="relative">
                  <Input
                    id="tournamentDate"
                    type="date"
                    value={tournamentDate}
                    onChange={(e) => setTournamentDate(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tournamentLocation">Lieu</Label>
                <div className="relative">
                  <Input
                    id="tournamentLocation"
                    value={tournamentLocation}
                    onChange={(e) => setTournamentLocation(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Lieu du tournoi"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-5 text-amber-200 mb-8 shadow-inner">
              <h3 className="font-bold flex items-center gap-2 mb-3 text-amber-100">
                <Users className="h-5 w-5" />
                Instructions:
              </h3>
              <ol className="list-decimal list-inside space-y-3 ml-1">
                <li>Cliquez sur le bouton "Inscription des Joueurs"</li>
                <li>Saisissez les noms des 12 participants</li>
                <li>Cliquez sur "Tirage au Sort des Numéros" pour attribuer aléatoirement les numéros</li>
                <li>Sauvegardez votre tournoi pour obtenir un code d'accès</li>
                <li>Validez avec "Confirmer l'Inscription"</li>
              </ol>
            </div>
            
            <div className="mb-6 transform transition-all duration-300 hover:scale-[1.01]">
              <PlayerRegistration 
                onPlayersRegistered={() => setPlayersRegistered(true)} 
                tournamentName={tournamentName}
                tournamentLocation={tournamentLocation}
                tournamentDate={tournamentDate}
              />
            </div>
          </div>
          
          {playersRegistered && (
            <div className="mt-8 bg-gray-700/70 rounded-lg p-6 border border-gray-600/50 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
                Résultats du Tirage au Sort
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="bg-gray-800 border border-gray-600 rounded-lg p-4 flex items-center space-x-3 hover:border-padel-blue/50 transition-colors shadow-md hover:shadow-lg"
                  >
                    <div className="bg-gradient-to-br from-padel-blue to-padel-blue/80 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md">
                      {player.tag}
                    </div>
                    <span className="font-medium">{player.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link to="/">
                  <Button className="bg-padel-blue hover:bg-padel-blue/80 text-white shadow-lg hover:shadow-padel-blue/20 transform transition-all duration-200 hover:-translate-y-1 py-6 px-8">
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
