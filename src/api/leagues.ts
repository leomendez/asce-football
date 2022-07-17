import { LeagueResponse } from '../types';
import { fetchWithOptions } from '../utils/apiFootballUtils';

export const getLeagues = async (leagueId?: string) => {
  return fetchWithOptions<LeagueResponse[]>(`leagues?${!!leagueId ? `id=${leagueId}` : ''}`);
};

export const getLeagueSeasons = async () => {
  return fetchWithOptions('leagues/seasons');
};
