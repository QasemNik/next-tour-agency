import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MAIN_BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Handles GET requests to fetch profile data
export async function GET(request) {
  // 1. Correct way to read cookies in Next.js 13+
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    // Forward the request to the main backend with the token
    const backendResponse = await fetch(`${MAIN_BACKEND_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error(
        `[BFF] Error from main backend: ${backendResponse.status}`,
        data
      );
      return NextResponse.json(
        { message: data.message || "Failed to fetch profile from backend" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("BFF Profile GET Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handles PUT requests to update profile data
export async function PUT(request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const backendResponse = await fetch(`${MAIN_BACKEND_URL}/user/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error(
        `[BFF] Error from main backend on PUT: ${backendResponse.status}`,
        data
      );
      return NextResponse.json(
        { message: data.message || "Failed to update profile" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("BFF Profile PUT Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
