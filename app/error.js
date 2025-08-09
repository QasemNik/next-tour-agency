"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

// An inline SVG component to represent the disconnected robot illustration
const DisconnectedRobotIcon = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M104.5 116.5C104.5 125.328 97.3284 132.5 88.5 132.5H61.5C52.6716 132.5 45.5 125.328 45.5 116.5V80.5H104.5V116.5Z"
      fill="#E0E0E0"
    />
    <path
      d="M88.5 132.5H61.5C52.6716 132.5 45.5 125.328 45.5 116.5V80.5H104.5V116.5C104.5 125.328 97.3284 132.5 88.5 132.5Z"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M75 48C88.8071 48 100 36.8071 100 23C100 9.19288 88.8071 -2 75 -2C61.1929 -2 50 9.19288 50 23C50 36.8071 61.1929 48 75 48Z"
      fill="#F5F5F5"
    />
    <path
      d="M75 48C88.8071 48 100 36.8071 100 23C100 9.19288 88.8071 -2 75 -2C61.1929 -2 50 9.19288 50 23C50 36.8071 61.1929 48 75 48Z"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M65 23H85"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M45.5 98.5H104.5"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M68 80.5V60.5C68 56.9101 71.134 54 75 54C78.866 54 82 56.9101 82 60.5V80.5"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M45.5 80.5H35.5C32.4624 80.5 30 82.9624 30 86V101C30 104.038 32.4624 106.5 35.5 106.5H45.5"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M104.5 80.5H114.5C117.538 80.5 120 82.9624 120 86V101C120 104.038 117.538 106.5 114.5 106.5H104.5"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M68.0625 29.5L61.5 36.0625"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M61.5 29.5L68.0625 36.0625"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M88.5 29.5L81.9375 36.0625"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M81.9375 29.5L88.5 36.0625"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M125 108L135 98"
      stroke="#FFC107"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path
      d="M115 98L125 88"
      stroke="#FFC107"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path
      d="M15 60L25 50"
      stroke="#FFC107"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path
      d="M5 50L15 40"
      stroke="#FFC107"
      stroke-width="4"
      stroke-linecap="round"
    />
    <rect x="128" y="115" width="20" height="8" rx="2" fill="#BDBDBD" />
    <rect x="130" y="117" width="4" height="4" rx="1" fill="white" />
    <rect x="138" y="117" width="4" height="4" rx="1" fill="white" />
    <path
      d="M118 119H128"
      stroke="#424242"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
);

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // You can log the error to an error reporting service like Sentry
    console.error("Global Error Boundary Caught:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4 font-yekan">
          <DisconnectedRobotIcon />
          <h1 className="mt-8 text-3xl font-extrabold text-gray-800">
            اتصال با سرور برقرار نیست!
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            لطفا بعدا دوباره امتحان کنید.
          </p>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="mt-8 bg-primary hover:bg-primary/90 text-lg px-6 py-3"
          >
            تلاش مجدد
          </Button>
        </div>
      </body>
    </html>
  );
}
