class User {
    constructor(firstName, lastName, middleName,
        password, userId, courses, phone, email, major,
        longBio, shortBio, pfp) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.password = password;
        this.userId = userId;
        this.courses = courses;
        this.phone = phone;
        this.email = email;
        this.major = major;
        this.longBio = longBio;
        this.shortBio = shortBio;
        this.pfp = pfp;
    }
}
module.exports = User