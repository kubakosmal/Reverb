import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'
import { useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'

interface JwtPayload {
  id: number
}

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (token) {
      let user

      try {
        const { id } = jwt.verify(token, 'hello') as JwtPayload
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorizied' })
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not Authorizied' })
  }
}

export const includeUser = (handler) => {
  return async (req, res) => {
    const session = await getSession({ req })
    return handler(req, res, session.user)
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, 'hello')
  return user
}
