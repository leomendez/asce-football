import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { Switch } from '../';

type NavbarProps = {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
};

export default function Navbar({
  darkMode,
  toggleDarkMode,
}: NavbarProps): ReactElement {
  return (
    <Main>
      <Link href="/">
        <Title>ASCE FOOTBALL</Title>
      </Link>
      <Links>
        <Link href="/">
          <StyledLink>Home</StyledLink>
        </Link>
        <Switch
          name="theme-switch"
          checked={darkMode || false}
          onChange={toggleDarkMode}
        />
      </Links>
    </Main>
  );
}

const Title = styled.a`
  font-weight: 900;
  font-size: 1.2em;
  cursor: pointer;
`;

const Links = styled.div`
  font-weight: 700;
  display: flex;
  gap: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none;
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

// const HeaderLink = styled.a`
//   text-decoration: none;
//   cursor: pointer;
// `;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em;
`;
