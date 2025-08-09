import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MAIN_BACKEND_URL =
  process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(request) {
  // 1. Read the secure httpOnly cookie from the request
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    // 2. Forward the GET request to your main backend's /basket endpoint
    const backendResponse = await fetch(`${MAIN_BACKEND_URL}/basket`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch basket from backend" },
        { status: backendResponse.status }
      );
    }

    // 3. Return the basket data to the frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error("BFF Basket Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
