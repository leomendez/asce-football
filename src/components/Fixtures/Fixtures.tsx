import React, { ReactElement } from 'react';
import { FixtureResponse } from '../../types/Fixture';
import Fixture from './Fixture';

type FixtureProps = {
  fixtures: FixtureResponse[];
};

export default function Fixtures({ fixtures }: FixtureProps): ReactElement {
  console.log({ fixtures });
  
  return (
    <div>
      <h3>Season schedule</h3>
      {fixtures.map((fixture) => {
        return <Fixture key={fixture.fixture?.id} fixture={fixture} />;
      })}
    </div>
  );
}
