
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { useForm } from "react-hook-form";
import { players, randomizePlayers } from '../data/tournamentData';
import { Users, Shuffle } from 'lucide-react';
import { toast } from 'sonner';

interface PlayerRegistrationProps {
  onPlayersRegistered: () => void;
}

interface FormValues {
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  player5: string;
  player6: string;
  player7: string;
  player8: string;
  player9: string;
  player10: string;
  player11: string;
  player12: string;
}

const PlayerRegistration: React.FC<PlayerRegistrationProps> = ({ onPlayersRegistered }) => {
  const [open, setOpen] = useState(false);
  const [isRandomized, setIsRandomized] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      player1: '',
      player2: '',
      player3: '',
      player4: '',
      player5: '',
      player6: '',
      player7: '',
      player8: '',
      player9: '',
      player10: '',
      player11: '',
      player12: '',
    }
  });

  const handleRandomize = (data: FormValues) => {
    const playerNames = Object.values(data).filter(name => name.trim() !== '');
    
    if (playerNames.length !== 12) {
      toast.error(`Veuillez saisir 12 noms de joueurs (${playerNames.length}/12 saisis)`);
      return;
    }
    
    randomizePlayers(playerNames);
    setIsRandomized(true);
    toast.success("Tirage au sort des numéros effectué avec succès!");
  };

  const handleSubmit = (data: FormValues) => {
    if (!isRandomized) {
      handleRandomize(data);
      return;
    }
    
    setOpen(false);
    onPlayersRegistered();
    toast.success("Les joueurs sont enregistrés et prêts pour le tournoi!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white hover:from-amber-500 hover:to-amber-600 border-none">
          <Users className="mr-2 h-4 w-4" />
          Inscription des Joueurs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Inscription des Joueurs et Tirage au Sort</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                <FormField
                  key={num}
                  control={form.control}
                  name={`player${num}` as keyof FormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Joueur {num}</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input 
                            placeholder={`Nom du joueur ${num}`}
                            disabled={isRandomized}
                            {...field}
                          />
                          {isRandomized && (
                            <div className="min-w-10 h-10 flex items-center justify-center bg-padel-blue text-white font-bold rounded-md">
                              {players.find(p => p.name === field.value)?.tag || '?'}
                            </div>
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              {!isRandomized ? (
                <Button 
                  type="button"
                  onClick={() => form.handleSubmit(handleRandomize)()}
                  className="bg-padel-blue hover:bg-padel-blue/90 text-white"
                >
                  <Shuffle className="mr-2 h-4 w-4" />
                  Tirage au Sort des Numéros
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Confirmer l'Inscription
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
        
        {isRandomized && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Résultat du Tirage au Sort</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {players.map((player) => (
                <div key={player.id} className="bg-gray-100 dark:bg-gray-800 p-2 rounded flex items-center space-x-2">
                  <div className="bg-padel-blue text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {player.tag}
                  </div>
                  <span className="text-sm font-medium truncate">{player.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlayerRegistration;
