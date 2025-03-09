
import React from 'react';
import TournamentHeader from '../components/TournamentHeader';
import Timeline from '../components/Timeline';
import PhaseGrid from '../components/PhaseGrid';
import FinalsSection from '../components/FinalsSection';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TournamentHeader />
        <Timeline />
        <PhaseGrid />
        <FinalsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
