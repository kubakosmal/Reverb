import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      OR: [
        { name: 'Gym' },
        { name: 'Go Vote' },
        { name: 'The best of ice cream truck' },
      ],
    },
  })
  const playlistsIds = playlists.map((playlist) => {
    return {
      id: playlist.id,
    }
  })
  const user = await prisma.user.create({
    data: {
      name: 'Joe Biden',
      image:
        'https://s.abcnews.com/images/Politics/biden-file-gty-ml-201106_1604680381500_hpMain_16x9_1600.jpg',
      playlists: {
        connect: playlistsIds,
      },
    },
  })

  res.json(user)
}
