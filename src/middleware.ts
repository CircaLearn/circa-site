import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const verifyResponse = await fetch(`${apiUrl}/auth/verify`, {
    method: "POST",
    headers: {
      Cookie: req.headers.get("cookie") || "", // to pass httpcookies server side
    },
  });

  if (!verifyResponse.ok) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    return response;
  }

  const { user_id } = await verifyResponse.json();

  // Add user_id and logged-in status in custom headers
  // We prevent caching of these headers through automatic refreshes on login/logout
  const response = NextResponse.next();
  response.headers.set("x-user-id", user_id);

  return response;
}

// Where the middleware is applied
export const config = {
  matcher: ["/library"], 
};
