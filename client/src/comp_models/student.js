import {User} from './user'

export class Student extends User {
  /**
   * Adds a new User to the database
   * @param {string} firstName First name
   * @param {string} lastName Last name
   * @param {string} password Hashed password
   * @param {string} username Unique username
   * @param {string} userId Unique userid
   * @param {string} phone Phone number
   * @param {string} email Email
   * @param {double} hours Total hours tutored
   * @param {string} longBio Descriptive bio
   * @param {string} shortBio Short descriptive bio
   * @param {ImageData} pfp Profile picture
   * @param {Array<String>} favoriteTutors List of Student's favorite tutors
   */
  constructor(
    firstName,
    lastName,
    password,
    userId,
    username,
    phone,
    email,
    hours,
    longBio,
    shortBio,
    pfp,
    favoriteTutors
  ) {
    super(
      firstName,
      lastName,
      password,
      userId,
      username,
      phone,
      email,
      hours,
      longBio,
      shortBio,
      pfp
    );
    this.favoriteTutors = favoriteTutors
  }
  toObj() {
    return {
      firstName: "",
      lastName: "",
      password: "",
      username: "",
      phone: "",
      email: "",
      hours: 0,
      longBio: "",
      shortBio: "",
      pfp: "",
      favoriteTutors: ""
    };
  }
}
