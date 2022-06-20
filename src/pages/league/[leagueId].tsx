import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import { getStandingsByLeagueIdAndSeason } from '../../api/standings';
import { TeamLogo } from '../../components';
import { StandingsResponse } from '../../types';
import { standings as mockStandings } from '../../__mocks__/data/standings';

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

  const data = useMemo(
    () =>
      standings?.league?.standings[0]?.map((standing) => ({
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
      })),
    [handleRowClick, standings?.league?.standings]
  );

  const columns = useMemo(
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

  // @ts-ignore
  const tableInstance = useTable({ columns, data: data || [] });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  if (!standings) {
    return <div>Loading...</div>;
  }

  return (
    <LeagueContainer>
      <Title>
        <TeamLogo src={standings.league?.logo || '/fake'} alt="league-logo" />
        <h2>{standings.league?.name}</h2>{' '}
      </Title>
      <Table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={`${headerGroup.Header?.toString}-header-key`}
              >
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <TableHeader
                      {...column.getHeaderProps()}
                      key={`${column.id}-column-key`}
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </TableHeader>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <TableRow {...row.getRowProps()} key={`${row.id}-row-key`}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          key={`${cell.column.id}-${cell.row.id}-my-unique-cell-key`}
                        >
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </TableCell>
                      );
                    })
                  }
                </TableRow>
              );
            })
          }
        </tbody>
      </Table>
    </LeagueContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.leagueId;

  let standings = mockStandings;

  if (id && typeof id === 'string') {
    const res = await getStandingsByLeagueIdAndSeason(id, '2021');
    if (res.length > 0) {
      standings = res[0];
    }
  }
  return {
    props: { standings }, // will be passed to the page component as props
  };
};

export default LeaguePage;

const TableHeader = styled.th`
  padding: 0 0.4em;
`;

const TableCell = styled.td`
  padding: 0.2em;
  text-align: center;
`;

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center:
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

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const Table = styled.table`
  border-collapse: collapse;
`;