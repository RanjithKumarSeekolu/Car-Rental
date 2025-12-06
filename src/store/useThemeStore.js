import { create } from 'zustand';

const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem('theme') || 'light',
  
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  initialize: () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      set({ theme: savedTheme });
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        set({ theme: 'dark' });
        document.documentElement.classList.add('dark');
      }
    }
  }
}));

export default useThemeStore;
