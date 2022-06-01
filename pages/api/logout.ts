import { serialize } from 'cookie'

export default async (req, res) => {
  res.setHeader('Set-Cookie', [
    serialize('TRAX_ACCESS_TOKEN', '', {
      maxAge: -1,
      path: '/',
    }),
  ])

  res.writeHead(302, { Location: '/signin' })
  res.end()
}
