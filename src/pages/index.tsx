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
      <Title>
        <Logo
          src={theme?.name === 'dark' ? '/white-logo.svg' : '/logo.svg'}
          alt="logo"
          width="300px"
          height="100px"
        />
        <h1>Football</h1>
        {/* <HeadingText>
                    Browse through the stats for all football{' '}
                    <Anchor href="/leagues">
                        <PageLink>
                            Leagues
                        </PageLink>
                    </Anchor>{' '}
                    in the world
                </HeadingText> */}
      </Title>
      <Content>
        Browse through the stats for all football{' '}
        <Anchor href="/leagues">
          <PageLink>Leagues</PageLink>
        </Anchor>{' '}
        in the world
      </Content>
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
  justify-content: center;
  text-align: center;
`;

const PageLink = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.secondary};
`;

const Logo = styled(Image)`
  transition: all 2s;
  &:hover {
    filter: invert(100%);
  }
`;

const Content = styled.div`
  font-size: 3em;
  text-align: center;
`;
