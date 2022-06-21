import type { NextPage } from 'next';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Anchor } from '../components';

type HomeProps = {
  theme: DefaultTheme;
};

const Home: NextPage<HomeProps> = ({ theme }) => {
  const [{ width, height }, setLogoDimensions] = useState({
    width: '300px',
    height: '100px',
  });

  const handleMouseEnter = () => {
    setLogoDimensions({
      width: '400px',
      height: '200px',
    });
  };

  const handleMouseLeave = () => {
    setLogoDimensions({
      width: '300px',
      height: '100px',
    });
  };

  return (
    <Page>
      <Title>
        <Logo
          src={theme?.name === 'dark' ? '/white-logo.svg' : '/logo.svg'}
          alt="logo"
          width={width}
          height={height}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <h1>Welcome to Asce Football</h1>
      </Title>
      <Anchor href="/leagues">
        <PageLinks>Leagues</PageLinks>
      </Anchor>
    </Page>
  );
};

export default Home;

const Page = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 90vh;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const PageLinks = styled.span`
  font-weight: 600;
  font-size: 1.5em;
`;

const Logo = styled(Image)`
  transition: all 2s;
  &:hover {
    filter: invert(100%);
  }
`;
