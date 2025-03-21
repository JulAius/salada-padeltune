
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../client';
import { players, sessions, finals } from '../../../data/tournamentData';
import { toast } from 'sonner';

// Génère un code unique court pour le tournoi
export const generateTournamentCode = (): string => {
  // Génère un code de 6 caractères alphanumériques
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// Sauvegarde les données du tournoi et génère un code
export const saveTournamentWithCode = async (
  tournamentName: string,
  location: string,
  date: string
): Promise<{ code: string; success: boolean }> => {
  try {
    const tournamentId = uuidv4();
    const tournamentCode = generateTournamentCode();
    
    // Créer le tournoi
    const { error: tournamentError } = await supabase
      .from('tournaments')
      .insert({
        id: tournamentId,
        name: tournamentName,
        date,
        location,
        access_code: tournamentCode,
      });
      
    if (tournamentError) throw tournamentError;
    
    // Créer les joueurs
    for (const player of players) {
      const { error: playerError } = await supabase
        .from('players')
        .insert({
          id: uuidv4(),
          tag: player.tag,
          name: player.name,
          tournament_id: tournamentId,
          points: player.points,
          points_scored: player.pointsScored,
          points_conceded: player.pointsConceded,
          rank: player.rank || null
        });
        
      if (playerError) throw playerError;
    }
    
    // Créer les sessions et matchs
    for (const session of sessions) {
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .insert({
          id: uuidv4(),
          title: session.title,
          time: session.time,
          tournament_id: tournamentId,
          pause: session.pause || null
        })
        .select();
        
      if (sessionError) throw sessionError;
      
      const sessionId = sessionData[0].id;
      
      // Créer matchs pour cette session
      for (const match of session.matches) {
        const { data: matchData, error: matchError } = await supabase
          .from('matches')
          .insert({
            id: uuidv4(),
            session_id: sessionId,
            court: match.court,
            team1_score: match.score?.team1 || null,
            team2_score: match.score?.team2 || null
          })
          .select();
          
        if (matchError) throw matchError;
        
        const matchId = matchData[0].id;
        
        // Ajouter joueurs à l'équipe 1
        for (const player of match.team1) {
          const { error: team1Error } = await supabase
            .from('match_players')
            .insert({
              id: uuidv4(),
              match_id: matchId,
              player_tag: player.tag,
              team: 'team1'
            });
            
          if (team1Error) throw team1Error;
        }
        
        // Ajouter joueurs à l'équipe 2
        for (const player of match.team2) {
          const { error: team2Error } = await supabase
            .from('match_players')
            .insert({
              id: uuidv4(),
              match_id: matchId,
              player_tag: player.tag,
              team: 'team2'
            });
            
          if (team2Error) throw team2Error;
        }
      }
    }
    
    // Créer finales
    for (const final of finals) {
      const { data: finalData, error: finalError } = await supabase
        .from('finals')
        .insert({
          id: uuidv4(),
          tournament_id: tournamentId,
          type: final.type,
          title: final.title,
          time: final.time,
          court: final.court,
          team1_score: final.score?.team1 || null,
          team2_score: final.score?.team2 || null
        })
        .select();
        
      if (finalError) throw finalError;
      
      const finalId = finalData[0].id;
      
      // Ajouter joueurs aux équipes
      for (const playerTag of final.players.team1) {
        const { error: team1Error } = await supabase
          .from('final_players')
          .insert({
            id: uuidv4(),
            final_id: finalId,
            player_tag: playerTag.toString(),
            team: 'team1'
          });
          
        if (team1Error) throw team1Error;
      }
      
      for (const playerTag of final.players.team2) {
        const { error: team2Error } = await supabase
          .from('final_players')
          .insert({
            id: uuidv4(),
            final_id: finalId,
            player_tag: playerTag.toString(),
            team: 'team2'
          });
          
        if (team2Error) throw team2Error;
      }
    }
    
    return { code: tournamentCode, success: true };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du tournoi:', error);
    toast.error('Une erreur est survenue lors de la sauvegarde du tournoi');
    return { code: '', success: false };
  }
};

// Récupère les données d'un tournoi à partir de son code
export const fetchTournamentByCode = async (code: string) => {
  try {
    // Récupérer le tournoi
    const { data: tournamentData, error: tournamentError } = await supabase
      .from('tournaments')
      .select('*')
      .eq('access_code', code)
      .single();
      
    if (tournamentError) throw tournamentError;
    if (!tournamentData) throw new Error('Tournoi non trouvé');
    
    const tournamentId = tournamentData.id;
    
    // Récupérer les joueurs
    const { data: playersData, error: playersError } = await supabase
      .from('players')
      .select('*')
      .eq('tournament_id', tournamentId);
      
    if (playersError) throw playersError;
    
    // Récupérer les sessions
    const { data: sessionsData, error: sessionsError } = await supabase
      .from('sessions')
      .select('*')
      .eq('tournament_id', tournamentId);
      
    if (sessionsError) throw sessionsError;
    
    // Pour chaque session, récupérer les matchs
    const sessionsWithMatches = await Promise.all(
      sessionsData.map(async (session) => {
        const { data: matchesData, error: matchesError } = await supabase
          .from('matches')
          .select('*')
          .eq('session_id', session.id);
          
        if (matchesError) throw matchesError;
        
        // Pour chaque match, récupérer les joueurs
        const matchesWithPlayers = await Promise.all(
          matchesData.map(async (match) => {
            const { data: team1Data, error: team1Error } = await supabase
              .from('match_players')
              .select('player_tag')
              .eq('match_id', match.id)
              .eq('team', 'team1');
              
            if (team1Error) throw team1Error;
            
            const { data: team2Data, error: team2Error } = await supabase
              .from('match_players')
              .select('player_tag')
              .eq('match_id', match.id)
              .eq('team', 'team2');
              
            if (team2Error) throw team2Error;
            
            return {
              ...match,
              team1: team1Data.map(t => t.player_tag),
              team2: team2Data.map(t => t.player_tag)
            };
          })
        );
        
        return {
          ...session,
          matches: matchesWithPlayers
        };
      })
    );
    
    // Récupérer les finales
    const { data: finalsData, error: finalsError } = await supabase
      .from('finals')
      .select('*')
      .eq('tournament_id', tournamentId);
      
    if (finalsError) throw finalsError;
    
    // Pour chaque finale, récupérer les joueurs
    const finalsWithPlayers = await Promise.all(
      finalsData.map(async (final) => {
        const { data: team1Data, error: team1Error } = await supabase
          .from('final_players')
          .select('player_tag')
          .eq('final_id', final.id)
          .eq('team', 'team1');
          
        if (team1Error) throw team1Error;
        
        const { data: team2Data, error: team2Error } = await supabase
          .from('final_players')
          .select('player_tag')
          .eq('final_id', final.id)
          .eq('team', 'team2');
          
        if (team2Error) throw team2Error;
        
        return {
          ...final,
          players: {
            team1: team1Data.map(t => t.player_tag),
            team2: team2Data.map(t => t.player_tag)
          }
        };
      })
    );
    
    return {
      tournament: tournamentData,
      players: playersData,
      sessions: sessionsWithMatches,
      finals: finalsWithPlayers,
      success: true
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du tournoi:', error);
    toast.error('Une erreur est survenue lors de la récupération du tournoi');
    return { success: false };
  }
};
