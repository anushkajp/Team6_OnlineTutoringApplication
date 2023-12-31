const { addItem } = require("./db")
const Availability = require("../models/availability")
const Review = require("../models/review")
const Course = require("../models/course")
const Session = require("../models/session")
const Student = require("../models/student")
const Tutor = require("../models/tutor")
const User = require("../models/user")
const Major = require("../models/major")
module.exports = {
    loadJSONFile: async function loadJSONFile(fileName,majorId){
        var json=require(fileName)
        courseNumbers=[]
        output= []
    
        for (i in json.report_data){
            currCourse = json.report_data[i]
            if (!courseNumbers.includes(currCourse.course_number) && !isNaN(parseFloat(currCourse.course_number[1]))){
                courseNumbers.push(currCourse.course_number)
                // console.log(majorId,currCourse.title,currCourse.course_number,currCourse.course_number[1])
                course = new Course(currCourse.title,currCourse.course_number,majorId,parseInt(currCourse.course_number[1]))
                output.push( await this.addCourse(course))
            }
            
            
        }
        return output
    },

        /**
     * Adds a new User to the database 
     * @param {User} userObject
     */
        addUser: function addUser(userObject) {

            return addItem("User", userObject)
    
        },

    /**
     * Adds a new Student to the database 
     * @param {Student} studentObject First name
     */
    //TODO : student variable filter, get rid of reliance on old functions
    addStudent: async function addStudent(data) {
        const studentObject={}
        const user={}

        Object.keys(data).forEach((key) => {
            console.log(key)
            if(!(key in new User()) || key === "userId"){
                studentObject[key] =data[key]
            }else{
                user[key]=data[key]
            }
        })
        userKey = await this.addUser(user)
        userKey = userKey['id']
        studentObject.userId = userKey;
        return addItem("Student", studentObject, userKey)
    },
    /**
     * Adds a new Tutor to the database 
     * @param {Tutor} tutorObject First name
     */
    //TODO: filter out user attributes
    addTutor: async function addTutor(tutorObject) {
        let tutor = {}
        let user = {}
        Object.keys(tutorObject).forEach((key) => {
            if(key !== "userId"){
                if(!(key in new User())){
                    tutor[key] =tutorObject[key]
                }else{
                    user[key]=tutorObject[key]
                }
            }
        })
        userKey = await this.addUser(user)
        userKey = userKey["id"]
        return addItem("Tutor", tutor, userKey)
    },
    /**
     * Adds a new Major to the database 
     * @param {Major} majorObject Name of the major
     */
    addMajor: function addMajor(majorObject) {
        return addItem("Major", majorObject)
    },
    /**
     * Adds a new Course to the database 
     * @param {Course} courseObject Database major ID
     */
    addCourse: function addCourse(courseObject) {

        return addItem("Course", courseObject)
    },
    /**
     * Adds a new Appointment to the database, should be tied to a tutor and a user
     * @param {Session} appointmentObject Tutor username
     */
    addAppointment: function addAppointment(appointmentObject) {
        return addItem("Appointment", appointmentObject)
    },
    /**
     * Adds a new Review to the database, should be tied to an appointment
     * @param {Review} reviewObject Tutor username
     */
    addReview: function addReview(reviewObject) {

        return addItem("Review", reviewObject)

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
}
