import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { underline } from '../../utils/animations';

type AnchorProps = {
  children?: ReactNode;
  fullWidth?: boolean;
  href: string;
};

export default function Anchor({ children, href, fullWidth = true }: AnchorProps) {
  return (
    <Link href={href}>
      <StyledLink href={href} fullWidth={fullWidth}>{children}</StyledLink>
    </Link>
  );
}

type StyleProps = {
  fullWidth: boolean;
}

const StyledLink = styled.a<StyleProps>`
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${({theme}) => underline(theme)}
`;
