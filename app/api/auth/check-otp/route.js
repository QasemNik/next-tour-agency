import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// The secret key and backend URL now ONLY live in this Next.js project.
const JWT_SECRET = process.env.JWT_SECRET;
const MAIN_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request) {
  try {
    // 1. Get data from the frontend component
    const { mobile, code } = await request.json();

    // 2. Forward the request to your main backend to verify the code
    const backendResponse = await fetch(`${MAIN_URL}/auth/check-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, code }),
    });

    const backendData = await backendResponse.json();

    // 3. If the main backend returns an error, pass it to the frontend
    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || "کد نامعتبر است" },
        { status: 400 }
      );
    }

    const user = backendData.user;

    // 4. If successful, THIS API route creates the tokens itself
    const accessToken = jwt.sign(
      { id: user.id, mobile: user.mobile },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5. Set the tokens in secure, httpOnly cookies
    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // 6. Return only the user data to the frontend component
    return NextResponse.json({ user });
  } catch (error) {
    console.error("BFF API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
