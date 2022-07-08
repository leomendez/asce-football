import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import type { Column } from 'react-table';
import styled from 'styled-components';
import { getLeagues } from '../../../api/leagues';
import { getStandingsByLeagueIdAndSeason } from '../../../api/standings';
import { Select, Table } from '../../../components';
import { LeagueResponse, Standing, StandingsResponse } from '../../../types';
import { underline } from '../../../utils/animations';

type LeagueProps = {
  standings: StandingsResponse;
  league: LeagueResponse;
};

type TableData = {
  team: JSX.Element;
  PL: JSX.Element;
  W: JSX.Element;
  D: JSX.Element;
  L: JSX.Element;
  GD: JSX.Element;
  PTS: JSX.Element;
};

const LeaguePage = ({ standings, league }: LeagueProps) => {
  const router = useRouter();
  const { season } = router.query;

  const handleRowClick = useCallback(
    (teamId: number) =>
      ((teamId: number) => {
        router.push(`/team/${teamId}`);
      })(teamId),
    [router]
  );

  const getStandingsData = useCallback(
    (standings: Standing[][]) => {
      const data: TableData[][] = [];
      standings?.forEach((standingList) => {
        const stan = standingList.map((standing) => ({
          team: (
            <Link href={`/team/${standing?.team?.id}`}>
              <Team>
                <Rank>{standing.rank}</Rank>
                <div>
                  <Logo>
                    <Image
                      src={standing?.team?.logo || '/fake'}
                      width="18px"
                      height="18px"
                      alt={`${standing?.team?.id}-logo`}
                    />
                  </Logo>
                  {standing?.team?.name}
                </div>
              </Team>
            </Link>
          ),
          PL: <CellItem>{standing?.all?.played}</CellItem>,
          W: <CellItem>{standing?.all?.win}</CellItem>,
          D: <CellItem>{standing?.all?.draw}</CellItem>,
          L: <CellItem>{standing?.all?.lose}</CellItem>,
          GD: <CellItem>{standing?.goalsDiff}</CellItem>,
          PTS: <CellItem>{standing?.points}</CellItem>,
        }));
        data.push(stan);
      });
      return data;
    },
    []
  );

  const dataList = useMemo(
    () => getStandingsData(standings?.league?.standings),
    [standings?.league?.standings, getStandingsData]
  );

  const columns: Column[] = useMemo(
    () => [
      {
        Header: '',
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

  return (
    <LeagueContainer>
      <SeasonSelect>
        <span>Season</span>
        <Select
          onChange={(e) => {
            router.push(`/league/${league?.league?.id}/${e.target.value}`);
          }}
          value={season}
        >
          {league.seasons?.map((season) => {
            return <option key={season.year}>{season.year}</option>;
          })}
        </Select>
      </SeasonSelect>
      <Heading>
        <Title>STANDINGS</Title>
        <LeagueName>
          <Image src={league?.league?.logo || '/fake'} alt="league-logo" height="30px" width="30px" />
          <span>{league?.league?.name}</span>
        </LeagueName>
      </Heading>
      {!standings ? (
        <div>No data for this season</div>
      ) : (
        dataList.map((data, index) => (
          <Group key={index}>
            <Table data={data} columns={columns}></Table>
          </Group>
        ))
      )}
    </LeagueContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const leagueId = context?.params?.leagueId;
  const season = context?.params?.season;

  let standings = null;
  let league = null;

  if (leagueId && typeof leagueId === 'string' && season && typeof season === 'string') {
    const leagueResponse = await getLeagues(leagueId);
    league = leagueResponse[0];

    const standingResponse = await getStandingsByLeagueIdAndSeason(leagueId, season);

    if (standingResponse.length > 0) {
      standings = standingResponse[0];
    }
  }
  return {
    props: { standings, league }, // will be passed to the page component as props
  };
};

export default LeaguePage;

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2em;
  padding: 2em 1em;
`;

const Heading = styled.div`
  display: flex;
  gap: 60px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  width: 100%;
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: 800;
`;

const LeagueName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: 600;
  gap: 5px;
`;

const Team = styled.a`
  ${({ theme }) => underline(theme)}
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.2em;
  gap: 20px;
`;

const Logo = styled.span`
  margin: 0.3em 0.7em 0.1em 0;
`;

const Group = styled.div`
  margin: 1em;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
`;

const SeasonSelect = styled.div`
  display: flex;
  font-size: 1.2em;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-weight: 600;
  margin-bottom: 2em;
  select {
    font-size: 0.8em;
  }
`;

const CellItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2em;
`;

const Rank = styled.b`
  text-align: center;
  width: 1em;
`;
