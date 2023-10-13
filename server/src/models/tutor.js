const User = require('./user');
const Availability = require('./availability');
const Review = require('../models/review')
class Tutor extends User {
    constructor(firstName, lastName, middleName,
        password, userId, courses, phone, email, major, hours,
        longBio, shortBio, pfp, rating, week, exceptions, bgCheck) {
        super(firstName, lastName, middleName,
            password, userId, courses, phone, email, major, hours,
            longBio, shortBio, pfp);
        this.rating = rating;
        const availability = new Availability(week, exceptions);
        this.availability = availability;
        this.bgCheck = bgCheck;
        this.review = new Review()
    }
}
module.exports = Tutor