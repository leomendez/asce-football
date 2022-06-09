import { Coverage } from "./Coverage";

export type League = {
    id: number;
    name: string;
    type: string;
    logo: string;
}

export type Country = {
    name: string;
    code: string | null;
    flag: string | null;
}

export type Season = {
    year: number;
    start: string;
    end: string;
    current: boolean;
    coverage?: Coverage;
}



export type LeagueResponse = {
    league: League,
    country: Country,
    season: Season
}
  
