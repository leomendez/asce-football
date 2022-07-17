import { StandingsResponse } from '../types';
import { fetchWithOptions } from '../utils/apiFootballUtils';

export const getStandingsByLeagueIdAndSeason = async (leagueId: string, season: string) => {
  return fetchWithOptions<StandingsResponse[]>(`standings?league=${leagueId}&season=${season}`);
};
