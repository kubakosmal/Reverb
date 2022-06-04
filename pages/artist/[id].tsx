import { Box } from '@chakra-ui/layout'
import GradientLayout from '../../components/gradientLayout'
import prisma from '../../lib/prisma'
import SongTable from '../../components/songsTable'
import PlaylistDropdown from '../../components/playlistDropdown'
import PlayButton from '../../components/playButton'

export default function Artist({ artist }) {
  return (
    <GradientLayout
      color="red"
      image={`https://picsum.photos/400?random=${artist.id}`}
      title={artist.name}
      subtitle="Artist"
      description={`${artist.songs.length} song${
        artist.songs.length > 1 ? 's' : ''
      }`}
      roundImage
    >
      <Box bg="transparent" color="white">
        <Box padding="10px" marginBottom="20px">
          <PlayButton songs={artist.songs} />
          <SongTable songs={artist.songs}></SongTable>
        </Box>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const [artist] = await prisma.artist.findMany({
    where: {
      id: +query.id,
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
    },
  })

  return {
    props: {
      artist: JSON.parse(JSON.stringify(artist)),
    },
  }
}
