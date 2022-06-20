import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const signedinPages = ['/playlist', '/library', '/']

export default async function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const session = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    })
    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
