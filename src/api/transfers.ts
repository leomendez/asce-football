import { TransfersResponse } from '../types';
import { fetchWithOptions } from '../utils/apiFootballUtils';

export const getTransfersByTeamId = async (teamId: string | number) => {
  return fetchWithOptions<TransfersResponse[]>(`transfers?team=${teamId}`);
};