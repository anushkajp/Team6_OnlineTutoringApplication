const User = require('./user');
const Availability = require('./availability');
const { db, readPath, addUser, addTutor, addStudent,addCourse, addMajor } = require("../db/db");

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
}
module.exports = Tutor