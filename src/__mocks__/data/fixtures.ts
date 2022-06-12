import { FixtureResponse } from '../../types/Fixture';

export const fixtures: FixtureResponse[] = [
  {
    fixture: {
      date: '2022-05-28T19:00:00+00:00',
      id: 861089,
      periods: {
        first: 1653764400,
        second: 1653764400,
      },
      referee: 'C. Turpin',
      status: {
        elapsed: 90,
        long: 'Match Finished',
        short: 'FT',
      },
      timestamp: 1653764400,
      timezone: 'UTC',
      venue: {
        city: 'Saint-Denis',
        id: null,
        name: 'Stade de France',
      },
    },
    goals: {
      away: 1,
      home: 0,
    },
    league: {
      country: 'World',
      flag: null,
      id: 2,
      logo: 'https://media.api-sports.io/football/leagues/2.png',
      name: 'UEFA Champions League',
      round: 'Final',
      season: 2021,
    },
  },
  {
    fixture: {
      date: '2022-04-28T19:00:00+00:00',
      id: 861088,
      periods: {
        first: 1653764400,
        second: 1653764400,
      },
      referee: 'C. Turpin',
      status: {
        elapsed: 90,
        long: 'Match Finished',
        short: 'FT',
      },
      timestamp: 1653764400,
      timezone: 'UTC',
      venue: {
        city: 'Saint-Denis',
        id: null,
        name: 'Stade de France',
      },
    },
    goals: {
      away: 1,
      home: 0,
    },
    league: {
      country: 'World',
      flag: null,
      id: 2,
      logo: 'https://media.api-sports.io/football/leagues/2.png',
      name: 'UEFA Champions League',
      round: 'Final',
      season: 2021,
    },
  },
];
