import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { getTeamById } from "../../api/teams";
import TeamInfo from "../../components/TeamInfo/TeamInfo";
import TeamLogo from "../../components/TeamLogo";
import { Team, Venue } from "../../types";
import { teams } from "../../__mocks__/data/teams";

type TeamProps = {
  team: Team
  venue: Venue
}

const TeamPage = ({ team, venue }: TeamProps) => {

  console.log({team, venue})
  return (
    <div>
      <Title>
        <TeamLogo
          src={team.logo}
          alt={`team-logo${team.name}`}
        />
        <TeamName>{team.name}</TeamName>    
      </Title>
      <Tabs>
        <Tab>Info</Tab>
        <Tab>Fixtures</Tab>
        <Tab>Results</Tab>
      </Tabs>
      <hr />
      <TeamInfo team={team} venue={venue} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const id = context?.params?.teamId;

  let team = teams[0].team
  let venue = teams[0].venue;

  // if (id && typeof id == 'string'){
  //   const teams = await getTeamById(id)
  //   if (teams.length > 0) {
  //     team = teams[0].team;
  //     venue = teams[0].venue;
  //   }
  // }
   
  return {
    props: { team, venue }, // will be passed to the page component as props
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { teamId: '541' }} ],
    fallback: true
  }
}

const Title = styled.div`
  display: flex;
  gap: 2em;
  align-items: center;
  margin: 2em;
`

const TeamName = styled.div`
  display: flex;
  font-weight: 700;
  flex-direction: column;
  font-size: 2em;
`

const Tabs = styled.div`
  display: flex;
  font-weight: 700;
  justify-content: flex-start;
  gap: 1em;
`

const Tab = styled.div`
  cursor: pointer;
`

export default TeamPage