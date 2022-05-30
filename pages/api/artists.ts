import prisma from '../../lib/prisma'
import { validateRoute } from '../../lib/auth'

export default validateRoute(async (req, res) => {
  const artists = await prisma.artist.findMany()
  res.json(artists)
})
