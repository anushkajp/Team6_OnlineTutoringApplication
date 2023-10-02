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

// Only read user Ids from these tables so references to information can be received
async function getUserIds(){
    return Object.keys(await readPath("User"))
}

async function getTutorIds(){
    return Object.keys(await readPath("Tutor"))
}

async function getStudentIds(){
    return Object.keys(await readPath("Student"))
}

// Only read by Id to ensure data is being read with intent
function getUser(userId){
    return readPath("User/"+userId)
}
function getUserProfile(userId){
    return readPath("User")
}
function getTutor(userId){
    return readPath("Tutor/"+userId)
}
function getAvailability(tutorId){
    return readPath("Availability/"+tutorId)
}
function getStudent(userId){
    return readPath("Student/"+userId)
}


// For more static non-sensitive tables, read the whole table
function getMajors(){
    return readPath("Major")
}
function getCourses(){
    return readPath("Course")
}
function getAppointments(){
    return readPath("Appointment")
}


// Write a new item into an existing table
// TODO: Batch writes
/**
 * Adds a new item into the database, indexed by generated itemID
 * @param {string} entity Name of the entity, such as User, Availability, etc
 * @param {Object} postData The post data with valued fields, for example const postData = {author: username,uid: uid,body: body,title: title,starCount: 0,authorPic: picture};
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
 * Adds a new User to the database 
 * @param {string} firstName First name
 * @param {string} middleName Middle name
 * @param {string} lastName Last name
 * @param {string} password Hashed password
 * @param {string} username Unique username
 * @param {string} major Major
 * @param {Array<Course>} courses Courses provided or sought
 * @param {string} phone Phone number
 * @param {string} email Email
 * @param {string} longBio Descriptive bio
 * @param {number} rating Float rating of the user
 * @param {ImageData} profilePic Profile picture
 */
function addUser(firstName, middleName, lastName, password, username, major, courses, phone, email, longBio, rating = 0.00,profilePic=null ) {
    const postData = {
        username: username,
        major: major,
        courses: courses,
        phone: phone,
        email: email,
        longBio: longBio,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        password: password,
        rating: rating,
        profilePic:profilePic
    }
    return addItem("User", postData)

}
/**
 * Adds a new Student to the database 
 * @param {string} firstName First name
 * @param {string} middleName Middle name
 * @param {string} lastName Last name
 * @param {string} password Hashed password
 * @param {string} username Unique username
 * @param {string} major Major
 * @param {Array<Course>} courses Courses provided or sought
 * @param {string} phone Phone number
 * @param {string} email Email
 * @param {string} longBio Descriptive bio
 * @param {number} rating Float rating of the user
 * @param {ImageData} profilePic Profile picture
 */
async function addStudent(firstName, middleName, lastName, password, username, major, courses, phone, email, longBio, rating = 0.00, profilePic=null){
    const postDataUser = {
        username: username,
        major: major,
        courses: courses,
        phone: phone,
        email: email,
        longBio: longBio,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        password: password,
        rating: rating,
        profilePic:profilePic
    }
    userKey = await addItem("User",postDataUser)
    userKey = userKey["id"]
    const postDataStudent = {
        userId:userKey
    }
    return  addItem("Student",postDataStudent,userKey)
}
/**
 * Adds a new Tutor to the database 
 * @param {string} firstName First name
 * @param {string} middleName Middle name
 * @param {string} lastName Last name
 * @param {string} password Hashed password
 * @param {string} username Unique username
 * @param {string} major Major
 * @param {Array<Course>} courses Courses provided or sought
 * @param {string} phone Phone number
 * @param {string} email Email
 * @param {string} longBio Descriptive bio
 * @param {string} shortBio A short bio for the tutor visible to students
 * @param {string} weeklyAvailability Weekly availability, should be an array<string,7> storing time ranges in a standard format, index 0 is monday
 * @param {Array<Date>} exceptionsAvailability A list of exceptions to the weekly schedule, stored as dates of unavailability
 * @param {ImageData} profilePic 
 * @param {number} rating Float rating of the user
 * @param {boolean} backgroundCheck Defaults to false, whether a background check has passed or not
 * @param {number} totalHours Total hours completed by tutor
 * @param {number} rating The rating other users have given the tutor
 */
 async function addTutor(firstName, middleName, lastName, password, username, major, courses, phone, email, longBio, shortBio,weeklyAvailability=[],exceptionsAvailability=[], profilePic=null,rating = 0.00,backgroundCheck=false,totalHours=0){
    const postDataUser = {
        username: username,
        major: major,
        courses: courses,
        phone: phone,
        email: email,
        longBio: longBio,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        password: password,
        rating: rating,
        profilePic:profilePic
    }
    userKey = await addItem("User",postDataUser)
    userKey = userKey["id"]
    const postDataTutor={
        userId:userKey,
        shortBio:shortBio,
        backgroundCheck:backgroundCheck,
        totalHours:totalHours,
        rating:rating,
        weeklyAvailability:weeklyAvailability,
        exceptionsAvailability:exceptionsAvailability
    }
    return  addItem("Tutor",postDataTutor,userKey)
}
/**
 * Adds a new Major to the database 
 * @param {string} majorName Name of the major
 */
 function addMajor(majorName){
    const postData={
        majorName:majorName
    }
    return  addItem("Major",postData)
}
/**
 * Adds a new Course to the database 
 * @param {string} majorId Database major ID
 * @param {string} courseName Name of the course
 * @param {string} courseNumber Course number
 * @param {number} creditHours Number of credit hours this course offers
 */
 function addCourse(majorId,  courseName, courseNumber, creditHours){
    const postData={
        majorId:majorId,
        courseName: courseName,
        courseNumber:courseNumber,
        creditHours:creditHours
    }
    return  addItem("Course",postData)
}
/**
 * Adds a new Appointment to the database, should be tied to a tutor and a user
 * @param {string} tutorId Database ID of the tutor
 * @param {string} userId Database ID of the user/student
 * @param {Date} dateTime Date and time the appointment starts
 * @param {number} length The duration of the appointment, in minutes
 * @param {boolean} online Whether the appointment is online or in person
 * @param {string} location If in person, the address of the appointment, if online, a meeting URL
 * @param {string} notes Notes about the meeting
 * @param {number} rating Appointment rating
 */
 function addAppointment(tutorId, userId, dateTime, length, online, location, notes, rating, reivew) {
    const postData = {
        tutorId: tutorId,
        userId: userId,
        dateTime: dateTime,
        length: length,
        online: online,
        location: location,
        notes: notes,
        rating: rating,
        review:reivew
    }
    return  addItem("Appointment", postData)
}

// /**
//  * Adds a new Availability to the database, should be tied to a user
//  * @param {string} tutorId Database ID of the tutor
//  * @param {string} weekly Weekly availability, should be an array<string,7> storing time ranges in a standard format, index 0 is monday
//  * @param {Array<Date>} exceptions A list of exceptions to the weekly schedule, stored as dates of unavailability
//  */
//  function addAvailability(tutorId, weekly, exceptions = []) {
//     const postData = {
//         tutorId: tutorId,
//         weekly: weekly,
//         exceptions: exceptions
//     }
//     return  addItem("Availability", postData)

// }
// /**
//  * Adds a new Review to the database, should be tied to an appointment
//  * @param {string} appointmentId Database ID of the appointment
//  * @param {number} rate Review rating
//  * @param {string} description A short description/ comment of the appointment
//  */
// function addReview(appointmentId, rate, description) {
//     const postData = {
//         appointmentId: appointmentId,
//         rate: rate,
//         description: description
//     }
//     return addItem("Review", postData)

// }
module.exports = {
    db,
    readPath,
    addUser,
    addTutor,
    addStudent,
    addCourse,
    addMajor,
    addAppointment
    // swaggerDocument,
    // swaggerUi,fbApp
}

