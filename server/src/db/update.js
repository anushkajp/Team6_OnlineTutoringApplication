const { modifyItem } = require("./db")

module.exports = {
    /**
     * Update the username for a user
     * @param {string} userId Database id for the user
     * @param {string} newUsername New username, must be unique
     */
    updateUsername: async function updateUsername(userId, newUsername) {
        return modifyItem("User",userId,"username", newUsername)
    },


    /**
     * Update the major for a user
     * @param {string} userId Database id for the user
     * @param {string} newMajorId Database id for the new user major
     */
    updateUserMajor: async function updateUserMajor(userId, newMajorId) {
        return modifyItem("User",userId,"major", newMajorId)
    },


    /**
     * Update the phone number for a user
     * @param {string} userId Database id for the user
     * @param {string} newPhone New phone number for the user
     */
    updateUserPhone: async function updateUserPhone(userId, newPhone) {
        return modifyItem("User",userId,"phone", newPhone)
    },


    /**
     * Update the email for a user
     * @param {string} userId Database id for the user
     * @param {string} newEmail New email for the user
     */
    updateUserEmail: async function updateUserEmail(userId, newEmail) {
        return modifyItem("User",userId,"email", newEmail)
    },


        /**
     * Update the longbio for a user
     * @param {string} userId Database id for the user
     * @param {string} newLongBio New phone number for the user
     */
    updateUserLongBio: async function updateUserLongBio(userId, newLongBio) {
        return modifyItem("User",userId,"longBio", newLongBio)
    },


    /**
     * Update the shortbio for a user
     * @param {string} userId Database id for the user
     * @param {string} newShortBio New user short bio
     */
    updateUserShortBio: async function updateUserShortBio(userId, newShortBio) {
        return modifyItem("User",userId,"shortBio", newShortBio)
    },


        /**
     * Update the password hash for a user
     * @param {string} userId Database id for the user
     * @param {string} newPasswordHash New password hash for the user
     */
    updateUserPassword: async function updateUserPassword(userId, newPasswordHash) {
        return modifyItem("User",userId,"password", newPasswordHash)
    },


    /**
     * Update the user profile picture
     * @param {string} userId Database id for the user
     * @param {ImageData} newProfilePic New profile picture for the user
     */
    updateUserProfilePic: async function updateUserProfilePic(userId, newProfilePic) {
        return modifyItem("User",userId,"profilePic", newProfilePic)
    },


    
    /**
     * Update the user courses
     * @param {string} userId Database id for the user
     * @param {Array<string>} newUserCourses New array with courseIds
     */
    updateUserCourses: async function updateUserCourses(userId, newUserCourses){
        return modifyItem("User",userId,"courses",newUserCourses)
    },

     /**
     * Update the student hours
     * @param {string} studentId Database id for the user
     * @param {number} newTotalHours New hours for the student
     */
    /*
     updateStudentHours: async function updateStudentHours(studentId, newTotalHours) {
        return modifyItem("Student",studentId,"hours", newTotalHours)
    },*/


    /**
     * Update the tutor background check
     * @param {string} tutorId Database id for the user
     * @param {boolean} newBkgrCheck New background check value
     */
    updateTutorBkgrCheck: async function updateTutorBkgrCheck(tutorId, newBkgrCheck) {
        return modifyItem("Tutor",tutorId,"backgroundCheck", newBkgrCheck)

    },


    /**
     * Update the user hours
     * @param {string} userId Database id for the user
     * @param {number} newTotalHours New hours for the user
     */
    updateUserHours: async function updateUserHours(userId, newTotalHours) {
        return modifyItem("User",userId,"hours", newTotalHours)
    },


        /**
     * Update the user rating
     * @param {string} userId Database id for the user
     * @param {number} newRating New rating for the user
     */
        updateTutorRating: async function updateTutorRating(userId, newRating) {
            return modifyItem("Review",userId,"rating", newRating)
        },
   /**
     * Update the user rating
     * @param {string} userId Database id for the user
     * @param {number} newDescription New rating for the user
     */
        updateReviewDescription: async function updateReviewDescription(userId, newDescription) {
            return modifyItem("Review",userId,"description", newDescription)
        },
        
    /**
     * Update the tutors weekly availability
     * @param {string} tutorId Database id for the user
     * @param {Array<Date>} newWeeklyAvail New rating for the user
     */
    updateTutorWeeklyAvail: async function updateTutorWeeklyAvail(tutorId, newWeeklyAvail) {
        return modifyItem("Tutor",tutorId,"availability", newWeeklyAvail)
    },


    /**
     * Update the tutors availability exception dates
     * @param {string} tutorId Database id for the user
     * @param {Array<Date>} newExceptionsAvailability New date exceptions for availability
     */
    updateTutorExceptAvail: async function updateTutorExceptAvail(tutorId, newExceptionsAvailability) {
        return modifyItem("Tutor",tutorId,"exceptionsAvailability", newExceptionsAvailability)
    },
    updateTutorExceptions: async function updateTutorExceptions (tutorId, newExceptions) {
        return modifyItem("Tutor", tutorId, "exceptions", newExceptions)
    },



    /**
     * Update the major name
     * @param {string} majorId Database id for the major
     * @param {string} newMajorName New major name
     */
    updateMajorName: async function updateMajorName(majorId,newMajorName){
        return modifyItem("Major",majorId,"majorName", newMajorName)
    },



    /**
     * Update the course name
     * @param {string} courseId Database id for the course
     * @param {string} newCourseName New name for the course
     */
    updateCourseName: async function updateCourseName(courseId, newCourseName) {
        return modifyItem("Course",courseId,"courseName", newCourseName)
    },


    /**
     * Update the course number
     * @param {string} courseId Database id for the cours
     * @param {string} newCourseNumber New course number
     */
    updateCourseNumber: async function updateCourseNumber(courseId, newCourseNumber) {
        return modifyItem("Course",courseId,"courseNumber", newCourseNumber)

    },


    /**
     * Update the course credit hours
     * @param {string} courseId Database id for the cours
     * @param {number} newCreditHours New course credit hours
     */
    updateCourseCrdHours: async function updateCourseCrdHours(courseId, newCreditHours) {
        return modifyItem("Course",courseId,"creditHours", newCreditHours)
    },



    /**
     * Update the appointment start date and time
     * @param {string} appointmentId Database id for the appointment
     * @param {Date} newDateTime New start date and time for the appointment
     */
    updateAppDateTime: async function updateAppDateTime(appointmentId, newDateTime){
        return modifyItem("Appointment",appointmentId,"dateTime",newDateTime)
    },


    /**
     * Update the appointment length in minutes
     * @param {string} appointmentId Database id for the appointment
     * @param {number} newLength New appointment length in minutes
     */
    //might not need to this, since length should not be updated
    //it can cause time conflicts
    /*
    updateAppLength: async function updateAppLength(appointmentId, newLength){
        return modifyItem("Appointment",appointmentId,"length",newLength)
    },*/


    /**
     * Update the appointment medium, online or not
     * @param {string} appointmentId Database id for the appointment
     * @param {boolean} newOnline New appointment medium
     */
    updateAppMedium: async function updateAppMedium(appointmentId, newOnline){
        return modifyItem("Appointment",appointmentId,"online",newOnline)
    },


    /**
     * Update the appointment location
     * @param {string} appointmentId Database id for the appointment
     * @param {string} newLocation New appointment location
     */
    updateAppLocation: async function updateAppLocation(appointmentId, newLocation){
        return modifyItem("Appointment",appointmentId,"location",newLocation)
    },

    /**
     * Update the appointment notes
     * @param {string} appointmentId Database id for the appointment
     * @param {string} newFeedback New appointment feedback
     */
    updateAppFeedback: async function updateAppReview(appointmentId, newFeedback){
        return modifyItem("Appointment",appointmentId,"feedback",newFeedback)
    },

    //not required anymore
    /**
     * Update the appointment notes
     * @param {string} appointmentId Database id for the appointment
     * @param {string} newUserId Updates the user id for the appointment
     */
    /*
    updateAppUserId: async function updateAppUserId(appointmentId, newUserId) {
        return modifyItem("Appointment",appointmentId,"studentId",newUserId)
    },*/

    /**
     * Update the appointment student notes
     * @param {string} appointmentId Database id for the appointment
     * @param {string} newNotes New appointment notes
     */
    updateAppTutorNotes: async function updateAppNotes(appointmentId, newNotes){
        return modifyItem("Appointment",appointmentId,"tutorNotes",newNotes)
    },

    /**
     * Update the appointment student notes
     * @param {string} appointmentId Database id for the appointment
     * @param {string} newNotes New appointment notes
     */
    updateAppStudentNotes: async function updateAppNotes(appointmentId, newNotes){
        return modifyItem("Appointment",appointmentId,"studentNotes",newNotes)
    }

    //TODO: update Review attributes
}