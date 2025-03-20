
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { getTournamentByCode } from '../utils/supabase/services/tournamentCodeService';
import { useNavigate } from 'react-router-dom';

// Define form schema
const accessFormSchema = z.object({
  accessCode: z.string().min(1, "Le code d'accès est requis")
});

// Define form values type
type AccessFormValues = z.infer<typeof accessFormSchema>;

interface TournamentAccessFormProps {
  onAccessTournament?: (tournamentData: any) => void;
}

const TournamentAccessForm: React.FC<TournamentAccessFormProps> = ({ onAccessTournament }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<AccessFormValues>({
    resolver: zodResolver(accessFormSchema),
    defaultValues: {
      accessCode: '',
    }
  });

  const handleAccessTournament = async (data: AccessFormValues) => {
    try {
      const tournamentData = await getTournamentByCode(data.accessCode);
      toast.success('Tournoi récupéré avec succès!');
      
      // Close dialog
      setOpen(false);
      
      // Notify parent component or handle navigation
      if (onAccessTournament) {
        onAccessTournament(tournamentData);
      } else {
        // Store in localStorage and navigate to tournament page
        localStorage.setItem('currentTournament', JSON.stringify(tournamentData));
        navigate('/');
      }
    } catch (error) {
      toast.error('Code invalide ou tournoi introuvable');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full bg-gradient-to-r from-green-500/80 to-green-600/80 text-white hover:from-green-500 hover:to-green-600 border-none shadow-lg hover:shadow-green-500/20 transform transition-all duration-200 hover:-translate-y-1">
          Accéder à un Tournoi avec un Code
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Accéder à un Tournoi</DialogTitle>
          <DialogDescription className="text-gray-400">
            Entrez le code d'accès du tournoi que vous souhaitez consulter
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAccessTournament)} className="space-y-4">
            <FormField
              control={form.control}
              name="accessCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code d'accès</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez le code du tournoi" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-padel-blue hover:bg-padel-blue/90 text-white"
            >
              Accéder au Tournoi
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TournamentAccessForm;
