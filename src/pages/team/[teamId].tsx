import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import {
  getLastFixturesByTeamId,
  getNextFixturesByTeamId,
} from '../../api/fixtures';
import { getTeamById } from '../../api/teams';
import Fixtures from '../../components/Fixtures/Fixtures';
import { TeamInfo, TeamLogo } from '../../components/index';
import { Team, Venue } from '../../types';
import { FixtureResponse } from '../../types/Fixture';
import { fixtures as mockFixtures } from '../../__mocks__/data/fixtures';
import { teams } from '../../__mocks__/data/teams';

type TeamProps = {
  team: Team;
  venue: Venue;
  fixtures: FixtureResponse[];
};

const TABS = {
  INFO: 'info',
  FIXTURES: 'fixtures',
  RESULTS: 'results',
};

const TeamPage = ({ team, venue, fixtures }: TeamProps) => {
  // useEffect(() => {
  //   if (team.id) {
  //     getLastFixturesByTeamId(team.id)
  //   }
  // }, [team.id])

  const [isInfo, setIsInfo] = useState(false);
  const [isFixtures, setIsFixtures] = useState(true);

  const getBody = () => {
    if (isFixtures) {
      return <Fixtures fixtures={fixtures} />;
    }

    return <TeamInfo team={team} venue={venue} />;
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case TABS.FIXTURES:
        setIsInfo(false);
        setIsFixtures(true);
        break;

      default:
        setIsFixtures(false);
        setIsInfo(true);
        break;
    }
  };

  return (
    <div>
      <Title>
        <TeamLogo src={team.logo} alt={`team-logo${team.name}`} />
        <TeamName>{team.name}</TeamName>
      </Title>
      <Tabs>
        <Tab onClick={() => handleTabChange(TABS.INFO)}>Info</Tab>
        <Tab onClick={() => handleTabChange(TABS.FIXTURES)}>Fixtures</Tab>
        <Tab>Results</Tab>
      </Tabs>
      <hr />
      {getBody()}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.teamId;

  let team = teams[0].team;
  let venue = teams[0].venue;
  let fixtures: FixtureResponse[] = mockFixtures;

  // if (id && typeof id === 'string') {
  //   fixtures = await getFixturesByTeamId(id);
  //   console.log({ fixtures });
  // }

  // if (id && typeof id == 'string'){
  //   const teams = await getTeamById(id)
  //   if (teams.length > 0) {
  //     team = teams[0].team;
  //     venue = teams[0].venue;
  //   }
  // }

  return {
    props: { team, venue, fixtures }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { teamId: '541' } }],
    fallback: true,
  };
};

const Title = styled.div`
  display: flex;
  gap: 2em;
  align-items: center;
  margin: 2em;
`;

const TeamName = styled.div`
  display: flex;
  font-weight: 700;
  flex-direction: column;
  font-size: 2em;
`;

const Tabs = styled.div`
  display: flex;
  font-weight: 700;
  justify-content: flex-start;
  gap: 1em;
  margin: 0 1em;
`;

const Tab = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
    bottom: -10px;
    left: 0;
    background-color: ${({ theme }) => theme.secondary};
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

export default TeamPage;
