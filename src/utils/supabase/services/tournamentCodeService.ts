
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../client';
import { players, sessions, finals } from '../../../data/tournamentData';
import { toast } from 'sonner';

// Generate a shorter, more user-friendly unique code (8 characters)
export const generateUniqueCode = (): string => {
  // Create a base-36 string (alphanumeric) from a slice of UUID
  return uuidv4().substring(0, 8);
};

// Save tournament data with a unique code
export const saveTournamentWithCode = async (tournamentName: string, location: string, date: string) => {
  try {
    const uniqueCode = generateUniqueCode();
    
    // Store tournament data in localStorage for now as a fallback
    // since we're having issues with the Supabase connection
    const tournamentData = {
      id: uuidv4(),
      name: tournamentName,
      date,
      location,
      access_code: uniqueCode,
      players: players.map(player => ({
        ...player,
        id: uuidv4(),
      })),
      sessions,
      finals
    };
    
    // Save to localStorage
    const savedTournaments = JSON.parse(localStorage.getItem('savedTournaments') || '[]');
    savedTournaments.push(tournamentData);
    localStorage.setItem('savedTournaments', JSON.stringify(savedTournaments));
    
    // Also save this as the current tournament
    localStorage.setItem('currentTournament', JSON.stringify(tournamentData));

    return { tournamentId: tournamentData.id, accessCode: uniqueCode };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du tournoi:', error);
    toast.error('Une erreur est survenue lors de la sauvegarde du tournoi');
    throw error;
  }
};

// Get tournament data by access code
export const getTournamentByCode = async (accessCode: string) => {
  try {
    // Try to get from localStorage
    const savedTournaments = JSON.parse(localStorage.getItem('savedTournaments') || '[]');
    const tournament = savedTournaments.find(t => t.access_code === accessCode);
    
    if (!tournament) {
      throw new Error('Code de tournoi invalide ou tournoi introuvable');
    }
    
    return tournament;
  } catch (error) {
    console.error('Erreur lors de la récupération du tournoi:', error);
    toast.error('Code de tournoi invalide ou tournoi introuvable');
    throw error;
  }
};
