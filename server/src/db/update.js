const { addItem } = require("./db")

var exportAll = {
    updateUsername: async function updateUsername(userId, newUsername) {
        postData = {
            username: newUsername
        }
        return addItem("User", postData, userId)
    },
    updateUserMajor: async function updateUserMajor(userId, newMajorId) {

    },
    updateUserPhone: async function updateUserPhone(userId, newPhone) {

    },
    updateUserEmail: async function updateUserEmail(userId, newEmail) {

    },
    updateUserBio: async function updateUserBio(userId, newLongBio) {

    },
    updateUserPassword: async function updateUserPassword(userId, newPasswordHash) {

    },
    updateUserRating: async function updateUserRating(userId, newRating) {

    },
    updateUserProfilePic: async function updateUserProfilePic(userId, newProfilePic) {

    },


    updateTutorBio: async function updateTutorBio(tutorId, newTutorBio) {

    },
    updateTutorBkgrCheck: async function updateTutorBkgrCheck(tutorId, newBkgrCheck) {

    },
    updateTutorHours: async function updateTutorHours(tutorId, newTotalHours) {

    },
    updateTutorWeeklyAvail: async function updateTutorWeeklyAvail(tutorId, newWeeklyAvail) {

    },
    updateTutorExceptAvail: async function updateTutorExceptAvail(tutorId, newExceptionsAvailability) {

    },


    updateCourseName: async function updateCourseName() {

    },
    updateCourseNumber: async function updateCourseNumber() {

    },
    updateCourseCrdHours: async function updateCourseCrdHours() {

    },

    updateAppUserId: async function updateAppUserId(appointmentId, newUserId) {

    }
}
module.exports={exportAll}