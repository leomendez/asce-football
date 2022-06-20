import Image from 'next/image';
import { ReactElement } from 'react';
import styled from 'styled-components';

type TeamLogoProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
};

export default function TeamLogo({
  src,
  alt,
  width,
  height,
}: TeamLogoProps): ReactElement {
  return (
    <Logo>
      <Image src={src} alt={alt} width={width || 64} height={height || 64} />
    </Logo>
  );
}

const Logo = styled.div`
  border: 1px solid ${({ theme }) => theme.fontColor};
  border-radius: 50%;
  padding: 0.5em;
`;
