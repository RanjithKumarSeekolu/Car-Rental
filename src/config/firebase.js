// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

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

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

// Create a GoogleAuthProvider instance
const provider = new GoogleAuthProvider();

export { db, auth, provider, storage };
