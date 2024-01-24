// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseProdConfig = {};

const firebaseTestConfig = {
  apiKey: "AIzaSyAZtGLDQk2wp46GopSGD_qdE2V4DPND3Js",
  authDomain: "car-rental-3a89c.firebaseapp.com",
  projectId: "car-rental-3a89c",
  storageBucket: "car-rental-3a89c.appspot.com",
  messagingSenderId: "245620725985",
  appId: "1:245620725985:web:742a591c5795ae01a6ffa0",
  measurementId: "G-XBB81DTK3F",
};

// Initialize Firebase
const app = initializeApp(firebaseTestConfig);

// const analytics = process.env.REACT_APP_ENV ? getAnalytics(app) : {};

// Initialize Firebase
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Create a GoogleAuthProvider instance
const provider = new GoogleAuthProvider();

export { db, auth, provider };
// export default analytics;
