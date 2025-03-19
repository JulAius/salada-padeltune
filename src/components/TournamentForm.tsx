
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { createTournament } from '../utils/supabase/services/tournamentService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Définir le schéma de validation du formulaire
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom du tournoi doit contenir au moins 3 caractères.",
  }),
  date: z.date({
    required_error: "Une date est requise.",
  }),
  location: z.string().min(3, {
    message: "L'emplacement doit contenir au moins 3 caractères.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const TournamentForm: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formattedDate = format(data.date, 'yyyy-MM-dd');
      await createTournament(data.name, formattedDate, data.location);
      toast.success('Tournoi créé avec succès!');
      navigate('/tournaments');
    } catch (error) {
      console.error('Erreur lors de la création du tournoi:', error);
      toast.error('Erreur lors de la création du tournoi');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Créer un Nouveau Tournoi</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du Tournoi</FormLabel>
                <FormControl>
                  <Input placeholder="Super Tournoi de Padel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu</FormLabel>
                <FormControl>
                  <Input placeholder="Paris, Club de Padel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-padel-blue hover:bg-padel-blue/90">
            Créer Tournoi
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TournamentForm;
