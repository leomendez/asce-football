import { getOptions } from "../utils/apiFootballUtils";

export const getTeamsByLeagueIdAndSeasonId = async (leagueId: number, season: number) => {
    const options = getOptions(process.env.NEXT_PUBLIC_RAPID_API_KEY || '');
    const response = await fetch(`https://v3.football.api-sports.io/teams?league=${leagueId}&season=${season}`, options);
    const data = await response.json();
    return data.response;
}