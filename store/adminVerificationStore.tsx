import { create } from "zustand";

interface VerificationState {
  isAdminVerified: boolean;
  setIsAdminVerified: (value: boolean) => void;
}

// Create store with localStorage persistence
export const useAdminVerificationStore = create<VerificationState>((set) => ({
  /**
   * Checks if the current environment is client-side and retrieves the
   * 'isVerified' state from localStorage. Defaults to false if not available
   * or if executed on the server-side.
   */
  isAdminVerified:
    typeof window !== "undefined"
      ? localStorage.getItem("isAdminVerified") === "true"
      : false,
  /**
   * Sets the `isVerified` state to the given value, and
   * persists it to localStorage.
   * @param {boolean} value - New value for `isVerified`.
   */
  setIsAdminVerified: (value: boolean) => {
    localStorage.setItem("isAdminVerified", String(value));
    set({ isAdminVerified: value });
  },
}));
