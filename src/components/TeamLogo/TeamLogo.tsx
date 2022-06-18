import Image from 'next/image';
import { ReactElement } from 'react';
import styled from 'styled-components';

type TeamLogoProps = {
  src: string;
  alt: string;
};

export default function TeamLogo({ src, alt }: TeamLogoProps): ReactElement {
  return (
    <Logo>
      <Image src={src} alt={alt} width={64} height={64} />
    </Logo>
  );
}

const Logo = styled.div`
  border: 1px solid ${({ theme }) => theme.font};
  border-radius: 50%;
  padding: 0.5em;
`;
