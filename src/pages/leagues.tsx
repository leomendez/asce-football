import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { getLeagues } from '../api/leagues';
import { getTeamsByLeagueIdAndSeasonId } from '../api/teams';
import { Anchor } from '../components';
import { LeagueResponse, TeamsResponse } from '../types';
import { leagues as mockLeagues } from '../__mocks__/data/leagues';
import { teams as mockTeams } from '../__mocks__/data/teams';

type Props = {
  leagues: LeagueResponse[];
};

const Home: NextPage<Props> = ({ leagues }) => {
  return (
    <Page>
      <h2>Leagues</h2>
      <LeaguesList>
        {leagues?.map((item) => (
          <LeagueItem key={item.league.id}>
            <Image
              src={item.league.logo}
              alt={`league-logo-${item.league.id}`}
              width={16}
              height={16}
            />
            <Anchor href={`/league/${item.league.id}`}>
              {item.league.name}
            </Anchor>
          </LeagueItem>
        ))}
      </LeaguesList>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // const leagues = await getLeagues();
  const leagues: LeagueResponse[] = mockLeagues;

  return {
    props: { leagues }, // will be passed to the page component as props
  };
};

export default Home;

const Page = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeaguesList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const LeagueItem = styled.li`
  display: flex;
  gap: 10px;
  padding: 0.3em;
`;
