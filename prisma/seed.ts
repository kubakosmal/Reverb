import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
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

  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
      firstName: 'Jakub',
      lastName: 'Kosmal',
    },
  })

  const songs = await prisma.song.findMany({})
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
