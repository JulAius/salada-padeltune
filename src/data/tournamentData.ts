export interface Player {
  id: number;
  tag: string;
  name: string;
  points: number;
  pointsScored: number;
  pointsConceded: number;
  rank?: number;
}

export interface Match {
  team1: Player[];
  team2: Player[];
  court: string;
  score?: {
    team1: number;
    team2: number;
  };
}

export interface Session {
  id: number;
  title: string;
  time: string;
  matches: Match[];
  pause?: string;
}

export interface Final {
  type: 'champions' | 'europa' | 'conference';
  title: string;
  time: string;
  participants: string;
  court: string;
  players: {
    team1: number[];
    team2: number[];
  };
  score?: {
    team1: number;
    team2: number;
  };
}

export const players: Player[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  tag: (i + 1).toString(),
  name: "",
  points: 0,
  pointsScored: 0,
  pointsConceded: 0,
}));

export const updatePlayerRankings = () => {
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    
    const aDiff = a.pointsScored - a.pointsConceded;
    const bDiff = b.pointsScored - b.pointsConceded;
    
    if (bDiff !== aDiff) {
      return bDiff - aDiff;
    }
    
    return b.pointsScored - a.pointsScored;
  });
  
  sortedPlayers.forEach((player, index) => {
    const playerIndex = players.findIndex(p => p.id === player.id);
    if (playerIndex !== -1) {
      players[playerIndex].rank = index + 1;
    }
  });
  
  return [...players];
};

export const calculatePoints = (match: Match) => {
  if (!match.score) return;
  
  const team1Win = match.score.team1 > match.score.team2;
  const pointsWin = 1;
  const pointsLoss = 0;
  
  match.team1.forEach(player => {
    const playerIndex = players.findIndex(p => p.id === player.id);
    if (playerIndex !== -1) {
      players[playerIndex].points += team1Win ? pointsWin : pointsLoss;
      players[playerIndex].pointsScored += match.score!.team1;
      players[playerIndex].pointsConceded += match.score!.team2;
    }
  });
  
  match.team2.forEach(player => {
    const playerIndex = players.findIndex(p => p.id === player.id);
    if (playerIndex !== -1) {
      players[playerIndex].points += team1Win ? pointsLoss : pointsWin;
      players[playerIndex].pointsScored += match.score!.team2;
      players[playerIndex].pointsConceded += match.score!.team1;
    }
  });
  
  updatePlayerRankings();
};

export const updatePlayerName = (playerId: number, name: string) => {
  const playerIndex = players.findIndex(p => p.id === playerId);
  if (playerIndex !== -1) {
    players[playerIndex].name = name;
  }
};

export const randomizePlayerNumbers = (playerNames: string[]) => {
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
  
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  
  playerNames.forEach((name, index) => {
    if (index < 12) {
      const playerId = numbers[index];
      const playerIndex = players.findIndex(p => p.id === playerId);
      if (playerIndex !== -1) {
        players[playerIndex].name = name;
      }
    }
  });
  
  return [...players];
};

export const timelineSteps = [
  { time: "09h00", label: "Accueil joueurs" },
  { time: "09h20", label: "Annonce des équipes" },
  { time: "09h30", label: "Tour 1" },
  { time: "09h55", label: "Tour 2" },
  { time: "10h20", label: "Tour 3" },
  { time: "10h45", label: "Tour 4" },
  { time: "11h10", label: "Tour 5" },
  { time: "11h30", label: "Classement" },
  { time: "11h40", label: "Finales" }
];

export const sessions: Session[] = [
  {
    id: 1,
    title: "Tour 1",
    time: "09h30 - 09h50",
    matches: [
      {
        team1: [players[0], players[1]],
        team2: [players[2], players[3]],
        court: "Terrain 1"
      },
      {
        team1: [players[4], players[5]],
        team2: [players[6], players[7]],
        court: "Terrain 2"
      },
      {
        team1: [players[8], players[9]],
        team2: [players[10], players[11]],
        court: "Terrain 3"
      }
    ],
    pause: "Pause: 09h50 - 09h55"
  },
  {
    id: 2,
    title: "Tour 2",
    time: "09h55 - 10h15",
    matches: [
      {
        team1: [players[0], players[4]],
        team2: [players[6], players[10]],
        court: "Terrain 1"
      },
      {
        team1: [players[1], players[7]],
        team2: [players[8], players[11]],
        court: "Terrain 2"
      },
      {
        team1: [players[2], players[5]],
        team2: [players[3], players[9]],
        court: "Terrain 3"
      }
    ],
    pause: "Pause: 10h15 - 10h20"
  },
  {
    id: 3,
    title: "Tour 3",
    time: "10h20 - 10h40",
    matches: [
      {
        team1: [players[0], players[6]],
        team2: [players[3], players[11]],
        court: "Terrain 1"
      },
      {
        team1: [players[1], players[9]],
        team2: [players[5], players[7]],
        court: "Terrain 2"
      },
      {
        team1: [players[2], players[8]],
        team2: [players[4], players[10]],
        court: "Terrain 3"
      }
    ],
    pause: "Pause: 10h40 - 10h45"
  },
  {
    id: 4,
    title: "Tour 4",
    time: "10h45 - 11h05",
    matches: [
      {
        team1: [players[0], players[9]],
        team2: [players[4], players[8]],
        court: "Terrain 1"
      },
      {
        team1: [players[1], players[10]],
        team2: [players[2], players[6]],
        court: "Terrain 2"
      },
      {
        team1: [players[3], players[7]],
        team2: [players[5], players[11]],
        court: "Terrain 3"
      }
    ],
    pause: "Pause: 11h05 - 11h10"
  },
  {
    id: 5,
    title: "Tour 5",
    time: "11h10 - 11h30",
    matches: [
      {
        team1: [players[0], players[11]],
        team2: [players[1], players[5]],
        court: "Terrain 1"
      },
      {
        team1: [players[2], players[10]],
        team2: [players[7], players[9]],
        court: "Terrain 2"
      },
      {
        team1: [players[3], players[8]],
        team2: [players[4], players[6]],
        court: "Terrain 3"
      }
    ]
  }
];

export const finals: Final[] = [
  {
    type: "champions",
    title: "Finale Champions",
    time: "11h40 - 12h30",
    participants: "Top 1 à 4",
    court: "Terrain 1",
    players: {
      team1: [1, 4],
      team2: [2, 3]
    }
  },
  {
    type: "europa",
    title: "Finale Europa",
    time: "11h40 - 12h30",
    participants: "Joueurs classés 5 à 8",
    court: "Terrain 2",
    players: {
      team1: [5, 8],
      team2: [6, 7]
    }
  },
  {
    type: "conference",
    title: "Finale Conference",
    time: "11h40 - 12h30",
    participants: "Joueurs classés 9 à 12",
    court: "Terrain 3",
    players: {
      team1: [9, 12],
      team2: [10, 11]
    }
  }
];

export const getFinalWinners = () => {
  const winners = {
    champions: { winners: [] as number[], runners: [] as number[] },
    europa: { winners: [] as number[], runners: [] as number[] },
    conference: { winners: [] as number[], runners: [] as number[] }
  };

  finals.forEach(final => {
    if (final.score) {
      const winningTeam = final.score.team1 > final.score.team2 ? 'team1' : 'team2';
      const losingTeam = winningTeam === 'team1' ? 'team2' : 'team1';
      
      winners[final.type].winners = [...final.players[winningTeam]];
      winners[final.type].runners = [...final.players[losingTeam]];
    }
  });

  return winners;
};

