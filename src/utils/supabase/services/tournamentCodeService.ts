
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
    
    // 1. Create the tournament with the unique code
    const { data: tournamentData, error: tournamentError } = await supabase
      .from('tournaments')
      .insert({
        id: uuidv4(),
        name: tournamentName,
        date,
        location,
        access_code: uniqueCode
      })
      .select();
      
    if (tournamentError) throw tournamentError;
    
    const tournamentId = tournamentData[0].id;
    
    // 2. Save players
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
    
    // 3. Save sessions and matches
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
        
        // Add players to match
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
    
    // 4. Save finals
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
      
      // Add players to finals
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
    
    return { tournamentId, accessCode: uniqueCode };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du tournoi:', error);
    toast.error('Une erreur est survenue lors de la sauvegarde du tournoi');
    throw error;
  }
};

// Get tournament data by access code
export const getTournamentByCode = async (accessCode: string) => {
  try {
    // Get tournament
    const { data: tournamentData, error: tournamentError } = await supabase
      .from('tournaments')
      .select('*')
      .eq('access_code', accessCode)
      .single();
      
    if (tournamentError) throw tournamentError;
    
    // Get players
    const { data: playersData, error: playersError } = await supabase
      .from('players')
      .select('*')
      .eq('tournament_id', tournamentData.id)
      .order('tag', { ascending: true });
      
    if (playersError) throw playersError;
    
    // Get sessions
    const { data: sessionsData, error: sessionsError } = await supabase
      .from('sessions')
      .select('*')
      .eq('tournament_id', tournamentData.id)
      .order('title', { ascending: true });
      
    if (sessionsError) throw sessionsError;
    
    // Get matches for each session
    const sessionsWithMatches = [];
    for (const session of sessionsData) {
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('*')
        .eq('session_id', session.id);
        
      if (matchesError) throw matchesError;
      
      // Get players for each match
      const matchesWithPlayers = [];
      for (const match of matchesData) {
        const { data: matchPlayersData, error: matchPlayersError } = await supabase
          .from('match_players')
          .select('*, players(*)')
          .eq('match_id', match.id);
          
        if (matchPlayersError) throw matchPlayersError;
        
        // Organize players into teams
        const team1 = matchPlayersData.filter(mp => mp.team === 'team1').map(mp => mp.players);
        const team2 = matchPlayersData.filter(mp => mp.team === 'team2').map(mp => mp.players);
        
        matchesWithPlayers.push({
          ...match,
          team1,
          team2
        });
      }
      
      sessionsWithMatches.push({
        ...session,
        matches: matchesWithPlayers
      });
    }
    
    // Get finals
    const { data: finalsData, error: finalsError } = await supabase
      .from('finals')
      .select('*')
      .eq('tournament_id', tournamentData.id);
      
    if (finalsError) throw finalsError;
    
    // Get players for each final
    const finalsWithPlayers = [];
    for (const final of finalsData) {
      const { data: finalPlayersData, error: finalPlayersError } = await supabase
        .from('final_players')
        .select('*, players(*)')
        .eq('final_id', final.id);
        
      if (finalPlayersError) throw finalPlayersError;
      
      // Organize players into teams
      const team1Players = finalPlayersData.filter(fp => fp.team === 'team1').map(fp => fp.players);
      const team2Players = finalPlayersData.filter(fp => fp.team === 'team2').map(fp => fp.players);
      
      finalsWithPlayers.push({
        ...final,
        players: {
          team1: team1Players.map(p => parseInt(p.tag)),
          team2: team2Players.map(p => parseInt(p.tag))
        }
      });
    }
    
    return {
      tournament: tournamentData,
      players: playersData,
      sessions: sessionsWithMatches,
      finals: finalsWithPlayers
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du tournoi:', error);
    toast.error('Code de tournoi invalide ou tournoi introuvable');
    throw error;
  }
};
