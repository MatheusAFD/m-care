import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

import { jwtDecode } from 'jwt-decode'
import { refreshToken } from './features/sign-in/services'

const publicRoutes = [
  { path: '/auth/sign-in', whenAuthenticated: 'redirect' },
  { path: '/auth/register', whenAuthenticated: 'redirect' }
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/auth/sign-in'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find((route) => route.path === path)

  const token = request.cookies.get('mcare-token')?.value
  const refreshTokenCookie = request.cookies.get('mcare-refresh-token')?.value

  const authToken = token || refreshTokenCookie

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(redirectUrl)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/home'

    return NextResponse.redirect(redirectUrl)
  }

  if (token && refreshTokenCookie && !publicRoute) {
    const decodedToken = jwtDecode(token)
    const decodedRefreshToken = jwtDecode(refreshTokenCookie)
    const currentDate = Math.floor(Date.now() / 1000)

    const tokenHasExpired = decodedToken.exp && currentDate >= decodedToken.exp
    const refreshTokenHasExpired =
      decodedRefreshToken.exp && currentDate >= decodedRefreshToken.exp

    if (tokenHasExpired) {
      const [error, data] = await refreshToken()

      if (error) {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
      }

      const TWO_HOURS_IN_SECONDS = 7200

      const response = NextResponse.next()
      response.cookies.set('mcare-token', data.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: TWO_HOURS_IN_SECONDS
      })
      response.cookies.set('mcare-refresh-token', data.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: TWO_HOURS_IN_SECONDS
      })

      return response
    }

    if (refreshTokenHasExpired) {
      const redirectUrl = request.nextUrl.clone()

      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - public
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|.*\\..*|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
