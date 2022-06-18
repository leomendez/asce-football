import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { Switch } from '../';

type NavbarProps = {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
};

export default function Navbar({darkMode, toggleDarkMode}: NavbarProps): ReactElement {
  return (
    <Main>
      <Link href="/">
        <Title>ASCE FOOTBALL</Title>
      </Link>
      <Links>
        <Link href="/">
          <HeaderLink>Home</HeaderLink>
        </Link>
        <Switch name="theme-switch" checked={darkMode || false} onChange={toggleDarkMode} />
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

const HeaderLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em;
`;
