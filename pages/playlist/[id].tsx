import GradientLayout from '../../components/gradientLayout'
import { Flex } from '@chakra-ui/layout'
import SongTable from '../../components/songsTable'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'
import PlayListDropdown from '../../components/playlistDropdown'
import { Box } from '@chakra-ui/layout'
import PlayButton from '../../components/playButton'

const getBGColor = (id) => {
  const colors = ['red', 'blue', 'orange', 'purple', 'gray', 'teal', 'yellow']
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist, session }) => {
  console.log(playlist)
  if (!playlist) {
    return 'loading'
  }

  const color = getBGColor(playlist.id)

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.user.name} ${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <Box bg="transparent" color="white">
        <Box padding="10px" marginBottom="20px">
          <Flex>
            <PlayButton songs={playlist.songs} />
            <PlayListDropdown playlist={playlist} songs={playlist.songs} />
          </Flex>
          <SongTable songs={playlist.songs}></SongTable>
        </Box>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async (context) => {
  const query = context.query
  const session = await getSession(context)
  const user = session.user

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  })
  return {
    props: JSON.parse(JSON.stringify({ playlist })),
  }
}

export default Playlist
