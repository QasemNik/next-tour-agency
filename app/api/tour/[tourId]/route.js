import { NextResponse } from "next/server";

const MAIN_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(_request, { params }) {
  const tourParams = await params;
  const {tourId} = tourParams

  try {
    const backendResponse = await fetch(`${MAIN_URL}/tour/${tourId}`);
    const data = await backendResponse.json();
    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendResponse.message || "Tour not found" },
        { status: backendResponse.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
