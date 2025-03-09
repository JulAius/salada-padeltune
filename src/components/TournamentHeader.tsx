
import React from 'react';

const TournamentHeader: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-padel-blue to-padel-green text-white p-8 rounded-lg mb-8 shadow-md overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22none%22%20stroke%3D%22rgba(255,255,255,0.2)%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%2250%22%20y1%3D%2210%22%20x2%3D%2250%22%20y2%3D%2290%22%20stroke%3D%22rgba(255,255,255,0.2)%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%2210%22%20y1%3D%2250%22%20x2%3D%2290%22%20y2%3D%2250%22%20stroke%3D%22rgba(255,255,255,0.2)%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E')]"></div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-2 uppercase tracking-wider">Salada Cup</h1>
        <div className="text-xl font-light">Tournoi Individuel de Padel • 12 joueurs • 3 terrains</div>
      </div>
    </header>
  );
};

export default TournamentHeader;
