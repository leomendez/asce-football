import Image from 'next/image';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { Team, Venue } from '../../types';

type InfoItemProps = {
  label: string;
  value: string | number;
};

export default function InfoItem({
  label,
  value,
}: InfoItemProps): ReactElement {
  return (
    <Item>
      <Label>
        <b>{label}:</b>
      </Label>
      <span>{value}</span>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  gap: 1em;
`;

const Label = styled.span`
  width: 80px;
`;
