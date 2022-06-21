import { PrismaClient } from '@prisma/client'
import { artistsData } from './songsData'

const prisma = new PrismaClient()
const guestPlaylistsNames = ['Go Vote', 'The best of ice cream truck', 'Gym']

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
              image: `https://picsum.photos/seed/${Math.random() * 100}/400`,
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

  const songs = await prisma.song.findMany({})
  const fewSongs = songs.slice(0, 10)
  await Promise.all(
    new Array(3).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: guestPlaylistsNames[i],
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: fewSongs.map((song) => ({
              id: song.id,
            })),
          },
          image: `https://picsum.photos/seed/${Math.random() * 100}/400`,
        },
      })
    })
  )
}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
