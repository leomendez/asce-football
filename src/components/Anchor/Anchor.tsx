import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';

type AnchorProps = {
  children?: ReactNode;
  href: string;
};

export default function Anchor({ children, href }: AnchorProps) {
  return (
    <Link href={href}>
      <StyledLink>{children}</StyledLink>
    </Link>
  );
}

const StyledLink = styled.a`
  cursor: pointer;
  display: inline-block;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
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
