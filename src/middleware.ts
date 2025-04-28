import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

import { jwtDecode } from 'jwt-decode'

import { RolesEnum } from '@m-care/features/@shared/enums'
import { refreshToken } from '@m-care/features/auth/sign-in/services'
import { privateRoutes, publicRoutes } from '@m-care/features/constants'

interface DecodedToken {
  id: string
  role: {
    id: string
    type: RolesEnum
  }
  isActive: boolean
  companyId: string
  exp: number
  iat: number
}

const refreshTokenRoute = '/auth/refresh'
const REDIRECT_WHEN_PLAN_IS_NOT_ACTIVE_ROUTE = '/plans'
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/auth/sign-in'
const REDIRECT_WHEN_NO_PERMISSION = '/admin/home'

const TWO_HOURS_IN_SECONDS = 7200

const handleRedirect = (request: NextRequest, pathname: string) => {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = pathname
  return NextResponse.redirect(redirectUrl)
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find((route) => route.path === path)
  const isPlanRoute = path === REDIRECT_WHEN_PLAN_IS_NOT_ACTIVE_ROUTE

  const token = request.cookies.get('mcare-token')?.value
  const refreshTokenCookie = request.cookies.get('mcare-refresh-token')?.value
  const authToken = token || refreshTokenCookie

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    return handleRedirect(request, REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    return handleRedirect(request, '/admin/home')
  }

  if (path === refreshTokenRoute) {
    const [error, data] = await refreshToken()

    if (error) {
      return handleRedirect(request, REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)
    }

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

  if (token && refreshTokenCookie && !publicRoute) {
    const decodedToken = jwtDecode<DecodedToken>(token)
    const decodedRefreshToken = jwtDecode<DecodedToken>(refreshTokenCookie)
    const currentDate = Math.floor(Date.now() / 1000)

    const route = privateRoutes.find((route) => route.url === path)

    const userHasAccessToRoute =
      route?.requiredRoles.includes(decodedToken.role.type) ?? false

    const tokenHasExpired = decodedToken.exp && currentDate >= decodedToken.exp
    const refreshTokenHasExpired =
      decodedRefreshToken.exp && currentDate >= decodedRefreshToken.exp

    if (tokenHasExpired) {
      const [error, data] = await refreshToken()

      if (error) {
        return handleRedirect(request, REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)
      }

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

    if (!decodedToken.isActive && !isPlanRoute) {
      return handleRedirect(request, REDIRECT_WHEN_PLAN_IS_NOT_ACTIVE_ROUTE)
    }

    if (refreshTokenHasExpired) {
      return handleRedirect(request, REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE)
    }

    if (!userHasAccessToRoute) {
      return handleRedirect(request, REDIRECT_WHEN_NO_PERMISSION)
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
