import prisma from '../lib/prisma'
import GradientLayout from '../components/gradientLayout'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { useMe } from '../lib/hooks'

const Home = ({ artists }) => {
  const { user, isLoading } = useMe()

  if (isLoading) {
    return null
  }

  return (
    <GradientLayout
      color="purple"
      title={`${user.firstName} ${user.lastName}`}
      subtitle="profile"
      description={`${user.playlistCount} public playlists`}
      image="https://i.pinimg.com/originals/db/b9/cf/dbb9cf20a1f2507a84cb5ebf59b0eab1.png"
      roundImage={true}
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="medium">only visible to you</Text>
        </Box>
        <Flex gap="30px" flexWrap="wrap">
          {artists.map((artist) => (
            <Box width="150px" key={artist.id}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="sm">Artist</Text>
                </Box>
              </Box>
            </Box>
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
