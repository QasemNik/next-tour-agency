// src/services/authOtp.js

// This function calls your Next.js API route for sending the OTP
export const sendOtp = async (mobile) => {
  const response = await fetch("/api/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "خطا در ارسال کد");
  }
  return data;
};

// This function calls your Next.js API route for checking the OTP
export const checkOtp = async ({ mobile, code }) => {
  const response = await fetch("/api/auth/check-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, code }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "خطا در تایید کد");
  }
  return data;
};
