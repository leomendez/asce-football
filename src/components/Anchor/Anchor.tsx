import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';

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
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-decoration: none;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  color: ${({theme}) => theme.fontColor};
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 4px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.secondary};
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
