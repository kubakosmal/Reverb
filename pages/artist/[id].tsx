import { Box } from '@chakra-ui/layout'
import GradientLayout from '../../components/gradientLayout'
import prisma from '../../lib/prisma'
import SongTable from '../../components/songsTable'
import PlayButton from '../../components/playButton'
import { Artist } from '../../types/data'
import { GetServerSideProps } from 'next'

export default function ArtistPage({ artist }: { artist: Artist }) {
  return (
    <GradientLayout
      color="red"
      image={artist.image}
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query
  const [artist] = await prisma.artist.findMany({
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
    },
  })

  return {
    props: {
      artist: JSON.parse(JSON.stringify(artist)),
    },
  }
}
