import prisma from '../lib/prisma'
import GradientLayout from '../components/gradientLayout'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { useSession } from 'next-auth/react'
import Card from '../components/card'
import { HomeProps } from '../types/pages'
import { User } from '../types/data'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { UserSession } from '../types/data'

const Home = ({ artists, playlists }: HomeProps) => {
  const { data: session, status } = useSession()

  if (status != 'authenticated') {
    return null
  }

  const user = session.user as User

  return (
    <GradientLayout
      color="gray"
      title={user.name}
      subtitle="profile"
      description={
        playlists.length
          ? `${playlists.length} public playlist${
              playlists.length !== 1 ? 's' : null
            }`
          : ''
      }
      image={user.image}
      roundImage={true}
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="20px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="medium">only visible to you</Text>
        </Box>
        <Flex gap="20px" flexWrap="wrap">
          {artists.map((artist, i) =>
            i < 5 ? (
              <Card
                type="artist"
                subtext="Artist"
                key={artist.id}
                item={artist}
              />
            ) : null
          )}
        </Flex>
      </Box>

      {playlists.length ? (
        <Box marginY="60px" color="white" paddingX="40px">
          <Box marginBottom="20px">
            <Text fontSize="2xl" fontWeight="bold">
              Recent playlists
            </Text>
          </Box>
          <Flex gap="20px" flexWrap="wrap">
            {playlists.map((playlist) => (
              <Card
                type="playlist"
                subtext={`by ${user.name}`}
                key={playlist.id}
                item={playlist}
              />
            ))}
          </Flex>
        </Box>
      ) : null}
    </GradientLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const user = session.user as UserSession
  const artists = await prisma.artist.findMany({})
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
  })

  return {
    props: {
      artists: JSON.parse(JSON.stringify(artists)),
      playlists: JSON.parse(JSON.stringify(playlists)),
    },
  }
}

export default Home
