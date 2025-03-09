
import React from 'react';
import { timelineSteps } from '../data/tournamentData';

const Timeline: React.FC = () => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Déroulement de la journée</h2>
      <div className="relative flex justify-between">
        <div className="absolute top-[35px] left-0 w-full h-1 bg-gray-200 z-0"></div>
        {timelineSteps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center flex-1 max-w-[80px]">
            <div className="w-7 h-7 bg-white border-4 border-padel-blue rounded-full mb-2"></div>
            <div className="font-bold text-padel-blue text-sm text-center mb-1">{step.time}</div>
            <div className="text-sm text-center text-gray-600">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
