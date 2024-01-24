const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://car-rental-backend-u6r1.onrender.com/"
    : "http://localhost:3000/";

export default apiUrl;
