
import React from 'react';
import { Trophy } from 'lucide-react';

const TournamentHeader: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-padel-blue to-padel-green text-white p-8 rounded-lg mb-8 shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22none%22%20stroke%3D%22rgba(255,255,255,0.2)%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%2250%22%20y1%3D%2210%22%20x2%3D%2250%22%20y2%3D%2290%22%20stroke%3D%22rgba(255,255,255,0.2)%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%2210%22%20y1%3D%2250%22%20x2%3D%2290%22%20y2%3D%2250%22%20stroke%3D%22rgba(255,255,255,0.2)%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E')]"></div>
      </div>
      <div className="relative z-10 text-center">
        <div className="flex justify-center items-center mb-2">
          <Trophy className="h-10 w-10 mr-3 text-padel-gold animate-pulse" />
          <h1 className="text-5xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-100">Salada Cup</h1>
          <Trophy className="h-10 w-10 ml-3 text-padel-gold animate-pulse" />
        </div>
        <div className="text-xl font-light backdrop-blur-sm py-2 px-4 rounded-full bg-white/10 inline-block shadow-inner">
          Tournoi Individuel de Padel • 12 joueurs • 3 terrains
        </div>
      </div>
      <div className="absolute -bottom-6 left-0 w-full h-12 bg-gradient-to-r from-padel-blue/20 to-padel-green/20 blur-lg"></div>
    </header>
  );
};

export default TournamentHeader;
