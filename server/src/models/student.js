const User = require("./user");
class Student extends User {
  /**
   * Adds a new User to the database
   * @param {string} firstName First name
   * @param {string} middleName Middle name
   * @param {string} lastName Last name
   * @param {string} password Hashed password
   * @param {string} username Unique username
   * @param {string} userId Unique userid
   * @param {string} major Major
   * @param {Array<Course>} courses Courses provided or sought
   * @param {string} phone Phone number
   * @param {string} email Email
   * @param {double} hours Total hours tutored
   * @param {string} longBio Descriptive bio
   * @param {string} shortBio Short descriptive bio
   * @param {ImageData} pfp Profile picture
   */
  constructor(
    firstName,
    lastName,
    middleName,
    password,
    userId,
    userName,
    courses,
    phone,
    email,
    major,
    hours,
    longBio,
    shortBio,
    pfp
  ) {
    super(
      firstName,
      lastName,
      middleName,
      password,
      userId,
      userName,
      courses,
      phone,
      email,
      major,
      hours,
      longBio,
      shortBio,
      pfp
    );
  }
  toObj() {
    return {
        firstName,
        lastName,
        middleName,
        password,
        userId,
        userName,
        courses,
        phone,
        email,
        major,
        hours,
        longBio,
        shortBio,
        pfp
    }
  }
}
module.exports = Student;
