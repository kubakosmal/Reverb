import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { Song } from '../../types/data'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let playlists = new Array()

  playlists[0] = await prisma.playlist.findFirst({
    where: {
      name: 'Gym',
    },
    include: {
      songs: true,
    },
  })
  playlists[1] = await prisma.playlist.findFirst({
    where: {
      name: 'Go Vote',
    },
  })
  playlists[2] = await prisma.playlist.findFirst({
    where: {
      name: 'The best of ice cream truck',
    },
  })

  const user = await prisma.user.create({
    data: {
      name: 'Joe Biden',
      image:
        'https://s.abcnews.com/images/Politics/biden-file-gty-ml-201106_1604680381500_hpMain_16x9_1600.jpg',
    },
  })

  const songsIds = playlists[0].songs.map((song: Song) => ({ id: song.id }))

  const newPlaylists = playlists.map(async (playlist) => {
    const newPlaylist = await prisma.playlist.create({
      data: {
        name: playlist.name,
        image: playlist.image,
        user: {
          connect: {
            id: user.id,
          },
        },
        songs: {
          connect: songsIds,
        },
      },
    })
    return newPlaylist
  })
  res.json(user)
}
