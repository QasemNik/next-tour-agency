import { NextResponse } from "next/server";

const MAIN_BACKEND_URL =
  process.env.NEXT_PUBLIC_BASE_URL ;

export async function GET() {
  try {
    // 1. Fetch all tours from your main backend
    const backendResponse = await fetch(`${MAIN_BACKEND_URL}/tour`);
    console.log(backendResponse);
    
    if (!backendResponse.ok) {
      throw new Error("Failed to fetch tours from main backend");
    }
    const tours = await backendResponse.json();

    // 2. Create a map to store unique locations
    const locationsMap = new Map();

    // 3. Extract unique origins and destinations from the tours
    if (Array.isArray(tours)) {
      tours.forEach((tour) => {
        if (tour.origin && tour.origin.id && tour.origin.name) {
          locationsMap.set(tour.origin.id, tour.origin);
        }
        if (tour.destination && tour.destination.id && tour.destination.name) {
          locationsMap.set(tour.destination.id, tour.destination);
        }
      });
    }

    // 4. Convert the map values back to an array
    const uniqueLocations = Array.from(locationsMap.values());

    return NextResponse.json(uniqueLocations);
  } catch (error) {
    console.error("BFF Get Locations Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
