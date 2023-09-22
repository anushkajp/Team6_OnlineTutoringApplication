const User = require('./user')

class Tutor extends User {
    constructor () {
        super();
        this.rating = null;
        this.availability = null;
    }
}