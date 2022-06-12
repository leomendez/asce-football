import Image from 'next/image';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { Team, Venue } from '../../types';
import InfoItem from './InfoItem';

type TeamInfoProps = {
  team: Team;
  venue: Venue;
};

export default function TeamInfo({ team, venue }: TeamInfoProps): ReactElement {
  return (
    <Main>
      <h3>Info</h3>
      <InfoItem label="Country" value={team.country || ''} />
      <InfoItem label="Founded" value={team.founded || ''} />
      <h3>Venue</h3>
      <InfoItem label="Name" value={venue.name || ''} />
      <InfoItem label="Address" value={venue.address || ''} />
      <InfoItem label="City" value={venue.city || ''} />
      <InfoItem label="Capacity" value={venue.capacity || ''} />
    </Main>
  );
}

const Main = styled.div`
  margin: 1em;
`;

const Item = styled.div`
  display: flex;
  gap: 1em;
`;
