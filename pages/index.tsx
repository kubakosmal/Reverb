import prisma from '../lib/prisma'
import GradientLayout from '../components/gradientLayout'
import { Box, Flex, Text, LinkBox } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home = ({ artists }) => {
  const { data: session, status } = useSession()
  const chujwieco = useSession()

  if (status != 'authenticated') {
    return null
  }

  const user = session.user

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
        <Flex gap="30px" flexWrap="wrap">
          {artists.map((artist) => (
            <LinkBox key={artist.id}>
              <NextLink href={`/artist/${artist.id}`}>
                <Box width="150px" cursor="pointer" key={artist.id}>
                  <Box
                    bg="gray.900"
                    borderRadius="4px"
                    padding="15px"
                    width="100%"
                  >
                    <Image
                      src={`https://picsum.photos/400?random=${artist.id}`}
                      borderRadius="100%"
                    />
                    <Box marginTop="20px">
                      <Text fontSize="large">{artist.name}</Text>
                      <Text fontSize="sm">Artist</Text>
                    </Box>
                  </Box>
                </Box>
              </NextLink>
            </LinkBox>
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
