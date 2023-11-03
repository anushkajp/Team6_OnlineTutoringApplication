const { readPath } = require("./db")
module.exports={// Only read user Ids from these tables so references to information can be received
    getUserIds: async function getUserIds() {
        return Object.keys(await readPath("User"))
    },
    getUsers: async function getUsers(){
        return await readPath("User")
    },

    getTutorIds: async function getTutorIds() {
        return Object.keys(await readPath("Tutor"))
    },
    getTutors: async function getTutors(){
        return await readPath("Tutor")
    },

    getStudentIds: async function getStudentIds() {
        return Object.keys(await readPath("Student"))
    },
    getStudents: async function getStudents(){
        return await readPath("Student")
    },
    // Only read by Id to ensure data is being read with intent
    getUser: async function getUser(userId) {
        return await readPath("User/" + userId)
    },
    getTutor: async function getTutor(userId) {
        return await readPath("Tutor/" + userId)
    },
    getTutorAvailability: async function getAvailability(tutorId) {
        return await readPath("Availability/" + tutorId)
    },
    getStudent: async function getStudent(userId) {
        return await readPath("Student/" + userId)
    },


    // For more static non-sensitive tables, read the whole table
    getMajors: function getMajors() {
        return readPath("Major")
    },
    getMajor: function getMajor(majorId){
        return readPath("Major/"+majorId)
    },
    getCourses: function getCourses() {
        return readPath("Course")
    },
    getCourse:function getCourse(courseId){
        return readPath("Course/"+courseId)
    },
    getAppointments: function getAppointments() {
        return readPath("Appointment")
    },
    getAppointment: function getAppointment(appId){
        return readPath("Appointment/"+appId)
    },
    getReviews: function getReviews() {
        return readPath("Review")
    },
    getReview: function getReview(reviewId){
        return readPath("Review/"+reviewId)
    }
}