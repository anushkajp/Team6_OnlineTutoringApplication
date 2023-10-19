const { addItem,searchItem,modifyItem} = require("./db")

module.exports = {


    deleteUser:async function deleteUser(userId) {

        addItem("Student",null,userId)
        for (i in await searchItem("Appointment","studentId",userId)){
            modifyItem("Appointment",i,"studentId",null)
        }
        addItem("Tutor",null,userId)
        for (i in await searchItem("Appointment","tutorId",userId)){
            modifyItem("Appointment",i,"tutorId",null)
        }
        for (i in await searchItem("Review","tutorId",userId)){
            this.deleteReview(i)
        }
        for (i in await searchItem("Review","studentId",userId)){
            modifyItem("Review",i,"studentId",null)
        }
        return addItem("User", null,userId)

    },


    deleteStudent: async function deleteStudent(userId) {
        return this.deleteUser(userId)
    },

    deleteTutor: async function deleteTutor(userId) {
        return this.deleteUser(userId)
    },

    deleteMajor: async function deleteMajor(majorId) {
        for (i in searchItem("Course","majorId",majorId)){
            this.deleteCourse(i)
        }
        return addItem("Major", null,majorId)
    },

    deleteCourse:async function deleteCourse(courseId) {

        return addItem("Course", null,courseId)
    },

    deleteAppointment:async function deleteAppointment(appId) {

        return addItem("Appointment", null, appId)
    },

    deleteReview:async function deleteReview(reviewId) {

        return addItem("Review", null, reviewId)

    }


}