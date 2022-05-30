import { Box } from '@chakra-ui/layout'
import GradientLayout from '../../components/gradientLayout'
import prisma from '../../lib/prisma'
import SongTable from '../../components/songsTable'

export default function Artist({ artist }) {
  return (
    <GradientLayout
      color="red"
      image={`https://picsum.photos/400?random=${artist.id}`}
      title={artist.name}
      subtitle="Artist"
      description=""
      roundImage
    >
      <SongTable songs={artist.songs}></SongTable>
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

  console.log(artist)

  return {
    props: {
      artist: JSON.parse(JSON.stringify(artist)),
    },
  }
}
