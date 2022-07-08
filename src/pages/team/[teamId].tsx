import { GetServerSideProps } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import {
  getLastFixturesByTeamId,
  getNextFixturesByTeamId
} from '../../api/fixtures';
import { getTeamById } from '../../api/teams';
import Fixtures from '../../components/Fixtures/Fixtures';
import { TeamInfo, TeamLogo } from '../../components/index';
import { Team, Venue } from '../../types';
import { FixtureResponse } from '../../types/Fixture';
import { underline } from '../../utils/animations';
import { fixtures as mockFixtures } from '../../__mocks__/data/fixtures';
import { teams } from '../../__mocks__/data/teams';

type TeamProps = {
  team: Team;
  venue: Venue;
  fixtures: FixtureResponse[];
  results: FixtureResponse[];
};

const TABS = {
  INFO: 'info',
  FIXTURES: 'fixtures',
  RESULTS: 'results',
};

const TeamPage = ({ team, venue, fixtures, results }: TeamProps) => {
  const [activeTab, setActiveTab] = useState(TABS.INFO);

  const getBody = () => {
    switch (activeTab) {
      case TABS.FIXTURES:
        return <Fixtures fixtures={fixtures} />;
      case TABS.RESULTS:
        return <Fixtures fixtures={results} />;
      case TABS.INFO:
      default:
        return <TeamInfo team={team} venue={venue} />;
    }
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case TABS.FIXTURES:
        setActiveTab(TABS.FIXTURES);
        break;
      case TABS.RESULTS:
        setActiveTab(TABS.RESULTS);
        break;
      case TABS.INFO:
      default:
        setActiveTab(TABS.INFO);
        break;
    }
  };

  return (
    <TeamContainer>
      <Title>
        <TeamLogo src={team.logo} alt={`team-logo${team.name}`} />
        <TeamName>{team.name}</TeamName>
      </Title>
      <Tabs>
        <Tab
          onClick={() => handleTabChange(TABS.INFO)}
          active={activeTab === TABS.INFO}
        >
          Info
        </Tab>
        <Tab
          onClick={() => handleTabChange(TABS.FIXTURES)}
          active={activeTab === TABS.FIXTURES}
        >
          Fixtures
        </Tab>
        <Tab
          onClick={() => handleTabChange(TABS.RESULTS)}
          active={activeTab === TABS.RESULTS}
        >
          Results
        </Tab>
      </Tabs>
      <hr />
      {getBody()}
    </TeamContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.teamId;

  let team = teams[0].team;
  let venue = teams[0].venue;
  let fixtures = mockFixtures;
  let results = mockFixtures;

  if (id && typeof id === 'string') {
    fixtures = await getNextFixturesByTeamId(id);
    results = await getLastFixturesByTeamId(id);
    const teams = await getTeamById(id);
    if (teams.length > 0) {
      team = teams[0].team;
      venue = teams[0].venue;
    }
  }

  return {
    props: { team, venue, fixtures, results }, // will be passed to the page component as props
  };
};

type StyleProps = {
  active: boolean;
};

const TeamContainer = styled.div`
  margin: 2em;
`

const Title = styled.div`
  display: flex;
  gap: 2em;
  align-items: center;
  margin: 2em 1em;
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

const Tab = styled.div<StyleProps>`
  cursor: pointer;
  ${({ active, theme }) =>
    active && `border-bottom: solid 3px ${theme.secondary};`}
  ${({ active, theme }) => !active && underline(theme, '0')}
`;

export default TeamPage;
