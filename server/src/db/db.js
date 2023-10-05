// NOTE: Currently the security rules of the firebaseDB do not allow any reads or writes!!!

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const { getDatabase, ref, child, get, update, set, increment, push } = require("firebase/database");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

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
/**
 * Reads a table item from the database using specified path
 * @param {string} path Path of the item or entity to be read
 * @param {boolean} test Defaults to true, whether it is reading from the test path 
 */
 async function readPath(path, test = true) {
    if (test) {
       return get(child(ref(db), "test/"+path)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log("does exist")
                // data = JSON.stringify(snapshot.toJSON())
                data = snapshot.val()
                // console.log(data)
                return data;
            } else {
                console.log("No data available");

                return NaN;
            }
        }).catch((error) => {
            console.error(error);
        });

    } else {
        get(child(db, path)).then((snapshot) => {
            if (snapshot.exists()) {
                return (snapshot.val());
            } else {
                return NaN;
            }
        }).catch((error) => {
            console.error(error);
        });

    }
}



// Write a new item into an existing table
// TODO: Batch writes
/**
 * Adds a new item into the database, indexed by generated itemID
 * @param {string} entity Name of the entity, such as User, Availability, etc
 * @param {Object} postData The post data with valued fields, for example const postData = {author: username,uid: uid,body: body,title: title,starCount: 0,authorPic: picture};
 * @param {string} specificKey This can be used to modify existing data by pointing to the id of the object you wish to modify
 * @param {boolean} test Defaults to true, indicate whether this is a test write
 */
function addItem(entity, postData, specificKey = null,test = true) {

    newPostKey = specificKey;
    if (newPostKey == null){
        newPostKey = push(child(ref(db), entity)).key
    }

    const updates = {}
    if (test) {
        updates["/test/" + entity + "/" + newPostKey] = postData;
    } else {
        updates["/" + entity + "/" + newPostKey] = postData;
    }
    return update(ref(db), updates).then(()=>{
        postData["id"]=newPostKey
        return postData;
    }).catch((error)=>{
        console.error(error);
        return NaN;
    });

}

function modifyItem(entity, entityId,fields = {}, test=true){

    updates = {}
    if (test) {
        updates["/test/" + entity + "/" + entityId] = postData;
    } else {
        updates["/" + entity + "/" + entityId] = postData;
    }
    return update(ref(db), updates).then(()=>{
        return postData;
    }).catch((error)=>{
        console.error(error);
        return NaN;
    });
    
}





module.exports = {
    readPath,
    addItem,
    modifyItem
}

