import { PrismaClient } from '@prisma/client'
import { artistsData } from './songsData'

const prisma = new PrismaClient()

const playlistsNames = ['First playlist', 'Second playlist', 'Third playlist']

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          image: `https://picsum.photos/seed/${Math.random() * 100}/400`,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      })
    })
  )

  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      name: 'Jakub',
    },
  })

  /* const songs = await prisma.song.findMany({})
  await Promise.all(
    new Array(3).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: playlistsNames[i],
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
          image: `https://picsum.photos/seed/${Math.random() * 100}/400`,
        },
      })
    })
  ) */
}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
