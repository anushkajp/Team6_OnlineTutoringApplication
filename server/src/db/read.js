const {readPath} = require("./db")
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
function getReviews(){
    return readPath("Review")
}
