import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in your .env.local file.");
}

const SECRET_KEY_UINT8 = new TextEncoder().encode(JWT_SECRET);
const AUTH_ROUTES = ["/auth/login", "/auth/verify-otp"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // --- Case 1: User is on an Authentication Page ---
  if (AUTH_ROUTES.includes(pathname)) {
    if (accessToken) {
      try {
        await jwtVerify(accessToken, SECRET_KEY_UINT8);
        return NextResponse.redirect(new URL("/profile", request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // --- Case 2: User is on a Protected Page ---
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    await jwtVerify(accessToken, SECRET_KEY_UINT8);
    return NextResponse.next();
  } catch (error) {
    // --- Enhanced Error Logging ---
    // This will print the exact reason for the failure in your server terminal.
    console.error("JWT Verification Error:", error.code, "|", error.message);

    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/booking/:path*",
    "/auth/login",
    "/auth/verify-otp",
  ],
};
