import { TeamsResponse } from '../types';
import { fetchWithOptions } from '../utils/apiFootballUtils';

export const getTeamsByLeagueIdAndSeasonId = async (leagueId: number, season: number) => {
  return fetchWithOptions(`league=${leagueId}&season=${season}`);
};

export const getTeamById = async (teamId: string) => {
  return fetchWithOptions<TeamsResponse[]>(`teams?id=${teamId}`);
};
