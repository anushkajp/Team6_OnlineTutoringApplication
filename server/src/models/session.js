const Review = require('./review')
class Session {
    constructor() {
        this.tutorId = null;
        this.studentId = null;
        this.date = null;
        this.time = null;
        this.length = null;
        this.online = null;
        this.location = null;
        this.notes = null;
        this.review = Review();
    }
    // GET BY TUTORID
    findAll(tutorId) {
        // IF ID IS FOUND, RETURN SUCCESS
        // IF ID NOT FOUND, RETURN FAILED
    }
    // GET BY ID
    find(id) {
        // IF ID IS FOUND, RETURN SUCCESS
        // IF ID NOT FOUND, RETURN FAILED
    }
    // POST
    create(id) {
        // IF ID IS FOUND, RETURN SUCCESS
        // IF ID NOT FOUND, RETURN FAILED
    }
    // PATCH
    update(id, review) {
                // IF ID IS FOUND, RETURN SUCCESS
        // IF ID NOT FOUND, RETURN FAILED
    }
    delete(id) {
        // IF ID IS FOUND, RETURN SUCCESS
        // IF ID NOT FOUND, RETURN FAILED
    }
}