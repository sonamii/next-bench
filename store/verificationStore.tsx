import { create } from "zustand";

interface VerificationState {
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
}

// Create store with localStorage persistence
export const useVerificationStore = create<VerificationState>((set) => ({
  isVerified: typeof window !== "undefined" ? localStorage.getItem("isVerified") === "true" : false,
  setIsVerified: (value) => {
    localStorage.setItem("isVerified", String(value));
    set({ isVerified: value });
  },
}));
