import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MAIN_BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(request) {
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
    const backendResponse = await fetch(`${MAIN_BACKEND_URL}/user/tours`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch tours from backend" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("BFF My Tours Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
