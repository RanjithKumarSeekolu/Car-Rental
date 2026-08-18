import { create } from 'zustand';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { apiFetch } from '../utils/api';

const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  loading: true,

  setProfile: (profile) => set({ profile }),

  initialize: () => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        set({ user: null, profile: null, loading: false });
        return;
      }
      set({ user, loading: true });
      try {
        const idToken = await user.getIdToken();
        const data = await apiFetch('api/auth/sync', {
          method: 'POST',
          body: JSON.stringify({ idToken }),
          auth: false,
        });
        if (data.user?.role === 'admin') {
          await user.getIdToken(true);
        }
        set({ profile: data.user, loading: false });
      } catch (err) {
        console.warn('Auth sync failed:', err.message);
        set({ loading: false });
      }
    });
  },

  logout: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, profile: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));

export default useAuthStore;
