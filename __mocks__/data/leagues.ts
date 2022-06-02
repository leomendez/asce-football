import { LeagueResponse } from "../../types";

export const leagues: LeagueResponse[] = [
    {
        league: { name: 'Premier League', id: 1, type: 'type', logo: '/logo.url' },
        country: { name: 'England', code: 'ENG', flag: '🇬🇧'},
        season: { year: 2022, start: '06-06-2021', end: '06-06-2022', current: true }
    },
    {
        league: { name: 'La Liga', id: 2, type: 'type', logo: '/logo.url' },
        country: { name: 'Spain', code: 'SPA', flag: '🇪🇸'},
        season: { year: 2022, start: '06-06-2021', end: '06-06-2022', current: true }
    },
    {
        league: { name: 'Bundesleague', id: 3, type: 'type', logo: '/logo.url' },
        country: { name: 'Germany', code: 'GER', flag: '🇩🇪'},
        season: { year: 2022, start: '06-06-2021', end: '06-06-2022', current: true }
    },
    {
        league: { name: 'League 1', id: 4, type: 'type', logo: '/logo.url' },
        country: { name: 'France', code: 'FRA', flag: 'FR'},
        season: { year: 2022, start: '06-06-2021', end: '06-06-2022', current: true }
    },
    {
        league: { name: 'Liga NOS', id: 5, type: 'type', logo: '/logo.url' },
        country: { name: 'Portugal', code: 'POR', flag: 'PO'},
        season: { year: 2022, start: '06-06-2021', end: '06-06-2022', current: true }
    },
  ];
