import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      otpCode: null,

      setOtpCode: (code) => {
        set({ otpCode: code });
      },
      setUser: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
          otpCode: null,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          otpCode: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
