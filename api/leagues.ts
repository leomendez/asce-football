import { getOptions } from "../utils/apiFootballUtils";

export const getLeagues = async () => {
    const options = getOptions(process.env.NEXT_PUBLIC_RAPID_API_KEY || '');
    const response = await fetch('https://v3.football.api-sports.io/leagues', options);
    const data = await response.json();
    return data.response;
}