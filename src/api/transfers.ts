import { fetchWithOptions } from '../utils/apiFootballUtils';

export const getTransfersByTeamId = async (teamId: string | number) => {
  return fetchWithOptions(`transfers?team=${teamId}`);
};