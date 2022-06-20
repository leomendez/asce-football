import moment from 'moment-timezone';
import React, { ReactElement, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { FixtureResponse } from '../../types/Fixture';
import Fixture from './Fixture';

type FixtureProps = {
  fixtures: FixtureResponse[];
};

export default function Fixtures({ fixtures }: FixtureProps): ReactElement {
  const getMonth = (fixture: FixtureResponse) => {
    return moment(fixture.fixture?.date).format('MMMM YYYY');
  };

  const getMonths = useMemo(
    () => () => {
      const months: string[] = [];
      fixtures.forEach((fixture) => {
        if (months.indexOf(getMonth(fixture)) < 0) {
          months.push(getMonth(fixture));
        }
      });
      return months;
    },
    [fixtures]
  );

  const getFixtureForMonth = (month: string) => {
    return fixtures.filter((fixture) => month === getMonth(fixture));
  };

  const getFixtures = () => {
    return getMonths().map((month, index) => (
      <MonthSection key={`${month}-${index}`}>
        <div>{month}</div>
        <FixturesInMonth>
          {getFixtureForMonth(month).map((fixture) => (
              <Fixture key={fixture.fixture?.id} fixture={fixture} />
          ))}
        </FixturesInMonth>
      </MonthSection>
    ));
  };

  return (
    <Main>
      <h3>Season schedule</h3>
      <FixtureWrapper>{getFixtures()}</FixtureWrapper>
    </Main>
  );
}

const FixtureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 670px) {
    flex-direction: column;
  }
`;

const MonthSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FixturesInMonth = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Main = styled.div`
  margin: 1em;
`;
