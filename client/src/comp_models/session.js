export class Session {
    /**
     * Adds a new Appointment to the database, should be tied to a tutor and a user
     * @param {string} tutorId Tutor username
     * @param {string} studentId Student username
     * @param {Date} dateTime Date and time the appointment starts
     * @param {number} length The duration of the appointment, in minutes
     * @param {string} course The specific course the session will be about
     * @param {boolean} online Whether the appointment is online or in person
     * @param {string} location If in person, the address of the appointment, if online, a meeting URL
     * @param {string} feedback Feedback for the appointment
     * @param {string} course Course the student will get tutored for
     * @param {string} tutorNotes Notes from the tutor to the student
     * @param {string} studentNotes Notes from the student to the tutor
     */
    constructor(tutorId, studentId, datetime, length, course, online, location, feedback, tutorNotes, studentNotes) {
        this.tutorId = tutorId;
        this.studentId = studentId;
        this.datetime = datetime;
        this.length = length;
        this.course = course;
        this.online = online;
        this.location = location;
        this.feedback = feedback;
        this.tutorNotes = tutorNotes;
        this.studentNotes = studentNotes;
    }
}
