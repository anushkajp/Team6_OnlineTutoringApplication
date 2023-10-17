const User = require('./user');

class Student extends User {
    constructor(firstName, lastName, middleName,
        password, userId, userName, courses, phone, email, major, hours,
        longBio, shortBio, pfp) {
        super(firstName, lastName, middleName,
            password, userId, userName, courses, phone, email, major,
            longBio, shortBio, pfp);
    }
}
module.exports = Student