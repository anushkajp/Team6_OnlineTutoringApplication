const { addItem,modifyItem } = require("./db")

module.exports = {
    updateUsername: async function updateUsername(userId, newUsername) {
        return modifyItem("User",userId,"username", newUsername)
    },
    updateUserMajor: async function updateUserMajor(userId, newMajorId) {
        return modifyItem("User",userId,"major", newMajorId)
    },
    updateUserPhone: async function updateUserPhone(userId, newPhone) {
        return modifyItem("User",userId,"phone", newPhone)
    },
    updateUserEmail: async function updateUserEmail(userId, newEmail) {
        return modifyItem("User",userId,"email", newEmail)
    },
    updateUserBio: async function updateUserBio(userId, newLongBio) {
        return modifyItem("User",userId,"longBio", newLongBio)
    },
    updateUserPassword: async function updateUserPassword(userId, newPasswordHash) {
        return modifyItem("User",userId,"password", newPasswordHash)
    },
    updateUserRating: async function updateUserRating(userId, newRating) {
        return modifyItem("User",userId,"rating", newRating)
    },
    updateUserProfilePic: async function updateUserProfilePic(userId, newProfilePic) {
        return modifyItem("User",userId,"profilePic", newProfilePic)
    },


    updateTutorBio: async function updateTutorBio(tutorId, newTutorBio) {
        return modifyItem("Tutor",tutorId,"shortBio", newTutorBio)
    },
    updateTutorBkgrCheck: async function updateTutorBkgrCheck(tutorId, newBkgrCheck) {
        return modifyItem("Tutor",tutorId,"backgroundCheck", newBkgrCheck)

    },
    updateTutorHours: async function updateTutorHours(tutorId, newTotalHours) {
        return modifyItem("Tutor",tutorId,"totalHours", newTotalHours)
    },
    updateTutorWeeklyAvail: async function updateTutorWeeklyAvail(tutorId, newWeeklyAvail) {
        return modifyItem("Tutor",tutorId,"weeklyAvailability", newWeeklyAvail)
    },
    updateTutorExceptAvail: async function updateTutorExceptAvail(tutorId, newExceptionsAvailability) {
        return modifyItem("Tutor",tutorId,"exceptionsAvailability", newExceptionsAvailability)
    },

    updateMajorName: async function updateMajorName(majorId,newMajorName){
        return modifyItem("Major",majorId,"majorName", newMajorName)
    },

    updateCourseName: async function updateCourseName(courseId, newCourseName) {
        return modifyItem("Course",courseId,"courseName", newCourseName)
    },
    updateCourseNumber: async function updateCourseNumber(courseId, newCourseNumber) {
        return modifyItem("Course",courseId,"courseNumber", newCourseNumber)

    },
    updateCourseCrdHours: async function updateCourseCrdHours(courseId, newCreditHours) {
        return modifyItem("Course",courseId,"creditHours", newCreditHours)
    },
    updateAppDateTime: async function updateAppDateTime(appointmentId, newDateTime){
        return modifyItem("Appointment",appointmentId,"dateTime",newDateTime)
    },
    updateAppLength: async function updateAppLength(appointmentId, newLength){
        return modifyItem("Appointment",appointmentId,"length",newLength)
    },
    updateAppMedium: async function updateAppMedium(appointmentId, newOnline){
        return modifyItem("Appointment",appointmentId,"online",newOnline)
    },
    updateAppLocation: async function updateAppLocation(appointmentId, newLocation){
        return modifyItem("Appointment",appointmentId,"location",newLocation)
    },
    updateAppNotes: async function updateAppNotes(appointmentId, newNotes){
        return modifyItem("Appointment",appointmentId,"notes",newNotes)
    },
    updateAppRating: async function updateRating(appointmentId, newRating){
        return modifyItem("Appointment",appointmentId,"rating",newRating)
    },
    updateAppReview: async function updateAppReview(appointmentId, newReview){
        return modifyItem("Appointment",appointmentId,"review",newReview)
    },
    updateAppUserId: async function updateAppUserId(appointmentId, newUserId) {
        return modifyItem("Appointment",appointmentId,"userId",newUserId)
    }
}