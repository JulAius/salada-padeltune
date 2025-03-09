
export interface Player {
  id: number;
  tag: string;
}

export interface Match {
  team1: Player[];
  team2: Player[];
  court: string;
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
}

export const players: Player[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  tag: (i + 1).toString(),
}));

export const sessions: Session[] = [
  {
    id: 1,
    title: "Session 1",
    time: "9h30 - 9h50",
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
    pause: "Pause: 9h50 - 9h55"
  },
  {
    id: 2,
    title: "Session 2",
    time: "9h55 - 10h15",
    matches: [
      {
        team1: [players[0], players[4]],
        team2: [players[8], players[10]],
        court: "Terrain 1"
      },
      {
        team1: [players[1], players[6]],
        team2: [players[5], players[11]],
        court: "Terrain 2"
      },
      {
        team1: [players[2], players[7]],
        team2: [players[3], players[9]],
        court: "Terrain 3"
      }
    ],
    pause: "Pause: 10h15 - 10h20"
  },
  {
    id: 3,
    title: "Session 3",
    time: "10h20 - 10h40",
    matches: [
      {
        team1: [players[0], players[7]],
        team2: [players[5], players[8]],
        court: "Terrain 1"
      },
      {
        team1: [players[1], players[9]],
        team2: [players[4], players[10]],
        court: "Terrain 2"
      },
      {
        team1: [players[2], players[11]],
        team2: [players[3], players[6]],
        court: "Terrain 3"
      }
    ],
    pause: "Pause: 10h40 - 10h45"
  },
  {
    id: 4,
    title: "Session 4",
    time: "10h45 - 11h05",
    matches: [
      {
        team1: [players[0], players[10]],
        team2: [players[3], players[4]],
        court: "Terrain 1"
      },
      {
        team1: [players[1], players[8]],
        team2: [players[2], players[6]],
        court: "Terrain 2"
      },
      {
        team1: [players[5], players[9]],
        team2: [players[7], players[11]],
        court: "Terrain 3"
      }
    ],
    pause: "Pause: 11h05 - 11h10"
  },
  {
    id: 5,
    title: "Session 5",
    time: "11h10 - 11h30",
    matches: [
      {
        team1: [players[0], players[6]],
        team2: [players[7], players[9]],
        court: "Terrain 1"
      },
      {
        team1: [players[1], players[2]],
        team2: [players[8], players[11]],
        court: "Terrain 2"
      },
      {
        team1: [players[3], players[10]],
        team2: [players[4], players[5]],
        court: "Terrain 3"
      }
    ]
  }
];

export const timelineSteps = [
  { time: "9h00", label: "Accueil" },
  { time: "9h15", label: "Tirage au sort" },
  { time: "9h30", label: "Tour 1" },
  { time: "9h55", label: "Tour 2" },
  { time: "10h20", label: "Tour 3" },
  { time: "10h45", label: "Tour 4" },
  { time: "11h10", label: "Tour 5" },
  { time: "11h30", label: "Classement" },
  { time: "11h45", label: "Finales" }
];

export const finals: Final[] = [
  {
    type: "champions",
    title: "Finale Champions",
    time: "11h45 - 12h30",
    participants: "Top 4 du classement",
    court: "Terrain 1",
    players: {
      team1: [1, 2],
      team2: [3, 4]
    }
  },
  {
    type: "europa",
    title: "Finale Europa",
    time: "11h45 - 12h30",
    participants: "Joueurs classés 5 à 8",
    court: "Terrain 2",
    players: {
      team1: [5, 6],
      team2: [7, 8]
    }
  },
  {
    type: "conference",
    title: "Finale Conference",
    time: "11h45 - 12h30",
    participants: "Joueurs classés 9 à 12",
    court: "Terrain 3",
    players: {
      team1: [9, 10],
      team2: [11, 12]
    }
  }
];
