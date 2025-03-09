
import React from 'react';

const TournamentHeader: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-padel-blue to-padel-green text-white p-8 rounded-lg mb-8 shadow-md overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><rect x=\"10\" y=\"10\" width=\"80\" height=\"80\" fill=\"none\" stroke=\"rgba(255,255,255,0.2)\" stroke-width=\"2\"/><line x1=\"50\" y1=\"10\" x2=\"50\" y2=\"90\" stroke=\"rgba(255,255,255,0.2)\" stroke-width=\"2\"/><line x1=\"10\" y1=\"50\" x2=\"90\" y2=\"50\" stroke=\"rgba(255,255,255,0.2)\" stroke-width=\"2\"/></svg>')]"></div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-2 uppercase tracking-wider">Salada Cup</h1>
        <div className="text-xl font-light">Tournoi Individuel de Padel • 12 joueurs • 3 terrains</div>
      </div>
    </header>
  );
};

export default TournamentHeader;
