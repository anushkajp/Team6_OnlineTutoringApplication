export class Course {
    /**
     * Adds a new Course to the database 
     * @param {string} majorId Database major ID
     * @param {string} courseName Name of the course
     * @param {string} courseNumber Course number
     * @param {number} creditHours Number of credit hours this course offers
     */
    constructor (courseName, courseNumber, majorId, creditHours) {
        this.courseName = courseName;
        this.courseNumber = courseNumber;
        this.majorId = majorId;
        this.creditHours = creditHours
    }
}

export default Course;