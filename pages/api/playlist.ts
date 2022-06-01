import prisma from '../../lib/prisma'
import { validateRoute } from '../../lib/auth'

export default validateRoute(async (req, res, user) => {
  if (req.method == 'GET') {
    const playlists = await getPlaylists(user)
    res.status(200)
    res.json(playlists)
  } else if (req.method == 'GET') {
    const newPlaylist = await postNewPlaylist(user)
    res.status(204)
    res.json(newPlaylist)
  }
})

const postNewPlaylist = async (user) => {
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
  return newPlaylist
}

const getPlaylists = async (user) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: 'asc',
    },
  })
  return playlists
}
