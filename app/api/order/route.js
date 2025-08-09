import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MAIN_BACKEND_URL =
  process.env.NEXT_PUBLIC_BASE_URL ;

export async function POST(request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    // Get the full data from the frontend (which includes tourId and passenger details)
    const { tourId, passenger } = await request.json();

    // Prepare the data in the format the main backend expects for the /order endpoint
    const orderPayload = {
      nationalCode: passenger.nationalId, // Map nationalId from form to nationalCode
      fullName: passenger.fullName,
      gender: passenger.gender,
      birthDate: passenger.birthDate,
      // Note: If your backend also needs the tourId for an order, add it here.
      // tourId: tourId
    };

    // Forward the request to the main backend's /order endpoint
    const backendResponse = await fetch(`${MAIN_BACKEND_URL}/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to create order" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("BFF Booking/Order Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
