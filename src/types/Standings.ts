import { Goals } from './Goals';
import { League } from './Leagues';
import { Team } from './Teams';

type StandingGoals = {
  for: number;
  against: number;
};

export type Matches = {
  draw: number;
  goals: StandingGoals;
  lose: number;
  played: number;
  win: number;
};

export type Standing = {
  all: Matches;
  away: Matches;
  home: Matches;
  description: string;
  form: string;
  goalsDiff: 51;
  group: string;
  points: number;
  rank: number;
  status: string;
  team: Team;
};

export type StandingsResponse = {
  league: League & {
    standings: (Standing[])[]
  };
};
