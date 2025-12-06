import { create } from "zustand";
import apiUrl from "../utils/Constants";

const useCarStore = create((set, get) => ({
  cars: [],
  loading: false,
  error: null,
  
  fetchCars: async (limit = 6) => {
    // If cars are already loaded and we just want initial view, optimize?
    // For now, simple fetch
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${apiUrl}cars/getCars?limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      set({ cars: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getAllCars: async () => {
     set({ loading: true, error: null });
     try {
       const response = await fetch(`${apiUrl}cars/getAllCars`);
       if (!response.ok) throw new Error("Failed to fetch all cars");
       const data = await response.json();
       set({ cars: data, loading: false });
     } catch (error) {
       set({ error: error.message, loading: false });
     }
  },

  addCar: async (carData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${apiUrl}cars/addCar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add car");
      }
      
      const newCar = await response.json();
      
      // Update local state by appending the new car
      set((state) => ({ 
        cars: [...state.cars, newCar], 
        loading: false 
      }));
      
      return { success: true, car: newCar };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  }
}));

export default useCarStore;
