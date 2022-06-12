import { Goals } from './Goals';
import { League } from './Leagues';
import { Score } from './Score';
import { Team, Venue } from './Teams';

type Periods = {
  first?: number | null;
  second?: number | null;
};

type Status = {
  elapsed?: number | null;
  long?: string | null;
  short?: string | null;
};

type FixtureTeams = {
  away?: Team & { winner: boolean };
  home?: Team & { winner: boolean };
};

type FixtureLeague = League & {
  country?: string;
  flag?: string | null;
  round?: string;
  season?: number;
};

export type Fixture = {
  date?: string;
  id: number;
  periods: Periods;
  referee?: string;
  status?: Status;
  timestamp?: number;
  timezone?: string;
  venue?: Venue;
};

export type FixtureResponse = {
  fixture?: Fixture;
  goals?: Goals;
  league?: FixtureLeague;
  score?: Score;
  teams?: FixtureTeams;
};
