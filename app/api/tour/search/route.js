import { NextResponse } from "next/server";

const MAIN_BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(request) {
  try {
    // 1. Fetch ALL tours from your main backend first
    const backendResponse = await fetch(`${MAIN_BACKEND_URL}/tour`);
    if (!backendResponse.ok) {
      throw new Error("Failed to fetch tours from the main backend");
    }
    const allTours = await backendResponse.json();

    const { searchParams } = new URL(request.url);

    // 2. Read the search parameters from the incoming request
    const originId = searchParams.get("origin");
    const destinationId = searchParams.get("destination");
    // You can also get startDate and endDate here for more complex filtering

    // 3. Filter the fetched tours based on the parameters
    const results = allTours.filter((tour) => {
      const originMatch = !originId || tour.origin.id === originId;
      const destinationMatch =
        !destinationId || tour.destination.id === destinationId;
      return originMatch && destinationMatch;
    });

    // Add a small delay to simulate a real API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(results);
  } catch (error) {
    console.error("BFF Search Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
