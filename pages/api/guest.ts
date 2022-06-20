import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.user.create({
    data: {
      name: 'Joe Biden',
      image:
        'https://s.abcnews.com/images/Politics/biden-file-gty-ml-201106_1604680381500_hpMain_16x9_1600.jpg',
    },
  })
  res.json(user)
}
