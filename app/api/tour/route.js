import { NextResponse } from "next/server";

const MAIN_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(_request) {
  if (!MAIN_URL) {
    console.error(
      "[API Route] Error: NEXT_PUBLIC_BASE_URL is not defined in .env.local"
    );
    return NextResponse.json(
      { message: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const backendResponse = await fetch(`${MAIN_URL}/tour`);

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error(
        `[API Route] Error from main backend: ${backendResponse.status}`,
        data
      );
      return NextResponse.json(
        {
          message:
            data.message || "Failed to fetch tours from the main backend.",
        },
        { status: backendResponse.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    // This will catch network errors, like if the backend server is down
    console.error("[API Route] CATCH Block Error:", error.message);
    return NextResponse.json(
      {
        message:
          "Internal Server Error: Could not connect to the main backend.",
      },
      { status: 500 }
    );
  }
}
