import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, query, orderByChild, equalTo } from 'firebase/database';

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

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Database
const db = getDatabase(app);

export async function fetchUserType(uid) {
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
      console.log(data)
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

export const findStudentByKey = async (value) => {
  const nodeRef = ref(db, `/test/User/${value}`);
  try {
    const snapshot = await get(nodeRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data; 
    } else {
      console.log('No data found with this key');
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};


export { auth,app, db };