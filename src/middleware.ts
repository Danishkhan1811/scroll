// import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server'

// export const config = {
//   matcher: ['/dashboard/:path*', '/auth-callback'],
// }

// export default authMiddleware

// https://docs.kinde.com/developer-tools/sdks/backend/nextjs-prev-sdk/

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
export default function middleware(req: any) {
  return withAuth(req, {
    isReturnToCurrentPage: true
  });
}
export const config = {
  matcher: ['/dashboard/:path*', '/auth-callback']
};