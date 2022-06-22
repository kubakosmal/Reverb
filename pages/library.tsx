import { Box, Text, Flex } from '@chakra-ui/layout'
import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'
import { User, Playlist } from '../types/data'
import UserDropdown from '../components/userDropdown'
import { useSession } from 'next-auth/react'
import LoadingScreen from '../components/loadingScreen'
import Card from '../components/card'

export default function Library({ playlists }: { playlists: Playlist[] }) {
  const { data: session } = useSession()

  if (!session) {
    return <LoadingScreen />
  }

  return (
    <Box height="100%">
      <UserDropdown />
      <Box bgColor="gray.900" padding="20px" width="100%" height="80px">
        <Text fontWeight="medium" fontSize="3xl" color="white">
          Library
        </Text>
      </Box>
      <Box
        padding="20px"
        color="white"
        height="calc(100% - 80px)"
        bgGradient="linear(to-br, gray.800, blackAlpha.900)"
      >
        <Text fontWeight="semibold" fontSize="xl">
          Playlists
        </Text>

        <Box display="flex" flexWrap="wrap">
          {playlists.length < 1 ? (
            <Text>You haven't created a single playlist yet</Text>
          ) : (
            <>
              <Flex marginY="15px" flexWrap="wrap" gap="20px">
                {playlists.map((playlist) => (
                  <Card
                    key={playlist.id}
                    type="playlist"
                    subtext=""
                    item={playlist}
                  />
                ))}
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const user = session?.user as User
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
  })

  return {
    props: {
      playlists: JSON.parse(JSON.stringify(playlists)),
    },
  }
}
