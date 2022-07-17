const getOptions = (key: string) => {
  return {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'v3.football.api-sports.io',
      'X-RapidAPI-Key': key,
    },
  };
};

export async function fetchWithOptions<T> (url: string): Promise<T> {
  const options = getOptions(process.env.NEXT_PUBLIC_RAPID_API_KEY || '');
  const response = await fetch(`https://v3.football.api-sports.io/${url}`, options);
  const data = await response.json();
  return data.response;
};
