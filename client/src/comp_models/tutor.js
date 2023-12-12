import { User } from './user'
import { Availability } from './availability';

export class Tutor extends User {
    /**
     * Adds a new Tutor to the database 
     * @param {string} firstName First name
     * @param {string} lastName Last name
     * @param {string} password Hashed password
     * @param {string} username Unique username
     * @param {string} major Major
     * @param {Array<string>} courses List of course ids 
     * @param {string} phone Phone number
     * @param {string} email Email
     * @param {string} longBio Descriptive bio
     * @param {string} shortBio A short bio for the tutor visible to students
     * @param {Array<TimeBlock>} monday List of availability object TimeBlock for Monday
     * @param {Array<TimeBlock>} tuesday List of availability object TimeBlock for tuesday
     * @param {Array<TimeBlock>} wednesday List of availability object TimeBlock for wednesday
     * @param {Array<TimeBlock>} thursday List of availability object TimeBlock for thursday
     * @param {Array<TimeBlock>} friday List of availability object TimeBlock for friday
     * @param {Array<TimeBlock>} saturday List of availability object TimeBlock for saturday
     * @param {Array<TimeBlock>} sunday List of availability object TimeBlock for sunday
     * @param {Array<Date>} exceptionsAvailability A list of exceptions to the weekly schedule, stored as dates of unavailability
     * @param {ImageData} profilePic 
     * @param {number} hours
     * @param {number} rating Float rating of the user
     * @param {boolean} bgCheck Defaults to false, whether a background check has passed or not
     * @param {number} totalHours Total hours completed by tutor
     * @param {number} rating The rating other users have given the tutor
     */
    constructor(firstName, lastName, 
        password, userId, username, courses, phone, email, major, hours,
        longBio, shortBio, pfp, rating, monday, tuesday, wednesday, thursday, 
        friday, saturday, sunday, exceptions, bgCheck) {
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
        this.rating = rating;
        const availability = new Availability(monday, tuesday, wednesday, thursday, friday, saturday, sunday, exceptions);
        this.availability = availability;
        this.bgCheck = bgCheck;
        this.major = major;
        this.courses = courses;
        
    }
    toObj() {
        return {
            firstName: "",
            lastName: "",
            password: "",
            username: "",
            courses: false,
            phone: "",
            email: "",
            major: "",
            hours: 0,
            longBio: "",
            shortBio: "",
            pfp: "",
            userId: "",
            rating: 0,
            availability: {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
                exceptions: []
            },
            bgCheck: false
        };
    }
}