import { getOptions } from '../utils/apiFootballUtils';

export const getNextFixturesByTeamId = async (teamId: string | number) => {
  const options = getOptions(process.env.NEXT_PUBLIC_RAPID_API_KEY || '');
  const response = await fetch(
    `https://v3.football.api-sports.io/fixtures?team=${teamId}&next=5`,
    options
  );
  const data = await response.json();
  return data.response;
};

export const getLastFixturesByTeamId = async (teamId: string | number) => {
    const options = getOptions(process.env.NEXT_PUBLIC_RAPID_API_KEY || '');
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${teamId}&last=5`,
      options
    );
    const data = await response.json();
    return data.response;
  };
