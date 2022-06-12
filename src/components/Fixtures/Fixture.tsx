import Image from 'next/image';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { FixtureResponse } from '../../types/Fixture';

type FixtureProps = {
  fixture: FixtureResponse;
};

export default function Fixture({ fixture }: FixtureProps): ReactElement {
  return (
    <Box>
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
      <div>{fixture.fixture?.status?.short}</div>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  margin: 1em 0;
  width: 250px;
  // height: 100px;
  background: blue;
  color: white;
  cursor: pointer;
  :hover {
    border: solid 2px red;
  }
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
