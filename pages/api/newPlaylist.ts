import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'

export default validateRoute(async (req, res, user) => {
  console.log(req.method)
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
})
