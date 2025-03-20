
import React, { useState } from 'react';
import { Calendar, Users, Flag, Award, ClipboardList, PlayCircle, Coffee, Trophy, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const Timeline: React.FC = () => {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Map des icônes pour chaque étape de la timeline
  const getIconForStep = (label: string) => {
    const iconMap: Record<string, JSX.Element> = {
      "Accueil joueurs": <Users className="text-padel-blue" size={20} />,
      "Annonce des équipes": <Flag className="text-padel-blue" size={20} />,
      "Tour 1": <PlayCircle className="text-padel-blue" size={20} />,
      "Tour 2": <PlayCircle className="text-padel-blue" size={20} />,
      "Tour 3": <PlayCircle className="text-padel-blue" size={20} />,
      "Tour 4": <PlayCircle className="text-padel-blue" size={20} />,
      "Tour 5": <PlayCircle className="text-padel-blue" size={20} />,
      "Classement": <ClipboardList className="text-padel-blue" size={20} />,
      "Finales": <Award className="text-padel-blue" size={20} />,
      "Pause": <Coffee className="text-padel-blue" size={20} />
    };
    
    return iconMap[label] || <Calendar className="text-padel-blue" size={20} />;
  };

  const timelineData = [
    { time: "09h00 - 09h20", label: "Accueil joueurs, tirage au sort des numéros", duration: "20 min" },
    { time: "09h20 - 09h30", label: "Annonce des équipes (Tour 1)", duration: "10 min" },
    { time: "09h30 - 09h50", label: "Tour 1 : Matchs de padel", duration: "20 min" },
    { time: "09h50 - 09h55", label: "Pause / Rotation des équipes", duration: "5 min" },
    { time: "09h55 - 10h15", label: "Tour 2 : Matchs de padel", duration: "20 min" },
    { time: "10h15 - 10h20", label: "Pause / Rotation des équipes", duration: "5 min" },
    { time: "10h20 - 10h40", label: "Tour 3 : Matchs de padel", duration: "20 min" },
    { time: "10h40 - 10h45", label: "Pause / Rotation des équipes", duration: "5 min" },
    { time: "10h45 - 11h05", label: "Tour 4 : Matchs de padel", duration: "20 min" },
    { time: "11h05 - 11h10", label: "Pause / Rotation des équipes", duration: "5 min" },
    { time: "11h10 - 11h30", label: "Tour 5 : Matchs de padel", duration: "20 min" },
    { time: "11h30 - 11h40", label: "Calcul classement & annonce Finales", duration: "10 min" },
    { time: "11h40 - 12h30", label: "Finales simultanées", duration: "50 min" }
  ];

  return (
    <div className="mb-10 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 transform transition-all duration-500 hover:shadow-xl">
      <Collapsible open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between cursor-pointer pb-4 group">
            <h2 className="text-2xl font-bold text-gray-200 flex items-center group-hover:text-padel-blue transition-colors">
              <Calendar className="mr-2 text-padel-blue" />
              Programme Détaillé
            </h2>
            <div className="bg-gray-700 rounded-full p-1 group-hover:bg-padel-blue/20 transition-colors">
              {isTimelineOpen ? (
                <ChevronUp className="text-padel-blue h-5 w-5" />
              ) : (
                <ChevronDown className="text-padel-blue h-5 w-5" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="animate-accordion-down">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                <tr>
                  <th scope="col" className="px-4 py-3 w-1/4">Heure</th>
                  <th scope="col" className="px-4 py-3 w-2/4">Action</th>
                  <th scope="col" className="px-4 py-3 w-1/4">Durée</th>
                </tr>
              </thead>
              <tbody>
                {timelineData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700/50'} hover:bg-gray-600/50 transition-colors`}
                  >
                    <td className="px-4 py-3 font-medium">{item.time}</td>
                    <td className="px-4 py-3 flex items-center">
                      <span className="w-6 h-6 mr-2 flex items-center justify-center">
                        {getIconForStep(item.label.split(':')[0].trim())}
                      </span>
                      {item.label}
                    </td>
                    <td className="px-4 py-3">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Timeline;
