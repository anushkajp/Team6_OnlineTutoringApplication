const User = require('./user');
const Availability = require('./availability');
class Tutor extends User {
    /**
     * Adds a new Tutor to the database 
     * @param {string} firstName First name
     * @param {string} middleName Middle name
     * @param {string} lastName Last name
     * @param {string} password Hashed password
     * @param {string} username Unique username
     * @param {string} major Major
     * @param {Array<string>} courses List of course ids 
     * @param {string} phone Phone number
     * @param {string} email Email
     * @param {string} longBio Descriptive bio
     * @param {string} shortBio A short bio for the tutor visible to students
     * @param {Array<Date>} weeklyAvailability Weekly availability, should be an array<Date,7> storing time ranges in a standard format, index 0 is monday
     * @param {Array<Date>} exceptionsAvailability A list of exceptions to the weekly schedule, stored as dates of unavailability
     * @param {ImageData} profilePic 
     * @param {number} hours
     * @param {number} rating Float rating of the user
     * @param {boolean} bgCheck Defaults to false, whether a background check has passed or not
     * @param {number} totalHours Total hours completed by tutor
     * @param {number} rating The rating other users have given the tutor
     */
    constructor(firstName, lastName, middleName,
        password, userId, username, courses, phone, email, major, hours,
        longBio, shortBio, pfp, rating, availability, bgCheck) {
        super(firstName, lastName, middleName,
            password, userId, username, courses, phone, email, major, hours,
            longBio, shortBio, pfp);
        this.rating = rating;
        // const availability = new Availability(week, exceptions);
        this.availability = availability;
        this.bgCheck = bgCheck;
    }
}
module.exports = Tutor