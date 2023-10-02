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
}
module.exports = Session