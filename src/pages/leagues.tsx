import debounce from 'lodash.debounce';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from 'react-query';
import type { Column } from 'react-table';
import styled from 'styled-components';
import { getLeagues } from '../api/leagues';
import { Anchor, Table } from '../components';
import type { LeagueResponse } from '../types';
import { leagues as mockLeagues } from '../__mocks__/data/leagues';

type Props = {
  leagues: LeagueResponse[];
};

const Leagues: NextPage<Props> = ({ leagues }) => {
  const [query, setQuery] = useState('');

  const leagueQuery = useQuery<LeagueResponse[], Error>('leagues', () => mockLeagues, {
    initialData: leagues,
  });

  // const leagueQuery = useQuery<LeagueResponse[], Error>('leagues', getLeagues, {
  //   initialData: leagues,
  // });

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

  const data = useMemo(
    () =>
      filteredLeagues?.map((item) => ({
        league: (
          <Anchor href={`/league/${item.league.id}`}>
            <LeagueItem key={item.league.id}>
              <Image
                src={item.league.logo}
                alt={`league-logo-${item.league.id}`}
                width={20}
                height={20}
              />
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
        Header: <h2>League</h2>,
        accessor: 'league',
      },
      {
        Header: <h2>Country</h2>,
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
      <Skeleton />
      <SearchBar>
        <label htmlFor="search-leagues" aria-label="search-leagues" />
        <SearchInput
          onChange={debouncedChangeHandler}
          type="text"
          placeholder="Search leagues..."
          id="search-leagues"
        />
      </SearchBar>
      {!filteredLeagues ? <Skeleton count={5} /> : <Table data={data} columns={columns} />}
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const leagues: LeagueResponse[] = mockLeagues;

  return {
    props: { leagues }, // will be passed to the page component as props
  };
};

export default Leagues;

const Page = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeagueItem = styled.li`
  display: flex;
  gap: 10px;
  padding: 0.3em 1em;
  font-size: 1.2em;
  align-items: center;
  justify-content: center;
  width: 230px;
`;

const SearchInput = styled.input`
  font-size: 1.2em;
  padding: 0.4em;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.fontColor};
  border: 2px solid ${({ theme }) => theme.primary};
  ::placeholder {
    color: ${({ theme }) => theme.aux};
  }
  &:focus, &:hover {
    border: 2px solid ${({ theme }) => theme.secondary};
    outline: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin: 1em;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-top: 2px solid ${({ theme }) => theme.primary};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;
