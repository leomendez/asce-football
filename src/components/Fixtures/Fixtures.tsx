import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { FixtureResponse } from '../../types/Fixture';
import Fixture from './Fixture';

type FixtureProps = {
  fixtures: FixtureResponse[];
};

export default function Fixtures({ fixtures }: FixtureProps): ReactElement {
  console.log({ fixtures });

  return (
    <Main>
      <h3>Season schedule</h3>
      <FixtureWrapper>
        {fixtures.map((fixture) => {
          return <Fixture key={fixture.fixture?.id} fixture={fixture} />;
        })}
      </FixtureWrapper>
    </Main>
  );
}

const FixtureWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Main = styled.main`
  margin: 1em;
`;
