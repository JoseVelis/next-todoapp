import { auth } from "@/src/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isAuth = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth')

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
  }

  if (!isAuth && req.nextUrl.pathname.startsWith('/checkout')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}