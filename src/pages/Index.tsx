
import React from 'react';
import TournamentHeader from '../components/TournamentHeader';
import Timeline from '../components/Timeline';
import PhaseGrid from '../components/PhaseGrid';
import LeaderboardSection from '../components/LeaderboardSection';
import FinalsSection from '../components/FinalsSection';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        {/* Tennis ball pattern background */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-24 h-24 rounded-full border-2 border-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.2,
              }}
            ></div>
          ))}
        </div>
        <TournamentHeader />
        <Timeline />
        <PhaseGrid />
        <LeaderboardSection />
        <FinalsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
