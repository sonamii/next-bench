import { create } from "zustand";

interface VerificationState {
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
}

// Create store with localStorage persistence
export const useVerificationStore = create<VerificationState>((set) => ({
  /**
   * Checks if the current environment is client-side and retrieves the
   * 'isVerified' state from localStorage. Defaults to false if not available
   * or if executed on the server-side.
   */
  isVerified: typeof window !== "undefined" ? localStorage.getItem("isVerified") === "true" : false,
  /**
   * Sets the `isVerified` state to the given value, and
   * persists it to localStorage.
   * @param {boolean} value - New value for `isVerified`.
   */
  setIsVerified: (value) => {
    localStorage.setItem("isVerified", String(value));
    set({ isVerified: value });
  },
}));
