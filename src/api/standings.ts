import { URLSearchParams } from 'url';
import { StandingsResponse } from '../types';
import { getOptions } from '../utils/apiFootballUtils';

export const getStandingsByLeagueIdAndSeason = async (
  leagueId: string,
  season: string
): Promise<StandingsResponse[]> => {
  const options = getOptions(process.env.NEXT_PUBLIC_RAPID_API_KEY || '');
  const response = await fetch(
    `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`,
    options
  );
  const data = await response.json();
  return data.response;
};
