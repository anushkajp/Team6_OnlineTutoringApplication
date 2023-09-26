// NOTE: Currently the security rules of the firebaseDB do not allow any reads or writes!!!

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const { getDatabase, ref, child, get, update, set, increment, push } = require("firebase/database");


const firebaseConfig = {
    apiKey: "AIzaSyBnvqIAxssjpgjpEBDDn3iRU9emgNlh3TA",
    authDomain: "tutortopia-7d536.firebaseapp.com",
    projectId: "tutortopia-7d536",
    storageBucket: "tutortopia-7d536.appspot.com",
    messagingSenderId: "1067384641270",
    appId: "1:1067384641270:web:e11a33425bbc86a43f3ed7",
    measurementId: "G-43L355452Y",
    databaseURL: "https://tutortopia-7d536-default-rtdb.firebaseio.com/"
};

const fbApp = initializeApp(firebaseConfig);
const db = getDatabase(fbApp);


// Gets updates from the database itself everytime its run,
// TODO: Set once to true to load once and read the value locally.
 function readPath(path, once) {
    // if (!once) {
    get(child(db, path)).then((snapshot) => {
        if (snapshot.exists()) {
            return (snapshot.val());
        } else {
            return NaN;
        }
    }).catch((error) => {
        console.error(error);
    });

    // }else {


    // }
}

// Write a new item into an existing table
// Example postdata format
// const postData = {
//     author: username,
//     uid: uid,
//     body: body,
//     title: title,
//     starCount: 0,
//     authorPic: picture
//   };
// batch writes are possible and could be setup in the future
 function addItem(entity, postData) {
    const newPostKey = push(child(ref(db),entity)).key;

    const updates={}
    updates["/"+entity+"/"+newPostKey] = postData;

    return update(ref(db),updates);
    
}

module.exports = {
    db,
    addItem,
    readPath
}

