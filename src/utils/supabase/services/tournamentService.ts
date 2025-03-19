
import { supabase } from '../client';
import { v4 as uuidv4 } from 'uuid';
import { 
  players as localPlayers, 
  sessions as localSessions, 
  finals as localFinals,
  Player
} from '../../../data/tournamentData';

// Fonction pour créer un nouveau tournoi
export const createTournament = async (name: string, date: string, location: string) => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  const { data, error } = await supabase
    .from('tournaments')
    .insert({
      id: uuidv4(),
      name,
      date,
      location,
      user_id: userId
    })
    .select();
    
  if (error) throw error;
  return data[0];
};

// Fonction pour récupérer tous les tournois d'un utilisateur
export const getUserTournaments = async () => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

// Fonction pour récupérer un tournoi spécifique avec toutes ses données associées
export const getTournamentWithDetails = async (tournamentId: string) => {
  // Récupérer le tournoi
  const { data: tournament, error: tournamentError } = await supabase
    .from('tournaments')
    .select('*')
    .eq('id', tournamentId)
    .single();
    
  if (tournamentError) throw tournamentError;
  
  // Récupérer les joueurs
  const { data: players, error: playersError } = await supabase
    .from('players')
    .select('*')
    .eq('tournament_id', tournamentId)
    .order('tag');
    
  if (playersError) throw playersError;
  
  // Récupérer les sessions avec leurs matchs
  const { data: sessions, error: sessionsError } = await supabase
    .from('sessions')
    .select('*')
    .eq('tournament_id', tournamentId)
    .order('title');
    
  if (sessionsError) throw sessionsError;
  
  // Récupérer tous les matchs du tournoi
  const { data: matches, error: matchesError } = await supabase
    .from('matches')
    .select(`
      *,
      match_players(*)
    `)
    .in('session_id', sessions.map(session => session.id));
    
  if (matchesError) throw matchesError;
  
  // Récupérer les finales
  const { data: finals, error: finalsError } = await supabase
    .from('finals')
    .select(`
      *,
      final_players(*)
    `)
    .eq('tournament_id', tournamentId);
    
  if (finalsError) throw finalsError;
  
  return {
    tournament,
    players,
    sessions,
    matches,
    finals
  };
};

// Fonction pour sauvegarder l'état actuel du tournoi (joueurs, sessions, matchs, etc.)
export const saveTournamentState = async (tournamentId: string) => {
  // Créer les joueurs
  const playerPromises = localPlayers.map(async (player) => {
    const { data, error } = await supabase
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
      })
      .select();
      
    if (error) throw error;
    return data[0];
  });
  
  const dbPlayers = await Promise.all(playerPromises);
  
  // Map des joueurs locaux vers les joueurs de la BDD
  const playerMap = new Map<number, string>();
  localPlayers.forEach((localPlayer, index) => {
    playerMap.set(localPlayer.id, dbPlayers[index].id);
  });
  
  // Créer les sessions et leurs matchs
  for (const session of localSessions) {
    // Créer la session
    const { data: dbSession, error: sessionError } = await supabase
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
    
    // Créer les matchs de la session
    for (const match of session.matches) {
      const { data: dbMatch, error: matchError } = await supabase
        .from('matches')
        .insert({
          id: uuidv4(),
          session_id: dbSession[0].id,
          court: match.court,
          team1_score: match.score?.team1 || null,
          team2_score: match.score?.team2 || null
        })
        .select();
        
      if (matchError) throw matchError;
      
      // Ajouter les joueurs au match
      const matchPlayerPromises = [
        ...match.team1.map(player => {
          return supabase
            .from('match_players')
            .insert({
              id: uuidv4(),
              match_id: dbMatch[0].id,
              player_id: playerMap.get(player.id)!,
              team: 'team1'
            });
        }),
        ...match.team2.map(player => {
          return supabase
            .from('match_players')
            .insert({
              id: uuidv4(),
              match_id: dbMatch[0].id,
              player_id: playerMap.get(player.id)!,
              team: 'team2'
            });
        })
      ];
      
      await Promise.all(matchPlayerPromises);
    }
  }
  
  // Créer les finales
  for (const final of localFinals) {
    const { data: dbFinal, error: finalError } = await supabase
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
    
    // Ajouter les joueurs aux finales
    const finalPlayerPromises = [
      ...final.players.team1.map(playerId => {
        return supabase
          .from('final_players')
          .insert({
            id: uuidv4(),
            final_id: dbFinal[0].id,
            player_id: playerMap.get(playerId)!,
            team: 'team1'
          });
      }),
      ...final.players.team2.map(playerId => {
        return supabase
          .from('final_players')
          .insert({
            id: uuidv4(),
            final_id: dbFinal[0].id,
            player_id: playerMap.get(playerId)!,
            team: 'team2'
          });
      })
    ];
    
    await Promise.all(finalPlayerPromises);
  }
  
  return { success: true };
};

// Fonction pour mettre à jour le score d'un match
export const updateMatchScore = async (matchId: string, team1Score: number, team2Score: number) => {
  const { data, error } = await supabase
    .from('matches')
    .update({
      team1_score: team1Score,
      team2_score: team2Score
    })
    .eq('id', matchId)
    .select();
    
  if (error) throw error;
  return data[0];
};

// Fonction pour mettre à jour le score d'une finale
export const updateFinalScore = async (finalId: string, team1Score: number, team2Score: number) => {
  const { data, error } = await supabase
    .from('finals')
    .update({
      team1_score: team1Score,
      team2_score: team2Score
    })
    .eq('id', finalId)
    .select();
    
  if (error) throw error;
  return data[0];
};
