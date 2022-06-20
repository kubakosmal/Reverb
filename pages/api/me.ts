import { NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { UserSession } from '../../types/data'
import { getSession } from 'next-auth/react'

export default async (res: NextApiResponse, user: UserSession) => {
  const session = getSession()

  if (!session) {
    res.status(401)
    res.end()
  }

  const playlistCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  })
  res.json({ ...user, playlistCount })
}
