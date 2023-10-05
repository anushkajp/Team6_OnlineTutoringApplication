const { readPath } = require("./db")
var exportAll = {// Only read user Ids from these tables so references to information can be received
    getUserIds: async function getUserIds() {
        return Object.keys(await readPath("User"))
    },

    getTutorIds: async function getTutorIds() {
        return Object.keys(await readPath("Tutor"))
    },

    getStudentIds: async function getStudentIds() {
        return Object.keys(await readPath("Student"))
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
    getCourses: function getCourses() {
        return readPath("Course")
    },
    getAppointments: function getAppointments() {
        return readPath("Appointment")
    },
    getReviews: function getReviews() {
        return readPath("Review")
    }
}
module.exports={exportAll}