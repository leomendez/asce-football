import { StandingsResponse } from '../../types';

export const standings: StandingsResponse = {
  league: {
    country: 'England',
    flag: 'https://media.api-sports.io/flags/gb.svg',
    id: 39,
    logo: 'https://media.api-sports.io/football/leagues/39.png',
    name: 'Premier League',
    season: 2020,
    standings: [
      [
        {
          all: {
            draw: 5,
            goals: { for: 83, against: 32 },
            lose: 6,
            played: 38,
            win: 27,
          },
          away: {
            draw: 3,
            goals: { for: 40, against: 15 },
            lose: 2,
            played: 19,
            win: 14,
          },
          description: 'Promotion - Champions League (Group Stage)',
          form: 'WLWLW',
          goalsDiff: 51,
          group: 'Premier League',
          home: {
            played: 19,
            win: 13,
            draw: 2,
            lose: 4,
            goals: { for: 43, against: 17 },
          },
          points: 86,
          rank: 1,
          status: 'same',
          team: {
            id: 50,
            name: 'Manchester City',
            logo: 'https://media.api-sports.io/football/teams/50.png',
          },
        },
        {
          all: {
            draw: 5,
            goals: { for: 83, against: 32 },
            lose: 6,
            played: 38,
            win: 27,
          },
          away: {
            draw: 3,
            goals: { for: 40, against: 15 },
            lose: 2,
            played: 19,
            win: 14,
          },
          description: 'Promotion - Champions League (Group Stage)',
          form: 'WLWLW',
          goalsDiff: 51,
          group: 'Premier League',
          home: {
            played: 19,
            win: 13,
            draw: 2,
            lose: 4,
            goals: { for: 43, against: 17 },
          },
          points: 83,
          rank: 2,
          status: 'same',
          team: {
            id: 40,
            name: 'Liverpool',
            logo: 'https://media.api-sports.io/football/teams/40.png',
          },
        },
      ],
    ],
  },
};
