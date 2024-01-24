console.log("NODE_ENV:", process.env.NODE_ENV);
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://car-rental-backend-u6r1.onrender.com/"
    : "http://localhost:3000/";

console.log("apiUrl:", apiUrl);
export default apiUrl;
