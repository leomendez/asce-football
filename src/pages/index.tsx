import type { NextPage } from 'next';
import styled from 'styled-components';
import { Anchor } from '../components';


const Home: NextPage = () => {
  return (
    <Page>
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
