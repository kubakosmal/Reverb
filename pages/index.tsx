import prisma from '../lib/prisma'
import GradientLayout from '../components/gradientLayout'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { useSession } from 'next-auth/react'
import ArtistCard from '../components/artistCard'
import { HomeProps } from '../types/pages'
import { User } from '../types/data'

const Home = ({ artists }: HomeProps) => {
  console.log('SIEMA ')

  const { data: session, status } = useSession()

  if (status != 'authenticated') {
    return null
  }

  const user = session.user as User

  console.log(user)

  return (
    <GradientLayout
      color="cyan"
      title={user.name}
      subtitle="profile"
      description={`10 public playlists`}
      image={user.image}
      roundImage={true}
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="medium">only visible to you</Text>
        </Box>
        <Flex gap="20px" flexWrap="wrap">
          {artists.map((artist) => (
            <ArtistCard artist={artist} />
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  let artists = await prisma.artist.findMany({})
  return {
    props: { artists: JSON.parse(JSON.stringify(artists)) },
  }
}

export default Home
