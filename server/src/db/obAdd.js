const { addItem } = require("./db")

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
                output.push( await this.addCourse(majorId,currCourse.title,currCourse.course_number,parseInt(currCourse.course_number[1])))
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
    addStudent: async function addStudent(studentObject) {
        userKey = await this.addUser(firstName, middleName, lastName, password, username, major, courses, phone, email, longBio, shortBio, profilePic = null)
        userKey = userKey["id"]
        const postDataStudent = {
            userId: userKey
        }
        return addItem("Student", postDataStudent, userKey)
    },
    /**
     * Adds a new Tutor to the database 
     * @param {string} firstName First name
     * @param {string} middleName Middle name
     * @param {string} lastName Last name
     * @param {string} password Hashed password
     * @param {string} username Unique username
     * @param {string} major Major
     * @param {Array<string>} courses List of course ids 
     * @param {string} phone Phone number
     * @param {string} email Email
     * @param {string} longBio Descriptive bio
     * @param {string} shortBio A short bio for the tutor visible to students
     * @param {Array<Date>} weeklyAvailability Weekly availability, should be an array<Date,7> storing time ranges in a standard format, index 0 is monday
     * @param {Array<Date>} exceptionsAvailability A list of exceptions to the weekly schedule, stored as dates of unavailability
     * @param {ImageData} profilePic 
     * @param {number} rating Float rating of the user
     * @param {boolean} backgroundCheck Defaults to false, whether a background check has passed or not
     * @param {number} totalHours Total hours completed by tutor
     * @param {number} rating The rating other users have given the tutor
     */
    addTutor: async function addTutor(firstName, middleName, lastName, password, username, major, courses, phone, email, longBio, shortBio, weeklyAvailability = [], exceptionsAvailability = [], profilePic = null, rating = 0.00, backgroundCheck = false, totalHours = 0) {
        userKey = await this.addUser(firstName, middleName, lastName, password, username, major, courses, phone, email, longBio, shortBio, profilePic = null)
        userKey = userKey["id"]
        const postDataTutor = {
            userId: userKey,
            backgroundCheck: backgroundCheck,
            totalHours: totalHours,
            rating: rating,
            weeklyAvailability: weeklyAvailability,
            exceptionsAvailability: exceptionsAvailability
        }
        return addItem("Tutor", postDataTutor, userKey)
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
     * @param {string} tutorId Tutor username
     * @param {string} studentId Student username
     * @param {Date} dateTime Date and time the appointment starts
     * @param {number} length The duration of the appointment, in minutes
     * @param {boolean} online Whether the appointment is online or in person
     * @param {string} location If in person, the address of the appointment, if online, a meeting URL
     * @param {Array<String>} courses A list of course string ids 
     * @param {string} studentNotes Notes about the meeting for the user
     * @param {string} tutorNotes Notes about the meeting for the tutor
     * @param {number} rating Appointment rating
     * @param {string} feedback Feedback for the appointment
     */
    addAppointment: function addAppointment(tutorId, studentId, dateTime, length, online, location,courses, studentNotes, tutorNotes, rating, feedback) {
        const postData = {
            tutorId: tutorId,
            studentId: studentId,
            dateTime: dateTime,
            length: length,
            online: online,
            location: location,
            courses:courses,
            tutorNotes: tutorNotes,
            studentNotes:studentNotes,
            rating: rating,
            feedback:feedback
        }
        return addItem("Appointment", postData)
    },
    /**
     * Adds a new Review to the database, should be tied to an appointment
     * @param {string} tutorId Tutor username
     * @param {string} studentId Student username
     * @param {number} rate Review rating
     * @param {string} description A short description/ comment of the appointment
     */
    addReview: function addReview(tutorId, studentId, rate, description) {
        const postData = {
            tutorId: tutorId,
            studentId: studentId,
            rate: rate,
            description: description
        }
        return addItem("Review", postData)

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
