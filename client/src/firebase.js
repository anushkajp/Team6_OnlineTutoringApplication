import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, query, orderByChild, equalTo } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Database
const database = getDatabase(app);

export async function fetchUserType(uid) {
  const db = getDatabase();
  const baseRef = ref(db, '/test/Student/'); 
  const userQuery = query(baseRef, orderByChild('userId'), equalTo(uid));

  try {
    const snapshot = await get(userQuery);
    let data = "";
    let key = "";

    if (snapshot.exists()) {
      data = snapshot.val();
      key = Object.keys(data)[0]; 
      return { accountType: "student", userKey: key}; 
    } else {
      const tutorRef = ref(db, '/test/Tutor/'); 
      const tutorQuery = query(tutorRef, orderByChild('userId'), equalTo(uid));
      const tutorSnapshot = await get(tutorQuery); 
      data = tutorSnapshot.val();
      key = Object.keys(data)[0];
    
      if (tutorSnapshot.exists()) {
        return { accountType: "tutor", userKey: key};
      } else {
        console.log("Cannot find this user.");
        return null; 
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { auth,app, database };