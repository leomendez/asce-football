import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

type NavbarProps = {};

export default function Navbar({}: NavbarProps) {
  return (
    <Main>
      <Link href="/">
        <Title>ASCE FOOTBALL</Title>
      </Link>
      <Links>
        <Link href="/">
          <HeaderLink>Home</HeaderLink>
        </Link>
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
`;

const HeaderLink = styled.a`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em;
`;
