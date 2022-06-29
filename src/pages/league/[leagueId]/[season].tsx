import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import type { Column } from 'react-table';
import styled from 'styled-components';
import { getStandingsByLeagueIdAndSeason } from '../../../api/standings';
import { Table, TeamLogo } from '../../../components';
import { Standing, StandingsResponse } from '../../../types';
import { standings as mockStandings } from '../../../__mocks__/data/standings';

type LeagueProps = {
  standings: StandingsResponse;
};

const LeaguePage = ({ standings }: LeagueProps) => {
  const router = useRouter();

  const handleRowClick = useCallback(
    (teamId: number) =>
      ((teamId: number) => {
        router.push(`/team/${teamId}`);
      })(teamId),
    [router]
  );

  const getStandingsData = useCallback(
    (standings: Standing[][]) => {
      // TODO - figure out type
      const data: any[] = [];
      standings?.forEach((standingList) => {
        const stan = standingList.map((standing) => ({
          team: (
            <Team onClick={() => handleRowClick(standing.team.id)}>
              <b>{standing.rank}</b>
              <RankSeparator />
              <Logo>
                <Image
                  src={standing?.team?.logo || '/fake'}
                  width="18px"
                  height="18px"
                  alt={`${standing?.team?.id}-logo`}
                />
              </Logo>
              {standing?.team?.name}
            </Team>
          ),
          PL: standing?.all?.played,
          W: standing?.all?.win,
          D: standing?.all?.draw,
          L: standing?.all?.lose,
          GD: standing?.goalsDiff,
          PTS: standing?.points,
        }));
        data.push(stan);
      });
      return data;
    },
    [handleRowClick]
  );

  const dataList = useMemo(
    () => getStandingsData(standings?.league?.standings),
    [standings?.league?.standings, getStandingsData]
  );

  const columns: Column[] = useMemo(
    () => [
      {
        Header: <TeamHeader>R - Team</TeamHeader>,
        accessor: 'team',
      },
      {
        Header: 'PL',
        accessor: 'PL',
      },
      {
        Header: 'W',
        accessor: 'W',
      },
      {
        Header: 'L',
        accessor: 'L',
      },
      {
        Header: 'D',
        accessor: 'D',
      },
      {
        Header: 'GD',
        accessor: 'GD',
      },
      {
        Header: 'PTS',
        accessor: 'PTS',
      },
    ],
    []
  );

  if (!standings) {
    return (
      <LeagueContainer>
        <h1>Oops, something went wrong</h1>
      </LeagueContainer>
    );
  }

  return (
    <LeagueContainer>
      <Title>
        <TeamLogo src={standings.league?.logo || '/fake'} alt="league-logo" />
        <h2>{standings.league?.name}</h2>
      </Title>
      {/* <Table data={data} columns={columns}></Table> */}
      {dataList.map((data, index) => (
        <Group key={index}>
          <Table data={data} columns={columns}></Table>
        </Group>
      ))}
    </LeagueContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const leagueId = context?.params?.leagueId;
  const season = context?.params?.season;

  let standings = null;

  if (leagueId && typeof leagueId === 'string' && season && typeof season === 'string') {
    const res = await getStandingsByLeagueIdAndSeason(leagueId, season);

    if (res.length > 0) {
      standings = res[0];
    }
  }
  return {
    props: { standings }, // will be passed to the page component as props
  };
};

export default LeaguePage;

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2em;
`;

const Title = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 2em;
`;

const Team = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.2em;
  min-width: 210px;
  &:hover {
    font-weight: 700;
  }
`;

const TeamHeader = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const RankSeparator = styled.span`
  border: 2px solid white;
  border-radius: 50%;
  height: 7px;
  width: 7px;
  margin: 0.5em;
`;

const Logo = styled.span`
  margin: 0.3em 0.3em 0.1em 0;
`;

const Group = styled.div`
  margin: 1em;
`;