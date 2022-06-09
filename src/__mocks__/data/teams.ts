import { TeamsResponse } from '../../types';

export const teams: TeamsResponse[] = [
    {
        team: { 
            code: 'REA',
            country: 'Spain',
            founded: 1902,
            id: 541,
            logo: 'https://media.api-sports.io/football/teams/541.png',
            name: 'Real Madrid',
            national: false
        },
        venue: {
            address: 'Avenida de Concha Espina 1, Chamartín',
            capacity: 85454,
            city: 'Madrid',
            id: 1456,
            image: 'https://media.api-sports.io/football/venues/1456.png',
            name: 'Estadio Santiago Bernabéu',
            surface: 'grass'
        }
    },
    {
        team: { 
            code: 'SEV',
            country: 'Spain',
            founded: 1890,
            id: 536,
            logo: 'https://media.api-sports.io/football/teams/536.png',
            name: 'Sevilla',
            national: false
        },
        venue: {
            address: 'Avenida de Eduardo Dato',
            capacity: 48649,
            city: 'Sevilla',
            id: 1494,
            image: 'https://media.api-sports.io/football/venues/1494.png',
            name: 'Estadio Ramón Sánchez Pizjuán',
            surface: 'grass'
        }
    },
    {
        team: { 
            code: 'CEL',
            country: 'Spain',
            founded: 1923,
            id: 538,
            logo: 'https://media.api-sports.io/football/teams/538.png',
            name: 'Celta Vigo',
            national: false
        },
        venue: {
            address: 'Avenida de Balaídos',
            capacity: 31800,
            city: 'Vigo',
            id: 1467,
            image: 'https://media.api-sports.io/football/venues/1467.png',
            name: 'Abanca-Balaídos',
            surface: 'grass'
        }
    }
  ];
