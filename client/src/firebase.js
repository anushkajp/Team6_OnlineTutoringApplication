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
  const baseRefUser = ref(db, '/test/User/'); 
  const userQueryU = query(baseRefUser, orderByChild('email'), equalTo(uid));
  const snapshot = await get(userQueryU);
  const uKey = Object.keys(snapshot.val())[0]

  const studentRef = ref(db, `/test/Student/${uKey}`);
  
  
  try {
    const snapshotS = await get(studentRef);
    let data = "";
    let key = "";

    if (snapshotS.exists()) {
      data = snapshotS.val();
      
      key = Object.keys(data)[0]; 
      return { accountType: "student", userKey: uKey}; 
    } else {
      const tutorRef = ref(db, `/test/Tutor/${uKey}`); 
      const tutorSnapshot = await get(tutorRef); 
      data = tutorSnapshot.val();
      console.log(data)
      key = Object.keys(data)[0];
    
      if (tutorSnapshot.exists()) {
        return { accountType: "tutor", userKey: uKey};
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