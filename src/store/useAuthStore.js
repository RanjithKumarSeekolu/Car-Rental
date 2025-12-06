import { create } from "zustand";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../config/firebase";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  initialize: () => {
    return onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
  logout: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

export default useAuthStore;
