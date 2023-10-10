const { readPath } = require("./db")
module.exports={// Only read user Ids from these tables so references to information can be received
    getUserIds: async function getUserIds() {
        return Object.keys(await readPath("User"))
    },
    getUsers: function getUsers(){
        return readPath("User")
    },

    getTutorIds: async function getTutorIds() {
        return Object.keys(await readPath("Tutor"))
    },
    getTutors: function getTutors(){
        return readPath("Tutor")
    },

    getStudentIds: async function getStudentIds() {
        return Object.keys(await readPath("Student"))
    },
    getStudents: function getStudents(){
        return readPath("Student")
    },
    // Only read by Id to ensure data is being read with intent
    getUser: function getUser(userId) {
        return readPath("User/" + userId)
    },
    getTutor: function getTutor(userId) {
        return readPath("Tutor/" + userId)
    },
    getTutorAvailability: function getAvailability(tutorId) {
        return readPath("Availability/" + tutorId)
    },
    getStudent: function getStudent(userId) {
        return readPath("Student/" + userId)
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