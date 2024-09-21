// import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
// // export const GET = handleAuth();

// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest, { params }: any) {
//   const endpoint = params.kindeAuth;
//   return handleAuth(request, endpoint);
// }

import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  const endpoint = params.kindeAuth;

  // Handle the authentication and return a valid response.
  const response = await handleAuth(request, endpoint);

  // If handleAuth does not return a Response, create one explicitly.
  return response instanceof Response ? response : NextResponse.json(response);
}
