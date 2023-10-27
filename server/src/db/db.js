// NOTE: Currently the security rules of the firebaseDB do not allow any reads or writes!!!

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, child, get, update, set, increment, push,query,orderByChild,equalTo, onValue, onChildAdded } = require("firebase/database");


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
        path = "/test/" +path;
    }else{
        path = path;
    }
       return get(child(ref(db), path)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log("does exist")
                // data = JSON.stringify(snapshot.toJSON())
                data = snapshot.val()
                // console.log(data)
                return data;
            } else {
                console.log("No data available for: "+path);

                return NaN;
            }
        }).catch((error) => {
            console.error(error);
        });


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

/**
 * Reads a table item from the database using specified path
 * @param {string} entity Name of the entity, i.e User, Appointment, Tutor, Student, etc
 * @param {string} entityId Database ID of the desired entity to edit
 * @param {string} key The attribute name to edit of the referenced entity
 * @param {any} newValue The value to apply to the attribute
 * @param {boolean} test Defaults to true, whether it is reading from the test path 
 */
function modifyItem(entity, entityId,key,newValue, test=true){

    path=""
    if (test) {
        path="/test/"+entity+"/"+entityId+"/"+key
    } else {
        path=entity+"/"+entityId+"/"+key
    }
    return update(ref(db), {[path]:newValue}).then(()=>{
        return true;
    }).catch((error)=>{
        console.error(error);
        return false;
    });
    
}

async function searchItem(entity,child,matchValue,test=true){
    path=""
    if (test) {
        path="/test/"+entity+"/"
    } else {
        path=entity+"/"
    }
    // onValue(query(ref(db,path), orderByChild(child),equalTo(matchValue)), (snapshot)=>{
    //     if(snapshot.exists()){
    //         data = Object.keys(snapshot.val())
    //         console.log(data)
    //         returnVal = data
    //         return data
    //     }else{
    //         return false
    //     }
    // },{onlyOnce:true})
    try{
    const snapshot = await get(query(ref(db,path), orderByChild(child),equalTo(matchValue)))

    if (snapshot.exists()) {
        const data = snapshot.val();
        // console.log(data);
        return data
      } else {
        console.log('No matching data found for path: '+path+child+', '+ matchValue);
        return ""
      }
    } catch(error){
        console.error(error)
    }
    // query1=query(ref(db,path), orderByChild(child),equalTo(matchValue))
    // listener = onChildAdded(query1,)
}




module.exports = {
    readPath,
    addItem,
    modifyItem,
    searchItem
}

