import type { NextPage } from 'next';
import Image from 'next/image';
import styled, { DefaultTheme } from 'styled-components';
import { Anchor } from '../components';

type HomeProps = {
  theme: DefaultTheme;
};

const Home: NextPage<HomeProps> = ({ theme }) => {
  return (
    <Page>
      <Image
        src={theme?.name === 'dark' ? '/white-logo.svg' : '/logo.svg'}
        alt="logo"
        width="120px"
        height="40px"
      />
      <h2>Welcome to Asce Football</h2>
      <Anchor href="/leagues">
        <b>Leagues</b>
      </Anchor>
    </Page>
  );
};

export default Home;

const Page = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
