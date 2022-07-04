import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import type { Column } from 'react-table';
import styled from 'styled-components';
import { getLeagues } from '../../../api/leagues';
import { getStandingsByLeagueIdAndSeason } from '../../../api/standings';
import { Select, Table, TeamLogo } from '../../../components';
import { LeagueResponse, Standing, StandingsResponse } from '../../../types';

type LeagueProps = {
  standings: StandingsResponse;
  league: LeagueResponse;
};

type TableData = {
  team: JSX.Element;
  PL: number;
  W: number;
  D: number;
  L: number;
  GD: number;
  PTS: number;
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
`

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
