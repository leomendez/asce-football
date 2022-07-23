import React from 'react';
import { useQuery } from 'react-query';
import { getTransfersByTeamId } from '../../api/transfers';
import { Transfer, TransfersResponse } from '../../types';

type Props = {
  teamId: number;
};

export default function Transfers({ teamId }: Props) {
  const { data, isLoading, isError } = useQuery(['transfers'], () => getTransfersByTeamId(teamId));

  let transfers: TransfersResponse[] = [];

  if (data) {
    const sortedTransfers = data.sort((a, b) => new Date(b.transfers[0].date).valueOf() - new Date(a.transfers[0].date).valueOf());

    transfers = sortedTransfers.slice(0, 10);
    console.log({ sortedTransfers });
  }

  if (isError) return <div>Something went wrong</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {transfers.map((transfer, index) => {
        const lastTransfer = transfer.transfers[0];
        const player = transfer.player;
        return (
          <div key={`transfer-${index}`}>
            <div>{player.name}</div>
            <div>{lastTransfer.teams.in.name}</div>
            <div>{lastTransfer.teams.out.name}</div>
            <div>{lastTransfer.type}</div>
            <div>{lastTransfer.date}</div>
          </div>
        );
      })}
    </div>
  );
}
