import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserSession } from '../../types/data'
import {
  createNewPlaylist,
  deletePlaylist,
  addSongToPlaylist,
  getPlaylists,
} from '../../lib/apiHelpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const userSession = session?.user as UserSession

  if (!userSession) {
    return res.status(401).json({ unauthorized: true })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userSession.id,
    },
  })

  switch (req.method) {
    case 'POST':
      const newPlaylist = await createNewPlaylist(user)
      res.json(newPlaylist)
      break

    case 'DELETE':
      const deletedPlaylist = await deletePlaylist(req.body.playlistId)
      res.json(deletedPlaylist)
      break

    case 'PUT':
      const updatedPlaylist = await addSongToPlaylist(
        req.body.playlistId,
        req.body.songId
      )
      res.json(updatedPlaylist)
      break

    case 'PATCH':
      const updatedInfoPlaylist = await prisma.playlist.update({
        where: {
          id: req.body.playlistId,
        },
        data: {
          name: req.body.newName,
        },
      })
      res.json(updatedInfoPlaylist)
      break

    default:
      const playlists = await getPlaylists(user)
      res.json(playlists)
      break
  }
}
