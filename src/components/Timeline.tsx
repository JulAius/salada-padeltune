
import React, { useState } from 'react';
import { Calendar, Users, Flag, Award, ClipboardList, PlayCircle, Coffee, Trophy, ChevronDown, ChevronUp } from 'lucide-react';
import { timelineSteps } from '../data/tournamentData';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const Timeline: React.FC = () => {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isMatchGridOpen, setIsMatchGridOpen] = useState(false);
  const [isFinalsOpen, setIsFinalsOpen] = useState(false);

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
      
      <div className="mt-8">
        <Collapsible open={isMatchGridOpen} onOpenChange={setIsMatchGridOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between cursor-pointer pb-4 group">
              <h3 className="text-xl font-bold text-gray-200 flex items-center group-hover:text-padel-blue transition-colors">
                <PlayCircle className="mr-2 text-padel-blue" />
                Grille de Matchs Proposée
              </h3>
              <div className="bg-gray-700 rounded-full p-1 group-hover:bg-padel-blue/20 transition-colors">
                {isMatchGridOpen ? (
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
                    <th scope="col" className="px-4 py-3 w-1/6">Tour</th>
                    <th scope="col" className="px-4 py-3 w-1/3">Terrain 1</th>
                    <th scope="col" className="px-4 py-3 w-1/3">Terrain 2</th>
                    <th scope="col" className="px-4 py-3 w-1/3">Terrain 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600/50 transition-colors">
                    <td className="px-4 py-3 font-medium">1</td>
                    <td className="px-4 py-3">(J1,J2) vs (J3,J4)</td>
                    <td className="px-4 py-3">(J5,J6) vs (J7,J8)</td>
                    <td className="px-4 py-3">(J9,J10) vs (J11,J12)</td>
                  </tr>
                  <tr className="border-b border-gray-700 bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
                    <td className="px-4 py-3 font-medium">2</td>
                    <td className="px-4 py-3">(J2,J8) vs (J9,J12)</td>
                    <td className="px-4 py-3">(J3,J6) vs (J4,J10)</td>
                    <td className="px-4 py-3">(J1,J5) vs (J7,J11)</td>
                  </tr>
                  <tr className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600/50 transition-colors">
                    <td className="px-4 py-3 font-medium">3</td>
                    <td className="px-4 py-3">(J3,J9) vs (J5,J11)</td>
                    <td className="px-4 py-3">(J1,J7) vs (J4,J12)</td>
                    <td className="px-4 py-3">(J2,J10) vs (J6,J8)</td>
                  </tr>
                  <tr className="border-b border-gray-700 bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
                    <td className="px-4 py-3 font-medium">4</td>
                    <td className="px-4 py-3">(J4,J8) vs (J6,J12)</td>
                    <td className="px-4 py-3">(J1,J10) vs (J5,J9)</td>
                    <td className="px-4 py-3">(J2,J11) vs (J3,J7)</td>
                  </tr>
                  <tr className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600/50 transition-colors">
                    <td className="px-4 py-3 font-medium">5</td>
                    <td className="px-4 py-3">(J3,J11) vs (J8,J10)</td>
                    <td className="px-4 py-3">(J4,J9) vs (J5,J7)</td>
                    <td className="px-4 py-3">(J1,J12) vs (J2,J6)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="mt-8">
          <Collapsible open={isFinalsOpen} onOpenChange={setIsFinalsOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between cursor-pointer pb-4 group">
                <h3 className="text-xl font-bold text-gray-200 flex items-center group-hover:text-padel-blue transition-colors">
                  <Trophy className="mr-2 text-padel-gold" />
                  Finales par Catégories
                </h3>
                <div className="bg-gray-700 rounded-full p-1 group-hover:bg-padel-blue/20 transition-colors">
                  {isFinalsOpen ? (
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
                      <th scope="col" className="px-4 py-3 w-1/4">Catégorie</th>
                      <th scope="col" className="px-4 py-3 w-1/4">Classement Joueurs</th>
                      <th scope="col" className="px-4 py-3 w-1/4">Équipes</th>
                      <th scope="col" className="px-4 py-3 w-1/4">Terrain</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600/50 transition-colors">
                      <td className="px-4 py-3 font-medium">Finale Champions</td>
                      <td className="px-4 py-3">1 à 4</td>
                      <td className="px-4 py-3">(1 & 4) vs (2 & 3)</td>
                      <td className="px-4 py-3">T1</td>
                    </tr>
                    <tr className="border-b border-gray-700 bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
                      <td className="px-4 py-3 font-medium">Finale Europa</td>
                      <td className="px-4 py-3">5 à 8</td>
                      <td className="px-4 py-3">(5 & 8) vs (6 & 7)</td>
                      <td className="px-4 py-3">T2</td>
                    </tr>
                    <tr className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600/50 transition-colors">
                      <td className="px-4 py-3 font-medium">Finale Conférence</td>
                      <td className="px-4 py-3">9 à 12</td>
                      <td className="px-4 py-3">(9 & 12) vs (10 & 11)</td>
                      <td className="px-4 py-3">T3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
