
import React, { useState } from 'react';
import { players, randomizePlayerNumbers } from '../data/tournamentData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from './ui/form';
import { useForm } from 'react-hook-form';
import { Dice, Users, Dices } from 'lucide-react';

interface PlayerFormValues {
  playerNames: string[];
}

const PlayerRegistration: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [registeredPlayers, setRegisteredPlayers] = useState<typeof players>([]);
  const [showResults, setShowResults] = useState(false);

  const form = useForm<PlayerFormValues>({
    defaultValues: {
      playerNames: Array(12).fill(''),
    },
  });

  const onSubmit = (data: PlayerFormValues) => {
    // Filter out empty names
    const validNames = data.playerNames.filter(name => name.trim() !== '');
    
    if (validNames.length > 0) {
      const updatedPlayers = randomizePlayerNumbers(validNames);
      setRegisteredPlayers(updatedPlayers);
      setShowResults(true);
    }
  };

  return (
    <div className="mb-10">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="secondary" 
            className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 mb-4"
          >
            <Users className="mr-2 h-5 w-5" />
            Inscrire les Joueurs
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inscrivez les noms des 12 joueurs</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`playerNames.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Joueur {index + 1}</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom du joueur" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-lime-600 to-lime-500 hover:from-lime-500 hover:to-lime-400"
                >
                  <Dices className="mr-2 h-5 w-5" />
                  Tirer au Sort les Numéros
                </Button>
              </DialogFooter>
            </form>
          </Form>
          
          {showResults && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Résultats du tirage au sort</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {registeredPlayers.map(player => (
                  <div 
                    key={player.id} 
                    className="flex items-center p-3 bg-gray-100 rounded-md"
                  >
                    <div className="bg-gradient-to-r from-lime-300 to-lime-400 text-gray-900 w-10 h-10 flex items-center justify-center rounded-full mr-3 font-bold">
                      {player.id}
                    </div>
                    <div className="font-medium">{player.name || "Non assigné"}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    window.location.reload(); // Refresh the page to update all components
                  }}
                  className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500"
                >
                  Confirmer et Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayerRegistration;
