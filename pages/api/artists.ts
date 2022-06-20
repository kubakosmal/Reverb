import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'
import { NextApiResponse } from 'next'

export default async (res: NextApiResponse) => {
  const session = getSession()

  if (!session) {
    res.status(401)
    res.end()
  }

  const artists = await prisma.artist.findMany()
  res.json(artists)
}
