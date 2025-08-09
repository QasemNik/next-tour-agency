// src/app/api/auth/logout/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    // Clear the httpOnly cookies on the server
    cookies().delete("accessToken");
    cookies().delete("refreshToken");

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
