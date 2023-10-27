class Session {
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