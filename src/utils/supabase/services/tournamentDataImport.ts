
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../client';
import { players, sessions, finals } from '../../../data/tournamentData';

export const importCurrentTournamentData = async (tournamentName: string, location: string, date: string) => {
  try {
    // Get current user
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;

    // 1. Create the tournament
    const { data: tournamentData, error: tournamentError } = await supabase
      .from('tournaments')
      .insert({
        id: uuidv4(),
        name: tournamentName,
        date,
        location,
        user_id: userId
      })
      .select();
      
    if (tournamentError) throw tournamentError;
    
    const tournamentId = tournamentData[0].id;
    
    // 2. Create players
    const playerIds = new Map<number, string>();
    
    for (const player of players) {
      const { data: playerData, error: playerError } = await supabase
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
        
      if (playerError) throw playerError;
      
      playerIds.set(player.id, playerData[0].id);
    }
    
    // 3. Create sessions and matches
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
      
      // Create matches for this session
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
        
        // Add players to team 1
        for (const player of match.team1) {
          const { error: team1Error } = await supabase
            .from('match_players')
            .insert({
              id: uuidv4(),
              match_id: matchId,
              player_id: playerIds.get(player.id)!,
              team: 'team1'
            });
            
          if (team1Error) throw team1Error;
        }
        
        // Add players to team 2
        for (const player of match.team2) {
          const { error: team2Error } = await supabase
            .from('match_players')
            .insert({
              id: uuidv4(),
              match_id: matchId,
              player_id: playerIds.get(player.id)!,
              team: 'team2'
            });
            
          if (team2Error) throw team2Error;
        }
      }
    }
    
    // 4. Create finals
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
      
      // Add players to teams
      for (const playerId of final.players.team1) {
        const { error: team1Error } = await supabase
          .from('final_players')
          .insert({
            id: uuidv4(),
            final_id: finalId,
            player_id: playerIds.get(playerId)!,
            team: 'team1'
          });
          
        if (team1Error) throw team1Error;
      }
      
      for (const playerId of final.players.team2) {
        const { error: team2Error } = await supabase
          .from('final_players')
          .insert({
            id: uuidv4(),
            final_id: finalId,
            player_id: playerIds.get(playerId)!,
            team: 'team2'
          });
          
        if (team2Error) throw team2Error;
      }
    }
    
    return { tournamentId };
  } catch (error) {
    console.error('Erreur lors de l\'importation des données:', error);
    throw error;
  }
};
