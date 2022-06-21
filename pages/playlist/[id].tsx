import GradientLayout from '../../components/gradientLayout'
import { Flex } from '@chakra-ui/layout'
import SongTable from '../../components/songsTable'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'
import PlayListDropdown from '../../components/playlistDropdown'
import { Box } from '@chakra-ui/layout'
import PlayButton from '../../components/playButton'
import { PlaylistProps } from '../../types/pages'
import { GetServerSideProps } from 'next'
import { User } from '../../types/data'

const getBGColor = (id: number) => {
  const colors = ['red', 'blue', 'orange', 'purple', 'gray', 'teal', 'yellow']
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }: PlaylistProps) => {
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
      image={playlist.image}
    >
      <Box bg="transparent" color="white">
        <Box padding="10px" marginBottom="20px">
          <Flex>
            <PlayButton songs={playlist.songs} />
            <PlayListDropdown playlist={playlist} />
          </Flex>
          <SongTable songs={playlist.songs}></SongTable>
        </Box>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: Number(id),
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
