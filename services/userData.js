// We can no longer use the axios instance with the interceptor because it can't access httpOnly cookies.
// Instead, we will use a simple fetch or a clean axios instance.

import { api } from "@/lib/axiosConfig";

// Get the user's profile data by calling our own Next.js API route.
export const getUserProfile = async () => {
  // The browser will automatically send the httpOnly cookie with this request.
  const response = await fetch("/api/user/profile");

  const data = await response.json();

  if (!response.ok) {
    // Forward the error message from our API route.
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};

// You would follow the same pattern for updateProfile, creating a PUT route in /api/user/profile.
export const updateUserProfile = async (userData) => {
  const response = await fetch("/api/user/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }
  return data;
};

// Get user's booked tours
export const getMyTours = async () => {
  const response = await fetch('/api/user/tours');
  if (!response.ok) {
    throw new Error('Failed to fetch tours');
  }
  return response.json();
};

// Get user's transactions
export const getTransactions = async () => {
  const response = await fetch('/api/user/transactions');
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};
