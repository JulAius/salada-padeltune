
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-12 py-6 text-gray-400 text-sm border-t border-gray-700 bg-gray-800/50 rounded-lg shadow-inner">
      <p className="flex items-center justify-center">
        © 2023 Salada Cup • Tournoi Individuel de Padel 
        <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" />
      </p>
    </footer>
  );
};

export default Footer;
