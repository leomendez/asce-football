export const getOptions = (key: string) => {
    return {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'v3.football.api-sports.io',
            'X-RapidAPI-Key': key
        }
    }
}