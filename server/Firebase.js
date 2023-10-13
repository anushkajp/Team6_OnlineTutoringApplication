// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const analytics = getAnalytics(app);
