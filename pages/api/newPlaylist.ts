import { NextApiResponse, NextApiRequest } from 'next'
import prisma from '../../lib/prisma'
import { UserSession } from '../../types/data'
import { getSession } from 'next-auth/react'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: UserSession
) => {
  const session = getSession({ req })

  if (!session) {
    res.writeHead(401, { Location: `/signin` })
    res.end()
  }

  const newPlaylist = await prisma.playlist.create({
    data: {
      name: 'New Playlist',
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  res.writeHead(302, { Location: `/playlist/${newPlaylist.id}` })
  res.end()
}
