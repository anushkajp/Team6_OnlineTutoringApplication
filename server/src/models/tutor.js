const User = require('./user');
const Availability = require('./availability');

class Tutor extends User {
    constructor(firstName, lastName, middleName,
        password, userId, courses, phone, email, major,
        longBio, shortBio, pfp, rating, week, exceptions) {
        super(firstName, lastName, middleName,
            password, userId, courses, phone, email, major,
            longBio, shortBio, pfp);
        this.rating = rating;
        const availability = Availability(week, exceptions);
        this.availability = availability;
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