import { LeagueResponse } from "../../types";

export const leagues: LeagueResponse[] = [
    {
        league: { name: 'Premier League', id: 39, type: 'League', logo: 'https://media.api-sports.io/football/leagues/39.png' },
        country: { name: 'England', code: 'GB', flag: 'https://media.api-sports.io/flags/gb.svg'},
        season: { year: 2021, start: '2021-08-13', end: '2022-05-22', current: true }
    },
    {
        league: { name: 'La Liga', id: 140, type: 'League', logo: 'https://media.api-sports.io/football/leagues/140.png' },
        country: { name: 'Spain', code: 'ES', flag: 'https://media.api-sports.io/flags/es.svg'},
        season: { year: 2021, start: '2021-08-13', end: '2022-05-22', current: true }
    },
    {
        league: { name: 'Bundesliga', id: 78, type: 'League', logo: 'https://media.api-sports.io/football/leagues/78.png' },
        country: { name: 'Germany', code: 'DE', flag: 'https://media.api-sports.io/flags/de.svg'},
        season: { year: 2021, start: '2021-08-13', end: '2022-05-22', current: true }
    },
    {
        league: { name: 'League 1', id: 61, type: 'League', logo: 'https://media.api-sports.io/football/leagues/61.png' },
        country: { name: 'France', code: 'FR', flag: 'https://media.api-sports.io/flags/fr.svg'},
        season: { year: 2021, start: '2021-08-13', end: '2022-05-22', current: true }
    },
    {
        league: { name: 'Serie A', id: 135, type: 'League', logo: 'https://media.api-sports.io/football/leagues/135.png' },
        country: { name: 'Italy', code: 'IT', flag: 'https://media.api-sports.io/flags/it.svg'},
        season: { year: 2021, start: '2021-08-13', end: '2022-05-22', current: true }
    },
  ];
