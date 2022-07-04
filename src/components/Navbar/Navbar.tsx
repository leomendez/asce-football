import Image from 'next/image';
import { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Anchor, Switch } from '../';

type NavbarProps = {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
};

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps): ReactElement {
  const Icon = useMemo(() => (darkMode ? <MdDarkMode /> : <MdLightMode />), [darkMode]);

  return (
    <Main>
      <Anchor href="/">
        <Logo src="/icon.png" alt="icon" width="20px" height="20px" />
        <Title>ASCE FOOTBALL</Title>
      </Anchor>
      <RightSection>
        <Links>
          <Anchor href="/leagues">Leagues</Anchor>
          <Anchor href="/">Home</Anchor>
        </Links>
        <Switch name="theme-switch" checked={darkMode || false} onChange={toggleDarkMode} icon={Icon} />
      </RightSection>
    </Main>
  );
}

const Title = styled.span`
  font-weight: 900;
  font-size: 1.2em;
  cursor: pointer;
  padding-left: 0.5em;
`;

const Links = styled.div`
  font-weight: 700;
  display: flex;
  gap: 20px;
  padding-right: 20px;
  border-right: 2px solid ${({ theme }) => theme.secondary};
`;

const RightSection = styled.div`
  display: flex;
  gap: 20px;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.background};
  z-index: 1; // added to keep on top of content when scrolling
`;

const Logo = styled(Image)`
  ${({ theme }) => theme.name === 'dark' && 'filter: invert(100%)'};
`;
