import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function checkUserAuth(redirect = true) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const headerData = headers();

  const verifyResponse = await fetch(`${apiUrl}/auth/verify`, {
    method: "POST",
    headers: {
      Cookie: headerData.get("cookie") || "",
    },
  });

  if (!verifyResponse.ok) {
    if (redirect) {
      return NextResponse.redirect(
        new URL("/login", headerData.get("referer") || "/")
      );
    }
    return null;
  }

  const user_id = await verifyResponse.json();
//   console.log("Backend response:", user_id); // Check if user_id exists in the response
  return user_id;
}
