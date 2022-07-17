import { FixtureResponse } from '../types/Fixture';
import { fetchWithOptions } from '../utils/apiFootballUtils';

export const getNextFixturesByTeamId = async (teamId: string | number) => {
  return fetchWithOptions<FixtureResponse[]>(`fixtures?team=${teamId}&next=5`);
};

export const getLastFixturesByTeamId = async (teamId: string | number) => {
  return fetchWithOptions<FixtureResponse[]>(`fixtures?team=${teamId}&last=5`);
};
