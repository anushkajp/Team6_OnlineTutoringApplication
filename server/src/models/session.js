class Session {
    /**
     * Adds a new Appointment to the database, should be tied to a tutor and a user
     * @param {string} tutorId Tutor username
     * @param {string} studentId Student username
     * @param {Date} dateTime Date and time the appointment starts
     * @param {number} length The duration of the appointment, in minutes
     * @param {boolean} online Whether the appointment is online or in person
     * @param {string} location If in person, the address of the appointment, if online, a meeting URL
     * @param {Array<String>} courses A list of course string ids 
     * @param {string} notes Notes about the meeting
     * @param {number} rating Appointment rating
     * @param {string} feedback Feedback for the appointment
     */
    constructor(tutorId, studentId, datetime, length, online, location, notes, feedback) {
        this.tutorId = tutorId;
        this.studentId = studentId;
        this.datetime = datetime;
        this.length = length;
        this.online = online;
        this.location = location;
        this.notes = notes;
        this.feedback = feedback;
    }
}
module.exports = Session