export class Review {
    /**
     * Adds a new Review to the database, should be tied to an appointment
     * @param {string} tutorId Tutor username
     * @param {string} studentId Student username
     * @param {number} rating Review rating
     * @param {string} description A short description/ comment of the appointment
     */
    constructor (tutorId, studentId, rating, description) {
        this.tutorId = tutorId;
        this.studentId = studentId;
        this.rating = rating;
        this.description = description;
    }
}