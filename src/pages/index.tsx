import type { NextPage } from "next";
import Image from "next/image";
import { useRef, useState } from "react";
import styled, { DefaultTheme } from "styled-components";
import { Anchor } from "../components";

type HomeProps = {
  theme: DefaultTheme;
};

const INITIAL_DIMENSIONS = {
  width: "300px",
  height: "100px",
};

const Home: NextPage<HomeProps> = ({ theme }) => {
  const [{ width, height }, setLogoDimensions] = useState(INITIAL_DIMENSIONS);

  const handleMouseEnter = () => {
    setLogoDimensions({
      width: "350px",
      height: "200px",
    });
  };

  const handleMouseLeave = () => {
    setLogoDimensions(INITIAL_DIMENSIONS);
  };

  return (
    <Page>
      <Title>
        <Logo
          src={theme?.name === "dark" ? "/white-logo.svg" : "/logo.svg"}
          alt="logo"
          width={width}
          height={height}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <h1>Welcome to Asce Football</h1>
      </Title>
      <Content>
        Start by exploring the
        <Anchor href="/leagues">
          <PageLinks>Leagues</PageLinks>
        </Anchor>
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

const PageLinks = styled.span`
  font-weight: 600;
`;

const Logo = styled(Image)`
  transition: all 2s;
  &:hover {
    filter: invert(100%);
  }
`;

const Content = styled.div`
  font-size: 1.2em;
  display: flex;
  gap: 4px;
  align-items: center;
`;
