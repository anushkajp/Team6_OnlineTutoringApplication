const User = require('./user');

class Student extends User {
    constructor(firstName, lastName, middleName,
        password, userId, courses, phone, email, major,
        longBio, shortBio, pfp) {
        super(firstName, lastName, middleName,
            password, userId, courses, phone, email, major,
            longBio, shortBio, pfp);
    }
}
module.exports = Student