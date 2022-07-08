import debounce from 'lodash.debounce';
import type { NextPage } from 'next';
import Image from 'next/image';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import type { Column } from 'react-table';
import styled from 'styled-components';
import { getLeagues } from '../api/leagues';
import { Anchor, Input, Table } from '../components';
import type { LeagueResponse, Season } from '../types';
import { leagues as mockLeagues } from '../__mocks__/data/leagues';

type Props = {
};

const Leagues: NextPage<Props> = () => {
  const [query, setQuery] = useState('');

  const leagueQuery = useQuery<LeagueResponse[], Error>('leagues', () => getLeagues());

  let filteredLeagues = leagueQuery?.data || mockLeagues;

  if (query !== '') {
    filteredLeagues =
      leagueQuery?.data?.filter((item) => {
        return (
          item.league.name.toLowerCase().includes(query.toLowerCase()) ||
          item.country.name.toLowerCase().includes(query.toLowerCase())
        );
      }) || [];
  }
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 200), []);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const getCurrentSeason = (seasons: Season[]) => {
    return seasons?.find(season => season.current)?.year;
  }

  const data = useMemo(
    () =>
      filteredLeagues?.map((item) => ({
        league: (
          <Anchor href={`/league/${item.league.id}/${getCurrentSeason(item.seasons)}`}>
            <LeagueItem key={item.league.id}>
              <Image src={item.league.logo} alt={`league-logo-${item.league.id}`} width={20} height={20} />
              {item.league.name}
            </LeagueItem>
          </Anchor>
        ),
        country: (
          <LeagueItem key={item.country?.name}>
            <Image
              src={item.country.flag || '/icon.png'}
              alt={`country-logo-${item.country.code}`}
              width={20}
              height={20}
            />
            {item.country.name}
          </LeagueItem>
        ),
      })),
    [filteredLeagues]
  );

  const columns: Column[] = useMemo(
    () => [
      {
        Header: <LeagueHeader>League</LeagueHeader>,
        accessor: 'league',
      },
      {
        Header: <LeagueHeader>Country</LeagueHeader>,
        accessor: 'country',
      },
    ],
    []
  );

  if (leagueQuery.isError) {
    return <div>Oops, something went wrong</div>;
  }

  return (
    <Page>
      <h1>Leagues</h1>
      <SearchBar>
        <label htmlFor="search-leagues" aria-label="search-leagues" />
        <SearchInput
          onChange={debouncedChangeHandler}
          type="text"
          placeholder="Search leagues..."
          id="search-leagues"
        />
      </SearchBar>
      <Table data={data} columns={columns} pagination loading={leagueQuery.isLoading} />
    </Page>
  );
};

export default Leagues;

const Page = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3em;
`;

const LeagueHeader = styled.span`
  font-weight: 800;
  font-size: 1.5em;
  display: flex;
  padding-left: 1em;
`;

const LeagueItem = styled.li`
  display: flex;
  gap: 10px;
  padding: 0.3em 1em;
  font-size: 1.2em;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const SearchInput = styled(Input)`
  font-size: 1.2em;
`;

const SearchBar = styled.div`
  display: flex;
  margin: 0.5em;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-top: 2px solid ${({ theme }) => theme.primary};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;
