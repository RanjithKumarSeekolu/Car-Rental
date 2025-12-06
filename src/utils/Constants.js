console.log("NODE_ENV:", process.env.NODE_ENV);
const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/"
    : "https://car-rental-backend-u6r1.onrender.com/";

console.log("apiUrl:", apiUrl);
export default apiUrl;
