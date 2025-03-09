
import React from 'react';
import { Calendar, Users, Flag, Award, ClipboardList, PlayCircle } from 'lucide-react';
import { timelineSteps } from '../data/tournamentData';

const Timeline: React.FC = () => {
  // Map des icônes pour chaque étape de la timeline
  const getIconForStep = (index: number) => {
    const icons = [
      <Users className="text-padel-blue" size={20} />,
      <Flag className="text-padel-blue" size={20} />,
      <PlayCircle className="text-padel-blue" size={20} />,
      <PlayCircle className="text-padel-blue" size={20} />,
      <PlayCircle className="text-padel-blue" size={20} />,
      <PlayCircle className="text-padel-blue" size={20} />,
      <PlayCircle className="text-padel-blue" size={20} />,
      <ClipboardList className="text-padel-blue" size={20} />,
      <Award className="text-padel-blue" size={20} />
    ];
    return icons[index] || <Calendar className="text-padel-blue" size={20} />;
  };

  return (
    <div className="mb-10 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-200 flex items-center">
        <Calendar className="mr-2 text-padel-blue" />
        Déroulement de la journée
      </h2>
      <div className="relative flex justify-between">
        <div className="absolute top-[35px] left-0 w-full h-1.5 bg-gradient-to-r from-padel-blue to-padel-green rounded-full z-0"></div>
        {timelineSteps.map((step, index) => (
          <div 
            key={index} 
            className="relative z-10 flex flex-col items-center flex-1 max-w-[80px] transform transition-transform hover:scale-110 hover:-translate-y-1"
          >
            <div className="w-10 h-10 bg-gray-900 border-4 border-padel-blue rounded-full mb-2 flex items-center justify-center shadow-md">
              {getIconForStep(index)}
            </div>
            <div className="font-bold text-padel-blue text-sm text-center mb-1">{step.time}</div>
            <div className="text-sm text-center text-gray-300 bg-gray-700 px-2 py-1 rounded-full shadow-sm">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
