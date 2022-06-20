import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getLeagues } from '../api/leagues';
import { getTeamsByLeagueIdAndSeasonId } from '../api/teams';
import { LeagueResponse, TeamsResponse } from '../types';
import { leagues as mockLeagues } from '../__mocks__/data/leagues';
import { teams as mockTeams } from '../__mocks__/data/teams';

type Props = {
  leagues: LeagueResponse[];
  teams?: any;
};

const Home: NextPage<Props> = ({ leagues, teams }) => {
  return (
    <div>
      <main>
        <h2>Teams</h2>
        <ul>
          <li>
            <Link href="team/541">
              <a>Real Madrid</a>
            </Link>
          </li>
        </ul>
        <ul>
          {leagues?.map((item) => (
            <li key={item.league.id}>
              <Image
                src={item.league.logo}
                alt={`league-logo-${item.league.id}`}
                width={16}
                height={16}
              />
              <Link href={`/league/${item.league.id}`}>
                <a>{item.league.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // const leagues = await getLeagues();
  const leagues: LeagueResponse[] = mockLeagues;

  // const teams = await getTeamsByLeagueIdAndSeasonId(140, 2021);
  const teams: TeamsResponse[] = mockTeams;

  return {
    props: { leagues, teams }, // will be passed to the page component as props
  };
};

export default Home;
