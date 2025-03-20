
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { useForm } from "react-hook-form";
import { players, randomizePlayers } from '../data/tournamentData';
import { Users, Shuffle, Save, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { saveTournamentWithCode } from '../utils/supabase/services/tournamentCodeService';

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
  const [accessCode, setAccessCode] = useState<string | null>(null);
  
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

  const handleSaveTournament = async () => {
    try {
      // Check if players have been randomized
      if (!isRandomized) {
        toast.error("Veuillez d'abord effectuer le tirage au sort des numéros");
        return;
      }
      
      // Save tournament with a unique code
      const result = await saveTournamentWithCode("Tournoi de Padel", "Club de Padel", new Date().toISOString().split('T')[0]);
      
      // Set the access code to display it to the user
      setAccessCode(result.accessCode);
      
      toast.success(`Tournoi sauvegardé avec succès! Code d'accès: ${result.accessCode}`);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du tournoi:", error);
      toast.error("Une erreur est survenue lors de la sauvegarde du tournoi");
    }
  };

  const handleCopyCode = () => {
    if (accessCode) {
      navigator.clipboard.writeText(accessCode);
      toast.success("Code copié dans le presse-papier!");
    }
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
                <div className="w-full flex flex-col sm:flex-row justify-between gap-3">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Confirmer l'Inscription
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleSaveTournament}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder et Générer un Code
                  </Button>
                </div>
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
        
        {accessCode && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Code d'Accès au Tournoi</h3>
            <div className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg">
              <div className="flex-1 font-mono text-lg bg-gray-800 p-2 rounded">
                {accessCode}
              </div>
              <Button onClick={handleCopyCode} variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Conservez ce code pour accéder à ce tournoi ultérieurement. Vous pourrez le partager avec d'autres personnes.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlayerRegistration;
