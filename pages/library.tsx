import { Box, Text, LinkBox } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'
import { User, Playlist } from '../types/data'
import UserDropdown from '../components/userDropdown'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'

export default function Library({ playlists }: { playlists: Playlist[] }) {
  const { data: session } = useSession()
  const user = session.user
  return (
    <Box height="100%">
      <UserDropdown />
      <Box bgColor="gray.900" width="100%" height="80px"></Box>
      <Box
        padding="20px"
        color="white"
        height="calc(100% - 80px)"
        bgColor="gray.800"
      >
        <Text fontWeight="semibold" fontSize="2xl">
          Playlists
        </Text>

        <Box marginY="20px" display="flex" flexWrap="wrap">
          {playlists.length < 1 ? (
            <Text>You haven't created a playlist yet</Text>
          ) : (
            <>
              {playlists.map((playlist) => (
                <NextLink href={`/playlist/${playlist.id}`}>
                  <LinkBox
                    width="175px"
                    padding="15px"
                    bgColor="gray.900"
                    borderRadius="10px"
                    transition="all"
                    transitionDuration="0.5s"
                    cursor="pointer"
                    sx={{
                      '&:hover': {
                        bgColor: 'black',
                      },
                    }}
                  >
                    <Image borderRadius="3px" src={playlist.image} />
                    <Box marginTop="10px">
                      <Text>{playlist.name}</Text>
                      <Text color="gray.500">By {user.name}</Text>
                    </Box>
                  </LinkBox>
                </NextLink>
              ))}
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
