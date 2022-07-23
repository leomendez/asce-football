import moment from 'moment-timezone';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getTransfersByTeamId } from '../../api/transfers';
import { Transfer, TransfersResponse } from '../../types';
import { transfers as mockTransfers } from '../../__mocks__/data/transfers';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

type Props = {
  teamId: number;
};

export default function Transfers({ teamId }: Props) {
  const { data, isLoading, isError } = useQuery(['transfers'], () => getTransfersByTeamId(teamId));
  // const { data, isLoading, isError } = useQuery(['transfers'], () => mockTransfers);

  let transfers: TransfersResponse[] = [];

  if (data) {
    const sortedTransfers = data.sort(
      (a, b) => new Date(b.transfers[0].date).valueOf() - new Date(a.transfers[0].date).valueOf()
    );

    transfers = sortedTransfers.slice(0, 10);
    console.log({ transfers });
  }

  if (isError) return <div>Something went wrong</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <TransfersContainer>
      {transfers.map((transfer, index) => {
        const lastTransfer = transfer.transfers[0];
        const player = transfer.player;
        const date = moment(lastTransfer.date).tz('America/Los_Angeles').format('mm/DD/yyyy z');
        return (
          <Box key={`transfer-${index}`}>
            <Status>
              <div><b>DONE DEAL</b></div>
              <div>{date}</div>
            </Status>
            <Details>
              <Team>
                <Image src={lastTransfer.teams.out.logo || ''} width="35px" height="35px" alt="home-logo" />
                <span>{lastTransfer.teams.out.name}</span>
              </Team>
              <Player><span>{player.name}</span><FaArrowRight /></Player>
              <Team>
                <Image src={lastTransfer.teams.in.logo || ''} width="35px" height="35px" alt="home-logo" />
                <span>{lastTransfer.teams.in.name}</span>
              </Team>
            </Details>

            <Fee>{lastTransfer.type}</Fee>
          </Box>
        );
      })}
    </TransfersContainer>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  margin: 1em 1em 1em 0;
  gap: 1em;
  background: ${({ theme }) => theme.background};
  cursor: pointer;
  border-radius: 5px;
  transition: 200ms all;
  box-shadow: ${({ theme }) => theme.primary + '80'} 0px 5px 15px;
  max-width: 400px;
  :hover {
    transform: scale(1.05);
  }
  @media screen and (max-width: 670px) {
    margin: 1em 0;
  }
`;

const Status = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
  padding: 1em;
  border-top: 2px solid ${({ theme }) => theme.aux};
  border-bottom: 2px solid ${({ theme }) => theme.aux};
`;

const Fee = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
`;

const TransfersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1em;
`;

const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 600;
  gap: 0.5em;
`;
