import { Player } from './Player';
import { Team } from './Teams';

export type Transfer = {
  date: string;
  teams: {
    in: Team;
    out: Team;
  };
  type: string;
}

export type TransfersResponse = {
  transfers: Transfer[];
  player: Player;
  update: string;
}