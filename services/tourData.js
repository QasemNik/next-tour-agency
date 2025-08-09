import { notFound } from "next/navigation";

const getTours = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${url}/api/tour`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to fetch tours");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return [];
    // Return an empty array on error to prevent crashes
  }
};

const getTourById = async (tourId) => {
  const url = process.env.NEXT_PUBLIC_API_URL;  
  try {
    const response = await fetch(`${url}/api/tour/${tourId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error("Failed to fetch tour details");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching tour by ID اي بابا بازم خطا:", error);
    notFound();
  }
};
// --- API Service Functions ---
const getLocations = async () => {
    const response = await fetch('/api/locations');
    if (!response.ok) throw new Error('Failed to fetch locations');
    return response.json();
};

// Creates a new tour booking
const createBooking = async (bookingData) => {
  const response = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create booking');
  }
  return data;
};

export { getTours, getTourById, getLocations, createBooking };
