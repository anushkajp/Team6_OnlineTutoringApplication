const User = require('./user');

class Student extends User {
    constructor(firstName, lastName, middleName,
        password, userId, courses, phone, email, major,
        longBio, shortBio, pfp) {
        super(firstName, lastName, middleName,
            password, userId, courses, phone, email, major,
            longBio, shortBio, pfp);
    }
    // GET BY ID
    findAll(id) {
        this.firstName = "Diana"
        this.lastName = "Le"
        this.middleName = null;
        this.password = "12345"
        this.userId = "deedee"
        this.coursees = ['12423', 'data & an']
        this.phone = '123456789'
        this.email = 'dianale.201490@gmail.com'
        this.major = 'cs'
        this.longBio='hello there'
        this.shortBio = null
        this.pfp = null
        return this
    }
    // GET BY ID
    find(id) {
        this.firstName = "Diana"
        this.lastName = "Le"
        this.middleName = null;
        this.password = "12345"
        this.userId = "deedee"
        this.coursees = ['12423', 'data & an']
        this.phone = '123456789'
        this.email = 'dianale.201490@gmail.com'
        this.major = 'cs'
        this.longBio='hello there'
        this.shortBio = null
        this.pfp = null
        return this
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