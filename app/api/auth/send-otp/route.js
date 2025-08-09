// src/app/api/auth/send-otp/route.js

import { NextResponse } from "next/server";

const MAIN_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request) {
  try {
    const { mobile } = await request.json();

    // Forward the request to your main backend
    const backendResponse = await fetch(`${MAIN_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || "خطا در ارسال کد" },
        { status: 400 }
      );
    }

    // Forward the success response (with the OTP for testing) to the frontend
    return NextResponse.json(backendData);
  } catch (error) {
    console.error("BFF Send OTP Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
