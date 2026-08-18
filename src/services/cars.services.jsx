export const fetchCars = async ({limit = 6, category = "Sports"}) => {
    // If cars are already loaded and we just want initial view, optimize?
    // For now, simple fetch
    try {
      const response = await fetch(`${apiUrl}api/cars?limit=${limit}&category=${category}`);
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error = ", error);
      return error;
    }
};