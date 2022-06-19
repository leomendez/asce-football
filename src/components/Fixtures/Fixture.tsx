import Image from 'next/image';
import React, { ReactElement, useMemo } from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { FixtureResponse } from '../../types/Fixture';

type FixtureProps = {
  fixture: FixtureResponse;
};

export default function Fixture({ fixture }: FixtureProps): ReactElement {
  const getTimeText = useMemo(
    () => () => {
      switch (fixture.fixture?.status?.short) {
        case 'FT':
          return 'Full Time';
        default:
          return moment(fixture.fixture?.timestamp)
            .tz('America/Los_Angeles')
            .format('hh:mm z');
      }
    },
    [fixture.fixture?.status?.short, fixture.fixture?.timestamp]
  );

  return (
    <Box>
      <TopSection>
        <Teams>
          <Team>
            <Logo>
              <Image
                src={fixture.teams?.home?.logo || ''}
                width="18px"
                height="18px"
                alt="home-logo"
              />
            </Logo>
            <TeamName>{fixture.teams?.home?.name}</TeamName>
            <Score>{fixture.score?.fulltime?.home}</Score>
          </Team>
          <Team>
            <Logo>
              <Image
                src={fixture.teams?.away?.logo || ''}
                width="18px"
                height="18px"
                alt="home-logo"
              />
            </Logo>
            <TeamName>{fixture.teams?.away?.name}</TeamName>
            <Score>{fixture.score?.fulltime?.away}</Score>
          </Team>
        </Teams>
        <TimeSection>
          <div>
            {moment(fixture.fixture?.date)
              .tz('America/Los_Angeles')
              .format('DD/MM/YYYY')}
          </div>
          <div>{getTimeText()}</div>
        </TimeSection>
      </TopSection>
      <BottomSection>{fixture.league?.name}</BottomSection>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 1em 1em 0;
  background: ${({ theme }) => theme.primary};
  cursor: pointer;
  border-radius: 5px;
  transition: 200ms all;
  :hover {
    border: solid 3px ${({ theme }) => theme.fontColor};
    transition: 200ms all;
  }
  @media screen and (max-width: 600px) {
    margin: 1em 0;
  }
`;

const TopSection = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.fontColor};
`;

const BottomSection = styled.div`
  padding: 1em;
  font-size: 0.8em;
  font-weight: 600;
`;

const Teams = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 800;
  font-size: 0.8em;
  padding: 1em;
`;

const Logo = styled.span`
  padding-right: 1em;
`;

const Team = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3em 0;
`;

const TeamName = styled.span`
  width: 100px;
`;

const Score = styled.span`
  display: flex;
  justify-content: flex-end;
`;

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 2px solid ${({ theme }) => theme.fontColor};
  margin: 0.5em 0;
  padding: 0 1em;
  font-size: .8em;
  font-weight: 600;
  width: 100%:
`;
