import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// require("dotenv").config();

const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID

  apiKey: "AIzaSyBnvqIAxssjpgjpEBDDn3iRU9emgNlh3TA",
  authDomain: "tutortopia-7d536.firebaseapp.com",
  databaseURL: "https://tutortopia-7d536-default-rtdb.firebaseio.com",
  projectId: "tutortopia-7d536",
  storageBucket: "tutortopia-7d536.appspot.com",
  messagingSenderId: "1067384641270",
  appId: "1:1067384641270:web:e11a33425bbc86a43f3ed7",
  measurementId: "G-43L355452Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;