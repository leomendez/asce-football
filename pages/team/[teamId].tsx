import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

type TeamProps = {
  team: { name: string, id: number }
}

const Post = ({ team }: TeamProps) => {
  return (
    <div>
      <h2>Hi {team.name} with id {team.id}</h2>
      <Link href="/">
        <a>Back Home</a>
      </Link>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const id = context?.params?.teamId;

  const team = { name: 'Real Madrid', id: id }

  return {
    props: { team }, // will be passed to the page component as props
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { teamId: '541' }} ],
    fallback: true
  }
}

export default Post